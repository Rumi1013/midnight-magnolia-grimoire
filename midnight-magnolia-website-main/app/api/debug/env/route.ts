import { NextResponse } from "next/server"
import { ENV } from "@/lib/env"

export async function GET() {
  try {
    // Safe environment variable inspection
    const envVars = {
      SITE_URL: ENV.SITE_URL,
      NODE_ENV: ENV.NODE_ENV,
      IS_PRODUCTION: ENV.IS_PRODUCTION,
      HAS_SHOPIFY_DOMAIN: !!ENV.SHOPIFY_DOMAIN,
      HAS_SHOPIFY_TOKEN: !!ENV.SHOPIFY_TOKEN,
      HAS_SUPABASE_URL: !!ENV.SUPABASE_URL,
      HAS_SUPABASE_KEY: !!ENV.SUPABASE_ANON_KEY,
      // Show first/last 4 characters of sensitive values
      SHOPIFY_DOMAIN_PREVIEW: ENV.SHOPIFY_DOMAIN
        ? `${ENV.SHOPIFY_DOMAIN.substring(0, 4)}...${ENV.SHOPIFY_DOMAIN.substring(ENV.SHOPIFY_DOMAIN.length - 4)}`
        : "Not set",
      SHOPIFY_TOKEN_LENGTH: ENV.SHOPIFY_TOKEN?.length || 0,
    }

    return NextResponse.json({
      success: true,
      message: "Sacred environment inspection complete ✨",
      environment: envVars,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Environment inspection failed",
        message: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
