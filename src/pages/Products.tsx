import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useCurrency } from "@/hooks/useCurrency";
import { useSearch } from "@/hooks/useSearch";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { AdvancedSearch } from "@/components/search/AdvancedSearch";

const Products = () => {
  const { formatPrice } = useCurrency();
  const { products, isLoading, error, query, filters, updateSearch, updateFilters } = useSearch();

  if (error) {
    toast.error("Failed to load products");
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-secondary">Our Products</h1>
          {query && (
            <p className="text-gray-600">
              Showing results for: "{query}"
            </p>
          )}
        </div>

        <div className="mb-6">
          <AdvancedSearch
            initialQuery={query}
            initialFilters={filters}
            onQueryChange={updateSearch}
            onFiltersChange={updateFilters}
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {[...Array(10)].map((_, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="p-2 md:p-3">
                  <Skeleton className="aspect-square w-full mb-2" />
                  <Skeleton className="h-3 w-3/4 mb-1" />
                  <Skeleton className="h-3 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {products.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-2 md:p-3">
                    <div className="aspect-square relative mb-2">
                      <img
                        src={product.image_url || '/placeholder.svg'}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-secondary line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-base font-bold text-primary mt-1">
                      {formatPrice(product.price)}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{product.category}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {!isLoading && products.length === 0 && (
          <div className="text-center py-8">
            <h2 className="text-xl font-medium text-gray-600 mb-2">
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