"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { heroSlides } from "@/data/homepage";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";

export function HeroBanner() {
  return (
    <section className="relative">
      <Carousel autoplay showDots showArrows className="w-full">
        {heroSlides.map((slide) => (
          <div key={slide.id} className="relative aspect-[16/7] min-h-[400px] w-full md:aspect-[16/6]">
            <Image
              src={slide.image}
              alt={slide.headline}
              fill
              className="object-cover"
              priority={slide.id === "1"}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/20" />
            <Container className="relative flex h-full items-center">
              <motion.div
                className="max-w-lg text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-3xl font-semibold leading-tight md:text-5xl lg:text-6xl">
                  {slide.headline}
                </h1>
                <p className="mt-4 text-base text-white/90 md:text-lg">{slide.description}</p>
                <Button asChild size="lg" className="mt-6 bg-white text-primary hover:bg-white/90">
                  <Link href={slide.ctaLink}>{slide.ctaText}</Link>
                </Button>
              </motion.div>
            </Container>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
