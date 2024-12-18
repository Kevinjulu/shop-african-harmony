import { useState, useEffect } from "react";
import { Heart, Trash2, ShoppingCart, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/hooks/useCurrency";
import { toast } from "sonner";
import { Product, ProductStatus } from "@/types/product";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Skeleton } from "@/components/ui/skeleton";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const { user } = useAuth();

  useEffect(() => {
    fetchWishlistItems();
  }, [user]);

  const fetchWishlistItems = async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      const { data: wishlistData, error: wishlistError } = await supabase
        .from('wishlists')
        .select('product_id')
        .eq('user_id', user.id);

      if (wishlistError) throw wishlistError;

      if (wishlistData && wishlistData.length > 0) {
        const productIds = wishlistData.map(item => item.product_id);
        
        const { data: products, error: productsError } = await supabase
          .from('products')
          .select('*')
          .in('id', productIds);

        if (productsError) throw productsError;
        
        // Transform the data to match the Product type
        const transformedProducts: Product[] = (products || []).map(product => ({
          ...product,
          status: product.status as ProductStatus, // Type assertion since we know the values are valid
          images: product.image_url ? [{ url: product.image_url, alt: product.name }] : undefined
        }));
        
        setWishlistItems(transformedProducts);
      } else {
        setWishlistItems([]);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast.error("Failed to load wishlist items");
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      setWishlistItems(items => items.filter(item => item.id !== productId));
      toast.success("Item removed from wishlist");
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error("Failed to remove item from wishlist");
    }
  };

  const moveToCart = (product: Product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    toast.success("Item moved to cart");
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 mx-auto text-orange-400 mb-4" />
          <h2 className="text-2xl font-medium text-gray-600 mb-4">Please sign in to view your wishlist</h2>
          <p className="text-gray-500 mb-6">Create an account or sign in to save your favorite items</p>
          <Link to="/auth">
            <Button className="bg-orange-400 hover:bg-orange-500">Sign In / Register</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 border rounded-lg p-4">
              <Skeleton className="w-24 h-24 rounded-md" />
              <div className="flex-grow">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/4 mb-4" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-medium text-gray-600 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Browse our products and add your favorites to the wishlist</p>
          <Link to="/products">
            <Button className="bg-orange-400 hover:bg-orange-500">Browse Products</Button>
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
          <div key={item.id} className="flex flex-col sm:flex-row gap-4 border rounded-lg p-4 hover:shadow-md transition-shadow">
            <Link to={`/product/${item.id}`} className="sm:w-24">
              <img
                src={item.image_url || '/placeholder.svg'}
                alt={item.name}
                className="w-full sm:w-24 h-24 object-cover rounded-md"
              />
            </Link>
            <div className="flex-grow">
              <Link to={`/product/${item.id}`}>
                <h3 className="font-medium text-lg hover:text-orange-400 transition-colors">
                  {item.name}
                </h3>
              </Link>
              <p className="text-orange-400 font-semibold mt-1">{formatPrice(item.price)}</p>
              {item.stock > 0 ? (
                <p className="text-green-600 text-sm mt-1">In Stock</p>
              ) : (
                <p className="text-red-600 text-sm mt-1">Out of Stock</p>
              )}
              <div className="flex flex-wrap gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moveToCart(item)}
                  disabled={item.stock === 0}
                  className="flex items-center gap-2 border-orange-400 text-orange-400 hover:bg-orange-50"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Move to Cart
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
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