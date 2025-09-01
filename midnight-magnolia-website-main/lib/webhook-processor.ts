import { WebhookQueue, type WebhookJob } from "./webhook-queue"
import { ShopifyDatabase } from "./database"

export class WebhookProcessor {
  private static isRunning = false
  private static intervalId: NodeJS.Timeout | null = null

  static start(intervalMs = 5000) {
    if (this.isRunning) {
      console.log("Webhook processor is already running")
      return
    }

    this.isRunning = true
    console.log("Starting webhook processor...")

    this.intervalId = setInterval(async () => {
      await this.processNextJob()
    }, intervalMs)
  }

  static stop() {
    if (!this.isRunning) {
      console.log("Webhook processor is not running")
      return
    }

    this.isRunning = false
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
    console.log("Webhook processor stopped")
  }

  private static async processNextJob() {
    try {
      const job = await WebhookQueue.dequeue()
      if (!job) return

      console.log(`Processing webhook job: ${job.id} (${job.topic})`)

      try {
        await this.processJob(job)
        await WebhookQueue.markCompleted(job.id)
        console.log(`Completed webhook job: ${job.id}`)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        console.error(`Failed to process webhook job ${job.id}:`, errorMessage)

        if (job.retry_count < job.max_retries) {
          await WebhookQueue.retryJob(job.id)
          console.log(`Retrying webhook job: ${job.id} (attempt ${job.retry_count + 1})`)
        } else {
          await WebhookQueue.markFailed(job.id, errorMessage)
          console.log(`Max retries reached for webhook job: ${job.id}`)
        }
      }
    } catch (error) {
      console.error("Error in webhook processor:", error)
    }
  }

  private static async processJob(job: WebhookJob) {
    const { topic, payload } = job

    switch (topic) {
      case "orders/create":
        await this.processOrderCreate(payload)
        break
      case "orders/updated":
        await this.processOrderUpdate(payload)
        break
      case "products/create":
        await this.processProductCreate(payload)
        break
      case "products/update":
        await this.processProductUpdate(payload)
        break
      case "inventory_levels/update":
        await this.processInventoryUpdate(payload)
        break
      default:
        console.log(`Unknown webhook topic: ${topic}`)
    }
  }

  private static async processOrderCreate(orderData: any) {
    // Process new order
    console.log("Processing new order:", orderData.id)

    // Log to database
    await ShopifyDatabase.logWebhook({
      webhookTopic: "orders/create",
      shopifyId: orderData.id.toString(),
      status: "success",
      payload: orderData,
      retryCount: 0,
    })
  }

  private static async processOrderUpdate(orderData: any) {
    // Process order update
    console.log("Processing order update:", orderData.id)

    // Log to database
    await ShopifyDatabase.logWebhook({
      webhookTopic: "orders/updated",
      shopifyId: orderData.id.toString(),
      status: "success",
      payload: orderData,
      retryCount: 0,
    })
  }

  private static async processProductCreate(productData: any) {
    // Process new product
    console.log("Processing new product:", productData.id)

    await ShopifyDatabase.createProduct({
      shopifyProductId: productData.id.toString(),
      title: productData.title,
      handle: productData.handle,
      description: productData.body_html || "",
      productType: productData.product_type || "",
      vendor: productData.vendor || "",
      status: productData.status,
      tags: productData.tags?.split(",").map((tag: string) => tag.trim()) || [],
      createdAt: new Date(productData.created_at),
      updatedAt: new Date(),
    })
  }

  private static async processProductUpdate(productData: any) {
    // Process product update
    console.log("Processing product update:", productData.id)

    // Log to database
    await ShopifyDatabase.logWebhook({
      webhookTopic: "products/update",
      shopifyId: productData.id.toString(),
      status: "success",
      payload: productData,
      retryCount: 0,
    })
  }

  private static async processInventoryUpdate(inventoryData: any) {
    // Process inventory update
    console.log("Processing inventory update:", inventoryData.inventory_item_id)

    await ShopifyDatabase.updateInventoryLevel(
      inventoryData.inventory_item_id.toString(),
      inventoryData.location_id.toString(),
      inventoryData.available,
    )
  }
}
