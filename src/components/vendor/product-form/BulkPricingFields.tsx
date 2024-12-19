import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "./types";
import { useState } from "react";

interface BulkPricingFieldsProps {
  form: UseFormReturn<ProductFormData>;
}

export const BulkPricingFields = ({ form }: BulkPricingFieldsProps) => {
  const [tiers, setTiers] = useState([{ minQuantity: 0, maxQuantity: 0, price: 0 }]);

  const addTier = () => {
    setTiers([...tiers, { minQuantity: 0, maxQuantity: 0, price: 0 }]);
  };

  const removeTier = (index: number) => {
    setTiers(tiers.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Bulk Pricing Settings</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="minimum_order_quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Order Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_bulk_only"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Bulk Orders Only</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Only allow bulk purchases of this product
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium">Tiered Pricing</h4>
          <Button type="button" variant="outline" size="sm" onClick={addTier}>
            <Plus className="w-4 h-4 mr-2" />
            Add Tier
          </Button>
        </div>

        {tiers.map((tier, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 items-end border rounded-lg p-4">
            <FormItem>
              <FormLabel>Min Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  value={tier.minQuantity}
                  onChange={(e) => {
                    const newTiers = [...tiers];
                    newTiers[index].minQuantity = parseInt(e.target.value);
                    setTiers(newTiers);
                    form.setValue('tier_pricing', newTiers);
                  }}
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Max Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  value={tier.maxQuantity}
                  onChange={(e) => {
                    const newTiers = [...tiers];
                    newTiers[index].maxQuantity = parseInt(e.target.value);
                    setTiers(newTiers);
                    form.setValue('tier_pricing', newTiers);
                  }}
                />
              </FormControl>
            </FormItem>

            <div className="flex gap-2">
              <FormItem className="flex-1">
                <FormLabel>Price per Unit</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={tier.price}
                    onChange={(e) => {
                      const newTiers = [...tiers];
                      newTiers[index].price = parseFloat(e.target.value);
                      setTiers(newTiers);
                      form.setValue('tier_pricing', newTiers);
                    }}
                  />
                </FormControl>
              </FormItem>
              
              {index > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="self-end"
                  onClick={() => removeTier(index)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};