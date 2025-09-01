import type { Metadata } from "next"
import ShopifyDashboardClient from "./ShopifyDashboardClient"

export const metadata: Metadata = {
  title: "Shopify Integration | Midnight Magnolia",
  description: "Manage your Shopify physical products alongside digital offerings",
}

export default function ShopifyDashboardPage() {
  return <ShopifyDashboardClient />
}
