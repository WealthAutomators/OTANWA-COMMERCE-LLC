import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <Container className="flex min-h-[50vh] items-center justify-center py-16">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </Container>
  );
}
