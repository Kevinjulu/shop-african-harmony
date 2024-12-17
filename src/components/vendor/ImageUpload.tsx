import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  currentImage?: string;
}

export const ImageUpload = ({ onImageSelect, currentImage }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string>(currentImage || '');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error("File must be an image");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageSelect(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview('');
    // Reset the file input
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('image-upload')?.click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Image
        </Button>
        {preview && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemoveImage}
          >
            <X className="w-4 h-4 mr-1" />
            Remove
          </Button>
        )}
      </div>

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      {preview && (
        <div className="relative aspect-square w-full max-w-md mx-auto">
          <img
            src={preview}
            alt="Product preview"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
};