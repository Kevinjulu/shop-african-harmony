import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";

export const NewArrivals = () => {
  const { formatPrice } = useCurrency();
  
  const products = [
    {
      id: 1,
      name: "African Print Dress",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      name: "Handmade Leather Bag",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      name: "Beaded Necklace",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 4,
      name: "Traditional Sculpture",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary">New Arrivals</h2>
          <Link to="/products?category=new">
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
                  </div>
                  <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-lg md:text-xl font-bold text-primary">
                    {formatPrice(product.price)}
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