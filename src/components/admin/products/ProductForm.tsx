import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Product, ProductFormData } from "@/types/product";
import { BasicDetails } from "./BasicDetails";
import { CategorySelect } from "./CategorySelect";
import { StatusSelect } from "./StatusSelect";
import { InventoryField } from "./InventoryField";
import { SEOFields } from "./SEOFields";
import { ImageSection } from "./form/ImageSection";
import { ProductFormActions } from "./form/ProductFormActions";
import { useState } from "react";

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

  const handleImageUpload = async (files: File[]) => {
    try {
      console.log("Starting image upload process...");
      const uploadedImages = [];
      
      for (const file of files) {
        console.log("Processing file:", file.name);
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, file);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);

        uploadedImages.push({
          url: publicUrl,
          alt: file.name
        });
      }

      console.log("Images uploaded successfully:", uploadedImages);
      return uploadedImages;
    } catch (error) {
      console.error("Error in image upload:", error);
      toast.error("Failed to upload images");
      throw error;
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsLoading(true);
      console.log("Submitting product data:", data);
      let uploadedImages = [];

      // Handle new image uploads if any
      if (data.newImages && data.newImages.length > 0) {
        try {
          uploadedImages = await handleImageUpload(data.newImages);
          console.log("Uploaded images:", uploadedImages);
        } catch (error) {
          console.error("Error uploading images:", error);
          toast.error("Failed to upload images");
          return;
        }
      }

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
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        keywords: data.keywords,
        image_url: uploadedImages.length > 0 ? uploadedImages[0].url : product?.image_url,
      };

      if (product) {
        // Update existing product
        const { error: updateError } = await supabase
          .from("products")
          .update(productData)
          .eq("id", product.id);

        if (updateError) throw updateError;

        // Update product images if new ones were uploaded
        if (uploadedImages.length > 0) {
          // First, delete existing images
          const { error: deleteError } = await supabase
            .from("product_images")
            .delete()
            .eq("product_id", product.id);

          if (deleteError) throw deleteError;

          // Then insert new images
          const { error: imageError } = await supabase
            .from("product_images")
            .insert(
              uploadedImages.map((img, index) => ({
                product_id: product.id,
                image_url: img.url,
                is_primary: index === 0,
                display_order: index
              }))
            );

          if (imageError) throw imageError;
        }

        toast.success("Product updated successfully");
      } else {
        // Create new product
        const { data: newProduct, error: createError } = await supabase
          .from("products")
          .insert([{
            ...productData,
            created_at: new Date().toISOString()
          }])
          .select()
          .single();

        if (createError) throw createError;

        // Insert product images if any were uploaded
        if (uploadedImages.length > 0 && newProduct) {
          const { error: imageError } = await supabase
            .from("product_images")
            .insert(
              uploadedImages.map((img, index) => ({
                product_id: newProduct.id,
                image_url: img.url,
                is_primary: index === 0,
                display_order: index
              }))
            );

          if (imageError) throw imageError;
        }

        toast.success("Product created successfully");
        form.reset();
      }
      
      onSuccess?.();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
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