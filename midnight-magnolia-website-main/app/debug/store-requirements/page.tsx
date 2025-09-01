"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  ShoppingCart,
  CreditCard,
  Database,
  Mail,
  BarChart3,
  Cloud,
  Webhook,
  Truck,
  Calculator,
  Search,
  Star,
} from "lucide-react"

interface Integration {
  name: string
  required: boolean
  status: "configured" | "partial" | "not_configured"
  description: string
  variables: string[]
}

interface StoreRequirements {
  integrations: Record<string, Integration>
  summary: {
    totalIntegrations: number
    requiredIntegrations: number
    configuredRequired: number
    configuredOptional: number
    readinessScore: number
    canLaunch: boolean
  }
  recommendations: Array<{
    priority: "high" | "medium" | "low"
    title: string
    description: string
    action: string
  }>
}

const integrationIcons: Record<string, any> = {
  shopify: ShoppingCart,
  stripe: CreditCard,
  database: Database,
  auth: Database,
  email: Mail,
  analytics: BarChart3,
  storage: Cloud,
  webhooks: Webhook,
  shipping: Truck,
  tax: Calculator,
  search: Search,
  reviews: Star,
}

export default function StoreRequirementsPage() {
  const [requirements, setRequirements] = useState<StoreRequirements | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchRequirements = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/integrations/store-requirements")
      const data = await response.json()
      setRequirements(data)
    } catch (error) {
      console.error("Failed to fetch requirements:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequirements()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "configured":
        return "text-sage-green"
      case "partial":
        return "text-yellow-600"
      default:
        return "text-red-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "configured":
        return CheckCircle
      case "partial":
        return AlertCircle
      default:
        return XCircle
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-200 bg-red-50"
      case "medium":
        return "border-yellow-200 bg-yellow-50"
      default:
        return "border-blue-200 bg-blue-50"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-blue pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-sage-green border-t-transparent mx-auto mb-4" />
          <p className="text-magnolia-white font-lora">Analyzing sacred store requirements...</p>
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
              🛍️ Sacred Store Requirements
            </h1>
            <p className="font-lora text-xl text-magnolia-white/80 mb-6">
              Complete integration analysis for your e-commerce sanctuary
            </p>
            <button
              onClick={fetchRequirements}
              className="flex items-center gap-2 mx-auto px-6 py-3 bg-sage-green text-midnight-blue 
                       font-montserrat font-semibold rounded-full hover:bg-sage-green/90 transition-all duration-200"
            >
              <RefreshCw size={18} />
              Refresh Analysis
            </button>
          </div>

          {requirements && (
            <div className="space-y-8">
              {/* Overall Status */}
              <div className="bg-magnolia-white rounded-2xl p-8">
                <h2 className="font-playfair text-2xl font-bold text-midnight-blue mb-6">🌙 Store Readiness</h2>

                <div className="grid md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-sage-green mb-2">
                      {requirements.summary.readinessScore}%
                    </div>
                    <p className="font-lora text-midnight-blue/70">Overall Ready</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-midnight-blue mb-2">
                      {requirements.summary.configuredRequired}/{requirements.summary.requiredIntegrations}
                    </div>
                    <p className="font-lora text-midnight-blue/70">Required Complete</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-rich-gold mb-2">
                      {requirements.summary.configuredOptional}
                    </div>
                    <p className="font-lora text-midnight-blue/70">Optional Added</p>
                  </div>
                  <div className="text-center">
                    <div
                      className={`text-3xl font-bold mb-2 ${requirements.summary.canLaunch ? "text-sage-green" : "text-red-500"}`}
                    >
                      {requirements.summary.canLaunch ? "✅" : "❌"}
                    </div>
                    <p className="font-lora text-midnight-blue/70">Can Launch</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div
                    className="bg-sage-green h-3 rounded-full transition-all duration-500"
                    style={{ width: `${requirements.summary.readinessScore}%` }}
                  />
                </div>

                <p className="font-lora text-midnight-blue/70 text-center">
                  {requirements.summary.canLaunch
                    ? "🎉 Your store is ready to launch! Optional integrations can be added later."
                    : "⚠️ Complete required integrations before launching your store."}
                </p>
              </div>

              {/* Integration Status Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(requirements.integrations).map(([key, integration]) => {
                  const IconComponent = integrationIcons[key] || ShoppingCart
                  const StatusIcon = getStatusIcon(integration.status)

                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-magnolia-white rounded-xl p-6 border-2 border-transparent hover:border-sage-green/30 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <IconComponent className="text-midnight-blue" size={24} />
                          <div>
                            <h3 className="font-montserrat font-semibold text-midnight-blue">{integration.name}</h3>
                            {integration.required && (
                              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Required</span>
                            )}
                          </div>
                        </div>
                        <StatusIcon className={getStatusColor(integration.status)} size={20} />
                      </div>

                      <p className="font-lora text-sm text-midnight-blue/70 mb-4">{integration.description}</p>

                      <div className="space-y-2">
                        <p className="font-montserrat text-xs font-semibold text-midnight-blue/60">
                          Environment Variables:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {integration.variables.map((variable) => (
                            <span
                              key={variable}
                              className="text-xs bg-sage-green/10 text-sage-green px-2 py-1 rounded font-mono"
                            >
                              {variable}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Recommendations */}
              <div className="bg-magnolia-white rounded-2xl p-8">
                <h2 className="font-playfair text-2xl font-bold text-midnight-blue mb-6">🌸 Sacred Recommendations</h2>
                <div className="space-y-4">
                  {requirements.recommendations.map((rec, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${getPriorityColor(rec.priority)}`}>
                      <div className="flex items-start gap-3">
                        <div
                          className={`px-2 py-1 rounded text-xs font-montserrat font-bold ${
                            rec.priority === "high"
                              ? "bg-red-200 text-red-800"
                              : rec.priority === "medium"
                                ? "bg-yellow-200 text-yellow-800"
                                : "bg-blue-200 text-blue-800"
                          }`}
                        >
                          {rec.priority.toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-montserrat font-semibold text-midnight-blue mb-1">{rec.title}</h3>
                          <p className="font-lora text-midnight-blue/70 text-sm mb-2">{rec.description}</p>
                          <p className="font-lora text-midnight-blue text-sm font-medium">💡 {rec.action}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Setup Guide */}
              <div className="bg-magnolia-white rounded-2xl p-8">
                <h2 className="font-playfair text-2xl font-bold text-midnight-blue mb-6">⚡ Quick Setup Priority</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-montserrat font-semibold text-midnight-blue mb-4 flex items-center gap-2">
                      🔥 Must Have (Launch Blockers)
                    </h3>
                    <ul className="space-y-2">
                      <li className="font-lora text-midnight-blue/80 flex items-center gap-2">
                        <ShoppingCart size={16} className="text-sage-green" />
                        Shopify Products Integration
                      </li>
                      <li className="font-lora text-midnight-blue/80 flex items-center gap-2">
                        <CreditCard size={16} className="text-sage-green" />
                        Stripe Payment Processing
                      </li>
                      <li className="font-lora text-midnight-blue/80 flex items-center gap-2">
                        <Database size={16} className="text-sage-green" />
                        Database Connection (✅ Done)
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-midnight-blue mb-4 flex items-center gap-2">
                      ✨ Nice to Have (Enhance Later)
                    </h3>
                    <ul className="space-y-2">
                      <li className="font-lora text-midnight-blue/80 flex items-center gap-2">
                        <Mail size={16} className="text-rich-gold" />
                        Email Notifications
                      </li>
                      <li className="font-lora text-midnight-blue/80 flex items-center gap-2">
                        <Webhook size={16} className="text-rich-gold" />
                        Real-time Webhooks
                      </li>
                      <li className="font-lora text-midnight-blue/80 flex items-center gap-2">
                        <BarChart3 size={16} className="text-rich-gold" />
                        Analytics & Tracking
                      </li>
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
