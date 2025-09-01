"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface PaymentMethod {
  id: string
  name: string
  icon: string
  enabled: boolean
}

export default function PaymentMethodForm() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "card",
      name: "Credit & Debit Cards",
      icon: "💳",
      enabled: true,
    },
    {
      id: "apple-pay",
      name: "Apple Pay",
      icon: "🍎",
      enabled: true,
    },
    {
      id: "google-pay",
      name: "Google Pay",
      icon: "🔍",
      enabled: true,
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: "🅿️",
      enabled: false,
    },
    {
      id: "afterpay",
      name: "Afterpay / Clearpay",
      icon: "🔄",
      enabled: false,
    },
    {
      id: "klarna",
      name: "Klarna",
      icon: "🇸🇪",
      enabled: false,
    },
  ])

  const togglePaymentMethod = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => (method.id === id ? { ...method, enabled: !method.enabled } : method)),
    )
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-magnolia-white">Available Payment Methods</h3>
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="flex items-center justify-between p-4 bg-midnight-blue/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-magnolia-white/10 rounded-lg flex items-center justify-center text-xl">
                {method.icon}
              </div>
              <div>
                <h4 className="font-medium text-magnolia-white">{method.name}</h4>
                <p className="text-sm text-magnolia-white/70">{method.enabled ? "Enabled for checkout" : "Disabled"}</p>
              </div>
            </div>
            <Switch
              checked={method.enabled}
              onCheckedChange={() => togglePaymentMethod(method.id)}
              className="data-[state=checked]:bg-rich-gold"
            />
          </div>
        ))}
      </div>

      <div className="pt-4">
        <Button className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">Save Payment Methods</Button>
      </div>
    </div>
  )
}
