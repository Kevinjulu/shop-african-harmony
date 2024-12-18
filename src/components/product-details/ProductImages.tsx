import { useState } from "react";
import { Image } from "@/types/product";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ZoomIn } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProductImageSkeleton } from "./ProductImageSkeleton";

interface ProductImagesProps {
  images: Image[];
  productName: string;
  isLoading?: boolean;
}

export const ProductImages = ({ images, productName, isLoading }: ProductImagesProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile();

  if (isLoading) {
    return <ProductImageSkeleton />;
  }

  const handleImageZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || isMobile) return;
    const image = e.currentTarget;
    const { left, top, width, height } = image.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    image.style.transformOrigin = `${x}% ${y}%`;
  };

  return (
    <div className="space-y-4">
      {isMobile ? (
        // Mobile layout
        <div className="space-y-4">
          <div className="relative aspect-square w-full">
            <img
              src={images[selectedImage]?.url || '/placeholder.svg'}
              alt={productName}
              className="w-full h-full object-cover rounded-lg"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "flex-shrink-0 w-20 aspect-square relative rounded-md border-2 transition-all",
                  selectedImage === index ? "border-primary" : "border-transparent"
                )}
              >
                <img
                  src={image.url}
                  alt={`${productName} view ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      ) : (
        // Desktop layout
        <div className="grid grid-cols-5 gap-4">
          <div className="space-y-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "w-full aspect-square relative overflow-hidden rounded-md border-2 transition-all",
                  selectedImage === index ? "border-primary" : "border-transparent"
                )}
              >
                <img
                  src={image.url}
                  alt={`${productName} view ${index + 1}`}
                  className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          <div
            className={cn(
              "col-span-4 aspect-square relative overflow-hidden rounded-lg border border-gray-200 group",
              isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
            )}
            onMouseMove={handleImageZoom}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={images[selectedImage]?.url || '/placeholder.svg'}
              alt={productName}
              className={cn(
                "w-full h-full object-contain transition-transform duration-200",
                isZoomed ? "scale-150" : "scale-100"
              )}
              loading="eager"
            />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white p-2 rounded-full shadow-md">
                <ZoomIn className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black/90">
          <img
            src={images[selectedImage]?.url || '/placeholder.svg'}
            alt={productName}
            className="w-full h-full object-contain"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};