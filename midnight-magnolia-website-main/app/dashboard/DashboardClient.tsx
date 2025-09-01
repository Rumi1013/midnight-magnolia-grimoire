"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  UserGroupIcon,
  SparklesIcon,
  MoonIcon,
  BellIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline"

interface EnergyLevel {
  level: "high" | "medium" | "low"
  label: string
  color: string
}

interface Task {
  id: string
  title: string
  priority: "high" | "medium" | "low" | "completed"
  completed: boolean
}

interface Stat {
  title: string
  value: string
  change: string
  trend: "positive" | "negative" | "neutral"
}

export default function DashboardClient() {
  const [currentEnergy, setCurrentEnergy] = useState<"high" | "medium" | "low">("medium")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Complete Tarot deck descriptions", priority: "high", completed: false },
    { id: "2", title: "Upload new journal templates", priority: "medium", completed: false },
    { id: "3", title: "Respond to customer inquiries", priority: "completed", completed: true },
    { id: "4", title: "Update Notion content calendar", priority: "medium", completed: false },
  ])

  const energyLevels: EnergyLevel[] = [
    { level: "high", label: "High", color: "border-green-500" },
    { level: "medium", label: "Medium", color: "border-yellow-500" },
    { level: "low", label: "Low", color: "border-red-500" },
  ]

  const stats: Stat[] = [
    { title: "Revenue", value: "$2,450", change: "+18% this month", trend: "positive" },
    { title: "Orders", value: "32", change: "+5 since last week", trend: "positive" },
    { title: "Products", value: "14", change: "No change", trend: "neutral" },
    { title: "Goal Progress", value: "$2,450/$10,000", change: "24.5% complete", trend: "positive" },
  ]

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed, priority: task.completed ? task.priority : "completed" }
          : task,
      ),
    )
  }

  const getMoonPhase = () => {
    const phases = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"]
    const dayOfMonth = currentTime.getDate()
    return phases[Math.floor(dayOfMonth / 4) % 8]
  }

  return (
    <div className="min-h-screen bg-midnight-blue">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-midnight-teal p-6 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-rich-gold rounded-full flex items-center justify-center">
            <span className="text-midnight-blue font-bold">MM</span>
          </div>
          <div>
            <h2 className="font-playfair text-xl font-bold text-magnolia-white">Midnight Magnolia</h2>
            <p className="font-montserrat text-xs text-sage-green tracking-wider">DIGITAL SANCTUARY</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mb-8">
          <ul className="space-y-3">
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-magnolia-white/15 text-rich-gold">
                <ChartBarIcon className="w-5 h-5" />
                <span className="font-lora">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#content"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-magnolia-white hover:bg-magnolia-white/10 transition-colors"
              >
                <SparklesIcon className="w-5 h-5" />
                <span className="font-lora">Content Creation</span>
              </a>
            </li>
            <li>
              <a
                href="#inventory"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-magnolia-white hover:bg-magnolia-white/10 transition-colors"
              >
                <DocumentTextIcon className="w-5 h-5" />
                <span className="font-lora">Digital Inventory</span>
              </a>
            </li>
            <li>
              <a
                href="#sales"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-magnolia-white hover:bg-magnolia-white/10 transition-colors"
              >
                <ArrowTrendingUpIcon className="w-5 h-5" />
                <span className="font-lora">Sales & Orders</span>
              </a>
            </li>
            <li>
              <a
                href="#clients"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-magnolia-white hover:bg-magnolia-white/10 transition-colors"
              >
                <UserGroupIcon className="w-5 h-5" />
                <span className="font-lora">Client Management</span>
              </a>
            </li>
            <li>
              <a
                href="#settings"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-magnolia-white hover:bg-magnolia-white/10 transition-colors"
              >
                <CogIcon className="w-5 h-5" />
                <span className="font-lora">Settings</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Energy Tracker */}
        <div className="bg-midnight-blue/50 p-4 rounded-lg">
          <h3 className="font-montserrat text-sm font-semibold text-magnolia-white mb-3 uppercase tracking-wider">
            Energy Tracker
          </h3>
          <div className="flex gap-2">
            {energyLevels.map((energy) => (
              <button
                key={energy.level}
                onClick={() => setCurrentEnergy(energy.level)}
                className={`flex-1 py-2 px-3 rounded text-xs font-montserrat transition-all ${
                  currentEnergy === energy.level
                    ? "bg-magnolia-white/15 text-rich-gold"
                    : "text-magnolia-white hover:bg-magnolia-white/10"
                } border-b-2 ${energy.color}`}
              >
                {energy.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-80 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-magnolia-white mb-2">Welcome, Latisha</h1>
            <p className="font-montserrat text-sage-green flex items-center gap-2">
              <span className="text-xl">{getMoonPhase()}</span>
              Waxing Crescent |{" "}
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <BellIcon className="w-6 h-6 text-magnolia-white cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-rich-gold text-midnight-blue text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </div>
            <div className="w-10 h-10 bg-sage-green rounded-full flex items-center justify-center">
              <span className="text-midnight-blue font-bold text-sm">LW</span>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-midnight-teal p-6 rounded-lg"
            >
              <h3 className="font-montserrat text-sm font-semibold text-magnolia-white mb-2 uppercase tracking-wider">
                {stat.title}
              </h3>
              <p className="font-playfair text-2xl font-bold text-magnolia-white mb-2">{stat.value}</p>
              <p
                className={`font-montserrat text-sm ${
                  stat.trend === "positive"
                    ? "text-green-400"
                    : stat.trend === "negative"
                      ? "text-red-400"
                      : "text-yellow-400"
                }`}
              >
                {stat.change}
              </p>
              {stat.title === "Goal Progress" && (
                <div className="mt-3 bg-midnight-blue/50 rounded-full h-2">
                  <div className="bg-rich-gold h-2 rounded-full" style={{ width: "24.5%" }}></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Recent Activity */}
          <div className="bg-midnight-teal p-6 rounded-lg">
            <h2 className="font-playfair text-xl font-bold text-rich-gold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 bg-green-500/20 rounded-full flex items-center justify-center">
                  <ArrowTrendingUpIcon className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="font-lora text-magnolia-white">New sale: The Magnolia Reset Journal</p>
                  <p className="font-montserrat text-sm text-magnolia-white/70">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-lora text-magnolia-white">Created 5 new affirmation cards</p>
                  <p className="font-montserrat text-sm text-magnolia-white/70">Yesterday</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <UserGroupIcon className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-lora text-magnolia-white">New client: Maya Johnson</p>
                  <p className="font-montserrat text-sm text-magnolia-white/70">2 days ago</p>
                </div>
              </div>
            </div>
            <a href="#" className="block text-center mt-6 text-rich-gold font-montserrat text-sm hover:underline">
              View all activity
            </a>
          </div>

          {/* Today's Tasks */}
          <div className="bg-midnight-teal p-6 rounded-lg">
            <h2 className="font-playfair text-xl font-bold text-rich-gold mb-6">Today's Tasks</h2>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-5 h-5 rounded border-2 border-magnolia-white/30 bg-transparent checked:bg-rich-gold checked:border-rich-gold"
                    />
                    <span
                      className={`font-lora ${task.completed ? "line-through text-magnolia-white/60" : "text-magnolia-white"}`}
                    >
                      {task.title}
                    </span>
                  </label>
                  <span
                    className={`px-2 py-1 rounded text-xs font-montserrat ${
                      task.priority === "high"
                        ? "bg-red-500/20 text-red-400"
                        : task.priority === "medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : task.priority === "low"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-magnolia-white/20 text-magnolia-white/60"
                    }`}
                  >
                    {task.priority === "completed" ? "Completed" : task.priority}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border-2 border-dashed border-magnolia-white/30 rounded-lg text-rich-gold font-montserrat text-sm hover:bg-magnolia-white/5 transition-colors">
              + Add New Task
            </button>
          </div>
        </div>

        {/* Integration Status */}
        <div className="bg-midnight-teal p-6 rounded-lg mb-8">
          <h2 className="font-playfair text-xl font-bold text-rich-gold mb-6">Platform Integrations</h2>
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-400 font-bold">N</span>
              </div>
              <h3 className="font-montserrat text-sm font-semibold text-magnolia-white mb-1">Notion</h3>
              <div className="flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs text-green-400">Connected</span>
              </div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-400 font-bold">A</span>
              </div>
              <h3 className="font-montserrat text-sm font-semibold text-magnolia-white mb-1">Airtable</h3>
              <div className="flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs text-green-400">Connected</span>
              </div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-400 font-bold">H</span>
              </div>
              <h3 className="font-montserrat text-sm font-semibold text-magnolia-white mb-1">HubSpot</h3>
              <div className="flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs text-green-400">Connected</span>
              </div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-red-400 font-bold">M</span>
              </div>
              <h3 className="font-montserrat text-sm font-semibold text-magnolia-white mb-1">Make.com</h3>
              <div className="flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-xs text-yellow-400">Reconnect</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Create */}
        <div className="bg-midnight-teal p-6 rounded-lg">
          <h2 className="font-playfair text-xl font-bold text-rich-gold mb-6">Quick Create</h2>
          <div className="grid grid-cols-4 gap-4">
            <a
              href="#"
              className="flex flex-col items-center p-4 bg-magnolia-white/5 rounded-lg hover:bg-magnolia-white/10 transition-colors"
            >
              <SparklesIcon className="w-8 h-8 text-rich-gold mb-2" />
              <span className="font-montserrat text-sm text-magnolia-white text-center">Affirmation Card</span>
            </a>
            <a
              href="#"
              className="flex flex-col items-center p-4 bg-magnolia-white/5 rounded-lg hover:bg-magnolia-white/10 transition-colors"
            >
              <MoonIcon className="w-8 h-8 text-rich-gold mb-2" />
              <span className="font-montserrat text-sm text-magnolia-white text-center">Tarot Description</span>
            </a>
            <a
              href="#"
              className="flex flex-col items-center p-4 bg-magnolia-white/5 rounded-lg hover:bg-magnolia-white/10 transition-colors"
            >
              <DocumentTextIcon className="w-8 h-8 text-rich-gold mb-2" />
              <span className="font-montserrat text-sm text-magnolia-white text-center">Journal Prompt</span>
            </a>
            <a
              href="#"
              className="flex flex-col items-center p-4 bg-magnolia-white/5 rounded-lg hover:bg-magnolia-white/10 transition-colors"
            >
              <ArrowTrendingUpIcon className="w-8 h-8 text-rich-gold mb-2" />
              <span className="font-montserrat text-sm text-magnolia-white text-center">Product Listing</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
