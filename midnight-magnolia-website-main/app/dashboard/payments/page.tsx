import type { Metadata } from "next"
import PaymentsClient from "./PaymentsClient"

export const metadata: Metadata = {
  title: "Payment Management | Midnight Magnolia",
  description: "Manage payments, subscriptions, and transactions for your digital products",
}

export default function PaymentsPage() {
  return <PaymentsClient />
}
