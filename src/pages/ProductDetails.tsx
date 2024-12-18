import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductDetailsContent } from "@/components/product-details/ProductDetailsContent";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEffect } from "react";
import { Product, ProductStatus } from "@/types/product";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      console.log("Fetching product details for ID:", id);
      
      if (!id) {
        console.error("No product ID provided");
        throw new Error("No product ID provided");
      }

      // First try to fetch from the mock data
      const mockProducts = [
        {
          id: "550e8400-e29b-41d4-a716-446655440000",
          name: "African Print Dress",
          price: 129.99,
          origin_country: "NG",
          image_url: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&auto=format&fit=crop&q=60",
          description: "Beautiful African print dress made with high-quality fabric",
          category: "Clothing",
          status: "published" as ProductStatus,
          stock: 10,
          inventory_quantity: 10,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        // ... add other mock products
      ];

      // Try to find the product in mock data first
      const mockProduct = mockProducts.find(p => p.id === id);
      if (mockProduct) {
        console.log("Found mock product:", mockProduct);
        return {
          ...mockProduct,
          product_images: [{ 
            id: '1', 
            image_url: mockProduct.image_url,
            is_primary: true,
            display_order: 1
          }]
        } as Product;
      }

      // If not found in mock data, try the database
      console.log("Trying database for product:", id);
      const { data: product, error } = await supabase
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

      if (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product details");
        throw error;
      }

      if (!product) {
        console.error("Product not found");
        toast.error("Product not found");
        navigate("/products");
        throw new Error("Product not found");
      }

      console.log("Found product in database:", product);
      return product as Product;
    },
    retry: 1,
  });

  if (error) {
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

  return <ProductDetailsContent product={product} />;
};

export default ProductDetails;