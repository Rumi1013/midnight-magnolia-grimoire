"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Download, Mail, Sparkles } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      // In a real implementation, you'd fetch order details from your API
      // For now, we'll simulate this
      setTimeout(() => {
        setOrderDetails({
          id: "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
          total: 47.0,
          items: [
            {
              name: "The Magnolia Reset 90-Day Journal",
              format: "Print",
              price: 47.0,
              digitalDelivery: false,
            },
          ],
          email: "customer@example.com",
        })
        setLoading(false)
      }, 1500)
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-sage-green border-t-transparent mx-auto mb-4"></div>
          <p className="font-lora text-magnolia-white/80">Processing your sacred purchase...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-midnight-blue py-20">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-sage-green rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={40} className="text-midnight-blue" />
            </div>
            <div className="flex items-center justify-center gap-2 text-sage-green">
              <Sparkles size={16} />
              <span className="font-montserrat text-sm font-semibold">Sacred Purchase Complete</span>
              <Sparkles size={16} />
            </div>
          </div>

          {/* Thank You Message */}
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-magnolia-white mb-6">
            Thank You, Beautiful Soul
          </h1>
          <p className="font-lora text-xl text-magnolia-white/80 mb-8 leading-relaxed">
            Your sacred offerings are being prepared with love and intention. May they serve your healing journey with
            grace.
          </p>

          {/* Order Details */}
          {orderDetails && (
            <div className="bg-magnolia-white rounded-3xl p-8 mb-8 text-left">
              <h2 className="font-playfair text-2xl font-bold text-midnight-blue mb-6 text-center">
                Order Confirmation
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-2 border-b border-sage-green/20">
                  <span className="font-lora text-midnight-blue/70">Order ID:</span>
                  <span className="font-montserrat font-semibold text-midnight-blue">{orderDetails.id}</span>
                </div>

                {orderDetails.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-start py-3 border-b border-sage-green/10">
                    <div className="flex-1">
                      <h4 className="font-playfair font-semibold text-midnight-blue">{item.name}</h4>
                      <p className="font-montserrat text-sm text-sage-green">{item.format} Format</p>
                      {item.digitalDelivery && (
                        <div className="flex items-center gap-1 mt-1">
                          <Download size={12} className="text-sage-green" />
                          <span className="font-lora text-xs text-sage-green">Digital delivery</span>
                        </div>
                      )}
                    </div>
                    <span className="font-playfair font-bold text-midnight-blue">${item.price.toFixed(2)}</span>
                  </div>
                ))}

                <div className="flex justify-between items-center pt-4 border-t border-sage-green/30">
                  <span className="font-playfair text-lg font-bold text-midnight-blue">Sacred Total:</span>
                  <span className="font-playfair text-2xl font-bold text-midnight-blue">
                    ${orderDetails.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Digital Delivery Notice */}
              {orderDetails.items.some((item: any) => item.digitalDelivery) && (
                <div className="bg-sage-green/10 rounded-2xl p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Download size={18} className="text-sage-green" />
                    <span className="font-montserrat font-semibold text-midnight-blue">Instant Access</span>
                  </div>
                  <p className="font-lora text-sm text-midnight-blue/80">
                    Your digital offerings have been sent to your email and are ready for download.
                  </p>
                </div>
              )}

              {/* Email Confirmation */}
              <div className="bg-sage-green/5 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={18} className="text-sage-green" />
                  <span className="font-montserrat font-semibold text-midnight-blue">Confirmation Sent</span>
                </div>
                <p className="font-lora text-sm text-midnight-blue/80">
                  A detailed confirmation has been sent to your email with all purchase details and access instructions.
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold 
                       px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-lg"
            >
              Continue Sacred Shopping
            </Link>
            <Link
              href="/dashboard"
              className="bg-transparent border border-sage-green text-sage-green hover:bg-sage-green/10 
                       font-montserrat font-semibold px-8 py-4 rounded-2xl transition-all duration-300"
            >
              View Your Account
            </Link>
          </div>

          {/* Blessing */}
          <div className="mt-12 p-6 bg-sage-green/5 rounded-2xl border border-sage-green/20">
            <p className="font-lora text-magnolia-white/90 italic leading-relaxed">
              "May these sacred tools guide you toward healing, growth, and the gentle transformation your soul seeks.
              You are worthy of all the love and care you're giving yourself."
            </p>
            <p className="font-playfair text-sage-green mt-4">— With love, Midnight Magnolia ✨</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
