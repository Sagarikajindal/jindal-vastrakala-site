"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden texture-overlay">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&q=80')`,
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/80 via-ink-900/60 to-ink-900/90" />

      {/* Gold bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      {/* Content */}
      <div
        className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-accent text-gold-500 tracking-[0.4em] text-xs uppercase mb-6">
          Chandni Chowk, Delhi · Est. 2025
        </p>

        <h1 className="font-display text-gold-100 leading-[1.1] mb-6"
          style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", fontWeight: 300 }}>
          Where Heritage{" "}
          <span className="gold-shimmer font-semibold">Meets Grace</span>
        </h1>

        <p className="font-body text-gold-300 text-xl max-w-xl mx-auto mb-10 leading-relaxed" style={{ fontStyle: "italic" }}>
          Hand-picked sarees, lehengas &amp; suits from the ancient looms of India.
          Shipped from Chandni Chowk to your doorstep, worldwide.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop/sarees" className="btn-gold px-10 py-4 text-sm uppercase tracking-widest rounded-none">
            Explore Collection
          </Link>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999"}?text=Hello, I'd like to enquire about your collection`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold px-10 py-4 text-sm uppercase tracking-widest rounded-none"
          >
            WhatsApp Us
          </a>
        </div>

        <p className="mt-8 text-gold-600 text-sm font-accent tracking-wider">
          ✦ &nbsp; Free shipping to UK · UAE · Europe · USA &nbsp; ✦
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold-600">
        <div className="w-px h-12 bg-gradient-to-b from-gold-500 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
