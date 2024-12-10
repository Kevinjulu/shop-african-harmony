import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="bg-cream">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-4">
              Discover Authentic African Crafts
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Explore our curated collection of handmade African crafts, from
              traditional Maasai beads to contemporary Ankara fashion.
            </p>
            <Button className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg">
              Shop Now
            </Button>
          </div>
          <div className="relative">
            <div className="aspect-square bg-accent rounded-full absolute -top-4 -right-4 w-24 h-24 md:w-32 md:h-32" />
            <img
              src="/placeholder.svg"
              alt="African Crafts"
              className="relative z-10 rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};