"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export default function LogoShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const logos = [
    {
      src: "/images/logo-main.jpg",
      alt: "Midnight Magnolia Primary Logo",
      description: "Primary logo with arch design",
    },
    {
      src: "/images/logo-circular.jpg",
      alt: "Midnight Magnolia Circular Logo",
      description: "Circular emblem with gold leaf border",
    },
    {
      src: "/images/logo-simplified.jpg",
      alt: "Midnight Magnolia Simplified Logo",
      description: "Simplified gold logo on gradient background",
    },
    {
      src: "/images/logo-minimal.jpg",
      alt: "Midnight Magnolia Minimal Logo",
      description: "Minimalist gold and white design",
    },
    {
      src: "/images/logo-book.jpg",
      alt: "Midnight Magnolia Book Logo",
      description: "Magnolia on open book design",
    },
    {
      src: "/images/logo-smoke.jpg",
      alt: "Midnight Magnolia Smoke Logo",
      description: "Circular design with ethereal smoke elements",
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-midnight-blue/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sage-green font-montserrat text-sm tracking-wider uppercase mb-4">Brand Identity</p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-magnolia-white mb-6">Our Visual Language</h2>
          <p className="font-lora text-xl text-magnolia-white/80 max-w-3xl mx-auto leading-relaxed">
            The Midnight Magnolia brand identity blends Southern Gothic elegance with celestial mysticism, creating a
            visual sanctuary for healing and transformation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.src}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-midnight-blue rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="relative w-full aspect-square mb-6 rounded-lg overflow-hidden">
                <Image
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-playfair text-xl font-semibold text-magnolia-white mb-2">{logo.alt}</h3>
              <p className="font-lora text-magnolia-white/70">{logo.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
