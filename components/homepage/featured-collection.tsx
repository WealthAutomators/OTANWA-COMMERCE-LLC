import Image from "next/image";
import Link from "next/link";
import { featuredCollection } from "@/data/homepage";
import { getProductsByCategory } from "@/data/products";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product/product-card";

export function FeaturedCollection() {
  const products = getProductsByCategory(featuredCollection.categorySlug).slice(0, 4);

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="grid gap-6 lg:grid-cols-5">
          <Link
            href={`/categories/${featuredCollection.categorySlug}`}
            className="group relative overflow-hidden rounded-xl border border-border lg:col-span-2"
          >
            <div className="relative aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-[500px]">
              <Image
                src={featuredCollection.bannerImage}
                alt={featuredCollection.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h2 className="text-2xl font-semibold md:text-3xl">{featuredCollection.title}</h2>
                <p className="mt-2 text-sm text-white/80">{featuredCollection.description}</p>
                <span className="mt-4 inline-block text-sm font-medium underline underline-offset-4">
                  Shop Collection →
                </span>
              </div>
            </div>
          </Link>
          <div className="grid grid-cols-2 gap-4 lg:col-span-3 lg:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
