import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const uploadProductImages = async (files: File[], productId?: string) => {
  try {
    console.log("Starting image upload process...");
    const uploadedImages = [];
    
    // If updating an existing product, delete old images first
    if (productId) {
      console.log("Deleting existing images for product:", productId);
      const { error: deleteError } = await supabase
        .from("product_images")
        .delete()
        .eq("product_id", productId);

      if (deleteError) {
        console.error("Error deleting old images:", deleteError);
        throw deleteError;
      }
    }
    
    for (const file of files) {
      console.log("Processing file:", file.name);
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
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