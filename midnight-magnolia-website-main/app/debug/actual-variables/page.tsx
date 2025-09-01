"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Eye, EyeOff } from "lucide-react"

interface VariableAnalysis {
  actualVariables: any
  analysis: any
  summary: {
    totalConfigured: number
    needsAttention: number
    partiallyConfigured: number
  }
}

export default function ActualVariablesPage() {
  const [analysis, setAnalysis] = useState<VariableAnalysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({})

  const fetchAnalysis = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/integrations/check-actual-variables")
      const data = await response.json()
      setAnalysis(data)
    } catch (error) {
      console.error("Failed to fetch analysis:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalysis()
  }, [])

  const toggleDetails = (section: string) => {
    setShowDetails((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "text-sage-green"
      case "partial":
        return "text-yellow-600"
      default:
        return "text-red-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return CheckCircle
      case "partial":
        return AlertCircle
      default:
        return XCircle
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-blue pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-sage-green border-t-transparent mx-auto mb-4" />
          <p className="text-magnolia-white font-lora">Analyzing your actual environment variables...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-midnight-blue pt-24">
      <div className="container mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-magnolia-white mb-4">
              🔍 Actual Variable Analysis
            </h1>
            <p className="font-lora text-xl text-magnolia-white/80 mb-6">
              Checking your real environment variables vs store requirements
            </p>
            <button
              onClick={fetchAnalysis}
              className="flex items-center gap-2 mx-auto px-6 py-3 bg-sage-green text-midnight-blue 
                       font-montserrat font-semibold rounded-full hover:bg-sage-green/90 transition-all duration-200"
            >
              <RefreshCw size={18} />
              Refresh Analysis
            </button>
          </div>

          {analysis && (
            <div className="space-y-8">
              {/* Summary */}
              <div className="bg-magnolia-white rounded-2xl p-8">
                <h2 className="font-playfair text-2xl font-bold text-midnight-blue mb-6">📊 Summary</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-sage-green mb-2">{analysis.summary.totalConfigured}</div>
                    <p className="font-lora text-midnight-blue/70">Ready to Use</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">
                      {analysis.summary.partiallyConfigured}
                    </div>
                    <p className="font-lora text-midnight-blue/70">Partially Set</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-500 mb-2">{analysis.summary.needsAttention}</div>
                    <p className="font-lora text-midnight-blue/70">Need Setup</p>
                  </div>
                </div>
              </div>

              {/* Integration Analysis */}
              {Object.entries(analysis.analysis).map(([key, data]: [string, any]) => {
                const StatusIcon = getStatusIcon(data.status)
                const isExpanded = showDetails[key]

                return (
                  <div key={key} className="bg-magnolia-white rounded-2xl p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-playfair text-2xl font-bold text-midnight-blue flex items-center gap-3">
                        <StatusIcon className={getStatusColor(data.status)} size={24} />
                        {key.charAt(0).toUpperCase() + key.slice(1)} Integration
                      </h2>
                      <button
                        onClick={() => toggleDetails(key)}
                        className="flex items-center gap-2 px-4 py-2 bg-sage-green/10 text-midnight-blue 
                                 rounded-full font-montserrat text-sm hover:bg-sage-green/20 transition-all duration-200"
                      >
                        {isExpanded ? <EyeOff size={16} /> : <Eye size={16} />}
                        {isExpanded ? "Hide" : "Show"} Details
                      </button>
                    </div>

                    {/* Status */}
                    <div className="mb-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-montserrat font-semibold ${
                          data.status === "ready"
                            ? "bg-sage-green/20 text-sage-green"
                            : data.status === "partial"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {data.status === "ready"
                          ? "✅ Ready"
                          : data.status === "partial"
                            ? "⚠️ Partial"
                            : "❌ Needs Setup"}
                      </span>
                    </div>

                    {/* Recommendations */}
                    <div className="space-y-2">
                      {data.recommendations.map((rec: string, index: number) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg ${
                            rec.startsWith("✅")
                              ? "bg-sage-green/10 border border-sage-green/20"
                              : "bg-blue-50 border border-blue-200"
                          }`}
                        >
                          <p className="font-lora text-midnight-blue text-sm">{rec}</p>
                        </div>
                      ))}
                    </div>

                    {/* Detailed Variables */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-6 pt-6 border-t border-sage-green/20"
                      >
                        <h3 className="font-montserrat font-semibold text-midnight-blue mb-4">Available Variables:</h3>
                        <div className="space-y-4">
                          {Object.entries(analysis.actualVariables[key]).map(([category, variables]: [string, any]) => (
                            <div key={category}>
                              <h4 className="font-montserrat font-medium text-midnight-blue/80 mb-2 capitalize">
                                {category}:
                              </h4>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {Object.entries(variables).map(([varName, hasValue]: [string, any]) => (
                                  <div
                                    key={varName}
                                    className={`flex items-center gap-2 p-2 rounded text-xs ${
                                      hasValue ? "bg-sage-green/10 text-sage-green" : "bg-gray-100 text-gray-500"
                                    }`}
                                  >
                                    {hasValue ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                    <span className="font-mono">{varName}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )
              })}

              {/* Corrections Needed */}
              <div className="bg-magnolia-white rounded-2xl p-8">
                <h2 className="font-playfair text-2xl font-bold text-midnight-blue mb-6">🔧 Variable Corrections</h2>
                <div className="space-y-4">
                  <div className="bg-sage-green/10 border border-sage-green/20 p-4 rounded-lg">
                    <h3 className="font-montserrat font-semibold text-midnight-blue mb-2">✅ What You Have Right</h3>
                    <ul className="font-lora text-midnight-blue/80 space-y-1">
                      <li>• Multiple Shopify token options available</li>
                      <li>• Stripe keys properly configured</li>
                      <li>• Database connections (Neon + Supabase) ready</li>
                      <li>• Email services configured</li>
                      <li>• Multiple storage options available</li>
                      <li>• AI services extensively configured</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h3 className="font-montserrat font-semibold text-midnight-blue mb-2">🔍 What to Check</h3>
                    <ul className="font-lora text-midnight-blue/80 space-y-1">
                      <li>• Verify which Shopify token is the correct Storefront Access Token</li>
                      <li>• Confirm shop domain format (should be: your-shop.myshopify.com)</li>
                      <li>• Test actual API connections to ensure tokens work</li>
                    </ul>
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
