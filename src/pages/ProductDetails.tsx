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

      // Validate if id is a valid UUID
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(id)) {
        console.error("Invalid product ID format");
        toast.error("Product not found");
        navigate("/products");
        throw new Error("Invalid product ID format");
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

      // Transform the product data to match the Product type
      const transformedProduct: Product = {
        ...product,
        status: product.status as ProductStatus,
        images: product.image_url ? [{ url: product.image_url, alt: product.name }] : [],
        product_images: Array.isArray(product.product_images) ? product.product_images : []
      };

      console.log("Found product:", transformedProduct);
      return transformedProduct;
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