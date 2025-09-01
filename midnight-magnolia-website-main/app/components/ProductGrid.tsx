"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ShoppingBag, Star } from "lucide-react"

// 🌙 Sacred product interface
interface SacredProduct {
  id: number
  name: string
  price: number
  image: string
  category: "All" | "Journals" | "Art" | "Candles"
  description: string
  rating: number
  reviews: number
  isBlessed?: boolean // ✨ Special products
}

interface ProductGridProps {
  products: SacredProduct[]
  className?: string
}

// 🌿 Gentle filter categories
const SACRED_CATEGORIES = [
  { key: "All", label: "All Offerings", icon: "🌙" },
  { key: "Journals", label: "Sacred Journals", icon: "📖" },
  { key: "Art", label: "Digital Art", icon: "🎨" },
  { key: "Candles", label: "Candle Magic", icon: "🕯️" },
] as const

export default function ProductGrid({ products, className = "" }: ProductGridProps) {
  // 🌸 Gentle state management
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [visibleCount, setVisibleCount] = useState(8)
  const [favorites, setFavorites] = useState<Set<number>>(new Set())

  // 🌿 Filter products with intention
  const filteredProducts = products.filter((product) => activeCategory === "All" || product.category === activeCategory)

  const visibleProducts = filteredProducts.slice(0, visibleCount)
  const hasMoreProducts = visibleCount < filteredProducts.length

  // 💝 Toggle favorite with gentle animation
  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  // 🌙 Load more with sacred patience
  const loadMoreOfferings = () => {
    setVisibleCount((prev) => Math.min(prev + 8, filteredProducts.length))
  }

  return (
    <section className={`py-16 ${className}`} aria-label="Sacred product offerings">
      {/* 🌸 Gentle category filters */}
      <div className="mb-12">
        <nav role="tablist" aria-label="Product categories">
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {SACRED_CATEGORIES.map((category) => (
              <li key={category.key} role="none">
                <button
                  role="tab"
                  aria-selected={activeCategory === category.key}
                  aria-controls="product-grid"
                  onClick={() => {
                    setActiveCategory(category.key)
                    setVisibleCount(8) // Reset count when filtering
                  }}
                  className={`
                    group relative px-6 py-3 rounded-full font-lora text-sm sm:text-base
                    transition-all duration-300 ease-in-out
                    ${
                      activeCategory === category.key
                        ? "bg-sage-green text-midnight-blue shadow-lg"
                        : "bg-magnolia-white/10 text-magnolia-white hover:bg-sage-green/20 hover:text-magnolia-white"
                    }
                  `}
                >
                  <span className="mr-2" aria-hidden="true">
                    {category.icon}
                  </span>
                  {category.label}

                  {/* 🌙 Gentle selection indicator */}
                  {activeCategory === category.key && (
                    <motion.div
                      layoutId="category-indicator"
                      className="absolute inset-0 bg-sage-green rounded-full -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* 🌿 Sacred product grid */}
      <div id="product-grid" role="region" aria-live="polite">
        <motion.ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" layout>
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product) => (
              <motion.li
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group"
              >
                <article
                  className="
                  bg-magnolia-white rounded-2xl overflow-hidden shadow-sm
                  hover:shadow-mystical hover:border-sage-green/30
                  border border-transparent transition-all duration-300
                  h-full flex flex-col
                "
                >
                  {/* 🌸 Product image with gentle hover */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={`${product.name} - Sacred offering`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* 🌙 Blessed indicator */}
                    {product.isBlessed && (
                      <div className="absolute top-3 left-3 bg-rich-gold/90 text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-semibold">
                        ✨ Blessed
                      </div>
                    )}

                    {/* 💝 Favorite button */}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      aria-label={`${favorites.has(product.id) ? "Remove from" : "Add to"} favorites`}
                      className="
                        absolute top-3 right-3 p-2 rounded-full
                        bg-magnolia-white/80 hover:bg-magnolia-white
                        transition-all duration-200 group/heart
                      "
                    >
                      <Heart
                        size={18}
                        className={`
                          transition-all duration-200
                          ${
                            favorites.has(product.id)
                              ? "fill-sage-green text-sage-green"
                              : "text-midnight-blue group-hover/heart:text-sage-green"
                          }
                        `}
                      />
                    </button>
                  </div>

                  {/* 🌿 Product details */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* ⭐ Rating with gentle stars */}
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={14} className="fill-rich-gold text-rich-gold" />
                      <span className="font-montserrat text-sm text-midnight-blue/80">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* 🌸 Product name */}
                    <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-2 leading-tight">
                      {product.name}
                    </h3>

                    {/* 🌿 Description */}
                    <p className="font-lora text-midnight-blue/70 text-sm leading-relaxed mb-4 flex-1">
                      {product.description}
                    </p>

                    {/* 🌙 Price and action */}
                    <div className="flex items-center justify-between">
                      <span className="font-playfair text-2xl font-bold text-midnight-blue">${product.price}</span>

                      <button
                        aria-label={`Add ${product.name} to cart`}
                        className="
                          flex items-center gap-2 px-4 py-2 rounded-full
                          bg-sage-green hover:bg-sage-green/90 text-midnight-blue
                          font-montserrat font-semibold text-sm
                          transition-all duration-200 hover:shadow-md
                          focus:outline-none focus:ring-2 focus:ring-rich-gold focus:ring-offset-2
                        "
                      >
                        <ShoppingBag size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {/* 🌸 Load more with sacred patience */}
        {hasMoreProducts && (
          <div className="text-center mt-12">
            <motion.button
              onClick={loadMoreOfferings}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="
                px-8 py-4 rounded-full border-2 border-sage-green
                text-sage-green hover:bg-sage-green hover:text-midnight-blue
                font-lora font-semibold transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-rich-gold focus:ring-offset-2
              "
            >
              Reveal More Sacred Offerings
            </motion.button>
          </div>
        )}

        {/* 🌙 Gentle empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🌸</div>
            <h3 className="font-playfair text-2xl text-magnolia-white/80 mb-2">No offerings found</h3>
            <p className="font-lora text-magnolia-white/60">Try exploring a different category, beautiful soul.</p>
          </div>
        )}
      </div>
    </section>
  )
}
