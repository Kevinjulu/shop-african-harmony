import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData, ProductVariant } from "./types";

interface VariantsFormProps {
  form: UseFormReturn<ProductFormData>;
}

export const VariantsForm = ({ form }: VariantsFormProps) => {
  const [variants, setVariants] = useState<ProductVariant[]>([]);

  const addVariant = () => {
    setVariants([...variants, {
      size: "",
      color: "",
      sku: "",
      price: 0,
      inventory_quantity: 0
    }]);
  };

  const removeVariant = (index: number) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
    form.setValue("variants", newVariants);
  };

  const updateVariant = (index: number, field: keyof ProductVariant, value: string | number) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setVariants(newVariants);
    form.setValue("variants", newVariants);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Product Variants</h3>
        <Button type="button" variant="outline" onClick={addVariant}>
          <Plus className="w-4 h-4 mr-2" />
          Add Variant
        </Button>
      </div>

      {variants.map((variant, index) => (
        <div key={index} className="border p-4 rounded-lg space-y-4">
          <div className="flex justify-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeVariant(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Size</label>
              <Input
                value={variant.size}
                onChange={(e) => updateVariant(index, "size", e.target.value)}
                placeholder="Size"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Color</label>
              <Input
                value={variant.color}
                onChange={(e) => updateVariant(index, "color", e.target.value)}
                placeholder="Color"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">SKU</label>
              <Input
                value={variant.sku}
                onChange={(e) => updateVariant(index, "sku", e.target.value)}
                placeholder="SKU"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Price</label>
              <Input
                type="number"
                step="0.01"
                value={variant.price}
                onChange={(e) => updateVariant(index, "price", parseFloat(e.target.value))}
                placeholder="Price"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Stock</label>
              <Input
                type="number"
                value={variant.inventory_quantity}
                onChange={(e) => updateVariant(index, "inventory_quantity", parseInt(e.target.value))}
                placeholder="Stock"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};