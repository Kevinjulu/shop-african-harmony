import { useProductFilters } from './product/useProductFilters';
import { useProductQueries } from './product/useProductQueries';

export const useProducts = (initialSearchQuery?: string, initialCategory?: string) => {
  const { filters, updateFilters } = useProductFilters();
  const { products, isLoading, error } = useProductQueries(filters);

  // Set initial filters if provided
  React.useEffect(() => {
    if (initialSearchQuery || initialCategory) {
      updateFilters({
        searchQuery: initialSearchQuery,
        category: initialCategory,
      });
    }
  }, [initialSearchQuery, initialCategory]);

  return {
    products,
    loading: isLoading,
    error,
    updateFilters,
  };
};