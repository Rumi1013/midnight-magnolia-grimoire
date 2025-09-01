import type { Metadata } from "next"
import ContentCreationClient from "./ContentCreationClient"

export const metadata: Metadata = {
  title: "Content Creation | Midnight Magnolia Dashboard",
  description: "AI-powered content creation tools for affirmations, tarot descriptions, and journal prompts",
}

export default function ContentCreationPage() {
  return <ContentCreationClient />
}
