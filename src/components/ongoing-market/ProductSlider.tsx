import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ProductCard } from "./ProductCard";
import { useIsMobile } from "@/hooks/use-mobile";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";

interface ProductSliderProps {
  products: Array<{
    id: string;
    name: string;
    originalPrice: number;
    discountedPrice: number;
    image: string;
    discount: string;
    moq: number;
  }>;
}

export const ProductSlider = ({ products }: ProductSliderProps) => {
  const isMobile = useIsMobile();
  const [api, setApi] = useState<any>(null);
  const autoplayPlugin = Autoplay({ delay: 3000, stopOnInteraction: true });

  if (!isMobile) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <Carousel
      setApi={setApi}
      plugins={[autoplayPlugin]}
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product.id} className="basis-full">
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute -bottom-4 left-0 right-0 flex justify-center gap-1">
        {products.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              api?.selectedScrollSnap() === index
                ? "bg-primary w-4"
                : "bg-primary/30"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </Carousel>
  );
};