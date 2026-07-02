import { privacyPolicy } from "@/data/policies";
import { PolicyPageContent } from "@/components/pages/policy-page";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <PolicyPageContent
      title={privacyPolicy.title}
      description={privacyPolicy.description}
      breadcrumbs={[{ label: "Privacy Policy" }]}
      sections={privacyPolicy.sections}
    />
  );
}
