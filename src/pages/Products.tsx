import { useSearch } from "@/hooks/useSearch";
import { AdvancedSearch } from "@/components/search/AdvancedSearch";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrency } from "@/hooks/useCurrency";

const Products = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const countryFilter = searchParams.get('country');
  const { formatPrice } = useCurrency();
  
  const { 
    query, 
    filters, 
    products, 
    isLoading, 
    error, 
    updateSearch, 
    updateFilters 
  } = useSearch();

  // Apply country filter when URL parameter changes
  useEffect(() => {
    if (countryFilter) {
      console.log('Filtering products by country:', countryFilter);
      updateFilters({ origin: countryFilter });
    }
  }, [countryFilter, updateFilters]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">Error loading products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {countryFilter ? `Products from ${countryFilter}` : 'All Products'}
      </h1>
      
      <AdvancedSearch
        initialQuery={query}
        initialFilters={filters}
        onQueryChange={updateSearch}
        onFiltersChange={updateFilters}
      />

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {[...Array(8)].map((_, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {products.map(product => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-square relative mb-4 overflow-hidden rounded-md">
                    <img 
                      src={product.image_url || '/placeholder.svg'} 
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <h2 className="text-sm sm:text-base font-medium line-clamp-2 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-primary font-bold text-sm sm:text-base">
                    {formatPrice(product.price)}
                  </p>
                  {product.description && (
                    <p className="text-gray-600 text-xs sm:text-sm mt-2 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {!isLoading && products.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No products found.</p>
        </div>
      )}
    </div>
  );
};

export default Products;