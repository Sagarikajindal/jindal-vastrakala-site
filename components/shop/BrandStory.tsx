export default function BrandStory() {
  return (
    <section className="py-24 px-6 border-y border-gold-800/20">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="font-accent text-gold-500 tracking-[0.3em] text-xs uppercase mb-4">Our Story</p>
          <h2 className="font-display text-gold-100 text-4xl font-light leading-snug mb-6">
            From the Heart of Chandni Chowk, to Your Doorstep
          </h2>
          <div className="space-y-4 font-body text-gold-400 text-lg leading-relaxed" style={{ fontStyle: "italic" }}>
            <p>
              Jindal Vastrakala was born in the ancient lanes of Chandni Chowk, Delhi — India's oldest and most celebrated fabric market — where master weavers have crafted textiles for over 400 years.
            </p>
            <p>
              Every piece we carry is personally hand-selected. We believe that a saree or lehenga is not just clothing — it is a memory, a ceremony, a story passed between generations.
            </p>
            <p>
              Whether you are in Delhi or Zurich, London or Dubai — we bring the authentic craftsmanship of India's greatest artisans directly to you.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-6 border-t border-gold-800/30 pt-8">
            {[
              { value: "₹58L+", label: "Sales in year one" },
              { value: "100%", label: "Handpicked stock" },
              { value: "3–8 days", label: "Worldwide shipping" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-gold-400 text-2xl">{s.value}</p>
                <p className="text-gold-600 text-xs mt-1 font-accent tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            className="aspect-[4/5] bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80')" }}
          />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-gold-600/40" />
          <div className="absolute -top-4 -right-4 w-32 h-32 border border-gold-600/40" />
        </div>
      </div>
    </section>
  );
}
