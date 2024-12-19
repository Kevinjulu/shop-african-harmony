import { supabase } from "@/integrations/supabase/client";
import { ProductFormData, Product } from "@/types/product";
import { toast } from "sonner";

const uploadImages = async (files: File[], productId: string) => {
  console.log("Uploading images for product:", productId);
  const uploadedImages = [];

  for (const file of files) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    console.log("Uploading file:", fileName);
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, file);

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);

    uploadedImages.push({
      url: publicUrl,
      is_primary: uploadedImages.length === 0
    });
  }

  return uploadedImages;
};

const deleteOldImages = async (productId: string) => {
  console.log("Deleting old images for product:", productId);
  const { data: oldImages, error: fetchError } = await supabase
    .from('product_images')
    .select('image_url')
    .eq('product_id', productId);

  if (fetchError) {
    console.error("Error fetching old images:", fetchError);
    throw fetchError;
  }

  for (const image of oldImages || []) {
    const fileName = image.image_url.split('/').pop();
    if (fileName) {
      const { error: deleteError } = await supabase.storage
        .from('product-images')
        .remove([fileName]);

      if (deleteError) {
        console.error("Error deleting image:", deleteError);
      }
    }
  }

  const { error: deleteDbError } = await supabase
    .from('product_images')
    .delete()
    .eq('product_id', productId);

  if (deleteDbError) {
    console.error("Error deleting image records:", deleteDbError);
    throw deleteDbError;
  }
};

export const handleProductSubmit = async (
  data: ProductFormData,
  existingProduct: Product | null,
  uploadedImages: File[],
  onSuccess?: () => void
) => {
  console.log("Starting product submission:", { data, existingProduct });
  
  try {
    const productData = {
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      inventory_quantity: data.inventory_quantity,
      status: data.status,
      origin_country: data.origin_country,
      meta_title: data.meta_title,
      meta_description: data.meta_description,
      keywords: data.keywords,
      stock: data.stock,
      updated_at: new Date().toISOString()
    };

    let productId = existingProduct?.id;

    if (existingProduct) {
      console.log("Updating existing product:", productId);
      const { error: updateError } = await supabase
        .from('products')
        .update(productData)
        .eq('id', productId);

      if (updateError) {
        console.error("Error updating product:", updateError);
        throw updateError;
      }
    } else {
      console.log("Creating new product");
      const { data: newProduct, error: createError } = await supabase
        .from('products')
        .insert([{
          ...productData,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (createError) {
        console.error("Error creating product:", createError);
        throw createError;
      }

      productId = newProduct.id;
    }

    if (uploadedImages.length > 0 && productId) {
      if (existingProduct) {
        await deleteOldImages(productId);
      }

      const images = await uploadImages(uploadedImages, productId);
      
      const { error: imageError } = await supabase
        .from('product_images')
        .insert(
          images.map(img => ({
            product_id: productId,
            image_url: img.url,
            is_primary: img.is_primary,
            display_order: 0
          }))
        );

      if (imageError) {
        console.error("Error saving image records:", imageError);
        throw imageError;
      }
    }

    toast.success(existingProduct ? "Product updated successfully" : "Product created successfully");
    onSuccess?.();
    return true;
  } catch (error) {
    console.error("Error in product submission:", error);
    toast.error("Failed to save product. Please try again.");
    throw error;
  }
};