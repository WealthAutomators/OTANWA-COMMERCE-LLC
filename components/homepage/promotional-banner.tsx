import Image from "next/image";
import Link from "next/link";
import { promotionalBanner } from "@/data/homepage";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function PromotionalBanner() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
          <div className="grid md:grid-cols-2">
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">
                {promotionalBanner.title}
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{promotionalBanner.description}</p>
              <Button asChild size="lg" className="mt-8 w-fit">
                <Link href={promotionalBanner.buttonLink}>{promotionalBanner.buttonText}</Link>
              </Button>
            </div>
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[360px]">
              <Image
                src={promotionalBanner.image}
                alt={promotionalBanner.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
