import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { ShopifyDatabase } from "@/lib/database"

function verifyShopifyWebhook(body: string, signature: string): boolean {
  const webhookSecret = process.env.SHOPIFY_WEBHOOK_SECRET
  if (!webhookSecret) return false

  const hmac = crypto.createHmac("sha256", webhookSecret)
  hmac.update(body, "utf8")
  const calculatedSignature = hmac.digest("base64")

  return crypto.timingSafeEqual(Buffer.from(signature, "base64"), Buffer.from(calculatedSignature, "base64"))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-shopify-hmac-sha256")

    if (!signature || !verifyShopifyWebhook(body, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const inventoryData = JSON.parse(body)
    await processInventoryUpdate(inventoryData)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error processing inventory update webhook:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

async function processInventoryUpdate(inventoryData: any) {
  try {
    // Log webhook received
    await ShopifyDatabase.logWebhook({
      webhookTopic: "inventory_levels/update",
      shopifyId: inventoryData.inventory_item_id.toString(),
      status: "success",
      payload: inventoryData,
      retryCount: 0,
    })

    // Update inventory in database
    await ShopifyDatabase.updateInventoryLevel(
      inventoryData.inventory_item_id.toString(),
      inventoryData.location_id.toString(),
      inventoryData.available,
    )

    console.log("Inventory updated in database")

    // Check for low stock alerts
    if (inventoryData.available <= 5) {
      await sendLowStockAlert(inventoryData)
    }
  } catch (error) {
    console.error("Error updating inventory:", error)

    // Log the error
    await ShopifyDatabase.logWebhook({
      webhookTopic: "inventory_levels/update",
      shopifyId: inventoryData.inventory_item_id.toString(),
      status: "failed",
      payload: inventoryData,
      errorMessage: error instanceof Error ? error.message : "Unknown error",
      retryCount: 0,
    })

    throw error
  }
}

async function sendLowStockAlert(inventoryData: any) {
  if (process.env.MAKE_WEBHOOK_URL) {
    try {
      await fetch(process.env.MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "low_stock_alert",
          inventory: {
            inventoryItemId: inventoryData.inventory_item_id,
            locationId: inventoryData.location_id,
            available: inventoryData.available,
          },
        }),
      })
    } catch (error) {
      console.error("Failed to send low stock alert:", error)
    }
  }
}
