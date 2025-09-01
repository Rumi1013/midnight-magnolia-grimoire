import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with proper error handling
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    })
  : null

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })
  }

  if (!endpointSecret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 })
  }

  const body = await request.text()
  const sig = request.headers.get("stripe-signature") || ""

  let event

  try {
    // Verify the event came from Stripe
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  // Handle the event
  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`)
        break
      case "payment_method.attached":
        const paymentMethod = event.data.object as Stripe.PaymentMethod
        console.log(`PaymentMethod ${paymentMethod.id} was attached`)
        break
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session
        console.log(`Checkout session ${session.id} completed`)
        break
      case "customer.subscription.created":
        const subscription = event.data.object as Stripe.Subscription
        console.log(`Subscription ${subscription.id} created`)
        break
      case "customer.subscription.updated":
        const updatedSubscription = event.data.object as Stripe.Subscription
        console.log(`Subscription ${updatedSubscription.id} updated`)
        break
      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object as Stripe.Subscription
        console.log(`Subscription ${deletedSubscription.id} deleted`)
        break
      default:
        console.log(`Unhandled event type ${event.type}`)
    }
  } catch (error) {
    console.error("Error processing webhook event:", error)
    return NextResponse.json({ error: "Error processing webhook" }, { status: 500 })
  }

  // Return a 200 response to acknowledge receipt of the event
  return NextResponse.json({ received: true })
}
