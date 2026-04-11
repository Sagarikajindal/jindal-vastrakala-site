import { getProductsByCategory } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";
import WhatsAppFloat from "@/components/shop/WhatsAppFloat";

export default function SareesPage() {
  const sarees = getProductsByCategory("saree");
  return (
    <div className="min-h-screen pt-24 pb-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="font-accent text-gold-500 tracking-[0.3em] text-xs uppercase mb-3">Collection</p>
        <h1 className="font-display text-gold-100 text-6xl font-light">Sarees</h1>
        <p className="text-gold-500 font-body italic mt-3 text-lg">
          Banarasi · Chanderi · Patola · Organza · Silk
        </p>
        <div className="ornament mt-4 text-gold-600 text-sm" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sarees.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
      {sarees.length === 0 && (
        <p className="text-center text-gold-600 font-body italic text-xl mt-12">New arrivals coming soon.</p>
      )}
      <WhatsAppFloat />
    </div>
  );
}
