import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Public client — for reading published products on the website
export const supabase = createClient(url, anonKey);

// Admin client — for writing from the admin panel (bypasses RLS)
export const supabaseAdmin = createClient(url, serviceKey);

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: "saree" | "lehenga";
  fabric: string;
  occasion: string[];
  price_inr: number;
  price_eur: number;
  images: string[];
  reel_url: string;
  description: string;
  short_desc: string;
  colors: string[];
  stock: number;
  featured: boolean;
  new_arrival: boolean;
  published: boolean;
  tags: string[];
  care: string;
  weight: string;
  created_at: string;
  updated_at: string;
};

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export const formatEUR = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
