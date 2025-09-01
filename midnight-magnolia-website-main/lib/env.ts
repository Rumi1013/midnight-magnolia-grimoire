/**
 * 🌙 Sacred Environment Variable Utilities
 * Safely handle environment variables with proper validation
 */

export function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key]

  if (!value) {
    if (fallback !== undefined) {
      return fallback
    }
    throw new Error(`Missing required environment variable: ${key}`)
  }

  // Clean the value in case it includes the variable name (common Vercel issue)
  const cleanValue = value.replace(new RegExp(`^${key}=`), "").trim()

  return cleanValue
}

export function getSafeUrl(key: string, fallback = "https://localhost:3000"): string {
  try {
    const url = getEnvVar(key, fallback)
    // Validate URL format
    new URL(url)
    return url
  } catch (error) {
    console.warn(`Invalid URL for ${key}:`, error)
    return fallback
  }
}

export function getOptionalEnvVar(key: string): string | undefined {
  const value = process.env[key]
  if (!value) return undefined

  // Clean the value
  return value.replace(new RegExp(`^${key}=`), "").trim()
}

// Sacred environment variables with safe defaults - SERVER SIDE ONLY
export const ENV = {
  SITE_URL: getSafeUrl("NEXT_PUBLIC_SITE_URL", "https://midnight-magnolia.com"),
  // Shopify credentials - SERVER SIDE ONLY (no NEXT_PUBLIC_)
  SHOPIFY_DOMAIN: getOptionalEnvVar("SHOPIFY_STORE_DOMAIN"),
  SHOPIFY_TOKEN: getOptionalEnvVar("SHOPIFY_STOREFRONT_ACCESS_TOKEN"),
  SUPABASE_URL: getOptionalEnvVar("SUPABASE_URL"),
  SUPABASE_ANON_KEY: getOptionalEnvVar("SUPABASE_ANON_KEY"),
  NODE_ENV: process.env.NODE_ENV || "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
} as const
