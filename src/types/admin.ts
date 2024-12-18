export type ProductStatus = 'draft' | 'published' | 'out_of_stock';

export interface Category {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface CategoryFormData {
  name: string;
  description: string;
}