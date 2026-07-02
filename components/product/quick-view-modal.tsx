"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, calculateDiscount } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { useState } from "react";

interface QuickViewModalProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickViewModal({ product, open, onOpenChange }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const hasDiscount = product.salePrice && product.salePrice < product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onOpenChange(false);
    setQuantity(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-lg border border-border">
            <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="400px" />
            {hasDiscount && (
              <Badge variant="sale" className="absolute left-3 top-3">
                -{calculateDiscount(product.price, product.salePrice!)}%
              </Badge>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{product.category}</p>
              <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>
              <StarRating rating={product.rating} reviews={product.reviews} className="mt-2" size="md" />
            </div>
            <p className="text-sm text-muted-foreground line-clamp-4">{product.description}</p>
            <div className="flex items-center gap-2">
              {hasDiscount ? (
                <>
                  <span className="text-xl font-semibold text-primary">{formatPrice(product.salePrice!)}</span>
                  <span className="text-sm text-muted-foreground line-through">{formatPrice(product.price)}</span>
                </>
              ) : (
                <span className="text-xl font-semibold">{formatPrice(product.price)}</span>
              )}
            </div>
            <QuantitySelector quantity={quantity} onChange={setQuantity} />
            <div className="flex gap-3">
              <Button className="flex-1" onClick={handleAddToCart}>
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/product/${product.slug}`} onClick={() => onOpenChange(false)}>
                  View Details
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
