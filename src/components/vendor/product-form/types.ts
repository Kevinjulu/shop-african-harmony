export interface ProductVariant {
  size: string;
  color: string;
  sku: string;
  price: number;
  inventory_quantity: number;
}

export interface TierPricing {
  minQuantity: number;
  maxQuantity: number;
  price: number;
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
  minimum_order_quantity: number;
  is_bulk_only: boolean;
  tier_pricing: TierPricing[];
}