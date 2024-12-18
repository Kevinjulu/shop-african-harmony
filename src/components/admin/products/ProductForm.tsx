import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ImageUpload } from "./ImageUpload";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

interface ProductFormProps {
  product?: Product | null;
  onSuccess?: () => void;
}

export const ProductForm = ({ product, onSuccess }: ProductFormProps) => {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [category, setCategory] = useState(product?.category || "");
  const [stock, setStock] = useState(product?.stock?.toString() || "");
  const [status, setStatus] = useState(product?.status || "draft");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        name,
        description,
        price: parseFloat(price),
        category,
        stock: parseInt(stock),
        status,
      };

      let productId = product?.id;

      if (product) {
        // Update existing product
        const { error: updateError } = await supabase
          .from("products")
          .update(productData)
          .eq("id", product.id);

        if (updateError) throw updateError;
      } else {
        // Create new product
        const { data: newProduct, error: insertError } = await supabase
          .from("products")
          .insert([productData])
          .select()
          .single();

        if (insertError) throw insertError;
        productId = newProduct.id;
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

        // Link image to product - using the correct schema field name (image_url)
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
      toast.error(product ? "Failed to update product" : "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Product Name</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Price</label>
        <Input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((cat) => (
              <SelectItem key={cat.id} value={cat.name}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Stock</label>
        <Input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
  );
};