"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/app/hooks/useCart"
import { motion, AnimatePresence } from "framer-motion"

export default function CartIcon() {
  const { state, toggleCart } = useCart()

  return (
    <button
      onClick={toggleCart}
      className="relative rounded-full p-2 bg-magnolia-white/10 text-magnolia-white hover:bg-sage-green/20 hover:text-sage-green transition-colors duration-300 group"
      aria-label={`Sacred collection (${state.itemCount} items)`}
    >
      <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />

      {/* Sacred Item Count Badge */}
      <AnimatePresence>
        {state.itemCount > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-1 -right-1 bg-rich-gold text-midnight-blue text-xs font-montserrat font-bold 
                     rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] shadow-lg"
          >
            {state.itemCount > 99 ? "99+" : state.itemCount}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}
