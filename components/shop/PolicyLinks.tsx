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
    <section className="py-20 px-6 gold-border-top" style={{ background: "var(--burg-950)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p style={{ fontFamily: "var(--font-accent)", color: "var(--gold-500)", letterSpacing: "0.35em", fontSize: "0.6rem", marginBottom: "0.5rem" }}>
            OUR COMMITMENT TO YOU
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--gold-100)", fontSize: "2.5rem", fontWeight: 300 }}>
            Shop with Complete Confidence
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {policies.map(({ icon: Icon, title, desc, href }) => (
            <Link key={title} href={href}
              className="group block p-6 transition-all"
              style={{ border: "1px solid rgba(200,146,26,0.15)", background: "rgba(82,5,21,0.3)" }}
              onMouseOver={e => (e.currentTarget.style.borderColor = "rgba(200,146,26,0.4)")}
              onMouseOut={e => (e.currentTarget.style.borderColor = "rgba(200,146,26,0.15)")}
            >
              <Icon size={20} style={{ color: "var(--gold-500)", marginBottom: "0.75rem" }} />
              <h3 style={{ fontFamily: "var(--font-accent)", color: "var(--gold-300)", fontSize: "0.75rem", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
                {title}
              </h3>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--gold-100)", opacity: 0.65, fontSize: "0.9rem", fontStyle: "italic", lineHeight: 1.6 }}>
                {desc}
              </p>
              <p style={{ fontFamily: "var(--font-accent)", color: "var(--gold-700)", fontSize: "0.6rem", letterSpacing: "0.15em", marginTop: "1rem" }}>
                READ MORE →
              </p>
            </Link>
          ))}
        </div>

        <p className="text-center" style={{ fontFamily: "var(--font-body)", color: "var(--gold-700)", fontSize: "0.85rem", fontStyle: "italic" }}>
          Questions? We're always here.{" "}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999"}?text=Hi! I have a question about your policies.`}
            target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--gold-500)" }}
            className="hover:underline"
          >
            WhatsApp us anytime.
          </a>
        </p>
      </div>
    </section>
  );
}
