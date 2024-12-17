import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "./types";

interface CategorySelectProps {
  form: UseFormReturn<ProductFormData>;
}

export const CategorySelect = ({ form }: CategorySelectProps) => {
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="fashion">Fashion & Clothing</SelectItem>
              <SelectItem value="art">Art & Sculptures</SelectItem>
              <SelectItem value="jewelry">Jewelry & Accessories</SelectItem>
              <SelectItem value="decor">Home Decor</SelectItem>
              <SelectItem value="photography">Photography</SelectItem>
              <SelectItem value="traditional">Traditional Items</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};