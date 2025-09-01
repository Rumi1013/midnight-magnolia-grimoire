"use client"

import { useState, useEffect } from "react"
import {
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  UserGroupIcon,
  SparklesIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  ArrowPathIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  TruckIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import ShopifyConnectForm from "./ShopifyConnectForm"
import ShopifyProductList from "./ShopifyProductList"
import ShopifyOrderList from "./ShopifyOrderList"
import ShopifyInventoryManager from "./ShopifyInventoryManager"

interface ShopifyStats {
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
  lowStockItems: number
}

export default function ShopifyDashboardClient() {
  const [activeTab, setActiveTab] = useState("products")
  const [isShopifyConnected, setIsShopifyConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [shopifyStats, setShopifyStats] = useState<ShopifyStats>({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    lowStockItems: 0,
  })

  useEffect(() => {
    // Simulate API call to check Shopify connection status
    setTimeout(() => {
      setIsShopifyConnected(true)
      setIsLoading(false)

      // Mock Shopify stats
      setShopifyStats({
        totalOrders: 127,
        totalRevenue: 4892.75,
        pendingOrders: 8,
        lowStockItems: 5,
      })
    }, 1000)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
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
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-magnolia-white/15 text-rich-gold"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                <span className="font-lora">Shopify Store</span>
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

        {/* Shopify Stats */}
        <div className="bg-midnight-blue/50 p-4 rounded-lg">
          <h3 className="font-montserrat text-sm font-semibold text-magnolia-white mb-3 uppercase tracking-wider">
            Shopify Stats
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-magnolia-white/70 text-sm">Total Orders</span>
              <span className="text-magnolia-white font-semibold">{shopifyStats.totalOrders}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-magnolia-white/70 text-sm">Total Revenue</span>
              <span className="text-magnolia-white font-semibold">{formatCurrency(shopifyStats.totalRevenue)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-magnolia-white/70 text-sm">Pending Orders</span>
              <span className="text-magnolia-white font-semibold">{shopifyStats.pendingOrders}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-magnolia-white/70 text-sm">Low Stock Items</span>
              <span className="text-magnolia-white font-semibold">{shopifyStats.lowStockItems}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-80 p-6">
        {/* Header */}
        <header className="mb-8">
          <h1 className="font-playfair text-3xl font-bold text-magnolia-white mb-2">Shopify Integration</h1>
          <p className="font-montserrat text-sage-green">
            Manage your physical products, orders, and inventory from Shopify
          </p>
        </header>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rich-gold"></div>
          </div>
        ) : !isShopifyConnected ? (
          <div className="bg-midnight-teal p-8 rounded-lg">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rich-gold/20 mb-4">
                <ShoppingBagIcon className="w-8 h-8 text-rich-gold" />
              </div>
              <h2 className="font-playfair text-2xl font-bold text-magnolia-white mb-2">Connect Shopify Store</h2>
              <p className="font-lora text-magnolia-white/80 max-w-lg mx-auto">
                Connect your Shopify store to manage your physical products, orders, and inventory directly from the
                Midnight Magnolia dashboard.
              </p>
            </div>

            <ShopifyConnectForm onConnect={() => setIsShopifyConnected(true)} />
          </div>
        ) : (
          <>
            {/* Store Overview */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <Card className="bg-midnight-teal border-none">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <ShoppingBagIcon className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-magnolia-white/70">Total Orders</p>
                      <h3 className="text-2xl font-bold text-magnolia-white">{shopifyStats.totalOrders}</h3>
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
                        {formatCurrency(shopifyStats.totalRevenue)}
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-midnight-teal border-none">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <TruckIcon className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm text-magnolia-white/70">Pending Orders</p>
                      <h3 className="text-2xl font-bold text-magnolia-white">{shopifyStats.pendingOrders}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-midnight-teal border-none">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                      <ArchiveBoxIcon className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm text-magnolia-white/70">Low Stock Items</p>
                      <h3 className="text-2xl font-bold text-magnolia-white">{shopifyStats.lowStockItems}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Store Actions */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <Badge className="bg-green-500 text-white">Connected</Badge>
                <span className="text-magnolia-white">midnight-magnolia.myshopify.com</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="bg-magnolia-white/10 border-none text-magnolia-white hover:bg-magnolia-white/20"
                >
                  <ArrowPathIcon className="w-4 h-4 mr-2" />
                  Sync Now
                </Button>
                <Button
                  variant="outline"
                  className="bg-magnolia-white/10 border-none text-magnolia-white hover:bg-magnolia-white/20"
                >
                  Open Shopify Admin
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-midnight-teal mb-6">
                <TabsTrigger
                  value="products"
                  className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                >
                  Products
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                >
                  Orders
                </TabsTrigger>
                <TabsTrigger
                  value="inventory"
                  className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                >
                  Inventory
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                >
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="products">
                <Card className="bg-midnight-teal border-none">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-magnolia-white">Physical Products</CardTitle>
                      <CardDescription className="text-magnolia-white/70">
                        Manage your Shopify physical products
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-magnolia-white/10 border-none text-magnolia-white hover:bg-magnolia-white/20"
                      >
                        <ArrowPathIcon className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                      <Button className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Add Product
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ShopifyProductList />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card className="bg-midnight-teal border-none">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-magnolia-white">Recent Orders</CardTitle>
                      <CardDescription className="text-magnolia-white/70">
                        View and manage your Shopify orders
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-magnolia-white/10 border-none text-magnolia-white hover:bg-magnolia-white/20"
                      >
                        <ArrowPathIcon className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-magnolia-white/10 border-none text-magnolia-white hover:bg-magnolia-white/20"
                      >
                        <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ShopifyOrderList />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="inventory">
                <Card className="bg-midnight-teal border-none">
                  <CardHeader>
                    <CardTitle className="text-magnolia-white">Inventory Management</CardTitle>
                    <CardDescription className="text-magnolia-white/70">
                      Track and update your product inventory
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ShopifyInventoryManager />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card className="bg-midnight-teal border-none">
                  <CardHeader>
                    <CardTitle className="text-magnolia-white">Shopify Settings</CardTitle>
                    <CardDescription className="text-magnolia-white/70">
                      Configure your Shopify integration settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-magnolia-white mb-4">API Connection</h3>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="shop-url" className="text-magnolia-white">
                              Shop URL
                            </Label>
                            <Input
                              id="shop-url"
                              value="midnight-magnolia.myshopify.com"
                              className="bg-midnight-blue/50 border-magnolia-white/20 text-magnolia-white"
                              readOnly
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="api-key" className="text-magnolia-white">
                              API Key
                            </Label>
                            <Input
                              id="api-key"
                              value="••••••••••••••••••••••••"
                              className="bg-midnight-blue/50 border-magnolia-white/20 text-magnolia-white"
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button
                            variant="outline"
                            className="bg-magnolia-white/10 border-none text-magnolia-white hover:bg-magnolia-white/20"
                          >
                            Regenerate API Credentials
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-magnolia-white mb-4">Sync Settings</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="auto-sync" className="text-magnolia-white">
                                Auto Sync
                              </Label>
                              <p className="text-sm text-magnolia-white/70">
                                Automatically sync products and orders every hour
                              </p>
                            </div>
                            <input
                              type="checkbox"
                              id="auto-sync"
                              defaultChecked={true}
                              className="w-4 h-4 rounded border-2 border-magnolia-white/30 bg-transparent checked:bg-rich-gold checked:border-rich-gold"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="sync-inventory" className="text-magnolia-white">
                                Sync Inventory
                              </Label>
                              <p className="text-sm text-magnolia-white/70">
                                Keep inventory in sync between Shopify and Midnight Magnolia
                              </p>
                            </div>
                            <input
                              type="checkbox"
                              id="sync-inventory"
                              defaultChecked={true}
                              className="w-4 h-4 rounded border-2 border-magnolia-white/30 bg-transparent checked:bg-rich-gold checked:border-rich-gold"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="sync-orders" className="text-magnolia-white">
                                Sync Orders
                              </Label>
                              <p className="text-sm text-magnolia-white/70">
                                Keep orders in sync between Shopify and Midnight Magnolia
                              </p>
                            </div>
                            <input
                              type="checkbox"
                              id="sync-orders"
                              defaultChecked={true}
                              className="w-4 h-4 rounded border-2 border-magnolia-white/30 bg-transparent checked:bg-rich-gold checked:border-rich-gold"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-magnolia-white mb-4">Notification Settings</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="order-notifications" className="text-magnolia-white">
                                Order Notifications
                              </Label>
                              <p className="text-sm text-magnolia-white/70">Receive notifications for new orders</p>
                            </div>
                            <input
                              type="checkbox"
                              id="order-notifications"
                              defaultChecked={true}
                              className="w-4 h-4 rounded border-2 border-magnolia-white/30 bg-transparent checked:bg-rich-gold checked:border-rich-gold"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="inventory-alerts" className="text-magnolia-white">
                                Inventory Alerts
                              </Label>
                              <p className="text-sm text-magnolia-white/70">Receive alerts for low stock items</p>
                            </div>
                            <input
                              type="checkbox"
                              id="inventory-alerts"
                              defaultChecked={true}
                              className="w-4 h-4 rounded border-2 border-magnolia-white/30 bg-transparent checked:bg-rich-gold checked:border-rich-gold"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">Save Settings</Button>
                      </div>
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
