"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline"

interface ShopifyProduct {
  id: string
  title: string
  image: string
  price: number
  compareAtPrice: number | null
  inventory: number
  status: "active" | "draft" | "archived"
  type: string
  vendor: string
}

export default function ShopifyProductList() {
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch Shopify products
    setTimeout(() => {
      const mockProducts: ShopifyProduct[] = [
        {
          id: "gid://shopify/Product/1234567890",
          title: "Magnolia Bloom Tote Bag",
          image: "/magnolia-tote-bag.png",
          price: 34.99,
          compareAtPrice: 42.99,
          inventory: 24,
          status: "active",
          type: "Accessories",
          vendor: "Midnight Magnolia",
        },
        {
          id: "gid://shopify/Product/2345678901",
          title: "Southern Gothic Throw Pillow",
          image: "/southern-gothic-pillow.png",
          price: 29.99,
          compareAtPrice: 35.99,
          inventory: 18,
          status: "active",
          type: "Home Decor",
          vendor: "Midnight Magnolia",
        },
        {
          id: "gid://shopify/Product/3456789012",
          title: "Midnight Moon Mug",
          image: "/elegant-moon-magnolia-mug.png",
          price: 19.99,
          compareAtPrice: 24.99,
          inventory: 42,
          status: "active",
          type: "Kitchenware",
          vendor: "Midnight Magnolia",
        },
        {
          id: "gid://shopify/Product/4567890123",
          title: "Mystical Cat Bandana",
          image: "/mystical-cat-bandana.png",
          price: 16.99,
          compareAtPrice: 21.99,
          inventory: 7,
          status: "active",
          type: "Pet Accessories",
          vendor: "Midnight Magnolia",
        },
        {
          id: "gid://shopify/Product/5678901234",
          title: "Sacred Paws Food Bowl",
          image: "/sacred-paws-bowl.png",
          price: 22.99,
          compareAtPrice: 27.99,
          inventory: 15,
          status: "active",
          type: "Pet Accessories",
          vendor: "Midnight Magnolia",
        },
        {
          id: "gid://shopify/Product/6789012345",
          title: "Moonlight Pet Collar",
          image: "/moonlight-pet-collar.png",
          price: 28.99,
          compareAtPrice: 34.99,
          inventory: 3,
          status: "active",
          type: "Pet Accessories",
          vendor: "Midnight Magnolia",
        },
      ]
      setProducts(mockProducts)
      setIsLoading(false)
    }, 1000)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-500"
      case "draft":
        return "bg-yellow-500/20 text-yellow-500"
      case "archived":
        return "bg-gray-500/20 text-gray-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  const getInventoryColor = (inventory: number) => {
    if (inventory <= 5) return "text-red-500"
    if (inventory <= 10) return "text-yellow-500"
    return "text-green-500"
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rich-gold"></div>
      </div>
    )
  }

  return (
    <div className="rounded-md border border-magnolia-white/10">
      <div className="grid grid-cols-7 gap-4 p-4 bg-midnight-blue/50 text-magnolia-white/70 text-sm font-montserrat">
        <div>Product</div>
        <div>Type</div>
        <div>Price</div>
        <div>Inventory</div>
        <div>Status</div>
        <div>Vendor</div>
        <div>Actions</div>
      </div>
      <div className="divide-y divide-magnolia-white/10">
        {products.map((product) => (
          <div key={product.id} className="grid grid-cols-7 gap-4 p-4 text-magnolia-white items-center">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-md overflow-hidden bg-midnight-blue/30">
                <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
              </div>
              <span className="font-medium truncate">{product.title}</span>
            </div>
            <div className="text-sm">{product.type}</div>
            <div className="text-sm">
              <div className="font-medium">{formatCurrency(product.price)}</div>
              {product.compareAtPrice && (
                <div className="text-xs text-magnolia-white/60 line-through">
                  {formatCurrency(product.compareAtPrice)}
                </div>
              )}
            </div>
            <div className={`text-sm font-medium ${getInventoryColor(product.inventory)}`}>{product.inventory}</div>
            <div>
              <Badge className={`${getStatusColor(product.status)}`}>
                {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
              </Badge>
            </div>
            <div className="text-sm">{product.vendor}</div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-magnolia-white/10 border-none text-magnolia-white hover:bg-magnolia-white/20 h-8 w-8 p-0"
              >
                <EyeIcon className="w-4 h-4" />
                <span className="sr-only">View</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-magnolia-white/10 border-none text-magnolia-white hover:bg-magnolia-white/20 h-8 w-8 p-0"
              >
                <PencilIcon className="w-4 h-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-red-500/10 border-none text-red-400 hover:bg-red-500/20 h-8 w-8 p-0"
              >
                <TrashIcon className="w-4 h-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
