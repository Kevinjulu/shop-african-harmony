import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { products, loading, error } = useProducts();
  const [selectedImage, setSelectedImage] = useState(0);

  if (error) {
    toast.error("Failed to load product details");
  }

  const product = products.find(p => p.id === Number(id));

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full" />
              <div className="grid grid-cols-3 gap-4">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="aspect-square w-full" />
              </div>
            </div>
            <div>
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-8 w-1/4 mb-4" />
              <Skeleton className="h-24 w-full mb-6" />
              <Skeleton className="h-12 w-1/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
            <p className="text-gray-600 mt-2">The product you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${product.name}(s) to cart`);
    // Cart functionality will be implemented with backend integration
  };

  // Generate additional images based on the main image
  const productImages = [
    product.image,
    product.image,
    product.image
  ];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg border border-gray-200">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-secondary mb-4">{product.name}</h1>
            <p className="text-2xl text-primary font-semibold mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <label className="text-gray-700">Quantity:</label>
                <div className="flex items-center border rounded-md">
                  <button
                    className="px-3 py-1 border-r hover:bg-gray-100 transition-colors"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button
                    className="px-3 py-1 border-l hover:bg-gray-100 transition-colors"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  >
                    +
                  </button>
                </div>
              </div>

              <Button 
                className="w-full md:w-auto"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>

              <p className="text-sm text-gray-500">
                Category: {product.category}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;