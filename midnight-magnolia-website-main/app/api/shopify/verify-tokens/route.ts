import { NextResponse } from "next/server"

// 🌙 Check all possible Shopify token environment variables
const TOKEN_VARIABLES = {
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  PUBLIC_STOREFRONT_API_TOKEN: process.env.PUBLIC_STOREFRONT_API_TOKEN,
  SHOPIFY_ADMIN_API: process.env.SHOPIFY_ADMIN_API,
  SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
  // Domain variables
  SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
  SHOPIFY_SHOP_DOMAIN: process.env.SHOPIFY_SHOP_DOMAIN,
  SHOPIFY_STOREFRONT_ADMIN: process.env.SHOPIFY_STOREFRONT_ADMIN,
}

// 🌸 Test Storefront API access
async function testStorefrontAccess(domain: string, token: string) {
  try {
    const cleanDomain = domain.replace("https://", "").replace("http://", "").replace(/\/$/, "")

    const testQuery = `
      query {
        shop {
          name
          description
          primaryDomain {
            url
          }
        }
      }
    `

    const response = await fetch(`https://${cleanDomain}/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query: testQuery }),
    })

    const data = await response.json()

    return {
      success: response.ok && !data.errors,
      status: response.status,
      data: data,
      errors: data.errors || null,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    }
  }
}

export async function GET() {
  try {
    // 🌿 Analyze current token configuration
    const tokenAnalysis = Object.entries(TOKEN_VARIABLES).map(([key, value]) => ({
      variable: key,
      hasValue: !!value,
      valueLength: value ? value.length : 0,
      preview: value ? `${value.substring(0, 8)}...${value.substring(value.length - 4)}` : null,
      type: key.includes("STOREFRONT")
        ? "storefront"
        : key.includes("ADMIN")
          ? "admin"
          : key.includes("DOMAIN")
            ? "domain"
            : "other",
    }))

    // 🌙 Find the best domain and token combination
    const domains = [
      process.env.SHOPIFY_STORE_DOMAIN,
      process.env.SHOPIFY_SHOP_DOMAIN,
      process.env.SHOPIFY_STOREFRONT_ADMIN?.replace("https://", "").replace("http://", ""),
    ].filter(Boolean)

    const storefrontTokens = [
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      process.env.PUBLIC_STOREFRONT_API_TOKEN,
    ].filter(Boolean)

    const testResults = []

    // 🌸 Test each domain/token combination
    for (const domain of domains) {
      for (const token of storefrontTokens) {
        if (domain && token) {
          const result = await testStorefrontAccess(domain, token)
          testResults.push({
            domain,
            token: `${token.substring(0, 8)}...${token.substring(token.length - 4)}`,
            ...result,
          })
        }
      }
    }

    // 🌿 Generate recommendations
    const recommendations = []

    if (domains.length === 0) {
      recommendations.push({
        type: "error",
        message: 'No shop domain found. Set SHOPIFY_STORE_DOMAIN to your shop domain (e.g., "your-shop.myshopify.com")',
      })
    }

    if (storefrontTokens.length === 0) {
      recommendations.push({
        type: "error",
        message: "No Storefront Access Token found. Generate one in your Shopify Admin → Apps → Manage private apps",
      })
    }

    const workingConnection = testResults.find((r) => r.success)
    if (workingConnection) {
      recommendations.push({
        type: "success",
        message: `Working connection found with domain: ${workingConnection.domain}`,
      })
    } else if (testResults.length > 0) {
      recommendations.push({
        type: "warning",
        message: "No working connections found. Check your tokens and domain configuration.",
      })
    }

    return NextResponse.json({
      success: true,
      tokenAnalysis,
      testResults,
      recommendations,
      currentConfig: {
        primaryDomain: domains[0] || "Not set",
        primaryToken: storefrontTokens[0] ? `${storefrontTokens[0].substring(0, 8)}...` : "Not set",
        hasWorkingConnection: !!workingConnection,
      },
      instructions: {
        storefrontToken: {
          description: "Storefront Access Token for public product access",
          howToGenerate: [
            "1. Go to your Shopify Admin",
            "2. Navigate to Apps → App and sales channel settings",
            "3. Click 'Develop apps' → 'Create an app'",
            "4. Configure Storefront API access",
            "5. Generate Storefront access token",
            "6. Set SHOPIFY_STOREFRONT_ACCESS_TOKEN in your environment",
          ],
        },
        domain: {
          description: "Your shop's domain",
          format: "your-shop-name.myshopify.com",
          variable: "SHOPIFY_STORE_DOMAIN",
        },
      },
    })
  } catch (error: any) {
    console.error("Token verification error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        tokenAnalysis: Object.entries(TOKEN_VARIABLES).map(([key, value]) => ({
          variable: key,
          hasValue: !!value,
          type: key.includes("STOREFRONT")
            ? "storefront"
            : key.includes("ADMIN")
              ? "admin"
              : key.includes("DOMAIN")
                ? "domain"
                : "other",
        })),
      },
      { status: 500 },
    )
  }
}
