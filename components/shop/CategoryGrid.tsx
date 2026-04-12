import Link from "next/link";

const categories = [
  {
    name: "Sarees",
    href: "/shop/sarees",
    image: "/LP img saree.png",
    imagePosition: "center top",
    description: "Banarasi · Chanderi · Patola · Organza",
  },
  {
    name: "Lehengas",
    href: "/shop/lehengas",
    image: "/LP img lehenga.jpg",
    imagePosition: "center top",
    description: "Bridal · Non Bridal",
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#F8F1E7] to-[#F3EADF]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-accent text-[#C6A96B] tracking-[0.3em] text-xs uppercase mb-3">
            Our Collections
          </p>
          <h2 className="font-display text-[#2B1A12] text-4xl md:text-5xl font-light">
            Curated for Every Occasion
          </h2>
          <div className="ornament mt-4 text-[#C6A96B] text-sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto place-items-center">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative overflow-hidden block w-full max-w-[400px]"
            >
              <div className="aspect-[3/4] relative overflow-hidden shadow-[0_14px_40px_rgba(0,0,0,0.10)] bg-[#e9dcc8]">
                <div
                  className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${cat.image}')`,
                    backgroundPosition: cat.imagePosition,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A120D] via-[#1A120D]/18 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 px-8 pb-10 pt-16">
                  <h3 className="font-display text-[#F8F1E7] text-3xl font-light mb-1">
                    {cat.name}
                  </h3>
                  <p className="font-body text-[#D8C08A] text-[15px] italic mt-2">
                    {cat.description}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-[#C6A96B] text-xs font-accent tracking-[0.18em] uppercase">
                    <span>Shop Now</span>
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
