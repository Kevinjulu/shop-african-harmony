import { useSearch } from "@/hooks/useSearch";
import { AdvancedSearch } from "@/components/search/AdvancedSearch";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Products = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const countryFilter = searchParams.get('country');
  
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading products.</p>}
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded">
            <img src={product.image_url || '/placeholder.svg'} alt={product.name} className="w-full h-40 object-cover mb-2" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-xl font-bold">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
