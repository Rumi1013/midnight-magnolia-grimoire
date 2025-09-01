"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, Shield, Eye, EyeOff } from "lucide-react"

export default function SafeTestPage() {
  const [testResults, setTestResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [showSensitive, setShowSensitive] = useState(false)

  const maskSensitiveData = (data: any) => {
    if (!data) return data

    const masked = JSON.parse(JSON.stringify(data))

    // Mask tokens and sensitive fields
    const maskField = (obj: any, key: string) => {
      if (obj[key] && typeof obj[key] === "string") {
        obj[key] = obj[key].substring(0, 4) + "***" + obj[key].substring(obj[key].length - 4)
      }
    }

    const maskObject = (obj: any) => {
      if (typeof obj !== "object" || obj === null) return

      Object.keys(obj).forEach((key) => {
        if (
          key.toLowerCase().includes("token") ||
          key.toLowerCase().includes("key") ||
          key.toLowerCase().includes("secret")
        ) {
          maskField(obj, key)
        } else if (typeof obj[key] === "object") {
          maskObject(obj[key])
        }
      })
    }

    maskObject(masked)
    return masked
  }

  const runSafeTest = async () => {
    setLoading(true)
    setTestResults(null)

    try {
      console.log("🌙 Running safe connection test...")

      // First, validate environment setup
      const envResponse = await fetch("/api/shopify/validate-env")
      const envData = await envResponse.json()

      if (!envData.valid) {
        setTestResults({
          error: true,
          message: `Environment validation failed: ${envData.issues.join(", ")}`,
          timestamp: new Date().toISOString(),
          validation: envData,
        })
        return
      }

      // Test connection with better error handling
      let connectionData
      try {
        const connectionResponse = await fetch("/api/shopify/test-connection")
        connectionData = await connectionResponse.json()
      } catch (connError: any) {
        connectionData = {
          success: false,
          error: connError.message,
          message: "Connection test failed - check domain format",
        }
      }

      // Test products with better error handling
      let productsData
      try {
        const productsResponse = await fetch("/api/shopify/products?limit=3")
        productsData = await productsResponse.json()
      } catch (prodError: any) {
        productsData = {
          success: false,
          error: prodError.message,
          message: "Products test failed - check token format",
        }
      }

      setTestResults({
        connection: connectionData,
        products: productsData,
        timestamp: new Date().toISOString(),
        validation: envData,
      })
    } catch (error: any) {
      console.error("💔 Test failed:", error)
      setTestResults({
        error: true,
        message: `Test failed: ${error.message}`,
        details: error.stack,
        timestamp: new Date().toISOString(),
      })
    } finally {
      setLoading(false)
    }
  }

  const displayData = showSensitive ? testResults : maskSensitiveData(testResults)

  return (
    <div className="min-h-screen bg-midnight-blue pt-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-playfair text-4xl font-bold text-magnolia-white mb-4">🛡️ Safe Connection Test</h1>
          <p className="font-lora text-magnolia-white/80 text-lg">
            Testing your Shopify connection with privacy protection
          </p>
        </motion.div>

        <div className="bg-magnolia-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <button
            onClick={runSafeTest}
            disabled={loading}
            className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue 
                     font-montserrat font-semibold py-4 px-8 rounded-full 
                     transition-all duration-300 hover:shadow-lg disabled:opacity-50
                     disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-midnight-blue border-t-transparent" />
                Testing Sacred Connection...
              </>
            ) : (
              <>
                <Shield size={20} />
                Run Safe Connection Test ✨
              </>
            )}
          </button>
        </div>

        {testResults && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Quick Status */}
            <div className="bg-magnolia-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="font-playfair text-xl font-bold text-magnolia-white mb-4">🌙 Connection Status</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`p-4 rounded-xl flex items-center gap-3 ${
                    testResults.connection?.success
                      ? "bg-sage-green/20 border border-sage-green/30"
                      : "bg-red-500/20 border border-red-500/30"
                  }`}
                >
                  {testResults.connection?.success ? (
                    <CheckCircle size={20} className="text-sage-green" />
                  ) : (
                    <XCircle size={20} className="text-red-400" />
                  )}
                  <div>
                    <p className="font-semibold text-magnolia-white">Shop Connection</p>
                    <p className={`text-sm ${testResults.connection?.success ? "text-sage-green" : "text-red-400"}`}>
                      {testResults.connection?.success ? "Connected ✨" : "Failed 💔"}
                    </p>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-xl flex items-center gap-3 ${
                    testResults.products?.success
                      ? "bg-sage-green/20 border border-sage-green/30"
                      : "bg-red-500/20 border border-red-500/30"
                  }`}
                >
                  {testResults.products?.success ? (
                    <CheckCircle size={20} className="text-sage-green" />
                  ) : (
                    <XCircle size={20} className="text-red-400" />
                  )}
                  <div>
                    <p className="font-semibold text-magnolia-white">Products</p>
                    <p className={`text-sm ${testResults.products?.success ? "text-sage-green" : "text-red-400"}`}>
                      {testResults.products?.success
                        ? `${testResults.products.products?.length || 0} found ✨`
                        : "Failed 💔"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Messages */}
            {(!testResults.connection?.success || !testResults.products?.success) && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-6">
                <h3 className="font-playfair text-xl font-bold text-red-400 mb-4">🔍 Issues Found</h3>

                {!testResults.connection?.success && (
                  <div className="mb-4">
                    <p className="text-magnolia-white font-semibold">Connection Issue:</p>
                    <p className="text-red-300 text-sm">
                      {testResults.connection?.message || testResults.connection?.error}
                    </p>
                  </div>
                )}

                {!testResults.products?.success && (
                  <div>
                    <p className="text-magnolia-white font-semibold">Products Issue:</p>
                    <p className="text-red-300 text-sm">
                      {testResults.products?.message || testResults.products?.error}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Success Message */}
            {testResults.connection?.success && testResults.products?.success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-sage-green/20 border border-sage-green/30 rounded-2xl p-6 text-center"
              >
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="font-playfair text-2xl font-bold text-sage-green mb-2">
                  Sacred Connection Established!
                </h3>
                <p className="font-lora text-magnolia-white/80 mb-6">
                  Your Shopify store is connected and ready to share its offerings.
                </p>
                <a
                  href="/shop"
                  className="inline-block bg-sage-green hover:bg-sage-green/90 text-midnight-blue 
                           font-montserrat font-semibold px-8 py-3 rounded-full 
                           transition-all duration-300 hover:shadow-lg"
                >
                  Visit Your Sacred Shop ✨
                </a>
              </motion.div>
            )}

            {/* Safe Debug Data */}
            <details className="bg-magnolia-white/5 rounded-2xl p-6">
              <summary className="font-playfair text-lg font-bold text-magnolia-white cursor-pointer hover:text-sage-green flex items-center gap-2">
                🔍 Debug Data
                <button
                  onClick={() => setShowSensitive(!showSensitive)}
                  className="ml-2 p-1 rounded hover:bg-magnolia-white/10"
                >
                  {showSensitive ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <span className="text-sm text-magnolia-white/60">
                  ({showSensitive ? "Showing sensitive data" : "Sensitive data masked"})
                </span>
              </summary>
              <pre className="bg-midnight-blue/50 text-magnolia-white p-4 rounded-lg overflow-auto text-xs mt-4 max-h-96">
                {JSON.stringify(displayData, null, 2)}
              </pre>
            </details>
          </motion.div>
        )}

        {/* Troubleshooting Guide */}
        <div className="mt-8 bg-magnolia-white/5 rounded-2xl p-6">
          <h3 className="font-playfair text-xl font-bold text-magnolia-white mb-4">🌿 Common Issues & Solutions:</h3>
          <div className="space-y-3 text-sm">
            <div className="bg-magnolia-white/5 p-3 rounded-lg">
              <p className="text-sage-green font-semibold">❌ "Invalid Storefront Access Token"</p>
              <p className="text-magnolia-white/80">→ Check your token is for Storefront API (not Admin API)</p>
            </div>
            <div className="bg-magnolia-white/5 p-3 rounded-lg">
              <p className="text-sage-green font-semibold">❌ "Shop not found"</p>
              <p className="text-magnolia-white/80">→ Verify domain format: your-shop.myshopify.com</p>
            </div>
            <div className="bg-magnolia-white/5 p-3 rounded-lg">
              <p className="text-sage-green font-semibold">❌ "Access forbidden"</p>
              <p className="text-magnolia-white/80">→ Enable Storefront API permissions in Shopify</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
