import { useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ImageUpload } from "./ImageUpload";

interface ProductFormProps {
  onSuccess?: () => void;
}

export const ProductForm = ({ onSuccess }: ProductFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First, create the product
      const { data: product, error: productError } = await supabase
        .from('products')
        .insert([
          {
            name,
            description,
            price: parseFloat(price),
            category,
            stock: parseInt(stock),
            status: 'draft'
          }
        ])
        .select()
        .single();

      if (productError) throw productError;

      // Then upload images
      for (const image of images) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `product-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(filePath, image);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('products')
          .getPublicUrl(filePath);

        // Link image to product
        await supabase
          .from('product_images')
          .insert([
            {
              product_id: product.id,
              url: publicUrl,
              is_primary: true
            }
          ]);
      }

      toast.success("Product created successfully");
      onSuccess?.();
      
      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setStock("");
      setImages([]);
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
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
                <SelectItem value="fashion">Fashion & Clothing</SelectItem>
                <SelectItem value="art">Art & Sculptures</SelectItem>
                <SelectItem value="jewelry">Jewelry & Accessories</SelectItem>
                <SelectItem value="decor">Home Decor</SelectItem>
                <SelectItem value="traditional">Traditional Items</SelectItem>
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

          <ImageUpload
            onImagesSelect={setImages}
            maxImages={5}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Creating Product..." : "Create Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};