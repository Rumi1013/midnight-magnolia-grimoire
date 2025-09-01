import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export class ShopifyDatabase {
  static async logWebhook(data: {
    webhookTopic: string
    shopifyId: string
    status: string
    payload: any
    errorMessage?: string
    retryCount: number
  }) {
    try {
      const result = await sql`
        INSERT INTO webhook_logs (webhook_topic, shopify_id, status, payload, error_message, retry_count, created_at)
        VALUES (${data.webhookTopic}, ${data.shopifyId}, ${data.status}, ${JSON.stringify(data.payload)}, ${data.errorMessage || null}, ${data.retryCount}, NOW())
        RETURNING id
      `
      return result[0]
    } catch (error) {
      console.error("Error logging webhook:", error)
      throw error
    }
  }

  static async createProduct(data: {
    shopifyProductId: string
    title: string
    handle: string
    description: string
    productType: string
    vendor: string
    status: string
    tags: string[]
    createdAt: Date
    updatedAt: Date
  }) {
    try {
      const result = await sql`
        INSERT INTO products (shopify_product_id, title, handle, description, product_type, vendor, status, tags, created_at, updated_at)
        VALUES (${data.shopifyProductId}, ${data.title}, ${data.handle}, ${data.description}, ${data.productType}, ${data.vendor}, ${data.status}, ${JSON.stringify(data.tags)}, ${data.createdAt.toISOString()}, ${data.updatedAt.toISOString()})
        RETURNING id
      `
      return result[0]
    } catch (error) {
      console.error("Error creating product:", error)
      throw error
    }
  }

  static async updateInventoryLevel(inventoryItemId: string, locationId: string, available: number) {
    try {
      await sql`
        INSERT INTO inventory_levels (inventory_item_id, location_id, available, updated_at)
        VALUES (${inventoryItemId}, ${locationId}, ${available}, NOW())
        ON CONFLICT (inventory_item_id, location_id)
        DO UPDATE SET available = ${available}, updated_at = NOW()
      `
    } catch (error) {
      console.error("Error updating inventory:", error)
      throw error
    }
  }

  static async getOrderStats(days: number) {
    try {
      const result = await sql`
        SELECT 
          COUNT(*) as total_orders,
          SUM(CAST(total_price AS DECIMAL)) as total_revenue,
          AVG(CAST(total_price AS DECIMAL)) as average_order_value
        FROM orders 
        WHERE created_at >= NOW() - INTERVAL '${days} days'
      `
      return result[0] || { total_orders: 0, total_revenue: 0, average_order_value: 0 }
    } catch (error) {
      console.error("Error getting order stats:", error)
      return { total_orders: 0, total_revenue: 0, average_order_value: 0 }
    }
  }

  static async getTopProducts(limit: number) {
    try {
      const result = await sql`
        SELECT p.title, p.shopify_product_id, COUNT(ol.id) as order_count
        FROM products p
        LEFT JOIN order_line_items ol ON p.shopify_product_id = ol.product_id
        GROUP BY p.id, p.title, p.shopify_product_id
        ORDER BY order_count DESC
        LIMIT ${limit}
      `
      return result
    } catch (error) {
      console.error("Error getting top products:", error)
      return []
    }
  }

  static async getLowStockItems(threshold: number) {
    try {
      const result = await sql`
        SELECT p.title, il.available, p.shopify_product_id
        FROM products p
        JOIN inventory_levels il ON p.shopify_product_id = il.inventory_item_id
        WHERE il.available <= ${threshold}
        ORDER BY il.available ASC
      `
      return result
    } catch (error) {
      console.error("Error getting low stock items:", error)
      return []
    }
  }

  static async getWebhookStats() {
    try {
      const result = await sql`
        SELECT 
          status,
          COUNT(*) as count
        FROM webhook_logs
        WHERE created_at >= NOW() - INTERVAL '24 hours'
        GROUP BY status
      `
      return result
    } catch (error) {
      console.error("Error getting webhook stats:", error)
      return []
    }
  }

  static async getRecentOrders(limit: number) {
    try {
      const result = await sql`
        SELECT shopify_order_id, customer_email, total_price, financial_status, created_at
        FROM orders
        ORDER BY created_at DESC
        LIMIT ${limit}
      `
      return result
    } catch (error) {
      console.error("Error getting recent orders:", error)
      return []
    }
  }
}
