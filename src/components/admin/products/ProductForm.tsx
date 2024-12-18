import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";

const productSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Price must be a valid number.",
  }),
  stock: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Stock must be a valid number.",
  }),
});

export const ProductForm = ({ product }: { product?: Product }) => {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price?.toString() || "",
      stock: product?.stock?.toString() || "",
    },
  });

  const onSubmit = async (productData: z.infer<typeof productSchema>) => {
    try {
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
        toast.success("Product updated successfully");
      } else {
        const { error: createError } = await supabase
          .from("products")
          .insert([
            {
              ...productData,
              origin_country: "US",
              images: [],
            },
          ]);

        if (createError) throw createError;
        toast.success("Product created successfully");
        form.reset();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save product");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Product name" {...field} />
              </FormControl>
              <FormDescription>
                Enter the name of your product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Product description"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Describe your product in detail.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Set the price for your product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter the available quantity.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {product ? "Update Product" : "Create Product"}
        </Button>
      </form>
    </Form>
  );
};