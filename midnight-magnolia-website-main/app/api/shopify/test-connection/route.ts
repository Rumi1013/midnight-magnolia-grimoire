import { type NextRequest, NextResponse } from "next/server"

// 🌸 Sacred Shopify configuration - using your correct credentials
const SHOPIFY_DOMAIN = "3ada30-b9.myshopify.com"
const SHOPIFY_STOREFRONT_TOKEN = "7d01fd6b53d40fa958e39a5f49fa0ea8"
const SHOPIFY_API_VERSION = "2024-01"

// 🌸 Simple shop info query to test connection
const SHOP_INFO_QUERY = `
  query getShop {
    shop {
      name
      description
      primaryDomain {
        host
      }
    }
  }
`

export async function GET(request: NextRequest) {
  try {
    console.log("🌙 Testing sacred Shopify connection...")
    console.log("Domain:", SHOPIFY_DOMAIN)
    console.log("Token preview:", SHOPIFY_STOREFRONT_TOKEN.substring(0, 8) + "...")

    const apiUrl = `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`
    console.log("🌸 Testing connection to:", apiUrl)

    // 🌿 Test the connection
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        "User-Agent": "Midnight-Magnolia-Store/1.0",
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify({
        query: SHOP_INFO_QUERY,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Shopify API Response Error:", response.status, errorText)

      let errorMessage = "Connection failed"
      if (response.status === 401) {
        errorMessage = "Invalid Storefront Access Token"
      } else if (response.status === 403) {
        errorMessage = "Access forbidden - check Storefront API permissions"
      } else if (response.status === 404) {
        errorMessage = `Shop not found: ${SHOPIFY_DOMAIN}`
      }

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
          message: `Failed to connect to ${SHOPIFY_DOMAIN}`,
          debug: {
            status: response.status,
            domain: SHOPIFY_DOMAIN,
            tokenPreview: SHOPIFY_STOREFRONT_TOKEN.substring(0, 8) + "...",
            errorText: errorText.substring(0, 200),
          },
        },
        { status: response.status },
      )
    }

    const data = await response.json()

    if (data.errors) {
      console.error("Shopify GraphQL Errors:", data.errors)
      return NextResponse.json(
        {
          success: false,
          error: "GraphQL errors",
          message: "API returned errors",
          debug: {
            errors: data.errors,
            domain: SHOPIFY_DOMAIN,
          },
        },
        { status: 400 },
      )
    }

    // 🌙 Success! Return shop info
    console.log("✨ Sacred connection established!")
    return NextResponse.json({
      success: true,
      message: "Sacred connection established! ✨",
      shop: data.data?.shop || null,
      connection: {
        domain: SHOPIFY_DOMAIN,
        tokenPreview: SHOPIFY_STOREFRONT_TOKEN.substring(0, 8) + "...",
        tokenType: "Storefront API",
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error: any) {
    console.error("💔 Sacred connection test error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Connection test failed",
        message: error.message || "Unable to test sacred connection",
        debug: {
          domain: SHOPIFY_DOMAIN,
          tokenPreview: SHOPIFY_STOREFRONT_TOKEN.substring(0, 8) + "...",
          timestamp: new Date().toISOString(),
          errorDetails: error.message,
        },
      },
      { status: 500 },
    )
  }
}
