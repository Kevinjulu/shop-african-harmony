import { Product } from "@/types/product";
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
import { ProductReviews } from "@/components/reviews/ProductReviews";

interface ProductTabsProps {
  product: Product;
}

export const ProductTabs = ({ product }: ProductTabsProps) => {
  return (
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
  );
};