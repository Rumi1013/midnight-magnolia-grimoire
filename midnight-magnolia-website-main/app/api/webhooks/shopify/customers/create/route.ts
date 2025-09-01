import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

function verifyShopifyWebhook(body: string, signature: string): boolean {
  const webhookSecret = process.env.SHOPIFY_WEBHOOK_SECRET
  if (!webhookSecret) return false

  const hmac = crypto.createHmac("sha256", webhookSecret)
  hmac.update(body, "utf8")
  const calculatedSignature = hmac.digest("base64")

  return crypto.timingSafeEqual(Buffer.from(signature, "base64"), Buffer.from(calculatedSignature, "base64"))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-shopify-hmac-sha256")

    if (!signature || !verifyShopifyWebhook(body, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const customerData = JSON.parse(body)
    await processNewCustomer(customerData)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error processing customer creation webhook:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

async function processNewCustomer(customerData: any) {
  console.log("Processing new customer:", {
    customerId: customerData.id,
    email: customerData.email,
    firstName: customerData.first_name,
    lastName: customerData.last_name,
  })

  // Create customer record in database
  const customerRecord = {
    shopifyCustomerId: customerData.id,
    email: customerData.email,
    firstName: customerData.first_name,
    lastName: customerData.last_name,
    phone: customerData.phone,
    acceptsMarketing: customerData.accepts_marketing,
    totalSpent: Number.parseFloat(customerData.total_spent || "0"),
    ordersCount: customerData.orders_count || 0,
    tags: customerData.tags?.split(",").map((tag: string) => tag.trim()) || [],
    addresses: customerData.addresses || [],
    createdAt: new Date(customerData.created_at),
    updatedAt: new Date(),
  }

  // Here you would save to your database
  // await db.customers.create(customerRecord)

  // Sync with HubSpot CRM if configured
  await syncCustomerToHubSpot(customerRecord)

  // Add to email marketing list if they opted in
  if (customerData.accepts_marketing) {
    await addToEmailList(customerRecord)
  }
}

async function syncCustomerToHubSpot(customerData: any) {
  if (process.env.HUBSPOT_API_KEY) {
    try {
      const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        },
        body: JSON.stringify({
          properties: {
            email: customerData.email,
            firstname: customerData.firstName,
            lastname: customerData.lastName,
            phone: customerData.phone,
            shopify_customer_id: customerData.shopifyCustomerId,
            total_spent: customerData.totalSpent,
            orders_count: customerData.ordersCount,
          },
        }),
      })

      if (response.ok) {
        console.log("Customer synced to HubSpot successfully")
      } else {
        console.error("Failed to sync customer to HubSpot:", await response.text())
      }
    } catch (error) {
      console.error("Error syncing customer to HubSpot:", error)
    }
  }
}

async function addToEmailList(customerData: any) {
  // Add customer to email marketing platform
  console.log("Adding customer to email list:", customerData.email)

  // Here you would integrate with your email marketing platform
  // Example: Mailchimp, ConvertKit, etc.
}
