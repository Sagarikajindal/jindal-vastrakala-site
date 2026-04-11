"use client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { ShoppingBag, MessageCircle, Package, Globe, Shield } from "lucide-react";
import { getProductBySlug, formatINR, formatEUR } from "@/lib/products";
import { useCartStore } from "@/lib/store";
import WhatsAppFloat from "@/components/shop/WhatsAppFloat";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const addItem = useCartStore((s) => s.addItem);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in the ${product.name} (${selectedColor}). Price: ${formatINR(product.priceINR)}. Can you help me order?`
  );
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";

  return (
    <div className="min-h-screen pt-20 pb-24">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] overflow-hidden bg-ink-800">
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.stock <= 2 && (
              <div className="absolute top-4 left-4">
                <span className="stock-low">Only {product.stock} left</span>
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-20 h-24 overflow-hidden border-2 transition-colors ${
                    activeImage === i ? "border-gold-400" : "border-transparent"
                  }`}
                >
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="font-accent text-gold-500 tracking-[0.3em] text-xs uppercase mb-2">
            {product.category} · {product.fabric}
          </p>
          <h1 className="font-display text-gold-100 text-4xl font-light leading-tight mb-4">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-4 mb-6">
            <span className="font-display text-gold-300 text-3xl">{formatINR(product.priceINR)}</span>
            <span className="text-gold-600 text-lg">{formatEUR(product.priceEUR)}</span>
          </div>

          <p className="font-body text-gold-400 text-lg leading-relaxed italic mb-8">
            {product.description}
          </p>

          {/* Occasions */}
          <div className="mb-6">
            <p className="font-accent text-gold-600 text-xs tracking-wider uppercase mb-2">Occasion</p>
            <div className="flex flex-wrap gap-2">
              {product.occasion.map((o) => (
                <span key={o} className="border border-gold-800/50 text-gold-400 text-xs px-3 py-1 capitalize font-accent tracking-wide">
                  {o}
                </span>
              ))}
            </div>
          </div>

          {/* Color selector */}
          <div className="mb-8">
            <p className="font-accent text-gold-600 text-xs tracking-wider uppercase mb-3">
              Colour: <span className="text-gold-300">{selectedColor}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 text-xs font-accent tracking-wide border transition-all ${
                    selectedColor === color
                      ? "border-gold-400 text-gold-200 bg-gold-900/20"
                      : "border-gold-800/40 text-gold-500 hover:border-gold-600"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-3 mb-8">
            <button
              onClick={handleAdd}
              className="btn-gold w-full py-4 text-sm tracking-widest uppercase flex items-center justify-center gap-3"
            >
              <ShoppingBag size={16} />
              {added ? "Added to Bag ✓" : "Add to Bag"}
            </button>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold w-full py-4 text-sm tracking-widest uppercase flex items-center justify-center gap-3"
            >
              <MessageCircle size={16} />
              Order via WhatsApp
            </a>
          </div>

          {/* Trust badges */}
          <div className="border-t border-gold-800/30 pt-6 grid grid-cols-3 gap-4">
            {[
              { icon: Package, label: "Ships in 24hrs" },
              { icon: Globe, label: "Worldwide delivery" },
              { icon: Shield, label: "Secure payment" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <Icon size={18} className="text-gold-500" />
                <span className="text-gold-600 text-xs font-accent tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <WhatsAppFloat />
    </div>
  );
}
