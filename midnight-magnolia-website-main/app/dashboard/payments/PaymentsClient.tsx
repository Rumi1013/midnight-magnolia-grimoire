"use client"

import { useState, useEffect } from "react"
import {
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  UserGroupIcon,
  SparklesIcon,
  CreditCardIcon,
  ArrowPathIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/24/outline"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import StripeSetupForm from "./StripeSetupForm"
import PaymentMethodForm from "./PaymentMethodForm"

interface Transaction {
  id: string
  date: string
  customer: string
  amount: number
  status: "completed" | "pending" | "failed"
  product: string
  paymentMethod: string
}

interface Product {
  id: string
  name: string
  price: number
  type: "one-time" | "subscription"
  interval?: "monthly" | "yearly"
  status: "active" | "draft"
}

export default function PaymentsClient() {
  const [activeTab, setActiveTab] = useState("transactions")
  const [isStripeConnected, setIsStripeConnected] = useState(false)
  const [isTestMode, setIsTestMode] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to check Stripe connection status
    setTimeout(() => {
      setIsStripeConnected(false)
      setIsLoading(false)
    }, 1000)

    // Simulate fetching transactions
    const mockTransactions: Transaction[] = [
      {
        id: "txn_1NjK8d2eZvKYlo2C9u7HH2Bq",
        date: "2023-06-08T14:23:45Z",
        customer: "Maya Johnson",
        amount: 29.99,
        status: "completed",
        product: "The Magnolia Reset Journal",
        paymentMethod: "Visa •••• 4242",
      },
      {
        id: "txn_1NjJ5d2eZvKYlo2C8m6FF1Ap",
        date: "2023-06-08T12:15:22Z",
        customer: "Jasmine Williams",
        amount: 19.99,
        status: "completed",
        product: "Midnight Messages Tarot Deck",
        paymentMethod: "Apple Pay",
      },
      {
        id: "txn_1NjH2d2eZvKYlo2C7k5EE0Zo",
        date: "2023-06-08T10:05:17Z",
        customer: "Zara Thompson",
        amount: 47.99,
        status: "pending",
        product: "Sacred Productivity Planner",
        paymentMethod: "Mastercard •••• 5555",
      },
      {
        id: "txn_1NjF1d2eZvKYlo2C6j4DD9Yn",
        date: "2023-06-07T18:45:33Z",
        customer: "Kimberly Davis",
        amount: 35.0,
        status: "failed",
        product: "Ancestral Wisdom Journal",
        paymentMethod: "Visa •••• 1234",
      },
    ]
    setTransactions(mockTransactions)

    // Simulate fetching products
    const mockProducts: Product[] = [
      {
        id: "prod_OX4aJPtpfqYeZU",
        name: "The Magnolia Reset Journal",
        price: 29.99,
        type: "one-time",
        status: "active",
      },
      {
        id: "prod_OX4bKQtpgqZfAV",
        name: "Midnight Messages Tarot Deck",
        price: 19.99,
        type: "one-time",
        status: "active",
      },
      {
        id: "prod_OX4cLRtphraGbW",
        name: "Sacred Productivity Planner",
        price: 47.99,
        type: "subscription",
        interval: "monthly",
        status: "active",
      },
      {
        id: "prod_OX4dMStpiscHcX",
        name: "Ancestral Wisdom Journal",
        price: 35.0,
        type: "one-time",
        status: "draft",
      },
    ]
    setProducts(mockProducts)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-500"
      case "pending":
        return "bg-yellow-500/20 text-yellow-500"
      case "failed":
        return "bg-red-500/20 text-red-500"
      case "active":
        return "bg-green-500/20 text-green-500"
      case "draft":
        return "bg-gray-500/20 text-gray-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

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
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-magnolia-white/15 text-rich-gold"
              >
                <CreditCardIcon className="w-5 h-5" />
                <span className="font-lora">Payments</span>
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

        {/* Payment Stats */}
        <div className="bg-midnight-blue/50 p-4 rounded-lg">
          <h3 className="font-montserrat text-sm font-semibold text-magnolia-white mb-3 uppercase tracking-wider">
            Payment Stats
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-magnolia-white/70 text-sm">Today</span>
              <span className="text-magnolia-white font-semibold">$49.98</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-magnolia-white/70 text-sm">This Week</span>
              <span className="text-magnolia-white font-semibold">$132.97</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-magnolia-white/70 text-sm">This Month</span>
              <span className="text-magnolia-white font-semibold">$587.45</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-80 p-6">
        {/* Header */}
        <header className="mb-8">
          <h1 className="font-playfair text-3xl font-bold text-magnolia-white mb-2">Payment Management</h1>
          <p className="font-montserrat text-sage-green">
            Process payments, manage subscriptions, and track transactions
          </p>
        </header>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rich-gold"></div>
          </div>
        ) : !isStripeConnected ? (
          <div className="bg-midnight-teal p-8 rounded-lg">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rich-gold/20 mb-4">
                <CreditCardIcon className="w-8 h-8 text-rich-gold" />
              </div>
              <h2 className="font-playfair text-2xl font-bold text-magnolia-white mb-2">Connect Stripe Account</h2>
              <p className="font-lora text-magnolia-white/80 max-w-lg mx-auto">
                To start accepting payments for your digital products, connect your Stripe account. Stripe provides
                secure payment processing for one-time purchases and subscriptions.
              </p>
            </div>

            <StripeSetupForm onConnect={() => setIsStripeConnected(true)} />
          </div>
        ) : (
          <>
            {/* Mode Toggle */}
            <div className="flex items-center justify-end mb-6">
              <div className="flex items-center gap-3 bg-midnight-teal px-4 py-2 rounded-lg">
                <span className="text-sm font-montserrat text-magnolia-white">Test Mode</span>
                <Switch
                  checked={isTestMode}
                  onCheckedChange={setIsTestMode}
                  className="data-[state=checked]:bg-rich-gold"
                />
                <span
                  className={`text-xs font-montserrat px-2 py-1 rounded ${
                    isTestMode ? "bg-yellow-500/20 text-yellow-500" : "bg-green-500/20 text-green-500"
                  }`}
                >
                  {isTestMode ? "TEST" : "LIVE"}
                </span>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="transactions" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-midnight-teal mb-6">
                <TabsTrigger
                  value="transactions"
                  className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                >
                  Transactions
                </TabsTrigger>
                <TabsTrigger
                  value="products"
                  className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                >
                  Products
                </TabsTrigger>
                <TabsTrigger
                  value="payment-methods"
                  className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                >
                  Payment Methods
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
                >
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="transactions">
                <Card className="bg-midnight-teal border-none">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-magnolia-white">Recent Transactions</CardTitle>
                      <CardDescription className="text-magnolia-white/70">
                        View and manage your payment transactions
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
                    <div className="rounded-md border border-magnolia-white/10">
                      <div className="grid grid-cols-7 gap-4 p-4 bg-midnight-blue/50 text-magnolia-white/70 text-sm font-montserrat">
                        <div>Date</div>
                        <div>Transaction ID</div>
                        <div>Customer</div>
                        <div>Product</div>
                        <div>Amount</div>
                        <div>Payment Method</div>
                        <div>Status</div>
                      </div>
                      <div className="divide-y divide-magnolia-white/10">
                        {transactions.map((transaction) => (
                          <div key={transaction.id} className="grid grid-cols-7 gap-4 p-4 text-magnolia-white">
                            <div className="text-sm">{formatDate(transaction.date)}</div>
                            <div className="text-sm font-mono">{transaction.id.substring(0, 14)}...</div>
                            <div className="text-sm">{transaction.customer}</div>
                            <div className="text-sm">{transaction.product}</div>
                            <div className="text-sm">{formatCurrency(transaction.amount)}</div>
                            <div className="text-sm">{transaction.paymentMethod}</div>
                            <div>
                              <span className={`px-2 py-1 rounded text-xs ${getStatusColor(transaction.status)}`}>
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="products">
                <Card className="bg-midnight-teal border-none">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-magnolia-white">Payment Products</CardTitle>
                      <CardDescription className="text-magnolia-white/70">
                        Manage your products and pricing
                      </CardDescription>
                    </div>
                    <Button className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border border-magnolia-white/10">
                      <div className="grid grid-cols-6 gap-4 p-4 bg-midnight-blue/50 text-magnolia-white/70 text-sm font-montserrat">
                        <div>Product</div>
                        <div>ID</div>
                        <div>Price</div>
                        <div>Type</div>
                        <div>Status</div>
                        <div>Actions</div>
                      </div>
                      <div className="divide-y divide-magnolia-white/10">
                        {products.map((product) => (
                          <div key={product.id} className="grid grid-cols-6 gap-4 p-4 text-magnolia-white">
                            <div className="text-sm font-medium">{product.name}</div>
                            <div className="text-sm font-mono">{product.id}</div>
                            <div className="text-sm">{formatCurrency(product.price)}</div>
                            <div className="text-sm">
                              {product.type === "subscription" ? `Subscription (${product.interval})` : "One-time"}
                            </div>
                            <div>
                              <span className={`px-2 py-1 rounded text-xs ${getStatusColor(product.status)}`}>
                                {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-magnolia-white/10 border-none text-magnolia-white hover:bg-magnolia-white/20"
                              >
                                <EyeIcon className="w-4 h-4" />
                                <span className="sr-only">View</span>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-magnolia-white/10 border-none text-magnolia-white hover:bg-magnolia-white/20"
                              >
                                <PencilIcon className="w-4 h-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment-methods">
                <Card className="bg-midnight-teal border-none">
                  <CardHeader>
                    <CardTitle className="text-magnolia-white">Payment Methods</CardTitle>
                    <CardDescription className="text-magnolia-white/70">
                      Configure how you accept payments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-midnight-blue/30 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-[#635BFF]"
                              >
                                <path d="M2 12h20" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="font-semibold text-magnolia-white">Stripe</h3>
                              <p className="text-sm text-magnolia-white/70">Connected</p>
                            </div>
                          </div>
                          <div>
                            <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-500">Active</span>
                          </div>
                        </div>
                        <div className="text-sm text-magnolia-white/70 mb-4">
                          Your Stripe account is connected and ready to process payments. You can manage your Stripe
                          settings and view detailed reports in the Stripe dashboard.
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-magnolia-white/10 border-none text-magnolia-white hover:bg-magnolia-white/20"
                          >
                            View Stripe Dashboard
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-magnolia-white/10 border-none text-magnolia-white hover:bg-magnolia-white/20"
                          >
                            Reconnect
                          </Button>
                        </div>
                      </div>

                      <PaymentMethodForm />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card className="bg-midnight-teal border-none">
                  <CardHeader>
                    <CardTitle className="text-magnolia-white">Payment Settings</CardTitle>
                    <CardDescription className="text-magnolia-white/70">
                      Configure your payment preferences and notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-magnolia-white mb-4">General Settings</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="test-mode" className="text-magnolia-white">
                                Test Mode
                              </Label>
                              <p className="text-sm text-magnolia-white/70">
                                Process test payments without charging real money
                              </p>
                            </div>
                            <Switch
                              id="test-mode"
                              checked={isTestMode}
                              onCheckedChange={setIsTestMode}
                              className="data-[state=checked]:bg-rich-gold"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="email-receipts" className="text-magnolia-white">
                                Email Receipts
                              </Label>
                              <p className="text-sm text-magnolia-white/70">Automatically send receipts to customers</p>
                            </div>
                            <Switch
                              id="email-receipts"
                              defaultChecked={true}
                              className="data-[state=checked]:bg-rich-gold"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="payment-notifications" className="text-magnolia-white">
                                Payment Notifications
                              </Label>
                              <p className="text-sm text-magnolia-white/70">Receive notifications for new payments</p>
                            </div>
                            <Switch
                              id="payment-notifications"
                              defaultChecked={true}
                              className="data-[state=checked]:bg-rich-gold"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-magnolia-white mb-4">Currency Settings</h3>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="currency" className="text-magnolia-white">
                              Default Currency
                            </Label>
                            <Select defaultValue="usd">
                              <SelectTrigger className="bg-midnight-blue/50 border-magnolia-white/20 text-magnolia-white">
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="usd">USD - US Dollar</SelectItem>
                                <SelectItem value="eur">EUR - Euro</SelectItem>
                                <SelectItem value="gbp">GBP - British Pound</SelectItem>
                                <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-magnolia-white mb-4">Webhook Settings</h3>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="webhook-url" className="text-magnolia-white">
                              Webhook URL
                            </Label>
                            <Input
                              id="webhook-url"
                              placeholder="https://your-site.com/api/webhooks/stripe"
                              className="bg-midnight-blue/50 border-magnolia-white/20 text-magnolia-white"
                            />
                            <p className="text-xs text-magnolia-white/70">
                              Stripe will send event notifications to this URL
                            </p>
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
