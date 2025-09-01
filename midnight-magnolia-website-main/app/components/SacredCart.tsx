"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, Plus, Minus, Trash2, Sparkles, Download, CreditCard } from "lucide-react"
import { useCart } from "@/app/hooks/useCart"

export default function SacredCart() {
  const { state, removeFromCart, updateQuantity, closeCart, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // 🌙 Handle checkout
  const handleCheckout = async () => {
    if (state.items.length === 0) return

    setIsCheckingOut(true)
    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: state.items.map((item) => ({
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                description: `${item.format} format - ${item.description}`,
                images: [item.image],
                metadata: {
                  productId: item.productId,
                  format: item.format,
                  category: item.category,
                  digitalDelivery: item.digitalDelivery || "none",
                },
              },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
          })),
          success_url: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/shop`,
        }),
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error("Checkout error:", error)
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-midnight-blue/80 backdrop-blur-sm z-50"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-magnolia-white shadow-mystical z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-sage-green/20">
              <div>
                <h2 className="font-playfair text-2xl font-bold text-midnight-blue">Sacred Collection</h2>
                <p className="font-lora text-sm text-midnight-blue/70">
                  {state.itemCount} {state.itemCount === 1 ? "offering" : "offerings"} awaiting you
                </p>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-sage-green/10 rounded-full transition-colors duration-200"
                aria-label="Close sacred collection"
              >
                <X size={24} className="text-midnight-blue" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {state.items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🌸</div>
                  <h3 className="font-playfair text-xl text-midnight-blue/80 mb-2">Your collection awaits</h3>
                  <p className="font-lora text-midnight-blue/60 text-sm">
                    Add sacred offerings to begin your healing journey
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-sage-green/5 rounded-2xl p-4 border border-sage-green/10"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                          {item.digitalDelivery === "instant" && (
                            <div className="absolute top-1 right-1 bg-sage-green rounded-full p-1">
                              <Download size={8} className="text-midnight-blue" />
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-playfair font-semibold text-midnight-blue text-sm leading-tight mb-1">
                            {item.name}
                          </h4>
                          <p className="font-montserrat text-xs text-sage-green font-semibold mb-1">
                            {item.format.charAt(0).toUpperCase() + item.format.slice(1)} Format
                          </p>
                          <p className="font-lora text-xs text-midnight-blue/60 mb-2 line-clamp-2">
                            {item.description}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-sage-green/20 rounded-full transition-colors duration-200"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} className="text-midnight-blue" />
                              </button>
                              <span className="font-montserrat text-sm font-semibold text-midnight-blue w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-sage-green/20 rounded-full transition-colors duration-200"
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} className="text-midnight-blue" />
                              </button>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="font-playfair font-bold text-midnight-blue">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-1 hover:bg-red-100 rounded-full transition-colors duration-200"
                                aria-label="Remove from collection"
                              >
                                <Trash2 size={14} className="text-red-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-sage-green/20 p-6 bg-sage-green/5">
                {/* Total */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-lora text-midnight-blue/70">Sacred Total:</span>
                  <span className="font-playfair text-2xl font-bold text-midnight-blue">${state.total.toFixed(2)}</span>
                </div>

                {/* Digital Delivery Notice */}
                {state.items.some((item) => item.digitalDelivery === "instant") && (
                  <div className="flex items-center gap-2 mb-4 p-3 bg-sage-green/10 rounded-lg">
                    <Sparkles size={16} className="text-sage-green flex-shrink-0" />
                    <p className="font-lora text-xs text-midnight-blue/80">
                      Digital offerings will be delivered instantly after purchase
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold 
                             py-4 rounded-2xl transition-all duration-300 hover:shadow-lg disabled:opacity-50 
                             disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isCheckingOut ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-midnight-blue border-t-transparent" />
                        Preparing Sacred Checkout...
                      </>
                    ) : (
                      <>
                        <CreditCard size={18} />
                        Complete Sacred Purchase
                      </>
                    )}
                  </button>

                  <button
                    onClick={clearCart}
                    className="w-full bg-transparent border border-sage-green/30 text-midnight-blue font-montserrat 
                             py-3 rounded-2xl transition-all duration-300 hover:bg-sage-green/10"
                  >
                    Clear Collection
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
