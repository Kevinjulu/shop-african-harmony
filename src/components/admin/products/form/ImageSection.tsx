import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "@/types/product";
import { MultipleImageUpload } from "../MultipleImageUpload";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ImageSectionProps {
  form: UseFormReturn<ProductFormData>;
  productId?: string;
}

export const ImageSection = ({ form, productId }: ImageSectionProps) => {
  const handleImageUpload = async (files: File[]) => {
    try {
      console.log("Uploading images for product:", productId);
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

      // If this is an update, remove old images first
      if (productId) {
        console.log("Removing old product images");
        const { error: deleteError } = await supabase
          .from('product_images')
          .delete()
          .eq('product_id', productId);

        if (deleteError) {
          console.error("Error deleting old images:", deleteError);
          throw deleteError;
        }
      }

      return uploadedImages;
    } catch (error) {
      console.error("Error in image upload:", error);
      toast.error("Failed to upload images");
      throw error;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Product Images</h3>
      <MultipleImageUpload 
        onImagesSelect={(files) => {
          form.setValue('newImages', files);
        }} 
        maxImages={5}
      />
    </div>
  );
};