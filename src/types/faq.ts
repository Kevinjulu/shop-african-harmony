export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface FAQFormData {
  question: string;
  answer: string;
  category: string;
  display_order: number;
}