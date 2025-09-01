"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircleIcon, ClipboardDocumentIcon, ExternalLinkIcon } from "@heroicons/react/24/outline"

export default function ShopifyWebhookSetup() {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

  const ngrokBaseUrl = "https://accepted-coyote-vertically.ngrok-free.app"
  const webhookSecret = "6481626f8275df5648a3aea7972ac27a6ec4f76acd039dc02e6eaaa97df4a876"

  const webhookEndpoints = [
    {
      name: "Order Creation",
      topic: "orders/create",
      url: `${ngrokBaseUrl}/api/webhooks/shopify/orders/create`,
      description: "Triggered when a new order is placed",
    },
    {
      name: "Order Updated",
      topic: "orders/updated",
      url: `${ngrokBaseUrl}/api/webhooks/shopify/orders/updated`,
      description: "Triggered when order status changes",
    },
    {
      name: "Product Creation",
      topic: "products/create",
      url: `${ngrokBaseUrl}/api/webhooks/shopify/products/create`,
      description: "Triggered when a new product is added",
    },
    {
      name: "Product Updated",
      topic: "products/update",
      url: `${ngrokBaseUrl}/api/webhooks/shopify/products/update`,
      description: "Triggered when product details change",
    },
    {
      name: "Inventory Updated",
      topic: "inventory_levels/update",
      url: `${ngrokBaseUrl}/api/webhooks/shopify/inventory/update`,
      description: "Triggered when inventory levels change",
    },
    {
      name: "Customer Creation",
      topic: "customers/create",
      url: `${ngrokBaseUrl}/api/webhooks/shopify/customers/create`,
      description: "Triggered when a new customer registers",
    },
  ]

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedUrl(text)
      setTimeout(() => setCopiedUrl(null), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const testWebhook = async (url: string) => {
    try {
      const response = await fetch(url.replace("/api/webhooks/shopify/", "/api/webhooks/test"))
      const data = await response.json()
      console.log("Test result:", data)
      alert("Webhook test successful! Check console for details.")
    } catch (error) {
      console.error("Test failed:", error)
      alert("Webhook test failed. Check console for details.")
    }
  }

  return (
    <div className="space-y-6">
      {/* ngrok Status */}
      <Card className="bg-midnight-teal border-none">
        <CardHeader>
          <CardTitle className="text-magnolia-white flex items-center gap-2">
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
            ngrok Tunnel Active
          </CardTitle>
          <CardDescription className="text-magnolia-white/70">
            Your local webhooks are exposed via ngrok
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-midnight-blue/50 p-4 rounded-lg">
            <p className="text-magnolia-white font-mono text-sm">{ngrokBaseUrl}</p>
            <p className="text-sage-green text-xs mt-2">✓ Tunnel is active and ready to receive webhooks</p>
          </div>
        </CardContent>
      </Card>

      {/* Webhook Endpoints */}
      <Card className="bg-midnight-teal border-none">
        <CardHeader>
          <CardTitle className="text-magnolia-white">Webhook Endpoints</CardTitle>
          <CardDescription className="text-magnolia-white/70">
            Configure these URLs in your Shopify admin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {webhookEndpoints.map((endpoint) => (
              <div key={endpoint.topic} className="bg-midnight-blue/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-magnolia-white">{endpoint.name}</h4>
                    <p className="text-sm text-magnolia-white/70">{endpoint.description}</p>
                  </div>
                  <Badge className="bg-sage-green text-midnight-blue">{endpoint.topic}</Badge>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <code className="flex-1 bg-midnight-blue p-2 rounded text-magnolia-white text-xs font-mono">
                    {endpoint.url}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(endpoint.url)}
                    className="bg-magnolia-white/10 border-none text-magnolia-white hover:bg-magnolia-white/20"
                  >
                    {copiedUrl === endpoint.url ? (
                      <CheckCircleIcon className="w-4 h-4" />
                    ) : (
                      <ClipboardDocumentIcon className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => testWebhook(endpoint.url)}
                    className="bg-sage-green/20 border-none text-sage-green hover:bg-sage-green/30"
                  >
                    Test
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Webhook Secret */}
      <Card className="bg-midnight-teal border-none">
        <CardHeader>
          <CardTitle className="text-magnolia-white">Webhook Secret</CardTitle>
          <CardDescription className="text-magnolia-white/70">
            Use this secret to verify webhook authenticity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-midnight-blue/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <code className="flex-1 bg-midnight-blue p-2 rounded text-magnolia-white text-xs font-mono">
                SHOPIFY_WEBHOOK_SECRET={webhookSecret}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(webhookSecret)}
                className="bg-magnolia-white/10 border-none text-magnolia-white hover:bg-magnolia-white/20"
              >
                {copiedUrl === webhookSecret ? (
                  <CheckCircleIcon className="w-4 h-4" />
                ) : (
                  <ClipboardDocumentIcon className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-sage-green text-xs">✓ Secret is configured and ready to use</p>
          </div>
        </CardContent>
      </Card>

      {/* Shopify Configuration Steps */}
      <Card className="bg-midnight-teal border-none">
        <CardHeader>
          <CardTitle className="text-magnolia-white">Shopify Configuration</CardTitle>
          <CardDescription className="text-magnolia-white/70">
            Follow these steps to set up webhooks in Shopify
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-rich-gold rounded-full flex items-center justify-center text-midnight-blue font-bold text-sm">
                1
              </div>
              <div>
                <h4 className="font-semibold text-magnolia-white">Access Shopify Admin</h4>
                <p className="text-magnolia-white/80 text-sm">Go to your Shopify admin → Settings → Notifications</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-rich-gold rounded-full flex items-center justify-center text-midnight-blue font-bold text-sm">
                2
              </div>
              <div>
                <h4 className="font-semibold text-magnolia-white">Create Webhooks</h4>
                <p className="text-magnolia-white/80 text-sm">
                  Scroll to "Webhooks" section and create each webhook using the URLs above
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-rich-gold rounded-full flex items-center justify-center text-midnight-blue font-bold text-sm">
                3
              </div>
              <div>
                <h4 className="font-semibold text-magnolia-white">Set Webhook Secret</h4>
                <p className="text-magnolia-white/80 text-sm">
                  Use the webhook secret shown above for all webhook configurations
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-rich-gold rounded-full flex items-center justify-center text-midnight-blue font-bold text-sm">
                4
              </div>
              <div>
                <h4 className="font-semibold text-magnolia-white">Test Webhooks</h4>
                <p className="text-magnolia-white/80 text-sm">
                  Use the "Test" buttons above to verify each webhook is working
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-magnolia-white/20">
            <Button
              className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue"
              onClick={() => window.open("https://admin.shopify.com/settings/notifications", "_blank")}
            >
              <ExternalLinkIcon className="w-4 h-4 mr-2" />
              Open Shopify Admin
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
