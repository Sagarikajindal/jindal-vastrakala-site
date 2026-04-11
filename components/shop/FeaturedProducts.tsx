import { getFeaturedProducts, formatINR, formatEUR } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="font-accent text-gold-500 tracking-[0.3em] text-xs uppercase mb-3">Handpicked</p>
        <h2 className="font-display text-gold-100 text-5xl font-light">Featured Pieces</h2>
        <p className="text-gold-500 text-sm mt-3 font-body italic">Limited stock — each piece is unique</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
