"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export default function ShopSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const shopCategories = [
    {
      title: "Healing Journals & Planners",
      description: "Physical and digital journals designed for gentle productivity and healing",
      items: [
        "The Magnolia Reset - 90-Day Healing Journal (Print & Digital)",
        "Sacred Productivity - ADHD-Friendly Planner",
        "Grounding Sobriety - Recovery Companion",
        "Repeat Rituals Tracker - Daily Practice Guide",
        "Moon Phase Journal - Lunar Cycle Tracking",
        "Spoon Theory Planner - Energy Management",
      ],
      icon: "📖",
      logo: "/images/logo-book.jpg",
      kdp: true,
      comingSoon: true,
    },
    {
      title: "Kindle Direct Publishing",
      description: "Physical books and journals available through Amazon KDP",
      items: [
        "The Magnolia Reset - Paperback Edition",
        "Southern Gothic Healing - Poetry Collection",
        "Ancestral Wisdom Workbook - Print Edition",
        "ADHD Entrepreneur's Guide - Paperback",
        "Midnight Meditations - Guided Practice Book",
        "Tarot for Healing - Beginner's Guide",
      ],
      icon: "📚",
      logo: "/images/logo-main.jpg",
      kdp: true,
      comingSoon: true,
    },
    {
      title: "Tarot & Divination",
      description: "Beautiful cards featuring Black icons with Southern Gothic elegance",
      items: [
        "Midnight Messages - 78-Card Tarot Deck",
        "Ancestor Wisdom Oracle Cards",
        "Moon Phase Guidance Cards",
        "Digital Tarot Guidebook",
        "Print-on-Demand Tarot Sets",
      ],
      icon: "🔮",
      logo: "/images/logo-circular.jpg",
      comingSoon: true,
    },
    {
      title: "Business & Automation",
      description: "Tools for building your digital empire with gentle structure",
      items: [
        "Digital Entrepreneur's Starter Kit",
        "Brand Identity Workbook",
        "Notion Dashboard Templates",
        "Passive Income Strategy Guide",
        "KDP Publishing Masterclass",
      ],
      icon: "💼",
      logo: "/images/logo-minimal.jpg",
      comingSoon: true,
    },
    {
      title: "Art & Merchandise",
      description: "Southern Gothic inspired artwork and physical products",
      items: [
        "Digital Art Prints Collection",
        "Midnight Menagerie Pet Accessories",
        "Magnolia Apparel Line",
        "Sacred Space Decor",
        "Print-on-Demand Art Series",
      ],
      icon: "🎨",
      logo: "/images/logo-smoke.jpg",
      comingSoon: true,
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-midnight-blue">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sage-green font-montserrat text-sm tracking-wider uppercase mb-4">Sacred Marketplace</p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-magnolia-white mb-6">Your Digital Altar</h2>
          <p className="font-lora text-xl text-magnolia-white/80 max-w-3xl mx-auto leading-relaxed">
            Carefully curated tools and treasures to support your healing journey. Each product is designed with love,
            intention, and deep respect for your unique path.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {shopCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-magnolia-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group relative overflow-hidden"
            >
              {/* Coming Soon Banner */}
              {category.comingSoon && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-gold to-sage-green text-midnight-blue font-montserrat font-bold text-xs px-6 py-2 transform rotate-12 shadow-lg z-10">
                  COMING SOON
                </div>
              )}

              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={category.logo || "/placeholder.svg"}
                    alt={`${category.title} Logo`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-playfair text-2xl font-bold text-midnight-blue">{category.title}</h3>
                  <div className="flex items-center gap-2">
                    <div className="text-4xl">{category.icon}</div>
                    {category.kdp && (
                      <span className="bg-gold text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-semibold">
                        KDP Available
                      </span>
                    )}
                    {category.comingSoon && (
                      <span className="bg-warm-gray text-gray-700 px-2 py-1 rounded-full text-xs font-montserrat font-semibold">
                        In Development
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="font-lora text-gray-800 leading-relaxed mb-6">{category.description}</p>

              <ul className="space-y-3 mb-8">
                {category.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 font-lora text-gray-700">
                    <div className="w-2 h-2 bg-sage-green rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full font-montserrat font-semibold px-6 py-3 rounded-full transition-all duration-300 min-h-[44px] ${
                  category.comingSoon
                    ? "bg-warm-gray text-gray-600 cursor-not-allowed"
                    : "bg-sage-green hover:bg-sage-green/90 text-midnight-blue hover:shadow-lg"
                }`}
                disabled={category.comingSoon}
              >
                {category.comingSoon ? "Coming Soon" : `Explore ${category.title}`}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
