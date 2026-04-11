import Link from "next/link";

const categories = [
  {
    name: "Sarees",
    href: "/shop/sarees",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80",
    description: "Banarasi · Chanderi · Patola · Organza",
  },
  {
    name: "Lehengas",
    href: "/shop/lehengas",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80",
    description: "Bridal · Reception · Sangeet",
  },
  {
    name: "Suits",
    href: "/shop/suits",
    image: "https://images.unsplash.com/photo-1594938298603-3b7496bff9cc?w=800&q=80",
    description: "Anarkali · Churidar · Palazzo",
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="font-accent text-gold-500 tracking-[0.3em] text-xs uppercase mb-3">Our Collections</p>
        <h2 className="font-display text-gold-100 text-5xl font-light">Curated for Every Occasion</h2>
        <div className="ornament mt-4 text-gold-600 text-sm" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link key={cat.name} href={cat.href} className="group relative overflow-hidden block">
            <div className="aspect-[3/4] relative overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${cat.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-display text-gold-100 text-3xl font-light mb-1">{cat.name}</h3>
                <p className="font-body text-gold-400 text-sm italic">{cat.description}</p>
                <div className="mt-4 flex items-center gap-2 text-gold-500 text-xs font-accent tracking-widest uppercase">
                  <span>Shop Now</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
