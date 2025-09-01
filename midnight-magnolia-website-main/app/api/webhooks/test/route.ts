import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: "Webhook endpoint is working!",
    timestamp: new Date().toISOString(),
    url: request.url,
    ngrok_status: "active",
    environment: process.env.NODE_ENV,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headers = Object.fromEntries(request.headers.entries())

    console.log("Test webhook received:", {
      body: body.substring(0, 200) + (body.length > 200 ? "..." : ""),
      headers: {
        "x-shopify-hmac-sha256": headers["x-shopify-hmac-sha256"],
        "x-shopify-topic": headers["x-shopify-topic"],
        "x-shopify-shop-domain": headers["x-shopify-shop-domain"],
        "content-type": headers["content-type"],
      },
      bodyLength: body.length,
    })

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 100))

    return NextResponse.json({
      success: true,
      message: "Test webhook received successfully",
      timestamp: new Date().toISOString(),
      processed: true,
      webhook_topic: headers["x-shopify-topic"],
      shop_domain: headers["x-shopify-shop-domain"],
      body_size: body.length,
    })
  } catch (error: any) {
    console.error("Test webhook error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
