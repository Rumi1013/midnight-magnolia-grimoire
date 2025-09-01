import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with your secret key
// In production, use environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(request: NextRequest) {
  try {
    const { name, description, amount, currency = "usd", type = "one-time", interval } = await request.json()

    if (!name || !amount) {
      return NextResponse.json({ error: "Name and amount are required" }, { status: 400 })
    }

    // Create a product
    const product = await stripe.products.create({
      name,
      description,
    })

    // Create a price for the product
    const priceData: Stripe.PriceCreateParams = {
      product: product.id,
      unit_amount: Math.round(amount * 100), // Convert to cents
      currency,
    }

    // If it's a subscription, add recurring parameters
    if (type === "subscription") {
      if (!interval) {
        return NextResponse.json({ error: "Interval is required for subscriptions" }, { status: 400 })
      }

      priceData.recurring = {
        interval: interval as Stripe.PriceCreateParams.Recurring.Interval,
      }
    }

    const price = await stripe.prices.create(priceData)

    return NextResponse.json({
      success: true,
      product: product,
      price: price,
    })
  } catch (error: any) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
