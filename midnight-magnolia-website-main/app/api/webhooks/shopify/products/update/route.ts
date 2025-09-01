import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

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

    const productData = JSON.parse(body)
    await processProductUpdate(productData)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error processing product update webhook:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

async function processProductUpdate(productData: any) {
  console.log("Processing product update:", {
    productId: productData.id,
    title: productData.title,
    status: productData.status,
  })

  // Update product in database
  const updateData = {
    title: productData.title,
    description: productData.body_html,
    status: productData.status,
    tags: productData.tags?.split(",").map((tag: string) => tag.trim()) || [],
    updatedAt: new Date(),
  }

  // Here you would update your database
  // await db.products.update({ shopifyProductId: productData.id }, updateData)
}
