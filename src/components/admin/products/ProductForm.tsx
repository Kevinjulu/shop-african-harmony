import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Product, ProductFormData } from "@/types/product";
import { StatusSelect } from "./StatusSelect";
import { InventoryField } from "./InventoryField";
import { CategorySelect } from "./CategorySelect";
import { BasicDetails } from "./BasicDetails";
import { VariantsForm } from "./VariantsForm";
import { MultipleImageUpload } from "./MultipleImageUpload";
import { SEOFields } from "./SEOFields";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      variants: [],
      sku: "",
      weight: 0,
      dimensions: "",
      materials: "",
      tags: "",
      meta_title: product?.meta_title || "",
      meta_description: product?.meta_description || "",
      keywords: product?.keywords || "",
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    console.log("Submitting product data:", data);

    try {
      const productData = {
        ...data,
        updated_at: new Date().toISOString(),
        origin_country: product?.origin_country || "US",
        images: product?.images || [],
      };

      if (product) {
        const { error: updateError } = await supabase
          .from("products")
          .update({
            ...productData,
            origin_country: product.origin_country || "US",
            images: product.images || [],
          })
          .eq("id", product.id);

        if (updateError) throw updateError;
      } else {
        const { data: newProduct, error: insertError } = await supabase
          .from("products")
          .insert([{
            ...productData,
            created_at: new Date().toISOString(),
            origin_country: "US",
            images: [],
            image_url: "",
            category_id: "",
            stock: data.inventory_quantity,
            vendor_id: "",
          }])
          .select()
          .single();

        if (insertError) throw insertError;
        product = newProduct;
      }

      // Handle image uploads
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
            product_id: product.id,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList>
            <TabsTrigger value="basic">Basic Details</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <div className="space-y-6">
              <BasicDetails form={form} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CategorySelect form={form} />
                <StatusSelect form={form} />
              </div>
              <MultipleImageUpload onImagesSelect={setImages} maxImages={5} />
            </div>
          </TabsContent>

          <TabsContent value="inventory">
            <div className="space-y-6">
              <InventoryField form={form} />
              <VariantsForm form={form} />
            </div>
          </TabsContent>

          <TabsContent value="seo">
            <SEOFields form={form} />
          </TabsContent>
        </Tabs>

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