import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "@/types/product";

interface SEOFieldsProps {
  form: UseFormReturn<ProductFormData>;
}

export const SEOFields = ({ form }: SEOFieldsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="meta_title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Meta Title</FormLabel>
            <FormControl>
              <Input {...field} placeholder="SEO optimized title" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="meta_description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Meta Description</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder="Brief description for search engines"
                className="h-20"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="keywords"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Keywords</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Comma-separated keywords" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};