import { NextResponse } from "next/server"

export async function GET() {
  // 🌙 Check actual environment variables you have available
  const actualVariables = {
    // Shopify Variables (checking all your actual ones)
    shopify: {
      domains: {
        SHOPIFY_STORE_DOMAIN: !!process.env.SHOPIFY_STORE_DOMAIN,
        SHOPIFY_SHOP_DOMAIN: !!process.env.SHOPIFY_SHOP_DOMAIN,
        PUBLIC_STORE_DOMAIN: !!process.env.PUBLIC_STORE_DOMAIN,
        SHOPIFY_STOREFRONT_ADMIN: !!process.env.SHOPIFY_STOREFRONT_ADMIN,
      },
      tokens: {
        SHOPIFY_STOREFRONT_ACCESS_TOKEN: !!process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        PUBLIC_STOREFRONT_API_TOKEN: !!process.env.PUBLIC_STOREFRONT_API_TOKEN,
        storefront_api_public_access: !!process.env.storefront_api_public_access,
        Storefront_API_access_token: !!process.env.Storefront_API_access_token,
        headless_private_access: !!process.env.headless_private_access,
        headless_client_id: !!process.env.headless_client_id,
        SHOPIFY_ACCESS_TOKEN: !!process.env.SHOPIFY_ACCESS_TOKEN,
        SHOPIFY_ADMIN_API: !!process.env.SHOPIFY_ADMIN_API,
        SHOPIFY_API_KEY: !!process.env.SHOPIFY_API_KEY,
        SHOPIFY_API_SECRET: !!process.env.SHOPIFY_API_SECRET,
      },
      webhooks: {
        SHOPIFY_WEBHOOK_SECRET: !!process.env.SHOPIFY_WEBHOOK_SECRET,
      },
    },

    // Stripe Variables (checking your actual ones)
    stripe: {
      STRIPE_PUBLISHABLE_KEY: !!process.env.STRIPE_PUBLISHABLE_KEY,
      STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      STRIPE_WEBHOOK_SECRET: !!process.env.STRIPE_WEBHOOK_SECRET,
    },

    // Database Variables (your actual ones)
    database: {
      neon: {
        DATABASE_URL: !!process.env.DATABASE_URL,
        DATABASE_URL_UNPOOLED: !!process.env.DATABASE_URL_UNPOOLED,
        POSTGRES_URL: !!process.env.POSTGRES_URL,
        POSTGRES_PRISMA_URL: !!process.env.POSTGRES_PRISMA_URL,
        POSTGRES_URL_NON_POOLING: !!process.env.POSTGRES_URL_NON_POOLING,
      },
      supabase: {
        SUPABASE_URL: !!process.env.SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        SUPABASE_JWT_SECRET: !!process.env.SUPABASE_JWT_SECRET,
      },
    },

    // Email Variables (your actual ones)
    email: {
      emailjs: {
        EMAILJS_TEMPLATE_ID: !!process.env.EMAILJS_TEMPLATE_ID,
        emailjs_google_serviceid: !!process.env.emailjs_google_serviceid,
        emailjs_template: !!process.env.emailjs_template,
        emailjs_outlook_service: !!process.env.emailjs_outlook_service,
      },
      formspree: {
        FORMSPREE_ENDPOINT: !!process.env.FORMSPREE_ENDPOINT,
        Next_Public_Form: !!process.env.Next_Public_Form,
      },
      outlook: {
        OUTLOOK_SERVICE_ID: !!process.env.OUTLOOK_SERVICE_ID,
      },
    },

    // Storage Variables (your actual ones)
    storage: {
      vercelBlob: {
        BLOB_READ_WRITE_TOKEN: !!process.env.BLOB_READ_WRITE_TOKEN,
        NEW_BLOB_READ_WRITE_TOKEN: !!process.env.NEW_BLOB_READ_WRITE_TOKEN,
        vercel_BLOB_READ_WRITE_TOKEN: !!process.env.vercel_BLOB_READ_WRITE_TOKEN,
      },
      wasabi: {
        WASABI_ACCESS_KEY: !!process.env.WASABI_ACCESS_KEY,
        WASABI_SECRET_KEY: !!process.env.WASABI_SECRET_KEY,
        WASABI_REGION: !!process.env.WASABI_REGION,
        WASABI_BUCKET: !!process.env.WASABI_BUCKET,
        WASABI_ENDPOINT: !!process.env.WASABI_ENDPOINT,
      },
      dropbox: {
        DROPBOX_API_KEY: !!process.env.DROPBOX_API_KEY,
        DROPBOX_SECRET: !!process.env.DROPBOX_SECRET,
        dropbox_access_token: !!process.env.dropbox_access_token,
        DROPBOX_BACKUP_PATH: !!process.env.DROPBOX_BACKUP_PATH,
      },
    },

    // Analytics Variables (your actual ones)
    analytics: {
      google: {
        GOOGLE_CLOUD_API_KEY: !!process.env.GOOGLE_CLOUD_API_KEY,
        GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
        GOOGLE_OAUTH_CLIENT_ID: !!process.env.GOOGLE_OAUTH_CLIENT_ID,
        GOOGLE_OAUTH_CLIENT_SECRET: !!process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      },
    },

    // AI/Content Variables (your actual ones)
    ai: {
      openai: {
        OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
        Open_AI: !!process.env.Open_AI,
      },
      anthropic: {
        ANTHROPIC_API_KEY: !!process.env.ANTHROPIC_API_KEY,
        anthropic: !!process.env.anthropic,
      },
      other: {
        XAI_API_KEY: !!process.env.XAI_API_KEY,
        GROQ_API_KEY: !!process.env.GROQ_API_KEY,
        DEEPINFRA_API_KEY: !!process.env.DEEPINFRA_API_KEY,
        FAL_KEY: !!process.env.FAL_KEY,
        PERPLEXITY_API_KEY: !!process.env.PERPLEXITY_API_KEY,
        LEONARDO_API_KEY: !!process.env.LEONARDO_API_KEY,
        REPLICATE_API_TOKEN: !!process.env.REPLICATE_API_TOKEN,
        IDEOGRAM_API_KEY: !!process.env.IDEOGRAM_API_KEY,
        TOGETHER_API_KEY: !!process.env.TOGETHER_API_KEY,
      },
    },

    // Integration Variables (your actual ones)
    integrations: {
      airtable: {
        AIRTABLE_API_KEY: !!process.env.AIRTABLE_API_KEY,
        Token_airtable: !!process.env.Token_airtable,
        AIRTABLE_BASE_ID_1: !!process.env.AIRTABLE_BASE_ID_1,
        AIRTABLE_BASE_ID_2: !!process.env.AIRTABLE_BASE_ID_2,
        AIRTABLE_BASE_ID_3: !!process.env.AIRTABLE_BASE_ID_3,
        AIRTABLE_BASE_ID_4: !!process.env.AIRTABLE_BASE_ID_4,
      },
      hubspot: {
        HUBSPOT_API_KEY: !!process.env.HUBSPOT_API_KEY,
        hubspot: !!process.env.hubspot,
      },
      notion: {
        NOTION_API_KEY: !!process.env.NOTION_API_KEY,
        notion_key: !!process.env.notion_key,
        NOTION_BASE_URL: !!process.env.NOTION_BASE_URL,
      },
      calendly: {
        CALENDLY_CLIENT_ID: !!process.env.CALENDLY_CLIENT_ID,
        CALENDLY_SECRET: !!process.env.CALENDLY_SECRET,
        CALENDLY_WEBHOOK_SIGNING_KEY: !!process.env.CALENDLY_WEBHOOK_SIGNING_KEY,
      },
      slack: {
        SLACK_CLIENT_ID: !!process.env.SLACK_CLIENT_ID,
        SLACK_CLIENT_SECRET: !!process.env.SLACK_CLIENT_SECRET,
      },
      canva: {
        CANVA_CLIENT_ID: !!process.env.CANVA_CLIENT_ID,
        CANVA_CLIENT_SECRET: !!process.env.CANVA_CLIENT_SECRET,
      },
      patreon: {
        PATREON_CLIENT_ID: !!process.env.PATREON_CLIENT_ID,
        PATREON_CLIENT_SECRET: !!process.env.PATREON_CLIENT_SECRET,
        PATREON_ACCESS_TOKEN: !!process.env.PATREON_ACCESS_TOKEN,
        PATREON_REFRESH_TOKEN: !!process.env.PATREON_REFRESH_TOKEN,
      },
    },
  }

  // 🌸 Analyze what you actually have vs what's needed
  const analysis = {
    shopify: {
      status: analyzeShopifyStatus(actualVariables.shopify),
      recommendations: getShopifyRecommendations(actualVariables.shopify),
    },
    stripe: {
      status: analyzeStripeStatus(actualVariables.stripe),
      recommendations: getStripeRecommendations(actualVariables.stripe),
    },
    database: {
      status: analyzeDatabaseStatus(actualVariables.database),
      recommendations: getDatabaseRecommendations(actualVariables.database),
    },
    email: {
      status: analyzeEmailStatus(actualVariables.email),
      recommendations: getEmailRecommendations(actualVariables.email),
    },
    storage: {
      status: analyzeStorageStatus(actualVariables.storage),
      recommendations: getStorageRecommendations(actualVariables.storage),
    },
  }

  return NextResponse.json({
    success: true,
    actualVariables,
    analysis,
    summary: {
      totalConfigured: Object.values(analysis).filter((a) => a.status === "ready").length,
      needsAttention: Object.values(analysis).filter((a) => a.status === "needs_setup").length,
      partiallyConfigured: Object.values(analysis).filter((a) => a.status === "partial").length,
    },
  })
}

function analyzeShopifyStatus(shopify: any) {
  const hasDomain = Object.values(shopify.domains).some(Boolean)
  const hasStorefrontToken = Object.values(shopify.tokens).some(Boolean)
  const hasWebhookSecret = shopify.webhooks.SHOPIFY_WEBHOOK_SECRET

  if (hasDomain && hasStorefrontToken) return "ready"
  if (hasDomain || hasStorefrontToken) return "partial"
  return "needs_setup"
}

function getShopifyRecommendations(shopify: any) {
  const recommendations = []
  const hasDomain = Object.values(shopify.domains).some(Boolean)
  const hasStorefrontToken = Object.values(shopify.tokens).some(Boolean)

  if (!hasDomain) {
    recommendations.push("Set SHOPIFY_STORE_DOMAIN to your shop domain (e.g., your-shop.myshopify.com)")
  }

  if (!hasStorefrontToken) {
    recommendations.push("Generate a Storefront Access Token and set SHOPIFY_STOREFRONT_ACCESS_TOKEN")
  }

  if (hasStorefrontToken && hasDomain) {
    recommendations.push("✅ Shopify is configured! Test the connection at /debug/tokens")
  }

  return recommendations
}

function analyzeStripeStatus(stripe: any) {
  const hasPublic = stripe.STRIPE_PUBLISHABLE_KEY || stripe.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  const hasSecret = stripe.STRIPE_SECRET_KEY
  const hasWebhook = stripe.STRIPE_WEBHOOK_SECRET

  if (hasPublic && hasSecret) return "ready"
  if (hasPublic || hasSecret) return "partial"
  return "needs_setup"
}

function getStripeRecommendations(stripe: any) {
  const recommendations = []
  const hasPublic = stripe.STRIPE_PUBLISHABLE_KEY || stripe.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  const hasSecret = stripe.STRIPE_SECRET_KEY

  if (!hasPublic) {
    recommendations.push("Add STRIPE_PUBLISHABLE_KEY from your Stripe dashboard")
  }

  if (!hasSecret) {
    recommendations.push("Add STRIPE_SECRET_KEY from your Stripe dashboard")
  }

  if (hasPublic && hasSecret) {
    recommendations.push("✅ Stripe is configured! You can process payments")
  }

  return recommendations
}

function analyzeDatabaseStatus(database: any) {
  const hasNeon = Object.values(database.neon).some(Boolean)
  const hasSupabase = Object.values(database.supabase).some(Boolean)

  if (hasNeon && hasSupabase) return "ready"
  if (hasNeon || hasSupabase) return "partial"
  return "needs_setup"
}

function getDatabaseRecommendations(database: any) {
  return ["✅ Both Neon and Supabase are fully configured!"]
}

function analyzeEmailStatus(email: any) {
  const hasEmailJS = Object.values(email.emailjs).some(Boolean)
  const hasFormspree = Object.values(email.formspree).some(Boolean)
  const hasOutlook = email.outlook.OUTLOOK_SERVICE_ID

  if (hasEmailJS || hasFormspree || hasOutlook) return "ready"
  return "needs_setup"
}

function getEmailRecommendations(email: any) {
  const hasAny = Object.values(email.emailjs).some(Boolean) || Object.values(email.formspree).some(Boolean)

  if (hasAny) {
    return ["✅ Email service is configured! You can send order confirmations"]
  }

  return ["Configure EmailJS, Formspree, or Outlook for order notifications"]
}

function analyzeStorageStatus(storage: any) {
  const hasVercelBlob = Object.values(storage.vercelBlob).some(Boolean)
  const hasWasabi = Object.values(storage.wasabi).some(Boolean)
  const hasDropbox = Object.values(storage.dropbox).some(Boolean)

  if (hasVercelBlob || hasWasabi || hasDropbox) return "ready"
  return "needs_setup"
}

function getStorageRecommendations(storage: any) {
  const hasAny =
    Object.values(storage.vercelBlob).some(Boolean) ||
    Object.values(storage.wasabi).some(Boolean) ||
    Object.values(storage.dropbox).some(Boolean)

  if (hasAny) {
    return ["✅ Multiple storage options configured! You can handle file uploads"]
  }

  return ["Configure Vercel Blob, Wasabi, or Dropbox for file storage"]
}
