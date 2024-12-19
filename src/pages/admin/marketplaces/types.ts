export interface Marketplace {
  id: string;
  name: string;
  location: string;
  country: string;
  description: string;
  schedule: string;
  next_market_date: string | null;
  end_market_date: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface MarketplaceFormData {
  name: string;
  location: string;
  country: string;
  description: string;
  schedule: string;
  next_market_date: Date | null;
  end_market_date: Date | null;
}