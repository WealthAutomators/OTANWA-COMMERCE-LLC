export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function calculateDiscount(price: number, salePrice: number): number {
  return Math.round(((price - salePrice) / price) * 100);
}
