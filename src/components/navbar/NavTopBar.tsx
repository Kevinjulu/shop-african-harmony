import { Link } from "react-router-dom";

export const NavTopBar = () => {
  return (
    <div className="bg-secondary text-white py-2 text-sm hidden md:block">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <p>Welcome to Shop African Marketplace</p>
          <div className="flex items-center space-x-4">
            <Link to="/about" className="hover:text-accent transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
            <Link to="/help" className="hover:text-accent transition-colors">Help & FAQs</Link>
          </div>
        </div>
      </div>
    </div>
  );
};