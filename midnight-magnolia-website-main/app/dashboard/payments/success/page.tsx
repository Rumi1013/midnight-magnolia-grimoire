import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
      <div className="bg-midnight-teal p-8 rounded-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <h1 className="font-playfair text-3xl font-bold text-magnolia-white mb-4">Payment Successful</h1>
        <p className="font-lora text-magnolia-white/80 mb-6">
          Thank you for your purchase! Your payment has been processed successfully. You will receive a confirmation
          email shortly.
        </p>
        <div className="bg-midnight-blue/50 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-magnolia-white/70">Order ID</span>
            <span className="text-magnolia-white font-mono">ord_1234567890</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-magnolia-white/70">Date</span>
            <span className="text-magnolia-white">June 8, 2023</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-magnolia-white/70">Amount</span>
            <span className="text-magnolia-white font-semibold">$29.99</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Link href="/dashboard/payments" passHref>
            <Button className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue w-full">
              Return to Dashboard
            </Button>
          </Link>
          <Link href="/dashboard" passHref>
            <Button
              variant="outline"
              className="bg-transparent border-magnolia-white/20 text-magnolia-white hover:bg-magnolia-white/10 w-full"
            >
              View Order Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
