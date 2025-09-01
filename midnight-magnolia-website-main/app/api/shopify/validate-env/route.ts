import { NextResponse } from "next/server"

export async function GET() {
  try {
    // 🌙 Check all possible domain variables
    const domainVars = {
      SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
      SHOPIFY_SHOP_DOMAIN: process.env.SHOPIFY_SHOP_DOMAIN,
      PUBLIC_STORE_DOMAIN: process.env.PUBLIC_STORE_DOMAIN,
      SHOPIFY_DOMAIN: process.env.SHOPIFY_DOMAIN,
    }

    // 🌸 Check all possible token variables
    const tokenVars = {
      SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      PUBLIC_STOREFRONT_API_TOKEN: process.env.PUBLIC_STOREFRONT_API_TOKEN,
      STOREFRONT_API_ACCESS_TOKEN: process.env.STOREFRONT_API_ACCESS_TOKEN,
      SHOPIFY_STOREFRONT_TOKEN: process.env.SHOPIFY_STOREFRONT_TOKEN,
      STOREFRONT_TOKEN: process.env.STOREFRONT_TOKEN,
    }

    // Find the first available domain and token
    const domain = Object.values(domainVars).find(Boolean) || "3ada30-b9.myshopify.com"
    const token = Object.values(tokenVars).find(Boolean)

    const issues = []
    let valid = true

    // Check domain
    const cleanDomain = domain.replace(/^https?:\/\//, "").replace(/\/$/, "")
    const finalDomain = cleanDomain.includes(".myshopify.com") ? cleanDomain : `${cleanDomain}.myshopify.com`

    if (!domain) {
      issues.push("No domain found in any environment variable")
      valid = false
    }

    // Check token
    if (!token) {
      issues.push("No Storefront Access Token found in any environment variable")
      valid = false
    } else {
      if (token.length < 20) {
        issues.push(`Token appears too short: ${token.length} characters`)
        valid = false
      }

      if (token.startsWith("shpat_")) {
        issues.push("Token appears to be Admin API token (should be Storefront API)")
        valid = false
      }
    }

    return NextResponse.json({
      valid,
      issues,
      foundVariables: {
        domain: {
          found: Object.entries(domainVars)
            .filter(([_, value]) => !!value)
            .map(([key]) => key),
          using: finalDomain,
        },
        token: {
          found: Object.entries(tokenVars)
            .filter(([_, value]) => !!value)
            .map(([key]) => key),
          length: token ? token.length : 0,
          type: token ? (token.startsWith("shpat_") ? "Admin API" : "Storefront API") : "None",
        },
      },
      recommendations: {
        domain: "Set SHOPIFY_STORE_DOMAIN=3ada30-b9.myshopify.com",
        token: "Set SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_token_here",
      },
      maskedValues: {
        domain: finalDomain,
        token: token ? `${token.substring(0, 4)}***${token.substring(token.length - 4)}` : "Not set",
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        valid: false,
        issues: [`Validation error: ${error.message}`],
        error: true,
      },
      { status: 500 },
    )
  }
}
