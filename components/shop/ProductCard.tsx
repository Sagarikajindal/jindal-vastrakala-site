"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types";
import { formatINR, formatEUR } from "@/lib/products";
import { useCartStore } from "@/lib/store";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="product-card group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative overflow-hidden aspect-[3/4] bg-ink-800">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {product.stock <= 2 && (
            <div className="absolute top-3 left-3">
              <span className="stock-low">Only {product.stock} left</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      <div className="pt-4 pb-2">
        <p className="font-accent text-gold-600 text-xs tracking-widest uppercase mb-1">
          {product.fabric}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-display text-gold-100 text-xl font-light hover:text-gold-300 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="font-display text-gold-400 text-lg">{formatINR(product.priceINR)}</p>
            <p className="text-gold-600 text-sm">{formatEUR(product.priceEUR)}</p>
          </div>
          <button
            onClick={() => addItem(product)}
            className="flex items-center gap-2 btn-outline-gold px-4 py-2 text-xs rounded-none"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={14} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
