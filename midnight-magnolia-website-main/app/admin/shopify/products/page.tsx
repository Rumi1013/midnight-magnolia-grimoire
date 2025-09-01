"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Package, Edit, Eye, Plus, Search, RefreshCw } from "lucide-react"
import Image from "next/image"

interface Product {
  id: string
  shopifyId: string
  name: string
  handle: string
  description: string
  price: number
  currency: string
  image: string
  category: string
  vendor: string
  tags: string[]
  availableForSale: boolean
  totalInventory: number
  variants: Array<{
    id: string
    title: string
    price: number
    availableForSale: boolean
    quantityAvailable?: number
  }>
  syncedAt: string
}

export default function ShopifyProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/shopify/products")
      const data = await response.json()

      if (data.success) {
        // Transform Shopify products to our format
        const transformedProducts = data.products.map((product: any) => ({
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
        }))

        setProducts(transformedProducts)
      }
    } catch (error) {
      console.error("Failed to load products:", error)
    } finally {
      setLoading(false)
    }
  }

  const syncProducts = async () => {
    setSyncing(true)
    try {
      const response = await fetch("/api/shopify/sync-products", { method: "POST" })
      const data = await response.json()

      if (data.success) {
        await loadProducts() // Reload products after sync
      }
    } catch (error) {
      console.error("Product sync failed:", error)
    } finally {
      setSyncing(false)
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))]

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-blue pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-sage-green border-t-transparent mx-auto mb-4" />
          <p className="text-magnolia-white font-lora">Loading sacred products...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-midnight-blue pt-24">
      <div className="container mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="font-playfair text-4xl font-bold text-magnolia-white mb-2">
                🌙 Sacred Product Management
              </h1>
              <p className="font-lora text-magnolia-white/80">Manage your divine offerings with healing energy</p>
            </div>
            <div className="flex gap-3 mt-4 lg:mt-0">
              <button
                onClick={syncProducts}
                disabled={syncing}
                className="flex items-center gap-2 px-4 py-2 bg-sage-green text-magnolia-white 
                         rounded-full font-montserrat font-semibold hover:bg-sage-green/90 
                         disabled:opacity-50 transition-all duration-200"
              >
                <RefreshCw size={16} className={syncing ? "animate-spin" : ""} />
                {syncing ? "Syncing..." : "Sync Products"}
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-midnight-blue border-2 border-sage-green 
                               text-sage-green rounded-full font-montserrat font-semibold 
                               hover:bg-sage-green hover:text-midnight-blue transition-all duration-200"
              >
                <Plus size={16} />
                Add Product
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-magnolia-white rounded-2xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-midnight-blue/50" size={20} />
                  <input
                    type="text"
                    placeholder="Search sacred products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-sage-green/30 rounded-lg 
                             font-lora text-midnight-blue focus:outline-none focus:ring-2 
                             focus:ring-sage-green/50 focus:border-sage-green"
                  />
                </div>
              </div>
              <div className="lg:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-sage-green/30 rounded-lg 
                           font-lora text-midnight-blue focus:outline-none focus:ring-2 
                           focus:ring-sage-green/50 focus:border-sage-green"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-magnolia-white rounded-2xl overflow-hidden hover:shadow-xl 
                         transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-montserrat font-semibold ${
                        product.availableForSale
                          ? "bg-sage-green text-magnolia-white"
                          : "bg-warm-gray text-midnight-blue"
                      }`}
                    >
                      {product.availableForSale ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-1">{product.name}</h3>
                      <p className="text-sm text-midnight-blue/60 font-montserrat">
                        {product.category} • {product.vendor}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-playfair text-lg font-bold text-sage-green">${product.price.toFixed(2)}</div>
                      <div className="text-xs text-midnight-blue/60">{product.currency}</div>
                    </div>
                  </div>

                  <p className="text-sm text-midnight-blue/70 font-lora mb-4 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-midnight-blue/60">
                      <span className="font-semibold">Inventory:</span> {product.totalInventory || "Unlimited"}
                    </div>
                    <div className="text-sm text-midnight-blue/60">
                      <span className="font-semibold">Variants:</span> {product.variants.length}
                    </div>
                  </div>

                  {product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-sage-green/10 text-sage-green text-xs 
                                   rounded-full font-montserrat"
                        >
                          {tag}
                        </span>
                      ))}
                      {product.tags.length > 3 && (
                        <span
                          className="px-2 py-1 bg-warm-gray/20 text-midnight-blue/60 text-xs 
                                       rounded-full font-montserrat"
                        >
                          +{product.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 
                                     bg-sage-green text-magnolia-white rounded-lg font-montserrat 
                                     font-semibold hover:bg-sage-green/90 transition-all duration-200"
                    >
                      <Eye size={16} />
                      View
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 
                                     bg-midnight-blue text-magnolia-white rounded-lg font-montserrat 
                                     font-semibold hover:bg-midnight-blue/90 transition-all duration-200"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="mx-auto text-magnolia-white/50 mb-4" size={48} />
              <h3 className="font-playfair text-xl text-magnolia-white mb-2">No Sacred Products Found</h3>
              <p className="text-magnolia-white/70 font-lora">
                {searchTerm || selectedCategory !== "all"
                  ? "Try adjusting your search or filters"
                  : "Sync your Shopify products to get started"}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  )
}
