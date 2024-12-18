export interface StaticPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_title: string | null;
  meta_description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface StaticPageFormData {
  title: string;
  slug: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
  status?: string;
}