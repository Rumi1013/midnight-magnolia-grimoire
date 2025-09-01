"use client"

import { useState, useEffect } from "react"
import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/24/outline"

interface Integration {
  name: string
  connected: boolean
  status: "active" | "needs_reconnection" | "error"
  lastSync?: string
  error?: string
}

export default function IntegrationStatus() {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchIntegrationStatus()
  }, [])

  const fetchIntegrationStatus = async () => {
    try {
      const response = await fetch("/api/integrations")
      const data = await response.json()

      if (data.success) {
        const integrationList = Object.entries(data.integrations).map(([key, value]: [string, any]) => ({
          name: key.charAt(0).toUpperCase() + key.slice(1),
          connected: value.connected,
          status: value.status,
          lastSync: value.lastSync,
          error: value.error,
        }))
        setIntegrations(integrationList)
      }
    } catch (error) {
      console.error("Failed to fetch integration status:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleReconnect = async (platform: string) => {
    try {
      const response = await fetch("/api/integrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform: platform.toLowerCase(), action: "reconnect" }),
      })

      const data = await response.json()
      if (data.success) {
        fetchIntegrationStatus() // Refresh status
      }
    } catch (error) {
      console.error("Failed to reconnect:", error)
    }
  }

  const getStatusIcon = (status: string, connected: boolean) => {
    if (!connected || status === "error") {
      return <XCircleIcon className="w-5 h-5 text-red-400" />
    }
    if (status === "needs_reconnection") {
      return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400" />
    }
    return <CheckCircleIcon className="w-5 h-5 text-green-400" />
  }

  const getStatusColor = (status: string, connected: boolean) => {
    if (!connected || status === "error") return "text-red-400"
    if (status === "needs_reconnection") return "text-yellow-400"
    return "text-green-400"
  }

  if (loading) {
    return (
      <div className="bg-midnight-teal p-6 rounded-lg">
        <div className="animate-pulse">
          <div className="h-6 bg-magnolia-white/10 rounded mb-4"></div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-magnolia-white/10 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-midnight-teal p-6 rounded-lg">
      <h2 className="font-playfair text-xl font-bold text-rich-gold mb-6">Platform Integrations</h2>
      <div className="grid grid-cols-4 gap-6">
        {integrations.map((integration) => (
          <div key={integration.name} className="text-center">
            <div className="w-12 h-12 bg-magnolia-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-magnolia-white font-bold">{integration.name.charAt(0)}</span>
            </div>
            <h3 className="font-montserrat text-sm font-semibold text-magnolia-white mb-2">
              {integration.name === "Makecom" ? "Make.com" : integration.name}
            </h3>
            <div className="flex items-center justify-center gap-2 mb-2">
              {getStatusIcon(integration.status, integration.connected)}
              <span className={`text-xs ${getStatusColor(integration.status, integration.connected)}`}>
                {integration.connected && integration.status === "active"
                  ? "Connected"
                  : integration.status === "needs_reconnection"
                    ? "Reconnect"
                    : "Disconnected"}
              </span>
            </div>
            {integration.status === "needs_reconnection" && (
              <button
                onClick={() => handleReconnect(integration.name)}
                className="text-xs bg-rich-gold text-midnight-blue px-2 py-1 rounded hover:bg-rich-gold/90 transition-colors"
              >
                Reconnect
              </button>
            )}
            {integration.error && <p className="text-xs text-red-400 mt-1">{integration.error}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
