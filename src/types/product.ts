export interface Image {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
  description: string;
  status: string;
  category_id: string;
  inventory_quantity: number;
  stock: number;
  created_at: string;
  updated_at: string;
  vendor_id: string;
  images: Image[];
  origin_country: string;  // Required field for country of origin
}