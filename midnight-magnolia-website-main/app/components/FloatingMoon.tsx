"use client"

import { motion } from "framer-motion"

function FloatingMoon() {
  return (
    <motion.div
      className="fixed top-20 right-8 z-50 text-4xl cursor-pointer" // Increased z-index to 50
      animate={{
        rotate: [0, 360],
        y: [-5, 5, -5],
      }}
      transition={{
        rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
        y: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
      }}
      whileHover={{ scale: 1.2 }}
      title="Your guiding moon"
    >
      🌙
    </motion.div>
  )
}

export default FloatingMoon
