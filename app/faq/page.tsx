import { faqItems } from "@/data/policies";
import { FaqPageContent } from "@/components/pages/policy-page";

export const metadata = { title: "FAQ" };

export default function FaqPage() {
  return <FaqPageContent items={faqItems} />;
}
