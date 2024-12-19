import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData, TierPricing } from "@/types/product";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TierPricingManagerProps {
  form: UseFormReturn<ProductFormData>;
}

export const TierPricingManager = ({ form }: TierPricingManagerProps) => {
  const [tiers, setTiers] = useState<TierPricing[]>([]);

  const addTier = () => {
    setTiers([...tiers, { minQuantity: 0, maxQuantity: 0, price: 0 }]);
  };

  const removeTier = (index: number) => {
    const newTiers = tiers.filter((_, i) => i !== index);
    setTiers(newTiers);
    form.setValue("tier_pricing", newTiers);
  };

  const updateTier = (index: number, field: keyof TierPricing, value: number) => {
    const newTiers = [...tiers];
    newTiers[index] = { ...newTiers[index], [field]: value };
    setTiers(newTiers);
    form.setValue("tier_pricing", newTiers);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Tiered Pricing</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button type="button" variant="outline" onClick={addTier}>
            <Plus className="w-4 h-4 mr-2" />
            Add Price Tier
          </Button>

          {tiers.map((tier, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 items-end border rounded-lg p-4">
              <div>
                <label className="text-sm font-medium">Min Quantity</label>
                <Input
                  type="number"
                  min="0"
                  value={tier.minQuantity}
                  onChange={(e) => updateTier(index, "minQuantity", parseInt(e.target.value))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Max Quantity</label>
                <Input
                  type="number"
                  min="0"
                  value={tier.maxQuantity}
                  onChange={(e) => updateTier(index, "maxQuantity", parseInt(e.target.value))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Price per Unit</label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={tier.price}
                  onChange={(e) => updateTier(index, "price", parseFloat(e.target.value))}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeTier(index)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};