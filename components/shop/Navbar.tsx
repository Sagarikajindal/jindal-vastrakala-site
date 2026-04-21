"use client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/lib/store";
import { useState, useEffect } from "react";

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";
const YT = process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://www.youtube.com/@JindalVastrakala";
const BROADCAST_MSG = encodeURIComponent("Hi! I'd like to join your WhatsApp broadcast list and be the first to know about new arrivals and exclusive pieces from Jindal Vastrakala.");

const navLinks = [
  { href: "/shop/sarees",   label: "Sarees" },
  { href: "/shop/lehengas", label: "Lehengas" },
  { href: "/consultation",  label: "Video Consultation" },
  { href: "/policies",      label: "Policies" },
];

export default function Navbar() {
  const { count, toggleCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* ── Top bar: free shipping + WhatsApp broadcast ── */}
      <div style={{ background: "var(--burg-950)", borderBottom: "1px solid rgba(200,146,26,0.15)" }}
        className="py-2 px-4 text-center">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <span style={{ fontFamily: "var(--font-accent)", color: "var(--gold-700)", fontSize: "0.6rem", letterSpacing: "0.18em" }}>
            FREE SHIPPING · UK · UAE · EUROPE · USA
          </span>
          <span style={{ color: "rgba(200,146,26,0.2)" }}>|</span>
          <a
            href={`https://wa.me/${WA}?text=${BROADCAST_MSG}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-opacity hover:opacity-75"
            style={{ color: "#5de88a", fontFamily: "var(--font-accent)", fontSize: "0.6rem", letterSpacing: "0.14em" }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            JOIN WHATSAPP BROADCAST — NEW ARRIVALS FIRST
          </a>
        </div>
      </div>

      {/* ── Main navbar ── */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300`}
        style={{
          background: scrolled ? "rgba(61,3,16,0.97)" : "rgba(61,3,16,0.92)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(200,146,26,0.18)",
          boxShadow: scrolled ? "0 4px 24px rgba(61,3,16,0.4)" : "none",
        }}
      >
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem", height: "4rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo-nav.png" alt="Jindal Vastrakala" width={38} height={38} className="object-contain" />
            <div className="hidden sm:block">
              <p style={{ fontFamily: "var(--font-accent)", color: "var(--gold-500)", letterSpacing: "0.2em", fontSize: "0.65rem", lineHeight: 1 }}>
                JINDAL VASTRAKALA
              </p>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--gold-700)", fontSize: "0.65rem", fontStyle: "italic", lineHeight: 1.4, marginTop: "2px" }}>
                Timeless Sarees. Woven Traditions.
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href}
                style={{ fontFamily: "var(--font-accent)", color: "var(--gold-300)", fontSize: "0.68rem", letterSpacing: "0.08em" }}
                className="hover:opacity-70 transition-opacity">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">

            {/* YouTube */}
            <a href={YT} target="_blank" rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 hover:opacity-70 transition-opacity"
              style={{ color: "var(--gold-700)" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span style={{ fontFamily: "var(--font-accent)", fontSize: "0.58rem", letterSpacing: "0.08em" }}>7.2K</span>
            </a>

            {/* WhatsApp broadcast pill */}
            <a
              href={`https://wa.me/${WA}?text=${BROADCAST_MSG}`}
              target="_blank" rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 hover:opacity-80 transition-opacity"
              style={{
                background: "rgba(37,211,102,0.08)",
                border: "1px solid rgba(37,211,102,0.25)",
                color: "#5de88a",
                fontFamily: "var(--font-accent)",
                fontSize: "0.58rem",
                letterSpacing: "0.1em",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              BROADCAST
            </a>

            {/* Cart */}
            <button onClick={toggleCart} className="relative p-2 hover:opacity-70 transition-opacity"
              style={{ color: "var(--gold-400)" }}>
              <ShoppingBag size={19} />
              {count() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ background: "var(--gold-500)", color: "var(--burg-950)", fontSize: "0.58rem", fontFamily: "var(--font-accent)", fontWeight: 700 }}>
                  {count()}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2"
              style={{ color: "var(--gold-400)" }}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="lg:hidden px-6 py-4 flex flex-col gap-1 gold-border-top"
            style={{ background: "var(--burg-800)" }}>
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="py-3 gold-border-bottom hover:opacity-70 transition-opacity"
                style={{ fontFamily: "var(--font-accent)", color: "var(--gold-300)", fontSize: "0.8rem", letterSpacing: "0.08em" }}>
                {l.label}
              </Link>
            ))}
            <a href={`https://wa.me/${WA}?text=${BROADCAST_MSG}`} target="_blank" rel="noopener noreferrer"
              className="py-3 gold-border-bottom flex items-center gap-2"
              style={{ color: "#5de88a", fontFamily: "var(--font-accent)", fontSize: "0.75rem" }}>
              Join WhatsApp Broadcast
            </a>
            <a href={YT} target="_blank" rel="noopener noreferrer"
              className="py-3 flex items-center gap-2"
              style={{ color: "var(--gold-500)", fontFamily: "var(--font-accent)", fontSize: "0.75rem" }}>
              YouTube · 7.2K Subscribers
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
