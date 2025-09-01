"use client"

import type React from "react"

import { useState } from "react"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"

interface CheckoutFormProps {
  amount: number
  productName: string
}

export default function CheckoutForm({ amount, productName }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard/payments/success`,
      },
    })

    if (error) {
      setErrorMessage(error.message)
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-midnight-blue/30 p-4 rounded-lg mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-magnolia-white font-lora">{productName}</span>
          <span className="text-magnolia-white font-playfair text-lg">${amount.toFixed(2)}</span>
        </div>
      </div>

      <PaymentElement />

      <div className="flex justify-between items-center">
        <div className="text-sm text-magnolia-white/70">Secure payment powered by Stripe</div>
        <Button
          type="submit"
          disabled={!stripe || isLoading}
          className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue"
        >
          {isLoading ? "Processing..." : "Pay Now"}
        </Button>
      </div>

      {errorMessage && <div className="bg-red-500/20 text-red-400 p-3 rounded-lg text-sm">{errorMessage}</div>}
    </form>
  )
}
