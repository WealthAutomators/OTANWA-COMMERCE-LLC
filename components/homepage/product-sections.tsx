"use client";

import { productSections } from "@/data/homepage";
import { getProductsByCategory } from "@/data/products";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Carousel } from "@/components/ui/carousel";
import { ProductCard } from "@/components/product/product-card";

export function ProductSections() {
  return (
    <>
      {productSections.map((section) => {
        const products = getProductsByCategory(section.categorySlug);
        if (products.length === 0) return null;

        return (
          <section key={section.id} className="py-12 md:py-16">
            <Container>
              <SectionHeading title={section.title} viewMoreLink={section.viewMoreLink} />
              <Carousel slidesToShow={4} className="px-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </Carousel>
            </Container>
          </section>
        );
      })}
    </>
  );
}
