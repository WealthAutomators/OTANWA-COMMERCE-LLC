import { returnPolicy } from "@/data/policies";
import { PolicyPageContent } from "@/components/pages/policy-page";

export const metadata = { title: "Return Policy" };

export default function ReturnsPage() {
  return (
    <PolicyPageContent
      title={returnPolicy.title}
      description={returnPolicy.description}
      breadcrumbs={[{ label: "Return Policy" }]}
      sections={returnPolicy.sections}
    />
  );
}
