import { termsPolicy } from "@/data/policies";
import { PolicyPageContent } from "@/components/pages/policy-page";

export const metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <PolicyPageContent
      title={termsPolicy.title}
      description={termsPolicy.description}
      breadcrumbs={[{ label: "Terms & Conditions" }]}
      sections={termsPolicy.sections}
    />
  );
}
