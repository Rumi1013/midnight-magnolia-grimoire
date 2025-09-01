"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingBag, Star } from "lucide-react"

interface SimpleProduct {
  id: number
  name: string
  price: number
  image: string
  description: string
  rating: number
  reviews: number
  isBlessed?: boolean
}

interface SimpleProductGridProps {
  products: SimpleProduct[]
}

export default function SimpleProductGrid({ products }: SimpleProductGridProps) {
  const [favorites, setFavorites] = useState<Set<number>>(new Set())

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

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🌸</div>
        <h3 className="font-playfair text-2xl text-magnolia-white/80 mb-2">No sacred offerings found</h3>
        <p className="font-lora text-magnolia-white/60">The sanctuary is being prepared. Please return soon.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-magnolia-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col"
        >
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />

            {/* Blessed Badge */}
            {product.isBlessed && (
              <div className="absolute top-3 left-3 bg-rich-gold/90 text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-semibold">
                ✨ Blessed
              </div>
            )}

            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(product.id)}
              className="absolute top-3 right-3 p-2 rounded-full bg-magnolia-white/80 hover:bg-magnolia-white transition-all duration-200"
            >
              <Heart
                size={18}
                className={`transition-all duration-200 ${
                  favorites.has(product.id) ? "fill-sage-green text-sage-green" : "text-midnight-blue"
                }`}
              />
            </button>
          </div>

          {/* Product Details */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <Star size={14} className="fill-rich-gold text-rich-gold" />
              <span className="font-montserrat text-sm text-midnight-blue/80">
                {product.rating.toFixed(1)} ({product.reviews})
              </span>
            </div>

            {/* Product Name */}
            <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-2 leading-tight">
              {product.name}
            </h3>

            {/* Description */}
            <p className="font-lora text-midnight-blue/70 text-sm leading-relaxed mb-4 flex-1">{product.description}</p>

            {/* Price and Action */}
            <div className="flex items-center justify-between">
              <span className="font-playfair text-2xl font-bold text-midnight-blue">${product.price}</span>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold text-sm transition-all duration-200">
                <ShoppingBag size={16} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
