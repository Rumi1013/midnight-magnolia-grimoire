import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { WebhookQueue } from "@/lib/webhook-queue"

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

    const orderData = JSON.parse(body)

    // Add to webhook queue for reliable processing
    await WebhookQueue.enqueue("orders/updated", orderData.id.toString(), orderData)

    return NextResponse.json({ success: true, message: "Webhook queued for processing" })
  } catch (error: any) {
    console.error("Error queuing order update webhook:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
