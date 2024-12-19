import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CarouselSlideProps {
  item: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    collection: string;
  };
}

export const CarouselSlide = ({ item }: CarouselSlideProps) => {
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/products?collection=${encodeURIComponent(item.collection)}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
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
          <h1 className="text-xl sm:text-2xl md:text-5xl font-bold text-white mb-2 md:mb-4 animate-fade-in">
            {item.title}
          </h1>
          <p className="text-sm md:text-lg text-white mb-4 md:mb-8 animate-fade-in hidden sm:block">
            {item.description}
          </p>
          <Button 
            className="bg-primary hover:bg-primary-dark text-white w-fit group animate-fade-in text-sm md:text-base px-3 md:px-4 py-1.5 md:py-2"
            onClick={handleClick}
          >
            Shop Now
            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1.5 md:ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};