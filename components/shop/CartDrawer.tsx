"use client";
import { X, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { formatINR, formatEUR } from "@/lib/products";

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, totalINR, totalEUR } = useCartStore();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-ink-900/70 backdrop-blur-sm z-50"
          onClick={toggleCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-ink-800 border-l border-gold-800/30 z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gold-800/30">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-gold-400" />
            <span className="font-accent text-gold-300 tracking-widest text-sm uppercase">
              Your Bag ({items.length})
            </span>
          </div>
          <button onClick={toggleCart} className="text-gold-500 hover:text-gold-200 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <ShoppingBag size={40} className="text-gold-700" />
              <p className="font-display text-gold-400 text-xl font-light">Your bag is empty</p>
              <p className="text-gold-600 text-sm">Add a piece to begin</p>
              <button onClick={toggleCart} className="btn-gold px-8 py-3 text-xs tracking-widest uppercase mt-2">
                Browse Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4">
                <Link href={`/products/${item.product.slug}`} onClick={toggleCart}>
                  <div className="relative w-20 h-28 flex-shrink-0 overflow-hidden bg-ink-700">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="font-accent text-gold-600 text-xs tracking-wider uppercase">{item.product.fabric}</p>
                  <p className="font-display text-gold-100 text-base font-light leading-tight mt-1 truncate">
                    {item.product.name}
                  </p>
                  {item.selectedColor && (
                    <p className="text-gold-600 text-xs mt-1">{item.selectedColor}</p>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-gold-800/50 divide-x divide-gold-800/50">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 text-gold-400 hover:text-gold-100 text-sm flex items-center justify-center"
                      >−</button>
                      <span className="w-7 h-7 text-gold-200 text-sm flex items-center justify-center font-accent">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 text-gold-400 hover:text-gold-100 text-sm flex items-center justify-center"
                        disabled={item.quantity >= item.product.stock}
                      >+</button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-gold-700 hover:text-crimson-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="font-display text-gold-400 text-base mt-2">
                    {formatINR(item.product.priceINR * item.quantity)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gold-800/30 px-6 py-6 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-gold-400 font-body">Total</span>
              <div className="text-right">
                <p className="font-display text-gold-200 text-xl">{formatINR(totalINR())}</p>
                <p className="text-gold-600 text-sm">{formatEUR(totalEUR())}</p>
              </div>
            </div>
            <p className="text-gold-700 text-xs font-body italic text-center">
              Taxes and shipping calculated at checkout
            </p>
            <Link
              href="/checkout"
              onClick={toggleCart}
              className="btn-gold w-full py-4 text-xs tracking-widest uppercase text-center block"
            >
              Proceed to Checkout
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999"}?text=Hi! I'd like to place an order. My cart: ${items.map(i => `${i.product.name} x${i.quantity}`).join(", ")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold w-full py-3 text-xs tracking-widest uppercase text-center block"
            >
              Order via WhatsApp
            </a>
          </div>
        )}
      </div>
    </>
  );
}
