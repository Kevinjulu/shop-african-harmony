import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="flex-shrink-0 md:flex-none w-full md:w-auto flex justify-center md:justify-start">
      <img 
        src="/lovable-uploads/dfdf98ce-6665-4af0-aa1d-71c82f1fe485.png" 
        alt="Shop African Brands" 
        className="h-12 w-auto object-contain drop-shadow-sm transition-all duration-300 hover:drop-shadow-md"
      />
    </Link>
  );
};