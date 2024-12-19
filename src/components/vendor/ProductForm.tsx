import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";
import { ProductFormFields } from "./ProductFormFields";
import { ProductFormData } from "./product-form/types";

export const ProductForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const { user } = useAuth();

  const form = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      inventory_quantity: 0,
      status: "draft",
      variants: [],
      sku: "",
      weight: 0,
      dimensions: "",
      materials: "",
      tags: "",
      minimum_order_quantity: 1,
      is_bulk_only: false,
      tier_pricing: [],
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    if (!user) {
      toast.error("You must be logged in to add products");
      return;
    }

    setIsLoading(true);
    try {
      const { data: vendorProfile } = await supabase
        .from('vendor_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!vendorProfile) throw new Error("Vendor profile not found");

      // Upload main product
      const { data: product, error: productError } = await supabase
        .from('products')
        .insert([
          {
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            inventory_quantity: data.inventory_quantity,
            vendor_id: vendorProfile.id,
            status: data.status,
            minimum_order_quantity: data.minimum_order_quantity,
            is_bulk_only: data.is_bulk_only,
          },
        ])
        .select()
        .single();

      if (productError) throw productError;

      // Upload tier pricing
      if (data.tier_pricing.length > 0) {
        const { error: tierError } = await supabase
          .from('product_tier_pricing')
          .insert(
            data.tier_pricing.map(tier => ({
              product_id: product.id,
              min_quantity: tier.minQuantity,
              max_quantity: tier.maxQuantity,
              price_per_unit: tier.price,
            }))
          );

        if (tierError) throw tierError;
      }

      // Upload images
      for (const [index, file] of imageFiles.entries()) {
        const fileExt = file.name.split('.').pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        await supabase.from('product_images').insert([{
          product_id: product.id,
          image_url: publicUrl,
          is_primary: index === 0,
          display_order: index,
        }]);
      }

      // Upload variants
      if (data.variants.length > 0) {
        const { error: variantsError } = await supabase
          .from('product_variants')
          .insert(
            data.variants.map(variant => ({
              product_id: product.id,
              ...variant
            }))
          );

        if (variantsError) throw variantsError;
      }

      toast.success("Product added successfully!");
      form.reset();
      setImageFiles([]);
      onSuccess?.();
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error("Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ProductFormFields 
          form={form}
          onImagesSelect={(files) => setImageFiles(files)}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Adding Product..." : "Add Product"}
        </Button>
      </form>
    </Form>
  );
};