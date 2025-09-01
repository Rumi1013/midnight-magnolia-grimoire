"use client"

import { useState, useEffect } from "react"
import { shopifyService } from "@/lib/shopify"

// 🌙 Sacred hook for Shopify products
export function useShopifyProducts(
  options: {
    limit?: number
    query?: string
    autoFetch?: boolean
  } = {},
) {
  const { limit = 20, query, autoFetch = true } = options

  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [cursor, setCursor] = useState<string | null>(null)

  const fetchProducts = async (after?: string) => {
    if (!shopifyService.isAvailable()) {
      setError("Sacred Shopify sanctuary not configured")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await shopifyService.getProducts({
        first: limit,
        after,
        query,
      })

      if (after) {
        // Append to existing products for pagination
        setProducts((prev) => [...prev, ...result.products])
      } else {
        // Replace products for new search
        setProducts(result.products)
      }

      setHasNextPage(result.pageInfo.hasNextPage)
      setCursor(result.pageInfo.endCursor)
    } catch (err: any) {
      setError(err.message)
      console.error("💔 Failed to fetch sacred products:", err)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (hasNextPage && !loading && cursor) {
      fetchProducts(cursor)
    }
  }

  const refresh = () => {
    setCursor(null)
    fetchProducts()
  }

  useEffect(() => {
    if (autoFetch) {
      fetchProducts()
    }
  }, [query, limit, autoFetch])

  return {
    products,
    loading,
    error,
    hasNextPage,
    loadMore,
    refresh,
    isAvailable: shopifyService.isAvailable(),
  }
}

// 🌸 Sacred hook for single product
export function useShopifyProduct(handle: string) {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProduct = async () => {
    if (!handle || !shopifyService.isAvailable()) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await shopifyService.getProductByHandle(handle)
      setProduct(result)
    } catch (err: any) {
      setError(err.message)
      console.error("💔 Failed to fetch sacred product:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [handle])

  return {
    product,
    loading,
    error,
    refresh: fetchProduct,
    isAvailable: shopifyService.isAvailable(),
  }
}
