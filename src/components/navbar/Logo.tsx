import { Link } from "react-router-dom";

export const Logo = () => {
  // Use the correct path with the base URL
  const logoPath = import.meta.env.BASE_URL + 'lovable-uploads/dfdf98ce-6665-4af0-aa1d-71c82f1fe485.png';

  return (
    <Link to="/" className="flex-shrink-0 md:flex-none w-full md:w-auto flex justify-center md:justify-start">
      <img 
        src={logoPath}
        alt="Shop African Brands" 
        className="h-12 w-auto object-contain drop-shadow-sm transition-all duration-300 hover:drop-shadow-md"
      />
    </Link>
  );
};