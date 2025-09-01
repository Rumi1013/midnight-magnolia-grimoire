import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET(request: NextRequest) {
  const healthChecks = {
    timestamp: new Date().toISOString(),
    ngrok_tunnel: "unknown",
    database: "unknown",
    webhook_secret: "unknown",
    environment_vars: "unknown",
  }

  try {
    // Check ngrok tunnel
    const ngrokUrl = "https://accepted-coyote-vertically.ngrok-free.app"
    try {
      const ngrokResponse = await fetch(`${ngrokUrl}/api/webhooks/test`, {
        method: "GET",
        signal: AbortSignal.timeout(5000),
      })
      healthChecks.ngrok_tunnel = ngrokResponse.ok ? "healthy" : "unhealthy"
    } catch (error) {
      healthChecks.ngrok_tunnel = "unreachable"
    }

    // Check database connection
    try {
      if (process.env.POSTGRES_URL) {
        const sql = neon(process.env.POSTGRES_URL)
        await sql`SELECT 1`
        healthChecks.database = "healthy"
      } else {
        healthChecks.database = "no_connection_string"
      }
    } catch (error) {
      healthChecks.database = "connection_failed"
    }

    // Check webhook secret
    healthChecks.webhook_secret = process.env.SHOPIFY_WEBHOOK_SECRET ? "configured" : "missing"

    // Check environment variables
    const requiredVars = ["POSTGRES_URL", "SHOPIFY_WEBHOOK_SECRET"]
    const missingVars = requiredVars.filter((varName) => !process.env[varName])
    healthChecks.environment_vars = missingVars.length === 0 ? "complete" : `missing: ${missingVars.join(", ")}`

    const allHealthy = Object.values(healthChecks).every(
      (status) => status === "healthy" || status === "configured" || status === "complete",
    )

    return NextResponse.json({
      success: allHealthy,
      status: allHealthy ? "healthy" : "degraded",
      checks: healthChecks,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        status: "error",
        error: error.message,
        checks: healthChecks,
      },
      { status: 500 },
    )
  }
}
