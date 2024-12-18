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
import { useProducts } from "@/hooks/useProducts";
import { Navbar } from "@/components/navbar/Navbar";

const ProductDetails = () => {
  const { id } = useParams();
  const { products, loading: isProductsLoading } = useProducts();
  
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const product = products.find((p) => p.id === id);
      if (!product) throw new Error("Product not found");
      return product;
    },
    enabled: !!products.length,
  });

  if (isLoading || isProductsLoading) {
    return (
      <>
        <Navbar />
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
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
            <p className="text-gray-600 mt-2">
              The product you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <ProductImages 
            images={[
              { url: product.image_url || '/placeholder.svg', alt: product.name },
              { url: product.image_url || '/placeholder.svg', alt: product.name },
              { url: product.image_url || '/placeholder.svg', alt: product.name },
              { url: product.image_url || '/placeholder.svg', alt: product.name },
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

        <SimilarProducts products={products} currentProductId={product.id} />
      </div>
    </>
  );
};

export default ProductDetails;