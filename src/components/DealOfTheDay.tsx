import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/hooks/useCurrency";

export const DealOfTheDay = () => {
  const { formatPrice } = useCurrency();
  
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
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-secondary">Deal of the Day</h2>
          <Link to="/products?deals=true">
            <Button variant="link">View All Deals</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal) => (
            <Card key={deal.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                    {deal.discount} OFF
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{deal.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary">
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