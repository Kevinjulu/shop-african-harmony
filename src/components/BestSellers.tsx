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
      image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      name: "Handwoven Basket",
      price: 79.99,
      rating: 4.9,
      sales: 980,
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      name: "African Print Scarf",
      price: 34.99,
      rating: 4.7,
      sales: 850,
      image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 4,
      name: "Wooden Serving Bowl",
      price: 49.99,
      rating: 4.8,
      sales: 760,
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-cream">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary">Best Sellers</h2>
          <Link to="/products?sort=best-selling">
            <Button variant="link" className="group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-2 md:p-4">
                  <div className="aspect-square relative mb-2 md:mb-4 overflow-hidden rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs md:text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-lg md:text-xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
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