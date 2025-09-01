"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowPathIcon, CheckIcon } from "@heroicons/react/24/outline"

interface InventoryItem {
  id: string
  productId: string
  variantId: string
  title: string
  sku: string
  barcode: string | null
  inventory: number
  lowStockThreshold: number
  status: "in_stock" | "low_stock" | "out_of_stock"
}

export default function ShopifyInventoryManager() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [updatedInventory, setUpdatedInventory] = useState<Record<string, number>>({})
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch inventory items
    setTimeout(() => {
      const mockInventoryItems: InventoryItem[] = [
        {
          id: "inv_1234567890",
          productId: "gid://shopify/Product/1234567890",
          variantId: "gid://shopify/ProductVariant/1234567890",
          title: "Magnolia Bloom Tote Bag",
          sku: "MM-TOTE-001",
          barcode: "123456789012",
          inventory: 24,
          lowStockThreshold: 10,
          status: "in_stock",
        },
        {
          id: "inv_2345678901",
          productId: "gid://shopify/Product/2345678901",
          variantId: "gid://shopify/ProductVariant/2345678901",
          title: "Southern Gothic Throw Pillow",
          sku: "MM-PILLOW-001",
          barcode: "234567890123",
          inventory: 18,
          lowStockThreshold: 10,
          status: "in_stock",
        },
        {
          id: "inv_3456789012",
          productId: "gid://shopify/Product/3456789012",
          variantId: "gid://shopify/ProductVariant/3456789012",
          title: "Midnight Moon Mug",
          sku: "MM-MUG-001",
          barcode: "345678901234",
          inventory: 42,
          lowStockThreshold: 15,
          status: "in_stock",
        },
        {
          id: "inv_4567890123",
          productId: "gid://shopify/Product/4567890123",
          variantId: "gid://shopify/ProductVariant/4567890123",
          title: "Mystical Cat Bandana",
          sku: "MM-PET-001",
          barcode: "456789012345",
          inventory: 7,
          lowStockThreshold: 10,
          status: "low_stock",
        },
        {
          id: "inv_5678901234",
          productId: "gid://shopify/Product/5678901234",
          variantId: "gid://shopify/ProductVariant/5678901234",
          title: "Sacred Paws Food Bowl",
          sku: "MM-PET-002",
          barcode: "567890123456",
          inventory: 15,
          lowStockThreshold: 10,
          status: "in_stock",
        },
        {
          id: "inv_6789012345",
          productId: "gid://shopify/Product/6789012345",
          variantId: "gid://shopify/ProductVariant/6789012345",
          title: "Moonlight Pet Collar",
          sku: "MM-PET-003",
          barcode: "678901234567",
          inventory: 3,
          lowStockThreshold: 10,
          status: "low_stock",
        },
        {
          id: "inv_7890123456",
          productId: "gid://shopify/Product/7890123456",
          variantId: "gid://shopify/ProductVariant/7890123456",
          title: "Healing Herbs Pet Toy",
          sku: "MM-PET-004",
          barcode: "789012345678",
          inventory: 0,
          lowStockThreshold: 10,
          status: "out_of_stock",
        },
      ]
      setInventoryItems(mockInventoryItems)
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleEditInventory = (id: string) => {
    setEditingItem(id)
    const item = inventoryItems.find((item) => item.id === id)
    if (item) {
      setUpdatedInventory({
        ...updatedInventory,
        [id]: item.inventory,
      })
    }
  }

  const handleInventoryChange = (id: string, value: string) => {
    const numValue = Number.parseInt(value, 10)
    if (!isNaN(numValue) && numValue >= 0) {
      setUpdatedInventory({
        ...updatedInventory,
        [id]: numValue,
      })
    }
  }

  const handleSaveInventory = async (id: string) => {
    setIsSaving(true)

    // Simulate API call to update inventory
    setTimeout(() => {
      const updatedItems = inventoryItems.map((item) => {
        if (item.id === id) {
          const newInventory = updatedInventory[id]
          let newStatus = item.status

          if (newInventory === 0) {
            newStatus = "out_of_stock"
          } else if (newInventory <= item.lowStockThreshold) {
            newStatus = "low_stock"
          } else {
            newStatus = "in_stock"
          }

          return {
            ...item,
            inventory: newInventory,
            status: newStatus as "in_stock" | "low_stock" | "out_of_stock",
          }
        }
        return item
      })

      setInventoryItems(updatedItems)
      setEditingItem(null)
      setIsSaving(false)
    }, 1000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_stock":
        return "bg-green-500/20 text-green-500"
      case "low_stock":
        return "bg-yellow-500/20 text-yellow-500"
      case "out_of_stock":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "in_stock":
        return "In Stock"
      case "low_stock":
        return "Low Stock"
      case "out_of_stock":
        return "Out of Stock"
      default:
        return status
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rich-gold"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-magnolia-white">Inventory Levels</h3>
          <p className="text-sm text-magnolia-white/70">Manage stock levels for your physical products</p>
        </div>
        <Button
          variant="outline"
          className="bg-magnolia-white/10 border-none text-magnolia-white hover:bg-magnolia-white/20"
        >
          <ArrowPathIcon className="w-4 h-4 mr-2" />
          Sync Inventory
        </Button>
      </div>

      <div className="rounded-md border border-magnolia-white/10">
        <div className="grid grid-cols-6 gap-4 p-4 bg-midnight-blue/50 text-magnolia-white/70 text-sm font-montserrat">
          <div>Product</div>
          <div>SKU</div>
          <div>Barcode</div>
          <div>Inventory</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        <div className="divide-y divide-magnolia-white/10">
          {inventoryItems.map((item) => (
            <div key={item.id} className="grid grid-cols-6 gap-4 p-4 text-magnolia-white items-center">
              <div className="font-medium">{item.title}</div>
              <div className="text-sm font-mono">{item.sku}</div>
              <div className="text-sm font-mono">{item.barcode || "—"}</div>
              <div>
                {editingItem === item.id ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={updatedInventory[item.id]}
                      onChange={(e) => handleInventoryChange(item.id, e.target.value)}
                      className="w-20 bg-midnight-blue/50 border-magnolia-white/20 text-magnolia-white"
                      min="0"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleSaveInventory(item.id)}
                      disabled={isSaving}
                      className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue h-8 w-8 p-0"
                    >
                      {isSaving ? (
                        <div className="animate-spin h-4 w-4 border-2 border-midnight-blue border-t-transparent rounded-full"></div>
                      ) : (
                        <CheckIcon className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                ) : (
                  <span className="font-medium">{item.inventory}</span>
                )}
              </div>
              <div>
                <Badge className={`${getStatusColor(item.status)}`}>{getStatusLabel(item.status)}</Badge>
              </div>
              <div>
                {editingItem !== item.id && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditInventory(item.id)}
                    className="bg-magnolia-white/10 border-none text-magnolia-white hover:bg-magnolia-white/20"
                  >
                    Update Stock
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-midnight-blue/30 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-magnolia-white mb-4">Inventory Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-500/10 p-4 rounded-lg">
            <p className="text-sm text-magnolia-white/70">In Stock Items</p>
            <p className="text-2xl font-bold text-green-500">
              {inventoryItems.filter((item) => item.status === "in_stock").length}
            </p>
          </div>
          <div className="bg-yellow-500/10 p-4 rounded-lg">
            <p className="text-sm text-magnolia-white/70">Low Stock Items</p>
            <p className="text-2xl font-bold text-yellow-500">
              {inventoryItems.filter((item) => item.status === "low_stock").length}
            </p>
          </div>
          <div className="bg-red-500/10 p-4 rounded-lg">
            <p className="text-sm text-magnolia-white/70">Out of Stock Items</p>
            <p className="text-2xl font-bold text-red-500">
              {inventoryItems.filter((item) => item.status === "out_of_stock").length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
