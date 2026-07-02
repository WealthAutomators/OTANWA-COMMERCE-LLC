import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const colors = {
  primary: "#1B4332",
  accent: "#C9A227",
  light: "#F5F5F0",
  gray: "#E5E5E5",
  white: "#FFFFFF",
};

function createSvg(width, height, bg, label, sublabel = "", textColor = colors.primary) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${bg}"/>
  <rect x="20" y="20" width="${width - 40}" height="${height - 40}" fill="none" stroke="${textColor}" stroke-width="1" opacity="0.15" rx="8"/>
  <text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}" font-family="system-ui, sans-serif" font-size="${Math.min(width, height) * 0.06}" font-weight="600">${label}</text>
  ${sublabel ? `<text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}" font-family="system-ui, sans-serif" font-size="${Math.min(width, height) * 0.035}" opacity="0.6">${sublabel}</text>` : ""}
</svg>`;
}

function createLogo() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="48" viewBox="0 0 180 48">
  <rect width="180" height="48" fill="transparent"/>
  <circle cx="24" cy="24" r="18" fill="${colors.primary}"/>
  <text x="24" y="24" dominant-baseline="middle" text-anchor="middle" fill="${colors.white}" font-family="Georgia, serif" font-size="16" font-weight="700">O</text>
  <text x="52" y="20" fill="${colors.primary}" font-family="Georgia, serif" font-size="14" font-weight="700">Ottanwa</text>
  <text x="52" y="36" fill="${colors.accent}" font-family="system-ui, sans-serif" font-size="10" letter-spacing="2">COMMERCE</text>
</svg>`;
}

function createPaymentIcon(name, color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="32" viewBox="0 0 48 32">
  <rect width="48" height="32" rx="4" fill="${colors.light}" stroke="${colors.gray}" stroke-width="1"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${color}" font-family="system-ui, sans-serif" font-size="8" font-weight="700">${name}</text>
</svg>`;
}

const root = path.join(__dirname, "..", "public");

fs.mkdirSync(path.join(root, "logo"), { recursive: true });
fs.writeFileSync(path.join(root, "logo", "logo.svg"), createLogo());

const heroItems = [
  { name: "hero-1.svg", label: "Premium Towels", sub: "For Every Home", bg: colors.light },
  { name: "hero-2.svg", label: "Beach Collection", sub: "Summer 2026", bg: "#E8F0EC" },
  { name: "hero-3.svg", label: "Spa Bathrobes", sub: "Luxury Comfort", bg: "#F0EDE5" },
];
fs.mkdirSync(path.join(root, "hero"), { recursive: true });
heroItems.forEach((item) => {
  fs.writeFileSync(path.join(root, "hero", item.name), createSvg(1400, 600, item.bg, item.label, item.sub));
});

const bannerItems = [
  { name: "promo-1.svg", label: "Bathroom Essentials", sub: "Up to 30% Off", bg: colors.light },
  { name: "about.svg", label: "Our Craft", sub: "Quality & Comfort", bg: "#E8F0EC" },
  { name: "featured.svg", label: "Signature Collection", sub: "Customer Favorites", bg: colors.primary, textColor: colors.white },
];
fs.mkdirSync(path.join(root, "banners"), { recursive: true });
bannerItems.forEach((item) => {
  fs.writeFileSync(
    path.join(root, "banners", item.name),
    createSvg(800, 600, item.bg, item.label, item.sub, item.textColor || colors.primary)
  );
});

const categoryItems = [
  "Bath Towels", "Beach Towels", "Bathrobes", "Cleaning", "Face Towels", "Accessories",
].map((label, i) => ({
  name: ["bath-towels", "beach-towels", "bathrobes", "cleaning-towels", "face-towels", "accessories"][i] + ".svg",
  label,
}));
fs.mkdirSync(path.join(root, "categories"), { recursive: true });
categoryItems.forEach((item) => {
  fs.writeFileSync(path.join(root, "categories", item.name), createSvg(200, 200, colors.light, item.label));
});

fs.mkdirSync(path.join(root, "instagram"), { recursive: true });
for (let i = 1; i <= 6; i++) {
  fs.writeFileSync(path.join(root, "instagram", `${i}.svg`), createSvg(400, 400, colors.light, `Instagram ${i}`));
}

const payments = [
  { name: "visa.svg", label: "VISA", color: "#1A1F71" },
  { name: "mastercard.svg", label: "MC", color: "#EB001B" },
  { name: "amex.svg", label: "AMEX", color: "#006FCF" },
  { name: "paypal.svg", label: "PayPal", color: "#003087" },
  { name: "apple-pay.svg", label: "Pay", color: "#000000" },
];
fs.mkdirSync(path.join(root, "payments"), { recursive: true });
payments.forEach((p) => fs.writeFileSync(path.join(root, "payments", p.name), createPaymentIcon(p.label, p.color)));

const productsFile = fs.readFileSync(path.join(__dirname, "..", "data", "products.ts"), "utf8");
const slugMatches = [...productsFile.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
const productColors = ["#E8F0EC", "#F0EDE5", "#E5E8E5", "#EDE8E0", "#E0E8ED", "#F5F0E8"];

fs.mkdirSync(path.join(root, "products"), { recursive: true });
slugMatches.forEach((slug, i) => {
  const label = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  for (let j = 1; j <= 2; j++) {
    fs.writeFileSync(
      path.join(root, "products", `${slug}-${j}.svg`),
      createSvg(600, 750, productColors[i % productColors.length], label, `View ${j}`)
    );
  }
});

console.log("Generated placeholder SVGs");
