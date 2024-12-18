export interface Image {
  url: string;
  alt?: string;
}

export type ProductStatus = 'draft' | 'published' | 'out_of_stock';

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  status: ProductStatus;
  category: string | null;
  category_id: string | null;
  image_url: string | null;
  images?: Image[];
  inventory_quantity: number;
  stock: number;
  created_at: string;
  updated_at: string;
  vendor_id: string | null;
}