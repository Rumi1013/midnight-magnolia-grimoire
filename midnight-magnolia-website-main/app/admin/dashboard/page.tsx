import type { Metadata } from "next"
import AdminDashboardClient from "./AdminDashboardClient"

export const metadata: Metadata = {
  title: "Sacred Admin Dashboard | Midnight Magnolia",
  description: "Administrative dashboard for managing products, orders, and sacred offerings",
}

export default function AdminDashboardPage() {
  return <AdminDashboardClient />
}
