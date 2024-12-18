import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "@/types/product";

interface InventoryFieldProps {
  form: UseFormReturn<ProductFormData>;
}

export const InventoryField = ({ form }: InventoryFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="inventory_quantity"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Inventory Quantity</FormLabel>
          <FormControl>
            <Input
              type="number"
              min="0"
              {...field}
              onChange={(e) => field.onChange(parseInt(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};