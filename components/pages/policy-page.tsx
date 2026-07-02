import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHero, PageSection, PolicyList } from "@/components/ui/page-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface PolicySection {
  title: string;
  content: string;
  list?: string[];
}

interface PolicyPageProps {
  title: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
  sections: PolicySection[];
}

export function PolicyPageContent({ title, description, breadcrumbs, sections }: PolicyPageProps) {
  return (
    <>
      <PageHero title={title} description={description} breadcrumbs={breadcrumbs} />
      <Container className="pb-16">
        {sections.map((section) => (
          <PageSection key={section.title} title={section.title}>
            {section.content && <p>{section.content}</p>}
            {section.list && <PolicyList items={section.list} />}
          </PageSection>
        ))}
      </Container>
    </>
  );
}

interface FaqPageProps {
  items: { question: string; answer: string }[];
}

export function FaqPageContent({ items }: FaqPageProps) {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        description="Find answers to common questions about orders, shipping, returns, and our products."
        breadcrumbs={[{ label: "FAQ" }]}
      />
      <Container className="pb-16">
        <Accordion type="single" collapsible className="max-w-3xl">
          {items.map((item, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-left text-base">{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-10 text-sm text-muted-foreground">
          Still have questions?{" "}
          <Link href="/contact" className="font-medium text-primary hover:underline">
            Contact our support team
          </Link>
        </p>
      </Container>
    </>
  );
}
