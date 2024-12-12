import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Star, Heart, Image, Camera, Grid } from "lucide-react";

const categories = [
  {
    name: "Fashion & Clothing",
    icon: ShoppingBag,
    count: 120,
    link: "/products?category=fashion",
    image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&auto=format&fit=crop&q=60"
  },
  {
    name: "Art & Sculptures",
    icon: Image,
    count: 85,
    link: "/products?category=art",
    image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&auto=format&fit=crop&q=60"
  },
  {
    name: "Jewelry & Accessories",
    icon: Star,
    count: 150,
    link: "/products?category=jewelry",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&auto=format&fit=crop&q=60"
  },
  {
    name: "Home Decor",
    icon: Heart,
    count: 95,
    link: "/products?category=decor",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&auto=format&fit=crop&q=60"
  },
  {
    name: "Photography",
    icon: Camera,
    count: 70,
    link: "/products?category=photography",
    image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=800&auto=format&fit=crop&q=60"
  },
  {
    name: "Traditional Items",
    icon: Grid,
    count: 110,
    link: "/products?category=traditional",
    image: "https://images.unsplash.com/photo-1590735213408-9d0cd4b24fd7?w=800&auto=format&fit=crop&q=60"
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