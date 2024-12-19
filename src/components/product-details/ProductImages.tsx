import { useState } from "react";
import { Image } from "@/types/product";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProductImageSkeleton } from "./ProductImageSkeleton";
import { Button } from "@/components/ui/button";

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

  const displayImages = images.length > 0 ? images : [{ url: '/placeholder.svg', alt: productName }];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % displayImages.length);
  };

  const previousImage = () => {
    setSelectedImage((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <div className="space-y-4">
      {isMobile ? (
        // Mobile layout
        <div className="space-y-4">
          <div className="relative aspect-square w-full">
            <img
              src={displayImages[selectedImage]?.url || '/placeholder.svg'}
              alt={productName}
              className="w-full h-full object-contain rounded-lg bg-white"
              onClick={() => setIsModalOpen(true)}
            />
            <div className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-sm">
              <ZoomIn className="w-5 h-5 text-gray-600" />
            </div>
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5">
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    selectedImage === index ? "bg-primary w-4" : "bg-gray-300"
                  )}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Desktop layout
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-2 space-y-2 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 pr-2">
            {displayImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "w-full aspect-square relative overflow-hidden rounded-md border-2 transition-all",
                  selectedImage === index ? "border-primary" : "border-transparent hover:border-gray-300"
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

          <div className="col-span-10 relative">
            <div
              className={cn(
                "aspect-[4/3] relative overflow-hidden rounded-lg border border-gray-200 bg-white",
                isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
              )}
              onMouseMove={handleImageZoom}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onClick={() => setIsModalOpen(true)}
            >
              <img
                src={displayImages[selectedImage]?.url || '/placeholder.svg'}
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

            {displayImages.length > 1 && (
              <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/80 hover:bg-white rounded-full shadow-md"
                  onClick={previousImage}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/80 hover:bg-white rounded-full shadow-md"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black/90">
          <div className="relative">
            <img
              src={displayImages[selectedImage]?.url || '/placeholder.svg'}
              alt={productName}
              className="w-full h-full object-contain"
            />
            {displayImages.length > 1 && (
              <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/20 hover:bg-white/40 rounded-full"
                  onClick={previousImage}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/20 hover:bg-white/40 rounded-full"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};