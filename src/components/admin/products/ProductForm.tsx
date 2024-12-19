import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Product, ProductFormData } from "@/types/product";
import { BasicDetails } from "./BasicDetails";
import { CategorySelect } from "./CategorySelect";
import { StatusSelect } from "./StatusSelect";
import { InventoryField } from "./InventoryField";
import { SEOFields } from "./SEOFields";
import { ImageSection } from "./form/ImageSection";
import { ProductFormActions } from "./form/ProductFormActions";
import { useState, useEffect } from "react";
import { handleProductSubmit } from "./form/ProductSubmitHandler";
import { supabase } from "@/integrations/supabase/client";

const productSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.number().min(0),
  category: z.string(),
  inventory_quantity: z.number().min(0),
  status: z.enum(['draft', 'published', 'out_of_stock']),
  origin_country: z.string(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  keywords: z.string().optional(),
  stock: z.number().min(0),
  variants: z.array(z.object({
    size: z.string(),
    color: z.string(),
    sku: z.string(),
    price: z.number(),
    inventory_quantity: z.number()
  }))
});

interface ProductFormProps {
  product?: Product;
  onSuccess?: () => void;
}

export const ProductForm = ({ product, onSuccess }: ProductFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      category: product?.category || "",
      inventory_quantity: product?.inventory_quantity || 0,
      status: product?.status || "draft",
      origin_country: product?.origin_country || "",
      meta_title: product?.meta_title || "",
      meta_description: product?.meta_description || "",
      keywords: product?.keywords || "",
      stock: product?.stock || 0,
      variants: []
    },
  });

  // Subscribe to real-time updates for the product
  useEffect(() => {
    if (!product?.id) return;

    console.log("Setting up real-time updates for product:", product.id);
    
    const channel = supabase
      .channel('product_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products',
          filter: `id=eq.${product.id}`
        },
        (payload) => {
          console.log("Received product update:", payload);
          const updatedProduct = payload.new as Product;
          
          // Update form values with new data
          form.reset({
            name: updatedProduct.name,
            description: updatedProduct.description,
            price: updatedProduct.price,
            category: updatedProduct.category || "",
            inventory_quantity: updatedProduct.inventory_quantity,
            status: updatedProduct.status,
            origin_country: updatedProduct.origin_country || "",
            meta_title: updatedProduct.meta_title || "",
            meta_description: updatedProduct.meta_description || "",
            keywords: updatedProduct.keywords || "",
            stock: updatedProduct.stock,
            variants: []
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [product?.id]);

  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true);
    try {
      await handleProductSubmit(data, product, onSuccess);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <BasicDetails form={form} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CategorySelect form={form} />
          <StatusSelect form={form} />
        </div>
        <InventoryField form={form} />
        <ImageSection form={form} productId={product?.id} />
        <SEOFields form={form} />
        <ProductFormActions isLoading={isLoading} isEditing={!!product} />
      </form>
    </Form>
  );
};