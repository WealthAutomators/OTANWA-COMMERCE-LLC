import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { aboutSection } from "@/data/homepage";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
            <Image
              src={aboutSection.image}
              alt={aboutSection.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{aboutSection.title}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{aboutSection.description}</p>
            <ul className="mt-6 space-y-3">
              {aboutSection.checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-8">
              <Link href={aboutSection.buttonLink}>{aboutSection.buttonText}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
