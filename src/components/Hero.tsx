import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { carouselItems } from "@/data/categories";

export const Hero = () => {
  const [api, setApi] = useState<any>(null);
  const autoplayPlugin = Autoplay({ delay: 5000, stopOnInteraction: true });

  useEffect(() => {
    if (api) {
      console.log("Carousel initialized");
    }
  }, [api]);

  return (
    <div className="bg-cream">
      <div className="container mx-auto px-3 md:px-4 py-3 md:py-6">
        <div className="grid grid-cols-12 gap-2 md:gap-4">
          {/* Main Carousel - Full width */}
          <div className="col-span-12 lg:col-span-9">
            <Carousel 
              className="relative rounded-lg overflow-hidden"
              plugins={[autoplayPlugin]}
              setApi={setApi}
            >
              <CarouselContent>
                {carouselItems.map((item, index) => (
                  <CarouselItem key={index}>
                    <Link to={`/products?collection=${encodeURIComponent(item.collection)}`}>
                      <div className="relative h-[200px] sm:h-[300px] md:h-[500px] bg-secondary/5 rounded-lg overflow-hidden">
                        <div className="absolute inset-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                        </div>
                        
                        <div className="relative z-10 h-full flex flex-col justify-center p-3 md:p-8 max-w-lg">
                          <span className="text-xs md:text-base text-white mb-1 md:mb-2 animate-fade-in">
                            {item.subtitle}
                          </span>
                          <h1 className="text-xl sm:text-2xl md:text-5xl font-bold text-white mb-1 md:mb-4 animate-fade-in">
                            {item.title}
                          </h1>
                          <p className="text-sm md:text-lg text-white mb-2 md:mb-6 animate-fade-in hidden sm:block">
                            {item.description}
                          </p>
                          <Button 
                            className="bg-primary hover:bg-primary-dark text-white w-fit group animate-fade-in text-sm md:text-base px-3 md:px-4 py-1.5 md:py-2"
                            onClick={(e) => {
                              e.preventDefault();
                              window.location.href = `/products?collection=${encodeURIComponent(item.collection)}`;
                            }}
                          >
                            Shop Now
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1.5 md:ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2" />
              <CarouselNext className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2" />
            </Carousel>
          </div>

          {/* Promotional Banners - Stack on mobile */}
          <div className="col-span-12 lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-2 md:gap-4">
            <Link to="/products?collection=beadwork" className="block">
              <div className="relative aspect-[4/3] lg:aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer">
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&auto=format&fit=crop&q=60"
                    alt="Traditional Beadwork"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-end">
                  <span className="inline-block px-1.5 py-0.5 md:px-2 md:py-0.5 bg-primary text-white text-[10px] md:text-xs rounded-full mb-1 md:mb-2 w-fit">New</span>
                  <h3 className="text-sm md:text-lg font-semibold text-white mb-1">Traditional Beadwork</h3>
                  <p className="text-[10px] md:text-sm text-white/90 mb-2">Up to 20% off</p>
                  <Button variant="outline" size="sm" className="w-fit bg-white hover:bg-white/90 text-primary text-xs md:text-sm">
                    Shop Now
                  </Button>
                </div>
              </div>
            </Link>
            <Link to="/products?collection=ankara" className="block">
              <div className="relative aspect-[4/3] lg:aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer">
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&auto=format&fit=crop&q=60"
                    alt="Ankara Collection"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-end">
                  <span className="inline-block px-1.5 py-0.5 md:px-2 md:py-0.5 bg-primary text-white text-[10px] md:text-xs rounded-full mb-1 md:mb-2 w-fit">Popular</span>
                  <h3 className="text-sm md:text-lg font-semibold text-white mb-1">Ankara Collection</h3>
                  <p className="text-[10px] md:text-sm text-white/90 mb-2">From $29.99</p>
                  <Button variant="outline" size="sm" className="w-fit bg-white hover:bg-white/90 text-primary text-xs md:text-sm">
                    Shop Now
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
