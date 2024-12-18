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
import { categories, carouselItems } from "@/data/categories";

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
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-4">
          {/* Categories Sidebar - Hidden on mobile */}
          <div className="hidden lg:block col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <h3 className="px-4 py-3 text-sm font-semibold border-b">Browse Categories</h3>
              <ul className="py-2">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      to={category.path}
                      className="px-4 py-2 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 cursor-pointer transition-colors flex items-center justify-between group"
                    >
                      {category.name}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Carousel - Full width on mobile */}
          <div className="col-span-12 lg:col-span-7">
            <Carousel 
              className="relative rounded-lg overflow-hidden"
              plugins={[autoplayPlugin]}
              setApi={setApi}
            >
              <CarouselContent>
                {carouselItems.map((item, index) => (
                  <CarouselItem key={index}>
                    <Link to={item.link}>
                      <div className="relative h-[300px] md:h-[500px] bg-secondary/5 rounded-lg overflow-hidden">
                        <div className="absolute inset-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                        </div>
                        
                        <div className="relative z-10 h-full flex flex-col justify-center p-4 md:p-8 max-w-lg">
                          <span className="text-white/80 text-sm md:text-base mb-2 animate-fade-in">
                            {item.subtitle}
                          </span>
                          <h1 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-4 animate-fade-in">
                            {item.title}
                          </h1>
                          <p className="text-white/90 text-sm md:text-lg mb-4 md:mb-6 animate-fade-in hidden md:block">
                            {item.description}
                          </p>
                          <Button className="bg-primary hover:bg-primary/90 text-white w-fit group animate-fade-in">
                            Shop Now
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
            </Carousel>
          </div>

          {/* Promotional Banners - Stack on mobile */}
          <div className="col-span-12 lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-4">
            <Link to="/products?collection=beadwork" className="block">
              <div className="bg-accent/20 rounded-lg h-[150px] md:h-[192px] relative overflow-hidden group cursor-pointer">
                <div className="p-4 md:p-6 relative z-10">
                  <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs rounded-full mb-2">New</span>
                  <h3 className="text-base md:text-lg font-semibold text-secondary mb-2">Traditional Beadwork</h3>
                  <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4">Up to 20% off</p>
                  <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white">
                    Shop Now
                  </Button>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&auto=format&fit=crop&q=60"
                  alt="Traditional Beadwork"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </Link>
            <Link to="/products?collection=ankara" className="block">
              <div className="bg-primary/10 rounded-lg h-[150px] md:h-[192px] relative overflow-hidden group cursor-pointer">
                <div className="p-4 md:p-6 relative z-10">
                  <span className="inline-block px-3 py-1 bg-primary text-white text-xs rounded-full mb-2">Popular</span>
                  <h3 className="text-base md:text-lg font-semibold text-secondary mb-2">Ankara Collection</h3>
                  <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4">From $29.99</p>
                  <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white">
                    Shop Now
                  </Button>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&auto=format&fit=crop&q=60"
                  alt="Ankara Collection"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};