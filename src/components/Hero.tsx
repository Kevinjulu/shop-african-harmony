import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Hero = () => {
  return (
    <div className="bg-cream">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-4">
          {/* Categories Sidebar */}
          <div className="hidden lg:block col-span-2 bg-white rounded-lg shadow-sm">
            <ul className="py-2">
              {["Jewelry & Beads", "Fabrics & Textiles", "Art & Sculptures", "Home Decor", "Musical Instruments", "Fashion", "Accessories"].map((category, index) => (
                <li key={index} className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 hover:text-primary transition-colors">
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {/* Main Carousel */}
          <div className="col-span-12 lg:col-span-7">
            <Carousel className="relative rounded-lg overflow-hidden">
              <CarouselContent>
                <CarouselItem>
                  <div className="relative h-[400px] bg-secondary/5 rounded-lg p-8 flex flex-col justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
                      African Collection
                      <br />
                      <span className="text-primary">Handcrafted Beauty</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-6 max-w-md">
                      Discover authentic African crafts, from traditional Maasai beads to
                      contemporary Ankara fashion.
                    </p>
                    <Button className="bg-primary hover:bg-primary-dark text-white w-fit group">
                      Shop Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <img
                      src="/placeholder.svg"
                      alt="African Crafts"
                      className="absolute right-0 bottom-0 h-full w-1/2 object-cover object-left"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2" />
              <CarouselNext className="absolute right-4 top-1/2" />
            </Carousel>
          </div>

          {/* Promotional Banners */}
          <div className="hidden lg:flex col-span-3 flex-col gap-4">
            <div className="bg-accent/20 rounded-lg h-[192px] relative overflow-hidden group">
              <div className="p-6 relative z-10">
                <h3 className="text-lg font-semibold text-secondary mb-2">New Arrivals</h3>
                <p className="text-sm text-gray-600 mb-4">Get up to 20% off</p>
                <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white">
                  Shop Now
                </Button>
              </div>
              <img
                src="/placeholder.svg"
                alt="New Arrivals"
                className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="bg-primary/10 rounded-lg h-[192px] relative overflow-hidden group">
              <div className="p-6 relative z-10">
                <h3 className="text-lg font-semibold text-secondary mb-2">Best Sellers</h3>
                <p className="text-sm text-gray-600 mb-4">From $29.99</p>
                <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white">
                  Shop Now
                </Button>
              </div>
              <img
                src="/placeholder.svg"
                alt="Best Sellers"
                className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};