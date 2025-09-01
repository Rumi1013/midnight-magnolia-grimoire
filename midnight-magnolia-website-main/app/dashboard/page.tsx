import type { Metadata } from "next"
import DashboardClient from "./DashboardClient"

export const metadata: Metadata = {
  title: "Content Dashboard | Midnight Magnolia",
  description: "AI-powered content creation and automation management dashboard for Midnight Magnolia",
}

export default function DashboardPage() {
  return <DashboardClient />
}
