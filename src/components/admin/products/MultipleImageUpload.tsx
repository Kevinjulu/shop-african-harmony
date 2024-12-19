import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { ProductImage } from "@/types/product";

interface MultipleImageUploadProps {
  onImagesSelect: (files: File[]) => void;
  maxImages?: number;
  existingImages?: ProductImage[];
}

export const MultipleImageUpload = ({ 
  onImagesSelect, 
  maxImages = 5,
  existingImages = []
}: MultipleImageUploadProps) => {
  const [previews, setPreviews] = useState<string[]>(existingImages.map(img => img.image_url));
  const [files, setFiles] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      
      if (files.length + selectedFiles.length > maxImages) {
        toast.error(`Maximum ${maxImages} images allowed`);
        return;
      }

      const invalidFiles = selectedFiles.filter(
        file => !file.type.startsWith('image/') || file.size > 5 * 1024 * 1024
      );

      if (invalidFiles.length > 0) {
        toast.error("Some files were invalid. Images must be less than 5MB");
        return;
      }

      const newFiles = [...files, ...selectedFiles];
      setFiles(newFiles);
      onImagesSelect(newFiles);

      // Generate previews
      selectedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    // If it's an existing image, just remove from previews
    if (index < existingImages.length) {
      setPreviews(prev => prev.filter((_, i) => i !== index));
      return;
    }

    // If it's a new image, remove from both files and previews
    const adjustedIndex = index - existingImages.length;
    const newFiles = files.filter((_, i) => i !== adjustedIndex);
    setFiles(newFiles);
    setPreviews(prev => prev.filter((_, i) => i !== index));
    onImagesSelect(newFiles);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('multiple-image-upload')?.click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Images
        </Button>
        <span className="text-sm text-gray-500">
          {previews.length}/{maxImages} images
        </span>
      </div>

      <input
        id="multiple-image-upload"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleImageChange}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative aspect-square">
            <img
              src={preview}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              onClick={() => removeImage(index)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};