import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const Cart = () => {
  // This would normally come from a cart state management system
  const cartItems = [
    {
      id: 1,
      name: "Maasai Beaded Necklace",
      price: 49.99,
      quantity: 1,
      image: "/placeholder.svg"
    }
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-secondary mb-6">Shopping Cart</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 border-b py-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-grow">
                  <h3 className="font-medium text-secondary">{item.name}</h3>
                  <p className="text-primary font-semibold">${item.price}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center border rounded-md">
                      <button className="px-3 py-1 border-r">-</button>
                      <span className="px-4 py-1">{item.quantity}</span>
                      <button className="px-3 py-1 border-l">+</button>
                    </div>
                    <button className="text-red-500">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h2 className="text-xl font-semibold text-secondary mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold mb-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button className="w-full">Proceed to Checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;