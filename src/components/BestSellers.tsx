import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";

export const BestSellers = () => {
  const { formatPrice } = useCurrency();
  
  const products = [
    {
      id: 1,
      name: "Traditional Beaded Bracelet",
      price: 29.99,
      rating: 4.8,
      sales: 1200,
      origin_country: "KE",
      image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      name: "Handwoven Basket",
      price: 79.99,
      rating: 4.9,
      sales: 980,
      origin_country: "TZ",
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      name: "African Print Scarf",
      price: 34.99,
      rating: 4.7,
      sales: 850,
      origin_country: "NG",
      image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 4,
      name: "Wooden Serving Bowl",
      price: 49.99,
      rating: 4.8,
      sales: 760,
      origin_country: "GH",
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <section className="py-4 md:py-8 bg-cream">
      <div className="container mx-auto px-3 md:px-4">
        <div className="flex justify-between items-center mb-3 md:mb-6">
          <h2 className="text-lg md:text-2xl font-bold text-secondary">Best Sellers</h2>
          <Link to="/products?sort=best-selling">
            <Button variant="link" className="group text-sm md:text-base">
              View All
              <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <Card className="group cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-2 md:p-3">
                  <div className="aspect-[4/3] relative mb-2 overflow-hidden rounded-md">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-1.5 md:top-2 right-1.5 md:right-2 bg-black/70 px-1.5 md:px-2 py-0.5 md:py-1 rounded text-[10px] md:text-xs text-white">
                      {product.origin_country}
                    </div>
                    <div className="absolute top-1.5 md:top-2 left-1.5 md:left-2 bg-white/90 px-1 md:px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 md:w-3 md:h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-[10px] md:text-xs font-medium">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xs md:text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm md:text-base font-bold text-primary mt-1">
                    {formatPrice(product.price)}
                  </p>
                  <p className="text-[10px] md:text-xs text-gray-500 mt-0.5">
                    {product.sales.toLocaleString()} sold
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};