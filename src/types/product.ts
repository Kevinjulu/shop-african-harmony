export interface Image {
  url: string;
  alt: string;
}

export type ProductStatus = 'draft' | 'published' | 'out_of_stock';

export interface ProductVariant {
  size: string;
  color: string;
  sku: string;
  price: number;
  inventory_quantity: number;
}

export interface ProductImage {
  id: string;
  image_url: string;
  is_primary: boolean;
  display_order: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  category: string | null;
  description: string | null;
  status: ProductStatus;
  category_id: string | null;
  inventory_quantity: number;
  stock: number;
  created_at: string;
  updated_at: string;
  vendor_id: string | null;
  images?: Image[];
  origin_country: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  keywords?: string | null;
  product_images?: ProductImage[];
  is_bulk_only?: boolean;
  minimum_order_quantity?: number;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  inventory_quantity: number;
  status: ProductStatus;
  origin_country: string;
  images: Image[];
  meta_title?: string;
  meta_description?: string;
  keywords?: string;
  stock: number;
  variants: ProductVariant[];
}