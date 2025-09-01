"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { RefreshCw, Home, AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("🌙 Sacred sanctuary error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center px-6">
      <div className="max-w-md mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-8">
            <AlertTriangle className="w-16 h-16 text-gold mx-auto mb-4" />
            <h1 className="font-playfair text-3xl font-bold text-magnolia-white mb-4">Sacred Sanctuary Disrupted</h1>
            <p className="font-lora text-magnolia-white/80 mb-6">
              The healing energies have encountered an unexpected disturbance. Let us restore the sacred balance
              together.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={reset}
              className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue 
                       font-montserrat font-semibold py-3 px-6 rounded-full 
                       transition-all duration-300 hover:shadow-lg
                       flex items-center justify-center gap-2"
            >
              <RefreshCw size={20} />
              Restore Sacred Energy
            </button>

            <a
              href="/"
              className="w-full bg-magnolia-white/10 hover:bg-magnolia-white/20 text-magnolia-white 
                       font-montserrat font-semibold py-3 px-6 rounded-full 
                       transition-all duration-300 hover:shadow-lg
                       flex items-center justify-center gap-2 border border-magnolia-white/20"
            >
              <Home size={20} />
              Return to Sanctuary
            </a>
          </div>

          {process.env.NODE_ENV === "development" && (
            <details className="mt-8 text-left">
              <summary className="cursor-pointer text-warm-gray hover:text-magnolia-white">
                🔍 Developer Details
              </summary>
              <pre className="mt-4 p-4 bg-midnight-blue/50 rounded-lg text-xs text-red-300 overflow-auto">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
        </motion.div>
      </div>
    </div>
  )
}
