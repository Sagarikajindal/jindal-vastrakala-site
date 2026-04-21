export const dynamic = "force-dynamic";

import Hero from "@/components/shop/Hero";
import Marquee from "@/components/shop/Marquee";
import FeaturedProducts from "@/components/shop/FeaturedProducts";
import CategoryGrid from "@/components/shop/CategoryGrid";
import ConsultationBanner from "@/components/shop/ConsultationBanner";
import YouTubeBanner from "@/components/shop/YouTubeBanner";
import BrandStory from "@/components/shop/BrandStory";
import PolicyLinks from "@/components/shop/PolicyLinks";
import WhatsAppFloat from "@/components/shop/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <CategoryGrid />
      <FeaturedProducts />
      <ConsultationBanner />
      <YouTubeBanner />
      <BrandStory />
      <PolicyLinks />
      <WhatsAppFloat />
    </>
  );
}
