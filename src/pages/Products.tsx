import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Maasai Beaded Necklace",
    price: 49.99,
    image: "/placeholder.svg",
    category: "Jewelry"
  },
  {
    id: 2,
    name: "Ankara Fabric Bag",
    price: 79.99,
    image: "/placeholder.svg",
    category: "Fashion"
  },
  {
    id: 3,
    name: "Traditional Wall Art",
    price: 129.99,
    image: "/placeholder.svg",
    category: "Home Decor"
  },
  // Add more products as needed
];

const Products = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-secondary mb-6">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-square relative mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="font-medium text-secondary">{product.name}</h3>
                  <p className="text-primary font-semibold">${product.price}</p>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;