export type ProductCategory = "saree" | "lehenga" | "other";

export type Product = {
  id: string;
  title: string;
  slug: string;
  category: ProductCategory | string;

  image_url: string;
  gallery_urls?: string[] | null;

  description?: string | null;
  short_desc?: string | null;

  color?: string | null;
  fabric?: string | null;
  work_type?: string | null;
  occasion?: string | null;

  price_inr?: number | null;
  price_eur?: number | null;

  stock?: number | null;

  featured?: boolean | null;
  published?: boolean | null;
  new_arrival?: boolean | null;

  created_at?: string | null;
  updated_at?: string | null;
};
