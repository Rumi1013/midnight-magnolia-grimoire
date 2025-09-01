import { NextResponse } from "next/server"
import { ShopifyDatabase } from "@/lib/database"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const days = Number.parseInt(searchParams.get("days") || "30")

    // Validate days parameter
    if (isNaN(days) || days < 1 || days > 365) {
      return NextResponse.json({ error: "Invalid days parameter" }, { status: 400 })
    }

    // Get analytics data with error handling
    const [orderStats, topProducts, lowStockItems, webhookStats, recentOrders] = await Promise.allSettled([
      ShopifyDatabase.getOrderStats(days),
      ShopifyDatabase.getTopProducts(10),
      ShopifyDatabase.getLowStockItems(5),
      ShopifyDatabase.getWebhookStats(),
      ShopifyDatabase.getRecentOrders(10),
    ])

    return NextResponse.json({
      orderStats:
        orderStats.status === "fulfilled"
          ? orderStats.value
          : { total_orders: 0, total_revenue: 0, average_order_value: 0 },
      topProducts: topProducts.status === "fulfilled" ? topProducts.value : [],
      lowStockItems: lowStockItems.status === "fulfilled" ? lowStockItems.value : [],
      webhookStats: webhookStats.status === "fulfilled" ? webhookStats.value : [],
      recentOrders: recentOrders.status === "fulfilled" ? recentOrders.value : [],
      period: `${days} days`,
    })
  } catch (error: any) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics data" }, { status: 500 })
  }
}
