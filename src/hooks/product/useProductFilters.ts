import { useState } from 'react';

export interface ProductFilters {
  searchQuery?: string;
  category?: string;
}

export const useProductFilters = () => {
  const [filters, setFilters] = useState<ProductFilters>({});

  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    filters,
    updateFilters,
  };
};