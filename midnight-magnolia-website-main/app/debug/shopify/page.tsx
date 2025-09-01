"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function ShopifyDebugPage() {
  const [testResult, setTestResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/shopify/test-connection")
      const data = await response.json()
      setTestResult(data)
    } catch (error) {
      setTestResult({
        success: false,
        error: "Failed to reach test endpoint",
        details: { message: error.message },
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
            Test your Shopify API credentials with healing energy
          </p>
        </motion.div>

        <div className="bg-magnolia-white/10 backdrop-blur-sm rounded-2xl p-8">
          <button
            onClick={testConnection}
            disabled={loading}
            className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue 
                     font-montserrat font-semibold py-4 px-8 rounded-full 
                     transition-all duration-300 hover:shadow-lg disabled:opacity-50
                     disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-midnight-blue border-t-transparent" />
                Testing Sacred Connection...
              </div>
            ) : (
              "Test Shopify Connection ✨"
            )}
          </button>

          {testResult && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
              <div
                className={`p-6 rounded-xl ${
                  testResult.success
                    ? "bg-sage-green/20 border border-sage-green/30"
                    : "bg-red-500/20 border border-red-500/30"
                }`}
              >
                <h3
                  className={`font-playfair text-xl font-bold mb-4 ${
                    testResult.success ? "text-sage-green" : "text-red-400"
                  }`}
                >
                  {testResult.success ? "✨ Connection Successful!" : "💔 Connection Failed"}
                </h3>

                {!testResult.success && testResult.details?.envDebug && (
                  <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <h4 className="font-montserrat font-semibold text-yellow-400 mb-3">🔍 Environment Variables:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-mono">
                      {Object.entries(testResult.details.envDebug).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-magnolia-white/60">{key}:</span>
                          <span className={value === "Set" ? "text-sage-green" : "text-red-400"}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <pre className="bg-midnight-blue/50 text-magnolia-white p-4 rounded-lg overflow-auto text-sm font-mono max-h-96">
                  {JSON.stringify(testResult, null, 2)}
                </pre>

                {testResult.success && testResult.shop && (
                  <div className="mt-4 p-4 bg-sage-green/10 rounded-lg">
                    <h4 className="font-montserrat font-semibold text-sage-green mb-2">Shop Details:</h4>
                    <p className="text-magnolia-white/80">
                      <strong>Name:</strong> {testResult.shop.name}
                      <br />
                      <strong>Domain:</strong> {testResult.shop.primaryDomain?.url}
                      <br />
                      <strong>Currency:</strong> {testResult.shop.currencyCode}
                    </p>
                  </div>
                )}

                {!testResult.success && (
                  <div className="mt-4 p-4 bg-red-500/10 rounded-lg">
                    <h4 className="font-montserrat font-semibold text-red-400 mb-2">🌿 Healing Guidance:</h4>
                    <div className="text-magnolia-white/80 text-sm space-y-2">
                      {testResult.details?.domain?.includes("2a0839ea") && (
                        <div className="p-3 bg-yellow-500/20 rounded border border-yellow-500/30">
                          <p className="font-semibold text-yellow-400">🚨 Domain Issue Detected:</p>
                          <p>Your domain appears to be a hash instead of your shop name.</p>
                          <p className="mt-2">
                            <strong>Fix:</strong> Set SHOPIFY_STOREFRONT_ADMIN to your actual shop domain:
                          </p>
                          <code className="block mt-1 p-2 bg-midnight-blue/50 rounded text-xs">
                            your-shop-name.myshopify.com
                          </code>
                        </div>
                      )}
                      {testResult.error?.includes("fetch failed") && (
                        <p>🌐 Network issue - check your domain format and internet connection</p>
                      )}
                      {testResult.error?.includes("401") && (
                        <p>🔑 Invalid Storefront Access Token - check your SHOPIFY_ADMIN_API value</p>
                      )}
                      {testResult.error?.includes("404") && (
                        <p>🏪 Shop not found - verify your shop domain is correct</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-8 bg-magnolia-white/5 rounded-2xl p-6">
          <h3 className="font-playfair text-xl font-bold text-magnolia-white mb-4">
            🌿 Correct Environment Variables:
          </h3>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-sage-green/10 rounded border border-sage-green/30">
              <p className="font-mono text-sage-green font-semibold">SHOPIFY_STOREFRONT_ADMIN</p>
              <p className="text-magnolia-white/80 mt-1">
                Your shop domain: <code>your-shop-name.myshopify.com</code>
              </p>
              <p className="text-magnolia-white/60 text-xs mt-1">
                (Replace "your-shop-name" with your actual shop name)
              </p>
            </div>
            <div className="p-3 bg-sage-green/10 rounded border border-sage-green/30">
              <p className="font-mono text-sage-green font-semibold">SHOPIFY_ADMIN_API</p>
              <p className="text-magnolia-white/80 mt-1">
                Your Storefront Access Token: <code>shpat_xxxxxxxxxxxxxxxx</code>
              </p>
              <p className="text-magnolia-white/60 text-xs mt-1">
                (Get this from your Shopify Admin → Apps → Private Apps)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
