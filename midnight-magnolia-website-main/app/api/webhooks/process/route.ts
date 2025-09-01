import { type NextRequest, NextResponse } from "next/server"
import { WebhookProcessor } from "@/lib/webhook-processor"

export async function POST(request: NextRequest) {
  try {
    // Start the webhook processor
    WebhookProcessor.start()

    return NextResponse.json({
      success: true,
      message: "Webhook processor started",
    })
  } catch (error: any) {
    console.error("Error starting webhook processor:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Stop the webhook processor
    WebhookProcessor.stop()

    return NextResponse.json({
      success: true,
      message: "Webhook processor stopped",
    })
  } catch (error: any) {
    console.error("Error stopping webhook processor:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
