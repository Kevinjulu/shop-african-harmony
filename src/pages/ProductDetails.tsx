import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductImages } from "@/components/product-details/ProductImages";
import { ProductInfo } from "@/components/product-details/ProductInfo";
import { SimilarProducts } from "@/components/product-details/SimilarProducts";
import { ProductReviews } from "@/components/reviews/ProductReviews";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      console.log("Fetching product details for ID:", id);
      
      if (!id) {
        console.error("No product ID provided");
        throw new Error("No product ID provided");
      }

      const { data: product, error: productError } = await supabase
        .from("products")
        .select(`
          *,
          product_images (
            id,
            image_url,
            is_primary,
            display_order
          )
        `)
        .eq('id', id)
        .maybeSingle();

      if (productError) {
        console.error("Error fetching product:", productError);
        toast.error("Failed to load product details");
        throw productError;
      }

      if (!product) {
        console.error("Product not found");
        toast.error("Product not found");
        navigate("/products");
        throw new Error("Product not found");
      }

      console.log("Found product:", product);
      return product as Product;
    },
    retry: 1,
  });

  if (error) {
    console.error("Error in product query:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Product</h2>
          <p className="text-gray-600 mb-4">
            We encountered an error while loading the product. Please try again later.
          </p>
          <button 
            onClick={() => navigate("/products")}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            Return to Products
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square w-full" />
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
          <p className="text-gray-600 mt-2 mb-4">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button 
            onClick={() => navigate("/products")}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <ProductImages 
          images={product.product_images?.map(img => ({
            url: img.image_url,
            alt: product.name
          })) || [
            { url: product.image_url || '/placeholder.svg', alt: product.name }
          ]} 
          productName={product.name} 
        />
        <ProductInfo product={product} />
      </div>

      <Tabs defaultValue="details" className="mt-12">
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
                  <li>Origin: {product.origin_country || "Made in Africa"}</li>
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
            <p>International shipping available to select countries</p>
            <p>All items are carefully packaged to ensure safe delivery</p>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-4">
          <ProductReviews productId={product.id} />
        </TabsContent>
      </Tabs>

      <div className="mt-12">
        <SimilarProducts 
          products={[]} 
          currentProductId={product.id} 
        />
      </div>
    </div>
  );
};

export default ProductDetails;