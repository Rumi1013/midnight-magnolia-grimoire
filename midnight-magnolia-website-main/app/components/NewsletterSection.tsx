"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"

export default function NewsletterSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
    setEmail("")
  }

  return (
    <section ref={ref} className="py-20 bg-midnight-blue relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 border border-sage-green/30 rounded-full" />
        <div className="absolute bottom-20 right-20 w-60 h-60 border border-gold/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-magnolia-white/10 rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="text-6xl mb-6">🌙</div>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-magnolia-white mb-6">
              Receive More Healing Words
            </h2>
            <p className="font-lora text-xl text-magnolia-white/80 leading-relaxed max-w-2xl mx-auto">
              Join our sacred circle for gentle reminders, new moon rituals, and exclusive access to healing tools. No
              overwhelm, just love.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mb-12"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your sacred email"
                required
                className="flex-1 px-6 py-4 rounded-full bg-magnolia-white/10 border border-magnolia-white/20 text-magnolia-white placeholder-magnolia-white/60 font-lora focus:outline-none focus:border-gold focus:bg-magnolia-white/20 transition-all duration-300 min-h-[44px]"
              />
              <button
                type="submit"
                disabled={isSubmitted}
                className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 min-h-[44px] disabled:opacity-50"
              >
                {isSubmitted ? "Welcome! 🌸" : "Join the Garden"}
              </button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-8 text-center"
          >
            {[
              {
                icon: "🌱",
                title: "Weekly Wisdom",
                description: "Gentle guidance delivered every Sunday",
              },
              {
                icon: "🌙",
                title: "New Moon Rituals",
                description: "Sacred practices for each lunar cycle",
              },
              {
                icon: "✨",
                title: "Exclusive Access",
                description: "First to know about new healing tools",
              },
            ].map((benefit, index) => (
              <div key={index} className="space-y-4">
                <div className="text-4xl">{benefit.icon}</div>
                <h3 className="font-playfair text-xl font-semibold text-magnolia-white">{benefit.title}</h3>
                <p className="font-lora text-magnolia-white/70">{benefit.description}</p>
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-magnolia-white/60 font-lora text-sm mt-8"
          >
            Your email is sacred to us. Unsubscribe anytime with love. 💕
          </motion.p>
        </div>
      </div>
    </section>
  )
}
