"use client"

import { useState, useEffect } from "react"
import {
  ChartBarIcon,
  UserGroupIcon,
  SparklesIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AnalyticsData {
  orderStats: {
    total_orders: number
    total_revenue: number
    average_order_value: number
    unique_customers: number
  }
  topProducts: Array<{
    title: string
    handle: string
    order_count: number
    total_quantity: number
    total_revenue: number
  }>
  lowStockItems: Array<{
    title: string
    sku: string
    product_title: string
    available: number
  }>
  webhookStats: Array<{
    webhook_topic: string
    status: string
    count: number
    last_processed: string
  }>
  recentOrders: Array<{
    order_number: string
    customer_email: string
    total_price: number
    financial_status: string
    created_at: string
  }>
  period: string
}

export default function AnalyticsClient() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState(30)

  useEffect(() => {
    loadAnalytics()
  }, [selectedPeriod])

  const loadAnalytics = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/shopify/analytics?days=${selectedPeriod}`)
      const data = await response.json()
      setAnalytics(data)
    } catch (error) {
      console.error("Error loading analytics:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
        <div className="text-magnolia-white">Loading analytics...</div>
      </div>
    )
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
                href="/dashboard/analytics"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-magnolia-white/15 text-rich-gold"
              >
                <ArrowTrendingUpIcon className="w-5 h-5" />
                <span className="font-lora">Analytics</span>
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
                href="/dashboard/shopify"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-magnolia-white hover:bg-magnolia-white/10 transition-colors"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                <span className="font-lora">Shopify Store</span>
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
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-80 p-6">
        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-magnolia-white mb-2">Analytics Dashboard</h1>
            <p className="font-montserrat text-sage-green">
              Comprehensive insights from your Shopify store and digital products
            </p>
          </div>
          <div className="flex gap-2">
            {[7, 30, 90].map((days) => (
              <Button
                key={days}
                variant={selectedPeriod === days ? "default" : "outline"}
                onClick={() => setSelectedPeriod(days)}
                className={
                  selectedPeriod === days
                    ? "bg-rich-gold text-midnight-blue"
                    : "bg-magnolia-white/10 border-none text-magnolia-white hover:bg-magnolia-white/20"
                }
              >
                {days} days
              </Button>
            ))}
          </div>
        </header>

        {analytics && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <Card className="bg-midnight-teal border-none">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <ShoppingBagIcon className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-magnolia-white/70">Total Orders</p>
                      <h3 className="text-2xl font-bold text-magnolia-white">{analytics.orderStats.total_orders}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-midnight-teal border-none">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rich-gold/20 rounded-full flex items-center justify-center">
                      <CreditCardIcon className="w-6 h-6 text-rich-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-magnolia-white/70">Total Revenue</p>
                      <h3 className="text-2xl font-bold text-magnolia-white">
                        {formatCurrency(analytics.orderStats.total_revenue)}
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-midnight-teal border-none">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <ArrowTrendingUpIcon className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-magnolia-white/70">Avg Order Value</p>
                      <h3 className="text-2xl font-bold text-magnolia-white">
                        {formatCurrency(analytics.orderStats.average_order_value)}
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-midnight-teal border-none">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <UserGroupIcon className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm text-magnolia-white/70">Unique Customers</p>
                      <h3 className="text-2xl font-bold text-magnolia-white">
                        {analytics.orderStats.unique_customers}
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="products">
              <TabsList className="bg-midnight-teal mb-6">
                <TabsTrigger
                  value="products"
                  className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                >
                  Top Products
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                >
                  Recent Orders
                </TabsTrigger>
                <TabsTrigger
                  value="inventory"
                  className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                >
                  Low Stock
                </TabsTrigger>
                <TabsTrigger
                  value="webhooks"
                  className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                >
                  Webhook Health
                </TabsTrigger>
              </TabsList>

              <TabsContent value="products">
                <Card className="bg-midnight-teal border-none">
                  <CardHeader>
                    <CardTitle className="text-magnolia-white">Top Performing Products</CardTitle>
                    <CardDescription className="text-magnolia-white/70">
                      Best selling products in the last {selectedPeriod} days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.topProducts.map((product, index) => (
                        <div
                          key={product.handle}
                          className="flex items-center justify-between p-4 bg-midnight-blue/50 rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-rich-gold/20 rounded-full flex items-center justify-center">
                              <span className="text-rich-gold font-bold">{index + 1}</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-magnolia-white">{product.title}</h4>
                              <p className="text-sm text-magnolia-white/70">
                                {product.total_quantity} units sold • {product.order_count} orders
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-magnolia-white">
                              {formatCurrency(product.total_revenue)}
                            </p>
                            <p className="text-sm text-sage-green">Revenue</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card className="bg-midnight-teal border-none">
                  <CardHeader>
                    <CardTitle className="text-magnolia-white">Recent Orders</CardTitle>
                    <CardDescription className="text-magnolia-white/70">Latest customer orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.recentOrders.map((order) => (
                        <div
                          key={order.order_number}
                          className="flex items-center justify-between p-4 bg-midnight-blue/50 rounded-lg"
                        >
                          <div>
                            <h4 className="font-semibold text-magnolia-white">{order.order_number}</h4>
                            <p className="text-sm text-magnolia-white/70">{order.customer_email}</p>
                            <p className="text-xs text-magnolia-white/50">{formatDate(order.created_at)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-magnolia-white">{formatCurrency(order.total_price)}</p>
                            <Badge
                              className={
                                order.financial_status === "paid"
                                  ? "bg-green-500 text-white"
                                  : "bg-yellow-500 text-black"
                              }
                            >
                              {order.financial_status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="inventory">
                <Card className="bg-midnight-teal border-none">
                  <CardHeader>
                    <CardTitle className="text-magnolia-white flex items-center gap-2">
                      <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                      Low Stock Alert
                    </CardTitle>
                    <CardDescription className="text-magnolia-white/70">
                      Products with 5 or fewer items remaining
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.lowStockItems.length === 0 ? (
                        <p className="text-magnolia-white/70 text-center py-8">No low stock items found</p>
                      ) : (
                        analytics.lowStockItems.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                          >
                            <div>
                              <h4 className="font-semibold text-magnolia-white">{item.product_title}</h4>
                              <p className="text-sm text-magnolia-white/70">{item.title}</p>
                              {item.sku && <p className="text-xs text-magnolia-white/50">SKU: {item.sku}</p>}
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-red-400">{item.available}</p>
                              <p className="text-sm text-red-400">remaining</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="webhooks">
                <Card className="bg-midnight-teal border-none">
                  <CardHeader>
                    <CardTitle className="text-magnolia-white">Webhook Health Status</CardTitle>
                    <CardDescription className="text-magnolia-white/70">
                      Webhook delivery statistics for the last 24 hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.webhookStats.map((stat, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-midnight-blue/50 rounded-lg"
                        >
                          <div>
                            <h4 className="font-semibold text-magnolia-white">{stat.webhook_topic}</h4>
                            <p className="text-sm text-magnolia-white/70">
                              Last processed: {formatDate(stat.last_processed)}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge
                              className={
                                stat.status === "success"
                                  ? "bg-green-500 text-white"
                                  : stat.status === "failed"
                                    ? "bg-red-500 text-white"
                                    : "bg-yellow-500 text-black"
                              }
                            >
                              {stat.status}
                            </Badge>
                            <span className="text-magnolia-white font-bold">{stat.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  )
}
