export type ProductStatus = 'draft' | 'published' | 'out_of_stock';

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent_id?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  status: ProductStatus;
  inventory_count: number;
  category_id: string;
  images: string[];
  created_at: string;
  updated_at: string;
}