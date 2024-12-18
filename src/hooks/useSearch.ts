import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash/debounce';
import { searchProducts, saveSearchHistory, SearchFilters } from '@/services/search/searchService';

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedQuery, setDebouncedQuery] = useState(searchParams.get('search') || '');
  
  const filters: SearchFilters = {
    category: searchParams.get('category') || 'all',
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    sortBy: searchParams.get('sortBy') || 'relevance',
    origin: searchParams.get('origin') || undefined,
  };

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', debouncedQuery, filters],
    queryFn: () => searchProducts(debouncedQuery, filters),
  });

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setDebouncedQuery(query);
      if (query.trim()) {
        saveSearchHistory(query, filters);
      }
    }, 300),
    [filters]
  );

  const updateSearch = (query: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('search', query);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
    debouncedSearch(query);
  };

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        newParams.set(key, value.toString());
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return {
    query: searchParams.get('search') || '',
    filters,
    products: products || [],
    isLoading,
    error,
    updateSearch,
    updateFilters,
  };
};