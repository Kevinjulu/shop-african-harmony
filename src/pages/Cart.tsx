import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/hooks/useCurrency";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeFromCart, updateQuantity } = useCart();
  const { formatPrice } = useCurrency();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.16; // 16% tax
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-400" />
          <h2 className="text-2xl font-medium text-gray-900">Your cart is empty</h2>
          <p className="text-gray-500">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ScrollArea className="h-[calc(100vh-300px)] rounded-lg border p-4">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-full md:w-24 h-24 flex-shrink-0">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow space-y-2">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-primary font-semibold">{formatPrice(item.price)}</p>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <div className="flex items-center border rounded-md">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="px-4 py-1 min-w-[2rem] text-center">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button 
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => {
                          removeFromCart(item.id);
                          toast.success(`${item.name} removed from cart`);
                        }}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right mt-4 md:mt-0">
                    <p className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm h-fit space-y-6 order-first lg:order-last">
          <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax (16%)</span>
              <span className="font-medium">{formatPrice(tax)}</span>
            </div>
            {shipping > 0 && (
              <p className="text-sm text-gray-500">
                Free shipping on orders over {formatPrice(100)}
              </p>
            )}
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <div className="space-y-3">
            <Link to="/checkout" className="block">
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3"
              >
                Proceed to Checkout
              </Button>
            </Link>
            <Link to="/products" className="block">
              <Button 
                variant="outline"
                className="w-full"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;