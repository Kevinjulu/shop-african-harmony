import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useCurrency } from "@/hooks/useCurrency";

const products = [
  {
    id: 1,
    name: "Maasai Beaded Necklace",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&auto=format&fit=crop&q=60",
    category: "Jewelry"
  },
  {
    id: 2,
    name: "Ankara Print Tote Bag",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=60",
    category: "Fashion"
  },
  {
    id: 3,
    name: "African Tribal Wall Art",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&auto=format&fit=crop&q=60",
    category: "Home Decor"
  },
  {
    id: 4,
    name: "Maasai Beaded Bracelet Set",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&auto=format&fit=crop&q=60",
    category: "Jewelry"
  },
  {
    id: 5,
    name: "Handwoven African Basket",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&auto=format&fit=crop&q=60",
    category: "Home Decor"
  },
  {
    id: 6,
    name: "Traditional African Drum",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1516663235285-845fac339ca7?w=800&auto=format&fit=crop&q=60",
    category: "Musical Instruments"
  },
  {
    id: 7,
    name: "Ankara Print Dress",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=60",
    category: "Fashion"
  },
  {
    id: 8,
    name: "African Print Throw Pillows",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=60",
    category: "Home Decor"
  },
  {
    id: 9,
    name: "Beaded Maasai Belt",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1595781572981-d63151b232ed?w=800&auto=format&fit=crop&q=60",
    category: "Fashion"
  },
  {
    id: 10,
    name: "African Wooden Sculpture",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?w=800&auto=format&fit=crop&q=60",
    category: "Art"
  },
  {
    id: 11,
    name: "Traditional Woven Mat",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1580745089072-007c637a1e54?w=800&auto=format&fit=crop&q=60",
    category: "Home Decor"
  },
  {
    id: 12,
    name: "Beaded Maasai Sandals",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1621996659490-3275b4d0d951?w=800&auto=format&fit=crop&q=60",
    category: "Fashion"
  }
];

const Products = () => {
  const { formatPrice } = useCurrency();

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
                  <p className="text-primary font-semibold">{formatPrice(product.price)}</p>
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