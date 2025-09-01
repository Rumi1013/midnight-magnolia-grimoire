"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Store,
  Settings,
  Package,
  Truck,
  CreditCard,
  Webhook,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Eye,
  EyeOff,
} from "lucide-react"

interface ShopifyConfig {
  domain: string
  storefrontToken: string
  adminToken?: string
  webhookSecret?: string
  isConfigured: boolean
  connectionStatus: "connected" | "error" | "testing" | "disconnected"
  shop?: {
    name: string
    email: string
    domain: string
    currency: string
    timezone: string
    plan: string
  }
}

interface ProductSync {
  totalProducts: number
  syncedProducts: number
  lastSync: string
  errors: string[]
}

export default function ShopifyConfigPage() {
  const [config, setConfig] = useState<ShopifyConfig>({
    domain: "",
    storefrontToken: "",
    isConfigured: false,
    connectionStatus: "disconnected",
  })
  const [productSync, setProductSync] = useState<ProductSync>({
    totalProducts: 0,
    syncedProducts: 0,
    lastSync: "",
    errors: [],
  })
  const [loading, setLoading] = useState(true)
  const [showTokens, setShowTokens] = useState(false)
  const [testingConnection, setTestingConnection] = useState(false)
  const [syncingProducts, setSyncingProducts] = useState(false)

  // Load current configuration
  useEffect(() => {
    loadConfiguration()
  }, [])

  const loadConfiguration = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/shopify/config")
      const data = await response.json()
      setConfig(data.config)
      setProductSync(data.productSync)
    } catch (error) {
      console.error("Failed to load Shopify configuration:", error)
    } finally {
      setLoading(false)
    }
  }

  const testConnection = async () => {
    setTestingConnection(true)
    try {
      const response = await fetch("/api/shopify/test-connection")
      const data = await response.json()

      setConfig((prev) => ({
        ...prev,
        connectionStatus: data.success ? "connected" : "error",
        shop: data.shop,
      }))
    } catch (error) {
      setConfig((prev) => ({ ...prev, connectionStatus: "error" }))
    } finally {
      setTestingConnection(false)
    }
  }

  const syncProducts = async () => {
    setSyncingProducts(true)
    try {
      const response = await fetch("/api/shopify/sync-products", { method: "POST" })
      const data = await response.json()
      setProductSync(data.productSync)
    } catch (error) {
      console.error("Product sync failed:", error)
    } finally {
      setSyncingProducts(false)
    }
  }

  const saveConfiguration = async (newConfig: Partial<ShopifyConfig>) => {
    try {
      const response = await fetch("/api/shopify/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig),
      })

      if (response.ok) {
        const data = await response.json()
        setConfig(data.config)
      }
    } catch (error) {
      console.error("Failed to save configuration:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-blue pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-sage-green border-t-transparent mx-auto mb-4" />
          <p className="text-magnolia-white font-lora">Loading sacred configuration...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-midnight-blue pt-24">
      <div className="container mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-magnolia-white mb-4">
              🌙 Sacred Shopify Configuration
            </h1>
            <p className="font-lora text-xl text-magnolia-white/80">
              Connect your divine commerce sanctuary with healing energy
            </p>
          </div>

          {/* Connection Status */}
          <div className="bg-magnolia-white rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-playfair text-2xl font-bold text-midnight-blue flex items-center gap-3">
                <Store size={24} />
                Connection Status
              </h2>
              <button
                onClick={testConnection}
                disabled={testingConnection}
                className="flex items-center gap-2 px-4 py-2 bg-sage-green text-magnolia-white 
                         rounded-full font-montserrat font-semibold hover:bg-sage-green/90 
                         disabled:opacity-50 transition-all duration-200"
              >
                <RefreshCw size={16} className={testingConnection ? "animate-spin" : ""} />
                {testingConnection ? "Testing..." : "Test Connection"}
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div
                className={`p-4 rounded-lg border-2 ${
                  config.connectionStatus === "connected"
                    ? "bg-sage-green/10 border-sage-green/30"
                    : config.connectionStatus === "error"
                      ? "bg-red-50 border-red-200"
                      : "bg-warm-gray/10 border-warm-gray/30"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {config.connectionStatus === "connected" && <CheckCircle className="text-sage-green" size={20} />}
                  {config.connectionStatus === "error" && <XCircle className="text-red-500" size={20} />}
                  {config.connectionStatus === "disconnected" && <AlertCircle className="text-warm-gray" size={20} />}
                  <h3 className="font-montserrat font-semibold text-midnight-blue">
                    {config.connectionStatus === "connected"
                      ? "Connected"
                      : config.connectionStatus === "error"
                        ? "Connection Failed"
                        : "Not Connected"}
                  </h3>
                </div>
                {config.shop && (
                  <div className="text-sm text-midnight-blue/70">
                    <p>
                      <strong>Shop:</strong> {config.shop.name}
                    </p>
                    <p>
                      <strong>Domain:</strong> {config.shop.domain}
                    </p>
                    <p>
                      <strong>Plan:</strong> {config.shop.plan}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-lg bg-sage-green/10 border-2 border-sage-green/30">
                <div className="flex items-center gap-3 mb-2">
                  <Package className="text-sage-green" size={20} />
                  <h3 className="font-montserrat font-semibold text-midnight-blue">Products</h3>
                </div>
                <div className="text-sm text-midnight-blue/70">
                  <p>
                    <strong>Synced:</strong> {productSync.syncedProducts} / {productSync.totalProducts}
                  </p>
                  <p>
                    <strong>Last Sync:</strong> {productSync.lastSync || "Never"}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-sage-green/10 border-2 border-sage-green/30">
                <div className="flex items-center gap-3 mb-2">
                  <Webhook className="text-sage-green" size={20} />
                  <h3 className="font-montserrat font-semibold text-midnight-blue">Webhooks</h3>
                </div>
                <div className="text-sm text-midnight-blue/70">
                  <p>
                    <strong>Status:</strong> {config.webhookSecret ? "Configured" : "Not Set"}
                  </p>
                  <p>
                    <strong>Events:</strong> Orders, Products, Inventory
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Form */}
          <div className="bg-magnolia-white rounded-2xl p-8 mb-8">
            <h2 className="font-playfair text-2xl font-bold text-midnight-blue mb-6 flex items-center gap-3">
              <Settings size={24} />
              Sacred Configuration
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-montserrat font-semibold text-midnight-blue mb-2">Shop Domain</label>
                <input
                  type="text"
                  value={config.domain}
                  onChange={(e) => setConfig((prev) => ({ ...prev, domain: e.target.value }))}
                  placeholder="your-shop.myshopify.com"
                  className="w-full px-4 py-3 border border-sage-green/30 rounded-lg 
                           font-lora text-midnight-blue focus:outline-none focus:ring-2 
                           focus:ring-sage-green/50 focus:border-sage-green"
                />
                <p className="text-sm text-midnight-blue/60 mt-1">Your Shopify store domain (without https://)</p>
              </div>

              <div>
                <label className="block font-montserrat font-semibold text-midnight-blue mb-2">
                  Storefront Access Token
                </label>
                <div className="relative">
                  <input
                    type={showTokens ? "text" : "password"}
                    value={config.storefrontToken}
                    onChange={(e) => setConfig((prev) => ({ ...prev, storefrontToken: e.target.value }))}
                    placeholder="shpat_xxxxxxxxxxxxxxxx"
                    className="w-full px-4 py-3 pr-12 border border-sage-green/30 rounded-lg 
                             font-lora text-midnight-blue focus:outline-none focus:ring-2 
                             focus:ring-sage-green/50 focus:border-sage-green"
                  />
                  <button
                    type="button"
                    onClick={() => setShowTokens(!showTokens)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-midnight-blue/50 
                             hover:text-midnight-blue transition-colors"
                  >
                    {showTokens ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-sm text-midnight-blue/60 mt-1">Public Storefront API token for reading products</p>
              </div>

              <div>
                <label className="block font-montserrat font-semibold text-midnight-blue mb-2">
                  Admin API Token (Optional)
                </label>
                <input
                  type={showTokens ? "text" : "password"}
                  value={config.adminToken || ""}
                  onChange={(e) => setConfig((prev) => ({ ...prev, adminToken: e.target.value }))}
                  placeholder="shpat_xxxxxxxxxxxxxxxx"
                  className="w-full px-4 py-3 border border-sage-green/30 rounded-lg 
                           font-lora text-midnight-blue focus:outline-none focus:ring-2 
                           focus:ring-sage-green/50 focus:border-sage-green"
                />
                <p className="text-sm text-midnight-blue/60 mt-1">For advanced features like order management</p>
              </div>

              <div>
                <label className="block font-montserrat font-semibold text-midnight-blue mb-2">
                  Webhook Secret (Optional)
                </label>
                <input
                  type={showTokens ? "text" : "password"}
                  value={config.webhookSecret || ""}
                  onChange={(e) => setConfig((prev) => ({ ...prev, webhookSecret: e.target.value }))}
                  placeholder="webhook_secret_key"
                  className="w-full px-4 py-3 border border-sage-green/30 rounded-lg 
                           font-lora text-midnight-blue focus:outline-none focus:ring-2 
                           focus:ring-sage-green/50 focus:border-sage-green"
                />
                <p className="text-sm text-midnight-blue/60 mt-1">For secure webhook verification</p>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => saveConfiguration(config)}
                className="px-6 py-3 bg-sage-green text-magnolia-white font-montserrat 
                         font-semibold rounded-full hover:bg-sage-green/90 transition-all duration-200"
              >
                Save Sacred Configuration
              </button>
              <button
                onClick={testConnection}
                disabled={testingConnection}
                className="px-6 py-3 bg-midnight-blue text-magnolia-white font-montserrat 
                         font-semibold rounded-full hover:bg-midnight-blue/90 disabled:opacity-50 
                         transition-all duration-200"
              >
                Test Connection
              </button>
            </div>
          </div>

          {/* Product Sync */}
          <div className="bg-magnolia-white rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-playfair text-2xl font-bold text-midnight-blue flex items-center gap-3">
                <Package size={24} />
                Product Synchronization
              </h2>
              <button
                onClick={syncProducts}
                disabled={syncingProducts || config.connectionStatus !== "connected"}
                className="flex items-center gap-2 px-4 py-2 bg-sage-green text-magnolia-white 
                         rounded-full font-montserrat font-semibold hover:bg-sage-green/90 
                         disabled:opacity-50 transition-all duration-200"
              >
                <RefreshCw size={16} className={syncingProducts ? "animate-spin" : ""} />
                {syncingProducts ? "Syncing..." : "Sync Products"}
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-sage-green/10 rounded-lg">
                <div className="text-3xl font-bold text-sage-green mb-2">{productSync.totalProducts}</div>
                <div className="font-montserrat text-midnight-blue">Total Products</div>
              </div>
              <div className="text-center p-4 bg-sage-green/10 rounded-lg">
                <div className="text-3xl font-bold text-sage-green mb-2">{productSync.syncedProducts}</div>
                <div className="font-montserrat text-midnight-blue">Synced Products</div>
              </div>
              <div className="text-center p-4 bg-sage-green/10 rounded-lg">
                <div className="text-3xl font-bold text-sage-green mb-2">{productSync.errors.length}</div>
                <div className="font-montserrat text-midnight-blue">Sync Errors</div>
              </div>
            </div>

            {productSync.errors.length > 0 && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="font-montserrat font-semibold text-red-700 mb-2">Sync Errors:</h3>
                <ul className="text-sm text-red-600 space-y-1">
                  {productSync.errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-magnolia-white rounded-2xl p-8">
            <h2 className="font-playfair text-2xl font-bold text-midnight-blue mb-6">🌸 Sacred Quick Actions</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <a
                href="/admin/shopify/products"
                className="flex items-center gap-3 p-4 bg-sage-green/10 rounded-lg 
                         hover:bg-sage-green/20 transition-all duration-200 group"
              >
                <Package className="text-sage-green group-hover:scale-110 transition-transform" size={20} />
                <div>
                  <div className="font-montserrat font-semibold text-midnight-blue">Manage Products</div>
                  <div className="text-sm text-midnight-blue/60">View and edit products</div>
                </div>
              </a>

              <a
                href="/admin/shopify/orders"
                className="flex items-center gap-3 p-4 bg-sage-green/10 rounded-lg 
                         hover:bg-sage-green/20 transition-all duration-200 group"
              >
                <CreditCard className="text-sage-green group-hover:scale-110 transition-transform" size={20} />
                <div>
                  <div className="font-montserrat font-semibold text-midnight-blue">View Orders</div>
                  <div className="text-sm text-midnight-blue/60">Track sacred purchases</div>
                </div>
              </a>

              <a
                href="/admin/shopify/inventory"
                className="flex items-center gap-3 p-4 bg-sage-green/10 rounded-lg 
                         hover:bg-sage-green/20 transition-all duration-200 group"
              >
                <Truck className="text-sage-green group-hover:scale-110 transition-transform" size={20} />
                <div>
                  <div className="font-montserrat font-semibold text-midnight-blue">Inventory</div>
                  <div className="text-sm text-midnight-blue/60">Manage stock levels</div>
                </div>
              </a>

              <a
                href="/debug/shopify"
                className="flex items-center gap-3 p-4 bg-sage-green/10 rounded-lg 
                         hover:bg-sage-green/20 transition-all duration-200 group"
              >
                <ExternalLink className="text-sage-green group-hover:scale-110 transition-transform" size={20} />
                <div>
                  <div className="font-montserrat font-semibold text-midnight-blue">Debug Tools</div>
                  <div className="text-sm text-midnight-blue/60">Test connections</div>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
