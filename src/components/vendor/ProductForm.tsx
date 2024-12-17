import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";
import { ProductFormFields } from "./ProductFormFields";
import { ImageUpload } from "./ImageUpload";

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  sku: string;
  weight: number;
  dimensions: string;
  materials: string;
  tags: string;
}

export const ProductForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { user } = useAuth();

  const form = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
      sku: "",
      weight: 0,
      dimensions: "",
      materials: "",
      tags: "",
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    if (!user) {
      toast.error("You must be logged in to add products");
      return;
    }

    setIsLoading(true);
    try {
      let imageUrl = null;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      const { data: vendorProfile } = await supabase
        .from('vendor_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!vendorProfile) throw new Error("Vendor profile not found");

      const { error } = await supabase.from('products').insert([
        {
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          stock: data.stock,
          image_url: imageUrl,
          vendor_id: vendorProfile.id,
          sku: data.sku,
          weight: data.weight,
          dimensions: data.dimensions,
          materials: data.materials,
          tags: data.tags.split(',').map(tag => tag.trim()),
        },
      ]);

      if (error) throw error;

      toast.success("Product added successfully!");
      form.reset();
      setImageFile(null);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ProductFormFields form={form} />
        
        <div className="space-y-2">
          <ImageUpload
            onImageSelect={(file) => setImageFile(file)}
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Adding Product..." : "Add Product"}
        </Button>
      </form>
    </Form>
  );
};