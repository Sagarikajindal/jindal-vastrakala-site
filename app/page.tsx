import Hero from "@/components/shop/Hero";
import FeaturedProducts from "@/components/shop/FeaturedProducts";
import CategoryGrid from "@/components/shop/CategoryGrid";
import BrandStory from "@/components/shop/BrandStory";
import WhatsAppFloat from "@/components/shop/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <BrandStory />
      <WhatsAppFloat />
    </>
  );
}
