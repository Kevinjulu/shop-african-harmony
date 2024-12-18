import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Search, ShoppingBag } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center px-4 max-w-2xl mx-auto">
        <h1 className="text-8xl font-bold text-mart-orange mb-4">404</h1>
        <p className="text-3xl font-semibold text-secondary mb-4">Page Not Found</p>
        <p className="text-gray-600 mb-8 text-lg">
          We couldn't find what you're looking for. The page you're trying to reach doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="w-full sm:w-auto flex items-center gap-2 bg-mart-orange hover:bg-mart-orange/90">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2 border-mart-orange text-mart-orange hover:bg-mart-orange/10">
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;