import { refundPolicy } from "@/data/policies";
import { PolicyPageContent } from "@/components/pages/policy-page";

export const metadata = { title: "Refund Policy" };

export default function RefundPage() {
  return (
    <PolicyPageContent
      title={refundPolicy.title}
      description={refundPolicy.description}
      breadcrumbs={[{ label: "Refund Policy" }]}
      sections={refundPolicy.sections}
    />
  );
}
