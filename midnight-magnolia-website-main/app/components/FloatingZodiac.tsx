"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const zodiacSigns = [
  { symbol: "♈", name: "Aries", x: 10, y: 15 },
  { symbol: "♉", name: "Taurus", x: 85, y: 25 },
  { symbol: "♊", name: "Gemini", x: 20, y: 60 },
  { symbol: "♋", name: "Cancer", x: 75, y: 70 },
  { symbol: "♌", name: "Leo", x: 5, y: 85 },
  { symbol: "♍", name: "Virgo", x: 90, y: 80 },
  { symbol: "♎", name: "Libra", x: 15, y: 40 },
  { symbol: "♏", name: "Scorpio", x: 80, y: 45 },
  { symbol: "♐", name: "Sagittarius", x: 25, y: 20 },
  { symbol: "♑", name: "Capricorn", x: 70, y: 10 },
  { symbol: "♒", name: "Aquarius", x: 45, y: 75 },
  { symbol: "♓", name: "Pisces", x: 60, y: 35 },
]

function FloatingZodiac() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    function updateSize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("resize", updateSize)
    updateSize()

    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {" "}
      {/* z-index is 0 here, intended to be behind content */}
      {zodiacSigns.map((sign, index) => (
        <motion.div
          key={sign.name}
          className="absolute text-sage-green opacity-30 text-2xl font-playfair pointer-events-none"
          style={{
            left: `${sign.x}%`,
            top: `${sign.y}%`,
          }}
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0],
            rotate: [0, 5, -5, 0],
            opacity: [0.3, 0.5, 0.2, 0.3],
          }}
          transition={{
            duration: 15 + index * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
        >
          {sign.symbol}
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingZodiac
