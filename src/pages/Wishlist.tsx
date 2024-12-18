import { useState } from "react";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/hooks/useCurrency";
import { toast } from "sonner";
import { Product } from "@/types/product";
import { Link } from "react-router-dom";

const Wishlist = () => {
  // In a real app, this would be fetched from a backend
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(items => items.filter(item => item.id !== productId));
    toast.success("Item removed from wishlist");
  };

  const moveToCart = (product: Product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    toast.success("Item moved to cart");
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-medium text-gray-600 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Browse our products and add your favorites to the wishlist</p>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      <div className="grid gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="flex gap-4 border rounded-lg p-4">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-grow">
              <Link to={`/product/${item.id}`}>
                <h3 className="font-medium hover:text-primary">{item.name}</h3>
              </Link>
              <p className="text-primary font-semibold mt-1">{formatPrice(item.price)}</p>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moveToCart(item)}
                  className="flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Move to Cart
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;