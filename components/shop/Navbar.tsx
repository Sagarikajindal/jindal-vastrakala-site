"use client";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { itemCount, toggleCart } = useCartStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { href: "/shop/sarees", label: "Sarees" },
    { href: "/shop/lehengas", label: "Lehengas" },
    { href: "/link-in-bio", label: "Our Story" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink-900/95 backdrop-blur-sm border-b border-[#8f6a2f]/20"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-6 md:px-10 xl:px-14 h-20 flex items-center">
        <Link
          href="/"
          className="font-display text-[#D4B06A] text-xl sm:text-2xl md:text-3xl tracking-[0.04em] leading-none shrink-0"
        >
          Jindal Vastrakala
        </Link>

        <div className="hidden md:flex items-center gap-10 ml-auto mr-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-body text-[#E2C38A] hover:text-[#F3E2B8] transition-colors text-lg tracking-[0.01em]"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 ml-auto md:ml-0 shrink-0">
          <button
            onClick={toggleCart}
            className="relative p-2 text-[#E2C38A] hover:text-[#F3E2B8] transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag size={22} />
            {itemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-crimson-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-body">
                {itemCount()}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-[#E2C38A] hover:text-[#F3E2B8] transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-ink-800 border-t border-[#8f6a2f]/20 px-6 py-5 flex flex-col gap-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-body text-[#E2C38A] hover:text-[#F3E2B8] py-2 border-b border-[#8f6a2f]/20 text-xl"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
