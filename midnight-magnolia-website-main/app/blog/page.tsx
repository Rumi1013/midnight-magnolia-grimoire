import type { Metadata } from "next"
import BlogPageClient from "./BlogPageClient"

export const metadata: Metadata = {
  title: "Midnight Musings | Midnight Magnolia - Healing Wisdom & Stories",
  description:
    "Explore our collection of trauma-informed articles, ancestral wisdom, and gentle healing practices for your wellness journey.",
}

export default function BlogPage() {
  return <BlogPageClient />
}
