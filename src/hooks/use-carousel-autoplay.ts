import { useCallback, useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel-react";

interface AutoplayOptions {
  delay?: number;
  stopOnInteraction?: boolean;
}

export const useCarouselAutoplay = (options: AutoplayOptions = {}) => {
  const { delay = 5000, stopOnInteraction = true } = options;
  const [autoplayInterval, setAutoplayInterval] = useState<NodeJS.Timeout | null>(null);
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null);

  const startAutoplay = useCallback(() => {
    if (!emblaApi || autoplayInterval) return;

    const interval = setInterval(() => {
      if (!emblaApi.canScrollNext()) {
        emblaApi.scrollTo(0);
      } else {
        emblaApi.scrollNext();
      }
    }, delay);

    setAutoplayInterval(interval);
  }, [emblaApi, delay, autoplayInterval]);

  const stopAutoplay = useCallback(() => {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      setAutoplayInterval(null);
    }
  }, [autoplayInterval]);

  const handleMouseEnter = useCallback(() => {
    if (stopOnInteraction) {
      stopAutoplay();
    }
  }, [stopAutoplay, stopOnInteraction]);

  const handleMouseLeave = useCallback(() => {
    startAutoplay();
  }, [startAutoplay]);

  useEffect(() => {
    if (!emblaApi) return;

    startAutoplay();
    
    if (stopOnInteraction) {
      emblaApi.on('pointerDown', stopAutoplay);
    }

    return () => {
      stopAutoplay();
      if (stopOnInteraction) {
        emblaApi.off('pointerDown', stopAutoplay);
      }
    };
  }, [emblaApi, stopOnInteraction, startAutoplay, stopAutoplay]);

  return {
    setEmblaApi,
    handleMouseEnter,
    handleMouseLeave,
  };
};