import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="flex-shrink-0">
      <img 
        src="/lovable-uploads/dfdf98ce-6665-4af0-aa1d-71c82f1fe485.png" 
        alt="Shop African Brands" 
        className="h-12 w-auto"
      />
    </Link>
  );
};