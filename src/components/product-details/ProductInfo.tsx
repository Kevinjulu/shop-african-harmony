import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Star, MapPin, Building2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { QuantitySelector } from "./QuantitySelector";
import { useCurrency } from "@/hooks/useCurrency";

interface ProductInfoProps {
  product: Product;
}

// Mock reviews data
const MOCK_REVIEWS = [
  { id: 1, rating: 5, author: "Sarah M.", comment: "Beautiful authentic piece, exactly as described!", date: "2024-02-15" },
  { id: 2, rating: 4, author: "John D.", comment: "Great quality, shipping was fast.", date: "2024-02-10" },
  { id: 3, rating: 5, author: "Emma K.", comment: "Stunning craftsmanship, will buy again!", date: "2024-02-05" },
];

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const { formatPrice } = useCurrency();

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image_url,
      total: product.price * quantity
    };

    console.log('Adding to cart:', cartItem);
    toast.success(
      <div className="flex flex-col">
        <span>Added to cart: {quantity} × {product.name}</span>
        <span className="text-sm text-gray-500">
          Total: {formatPrice(product.price * quantity)}
        </span>
      </div>
    );
  };

  const averageRating = MOCK_REVIEWS.reduce((acc, review) => acc + review.rating, 0) / MOCK_REVIEWS.length;
  const stockStatus = product.inventory_quantity > 0 
    ? `${product.inventory_quantity} in stock` 
    : "Out of stock";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm font-medium">{averageRating.toFixed(1)}</span>
            <span className="ml-1 text-sm text-gray-500">({MOCK_REVIEWS.length} reviews)</span>
          </div>
          <span className="text-sm text-gray-500">• {stockStatus}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Building2 className="w-4 h-4" />
          <span>Sold by: {product.vendor_id || "African Artisans Co."}</span>
          <MapPin className="w-4 h-4 ml-4" />
          <span>Origin: {product.category || "Kenya"}</span>
        </div>
        <div className="space-y-2">
          <p className="text-3xl font-bold text-primary">{formatPrice(product.price)}</p>
          {quantity > 1 && (
            <p className="text-sm text-gray-600">
              Total: {formatPrice(product.price * quantity)}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600">{product.description}</p>
        
        <div className="flex items-center gap-4">
          <QuantitySelector 
            quantity={quantity} 
            setQuantity={setQuantity} 
            max={product.inventory_quantity}
          />
          <Button 
            className="flex-1" 
            onClick={handleAddToCart}
            disabled={product.inventory_quantity === 0}
          >
            Add to Cart
          </Button>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" className="flex-1">
            <Heart className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" className="flex-1">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-medium mb-4">Customer Reviews</h3>
        <div className="space-y-4">
          {MOCK_REVIEWS.map((review) => (
            <div key={review.id} className="border-b pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{review.author}</span>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-medium mb-2">Product Details</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>Category: {product.category}</li>
          <li>SKU: {product.id}</li>
          <li>Vendor: {product.vendor_id || "African Artisans Co."}</li>
          <li>Origin: {product.category || "Kenya"}</li>
        </ul>
      </div>
    </div>
  );
};