import { useState } from "react";
import { Image } from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductImagesProps {
  images: Image[];
  productName: string;
}

export const ProductImages = ({ images, productName }: ProductImagesProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const image = e.currentTarget;
    const { left, top, width, height } = image.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    image.style.transformOrigin = `${x}% ${y}%`;
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "aspect-square relative overflow-hidden rounded-lg border border-gray-200",
          isZoomed && "cursor-zoom-out",
          !isZoomed && "cursor-zoom-in"
        )}
        onMouseMove={handleImageZoom}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <img
          src={images[selectedImage]?.url || images[0]?.url}
          alt={productName}
          className={cn(
            "w-full h-full object-cover transition-transform duration-200",
            isZoomed ? "scale-150" : "scale-100"
          )}
          loading="eager"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              "aspect-square relative overflow-hidden rounded-lg border-2 transition-all",
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
    </div>
  );
};