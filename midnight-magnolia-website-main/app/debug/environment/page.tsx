"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, Database, RefreshCw } from "lucide-react"

interface DatabaseStatus {
  neon: { connected: boolean; error: string | null; tables: string[] }
  supabase: { connected: boolean; error: string | null; info: string | null }
  shopify: { tablesExist: boolean; productCount: number }
}

interface EnvironmentStatus {
  databases: DatabaseStatus
  environment: {
    hasNeonUrl: boolean
    hasSupabaseUrl: boolean
    hasSupabaseKey: boolean
    nodeEnv: string
  }
}

export default function EnvironmentDebugPage() {
  const [status, setStatus] = useState<EnvironmentStatus | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/database/status")
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      console.error("Failed to fetch status:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-blue pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-sage-green border-t-transparent mx-auto mb-4" />
          <p className="text-magnolia-white font-lora">Checking sacred connections...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-midnight-blue pt-24">
      <div className="container mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-magnolia-white mb-4">
              🌙 Environment Status
            </h1>
            <p className="font-lora text-xl text-magnolia-white/80 mb-6">Your existing database and API connections</p>
            <button
              onClick={fetchStatus}
              className="flex items-center gap-2 mx-auto px-6 py-3 bg-sage-green text-midnight-blue 
                       font-montserrat font-semibold rounded-full hover:bg-sage-green/90 transition-all duration-200"
            >
              <RefreshCw size={18} />
              Refresh Status
            </button>
          </div>

          {status && (
            <div className="space-y-8">
              {/* Neon Database */}
              <div className="bg-magnolia-white rounded-2xl p-8">
                <h2 className="font-playfair text-2xl font-bold text-midnight-blue mb-6 flex items-center gap-3">
                  <Database
                    className={status.databases.neon.connected ? "text-sage-green" : "text-red-500"}
                    size={24}
                  />
                  Neon Database
                  {status.databases.neon.connected ? (
                    <CheckCircle className="text-sage-green" size={20} />
                  ) : (
                    <XCircle className="text-red-500" size={20} />
                  )}
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-montserrat font-semibold text-midnight-blue mb-2">Connection Status</h3>
                    <p className={`font-lora ${status.databases.neon.connected ? "text-sage-green" : "text-red-600"}`}>
                      {status.databases.neon.connected ? "✅ Connected" : "❌ Disconnected"}
                    </p>
                    {status.databases.neon.error && (
                      <p className="font-lora text-red-600 text-sm mt-1">{status.databases.neon.error}</p>
                    )}
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-midnight-blue mb-2">Shopify Tables</h3>
                    <p className="font-lora text-midnight-blue/70">
                      {status.databases.shopify.tablesExist ? (
                        <>✅ {status.databases.neon.tables.length} tables created</>
                      ) : (
                        "❌ No Shopify tables found"
                      )}
                    </p>
                    {status.databases.shopify.productCount > 0 && (
                      <p className="font-lora text-sage-green text-sm">
                        {status.databases.shopify.productCount} products cached
                      </p>
                    )}
                  </div>
                </div>

                {status.databases.neon.tables.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-montserrat font-semibold text-midnight-blue mb-2">Available Tables</h3>
                    <div className="flex flex-wrap gap-2">
                      {status.databases.neon.tables.map((table) => (
                        <span
                          key={table}
                          className="bg-sage-green/10 text-sage-green px-3 py-1 rounded-full text-sm font-montserrat"
                        >
                          {table}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Supabase Database */}
              <div className="bg-magnolia-white rounded-2xl p-8">
                <h2 className="font-playfair text-2xl font-bold text-midnight-blue mb-6 flex items-center gap-3">
                  <Database
                    className={status.databases.supabase.connected ? "text-sage-green" : "text-red-500"}
                    size={24}
                  />
                  Supabase Database
                  {status.databases.supabase.connected ? (
                    <CheckCircle className="text-sage-green" size={20} />
                  ) : (
                    <XCircle className="text-red-500" size={20} />
                  )}
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-montserrat font-semibold text-midnight-blue mb-2">Connection Status</h3>
                    <p
                      className={`font-lora ${status.databases.supabase.connected ? "text-sage-green" : "text-red-600"}`}
                    >
                      {status.databases.supabase.connected ? "✅ Connected" : "❌ Disconnected"}
                    </p>
                    {status.databases.supabase.error && (
                      <p className="font-lora text-red-600 text-sm mt-1">{status.databases.supabase.error}</p>
                    )}
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-midnight-blue mb-2">Info</h3>
                    <p className="font-lora text-midnight-blue/70">
                      {status.databases.supabase.info || "Available for auth & additional data"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Environment Variables */}
              <div className="bg-magnolia-white rounded-2xl p-8">
                <h2 className="font-playfair text-2xl font-bold text-midnight-blue mb-6">🔧 Environment Variables</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-montserrat font-semibold text-midnight-blue mb-3">Database Variables</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {status.environment.hasNeonUrl ? (
                          <CheckCircle className="text-sage-green" size={16} />
                        ) : (
                          <XCircle className="text-red-500" size={16} />
                        )}
                        <span className="font-lora text-sm">DATABASE_URL</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {status.environment.hasSupabaseUrl ? (
                          <CheckCircle className="text-sage-green" size={16} />
                        ) : (
                          <XCircle className="text-red-500" size={16} />
                        )}
                        <span className="font-lora text-sm">SUPABASE_URL</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {status.environment.hasSupabaseKey ? (
                          <CheckCircle className="text-sage-green" size={16} />
                        ) : (
                          <XCircle className="text-red-500" size={16} />
                        )}
                        <span className="font-lora text-sm">SUPABASE_ANON_KEY</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-midnight-blue mb-3">Environment Info</h3>
                    <div className="space-y-2">
                      <p className="font-lora text-sm text-midnight-blue/70">
                        <strong>Node Environment:</strong> {status.environment.nodeEnv}
                      </p>
                      <p className="font-lora text-sm text-midnight-blue/70">
                        <strong>Primary Database:</strong> Neon (PostgreSQL)
                      </p>
                      <p className="font-lora text-sm text-midnight-blue/70">
                        <strong>Secondary Database:</strong> Supabase (Auth & Realtime)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-magnolia-white rounded-2xl p-8">
                <h2 className="font-playfair text-2xl font-bold text-midnight-blue mb-6">🌸 What You Have</h2>
                <div className="space-y-4">
                  <div className="bg-sage-green/10 border border-sage-green/20 p-4 rounded-lg">
                    <h3 className="font-montserrat font-semibold text-midnight-blue mb-2">✅ Already Configured</h3>
                    <ul className="font-lora text-midnight-blue/80 space-y-1">
                      <li>• Neon PostgreSQL database with connection pooling</li>
                      <li>• Supabase for authentication and real-time features</li>
                      <li>• Shopify database tables created and ready</li>
                      <li>• Multiple environment variables for flexibility</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h3 className="font-montserrat font-semibold text-midnight-blue mb-2">🔧 Still Need</h3>
                    <ul className="font-lora text-midnight-blue/80 space-y-1">
                      <li>• Shopify Storefront Access Token</li>
                      <li>• Shop domain configuration</li>
                      <li>• Test the product API connection</li>
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
