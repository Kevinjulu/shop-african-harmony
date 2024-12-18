import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/hooks/useCurrency";
import { Timer, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export const DealOfTheDay = () => {
  const { formatPrice } = useCurrency();
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 14,
    seconds: 48
  });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const deals = [
    {
      id: 1,
      name: "Handwoven Basket",
      originalPrice: 99.99,
      discountedPrice: 79.99,
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&auto=format&fit=crop&q=60",
      discount: "20%"
    },
    {
      id: 2,
      name: "Traditional Clay Pot",
      originalPrice: 49.99,
      discountedPrice: 39.99,
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=60",
      discount: "20%"
    },
    {
      id: 3,
      name: "Beaded Necklace",
      originalPrice: 29.99,
      discountedPrice: 24.99,
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&auto=format&fit=crop&q=60",
      discount: "17%"
    },
    {
      id: 4,
      name: "Handmade Wooden Spoon Set",
      originalPrice: 15.99,
      discountedPrice: 12.99,
      image: "https://images.unsplash.com/photo-1592837613828-c36c1d0ec7e9?w=800&auto=format&fit=crop&q=60",
      discount: "19%"
    },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-secondary">Deal of the Day</h2>
            <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-3 py-1.5">
              <Timer className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">
                Ends in: {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
          <Link to="/products?deals=true">
            <Button variant="link" className="group">
              View All Deals
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {deals.map((deal) => (
            <Card key={deal.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-3">
                <div className="relative mb-3">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full aspect-square object-cover rounded-md"
                  />
                  <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                    {deal.discount} OFF
                  </span>
                </div>
                <h3 className="text-sm font-medium mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {deal.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(deal.discountedPrice)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(deal.originalPrice)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};