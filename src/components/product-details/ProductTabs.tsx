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
      <TabsList className="w-full border-b rounded-none h-auto p-0 bg-transparent flex flex-wrap">
        <TabsTrigger 
          value="details" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-4 px-6 text-base"
        >
          Product Details
        </TabsTrigger>
        <TabsTrigger 
          value="shipping" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-4 px-6 text-base"
        >
          Shipping Info
        </TabsTrigger>
        <TabsTrigger 
          value="reviews" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-4 px-6 text-base"
        >
          Reviews
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="details" className="p-6">
        <div className="prose max-w-none">
          <h3 className="text-xl font-semibold mb-4">Product Description</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>
          
          <h3 className="text-xl font-semibold mb-4">Product Features</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-600">Handcrafted by skilled artisans</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-600">Made with premium quality materials</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-600">Authentic African design and patterns</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-600">Fair trade certified</span>
            </li>
          </ul>
        </div>
      </TabsContent>

      <TabsContent value="shipping" className="p-6">
        <div className="prose max-w-none space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
            <p className="text-gray-600 leading-relaxed">
              We offer worldwide shipping on all our products. Shipping times and costs may vary depending on your location.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-3">Delivery Times:</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Local Delivery (Kenya): 2-3 business days</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>East Africa: 5-7 business days</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>International: 10-14 business days</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-3">Shipping Policies:</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Free shipping on orders over $100</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>All items are carefully packaged to ensure safe delivery</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Tracking number provided for all shipments</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Insurance included for international shipping</span>
              </li>
            </ul>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="p-6">
        <ProductReviews productId={product.id} />
      </TabsContent>
    </Tabs>
  );
};