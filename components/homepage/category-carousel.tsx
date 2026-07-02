"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Carousel } from "@/components/ui/carousel";

export function CategoryCarousel() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeading title="Shop by Category" centered />
        <Carousel slidesToShow={6} className="px-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group flex flex-col items-center gap-3 text-center"
            >
              <div className="relative h-24 w-24 overflow-hidden rounded-full border border-border bg-muted transition-transform duration-300 group-hover:scale-105 md:h-28 md:w-28">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                {category.name}
              </span>
            </Link>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
