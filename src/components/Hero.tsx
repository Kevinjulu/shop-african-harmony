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

const categories = [
  { name: "Jewelry & Beads", path: "/products?category=jewelry" },
  { name: "Fabrics & Textiles", path: "/products?category=fabrics" },
  { name: "Art & Sculptures", path: "/products?category=art" },
  { name: "Home Decor", path: "/products?category=decor" },
  { name: "Musical Instruments", path: "/products?category=music" },
  { name: "Fashion", path: "/products?category=fashion" },
  { name: "Accessories", path: "/products?category=accessories" },
  { name: "Traditional Wear", path: "/products?category=traditional" },
  { name: "Handmade Crafts", path: "/products?category=handmade" },
  { name: "Cultural Items", path: "/products?category=cultural" }
];

const carouselItems = [
  {
    title: "African Collection",
    subtitle: "Handcrafted Beauty",
    description: "Discover authentic African crafts, from traditional Maasai beads to contemporary Ankara fashion.",
    image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&auto=format&fit=crop&q=60",
    link: "/products?collection=african"
  },
  {
    title: "Traditional Art",
    subtitle: "Cultural Heritage",
    description: "Explore our collection of traditional African art pieces that tell stories of rich heritage.",
    image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&auto=format&fit=crop&q=60",
    link: "/products?collection=traditional"
  },
  {
    title: "Modern Fusion",
    subtitle: "Contemporary African Design",
    description: "Experience the perfect blend of traditional African craftsmanship with modern design.",
    image: "https://images.unsplash.com/photo-1590735213408-9d0cd4b24fd7?w=800&auto=format&fit=crop&q=60",
    link: "/products?collection=modern"
  }
];

export const Hero = () => {
  return (
    <div className="bg-cream">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-4">
          {/* Categories Sidebar */}
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

          {/* Main Carousel */}
          <div className="col-span-12 lg:col-span-7">
            <Carousel className="relative rounded-lg overflow-hidden">
              <CarouselContent>
                {carouselItems.map((item, index) => (
                  <CarouselItem key={index}>
                    <Link to={item.link}>
                      <div className="relative h-[300px] md:h-[400px] bg-secondary/5 rounded-lg p-8 flex flex-col justify-center overflow-hidden">
                        <div className="relative z-10">
                          <h1 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
                            {item.title}
                            <br />
                            <span className="text-primary">{item.subtitle}</span>
                          </h1>
                          <p className="text-base md:text-lg text-gray-600 mb-6 max-w-md">
                            {item.description}
                          </p>
                          <Button className="bg-primary hover:bg-primary-dark text-white w-fit group">
                            Shop Now
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                        <div className="absolute right-0 top-0 w-1/2 h-full">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Promotional Banners */}
          <div className="hidden lg:flex col-span-3 flex-col gap-4">
            <Link to="/products?collection=beadwork" className="block">
              <div className="bg-accent/20 rounded-lg h-[192px] relative overflow-hidden group cursor-pointer">
                <div className="p-6 relative z-10">
                  <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs rounded-full mb-2">New</span>
                  <h3 className="text-lg font-semibold text-secondary mb-2">Traditional Beadwork</h3>
                  <p className="text-sm text-gray-600 mb-4">Up to 20% off</p>
                  <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white">
                    Shop Now
                  </Button>
                </div>
                <img
                  src="/placeholder.svg"
                  alt="New Arrivals"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </Link>
            <Link to="/products?collection=ankara" className="block">
              <div className="bg-primary/10 rounded-lg h-[192px] relative overflow-hidden group cursor-pointer">
                <div className="p-6 relative z-10">
                  <span className="inline-block px-3 py-1 bg-primary text-white text-xs rounded-full mb-2">Popular</span>
                  <h3 className="text-lg font-semibold text-secondary mb-2">Ankara Collection</h3>
                  <p className="text-sm text-gray-600 mb-4">From $29.99</p>
                  <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white">
                    Shop Now
                  </Button>
                </div>
                <img
                  src="/placeholder.svg"
                  alt="Best Sellers"
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