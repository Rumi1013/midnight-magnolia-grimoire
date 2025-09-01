import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface WebhookJob {
  id: string
  topic: string
  shopify_id: string
  payload: any
  status: "pending" | "processing" | "completed" | "failed"
  retry_count: number
  max_retries: number
  created_at: Date
  updated_at: Date
  error_message?: string
}

export class WebhookQueue {
  static async enqueue(topic: string, shopifyId: string, payload: any, maxRetries = 3): Promise<WebhookJob> {
    try {
      const result = await sql`
        INSERT INTO webhook_queue (topic, shopify_id, payload, status, retry_count, max_retries, created_at, updated_at)
        VALUES (${topic}, ${shopifyId}, ${JSON.stringify(payload)}, 'pending', 0, ${maxRetries}, NOW(), NOW())
        RETURNING *
      `
      return result[0] as WebhookJob
    } catch (error) {
      console.error("Error enqueuing webhook job:", error)
      throw error
    }
  }

  static async dequeue(): Promise<WebhookJob | null> {
    try {
      const result = await sql`
        UPDATE webhook_queue 
        SET status = 'processing', updated_at = NOW()
        WHERE id = (
          SELECT id FROM webhook_queue 
          WHERE status = 'pending' 
          ORDER BY created_at ASC 
          LIMIT 1
          FOR UPDATE SKIP LOCKED
        )
        RETURNING *
      `
      return (result[0] as WebhookJob) || null
    } catch (error) {
      console.error("Error dequeuing webhook job:", error)
      return null
    }
  }

  static async markCompleted(jobId: string): Promise<void> {
    try {
      await sql`
        UPDATE webhook_queue 
        SET status = 'completed', updated_at = NOW()
        WHERE id = ${jobId}
      `
    } catch (error) {
      console.error("Error marking job as completed:", error)
      throw error
    }
  }

  static async markFailed(jobId: string, errorMessage: string): Promise<void> {
    try {
      await sql`
        UPDATE webhook_queue 
        SET status = 'failed', error_message = ${errorMessage}, updated_at = NOW()
        WHERE id = ${jobId}
      `
    } catch (error) {
      console.error("Error marking job as failed:", error)
      throw error
    }
  }

  static async retryJob(jobId: string): Promise<WebhookJob | null> {
    try {
      const result = await sql`
        UPDATE webhook_queue 
        SET status = 'pending', retry_count = retry_count + 1, updated_at = NOW()
        WHERE id = ${jobId} AND retry_count < max_retries
        RETURNING *
      `
      return (result[0] as WebhookJob) || null
    } catch (error) {
      console.error("Error retrying webhook job:", error)
      return null
    }
  }

  static async getFailedJobs(limit: number): Promise<WebhookJob[]> {
    try {
      const result = await sql`
        SELECT * FROM webhook_queue 
        WHERE status = 'failed' 
        ORDER BY updated_at DESC 
        LIMIT ${limit}
      `
      return result as WebhookJob[]
    } catch (error) {
      console.error("Error getting failed jobs:", error)
      return []
    }
  }

  static async getQueueStats() {
    try {
      const result = await sql`
        SELECT 
          status,
          COUNT(*) as count
        FROM webhook_queue
        GROUP BY status
      `
      return result
    } catch (error) {
      console.error("Error getting queue stats:", error)
      return []
    }
  }
}
