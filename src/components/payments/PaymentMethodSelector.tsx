import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface PaymentMethod {
  id: string;
  name: string;
  type: 'mpesa' | 'flutterwave' | 'paystack' | 'coingate';
  icon: string;
}

interface PaymentMethodSelectorProps {
  methods: PaymentMethod[];
  onSelect: (method: PaymentMethod) => void;
}

export const PaymentMethodSelector = ({ methods, onSelect }: PaymentMethodSelectorProps) => {
  const [selected, setSelected] = useState<string>(methods[0]?.id);

  const handleSelect = (methodId: string) => {
    const method = methods.find(m => m.id === methodId);
    if (method) {
      setSelected(methodId);
      onSelect(method);
    }
  };

  return (
    <RadioGroup
      value={selected}
      onValueChange={handleSelect}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {methods.map((method) => (
        <Card key={method.id} className="relative p-4">
          <RadioGroupItem
            value={method.id}
            id={method.id}
            className="absolute right-4 top-4"
          />
          <Label htmlFor={method.id} className="flex items-center space-x-3">
            <img src={method.icon} alt={method.name} className="w-8 h-8" />
            <span>{method.name}</span>
          </Label>
        </Card>
      ))}
    </RadioGroup>
  );
};