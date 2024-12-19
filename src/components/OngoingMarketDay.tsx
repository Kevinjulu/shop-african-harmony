import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, ArrowRight, MapPin } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Marketplace {
  id: string;
  name: string;
  location: string;
  country: string;
  next_market_date: string;
  end_market_date: string;
}

export const OngoingMarketDay = () => {
  const { formatPrice } = useCurrency();
  const [activeMarket, setActiveMarket] = useState<Marketplace | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const fetchActiveMarket = async () => {
      const { data, error } = await supabase
        .from('marketplaces')
        .select('*')
        .gte('end_market_date', new Date().toISOString())
        .order('next_market_date', { ascending: true })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching marketplace:', error);
        return;
      }

      if (data) {
        console.log('Active market fetched:', data);
        setActiveMarket(data);
      }
    };

    fetchActiveMarket();
  }, []);

  useEffect(() => {
    if (!activeMarket?.end_market_date) return;

    const calculateTimeLeft = () => {
      const endTime = new Date(activeMarket.end_market_date).getTime();
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [activeMarket]);

  const products = [
    {
      id: "550e8400-e29b-41d4-a716-446655440012",
      name: "Bulk Maasai Beaded Necklaces (50 pieces)",
      originalPrice: 999.99,
      discountedPrice: 799.99,
      image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&auto=format&fit=crop&q=60",
      discount: "20%",
      moq: 50
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440013",
      name: "Wholesale African Print Fabric Bundle (100 yards)",
      originalPrice: 1499.99,
      discountedPrice: 1199.99,
      image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&auto=format&fit=crop&q=60",
      discount: "20%",
      moq: 100
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440014",
      name: "Traditional Wooden Crafts Set (25 pieces)",
      originalPrice: 749.99,
      discountedPrice: 599.99,
      image: "https://images.unsplash.com/photo-1592837613828-c36c1d0ec7e9?w=800&auto=format&fit=crop&q=60",
      discount: "20%",
      moq: 25
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440015",
      name: "Handwoven Basket Collection (30 pieces)",
      originalPrice: 899.99,
      discountedPrice: 719.99,
      image: "https://images.unsplash.com/photo-1632171927336-696d86fd27c8?w=800&auto=format&fit=crop&q=60",
      discount: "20%",
      moq: 30
    },
  ];

  if (!activeMarket) return null;

  return (
    <section className="py-4 md:py-8 bg-cream">
      <div className="container mx-auto px-3 md:px-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4 md:mb-6">
          <div>
            <h2 className="text-lg md:text-2xl font-bold text-secondary">
              Ongoing Market Day ({activeMarket.name})
            </h2>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {activeMarket.location}, {activeMarket.country}
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 bg-[#f97316] text-white rounded-lg px-2 md:px-3 py-1 md:py-1.5 w-fit whitespace-nowrap">
            <Timer className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm font-medium">
              Ends in: {String(timeLeft.hours).padStart(2, '0')}:
              {String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
          
          <Link to="/products?market_id=${activeMarket.id}" className="ml-auto">
            <Button variant="link" className="group text-sm md:text-base p-0">
              View All Market Products
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-2 md:p-3">
                  <div className="relative mb-2 md:mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover rounded-md"
                    />
                    <span className="absolute top-1.5 md:top-2 right-1.5 md:right-2 bg-red-500 text-white px-1.5 md:px-2 py-0.5 md:py-1 rounded-md text-[10px] md:text-xs font-medium">
                      {product.discount} OFF
                    </span>
                  </div>
                  <h3 className="text-xs md:text-sm font-medium mb-1 md:mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <span className="text-sm md:text-lg font-bold text-primary">
                      {formatPrice(product.discountedPrice)}
                    </span>
                    <span className="text-[10px] md:text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  </div>
                  <div className="mt-1 text-[10px] md:text-xs text-gray-600">
                    MOQ: {product.moq} pieces
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};