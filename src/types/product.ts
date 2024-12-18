export interface Image {
  url: string;
  alt: string;
}

export type ProductStatus = 'draft' | 'published' | 'out_of_stock';

export interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
  description: string;
  status: ProductStatus;
  category_id: string;
  inventory_quantity: number;
  stock: number;
  created_at: string;
  updated_at: string;
  vendor_id: string;
  images: Image[];
  origin_country: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  inventory_quantity: number;
  status: ProductStatus;
}