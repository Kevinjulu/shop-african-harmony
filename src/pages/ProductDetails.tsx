import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  // This would normally come from an API
  const product = {
    id,
    name: "Maasai Beaded Necklace",
    price: 49.99,
    description: "Handcrafted by skilled Maasai artisans, this beautiful beaded necklace represents traditional African craftsmanship at its finest.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    stock: 10
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square">
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 2}`}
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-secondary mb-4">{product.name}</h1>
            <p className="text-2xl text-primary font-semibold mb-4">${product.price}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <label className="text-gray-700">Quantity:</label>
                <div className="flex items-center border rounded-md">
                  <button
                    className="px-3 py-1 border-r"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button
                    className="px-3 py-1 border-l"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  >
                    +
                  </button>
                </div>
              </div>

              <Button className="w-full md:w-auto">Add to Cart</Button>

              <p className="text-sm text-gray-500">
                Stock: {product.stock} items available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;