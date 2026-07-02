import { HeroBanner } from "@/components/homepage/hero-banner";
import { CategoryCarousel } from "@/components/homepage/category-carousel";
import { FeaturesRow } from "@/components/homepage/features-row";
import { DealsOfTheDay } from "@/components/homepage/deals-of-the-day";
import { PromotionalBanner } from "@/components/homepage/promotional-banner";
import { BestSellers } from "@/components/homepage/best-sellers";
import { AboutSection } from "@/components/homepage/about-section";
import { FeaturedCollection } from "@/components/homepage/featured-collection";
import { ProductSections } from "@/components/homepage/product-sections";
import { Newsletter } from "@/components/homepage/newsletter";
import { InstagramGallery } from "@/components/homepage/instagram-gallery";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategoryCarousel />
      <FeaturesRow />
      <DealsOfTheDay />
      <PromotionalBanner />
      <BestSellers />
      <AboutSection />
      <FeaturedCollection />
      <ProductSections />
      <Newsletter />
      <InstagramGallery />
    </>
  );
}
