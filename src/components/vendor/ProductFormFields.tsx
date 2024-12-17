import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "./product-form/types";
import { BasicDetails } from "./product-form/BasicDetails";
import { CategorySelect } from "./product-form/CategorySelect";
import { StatusSelect } from "./product-form/StatusSelect";
import { VariantsForm } from "./product-form/VariantsForm";
import { MultipleImageUpload } from "./product-form/MultipleImageUpload";

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

      <MultipleImageUpload onImagesSelect={onImagesSelect} maxImages={5} />
      
      <VariantsForm form={form} />
    </div>
  );
};