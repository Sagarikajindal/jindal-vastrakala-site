import Link from "next/link";
import { Shield, RotateCcw, Truck, Lock } from "lucide-react";

const policies = [
  {
    icon: Truck,
    title: "Shipping Policy",
    desc: "Free worldwide shipping to UK, UAE, Europe & USA. Dispatched within 24 hours.",
    href: "/policies#shipping",
  },
  {
    icon: RotateCcw,
    title: "Return & Exchange",
    desc: "7-day easy returns. We make it simple — no questions asked for eligible items.",
    href: "/policies#returns",
  },
  {
    icon: Shield,
    title: "Authenticity Guarantee",
    desc: "Every piece is hand-verified. 100% authentic handwoven fabrics, no exceptions.",
    href: "/policies#authenticity",
  },
  {
    icon: Lock,
    title: "Privacy Policy",
    desc: "Your data is safe with us. We never share your information with third parties.",
    href: "/policies#privacy",
  },
];

export default function PolicyLinks() {
  return (
    <section className="py-20 px-6 bg-ink-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-accent text-gold-500 tracking-[0.3em] text-xs uppercase mb-3">
            Our Commitment To You
          </p>
          <h2 className="font-display text-gold-100 text-4xl md:text-5xl font-light">
            Shop with Complete Confidence
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {policies.map(({ icon: Icon, title, desc, href }) => (
            <Link
              key={href}
              href={href}
              className="block rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:opacity-95"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(200,146,26,0.15)",
              }}
            >
              <Icon className="w-6 h-6 text-gold-500 mb-4" />
              <h3 className="font-display text-gold-100 text-xl mb-2">{title}</h3>
              <p className="text-gold-300/80 text-sm leading-6 mb-4">{desc}</p>
              <span className="font-accent text-gold-500 text-xs tracking-[0.15em] uppercase">
                Read More →
              </span>
            </Link>
          ))}
        </div>

        <p className="text-center text-gold-400/80 text-sm mt-10">
          Questions? We&apos;re always here.{" "}
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-500 hover:text-gold-400"
          >
            WhatsApp us anytime.
          </a>
        </p>
      </div>
    </section>
  );
}
