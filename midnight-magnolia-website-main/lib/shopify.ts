// 🌙 Sacred Shopify Storefront API Client for Midnight Magnolia
// SERVER-SIDE ONLY - Handles all divine commerce connections with Southern Gothic grace

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || "3ada30-b9.myshopify.com"
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.Storefront_API_access_token
const SHOPIFY_API_VERSION = "2024-01"

// 🌸 Validate sacred environment variables
if (!SHOPIFY_DOMAIN) {
  console.warn("🌙 SHOPIFY_STORE_DOMAIN not set - Shopify features will be disabled")
}

if (!SHOPIFY_STOREFRONT_TOKEN) {
  console.warn("🌸 SHOPIFY_STOREFRONT_ACCESS_TOKEN not set - Shopify features will be disabled")
}

// 🌿 Sacred Shopify Storefront API Client - SERVER SIDE ONLY
export class ShopifyStorefrontClient {
  private domain: string
  private accessToken: string
  private apiVersion: string

  constructor() {
    if (!SHOPIFY_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
      console.warn("🌙 Shopify not configured:", {
        hasDomain: !!SHOPIFY_DOMAIN,
        hasToken: !!SHOPIFY_STOREFRONT_TOKEN,
      })
      throw new Error(
        "Sacred Shopify credentials not found. Please set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN environment variables.",
      )
    }

    // Clean and validate domain
    this.domain = SHOPIFY_DOMAIN.replace(/^https?:\/\//, "").replace(/\/$/, "")
    if (!this.domain.includes(".myshopify.com")) {
      throw new Error(`Invalid domain format: ${this.domain}. Must be your-shop.myshopify.com`)
    }

    this.accessToken = SHOPIFY_STOREFRONT_TOKEN
    this.apiVersion = SHOPIFY_API_VERSION

    console.log("🌙 Shopify client initialized:", {
      domain: this.domain,
      tokenLength: this.accessToken.length,
      apiVersion: this.apiVersion,
    })
  }

  // 🌙 Sacred GraphQL query executor
  async query<T = any>(query: string, variables: Record<string, any> = {}): Promise<T> {
    const endpoint = `https://${this.domain}/api/${this.apiVersion}/graphql.json`

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": this.accessToken,
          "User-Agent": "Midnight-Magnolia-Sanctuary/1.0",
          Accept: "application/json",
        },
        body: JSON.stringify({ query, variables }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Sacred connection failed: ${response.status} - ${errorText}`)
      }

      const data = await response.json()

      if (data.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`)
      }

      return data.data
    } catch (error) {
      console.error("💔 Sacred Shopify query failed:", error)
      throw error
    }
  }

  // 🌸 Check if Shopify is properly configured
  static isConfigured(): boolean {
    return !!(SHOPIFY_DOMAIN && SHOPIFY_STOREFRONT_TOKEN)
  }

  // 🌿 Get configuration status for debugging
  static getConfig() {
    return {
      hasDomain: !!SHOPIFY_DOMAIN,
      hasToken: !!SHOPIFY_STOREFRONT_TOKEN,
      domain: SHOPIFY_DOMAIN ? `${SHOPIFY_DOMAIN.substring(0, 10)}...` : "Not set",
      tokenLength: SHOPIFY_STOREFRONT_TOKEN?.length || 0,
    }
  }
}

// 🌙 Sacred GraphQL Queries for Midnight Magnolia

export const PRODUCT_FRAGMENT = `
  fragment ProductDetails on Product {
    id
    title
    handle
    description
    productType
    vendor
    tags
    createdAt
    updatedAt
    availableForSale
    totalInventory
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 10) {
      edges {
        node {
          id
          title
          availableForSale
          quantityAvailable
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`

export const GET_PRODUCTS_QUERY = `
  query getProducts($first: Int!, $after: String, $query: String) {
    products(first: $first, after: $after, query: $query, available: true) {
      edges {
        node {
          ...ProductDetails
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`

export const GET_PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      ...ProductDetails
    }
  }
  ${PRODUCT_FRAGMENT}
`

export const GET_COLLECTIONS_QUERY = `
  query getCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
          products(first: 10) {
            edges {
              node {
                id
                title
                handle
                featuredImage {
                  url
                  altText
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

// 🌸 Sacred Product Types for TypeScript
export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  description: string
  productType: string
  vendor: string
  tags: string[]
  createdAt: string
  updatedAt: string
  availableForSale: boolean
  totalInventory?: number
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
    maxVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  compareAtPriceRange?: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  featuredImage?: {
    url: string
    altText?: string
    width?: number
    height?: number
  }
  images: {
    edges: Array<{
      node: {
        url: string
        altText?: string
        width?: number
        height?: number
      }
    }>
  }
  variants: {
    edges: Array<{
      node: ShopifyVariant
    }>
  }
}

export interface ShopifyVariant {
  id: string
  title: string
  availableForSale: boolean
  quantityAvailable?: number
  price: {
    amount: string
    currencyCode: string
  }
  compareAtPrice?: {
    amount: string
    currencyCode: string
  }
  selectedOptions: Array<{
    name: string
    value: string
  }>
}

export interface ShopifyCollection {
  id: string
  title: string
  handle: string
  description: string
  image?: {
    url: string
    altText?: string
  }
  products: {
    edges: Array<{
      node: Partial<ShopifyProduct>
    }>
  }
}

// 🌿 Sacred Product Utilities for Midnight Magnolia
export class ProductUtils {
  // Transform Shopify product to Midnight Magnolia format
  static transformProduct(shopifyProduct: ShopifyProduct) {
    const minPrice = Number.parseFloat(shopifyProduct.priceRange.minVariantPrice.amount)
    const maxPrice = Number.parseFloat(shopifyProduct.priceRange.maxVariantPrice.amount)
    const compareAtPrice = shopifyProduct.compareAtPriceRange?.minVariantPrice?.amount
      ? Number.parseFloat(shopifyProduct.compareAtPriceRange.minVariantPrice.amount)
      : null

    const tags = shopifyProduct.tags || []
    const isBlessed = tags.some((tag) =>
      ["blessed", "featured", "special", "sacred", "bestseller"].includes(tag.toLowerCase()),
    )
    const isBestseller = tags.some((tag) => ["bestseller", "popular", "top", "favorite"].includes(tag.toLowerCase()))
    const isNew =
      tags.some((tag) => ["new", "latest", "fresh"].includes(tag.toLowerCase())) ||
      new Date(shopifyProduct.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

    return {
      id: shopifyProduct.id,
      shopifyId: shopifyProduct.id,
      name: shopifyProduct.title,
      handle: shopifyProduct.handle,
      description: shopifyProduct.description || "",
      price: minPrice,
      maxPrice: maxPrice !== minPrice ? maxPrice : null,
      originalPrice: compareAtPrice && compareAtPrice > minPrice ? compareAtPrice : null,
      currency: shopifyProduct.priceRange.minVariantPrice.currencyCode,
      image: shopifyProduct.featuredImage?.url || "/placeholder.svg?height=400&width=400&text=Sacred+Product",
      images: shopifyProduct.images.edges.map((img) => ({
        url: img.node.url,
        alt: img.node.altText || shopifyProduct.title,
        width: img.node.width,
        height: img.node.height,
      })),
      category: "physical",
      subcategory: shopifyProduct.productType || "Sacred Items",
      vendor: shopifyProduct.vendor || "Midnight Magnolia",
      tags: tags,
      availableForSale: shopifyProduct.availableForSale,
      totalInventory: shopifyProduct.totalInventory,
      createdAt: shopifyProduct.createdAt,
      updatedAt: shopifyProduct.updatedAt,
      isBlessed,
      isBestseller,
      isNew,
      variants: shopifyProduct.variants.edges.map((v) => ({
        id: v.node.id,
        title: v.node.title,
        price: Number.parseFloat(v.node.price.amount),
        compareAtPrice: v.node.compareAtPrice ? Number.parseFloat(v.node.compareAtPrice.amount) : null,
        availableForSale: v.node.availableForSale,
        quantityAvailable: v.node.quantityAvailable,
        selectedOptions: v.node.selectedOptions,
      })),
    }
  }

  // Format price with currency for display
  static formatPrice(amount: number | string, currencyCode = "USD"): string {
    const price = typeof amount === "string" ? Number.parseFloat(amount) : amount
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(price)
  }

  // Check if product has discount
  static hasDiscount(product: any): boolean {
    return !!(product.originalPrice && product.originalPrice > product.price)
  }

  // Calculate discount percentage
  static getDiscountPercentage(originalPrice: number, salePrice: number): number {
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
  }

  // Get product badge text
  static getBadgeText(product: any): string | null {
    if (product.isBlessed) return "Blessed"
    if (product.isBestseller) return "Bestseller"
    if (product.isNew) return "New"
    if (this.hasDiscount(product)) {
      const discount = this.getDiscountPercentage(product.originalPrice, product.price)
      return `${discount}% Off`
    }
    return null
  }

  // Get product badge color (Tailwind classes)
  static getBadgeColor(product: any): string {
    if (product.isBlessed) return "bg-gold text-midnight-blue"
    if (product.isBestseller) return "bg-sage-green text-midnight-blue"
    if (product.isNew) return "bg-magnolia-white text-midnight-blue"
    if (this.hasDiscount(product)) return "bg-red-500 text-magnolia-white"
    return "bg-warm-gray text-midnight-blue"
  }
}

// 🌙 Sacred Shopify Service Functions
export const shopifyService = {
  // Get all products with pagination
  async getProducts(options: { first?: number; after?: string; query?: string } = {}) {
    if (!ShopifyStorefrontClient.isConfigured()) {
      throw new Error("Sacred Shopify sanctuary not configured")
    }

    const client = new ShopifyStorefrontClient()
    const { first = 20, after, query } = options

    const data = await client.query(GET_PRODUCTS_QUERY, { first, after, query })

    return {
      products: data.products.edges.map((edge: any) => ProductUtils.transformProduct(edge.node)),
      pageInfo: data.products.pageInfo,
    }
  },

  // Get single product by handle
  async getProductByHandle(handle: string) {
    if (!ShopifyStorefrontClient.isConfigured()) {
      throw new Error("Sacred Shopify sanctuary not configured")
    }

    const client = new ShopifyStorefrontClient()
    const data = await client.query(GET_PRODUCT_BY_HANDLE_QUERY, { handle })

    return data.productByHandle ? ProductUtils.transformProduct(data.productByHandle) : null
  },

  // Get collections
  async getCollections(first = 10) {
    if (!ShopifyStorefrontClient.isConfigured()) {
      throw new Error("Sacred Shopify sanctuary not configured")
    }

    const client = new ShopifyStorefrontClient()
    const data = await client.query(GET_COLLECTIONS_QUERY, { first })

    return data.collections.edges.map((edge: any) => edge.node)
  },

  // Check if Shopify is available
  isAvailable(): boolean {
    return ShopifyStorefrontClient.isConfigured()
  },

  // Get configuration for debugging
  getConfig() {
    return ShopifyStorefrontClient.getConfig()
  },
}

// 🌸 Export the sacred client for advanced usage

// 🌿 Default export for convenience
export default {
  // Server-side only functions
  isAvailable: () => ShopifyStorefrontClient.isConfigured(),
  getConfig: () => ShopifyStorefrontClient.getConfig(),
}
