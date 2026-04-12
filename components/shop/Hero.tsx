"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918368319092";

  const youtubeLink = "https://www.youtube.com/@JindalVastrakala/shorts";

  const videoConsultationMessage = encodeURIComponent(
    "Hello Jindal Vastrakala, I want to book a video consultation.\n\nMy name:\nOccasion:\nBudget:\nPreferred time:"
  );

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/Landing Page image.png')",
          backgroundPosition: "center top",
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(18,11,8,0.92)_0%,rgba(18,11,8,0.78)_34%,rgba(18,11,8,0.55)_58%,rgba(18,11,8,0.42)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(18,11,8,0.40)_0%,rgba(18,11,8,0.18)_30%,rgba(18,11,8,0.72)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6A96B] to-transparent" />

      <div className="relative z-10 min-h-screen flex items-center">
        <div
          className={`w-full px-8 md:px-14 xl:px-20 pt-28 md:pt-32 transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-3xl text-center md:text-left">
            <p className="font-accent text-[#C6A96B] tracking-[0.28em] text-[11px] sm:text-xs mb-5 sm:mb-6">
              CHANDNI CHOWK, DELHI · EST. 2025
            </p>

            <h1
              className="font-display leading-[0.98] text-[#F8F1E7] mb-6"
              style={{ fontSize: "clamp(3rem, 7vw, 6.1rem)", fontWeight: 500 }}
            >
              Where Heritage <span className="text-[#D8C08A]">Meets Grace</span>
            </h1>

            <p
              className="font-body text-[#EADCC1] text-base sm:text-xl md:text-2xl max-w-2xl md:max-w-xl mb-8 sm:mb-10 leading-relaxed"
              style={{ fontStyle: "italic" }}
            >
              Hand-picked sarees and lehengas from the timeless artistry of India.
              Shipped from Chandni Chowk to your doorstep, worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/shop/sarees"
                className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-[0.16em] rounded-none bg-[#C6A96B] text-[#140d09] hover:bg-[#D8C08A] transition-colors"
              >
                Explore Collection
              </Link>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${videoConsultationMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-[0.16em] rounded-none border border-[#C6A96B] text-[#E7D3A2] hover:bg-[#C6A96B]/10 hover:text-[#F3E7C7] transition-colors"
              >
                Book Video Consultation
              </a>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center md:justify-start">
              <div className="min-w-[190px] border border-[#6f5528]/35 bg-black/15 backdrop-blur-[2px] px-5 py-4">
                <p className="text-[#F3E7C7] text-xl sm:text-2xl font-semibold leading-none">
                  150+
                </p>
                <p className="mt-2 text-[#D8C08A] text-xs sm:text-sm tracking-[0.08em]">
                  5-Star Google Reviews
                </p>
              </div>

              <a
                href={youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[190px] border border-[#6f5528]/35 bg-black/15 backdrop-blur-[2px] px-5 py-4 transition-all hover:bg-[#C6A96B]/10 hover:border-[#C6A96B]/50"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[#F3E7C7] text-xl sm:text-2xl font-semibold leading-none">
                      7.2K
                    </p>
                    <p className="mt-2 text-[#D8C08A] text-xs sm:text-sm tracking-[0.08em]">
                      YouTube Subscribers
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C6A96B]/40 text-[#E7D3A2]">
                    <Play size={18} fill="currentColor" />
                  </div>
                </div>
              </a>

              <div className="min-w-[190px] border border-[#6f5528]/35 bg-black/15 backdrop-blur-[2px] px-5 py-4">
                <p className="text-[#F3E7C7] text-xl sm:text-2xl font-semibold leading-none">
                  Worldwide
                </p>
                <p className="mt-2 text-[#D8C08A] text-xs sm:text-sm tracking-[0.08em]">
                  Shipping Available
                </p>
              </div>
            </div>

            <p className="mt-8 text-sm sm:text-base md:text-lg tracking-[0.12em] text-[#D8C08A] font-accent">
              Designer & Affordable Indian Ethnic wear for bridal and festive moments
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
