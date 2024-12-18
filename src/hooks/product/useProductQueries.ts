import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/product';
import { ProductFilters } from './useProductFilters';
import { toast } from 'sonner';

export const useProductQueries = (filters: ProductFilters) => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      console.log('Fetching products with filters:', filters);
      
      try {
        let query = supabase
          .from('products')
          .select('*, product_images(*)');

        if (filters.category) {
          query = query.eq('category', filters.category);
        }

        if (filters.searchQuery) {
          query = query.textSearch('search_vector', filters.searchQuery);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching products:', error);
          throw error;
        }

        return data as Product[];
      } catch (err) {
        console.error('Failed to fetch products:', err);
        toast.error('Failed to load products. Please try again later.');
        throw err;
      }
    },
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    products: products || [],
    isLoading,
    error,
  };
};