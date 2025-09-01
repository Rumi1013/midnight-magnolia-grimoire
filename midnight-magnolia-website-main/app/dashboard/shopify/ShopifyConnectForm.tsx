"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ShopifyConnectFormProps {
  onConnect: () => void
}

export default function ShopifyConnectForm({ onConnect }: ShopifyConnectFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [shopUrl, setShopUrl] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [apiSecret, setApiSecret] = useState("")

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call to connect Shopify
    setTimeout(() => {
      setIsLoading(false)
      onConnect()
    }, 2000)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleConnect} className="space-y-6">
        <div className="space-y-4 bg-midnight-blue/30 p-6 rounded-lg">
          <div className="space-y-2">
            <Label htmlFor="shop-url" className="text-magnolia-white">
              Shopify Store URL
            </Label>
            <div className="flex">
              <Input
                id="shop-url"
                value={shopUrl}
                onChange={(e) => setShopUrl(e.target.value)}
                placeholder="your-store"
                className="bg-midnight-blue/50 border-magnolia-white/20 text-magnolia-white rounded-r-none"
                required
              />
              <span className="inline-flex items-center px-3 bg-midnight-blue/70 border border-l-0 border-magnolia-white/20 rounded-r-md text-magnolia-white/70">
                .myshopify.com
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="api-key" className="text-magnolia-white">
              API Key
            </Label>
            <Input
              id="api-key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Shopify API key"
              className="bg-midnight-blue/50 border-magnolia-white/20 text-magnolia-white"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="api-secret" className="text-magnolia-white">
              API Secret Key
            </Label>
            <Input
              id="api-secret"
              type="password"
              value={apiSecret}
              onChange={(e) => setApiSecret(e.target.value)}
              placeholder="Enter your Shopify API secret key"
              className="bg-midnight-blue/50 border-magnolia-white/20 text-magnolia-white"
              required
            />
          </div>
        </div>

        <div className="bg-midnight-blue/30 p-6 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold text-magnolia-white">Don't have API credentials?</h3>
          <p className="text-magnolia-white/80 text-sm">
            Follow these steps to create a private app in your Shopify admin:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-magnolia-white/80 text-sm">
            <li>Go to your Shopify admin panel</li>
            <li>Navigate to Apps &gt; App and sales channel settings</li>
            <li>Click "Develop apps for your store" at the bottom</li>
            <li>Click "Create an app"</li>
            <li>Name your app "Midnight Magnolia Integration"</li>
            <li>Set appropriate API permissions (read/write for products, orders, inventory)</li>
            <li>Install the app and copy the API credentials</li>
          </ol>
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue px-8 py-6 text-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-midnight-blue border-t-transparent rounded-full"></div>
                Connecting...
              </>
            ) : (
              "Connect Shopify Store"
            )}
          </Button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-magnolia-white/70">
          By connecting your Shopify store, you'll be able to manage your physical products, orders, and inventory
          directly from the Midnight Magnolia dashboard.
        </p>
      </div>
    </div>
  )
}
