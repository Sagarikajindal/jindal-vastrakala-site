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
          ? "bg-[#120b08]/90 backdrop-blur-md border-b border-[#6f5528]/20"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-8 md:px-14 xl:px-20 h-20 flex items-center">
        <Link
          href="/"
          className="font-display text-[#D8C08A] text-xl sm:text-2xl md:text-[2rem] tracking-[0.03em] leading-none shrink-0"
        >
          Jindal Vastrakala
        </Link>

        <div className="hidden md:flex items-center gap-10 ml-auto mr-10">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-body text-[#E7D3A2] hover:text-[#F3E7C7] transition-colors text-lg tracking-[0.01em]"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 ml-auto md:ml-0 shrink-0">
          <button
            onClick={toggleCart}
            className="relative p-2 text-[#E7D3A2] hover:text-[#F3E7C7] transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag size={22} />
            {itemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount()}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-[#E7D3A2] hover:text-[#F3E7C7] transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#120b08]/95 border-t border-[#6f5528]/20 px-6 py-5 flex flex-col gap-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-body text-[#E7D3A2] hover:text-[#F3E7C7] py-2 border-b border-[#6f5528]/20 text-xl"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
