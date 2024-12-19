import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";

export const TrendingProducts = () => {
  const { formatPrice } = useCurrency();
  
  const products = [
    {
      id: "550e8400-e29b-41d4-a716-446655440012",
      name: "African Art Canvas",
      price: 15999.99,
      trend: "+120% sales",
      origin_country: "GH",
      image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440013",
      name: "Handmade Pottery Set",
      price: 8999.99,
      trend: "+85% views",
      origin_country: "TZ",
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440014",
      name: "Traditional Jewelry Box",
      price: 6999.99,
      trend: "+95% sales",
      origin_country: "KE",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440015",
      name: "Woven Wall Hanging",
      price: 12999.99,
      trend: "+75% views",
      origin_country: "NG",
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <section className="py-6 md:py-8 bg-cream">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-secondary">Trending Now</h2>
          <Link to="/products?sort=trending">
            <Button variant="link" className="group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {products.map((product) => {
            const prices = formatPrice(product.price, product.origin_country);
            return (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card className="group cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-2 md:p-3">
                    <div className="aspect-square relative mb-2 overflow-hidden rounded-md">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-primary/90 text-white px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-xs font-medium">{product.trend}</span>
                      </div>
                      <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                        {product.origin_country}
                      </div>
                    </div>
                    <h3 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="mt-1 space-y-0.5">
                      <p className="text-base font-bold text-primary">
                        {prices.original}
                      </p>
                      <p className="text-xs text-gray-500">
                        ≈ {prices.converted}
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