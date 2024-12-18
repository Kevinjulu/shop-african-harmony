import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Product, ProductFormData } from "@/types/product";
import { BasicDetails } from "./BasicDetails";
import { CategorySelect } from "./CategorySelect";
import { StatusSelect } from "./StatusSelect";
import { InventoryField } from "./InventoryField";
import { SEOFields } from "./SEOFields";
import { MultipleImageUpload } from "./MultipleImageUpload";

interface ProductFormProps {
  product?: Product;
  onSuccess?: () => void;
}

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
  images: z.array(z.object({
    url: z.string(),
    alt: z.string()
  })),
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

export const ProductForm = ({ product, onSuccess }: ProductFormProps) => {
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
      images: product?.images || [],
      meta_title: product?.seo?.meta_title || "",
      meta_description: product?.seo?.meta_description || "",
      keywords: product?.seo?.keywords || "",
      stock: product?.stock || 0,
      variants: []
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      const productData = {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        inventory_quantity: data.inventory_quantity,
        status: data.status,
        origin_country: data.origin_country,
        stock: data.stock,
        updated_at: new Date().toISOString(),
        seo: {
          meta_title: data.meta_title,
          meta_description: data.meta_description,
          keywords: data.keywords
        }
      };

      if (product) {
        const { error: updateError } = await supabase
          .from("products")
          .update(productData)
          .eq("id", product.id);

        if (updateError) throw updateError;
        toast.success("Product updated successfully");
      } else {
        const { error: createError } = await supabase
          .from("products")
          .insert([{
            ...productData,
            created_at: new Date().toISOString()
          }]);

        if (createError) throw createError;
        toast.success("Product created successfully");
        form.reset();
      }
      
      onSuccess?.();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save product");
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
        <MultipleImageUpload 
          onImagesSelect={(files) => {
            // Handle image upload logic
          }} 
          maxImages={5}
        />
        <SEOFields form={form} />
        <Button type="submit">
          {product ? "Update Product" : "Create Product"}
        </Button>
      </form>
    </Form>
  );
};