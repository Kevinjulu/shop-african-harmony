import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Star, Heart, Image, Camera, Grid } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const categoryIcons = {
  fashion: ShoppingBag,
  art: Image,
  jewelry: Star,
  decor: Heart,
  photography: Camera,
  traditional: Grid,
};

export const ProductCategories = () => {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-secondary mb-8">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories?.map((category) => {
            const IconComponent = categoryIcons[category.name.toLowerCase() as keyof typeof categoryIcons] || Grid;
            return (
              <Link key={category.id} to={`/products?category=${category.name.toLowerCase()}`}>
                <Card className="group cursor-pointer hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <IconComponent className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-semibold text-secondary mb-2">{category.name}</h3>
                    {category.description && (
                      <p className="text-sm text-gray-500">{category.description}</p>
                    )}
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