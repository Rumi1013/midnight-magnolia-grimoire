import { NextResponse } from "next/server"

export async function GET() {
  // 🌙 Check all required store integrations
  const integrations = {
    // Core E-commerce
    shopify: {
      name: "Shopify Products",
      required: true,
      status: checkShopifyIntegration(),
      description: "Product catalog, inventory, and order management",
      variables: ["SHOPIFY_STOREFRONT_ACCESS_TOKEN", "SHOPIFY_STORE_DOMAIN"],
    },

    // Payment Processing
    stripe: {
      name: "Stripe Payments",
      required: true,
      status: checkStripeIntegration(),
      description: "Secure payment processing and checkout",
      variables: ["STRIPE_PUBLISHABLE_KEY", "STRIPE_SECRET_KEY"],
    },

    // Database & Storage
    database: {
      name: "Database (Neon)",
      required: true,
      status: checkDatabaseIntegration(),
      description: "Store orders, customers, and product cache",
      variables: ["DATABASE_URL"],
    },

    // Authentication
    auth: {
      name: "Authentication (Supabase)",
      required: false,
      status: checkAuthIntegration(),
      description: "User accounts, order history, and profiles",
      variables: ["SUPABASE_URL", "SUPABASE_ANON_KEY"],
    },

    // Email & Notifications
    email: {
      name: "Email Service",
      required: true,
      status: checkEmailIntegration(),
      description: "Order confirmations, shipping updates",
      variables: ["EMAILJS_TEMPLATE_ID", "FORMSPREE_ENDPOINT"],
    },

    // Analytics & Tracking
    analytics: {
      name: "Analytics",
      required: false,
      status: checkAnalyticsIntegration(),
      description: "Sales tracking, conversion metrics",
      variables: ["GOOGLE_ANALYTICS_ID", "VERCEL_ANALYTICS"],
    },

    // File Storage
    storage: {
      name: "File Storage (Vercel Blob)",
      required: false,
      status: checkStorageIntegration(),
      description: "Product images, user uploads",
      variables: ["BLOB_READ_WRITE_TOKEN"],
    },

    // Webhooks
    webhooks: {
      name: "Shopify Webhooks",
      required: false,
      status: checkWebhookIntegration(),
      description: "Real-time inventory and order updates",
      variables: ["SHOPIFY_WEBHOOK_SECRET"],
    },

    // Additional Services
    shipping: {
      name: "Shipping Rates",
      required: false,
      status: "not_configured",
      description: "Dynamic shipping calculations",
      variables: ["SHIPPO_API_KEY", "EASYPOST_API_KEY"],
    },

    tax: {
      name: "Tax Calculation",
      required: false,
      status: "not_configured",
      description: "Automatic tax calculation by region",
      variables: ["TAXJAR_API_KEY", "AVALARA_API_KEY"],
    },

    search: {
      name: "Product Search",
      required: false,
      status: "not_configured",
      description: "Advanced product search and filtering",
      variables: ["ALGOLIA_APP_ID", "ELASTICSEARCH_URL"],
    },

    reviews: {
      name: "Product Reviews",
      required: false,
      status: "not_configured",
      description: "Customer reviews and ratings",
      variables: ["REVIEWS_API_KEY"],
    },
  }

  // 🌸 Calculate overall readiness
  const totalIntegrations = Object.keys(integrations).length
  const requiredIntegrations = Object.values(integrations).filter((i) => i.required).length
  const configuredRequired = Object.values(integrations).filter((i) => i.required && i.status === "configured").length
  const configuredOptional = Object.values(integrations).filter((i) => !i.required && i.status === "configured").length

  const readinessScore = Math.round(((configuredRequired + configuredOptional * 0.5) / totalIntegrations) * 100)

  return NextResponse.json({
    success: true,
    integrations,
    summary: {
      totalIntegrations,
      requiredIntegrations,
      configuredRequired,
      configuredOptional,
      readinessScore,
      canLaunch: configuredRequired >= requiredIntegrations,
    },
    recommendations: generateRecommendations(integrations),
  })
}

function checkShopifyIntegration() {
  const hasToken = !!(
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
    process.env.PUBLIC_STOREFRONT_API_TOKEN ||
    process.env.storefront_api_public_access
  )
  const hasDomain = !!(
    process.env.SHOPIFY_STORE_DOMAIN ||
    process.env.SHOPIFY_SHOP_DOMAIN ||
    process.env.PUBLIC_STORE_DOMAIN
  )

  if (hasToken && hasDomain) return "configured"
  if (hasToken || hasDomain) return "partial"
  return "not_configured"
}

function checkStripeIntegration() {
  const hasPublic = !!(process.env.STRIPE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  const hasSecret = !!process.env.STRIPE_SECRET_KEY

  if (hasPublic && hasSecret) return "configured"
  if (hasPublic || hasSecret) return "partial"
  return "not_configured"
}

function checkDatabaseIntegration() {
  return process.env.DATABASE_URL ? "configured" : "not_configured"
}

function checkAuthIntegration() {
  const hasUrl = !!(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)
  const hasKey = !!(process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  if (hasUrl && hasKey) return "configured"
  if (hasUrl || hasKey) return "partial"
  return "not_configured"
}

function checkEmailIntegration() {
  const hasEmailJS = !!process.env.EMAILJS_TEMPLATE_ID
  const hasFormspree = !!process.env.FORMSPREE_ENDPOINT
  const hasOutlook = !!process.env.OUTLOOK_SERVICE_ID

  if (hasEmailJS || hasFormspree || hasOutlook) return "configured"
  return "not_configured"
}

function checkAnalyticsIntegration() {
  const hasGoogle = !!process.env.GOOGLE_CLOUD_API_KEY
  const hasVercel = true // Vercel Analytics is built-in

  if (hasGoogle || hasVercel) return "configured"
  return "not_configured"
}

function checkStorageIntegration() {
  return process.env.BLOB_READ_WRITE_TOKEN ? "configured" : "not_configured"
}

function checkWebhookIntegration() {
  return process.env.SHOPIFY_WEBHOOK_SECRET ? "configured" : "not_configured"
}

function generateRecommendations(integrations: any) {
  const recommendations = []

  // Priority recommendations based on status
  if (integrations.shopify.status !== "configured") {
    recommendations.push({
      priority: "high",
      title: "Configure Shopify Integration",
      description: "Essential for displaying and managing products",
      action: "Set up Storefront Access Token and shop domain",
    })
  }

  if (integrations.stripe.status !== "configured") {
    recommendations.push({
      priority: "high",
      title: "Set up Stripe Payments",
      description: "Required for processing customer payments",
      action: "Add Stripe publishable and secret keys",
    })
  }

  if (integrations.email.status !== "configured") {
    recommendations.push({
      priority: "medium",
      title: "Configure Email Service",
      description: "Important for order confirmations and customer communication",
      action: "Set up EmailJS, Formspree, or another email service",
    })
  }

  if (integrations.webhooks.status !== "configured") {
    recommendations.push({
      priority: "medium",
      title: "Enable Shopify Webhooks",
      description: "Keep inventory and orders synchronized in real-time",
      action: "Configure webhook endpoints and secret",
    })
  }

  if (integrations.auth.status !== "configured") {
    recommendations.push({
      priority: "low",
      title: "Add User Authentication",
      description: "Allow customers to create accounts and view order history",
      action: "Your Supabase is already configured - just enable auth features",
    })
  }

  return recommendations
}
