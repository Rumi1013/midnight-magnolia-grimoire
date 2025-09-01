"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EyeIcon, PrinterIcon, TruckIcon } from "@heroicons/react/24/outline"

interface ShopifyOrder {
  id: string
  orderNumber: string
  date: string
  customer: string
  email: string
  total: number
  paymentStatus: "paid" | "pending" | "refunded"
  fulfillmentStatus: "fulfilled" | "unfulfilled" | "partially_fulfilled"
  items: number
}

export default function ShopifyOrderList() {
  const [orders, setOrders] = useState<ShopifyOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch Shopify orders
    setTimeout(() => {
      const mockOrders: ShopifyOrder[] = [
        {
          id: "gid://shopify/Order/1234567890",
          orderNumber: "#1001",
          date: "2023-06-07T14:23:45Z",
          customer: "Maya Johnson",
          email: "maya@example.com",
          total: 64.98,
          paymentStatus: "paid",
          fulfillmentStatus: "unfulfilled",
          items: 2,
        },
        {
          id: "gid://shopify/Order/2345678901",
          orderNumber: "#1002",
          date: "2023-06-07T12:15:22Z",
          customer: "Jasmine Williams",
          email: "jasmine@example.com",
          total: 29.99,
          paymentStatus: "paid",
          fulfillmentStatus: "fulfilled",
          items: 1,
        },
        {
          id: "gid://shopify/Order/3456789012",
          orderNumber: "#1003",
          date: "2023-06-06T10:05:17Z",
          customer: "Zara Thompson",
          email: "zara@example.com",
          total: 87.97,
          paymentStatus: "pending",
          fulfillmentStatus: "unfulfilled",
          items: 3,
        },
        {
          id: "gid://shopify/Order/4567890123",
          orderNumber: "#1004",
          date: "2023-06-05T18:45:33Z",
          customer: "Kimberly Davis",
          email: "kimberly@example.com",
          total: 45.98,
          paymentStatus: "paid",
          fulfillmentStatus: "partially_fulfilled",
          items: 2,
        },
        {
          id: "gid://shopify/Order/5678901234",
          orderNumber: "#1005",
          date: "2023-06-05T09:30:12Z",
          customer: "Alexis Carter",
          email: "alexis@example.com",
          total: 22.99,
          paymentStatus: "refunded",
          fulfillmentStatus: "fulfilled",
          items: 1,
        },
      ]
      setOrders(mockOrders)
      setIsLoading(false)
    }, 1000)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500/20 text-green-500"
      case "pending":
        return "bg-yellow-500/20 text-yellow-500"
      case "refunded":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  const getFulfillmentStatusColor = (status: string) => {
    switch (status) {
      case "fulfilled":
        return "bg-green-500/20 text-green-500"
      case "unfulfilled":
        return "bg-yellow-500/20 text-yellow-500"
      case "partially_fulfilled":
        return "bg-blue-500/20 text-blue-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rich-gold"></div>
      </div>
    )
  }

  return (
    <div className="rounded-md border border-magnolia-white/10">
      <div className="grid grid-cols-7 gap-4 p-4 bg-midnight-blue/50 text-magnolia-white/70 text-sm font-montserrat">
        <div>Order</div>
        <div>Date</div>
        <div>Customer</div>
        <div>Total</div>
        <div>Payment</div>
        <div>Fulfillment</div>
        <div>Actions</div>
      </div>
      <div className="divide-y divide-magnolia-white/10">
        {orders.map((order) => (
          <div key={order.id} className="grid grid-cols-7 gap-4 p-4 text-magnolia-white items-center">
            <div className="flex flex-col">
              <span className="font-medium">{order.orderNumber}</span>
              <span className="text-xs text-magnolia-white/60">{order.items} items</span>
            </div>
            <div className="text-sm">{formatDate(order.date)}</div>
            <div className="flex flex-col">
              <span className="font-medium">{order.customer}</span>
              <span className="text-xs text-magnolia-white/60">{order.email}</span>
            </div>
            <div className="text-sm font-medium">{formatCurrency(order.total)}</div>
            <div>
              <Badge className={`${getPaymentStatusColor(order.paymentStatus)}`}>
                {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
              </Badge>
            </div>
            <div>
              <Badge className={`${getFulfillmentStatusColor(order.fulfillmentStatus)}`}>
                {order.fulfillmentStatus
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-magnolia-white/10 border-none text-magnolia-white hover:bg-magnolia-white/20 h-8 w-8 p-0"
              >
                <EyeIcon className="w-4 h-4" />
                <span className="sr-only">View</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-magnolia-white/10 border-none text-magnolia-white hover:bg-magnolia-white/20 h-8 w-8 p-0"
              >
                <PrinterIcon className="w-4 h-4" />
                <span className="sr-only">Print</span>
              </Button>
              {order.fulfillmentStatus !== "fulfilled" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-green-500/10 border-none text-green-400 hover:bg-green-500/20 h-8 w-8 p-0"
                >
                  <TruckIcon className="w-4 h-4" />
                  <span className="sr-only">Fulfill</span>
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
