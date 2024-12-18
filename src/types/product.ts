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

export interface SEOData {
  meta_title: string;
  meta_description: string;
  keywords: string;
}

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
  seo?: SEOData;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  inventory_quantity: number;
  status: ProductStatus;
  variants: ProductVariant[];
  origin_country: string;
  images: Image[];
  meta_title?: string;
  meta_description?: string;
  keywords?: string;
  stock: number;
}