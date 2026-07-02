import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "1",
    slug: "bath-towels",
    name: "Bath Towels",
    image: "/categories/bath-towels.jpg",
    description: "Soft, absorbent bath towels for everyday comfort.",
    productCount: 6,
  },
  {
    id: "2",
    slug: "beach-towels",
    name: "Beach Towels",
    image: "/categories/beach-towels.jpg",
    description: "Bold, quick-dry towels made for sun and sand.",
    productCount: 4,
  },
  {
    id: "3",
    slug: "bathrobes",
    name: "Bathrobes",
    image: "/categories/bathrobes.jpg",
    description: "Plush robes designed for spa-level relaxation.",
    productCount: 4,
  },
  {
    id: "4",
    slug: "cleaning-towels",
    name: "Cleaning Towels",
    image: "/categories/cleaning-towels.jpg",
    description: "Durable, lint-free towels for household tasks.",
    productCount: 4,
  },
  {
    id: "5",
    slug: "face-towels",
    name: "Face Towels",
    image: "/categories/face-towels.jpg",
    description: "Gentle face cloths for sensitive skin.",
    productCount: 4,
  },
  {
    id: "6",
    slug: "accessories",
    name: "Accessories",
    image: "/categories/accessories.jpg",
    description: "Towel hooks, racks, and finishing touches.",
    productCount: 4,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
