import { type NextRequest, NextResponse } from "next/server"

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || "3ada30-b9.myshopify.com"
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "7d01fd6b53d40fa958e39a5f49fa0ea8"

export async function POST(request: NextRequest) {
  try {
    console.log("🌙 Starting sacred product synchronization...")

    if (!SHOPIFY_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
      return NextResponse.json({
        success: false,
        error: "Shopify credentials not configured",
        productSync: {
          totalProducts: 0,
          syncedProducts: 0,
          lastSync: "",
          errors: ["Missing Shopify credentials"],
        },
      })
    }

    // Fetch products from Shopify
    const shopifyResponse = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: `
          query {
            products(first: 50) {
              edges {
                node {
                  id
                  title
                  handle
                  description
                  productType
                  vendor
                  tags
                  availableForSale
                  totalInventory
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
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    })

    if (!shopifyResponse.ok) {
      throw new Error(`Shopify API error: ${shopifyResponse.status}`)
    }

    const shopifyData = await shopifyResponse.json()

    if (shopifyData.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(shopifyData.errors)}`)
    }

    const shopifyProducts = shopifyData.data?.products?.edges || []
    const errors: string[] = []
    let syncedCount = 0

    // Process each product
    for (const edge of shopifyProducts) {
      try {
        const product = edge.node

        // Transform Shopify product to our format
        const transformedProduct = {
          id: product.id,
          shopifyId: product.id,
          name: product.title,
          handle: product.handle,
          description: product.description || "",
          price: Number.parseFloat(product.priceRange.minVariantPrice.amount),
          currency: product.priceRange.minVariantPrice.currencyCode,
          image: product.featuredImage?.url || "/placeholder.svg?height=400&width=400",
          category: product.productType || "General",
          vendor: product.vendor || "Midnight Magnolia",
          tags: product.tags || [],
          availableForSale: product.availableForSale,
          totalInventory: product.totalInventory,
          variants: product.variants.edges.map((v: any) => ({
            id: v.node.id,
            title: v.node.title,
            price: Number.parseFloat(v.node.price.amount),
            availableForSale: v.node.availableForSale,
            quantityAvailable: v.node.quantityAvailable,
          })),
          syncedAt: new Date().toISOString(),
        }

        // In production, save to your database here
        console.log(`✨ Synced product: ${transformedProduct.name}`)
        syncedCount++
      } catch (productError: any) {
        errors.push(`Failed to sync product ${edge.node.title}: ${productError.message}`)
        console.error("Product sync error:", productError)
      }
    }

    const productSync = {
      totalProducts: shopifyProducts.length,
      syncedProducts: syncedCount,
      lastSync: new Date().toISOString(),
      errors,
    }

    console.log(`🌸 Product sync complete: ${syncedCount}/${shopifyProducts.length} products synced`)

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${syncedCount} sacred products! ✨`,
      productSync,
      products: shopifyProducts.map((edge: any) => edge.node), // Return synced products
    })
  } catch (error: any) {
    console.error("💔 Product sync failed:", error)

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        productSync: {
          totalProducts: 0,
          syncedProducts: 0,
          lastSync: "",
          errors: [error.message],
        },
      },
      { status: 500 },
    )
  }
}
