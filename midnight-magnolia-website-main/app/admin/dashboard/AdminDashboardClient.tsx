"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Package, ShoppingCart, Users, DollarSign, Eye, Edit, Trash2, Plus, Search, BarChart3 } from "lucide-react"

// 🌙 Mock data for demonstration
const MOCK_STATS = {
  totalRevenue: 12847.5,
  totalOrders: 156,
  totalCustomers: 89,
  totalProducts: 12,
  revenueGrowth: 23.5,
  orderGrowth: 18.2,
  customerGrowth: 15.8,
  productGrowth: 8.3,
}

const MOCK_RECENT_ORDERS = [
  {
    id: "ORD-001",
    customer: "Sarah M.",
    product: "The Magnolia Reset Journal",
    format: "Digital",
    amount: 29.0,
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Maya L.",
    product: "Midnight Messages Tarot",
    format: "Print",
    amount: 33.0,
    status: "processing",
    date: "2024-01-15",
  },
  {
    id: "ORD-003",
    customer: "Alex R.",
    product: "Sacred Productivity Planner",
    format: "Digital",
    amount: 19.0,
    status: "completed",
    date: "2024-01-14",
  },
]

const MOCK_PRODUCTS = [
  {
    id: "magnolia-reset-journal",
    name: "The Magnolia Reset 90-Day Journal",
    category: "Journals",
    formats: ["Digital", "Print", "Hardcover"],
    sales: 45,
    revenue: 1305.0,
    status: "active",
  },
  {
    id: "midnight-messages-tarot",
    name: "Midnight Messages Tarot Deck",
    category: "Spiritual",
    formats: ["Digital", "Print", "Deluxe"],
    sales: 32,
    revenue: 896.0,
    status: "active",
  },
  {
    id: "sacred-productivity-planner",
    name: "Sacred Productivity ADHD Planner",
    category: "Planners",
    formats: ["Digital", "Print"],
    sales: 28,
    revenue: 532.0,
    status: "active",
  },
]

export default function AdminDashboardClient() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  const tabs = [
    { key: "overview", label: "Sacred Overview", icon: BarChart3 },
    { key: "products", label: "Sacred Offerings", icon: Package },
    { key: "orders", label: "Sacred Orders", icon: ShoppingCart },
    { key: "customers", label: "Sacred Souls", icon: Users },
  ]

  return (
    <div className="min-h-screen bg-midnight-blue">
      {/* 🌙 Header */}
      <div className="bg-midnight-blue border-b border-sage-green/20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-playfair text-3xl font-bold text-magnolia-white mb-2">Sacred Admin Dashboard</h1>
              <p className="font-lora text-magnolia-white/70">Manage your digital sanctuary with grace and wisdom</p>
            </div>
            <button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-6 py-3 rounded-2xl transition-all duration-300 hover:shadow-lg flex items-center gap-2">
              <Plus size={18} />
              Add Sacred Offering
            </button>
          </div>
        </div>
      </div>

      {/* 🌸 Navigation Tabs */}
      <div className="bg-midnight-blue border-b border-sage-green/10">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-lora text-sm transition-colors duration-200 ${
                    activeTab === tab.key
                      ? "border-sage-green text-sage-green"
                      : "border-transparent text-magnolia-white/70 hover:text-magnolia-white"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* 🌿 Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-magnolia-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-sage-green/10 rounded-xl">
                    <DollarSign className="text-sage-green" size={24} />
                  </div>
                  <span className="text-sage-green text-sm font-montserrat font-semibold">
                    +{MOCK_STATS.revenueGrowth}%
                  </span>
                </div>
                <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-1">
                  ${MOCK_STATS.totalRevenue.toLocaleString()}
                </h3>
                <p className="font-lora text-midnight-blue/60 text-sm">Sacred Revenue</p>
              </div>

              <div className="bg-magnolia-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-sage-green/10 rounded-xl">
                    <ShoppingCart className="text-sage-green" size={24} />
                  </div>
                  <span className="text-sage-green text-sm font-montserrat font-semibold">
                    +{MOCK_STATS.orderGrowth}%
                  </span>
                </div>
                <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-1">{MOCK_STATS.totalOrders}</h3>
                <p className="font-lora text-midnight-blue/60 text-sm">Sacred Orders</p>
              </div>

              <div className="bg-magnolia-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-sage-green/10 rounded-xl">
                    <Users className="text-sage-green" size={24} />
                  </div>
                  <span className="text-sage-green text-sm font-montserrat font-semibold">
                    +{MOCK_STATS.customerGrowth}%
                  </span>
                </div>
                <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-1">
                  {MOCK_STATS.totalCustomers}
                </h3>
                <p className="font-lora text-midnight-blue/60 text-sm">Sacred Souls</p>
              </div>

              <div className="bg-magnolia-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-sage-green/10 rounded-xl">
                    <Package className="text-sage-green" size={24} />
                  </div>
                  <span className="text-sage-green text-sm font-montserrat font-semibold">
                    +{MOCK_STATS.productGrowth}%
                  </span>
                </div>
                <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-1">{MOCK_STATS.totalProducts}</h3>
                <p className="font-lora text-midnight-blue/60 text-sm">Sacred Offerings</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-magnolia-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-6">Recent Sacred Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-sage-green/20">
                      <th className="text-left font-montserrat text-sm font-semibold text-midnight-blue/80 pb-3">
                        Order ID
                      </th>
                      <th className="text-left font-montserrat text-sm font-semibold text-midnight-blue/80 pb-3">
                        Customer
                      </th>
                      <th className="text-left font-montserrat text-sm font-semibold text-midnight-blue/80 pb-3">
                        Product
                      </th>
                      <th className="text-left font-montserrat text-sm font-semibold text-midnight-blue/80 pb-3">
                        Amount
                      </th>
                      <th className="text-left font-montserrat text-sm font-semibold text-midnight-blue/80 pb-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_RECENT_ORDERS.map((order) => (
                      <tr key={order.id} className="border-b border-sage-green/10">
                        <td className="py-4 font-montserrat text-sm text-midnight-blue">{order.id}</td>
                        <td className="py-4 font-lora text-sm text-midnight-blue">{order.customer}</td>
                        <td className="py-4 font-lora text-sm text-midnight-blue">
                          {order.product} ({order.format})
                        </td>
                        <td className="py-4 font-playfair font-semibold text-midnight-blue">
                          ${order.amount.toFixed(2)}
                        </td>
                        <td className="py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-montserrat font-semibold ${
                              order.status === "completed"
                                ? "bg-sage-green/20 text-sage-green"
                                : "bg-rich-gold/20 text-rich-gold"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-midnight-blue/40"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search sacred offerings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-magnolia-white rounded-2xl border border-sage-green/20 
                           focus:outline-none focus:border-sage-green font-lora text-midnight-blue"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 bg-magnolia-white rounded-2xl border border-sage-green/20 
                         focus:outline-none focus:border-sage-green font-lora text-midnight-blue"
              >
                <option value="all">All Categories</option>
                <option value="journals">Journals</option>
                <option value="spiritual">Spiritual</option>
                <option value="planners">Planners</option>
                <option value="business">Business</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {MOCK_PRODUCTS.map((product) => (
                <div key={product.id} className="bg-magnolia-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-playfair text-lg font-bold text-midnight-blue mb-1">{product.name}</h4>
                      <p className="font-montserrat text-sm text-sage-green font-semibold">{product.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-sage-green/10 rounded-lg transition-colors duration-200">
                        <Eye size={16} className="text-midnight-blue/60" />
                      </button>
                      <button className="p-2 hover:bg-sage-green/10 rounded-lg transition-colors duration-200">
                        <Edit size={16} className="text-midnight-blue/60" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200">
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="font-lora text-sm text-midnight-blue/70">Sales:</span>
                      <span className="font-montserrat text-sm font-semibold text-midnight-blue">{product.sales}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-lora text-sm text-midnight-blue/70">Revenue:</span>
                      <span className="font-playfair font-bold text-midnight-blue">${product.revenue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-lora text-sm text-midnight-blue/70">Formats:</span>
                      <span className="font-montserrat text-sm text-midnight-blue">{product.formats.length}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.formats.map((format) => (
                      <span
                        key={format}
                        className="bg-sage-green/10 text-sage-green px-2 py-1 rounded-full text-xs font-montserrat"
                      >
                        {format}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-montserrat font-semibold ${
                        product.status === "active"
                          ? "bg-sage-green/20 text-sage-green"
                          : "bg-warm-gray/20 text-warm-gray"
                      }`}
                    >
                      {product.status}
                    </span>
                    <button className="bg-sage-green/10 hover:bg-sage-green/20 text-sage-green px-4 py-2 rounded-lg font-montserrat text-sm font-semibold transition-colors duration-200">
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-magnolia-white rounded-2xl p-6 shadow-sm"
          >
            <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-6">Sacred Orders Management</h3>
            <div className="text-center py-12">
              <ShoppingCart size={48} className="text-sage-green/50 mx-auto mb-4" />
              <p className="font-lora text-midnight-blue/60">Order management interface coming soon...</p>
            </div>
          </motion.div>
        )}

        {/* Customers Tab */}
        {activeTab === "customers" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-magnolia-white rounded-2xl p-6 shadow-sm"
          >
            <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-6">Sacred Souls Management</h3>
            <div className="text-center py-12">
              <Users size={48} className="text-sage-green/50 mx-auto mb-4" />
              <p className="font-lora text-midnight-blue/60">Customer management interface coming soon...</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
