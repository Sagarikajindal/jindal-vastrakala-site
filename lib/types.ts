export interface Product {
  id: string;
  name: string;
  slug: string;
  category: "saree" | "lehenga" | "suit";
  fabric: string;
  occasion: string[];
  priceINR: number;
  priceEUR: number;
  images: string[];
  description: string;
  stock: number;
  featured: boolean;
  colors: string[];
  tags: string[];
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalINR: number;
  totalEUR: number;
  currency: "INR" | "EUR" | "GBP" | "USD";
  status: "pending" | "paid" | "shipped" | "delivered";
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  paymentMethod: "razorpay" | "stripe" | "whatsapp";
  createdAt: string;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
