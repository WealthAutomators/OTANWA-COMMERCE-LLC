"use client";

import { useState } from "react";
import Image from "next/image";
import { ThumbsUp, BadgeCheck } from "lucide-react";
import { Product } from "@/types";
import { ProductReview } from "@/types";
import {
  generateReviewsForProduct,
  getRatingBreakdown,
  getAverageRating,
} from "@/lib/reviews";
import { Container } from "@/components/ui/container";
import { StarRating } from "@/components/ui/star-rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WriteReviewForm } from "@/components/product/write-review-form";
import { cn } from "@/lib/utils";

interface ProductReviewsProps {
  product: Product;
}

function RatingBar({ stars, count, total }: { stars: number; count: number; total: number }) {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-8 shrink-0 text-muted-foreground">{stars}★</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-8 shrink-0 text-right text-muted-foreground">{count}</span>
    </div>
  );
}

function ReviewCard({
  review,
  onHelpful,
}: {
  review: ProductReview;
  onHelpful: (id: string) => void;
}) {
  const [helpfulClicked, setHelpfulClicked] = useState(false);

  return (
    <div className="rounded-lg border border-border bg-white p-5 md:p-6 transition-shadow hover:shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-foreground">{review.name}</span>
            {review.verified && (
              <Badge variant="secondary" className="gap-1 text-xs font-normal">
                <BadgeCheck className="h-3 w-3 text-primary" />
                Verified Purchase
              </Badge>
            )}
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{review.date}</p>
        </div>
        <StarRating rating={review.rating} showCount={false} size="md" />
      </div>

      <h4 className="mt-3 font-medium text-foreground">{review.title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{review.body}</p>

      {review.image && (
        <div className="relative mt-4 h-24 w-24 overflow-hidden rounded-md border border-border">
          <Image src={review.image} alt="Customer photo" fill className="object-cover" sizes="96px" loading="lazy" />
        </div>
      )}

      <Button
        variant="ghost"
        size="sm"
        className={cn("mt-4 gap-1.5 text-muted-foreground", helpfulClicked && "text-primary")}
        onClick={() => {
          if (!helpfulClicked) {
            onHelpful(review.id);
            setHelpfulClicked(true);
          }
        }}
        disabled={helpfulClicked}
      >
        <ThumbsUp className="h-3.5 w-3.5" />
        Helpful ({review.helpful + (helpfulClicked ? 1 : 0)})
      </Button>
    </div>
  );
}

export function ProductReviews({ product }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<ProductReview[]>(() =>
    generateReviewsForProduct(product.id, product.name)
  );

  const breakdown = getRatingBreakdown(reviews);
  const averageRating = getAverageRating(reviews);
  const totalReviews = reviews.length;

  const handleHelpful = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpful: r.helpful + 1 } : r))
    );
  };

  const handleSubmitReview = (review: Omit<ProductReview, "id" | "productId" | "helpful" | "verified">) => {
    const newReview: ProductReview = {
      ...review,
      id: `${product.id}-user-${Date.now()}`,
      productId: product.id,
      helpful: 0,
      verified: false,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  return (
    <section className="border-t border-border bg-muted/20 py-12 md:py-16">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Customer Reviews</h2>

        <div className="mt-8 grid gap-10 lg:grid-cols-[280px_1fr]">
          <div className="rounded-lg border border-border bg-white p-6">
            <div className="text-center">
              <p className="text-4xl font-semibold text-foreground">{averageRating.toFixed(1)}</p>
              <StarRating rating={averageRating} showCount={false} size="md" className="mt-2 justify-center" />
              <p className="mt-2 text-sm text-muted-foreground">Based on {totalReviews} reviews</p>
            </div>

            <div className="mt-6 space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => (
                <RatingBar
                  key={stars}
                  stars={stars}
                  count={breakdown[stars as keyof typeof breakdown]}
                  total={totalReviews}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} onHelpful={handleHelpful} />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <WriteReviewForm onSubmit={handleSubmitReview} />
        </div>
      </Container>
    </section>
  );
}
