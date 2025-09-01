import type { Metadata } from "next"
import JusticePageClient from "./JusticePageClient"

export const metadata: Metadata = {
  title: "Justice & Healing | Midnight Magnolia - Resources for Systemic Change",
  description:
    "Access resources for parole, pardon, expungement, and healing from systemic trauma. Supporting justice and restoration through education and advocacy.",
}

export default function JusticePage() {
  return <JusticePageClient />
}
