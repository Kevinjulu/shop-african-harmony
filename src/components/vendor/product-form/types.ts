export interface ProductVariant {
  size: string;
  color: string;
  sku: string;
  price: number;
  inventory_quantity: number;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  inventory_quantity: number;
  status: 'draft' | 'published' | 'out_of_stock';
  variants: ProductVariant[];
  sku: string;
  weight: number;
  dimensions: string;
  materials: string;
  tags: string;
}