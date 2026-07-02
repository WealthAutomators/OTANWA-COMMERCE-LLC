"use client";

import { useState, useRef } from "react";
import { Star, Upload, X } from "lucide-react";
import { ProductReview } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WriteReviewFormProps {
  onSubmit: (review: Omit<ProductReview, "id" | "productId" | "helpful" | "verified">) => void;
}

export function WriteReviewForm({ onSubmit }: WriteReviewFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !rating || !title || !body) return;

    onSubmit({
      name,
      email,
      rating,
      title,
      body,
      date: new Date().toISOString(),
      image: imagePreview || undefined,
    });

    setName("");
    setEmail("");
    setRating(0);
    setTitle("");
    setBody("");
    setImagePreview(null);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="rounded-lg border border-border bg-white p-6 md:p-8">
      <h3 className="text-xl font-semibold">Write a Review</h3>
      <p className="mt-1 text-sm text-muted-foreground">Share your experience with this product</p>

      {submitted && (
        <div className="mt-4 rounded-md bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
          Thank you! Your review has been submitted.
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="review-name">Name *</Label>
            <Input
              id="review-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1.5"
              placeholder="Your name"
            />
          </div>
          <div>
            <Label htmlFor="review-email">Email</Label>
            <Input
              id="review-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div>
          <Label>Rating *</Label>
          <div className="mt-2 flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="p-0.5 transition-transform hover:scale-110"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                aria-label={`Rate ${star} stars`}
              >
                <Star
                  className={cn(
                    "h-6 w-6 transition-colors",
                    (hoverRating || rating) >= star
                      ? "fill-accent text-accent"
                      : "fill-muted text-muted"
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="review-title">Review Title *</Label>
          <Input
            id="review-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1.5"
            placeholder="Summarize your experience"
          />
        </div>

        <div>
          <Label htmlFor="review-body">Review *</Label>
          <Textarea
            id="review-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            className="mt-1.5"
            placeholder="Tell us what you think about this product..."
            rows={4}
          />
        </div>

        <div>
          <Label>Upload Image (optional)</Label>
          <div className="mt-2">
            {imagePreview ? (
              <div className="relative inline-block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePreview} alt="Preview" className="h-24 w-24 rounded-md border border-border object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="absolute -right-2 -top-2 rounded-full bg-white p-1 shadow-md border border-border"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-md border border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Upload className="h-5 w-5" />
                <span className="text-xs">Upload</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <Button type="submit" size="lg" disabled={!rating}>
          Submit Review
        </Button>
      </form>
    </div>
  );
}
