import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Star, Minus, Plus, Heart, Share2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { products, loading, error } = useProducts();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  console.log("Rendering ProductDetails for id:", id);

  if (error) {
    toast.error("Failed to load product details");
    return null;
  }

  const product = products.find(p => p.id === Number(id));
  const similarProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="aspect-square w-full" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-square w-full" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
          <p className="text-gray-600 mt-2">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${product.name}(s) to cart`);
  };

  const handleImageZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const image = e.currentTarget;
    const { left, top, width, height } = image.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    image.style.transformOrigin = `${x}% ${y}%`;
  };

  // Generate additional images based on the main image for demo
  const productImages = [product.image, product.image, product.image, product.image];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div
            className={`aspect-square relative overflow-hidden rounded-lg border border-gray-200 cursor-zoom-in`}
            onMouseMove={handleImageZoom}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-200 ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
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
                  className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="ml-1 text-sm font-medium">4.8</span>
                <span className="ml-1 text-sm text-gray-500">(120 reviews)</span>
              </div>
              <span className="text-sm text-gray-500">• In stock</span>
            </div>
            <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">{product.description || "Experience the beauty of authentic African craftsmanship with this carefully curated piece. Each item tells a unique story of cultural heritage and artistic excellence."}</p>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <button
                  className="p-2 hover:bg-gray-100 transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <button
                  className="p-2 hover:bg-gray-100 transition-colors"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button className="flex-1" onClick={handleAddToCart}>
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

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
              <TabsTrigger value="shipping" className="flex-1">Shipping</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="description">
                  <AccordionTrigger>Product Description</AccordionTrigger>
                  <AccordionContent>
                    {product.description || "Detailed product description will be available soon."}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="specifications">
                  <AccordionTrigger>Specifications</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-4 space-y-2">
                      <li>Material: Premium quality materials</li>
                      <li>Dimensions: Custom sizes available</li>
                      <li>Origin: Made in Africa</li>
                      <li>Category: {product.category}</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            <TabsContent value="shipping" className="mt-4">
              <div className="prose max-w-none">
                <p>Free shipping on orders over $100</p>
                <p>Estimated delivery: 5-7 business days</p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <div className="text-center py-4">
                <p>Customer reviews coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {similarProducts.map((similarProduct) => (
            <div key={similarProduct.id} className="group cursor-pointer">
              <div className="aspect-square mb-2 overflow-hidden rounded-lg">
                <img
                  src={similarProduct.image}
                  alt={similarProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
                {similarProduct.name}
              </h3>
              <p className="text-sm font-bold text-primary mt-1">
                ${similarProduct.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;