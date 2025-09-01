"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, RefreshCw, Wifi, Package, ShoppingBag } from "lucide-react"

export default function ConnectionTestPage() {
  const [testResults, setTestResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const runFullTest = async () => {
    setLoading(true)
    setTestResults(null)

    try {
      console.log("🌙 Starting sacred connection test...")

      // Test 1: Connection Test
      const connectionResponse = await fetch("/api/shopify/test-connection")
      const connectionData = await connectionResponse.json()

      // Test 2: Products Fetch
      const productsResponse = await fetch("/api/shopify/products?limit=5")
      const productsData = await productsResponse.json()

      setTestResults({
        connection: connectionData,
        products: productsData,
        timestamp: new Date().toISOString(),
      })

      console.log("✨ Test completed:", { connectionData, productsData })
    } catch (error: any) {
      console.error("💔 Test failed:", error)
      setTestResults({
        error: true,
        message: error.message,
        timestamp: new Date().toISOString(),
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-midnight-blue pt-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-playfair text-4xl font-bold text-magnolia-white mb-4">
            🌙 Sacred Shopify Connection Test
          </h1>
          <p className="font-lora text-magnolia-white/80 text-lg">
            Testing your updated domain and access tokens with healing energy
          </p>
        </motion.div>

        <div className="bg-magnolia-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <button
            onClick={runFullTest}
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
                <RefreshCw size={20} />
                Run Full Connection Test ✨
              </>
            )}
          </button>
        </div>

        {testResults && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Connection Test Results */}
            <div className="bg-magnolia-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Wifi size={24} className="text-sage-green" />
                <h3 className="font-playfair text-xl font-bold text-magnolia-white">Connection Test</h3>
                {testResults.connection?.success ? (
                  <CheckCircle size={20} className="text-sage-green" />
                ) : (
                  <XCircle size={20} className="text-red-400" />
                )}
              </div>

              <div
                className={`p-4 rounded-xl ${
                  testResults.connection?.success
                    ? "bg-sage-green/20 border border-sage-green/30"
                    : "bg-red-500/20 border border-red-500/30"
                }`}
              >
                {testResults.connection?.success ? (
                  <div>
                    <p className="text-sage-green font-semibold mb-2">✨ Connection Successful!</p>
                    {testResults.connection.shop && (
                      <div className="text-magnolia-white/80 text-sm space-y-1">
                        <p>
                          <strong>Shop Name:</strong> {testResults.connection.shop.name}
                        </p>
                        <p>
                          <strong>Domain:</strong> {testResults.connection.connection.domain}
                        </p>
                        <p>
                          <strong>Currency:</strong> {testResults.connection.shop.currencyCode}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="text-red-400 font-semibold mb-2">💔 Connection Failed</p>
                    <p className="text-magnolia-white/80 text-sm">
                      {testResults.connection?.message || testResults.connection?.error}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Products Test Results */}
            <div className="bg-magnolia-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Package size={24} className="text-sage-green" />
                <h3 className="font-playfair text-xl font-bold text-magnolia-white">Products Test</h3>
                {testResults.products?.success ? (
                  <CheckCircle size={20} className="text-sage-green" />
                ) : (
                  <XCircle size={20} className="text-red-400" />
                )}
              </div>

              <div
                className={`p-4 rounded-xl ${
                  testResults.products?.success
                    ? "bg-sage-green/20 border border-sage-green/30"
                    : "bg-red-500/20 border border-red-500/30"
                }`}
              >
                {testResults.products?.success ? (
                  <div>
                    <p className="text-sage-green font-semibold mb-3">
                      ✨ Found {testResults.products.products.length} Sacred Products!
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {testResults.products.products.slice(0, 4).map((product: any, index: number) => (
                        <div key={index} className="bg-magnolia-white/10 rounded-lg p-3">
                          <div className="flex items-center gap-3">
                            <ShoppingBag size={16} className="text-sage-green" />
                            <div>
                              <p className="text-magnolia-white font-semibold text-sm">{product.name}</p>
                              <p className="text-sage-green text-sm">${product.price}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {testResults.products.products.length > 4 && (
                      <p className="text-magnolia-white/60 text-sm mt-3">
                        ...and {testResults.products.products.length - 4} more sacred offerings
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="text-red-400 font-semibold mb-2">💔 Products Fetch Failed</p>
                    <p className="text-magnolia-white/80 text-sm">
                      {testResults.products?.message || testResults.products?.error}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Raw Debug Data */}
            <details className="bg-magnolia-white/5 rounded-2xl p-6">
              <summary className="font-playfair text-lg font-bold text-magnolia-white cursor-pointer hover:text-sage-green">
                🔍 Raw Debug Data (Click to expand)
              </summary>
              <pre className="bg-midnight-blue/50 text-magnolia-white p-4 rounded-lg overflow-auto text-xs mt-4 max-h-96">
                {JSON.stringify(testResults, null, 2)}
              </pre>
            </details>

            {/* Success Actions */}
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
                  Your Shopify store is now connected and ready to share its sacred offerings with the world.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="/shop"
                    className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue 
                             font-montserrat font-semibold px-6 py-3 rounded-full 
                             transition-all duration-300 hover:shadow-lg"
                  >
                    Visit Sacred Shop ✨
                  </a>
                  <a
                    href="/"
                    className="bg-magnolia-white/10 hover:bg-magnolia-white/20 text-magnolia-white 
                             font-montserrat font-semibold px-6 py-3 rounded-full 
                             transition-all duration-300 hover:shadow-lg"
                  >
                    Return Home 🌙
                  </a>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-magnolia-white/5 rounded-2xl p-6">
          <h3 className="font-playfair text-xl font-bold text-magnolia-white mb-4">🌿 What This Test Checks:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p className="text-magnolia-white/80">
                <strong className="text-sage-green">Connection Test:</strong>
              </p>
              <ul className="text-magnolia-white/60 space-y-1 ml-4">
                <li>• Domain accessibility</li>
                <li>• Token validity</li>
                <li>• API permissions</li>
                <li>• Cloudflare bypass</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="text-magnolia-white/80">
                <strong className="text-sage-green">Products Test:</strong>
              </p>
              <ul className="text-magnolia-white/60 space-y-1 ml-4">
                <li>• Product data fetch</li>
                <li>• Image URLs</li>
                <li>• Pricing information</li>
                <li>• Database caching</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
