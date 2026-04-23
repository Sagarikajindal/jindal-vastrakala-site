export type ProductCategory = "saree" | "lehenga";

export type Product = {
  id: string;
  title: string;
  slug: string;
  category: ProductCategory;

  fabric: string;
  occasion: string[];

  price_inr: number;
  price_eur: number;

  images: string[];
  reel_url?: string | null;

  description: string;
  short_desc?: string | null;

  colors: string[];
  stock: number;

  featured: boolean;
  new_arrival: boolean;
  published: boolean;

  tags: string[];
  care?: string | null;
  weight?: string | null;

  created_at?: string | null;
  updated_at?: string | null;
};
