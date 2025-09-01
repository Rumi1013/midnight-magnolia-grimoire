"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-20 bg-magnolia-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <p className="bg-sage-green text-magnolia-white font-montserrat text-sm tracking-wider uppercase px-4 py-2 rounded-full inline-block font-bold">
                Our Sacred Mission
              </p>
              <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-midnight-blue leading-tight">
                Healing is not linear,
                <br />
                <span className="text-gold">and that's beautiful</span>
              </h2>
            </div>

            <div className="space-y-6 font-lora text-lg text-gray-800 leading-relaxed">
              <p>
                Founded by <strong className="text-midnight-blue">Latisha Vincent-Waters</strong> under Rumi-Nations
                LLC, Midnight Magnolia is a digital sanctuary where Southern Gothic grace meets ancestral wisdom. We
                create tools for souls seeking transformation through gentle productivity and sacred rituals.
              </p>
              <p>
                Whether you're navigating chronic illness, ADHD, sobriety, or simply seeking a more mindful approach to
                life and business, you belong here. Every ritual, every journal prompt, every gentle reminder is crafted
                with love for the beautifully complex human you are.
              </p>
              <p>
                From our healing journals and tarot decks to our courier services and digital business tools, everything
                we create honors your pace, your story, and your unique journey toward wholeness.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-midnight-blue/5 rounded-2xl">
                <div className="text-3xl mb-2">🌱</div>
                <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-2">Gentle Growth</h3>
                <p className="font-lora text-gray-700 text-sm">Progress at your own sacred pace</p>
              </div>
              <div className="text-center p-6 bg-sage-green/10 rounded-2xl">
                <div className="text-3xl mb-2">🕯️</div>
                <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-2">Sacred Rituals</h3>
                <p className="font-lora text-gray-700 text-sm">Daily practices for inner peace</p>
              </div>
            </div>
          </motion.div>

          {/* Right content - Values grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              {
                icon: "🌙",
                title: "Trauma-Informed",
                description: "Every tool designed with gentleness and understanding for your healing journey.",
              },
              {
                icon: "🌸",
                title: "Ancestral Wisdom",
                description: "Honoring the strength and knowledge passed down through generations of resilient women.",
              },
              {
                icon: "✨",
                title: "Neurodivergent Friendly",
                description: "Celebrating different minds with tools that work with your brain, not against it.",
              },
              {
                icon: "🕊️",
                title: "Inclusive Sanctuary",
                description: "A safe space for all identities, especially Black women and marginalized voices.",
              },
              {
                icon: "🔮",
                title: "Digital Innovation",
                description: "Blending ancient wisdom with modern technology for accessible healing tools.",
              },
              {
                icon: "🚗",
                title: "Community Support",
                description: "From digital products to local courier services, we support your whole life.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-warm-gray/20 hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-3xl flex-shrink-0">{value.icon}</div>
                <div>
                  <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-2">{value.title}</h3>
                  <p className="font-lora text-gray-700 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
