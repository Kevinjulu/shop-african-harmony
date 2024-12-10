import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <div className="bg-cream">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
              African Collection
              <br />
              <span className="text-primary">Handcrafted Beauty</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Discover authentic African crafts, from traditional Maasai beads to
              contemporary Ankara fashion.
            </p>
            <Button className="bg-primary hover:bg-primary-dark text-white group">
              Shop Now
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] bg-accent/20 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="African Crafts Collection"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
              <p className="text-primary font-bold">Special Offer</p>
              <p className="text-sm text-gray-600">Up to 40% off</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};