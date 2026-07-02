"use client";

import Image from "next/image";
import Link from "next/link";
import { Camera, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { instagramPosts } from "@/data/homepage";
import { company } from "@/data/company";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export function InstagramGallery() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeading title="Follow Us on Instagram" centered subtitle={`@${company.name.toLowerCase().replace(/\s/g, "")}`} />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="group relative aspect-square overflow-hidden rounded-lg border border-border"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Image src={post.image} alt={post.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="200px" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                <Camera className="h-6 w-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link href={company.social.instagram}>
              <Share2 className="h-4 w-4" />
              Follow on Instagram
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
