import type { Metadata } from "next"
import CommunityPageClient from "./CommunityPageClient"

export const metadata: Metadata = {
  title: "Community | Midnight Magnolia - Join Our Healing Circle",
  description:
    "Connect with our community of healers, seekers, and gentle souls. Join events, share stories, and find support on your wellness journey.",
}

export default function CommunityPage() {
  return <CommunityPageClient />
}
