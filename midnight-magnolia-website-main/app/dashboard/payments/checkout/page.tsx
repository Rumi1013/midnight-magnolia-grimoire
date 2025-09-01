"use client"

import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
// In production, use environment variables
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Create a payment intent on the server and get the client secret
    // This is a mock implementation - in production, you would call your API
    setTimeout(() => {
      // Mock client secret - in production, this would come from your server
      setClientSecret("pi_3NjK8d2eZvKYlo2C9u7HH2Bq_secret_abcdefghijklmnopqrstuvwxyz")
      setIsLoading(false)
    }, 1500)
  }, [])

  const appearance = {
    theme: "night",
    variables: {
      colorPrimary: "#D4AF37",
      colorBackground: "#0A192F",
      colorText: "#FAF3E0",
      colorDanger: "#ef4444",
      fontFamily: "Lora, serif",
      borderRadius: "8px",
    },
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rich-gold"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
        <div className="bg-red-500/20 text-red-400 p-6 rounded-lg max-w-md">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-midnight-blue">
      <div className="max-w-2xl mx-auto pt-20 px-4">
        <div className="mb-8 text-center">
          <h1 className="font-playfair text-3xl font-bold text-magnolia-white mb-2">Complete Your Purchase</h1>
          <p className="font-lora text-magnolia-white/80">Secure checkout powered by Stripe</p>
        </div>

        <div className="bg-midnight-teal p-8 rounded-lg">
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance: appearance as any }}>
              <CheckoutForm amount={29.99} productName="The Magnolia Reset Journal" />
            </Elements>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-magnolia-white/70">
            By completing this purchase, you agree to our{" "}
            <a href="#" className="text-rich-gold hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-rich-gold hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
