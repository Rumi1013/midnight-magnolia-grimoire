"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { RefreshCw, CheckCircle, XCircle, AlertCircle, Copy, Eye, EyeOff } from "lucide-react"

interface TokenAnalysis {
  variable: string
  hasValue: boolean
  valueLength: number
  preview: string | null
  type: string
}

interface TestResult {
  domain: string
  token: string
  success: boolean
  status?: number
  data?: any
  errors?: any
  error?: string
}

interface TokenVerificationResponse {
  success: boolean
  tokenAnalysis: TokenAnalysis[]
  testResults: TestResult[]
  recommendations: Array<{
    type: string
    message: string
  }>
  currentConfig: {
    primaryDomain: string
    primaryToken: string
    hasWorkingConnection: boolean
  }
  instructions: {
    storefrontToken: {
      description: string
      howToGenerate: string[]
    }
    domain: {
      description: string
      format: string
      variable: string
    }
  }
}

export default function TokenDebugPage() {
  const [verification, setVerification] = useState<TokenVerificationResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [showTokens, setShowTokens] = useState(false)

  const fetchVerification = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/shopify/verify-tokens")
      const data = await response.json()
      setVerification(data)
    } catch (error) {
      console.error("Failed to verify tokens:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVerification()
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-blue pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-sage-green border-t-transparent mx-auto mb-4" />
          <p className="text-magnolia-white font-lora">Verifying sacred tokens...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-midnight-blue pt-24">
      <div className="container mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-magnolia-white mb-4">
              🌙 Sacred Token Verification
            </h1>
            <p className="font-lora text-xl text-magnolia-white/80 mb-6">
              Diagnose and update your Shopify API tokens for seamless product connection
            </p>
            <button
              onClick={fetchVerification}
              className="flex items-center gap-2 mx-auto px-6 py-3 bg-sage-green text-midnight-blue 
                       font-montserrat font-semibold rounded-full hover:bg-sage-green/90 transition-all duration-200"
            >
              <RefreshCw size={18} />
              Refresh Verification
            </button>
          </div>

          {verification && (
            <div className="space-y-8">
              {/* Current Status */}
              <div className="bg-magnolia-white rounded-2xl p-8">
                <h2 className="font-playfair text-2xl font-bold text-midnight-blue mb-6 flex items-center gap-3">
                  {verification.currentConfig.hasWorkingConnection ? (
                    <CheckCircle className="text-sage-green" size={24} />
                  ) : (
                    <XCircle className="text-red-500" size={24} />
                  )}
                  Connection Status
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-montserrat font-semibold text-midnight-blue mb-2">Primary Domain</h3>
                    <p className="font-lora text-midnight-blue/70 bg-sage-green/10 px-4 py-2 rounded-lg">
                      {verification.currentConfig.primaryDomain}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-midnight-blue mb-2">Primary Token</h3>
                    <p className="font-lora text-midnight-blue/70 bg-sage-green/10 px-4 py-2 rounded-lg">
                      {verification.currentConfig.primaryToken}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-magnolia-white rounded-2xl p-8">
                <h2 className="font-playfair text-2xl font-bold text-midnight-blue mb-6">🌸 Sacred Recommendations</h2>
                <div className="space-y-4">
                  {verification.recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg flex items-start gap-3 ${
                        rec.type === "success"
                          ? "bg-sage-green/10 border border-sage-green/20"
                          : rec.type === "error"
                            ? "bg-red-50 border border-red-200"
                            : "bg-yellow-50 border border-yellow-200"
                      }`}
                    >
                      {rec.type === "success" && <CheckCircle className="text-sage-green mt-0.5" size={20} />}
                      {rec.type === "error" && <XCircle className="text-red-500 mt-0.5" size={20} />}
                      {rec.type === "warning" && <AlertCircle className="text-yellow-600 mt-0.5" size={20} />}
                      <p className="font-lora text-midnight-blue">{rec.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Token Analysis */}
              <div className="bg-magnolia-white rounded-2xl p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-playfair text-2xl font-bold text-midnight-blue">🔑 Token Analysis</h2>
                  <button
                    onClick={() => setShowTokens(!showTokens)}
                    className="flex items-center gap-2 px-4 py-2 bg-sage-green/10 text-midnight-blue 
                             rounded-full font-montserrat text-sm hover:bg-sage-green/20 transition-all duration-200"
                  >
                    {showTokens ? <EyeOff size={16} /> : <Eye size={16} />}
                    {showTokens ? "Hide" : "Show"} Token Previews
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-sage-green/20">
                        <th className="text-left font-montserrat font-semibold text-midnight-blue py-3">Variable</th>
                        <th className="text-left font-montserrat font-semibold text-midnight-blue py-3">Type</th>
                        <th className="text-left font-montserrat font-semibold text-midnight-blue py-3">Status</th>
                        <th className="text-left font-montserrat font-semibold text-midnight-blue py-3">Length</th>
                        {showTokens && (
                          <th className="text-left font-montserrat font-semibold text-midnight-blue py-3">Preview</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {verification.tokenAnalysis.map((token, index) => (
                        <tr key={index} className="border-b border-sage-green/10">
                          <td className="font-lora text-midnight-blue py-3 font-mono text-sm">{token.variable}</td>
                          <td className="font-lora text-midnight-blue py-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-montserrat ${
                                token.type === "storefront"
                                  ? "bg-sage-green/20 text-sage-green"
                                  : token.type === "admin"
                                    ? "bg-rich-gold/20 text-rich-gold"
                                    : token.type === "domain"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {token.type}
                            </span>
                          </td>
                          <td className="font-lora text-midnight-blue py-3">
                            {token.hasValue ? (
                              <CheckCircle className="text-sage-green" size={16} />
                            ) : (
                              <XCircle className="text-red-500" size={16} />
                            )}
                          </td>
                          <td className="font-lora text-midnight-blue py-3">{token.valueLength}</td>
                          {showTokens && (
                            <td className="font-lora text-midnight-blue py-3">
                              {token.preview && (
                                <div className="flex items-center gap-2">
                                  <code className="bg-sage-green/10 px-2 py-1 rounded text-xs">{token.preview}</code>
                                  <button
                                    onClick={() => copyToClipboard(token.preview || "")}
                                    className="text-sage-green hover:text-sage-green/70"
                                  >
                                    <Copy size={14} />
                                  </button>
                                </div>
                              )}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Test Results */}
              {verification.testResults.length > 0 && (
                <div className="bg-magnolia-white rounded-2xl p-8">
                  <h2 className="font-playfair text-2xl font-bold text-midnight-blue mb-6">🧪 Connection Tests</h2>
                  <div className="space-y-4">
                    {verification.testResults.map((test, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          test.success ? "bg-sage-green/10 border-sage-green/20" : "bg-red-50 border-red-200"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          {test.success ? (
                            <CheckCircle className="text-sage-green" size={20} />
                          ) : (
                            <XCircle className="text-red-500" size={20} />
                          )}
                          <div>
                            <p className="font-montserrat font-semibold text-midnight-blue">{test.domain}</p>
                            <p className="font-lora text-sm text-midnight-blue/70">Token: {test.token}</p>
                          </div>
                        </div>
                        {test.success && test.data?.data?.shop && (
                          <div className="mt-3 p-3 bg-sage-green/5 rounded">
                            <p className="font-lora text-midnight-blue">
                              ✨ Connected to: <strong>{test.data.data.shop.name}</strong>
                            </p>
                          </div>
                        )}
                        {!test.success && (
                          <div className="mt-3 p-3 bg-red-50 rounded">
                            <p className="font-lora text-red-700 text-sm">Error: {test.error || "Connection failed"}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="bg-magnolia-white rounded-2xl p-8">
                <h2 className="font-playfair text-2xl font-bold text-midnight-blue mb-6">📋 Setup Instructions</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-montserrat font-semibold text-midnight-blue mb-3 flex items-center gap-2">
                      🔑 Storefront Access Token
                    </h3>
                    <p className="font-lora text-midnight-blue/70 mb-4">
                      {verification.instructions.storefrontToken.description}
                    </p>
                    <ol className="space-y-2">
                      {verification.instructions.storefrontToken.howToGenerate.map((step, index) => (
                        <li key={index} className="font-lora text-sm text-midnight-blue/80">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-montserrat font-semibold text-midnight-blue mb-3 flex items-center gap-2">
                      🏪 Shop Domain
                    </h3>
                    <p className="font-lora text-midnight-blue/70 mb-4">
                      {verification.instructions.domain.description}
                    </p>
                    <div className="space-y-2">
                      <p className="font-lora text-sm text-midnight-blue/80">
                        <strong>Format:</strong> {verification.instructions.domain.format}
                      </p>
                      <p className="font-lora text-sm text-midnight-blue/80">
                        <strong>Variable:</strong> {verification.instructions.domain.variable}
                      </p>
                      <div className="bg-sage-green/10 p-3 rounded">
                        <p className="font-lora text-sm text-midnight-blue">
                          💡 <strong>Tip:</strong> Don't include https:// in your domain
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  )
}
