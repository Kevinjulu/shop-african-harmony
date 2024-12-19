import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "./types";
import { BasicDetails } from "./BasicDetails";
import { CategorySelect } from "./CategorySelect";
import { StatusSelect } from "./StatusSelect";
import { VariantsForm } from "./VariantsForm";
import { MultipleImageUpload } from "./MultipleImageUpload";
import { TierPricingManager } from "./TierPricingManager";

interface ProductFormFieldsProps {
  form: UseFormReturn<ProductFormData>;
  onImagesSelect: (files: File[]) => void;
}

export const ProductFormFields = ({ form, onImagesSelect }: ProductFormFieldsProps) => {
  return (
    <div className="space-y-8">
      <BasicDetails form={form} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CategorySelect form={form} />
        <StatusSelect form={form} />
      </div>

      <TierPricingManager form={form} />

      <MultipleImageUpload onImagesSelect={onImagesSelect} maxImages={5} />
      
      <VariantsForm form={form} />
    </div>
  );
};