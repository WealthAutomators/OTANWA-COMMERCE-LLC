"use client";

import { dealsEndTime } from "@/data/homepage";
import { getDealProducts } from "@/data/products";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { Carousel } from "@/components/ui/carousel";
import { ProductCard } from "@/components/product/product-card";

export function DealsOfTheDay() {
  const deals = getDealProducts().slice(0, 8);

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SectionHeading title="Deals of the Day" className="mb-0" />
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">Ends in:</span>
            <CountdownTimer endTime={dealsEndTime} />
          </div>
        </div>
        <Carousel slidesToShow={4} className="px-8">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
