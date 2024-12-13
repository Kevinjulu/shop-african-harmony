import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useSearchParams } from "react-router-dom";
import { useCurrency } from "@/hooks/useCurrency";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const Products = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';
  
  const { formatPrice } = useCurrency();
  const { products, loading, error } = useProducts(searchQuery, category);

  if (error) {
    toast.error(error);
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-secondary">Our Products</h1>
          {searchQuery && (
            <p className="text-gray-600">
              Showing results for: "{searchQuery}"
            </p>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <Skeleton className="aspect-square w-full mb-3" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
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
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium text-gray-600 mb-4">
              No products found
            </h2>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;