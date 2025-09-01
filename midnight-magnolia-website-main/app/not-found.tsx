"use client"

import { motion } from "framer-motion"
import { Home, Search } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center px-6">
      <div className="max-w-lg mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-8">
            <div className="text-8xl font-playfair font-bold text-gold mb-4">404</div>
            <h1 className="font-playfair text-3xl font-bold text-magnolia-white mb-4">Sacred Path Not Found</h1>
            <p className="font-lora text-magnolia-white/80 mb-6">
              The path you seek has been lost to the mystical mists. Perhaps the universe is guiding you toward a
              different sacred journey.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-sage-green hover:bg-sage-green/90 
                       text-midnight-blue font-montserrat font-semibold py-3 px-6 rounded-full 
                       transition-all duration-300 hover:shadow-lg"
            >
              <Home size={20} />
              Return to Sanctuary
            </Link>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-magnolia-white/10 hover:bg-magnolia-white/20 
                         text-magnolia-white font-montserrat font-semibold py-2 px-4 rounded-full 
                         transition-all duration-300 hover:shadow-lg border border-magnolia-white/20"
              >
                <Search size={16} />
                Sacred Shop
              </Link>

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-magnolia-white/10 hover:bg-magnolia-white/20 
                         text-magnolia-white font-montserrat font-semibold py-2 px-4 rounded-full 
                         transition-all duration-300 hover:shadow-lg border border-magnolia-white/20"
              >
                <Search size={16} />
                Sacred Wisdom
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-magnolia-white/10 hover:bg-magnolia-white/20 
                         text-magnolia-white font-montserrat font-semibold py-2 px-4 rounded-full 
                         transition-all duration-300 hover:shadow-lg border border-magnolia-white/20"
              >
                <Search size={16} />
                Our Story
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-12 p-6 bg-magnolia-white/5 rounded-2xl border border-magnolia-white/10"
          >
            <p className="font-lora text-sm text-magnolia-white/60 italic">
              "Not all who wander are lost, but sometimes the path reveals itself only when we return to where we
              started." - Sacred Wisdom
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
