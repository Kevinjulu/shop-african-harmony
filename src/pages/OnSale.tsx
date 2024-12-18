import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrency } from "@/hooks/useCurrency";
import { Badge } from "@/components/ui/badge";

const OnSale = () => {
  const { formatPrice } = useCurrency();

  const { data: products, isLoading } = useQuery({
    queryKey: ["on-sale"],
    queryFn: async () => {
      // In a real app, this would filter by products with active discounts
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(20);
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">On Sale</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">On Sale</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products?.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="aspect-square relative mb-4">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <Badge className="absolute top-2 right-2 bg-red-500">
                    Sale
                  </Badge>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <p className="text-primary font-bold">{formatPrice(product.price * 0.8)}</p>
                  <p className="text-gray-500 line-through text-sm">{formatPrice(product.price)}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OnSale;