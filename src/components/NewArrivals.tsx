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
      origin_country: "NG",
      image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      name: "Handmade Leather Bag",
      price: 89.99,
      origin_country: "KE",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      name: "Beaded Necklace",
      price: 45.99,
      origin_country: "TZ",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 4,
      name: "Traditional Sculpture",
      price: 199.99,
      origin_country: "GH",
      image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 5,
      name: "African Djembe Drum",
      price: 199.99,
      origin_country: "GH",
      image: "https://images.unsplash.com/photo-1516663235285-845fac339ca7?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 6,
      name: "Handmade Pottery Set",
      price: 89.99,
      origin_country: "TZ",
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <section className="py-6 md:py-8 bg-cream">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-secondary">New Arrivals</h2>
          <Link to="/products?category=new">
            <Button variant="link" className="group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
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
                    <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                      {product.origin_country}
                    </div>
                  </div>
                  <h3 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-base font-bold text-primary mt-1">
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