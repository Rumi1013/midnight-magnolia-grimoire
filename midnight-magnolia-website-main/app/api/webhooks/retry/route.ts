import { type NextRequest, NextResponse } from "next/server"
import { WebhookQueue } from "@/lib/webhook-queue"

export async function POST(request: NextRequest) {
  try {
    const { jobId } = await request.json()

    if (!jobId) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 })
    }

    const retriedJob = await WebhookQueue.retryJob(jobId)

    if (!retriedJob) {
      return NextResponse.json({ error: "Job not found or cannot be retried" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Job queued for retry",
      job: retriedJob,
    })
  } catch (error: any) {
    console.error("Error retrying webhook job:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    const failedJobs = await WebhookQueue.getFailedJobs(limit)
    const queueStats = await WebhookQueue.getQueueStats()

    return NextResponse.json({
      success: true,
      failedJobs,
      queueStats,
    })
  } catch (error: any) {
    console.error("Error getting failed webhook jobs:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
