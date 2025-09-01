"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function ProductsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const featuredProducts = [
    {
      title: "The Magnolia Reset",
      subtitle: "90-Day Healing Journal",
      description:
        "A gentle companion for your sobriety and healing journey, with daily prompts that honor your pace and celebrate your progress.",
      price: "$47",
      digitalPrice: "$29",
      image: "📖",
      category: "Healing Journals",
      features: ["Daily affirmations", "Sobriety tracker", "Gentle accountability", "Progress celebration"],
      available: ["Digital Download", "KDP Paperback", "Hardcover Edition"],
      comingSoon: true,
    },
    {
      title: "Midnight Messages",
      subtitle: "Tarot & Affirmation Deck",
      description:
        "78 beautiful cards featuring Black icons with Southern Gothic elegance, ancestral wisdom, and empowering affirmations.",
      price: "$33",
      digitalPrice: "$19",
      image: "🔮",
      category: "Tarot & Divination",
      features: ["78 unique cards", "Digital guidebook", "Monthly spreads", "Ancestor wisdom"],
      available: ["Digital Deck", "Print-on-Demand", "Deluxe Physical Set"],
      comingSoon: true,
    },
    {
      title: "Sacred Productivity",
      subtitle: "ADHD-Friendly Planner",
      description:
        "Planning tools that work with your neurodivergent brain, not against it. Gentle structure for chaotic minds with spoon theory integration.",
      price: "$29",
      digitalPrice: "$19",
      image: "📝",
      category: "Digital Planners",
      features: ["Flexible templates", "Energy tracking", "Spoon theory integration", "Executive function support"],
      available: ["Digital Templates", "Printable PDF", "KDP Spiral Bound"],
      comingSoon: true,
    },
  ]

  return (
    <section ref={ref} id="products" className="py-20 bg-midnight-blue">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sage-green font-montserrat text-sm tracking-wider uppercase mb-4">
            Sacred Tools for Transformation
          </p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-magnolia-white mb-6">Featured Products</h2>
          <p className="font-lora text-xl text-magnolia-white/80 max-w-3xl mx-auto leading-relaxed">
            Carefully crafted tools to support your healing journey. Each product is designed with love, intention, and
            deep respect for your unique path.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-[#F5EDD6] rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group h-full flex flex-col relative overflow-hidden"
            >
              {/* Coming Soon Banner */}
              {product.comingSoon && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-gold to-sage-green text-midnight-blue font-montserrat font-bold text-xs px-6 py-2 transform rotate-12 shadow-lg z-10">
                  COMING SOON
                </div>
              )}

              <div className="text-center mb-6">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {product.image}
                </div>
                <div className="bg-midnight-blue text-magnolia-white font-montserrat text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full inline-block mb-3">
                  {product.category}
                </div>
                <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-2">{product.title}</h3>
                <p className="font-montserrat text-midnight-blue font-semibold text-sm tracking-wide uppercase">
                  {product.subtitle}
                </p>
              </div>

              <p className="font-lora text-gray-800 leading-relaxed mb-6 flex-grow">{product.description}</p>

              <div className="mb-6">
                <h4 className="font-montserrat text-sm font-semibold text-midnight-blue mb-3">Available Formats:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.available.map((format, idx) => (
                    <span
                      key={idx}
                      className="bg-midnight-blue text-magnolia-white px-3 py-1 rounded-full text-xs font-montserrat font-semibold"
                    >
                      {format}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="space-y-2 mb-8">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 font-lora text-gray-700 text-sm">
                    <div className="w-2 h-2 bg-sage-green rounded-full flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="space-y-4 mt-auto">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gold font-playfair text-2xl font-bold">{product.digitalPrice}</div>
                    <div className="text-gray-600 font-lora text-sm">Digital</div>
                  </div>
                  <div>
                    <div className="text-midnight-blue font-playfair text-2xl font-bold">{product.price}</div>
                    <div className="text-gray-600 font-lora text-sm">Print</div>
                  </div>
                </div>
                <button
                  className={`w-full font-montserrat font-semibold px-6 py-3 rounded-full transition-all duration-300 min-h-[44px] ${
                    product.comingSoon
                      ? "bg-warm-gray text-gray-600 cursor-not-allowed"
                      : "bg-sage-green hover:bg-sage-green/90 text-midnight-blue hover:shadow-lg"
                  }`}
                  disabled={product.comingSoon}
                >
                  {product.comingSoon ? "Coming Soon" : "Add to Altar"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <button className="border-2 border-sage-green hover:bg-sage-green text-sage-green hover:text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300 min-h-[44px]">
            Explore All Sacred Tools
          </button>
        </motion.div>
      </div>
    </section>
  )
}
