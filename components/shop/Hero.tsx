"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";

  const enquiryMessage = encodeURIComponent(
    "Hello, I'd like to enquire about your collection"
  );

  const videoConsultationMessage = encodeURIComponent(
    "Hello Jindal Vastrakala, I want to book a video consultation.\n\nMy name:\nOccasion:\nBudget:\nPreferred time:"
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden texture-overlay">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&q=80')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/85 via-ink-900/65 to-ink-900/95" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div
        className={`relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-1000 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-accent text-gold-400 tracking-[0.35em] text-[11px] sm:text-xs uppercase mb-5 sm:mb-6">
          Chandni Chowk, Delhi · Est. 2025
        </p>

        <h1
          className="font-display leading-[1.02] mb-5 sm:mb-6 text-[#f8ecd8]"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5.8rem)", fontWeight: 400 }}
        >
          Where Heritage{" "}
          <span className="text-gold-300 gold-shimmer font-semibold">
            Meets Grace
          </span>
        </h1>

        <p
          className="font-body text-[#ead7b0] text-base sm:text-xl md:text-2xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed"
          style={{ fontStyle: "italic" }}
        >
          Hand-picked sarees and lehengas from the timeless artistry of India.
          Shipped from Chandni Chowk to your doorstep, worldwide.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop/sarees"
            className="btn-gold px-10 py-4 text-sm uppercase tracking-widest rounded-none"
          >
            Explore Collection
          </Link>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${enquiryMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold px-10 py-4 text-sm uppercase tracking-widest rounded-none"
          >
            WhatsApp Us
          </a>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${videoConsultationMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold px-10 py-4 text-sm uppercase tracking-widest rounded-none"
          >
            Book Video Consultation
          </a>
        </div>

        <p className="mt-8 text-[11px] sm:text-xs tracking-[0.28em] uppercase text-[#d8b56a] font-accent">
          ✦ We ship Worldwide ✦
        </p>
      </div>
    </section>
  );
}
