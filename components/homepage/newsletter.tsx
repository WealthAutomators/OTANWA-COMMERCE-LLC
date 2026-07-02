"use client";

import { useState } from "react";
import { newsletter } from "@/data/homepage";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="rounded-xl border border-border bg-muted/30 px-6 py-12 text-center md:px-16 md:py-16">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{newsletter.title}</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">{newsletter.description}</p>
          {submitted ? (
            <p className="mt-8 text-sm font-medium text-primary">Thank you for subscribing!</p>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder={newsletter.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white"
              />
              <Button type="submit" size="lg" className="shrink-0">
                {newsletter.buttonText}
              </Button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
