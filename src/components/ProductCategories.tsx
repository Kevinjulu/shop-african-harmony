import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Star, Heart, Image, Camera, Grid } from "lucide-react";

const categories = [
  {
    name: "Fashion & Clothing",
    icon: ShoppingBag,
    count: 120,
    link: "/products?category=fashion"
  },
  {
    name: "Art & Sculptures",
    icon: Image,
    count: 85,
    link: "/products?category=art"
  },
  {
    name: "Jewelry & Accessories",
    icon: Star,
    count: 150,
    link: "/products?category=jewelry"
  },
  {
    name: "Home Decor",
    icon: Heart,
    count: 95,
    link: "/products?category=decor"
  },
  {
    name: "Photography",
    icon: Camera,
    count: 70,
    link: "/products?category=photography"
  },
  {
    name: "Traditional Items",
    icon: Grid,
    count: 110,
    link: "/products?category=traditional"
  }
];

export const ProductCategories = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-secondary mb-8">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.name} to={category.link}>
              <Card className="group cursor-pointer hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <category.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-secondary mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} items</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};