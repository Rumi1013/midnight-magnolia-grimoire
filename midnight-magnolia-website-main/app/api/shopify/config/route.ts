import { type NextRequest, NextResponse } from "next/server"

// Mock configuration - in production, this would be stored in your database
let shopifyConfig = {
  domain: process.env.SHOPIFY_STORE_DOMAIN || "3ada30-b9.myshopify.com",
  storefrontToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "7d01fd6b53d40fa958e39a5f49fa0ea8",
  adminToken: process.env.SHOPIFY_ADMIN_API || "",
  webhookSecret: process.env.SHOPIFY_WEBHOOK_SECRET || "",
  isConfigured: !!(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN),
  connectionStatus: "disconnected" as const,
}

export async function GET() {
  try {
    // Test connection status
    let connectionStatus: "connected" | "error" | "disconnected" = "disconnected"
    let shop = null

    if (shopifyConfig.domain && shopifyConfig.storefrontToken) {
      try {
        const testResponse = await fetch(`https://${shopifyConfig.domain}/api/2024-01/graphql.json`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": shopifyConfig.storefrontToken,
          },
          body: JSON.stringify({
            query: `
              query {
                shop {
                  name
                  primaryDomain { host }
                  currencyCode
                  timezoneAbbreviation
                }
              }
            `,
          }),
        })

        if (testResponse.ok) {
          const data = await testResponse.json()
          if (data.data?.shop) {
            connectionStatus = "connected"
            shop = {
              name: data.data.shop.name,
              email: "shop@example.com", // Would come from admin API
              domain: data.data.shop.primaryDomain.host,
              currency: data.data.shop.currencyCode,
              timezone: data.data.shop.timezoneAbbreviation,
              plan: "Basic Shopify", // Would come from admin API
            }
          }
        } else {
          connectionStatus = "error"
        }
      } catch (error) {
        connectionStatus = "error"
      }
    }

    // Mock product sync data
    const productSync = {
      totalProducts: 14, // Your physical + digital products
      syncedProducts: connectionStatus === "connected" ? 14 : 0,
      lastSync: connectionStatus === "connected" ? new Date().toISOString() : "",
      errors: connectionStatus === "error" ? ["Connection failed - check credentials"] : [],
    }

    return NextResponse.json({
      success: true,
      config: {
        ...shopifyConfig,
        connectionStatus,
        shop,
      },
      productSync,
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const updates = await request.json()

    // Update configuration
    shopifyConfig = {
      ...shopifyConfig,
      ...updates,
      isConfigured: !!(updates.domain && updates.storefrontToken),
    }

    // In production, save to database here
    console.log("🌙 Shopify configuration updated:", {
      domain: shopifyConfig.domain,
      hasStorefrontToken: !!shopifyConfig.storefrontToken,
      hasAdminToken: !!shopifyConfig.adminToken,
      hasWebhookSecret: !!shopifyConfig.webhookSecret,
    })

    return NextResponse.json({
      success: true,
      config: shopifyConfig,
      message: "Sacred configuration saved successfully! ✨",
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
