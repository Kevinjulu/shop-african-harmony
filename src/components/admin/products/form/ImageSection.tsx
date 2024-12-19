import { UseFormReturn } from "react-hook-form";
import { ProductFormData, ProductImage } from "@/types/product";
import { MultipleImageUpload } from "../MultipleImageUpload";

interface ImageSectionProps {
  form: UseFormReturn<ProductFormData>;
  productId?: string;
  onImagesSelect: (files: File[]) => void;
  existingImages?: ProductImage[];
}

export const ImageSection = ({ form, productId, onImagesSelect, existingImages = [] }: ImageSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Product Images</h3>
      <MultipleImageUpload 
        onImagesSelect={onImagesSelect}
        maxImages={5}
        existingImages={existingImages}
      />
    </div>
  );
};