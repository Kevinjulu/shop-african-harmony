import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Smartphone, 
  Tv, 
  Laptop, 
  ShoppingBag, 
  Home, 
  Watch,
  Gamepad
} from "lucide-react";

const categories = [
  { 
    name: "Electronics", 
    icon: Tv,
    path: "/products?category=electronics"
  },
  { 
    name: "Clothings", 
    icon: ShoppingBag,
    path: "/products?category=clothing"
  },
  { 
    name: "Computers", 
    icon: Laptop,
    path: "/products?category=computers"
  },
  { 
    name: "Home & Kitchen", 
    icon: Home,
    path: "/products?category=home-kitchen"
  },
  { 
    name: "Health & Beauty", 
    icon: ShoppingBag,
    path: "/products?category=health-beauty"
  },
  { 
    name: "Jewelry & Watch", 
    icon: Watch,
    path: "/products?category=jewelry-watch"
  },
  { 
    name: "Technology Toys", 
    icon: Gamepad,
    path: "/products?category=tech-toys"
  },
  { 
    name: "Smartphones", 
    icon: Smartphone,
    path: "/products?category=smartphones"
  }
];

export const TopCategories = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-secondary mb-6">
          Top Categories Of The Month
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                to={category.path}
                className="block"
              >
                <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-3 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-sm text-center font-medium group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};