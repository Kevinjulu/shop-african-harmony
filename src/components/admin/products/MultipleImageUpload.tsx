import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface MultipleImageUploadProps {
  onImagesSelect: (files: File[]) => void;
  maxImages?: number;
}

export const MultipleImageUpload = ({ onImagesSelect, maxImages = 5 }: MultipleImageUploadProps) => {
  const [previews, setPreviews] = useState<string[]>([]);
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
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviews(newPreviews);
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
          {files.length}/{maxImages} images
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