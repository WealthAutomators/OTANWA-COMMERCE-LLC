"use client";

import { Product } from "@/types";
import { getProductsByCategory, products as allProducts } from "@/data/products";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Carousel } from "@/components/ui/carousel";
import { ProductCard } from "@/components/product/product-card";

interface ProductCarouselProps {
  title: string;
  items: Product[];
  viewMoreLink?: string;
}

export function ProductCarousel({ title, items, viewMoreLink }: ProductCarouselProps) {
  if (items.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeading title={title} viewMoreLink={viewMoreLink} />
        <Carousel slidesToShow={4} className="px-8">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}

interface RelatedProductsProps {
  product: Product;
}

export function RelatedProducts({ product }: RelatedProductsProps) {
  const related = getProductsByCategory(product.categorySlug).filter((p) => p.id !== product.id).slice(0, 8);
  return <ProductCarousel title="Related Products" items={related} viewMoreLink={`/categories/${product.categorySlug}`} />;
}

interface RecentlyViewedProps {
  slugs: string[];
  currentSlug: string;
}

export function RecentlyViewedCarousel({ slugs, currentSlug }: RecentlyViewedProps) {
  const items = slugs
    .filter((s) => s !== currentSlug)
    .map((slug) => allProducts.find((p) => p.slug === slug))
    .filter((p): p is Product => p !== undefined)
    .slice(0, 8);

  if (items.length === 0) return null;
  return <ProductCarousel title="Recently Viewed" items={items} />;
}
