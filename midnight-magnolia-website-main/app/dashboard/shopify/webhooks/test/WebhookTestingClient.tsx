"use client"

import { useState } from "react"
import {
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  UserGroupIcon,
  SparklesIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  PlayIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TestResult {
  endpoint: string
  status: "pending" | "success" | "error"
  responseTime?: number
  statusCode?: number
  response?: any
  error?: string
  timestamp: string
}

interface WebhookTest {
  name: string
  endpoint: string
  topic: string
  description: string
  payload: any
}

export default function WebhookTestingClient() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunningTests, setIsRunningTests] = useState(false)
  const [activeTab, setActiveTab] = useState("individual")

  const ngrokBaseUrl = "https://accepted-coyote-vertically.ngrok-free.app"
  const webhookSecret = "6481626f8275df5648a3aea7972ac27a6ec4f76acd039dc02e6eaaa97df4a876"

  const webhookTests: WebhookTest[] = [
    {
      name: "Order Creation",
      endpoint: `${ngrokBaseUrl}/api/webhooks/shopify/orders/create`,
      topic: "orders/create",
      description: "Test new order webhook",
      payload: {
        id: 1234567890,
        order_number: "#MM1001",
        email: "customer@example.com",
        total_price: "29.99",
        currency: "USD",
        financial_status: "pending",
        fulfillment_status: null,
        line_items: [
          {
            id: 987654321,
            product_id: 123456,
            variant_id: 789012,
            title: "Midnight Magnolia Journal",
            quantity: 1,
            price: "29.99",
          },
        ],
        customer: {
          id: 555666777,
          email: "customer@example.com",
          first_name: "Luna",
          last_name: "Moonchild",
        },
        created_at: new Date().toISOString(),
      },
    },
    {
      name: "Order Updated",
      endpoint: `${ngrokBaseUrl}/api/webhooks/shopify/orders/updated`,
      topic: "orders/updated",
      description: "Test order status update",
      payload: {
        id: 1234567890,
        order_number: "#MM1001",
        financial_status: "paid",
        fulfillment_status: "fulfilled",
        updated_at: new Date().toISOString(),
      },
    },
    {
      name: "Product Creation",
      endpoint: `${ngrokBaseUrl}/api/webhooks/shopify/products/create`,
      topic: "products/create",
      description: "Test new product webhook",
      payload: {
        id: 987654321,
        title: "Sacred Moon Phase Planner",
        handle: "sacred-moon-phase-planner",
        product_type: "Journal",
        vendor: "Midnight Magnolia",
        status: "active",
        variants: [
          {
            id: 123456789,
            title: "Default Title",
            price: "39.99",
            inventory_quantity: 50,
            sku: "MM-MOON-PLANNER-001",
          },
        ],
        images: [
          {
            id: 111222333,
            src: "https://example.com/moon-planner.jpg",
            alt: "Sacred Moon Phase Planner",
          },
        ],
        created_at: new Date().toISOString(),
      },
    },
    {
      name: "Product Updated",
      endpoint: `${ngrokBaseUrl}/api/webhooks/shopify/products/update`,
      topic: "products/update",
      description: "Test product update webhook",
      payload: {
        id: 987654321,
        title: "Sacred Moon Phase Planner - Updated",
        status: "active",
        updated_at: new Date().toISOString(),
      },
    },
    {
      name: "Inventory Updated",
      endpoint: `${ngrokBaseUrl}/api/webhooks/shopify/inventory/update`,
      topic: "inventory_levels/update",
      description: "Test inventory change webhook",
      payload: {
        inventory_item_id: 555777999,
        location_id: 123456,
        available: 25,
        updated_at: new Date().toISOString(),
      },
    },
    {
      name: "Customer Creation",
      endpoint: `${ngrokBaseUrl}/api/webhooks/shopify/customers/create`,
      topic: "customers/create",
      description: "Test new customer webhook",
      payload: {
        id: 888999000,
        email: "newcustomer@example.com",
        first_name: "Sage",
        last_name: "Moonbeam",
        phone: "+1234567890",
        accepts_marketing: true,
        created_at: new Date().toISOString(),
        addresses: [
          {
            id: 111222,
            first_name: "Sage",
            last_name: "Moonbeam",
            address1: "123 Magnolia Lane",
            city: "Mystic Falls",
            province: "GA",
            country: "United States",
            zip: "30120",
          },
        ],
      },
    },
  ]

  const generateHMAC = async (payload: string, secret: string): Promise<string> => {
    const encoder = new TextEncoder()
    const keyData = encoder.encode(secret)
    const messageData = encoder.encode(payload)

    const cryptoKey = await crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"])

    const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData)
    const hashArray = Array.from(new Uint8Array(signature))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

    return hashHex
  }

  const testSingleWebhook = async (test: WebhookTest): Promise<TestResult> => {
    const startTime = Date.now()
    const timestamp = new Date().toISOString()

    try {
      const payloadString = JSON.stringify(test.payload)
      const hmacSignature = await generateHMAC(payloadString, webhookSecret)

      const response = await fetch(test.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Topic": test.topic,
          "X-Shopify-Hmac-Sha256": hmacSignature,
          "X-Shopify-Shop-Domain": "midnight-magnolia-test.myshopify.com",
          "X-Shopify-Webhook-Id": `test-${Date.now()}`,
        },
        body: payloadString,
      })

      const responseTime = Date.now() - startTime
      const responseData = await response.json()

      return {
        endpoint: test.endpoint,
        status: response.ok ? "success" : "error",
        responseTime,
        statusCode: response.status,
        response: responseData,
        timestamp,
      }
    } catch (error: any) {
      return {
        endpoint: test.endpoint,
        status: "error",
        responseTime: Date.now() - startTime,
        error: error.message,
        timestamp,
      }
    }
  }

  const testAllWebhooks = async () => {
    setIsRunningTests(true)
    setTestResults([])

    // Initialize all tests as pending
    const pendingResults: TestResult[] = webhookTests.map((test) => ({
      endpoint: test.endpoint,
      status: "pending",
      timestamp: new Date().toISOString(),
    }))
    setTestResults(pendingResults)

    // Run tests sequentially with delays
    for (let i = 0; i < webhookTests.length; i++) {
      const test = webhookTests[i]
      const result = await testSingleWebhook(test)

      setTestResults((prev) => prev.map((r, index) => (index === i ? result : r)))

      // Add delay between tests
      if (i < webhookTests.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }

    setIsRunningTests(false)
  }

  const testIndividualWebhook = async (test: WebhookTest) => {
    const result = await testSingleWebhook(test)
    setTestResults((prev) => {
      const existingIndex = prev.findIndex((r) => r.endpoint === test.endpoint)
      if (existingIndex >= 0) {
        const newResults = [...prev]
        newResults[existingIndex] = result
        return newResults
      } else {
        return [...prev, result]
      }
    })
  }

  const testConnectivity = async () => {
    try {
      const response = await fetch(`${ngrokBaseUrl}/api/webhooks/test`)
      const data = await response.json()

      const result: TestResult = {
        endpoint: `${ngrokBaseUrl}/api/webhooks/test`,
        status: response.ok ? "success" : "error",
        statusCode: response.status,
        response: data,
        timestamp: new Date().toISOString(),
      }

      setTestResults([result])
    } catch (error: any) {
      const result: TestResult = {
        endpoint: `${ngrokBaseUrl}/api/webhooks/test`,
        status: "error",
        error: error.message,
        timestamp: new Date().toISOString(),
      }

      setTestResults([result])
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />
      case "pending":
        return <ClockIcon className="w-5 h-5 text-yellow-500" />
      case "error":
        return <XCircleIcon className="w-5 h-5 text-red-500" />
      default:
        return <ExclamationTriangleIcon className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      success: "bg-green-500 text-white",
      pending: "bg-yellow-500 text-white",
      error: "bg-red-500 text-white",
    }

    return <Badge className={colors[status as keyof typeof colors] || "bg-gray-500 text-white"}>{status}</Badge>
  }

  return (
    <div className="min-h-screen bg-midnight-blue">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-midnight-teal p-6 overflow-y-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-rich-gold rounded-full flex items-center justify-center">
            <span className="text-midnight-blue font-bold">MM</span>
          </div>
          <div>
            <h2 className="font-playfair text-xl font-bold text-magnolia-white">Midnight Magnolia</h2>
            <p className="font-montserrat text-xs text-sage-green tracking-wider">DIGITAL SANCTUARY</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mb-8">
          <ul className="space-y-3">
            <li>
              <a
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-magnolia-white hover:bg-magnolia-white/10 transition-colors"
              >
                <ChartBarIcon className="w-5 h-5" />
                <span className="font-lora">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/content"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-magnolia-white hover:bg-magnolia-white/10 transition-colors"
              >
                <SparklesIcon className="w-5 h-5" />
                <span className="font-lora">Content Creation</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/inventory"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-magnolia-white hover:bg-magnolia-white/10 transition-colors"
              >
                <DocumentTextIcon className="w-5 h-5" />
                <span className="font-lora">Digital Inventory</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/payments"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-magnolia-white hover:bg-magnolia-white/10 transition-colors"
              >
                <CreditCardIcon className="w-5 h-5" />
                <span className="font-lora">Payments</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/shopify"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-magnolia-white hover:bg-magnolia-white/10 transition-colors"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                <span className="font-lora">Shopify Store</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/shopify/webhooks"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-magnolia-white hover:bg-magnolia-white/10 transition-colors ml-4"
              >
                <ArrowPathIcon className="w-5 h-5" />
                <span className="font-lora">Webhooks</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/shopify/webhooks/test"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-magnolia-white/15 text-rich-gold ml-8"
              >
                <PlayIcon className="w-5 h-5" />
                <span className="font-lora">Test Webhooks</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/clients"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-magnolia-white hover:bg-magnolia-white/10 transition-colors"
              >
                <UserGroupIcon className="w-5 h-5" />
                <span className="font-lora">Client Management</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/settings"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-magnolia-white hover:bg-magnolia-white/10 transition-colors"
              >
                <CogIcon className="w-5 h-5" />
                <span className="font-lora">Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-80 p-6">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-magnolia-white mb-2">Webhook Testing</h1>
            <p className="font-montserrat text-sage-green">
              Test your webhook endpoints to ensure they're working correctly
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={testConnectivity}
              className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue"
              disabled={isRunningTests}
            >
              <PlayIcon className="w-4 h-4 mr-2" />
              Test Connectivity
            </Button>
            <Button
              onClick={testAllWebhooks}
              className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue"
              disabled={isRunningTests}
            >
              {isRunningTests ? (
                <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <PlayIcon className="w-4 h-4 mr-2" />
              )}
              {isRunningTests ? "Testing..." : "Test All Webhooks"}
            </Button>
          </div>
        </header>

        {/* Test Results Summary */}
        {testResults.length > 0 && (
          <div className="grid grid-cols-3 gap-6 mb-8">
            <Card className="bg-midnight-teal border-none">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-magnolia-white/70">Successful</p>
                    <h3 className="text-2xl font-bold text-magnolia-white">
                      {testResults.filter((r) => r.status === "success").length}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-midnight-teal border-none">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                    <XCircleIcon className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm text-magnolia-white/70">Failed</p>
                    <h3 className="text-2xl font-bold text-magnolia-white">
                      {testResults.filter((r) => r.status === "error").length}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-midnight-teal border-none">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <ClockIcon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-magnolia-white/70">Avg Response Time</p>
                    <h3 className="text-2xl font-bold text-magnolia-white">
                      {testResults.filter((r) => r.responseTime).length > 0
                        ? Math.round(
                            testResults
                              .filter((r) => r.responseTime)
                              .reduce((sum, r) => sum + (r.responseTime || 0), 0) /
                              testResults.filter((r) => r.responseTime).length,
                          )
                        : 0}
                      ms
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="individual" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-midnight-teal mb-6">
            <TabsTrigger
              value="individual"
              className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
            >
              Individual Tests
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
            >
              Test Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="individual">
            <Card className="bg-midnight-teal border-none">
              <CardHeader>
                <CardTitle className="text-magnolia-white">Individual Webhook Tests</CardTitle>
                <CardDescription className="text-magnolia-white/70">
                  Test each webhook endpoint individually with simulated Shopify payloads
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {webhookTests.map((test, index) => {
                    const result = testResults.find((r) => r.endpoint === test.endpoint)
                    return (
                      <div key={index} className="bg-midnight-blue/50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-magnolia-white">{test.name}</h4>
                            <p className="text-sm text-magnolia-white/70">{test.description}</p>
                            <p className="text-xs text-magnolia-white/50 font-mono">{test.endpoint}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {result && getStatusIcon(result.status)}
                            <Badge className="bg-sage-green text-midnight-blue">{test.topic}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-magnolia-white/50">
                            {result && (
                              <>
                                {result.responseTime && `${result.responseTime}ms`}
                                {result.statusCode && ` • ${result.statusCode}`}
                                {result.timestamp && ` • ${new Date(result.timestamp).toLocaleTimeString()}`}
                              </>
                            )}
                          </div>
                          <Button
                            size="sm"
                            onClick={() => testIndividualWebhook(test)}
                            className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue"
                            disabled={isRunningTests}
                          >
                            <PlayIcon className="w-4 h-4 mr-1" />
                            Test
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            <Card className="bg-midnight-teal border-none">
              <CardHeader>
                <CardTitle className="text-magnolia-white">Test Results</CardTitle>
                <CardDescription className="text-magnolia-white/70">
                  Detailed results from webhook endpoint testing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testResults.length === 0 ? (
                    <div className="text-center py-8">
                      <PlayIcon className="w-12 h-12 text-sage-green mx-auto mb-4" />
                      <p className="text-magnolia-white">No tests run yet. Click "Test All Webhooks" to begin.</p>
                    </div>
                  ) : (
                    testResults.map((result, index) => (
                      <div key={index} className="bg-midnight-blue/50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(result.status)}
                            <div>
                              <h4 className="font-semibold text-magnolia-white">
                                {webhookTests.find((t) => t.endpoint === result.endpoint)?.name || "Unknown Test"}
                              </h4>
                              <p className="text-xs text-magnolia-white/50 font-mono">{result.endpoint}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(result.status)}
                            {result.responseTime && (
                              <Badge className="bg-blue-500 text-white">{result.responseTime}ms</Badge>
                            )}
                            {result.statusCode && (
                              <Badge
                                className={
                                  result.statusCode >= 200 && result.statusCode < 300
                                    ? "bg-green-500 text-white"
                                    : "bg-red-500 text-white"
                                }
                              >
                                {result.statusCode}
                              </Badge>
                            )}
                          </div>
                        </div>
                        {result.error && (
                          <div className="mt-2 p-2 bg-red-500/20 rounded text-red-400 text-sm">
                            <strong>Error:</strong> {result.error}
                          </div>
                        )}
                        {result.response && (
                          <div className="mt-2 p-2 bg-midnight-blue rounded">
                            <p className="text-xs text-magnolia-white/70 mb-1">Response:</p>
                            <pre className="text-xs text-magnolia-white font-mono overflow-x-auto">
                              {JSON.stringify(result.response, null, 2)}
                            </pre>
                          </div>
                        )}
                        <p className="text-xs text-magnolia-white/50 mt-2">
                          {new Date(result.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
