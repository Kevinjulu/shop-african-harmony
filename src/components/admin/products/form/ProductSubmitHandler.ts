import { supabase } from "@/integrations/supabase/client";
import { ProductFormData, Product } from "@/types/product";
import { toast } from "sonner";
import { uploadProductImages } from "./ImageUploadHandler";

export const handleProductSubmit = async (
  data: ProductFormData,
  product: Product | undefined,
  onSuccess?: () => void
) => {
  console.log("Submitting product data:", data);
  
  try {
    let uploadedImages = [];

    // Handle new image uploads if any
    if (data.newImages && data.newImages.length > 0) {
      uploadedImages = await uploadProductImages(data.newImages, product?.id);
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

      // Insert new product images
      if (uploadedImages.length > 0) {
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
    }
    
    onSuccess?.();
    return true;
  } catch (error) {
    console.error("Error saving product:", error);
    toast.error("Failed to save product");
    return false;
  }
};