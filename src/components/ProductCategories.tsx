import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Star, Heart, Image, Camera, Grid } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/data/categories";

const categoryIcons = {
  fashion: ShoppingBag,
  art: Image,
  jewelry: Star,
  decor: Heart,
  photography: Camera,
  traditional: Grid,
};

export const ProductCategories = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-secondary mb-8">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => {
            const IconComponent = categoryIcons[category.name.toLowerCase().split(' ')[0] as keyof typeof categoryIcons] || Grid;
            return (
              <Link key={category.name} to={category.path}>
                <Card className="group cursor-pointer hover:shadow-lg transition-shadow h-full overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video relative">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm font-medium">View Products</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-secondary group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {category.count} items
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {category.description}
                      </p>
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