import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products = [
  {
    name: "Handwoven African Basket",
    price: 45.99,
    originalPrice: 89.99,
    image: "/placeholder.svg",
    rating: 4.5,
    reviews: 12,
  },
  {
    name: "Maasai Beaded Necklace",
    price: 29.99,
    originalPrice: 59.99,
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 24,
  },
  {
    name: "Ankara Fabric Bundle",
    price: 79.99,
    originalPrice: 149.99,
    image: "/placeholder.svg",
    rating: 4.7,
    reviews: 18,
  },
  {
    name: "African Wooden Sculpture",
    price: 119.99,
    originalPrice: 199.99,
    image: "/placeholder.svg",
    rating: 4.9,
    reviews: 32,
  },
  {
    name: "Traditional Djembe Drum",
    price: 199.99,
    originalPrice: 299.99,
    image: "/placeholder.svg",
    rating: 4.6,
    reviews: 15,
  },
  {
    name: "Kente Cloth Wall Art",
    price: 89.99,
    originalPrice: 159.99,
    image: "/placeholder.svg",
    rating: 4.4,
    reviews: 21,
  }
];

export const DealOfTheDay = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-secondary">Deals of the day</h2>
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
              Ends in: 23:59:59
            </span>
          </div>
          <Button variant="outline" className="text-primary hover:text-primary-dark">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.map((product, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="relative mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover rounded-md"
                  />
                  <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </div>
                <h3 className="text-sm font-medium mb-1 group-hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary font-bold">${product.price}</span>
                  <span className="text-gray-400 line-through text-sm">
                    ${product.originalPrice}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex text-yellow-400 text-sm">
                    {"★".repeat(Math.floor(product.rating))}
                    {"☆".repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};