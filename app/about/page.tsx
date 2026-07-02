import { company } from "@/data/company";
import { testimonials } from "@/data/testimonials";
import { PageHero, PageSection } from "@/components/ui/page-layout";
import { Container } from "@/components/ui/container";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Check, Award, Leaf, Heart } from "lucide-react";

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={`About ${company.name}`}
        description={company.description}
        breadcrumbs={[{ label: "About Us" }]}
      />

      <Container className="pb-16">
        <div className="grid items-center gap-10 py-12 md:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
            <Image src="/banners/about.jpg" alt="About Ottanwa Commerce" fill className="object-cover" sizes="50vw" />
          </div>
          <PageSection title="Our Story">
            <p>
              Ottanwa Commerce was founded with a simple belief: the towels and linens you use every day
              should feel exceptional. What started as a small family operation in Portland, Oregon has
              grown into a trusted name for premium home textiles across the United States.
            </p>
            <p className="mt-4">
              We work directly with skilled manufacturers to source the finest long-staple cotton,
              ensuring every product meets our standards for softness, absorbency, and longevity.
              Every item in our collection is designed to get better with time — not wear out.
            </p>
          </PageSection>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Award, title: "Premium Quality", desc: "600 GSM cotton and OEKO-TEX certified materials on every product." },
            { icon: Leaf, title: "Sustainably Sourced", desc: "Ethically manufactured with eco-conscious packaging and shipping." },
            { icon: Heart, title: "Customer First", desc: "30-day returns, responsive support, and a satisfaction guarantee." },
            { icon: Check, title: "Built to Last", desc: "Double-stitched hems and colorfast dyes that survive hundreds of washes." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-lg border border-border bg-white p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <PageSection title="What Our Customers Say" className="mt-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <div key={t.id} className="rounded-lg border border-border bg-white p-6">
                <StarRating rating={t.rating} showCount={false} size="md" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
                <p className="mt-4 text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            ))}
          </div>
        </PageSection>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/shop">Shop Our Collection</Link>
          </Button>
        </div>
      </Container>
    </>
  );
}
