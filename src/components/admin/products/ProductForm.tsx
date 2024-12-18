import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ImageUpload } from "./ImageUpload";
import { Product, ProductFormData } from "@/types/product";
import { StatusSelect } from "./StatusSelect";
import { InventoryField } from "./InventoryField";
import { CategorySelect } from "./CategorySelect";

interface ProductFormProps {
  product?: Product | null;
  onSuccess?: () => void;
}

export const ProductForm = ({ product, onSuccess }: ProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const form = useForm<ProductFormData>({
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      category: product?.category || "",
      inventory_quantity: product?.inventory_quantity || 0,
      status: product?.status || "draft",
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    console.log("Submitting product data:", data);

    try {
      const productData = {
        ...data,
        updated_at: new Date().toISOString(),
      };

      let productId = product?.id;

      if (product) {
        console.log("Updating existing product:", productId);
        const { error: updateError } = await supabase
          .from("products")
          .update(productData)
          .eq("id", product.id);

        if (updateError) throw updateError;
      } else {
        console.log("Creating new product");
        const { data: newProduct, error: insertError } = await supabase
          .from("products")
          .insert([productData])
          .select()
          .single();

        if (insertError) throw insertError;
        productId = newProduct.id;
      }

      // Handle image uploads
      console.log("Processing image uploads");
      for (const image of images) {
        const fileExt = image.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `product-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(filePath, image);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("products")
          .getPublicUrl(filePath);

        await supabase.from("product_images").insert([
          {
            product_id: productId,
            image_url: publicUrl,
            is_primary: true,
          },
        ]);
      }

      toast.success(
        product ? "Product updated successfully" : "Product created successfully"
      );
      onSuccess?.();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CategorySelect form={form} />
        <StatusSelect form={form} />
        <InventoryField form={form} />
        <ImageUpload onImagesSelect={setImages} maxImages={5} />

        <Button type="submit" disabled={loading} className="w-full">
          {loading
            ? product
              ? "Updating Product..."
              : "Creating Product..."
            : product
            ? "Update Product"
            : "Create Product"}
        </Button>
      </form>
    </Form>
  );
};