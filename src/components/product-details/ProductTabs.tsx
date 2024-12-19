import { Product } from "@/types/product";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ProductReviews } from "@/components/reviews/ProductReviews";
import { Check } from "lucide-react";

interface ProductTabsProps {
  product: Product;
}

export const ProductTabs = ({ product }: ProductTabsProps) => {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="w-full border-b rounded-none h-auto p-0 bg-transparent">
        <TabsTrigger 
          value="details" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
        >
          Product Details
        </TabsTrigger>
        <TabsTrigger 
          value="shipping" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
        >
          Shipping Info
        </TabsTrigger>
        <TabsTrigger 
          value="reviews" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
        >
          Reviews
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="details" className="mt-6">
        <div className="prose max-w-none">
          <h3 className="text-lg font-semibold mb-4">Product Description</h3>
          <p className="text-gray-600 mb-6">
            {product.description}
          </p>
          
          <h3 className="text-lg font-semibold mb-4">Product Features</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Handcrafted by skilled artisans</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Made with premium quality materials</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Authentic African design and patterns</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Fair trade certified</span>
            </li>
          </ul>
        </div>
      </TabsContent>

      <TabsContent value="shipping" className="mt-6">
        <div className="prose max-w-none space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Shipping Information</h3>
            <p className="text-gray-600">
              We offer worldwide shipping on all our products. Shipping times and costs may vary depending on your location.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Delivery Times:</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Local Delivery (Kenya): 2-3 business days</li>
              <li>East Africa: 5-7 business days</li>
              <li>International: 10-14 business days</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Shipping Policies:</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Free shipping on orders over $100</li>
              <li>All items are carefully packaged to ensure safe delivery</li>
              <li>Tracking number provided for all shipments</li>
              <li>Insurance included for international shipping</li>
            </ul>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <ProductReviews productId={product.id} />
      </TabsContent>
    </Tabs>
  );
};