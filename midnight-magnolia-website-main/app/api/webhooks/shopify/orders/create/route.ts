import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { WebhookQueue } from "@/lib/webhook-queue"

// Verify Shopify webhook signature
function verifyShopifyWebhook(body: string, signature: string): boolean {
  const webhookSecret = process.env.SHOPIFY_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error("SHOPIFY_WEBHOOK_SECRET not configured")
    return false
  }

  const hmac = crypto.createHmac("sha256", webhookSecret)
  hmac.update(body, "utf8")
  const calculatedSignature = hmac.digest("base64")

  return crypto.timingSafeEqual(Buffer.from(signature, "base64"), Buffer.from(calculatedSignature, "base64"))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-shopify-hmac-sha256")

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 })
    }

    // Verify webhook authenticity
    if (!verifyShopifyWebhook(body, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const orderData = JSON.parse(body)

    // Add to webhook queue for reliable processing
    await WebhookQueue.enqueue("orders/create", orderData.id.toString(), orderData)

    // Return success immediately - processing happens asynchronously
    return NextResponse.json({ success: true, message: "Webhook queued for processing" })
  } catch (error: any) {
    console.error("Error queuing order webhook:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
