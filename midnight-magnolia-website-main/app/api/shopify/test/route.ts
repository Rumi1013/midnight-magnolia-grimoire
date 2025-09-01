import { type NextRequest, NextResponse } from "next/server"
import { ENV } from "@/lib/env"

export async function GET(request: NextRequest) {
  try {
    // Use safe environment variable access
    const domain = ENV.SHOPIFY_DOMAIN
    const token = ENV.SHOPIFY_TOKEN

    return NextResponse.json({
      success: true,
      message: "Sacred Shopify test successful ✨",
      config: {
        hasDomain: !!domain,
        hasToken: !!token,
        domain: domain ? `${domain.substring(0, 10)}...` : "Not set",
        tokenLength: token?.length || 0,
        siteUrl: ENV.SITE_URL,
        environment: ENV.NODE_ENV,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Shopify test error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Test failed",
        message: error.message || "Unknown error occurred",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 200 })
}
