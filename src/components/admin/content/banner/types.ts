export interface Banner {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  link: string | null;
  start_date: string | null;
  end_date: string | null;
  status: string;
}