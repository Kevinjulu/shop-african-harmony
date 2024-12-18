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
  description: string | null;
  price: number;
  status: string;
  category: string | null;
  category_id: string | null;
  image_url: string | null;
  inventory_quantity: number;
  stock: number;
  created_at: string;
  updated_at: string;
  vendor_id: string | null;
}