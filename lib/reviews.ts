import { ProductReview, RatingBreakdown } from "@/types";

const FIRST_NAMES = [
  "Sarah", "James", "Emily", "Michael", "Jessica", "David", "Amanda", "Robert",
  "Jennifer", "Chris", "Lauren", "Daniel", "Rachel", "Mark", "Ashley", "Brian",
  "Nicole", "Kevin", "Stephanie", "Jason", "Michelle", "Ryan", "Laura", "Eric",
  "Heather", "Matt", "Kimberly", "Andrew", "Lisa", "Thomas",
];

const LAST_INITIALS = "ABCDEFGHJKLMNPRSTW";

const REVIEW_TITLES_5 = [
  "Absolutely love these",
  "Best purchase I've made",
  "Exceeded my expectations",
  "Worth every penny",
  "So soft and luxurious",
  "Perfect quality",
  "Will buy again",
  "Highly recommend",
  "Exactly what I needed",
  "Outstanding quality",
  "My new favorite",
  "Couldn't be happier",
  "Fantastic product",
  "Great value for the price",
  "Surpassed expectations",
];

const REVIEW_TITLES_4 = [
  "Very good, minor issue",
  "Great overall",
  "Almost perfect",
  "Good quality, slow shipping",
  "Really nice, slightly smaller than expected",
  "Solid purchase",
  "Happy with it",
  "Good but not perfect",
];

const REVIEW_TITLES_3 = [
  "Decent but expected more",
  "It's okay",
  "Average quality",
  "Mixed feelings",
  "Not bad, not great",
];

const BODIES_5 = [
  "I've gone through a lot of towels over the years and these are by far the best. They're incredibly absorbent and stay soft after multiple washes. Already ordered a second set for the guest bathroom.",
  "Bought these after reading the reviews and I'm so glad I did. The quality is immediately noticeable — thick, plush, and they dry quickly. My whole family loves them.",
  "We replaced all our old towels with these and the difference is night and day. They feel like something you'd find at a nice hotel. Washing instructions were easy to follow.",
  "I've had these for about two months now and they still look and feel brand new. No fading, no thinning. The color is exactly as shown. Very impressed with Ottanwa Commerce.",
  "Gifted a set to my mom and she called me twice to say how much she loves them. That says it all. Ordering more for myself now.",
  "The absorbency on these is incredible. I have thick hair and one of these towels actually dries it properly. Haven't found that with other brands.",
  "Quality you can feel the moment you pick them up. Stitched well, no loose threads, and they fluff up beautifully in the dryer. 10/10 would recommend.",
  "Our old towels were scratchy and worn out. These are the complete opposite — soft, substantial, and they actually get softer with each wash. Very happy customer.",
  "I was skeptical about ordering towels online but these delivered. Literally. Fast shipping and the product quality is top notch. Already on my third wash cycle with zero issues.",
  "Perfect weight — not too heavy, not too thin. They hang nicely on the rack and dry between uses without getting that musty smell. Details matter and Ottanwa nailed it.",
];

const BODIES_4 = [
  "Really nice towels overall. Soft and absorbent. Took a little longer to ship than expected but the product itself is great. Would still recommend.",
  "Good quality for the price. They're soft and hold up well in the wash. Only reason for 4 stars instead of 5 is they're slightly smaller than I imagined from the photos.",
  "Very pleased with the purchase. The color is beautiful and they feel luxurious. Lost one star because one towel had a small loose thread, but customer service was responsive.",
  "Solid towels that do the job well. Absorbent and soft. My only note is they shed a little on the first wash, but that's normal for new terry. Much better after the second wash.",
  "Happy with these. Good thickness and they dry fast. Would have given 5 stars if the packaging was a bit nicer for gifting, but the product itself is excellent.",
];

const BODIES_3 = [
  "They're fine. Not bad quality but I expected more given the price point and reviews. They work, but I've had better from other brands at similar price.",
  "Decent towels. Absorbency is okay but not amazing. They look nice in the bathroom. Might improve after a few more washes — we'll see.",
  "Average product. Does what it's supposed to do but nothing special stood out to me. Shipping was quick at least.",
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

function formatDate(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function generateReviewsForProduct(productId: string, productName: string): ProductReview[] {
  const seed = hashString(productId);
  const rand = seededRandom(seed);
  const count = 10 + Math.floor(rand() * 11);

  const reviews: ProductReview[] = [];

  const ratingDistribution: number[] = [];
  for (let i = 0; i < count; i++) {
    const r = rand();
    if (r < 0.62) ratingDistribution.push(5);
    else if (r < 0.85) ratingDistribution.push(4);
    else if (r < 0.95) ratingDistribution.push(3);
    else if (r < 0.98) ratingDistribution.push(2);
    else ratingDistribution.push(1);
  }

  ratingDistribution.sort((a, b) => b - a);

  for (let i = 0; i < count; i++) {
    const rating = ratingDistribution[i];
    const firstName = pick(FIRST_NAMES, rand);
    const lastInitial = LAST_INITIALS[Math.floor(rand() * LAST_INITIALS.length)];

    let title: string;
    let body: string;

    if (rating >= 5) {
      title = pick(REVIEW_TITLES_5, rand);
      body = pick(BODIES_5, rand);
    } else if (rating >= 4) {
      title = pick(REVIEW_TITLES_4, rand);
      body = pick(BODIES_4, rand);
    } else {
      title = pick(REVIEW_TITLES_3, rand);
      body = pick(BODIES_3, rand);
    }

    if (i === 0) {
      body = body.replace("these", productName.split(" ").slice(-2).join(" ").toLowerCase() || "these");
    }

    const daysAgo = Math.floor(rand() * 365) + 1;
    const hasImage = rating >= 4 && rand() > 0.75;

    reviews.push({
      id: `${productId}-review-${i}`,
      productId,
      name: `${firstName} ${lastInitial}.`,
      rating,
      title,
      body,
      date: formatDate(daysAgo),
      verified: rand() > 0.15,
      helpful: Math.floor(rand() * 48),
      image: hasImage ? `/products/review-photo.jpg` : undefined,
    });
  }

  return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getRatingBreakdown(reviews: ProductReview[]): RatingBreakdown {
  const breakdown: RatingBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    const key = r.rating as keyof RatingBreakdown;
    if (key >= 1 && key <= 5) breakdown[key]++;
  });
  return breakdown;
}

export function getAverageRating(reviews: ProductReview[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export function getReviewCount(reviews: ProductReview[]): number {
  return reviews.length;
}
