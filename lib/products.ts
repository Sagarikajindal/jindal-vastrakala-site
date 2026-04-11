import { Product } from "./types";

export const products: Product[] = [
  {
    id: "p001",
    name: "Katan Silk Banarasi Saree",
    slug: "katan-silk-banarasi-saree",
    category: "saree",
    fabric: "Katan Silk",
    occasion: ["wedding", "festival", "reception"],
    priceINR: 18500,
    priceEUR: 210,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800",
    ],
    description:
      "Handwoven in the ancient looms of Varanasi, this Katan silk Banarasi saree features intricate zari work with traditional motifs. A heirloom piece passed down through generations.",
    stock: 2,
    featured: true,
    colors: ["Deep Crimson", "Midnight Navy", "Forest Green"],
    tags: ["banarasi", "silk", "handwoven", "zari", "bridal"],
    createdAt: "2025-08-15",
  },
  {
    id: "p002",
    name: "Organza Embroidered Lehenga",
    slug: "organza-embroidered-lehenga",
    category: "lehenga",
    fabric: "Organza",
    occasion: ["wedding", "reception", "sangeet"],
    priceINR: 32000,
    priceEUR: 365,
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800",
      "https://images.unsplash.com/photo-1594938298603-3b7496bff9cc?w=800",
    ],
    description:
      "A breathtaking organza lehenga adorned with hand-embroidered floral motifs in gold and silver threadwork. Includes matching dupatta and choli.",
    stock: 1,
    featured: true,
    colors: ["Blush Rose", "Ivory Gold", "Scarlet Red"],
    tags: ["lehenga", "organza", "embroidered", "bridal", "sangeet"],
    createdAt: "2025-09-01",
  },
  {
    id: "p003",
    name: "Chanderi Cotton Silk Saree",
    slug: "chanderi-cotton-silk-saree",
    category: "saree",
    fabric: "Chanderi",
    occasion: ["festival", "casual", "puja"],
    priceINR: 6800,
    priceEUR: 78,
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800",
    ],
    description:
      "Lightweight Chanderi cotton-silk blend with delicate gold border. Perfect for daytime festivities and religious occasions.",
    stock: 4,
    featured: false,
    colors: ["Saffron", "Peacock Blue", "Pale Gold"],
    tags: ["chanderi", "cotton-silk", "festival", "lightweight"],
    createdAt: "2025-09-10",
  },
  {
    id: "p004",
    name: "Velvet Bridal Lehenga",
    slug: "velvet-bridal-lehenga",
    category: "lehenga",
    fabric: "Velvet",
    occasion: ["wedding", "reception"],
    priceINR: 48000,
    priceEUR: 545,
    images: [
      "https://images.unsplash.com/photo-1594938298603-3b7496bff9cc?w=800",
    ],
    description:
      "Opulent deep velvet bridal lehenga with heavy zardozi embroidery and stone work. Statement piece for the modern bride who honours tradition.",
    stock: 1,
    featured: true,
    colors: ["Royal Maroon", "Midnight Blue", "Bottle Green"],
    tags: ["velvet", "bridal", "zardozi", "heavy-work", "statement"],
    createdAt: "2025-10-01",
  },
  {
    id: "p005",
    name: "Georgette Anarkali Suit",
    slug: "georgette-anarkali-suit",
    category: "suit",
    fabric: "Georgette",
    occasion: ["festival", "party", "eid"],
    priceINR: 12500,
    priceEUR: 142,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
    ],
    description:
      "Floor-length Anarkali suit in pure georgette with intricate chikankari embroidery. Comes with matching churidar and dupatta.",
    stock: 3,
    featured: false,
    colors: ["Ivory White", "Powder Pink", "Mint Green"],
    tags: ["anarkali", "georgette", "chikankari", "suit", "party"],
    createdAt: "2025-10-15",
  },
  {
    id: "p006",
    name: "Patola Silk Saree",
    slug: "patola-silk-saree",
    category: "saree",
    fabric: "Patola Silk",
    occasion: ["wedding", "festival", "reception"],
    priceINR: 22000,
    priceEUR: 250,
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800",
    ],
    description:
      "Authentic double ikat Patola silk saree from Gujarat. Each piece takes weeks to weave and is a collector's item.",
    stock: 2,
    featured: true,
    colors: ["Ruby Red", "Indigo Blue", "Emerald Green"],
    tags: ["patola", "silk", "ikat", "gujarat", "handwoven", "collector"],
    createdAt: "2025-11-01",
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductsByCategory = (category: Product["category"]) =>
  products.filter((p) => p.category === category);

export const getFeaturedProducts = () =>
  products.filter((p) => p.featured);

export const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

export const formatEUR = (amount: number) =>
  new Intl.NumberFormat("en-EU", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);
