import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PromoBannerProps {
  title: string;
  subtitle: string;
  image: string;
  link: string;
  tag: string;
  price?: string;
}

export const PromoBanner = ({ title, subtitle, image, link, tag, price }: PromoBannerProps) => {
  return (
    <Link to={link} className="block">
      <div className="relative aspect-[4/3] lg:aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer">
        <div className="absolute inset-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-end">
          <span className="inline-block px-1.5 py-0.5 md:px-2 md:py-0.5 bg-primary text-white text-[10px] md:text-xs rounded-full mb-1 md:mb-2 w-fit">
            {tag}
          </span>
          <h3 className="text-sm md:text-lg font-semibold text-white mb-1">{title}</h3>
          {price && <p className="text-[10px] md:text-sm text-white/90 mb-2">{price}</p>}
          <Button variant="outline" size="sm" className="w-fit bg-white hover:bg-white/90 text-primary text-xs md:text-sm">
            Shop Now
          </Button>
        </div>
      </div>
    </Link>
  );
};