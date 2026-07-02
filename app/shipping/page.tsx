import { shippingPolicy } from "@/data/policies";
import { PolicyPageContent } from "@/components/pages/policy-page";

export const metadata = { title: "Shipping Policy" };

export default function ShippingPage() {
  return (
    <PolicyPageContent
      title={shippingPolicy.title}
      description={shippingPolicy.description}
      breadcrumbs={[{ label: "Shipping Policy" }]}
      sections={shippingPolicy.sections}
    />
  );
}
