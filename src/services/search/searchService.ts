import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";

export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  origin?: string;
}

export const searchProducts = async (
  query: string,
  filters: SearchFilters = {}
): Promise<Product[]> => {
  console.log('Searching products with:', { query, filters });
  
  let queryBuilder = supabase
    .from('products')
    .select('*');

  // Add full-text search if query exists
  if (query) {
    queryBuilder = queryBuilder.textSearch('search_vector', query);
  }

  // Apply filters
  if (filters.category && filters.category !== 'all') {
    queryBuilder = queryBuilder.eq('category', filters.category);
  }

  if (filters.minPrice) {
    queryBuilder = queryBuilder.gte('price', filters.minPrice);
  }

  if (filters.maxPrice) {
    queryBuilder = queryBuilder.lte('price', filters.maxPrice);
  }

  if (filters.origin) {
    queryBuilder = queryBuilder.eq('origin_country', filters.origin);
  }

  // Apply sorting
  switch (filters.sortBy) {
    case 'price_asc':
      queryBuilder = queryBuilder.order('price', { ascending: true });
      break;
    case 'price_desc':
      queryBuilder = queryBuilder.order('price', { ascending: false });
      break;
    case 'newest':
      queryBuilder = queryBuilder.order('created_at', { ascending: false });
      break;
    default:
      // Default sorting by relevance (when using full-text search)
      if (query) {
        queryBuilder = queryBuilder.order('search_vector', { ascending: false });
      } else {
        queryBuilder = queryBuilder.order('created_at', { ascending: false });
      }
  }

  const { data, error } = await queryBuilder;

  if (error) {
    console.error('Error searching products:', error);
    throw error;
  }

  return data as Product[];
};

export const saveSearchHistory = async (query: string, filters: SearchFilters) => {
  const { error } = await supabase
    .from('search_history')
    .insert([
      {
        query,
        filters: filters as any
      }
    ]);

  if (error) {
    console.error('Error saving search history:', error);
  }
};

export const getSearchHistory = async () => {
  const { data, error } = await supabase
    .from('search_history')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching search history:', error);
    return [];
  }

  return data;
};