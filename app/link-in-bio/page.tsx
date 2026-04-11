import Link from "next/link";
import WhatsAppFloat from "@/components/shop/WhatsAppFloat";

const links = [
  {
    label: "Shop Sarees",
    sub: "Banarasi · Chanderi · Patola",
    href: "/shop/sarees",
    accent: true,
  },
  {
    label: "Shop Lehengas",
    sub: "Bridal · Reception · Sangeet",
    href: "/shop/lehengas",
    accent: false,
  },
  {
    label: "Shop Suits",
    sub: "Anarkali · Churidar · Palazzo",
    href: "/shop/suits",
    accent: false,
  },
  {
    label: "Order via WhatsApp",
    sub: "Custom orders · Quick enquiries",
    href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999"}?text=Hi! I came from your TikTok/Instagram and would like to see your collection.`,
    accent: false,
    external: true,
  },
  {
    label: "Watch us on TikTok",
    sub: "@jindalvastrakala",
    href: "https://tiktok.com/@jindalvastrakala",
    accent: false,
    external: true,
  },
  {
    label: "Follow on Instagram",
    sub: "@jindalvastrakala",
    href: "https://instagram.com/jindalvastrakala",
    accent: false,
    external: true,
  },
];

export default function LinkInBioPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      {/* Profile */}
      <div className="text-center mb-10">
        <div className="w-24 h-24 rounded-full border-2 border-gold-500 overflow-hidden mx-auto mb-5 bg-ink-800 flex items-center justify-center">
          <span className="font-accent text-gold-400 text-2xl">JV</span>
        </div>
        <h1 className="font-accent text-gold-300 tracking-[0.2em] text-sm uppercase mb-1">
          Jindal Vastrakala
        </h1>
        <p className="font-display text-gold-100 text-2xl font-light mb-2">
          Luxury Sarees & Lehengas
        </p>
        <p className="text-gold-500 text-sm font-body italic">
          Chandni Chowk, Delhi · Ships Worldwide
        </p>
        <div className="flex justify-center gap-2 mt-3">
          <span className="border border-gold-800/50 text-gold-600 text-xs px-3 py-1 font-accent tracking-wide">🇮🇳 Delhi</span>
          <span className="border border-gold-800/50 text-gold-600 text-xs px-3 py-1 font-accent tracking-wide">🇨🇭 Switzerland</span>
        </div>
      </div>

      {/* Links */}
      <div className="w-full max-w-sm space-y-3">
        {links.map((link) => {
          const inner = (
            <div className={`w-full py-4 px-6 text-center transition-all duration-200 ${
              link.accent
                ? "btn-gold"
                : "border border-gold-700/50 hover:border-gold-400 bg-ink-800/50 hover:bg-ink-700/50"
            }`}>
              <p className={`font-accent tracking-widest text-xs uppercase ${link.accent ? "text-ink-900" : "text-gold-300"}`}>
                {link.label}
              </p>
              <p className={`text-xs mt-0.5 font-body italic ${link.accent ? "text-ink-700" : "text-gold-600"}`}>
                {link.sub}
              </p>
            </div>
          );

          return link.external ? (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="block">
              {inner}
            </a>
          ) : (
            <Link key={link.label} href={link.href} className="block">
              {inner}
            </Link>
          );
        })}
      </div>

      {/* Footer note */}
      <p className="text-gold-700 text-xs text-center mt-10 font-body italic max-w-xs">
        Every piece is hand-selected from the looms of India. Limited stock — enquire early for wedding season.
      </p>

      <WhatsAppFloat />
    </div>
  );
}
