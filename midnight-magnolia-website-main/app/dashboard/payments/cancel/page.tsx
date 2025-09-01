import Link from "next/link"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
      <div className="bg-midnight-teal p-8 rounded-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <h1 className="font-playfair text-3xl font-bold text-magnolia-white mb-4">Payment Cancelled</h1>
        <p className="font-lora text-magnolia-white/80 mb-6">
          Your payment process was cancelled. No charges have been made to your account. If you have any questions or
          need assistance, please contact our support team.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/dashboard/payments/checkout" passHref>
            <Button className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue w-full">Try Again</Button>
          </Link>
          <Link href="/dashboard" passHref>
            <Button
              variant="outline"
              className="bg-transparent border-magnolia-white/20 text-magnolia-white hover:bg-magnolia-white/10 w-full"
            >
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
