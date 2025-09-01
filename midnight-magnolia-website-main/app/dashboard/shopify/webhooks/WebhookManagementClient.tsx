"use client"

import { useState, useEffect } from "react"
import {
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  UserGroupIcon,
  SparklesIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  PlayIcon,
  StopIcon,
} from "@heroicons/react/24/outline"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface WebhookJob {
  id: number
  webhookTopic: string
  shopifyId: string
  status: "pending" | "processing" | "completed" | "failed" | "dead_letter"
  retryCount: number
  maxRetries: number
  lastError?: string
  createdAt: string
  updatedAt: string
}

interface QueueStats {
  status: string
  count: number
  webhookTopic: string
  avgRetries: number
}

export default function WebhookManagementClient() {
  const [failedJobs, setFailedJobs] = useState<WebhookJob[]>([])
  const [queueStats, setQueueStats] = useState<QueueStats[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessorRunning, setIsProcessorRunning] = useState(false)
  const [activeTab, setActiveTab] = useState("queue")

  useEffect(() => {
    loadFailedJobs()
    loadQueueStats()
  }, [])

  const loadFailedJobs = async () => {
    try {
      const response = await fetch("/api/webhooks/retry")
      const data = await response.json()

      if (data.success) {
        setFailedJobs(data.failedJobs)
        setQueueStats(data.queueStats)
      }
    } catch (error) {
      console.error("Error loading failed jobs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadQueueStats = async () => {
    // This would be implemented to get real-time queue statistics
    // For now, using mock data
    const mockStats: QueueStats[] = [
      { status: "pending", count: 5, webhookTopic: "orders/create", avgRetries: 0 },
      { status: "completed", count: 150, webhookTopic: "orders/create", avgRetries: 1.2 },
      { status: "failed", count: 2, webhookTopic: "products/update", avgRetries: 3.5 },
      { status: "dead_letter", count: 1, webhookTopic: "inventory_levels/update", avgRetries: 5 },
    ]
    setQueueStats(mockStats)
  }

  const startProcessor = async () => {
    try {
      const response = await fetch("/api/webhooks/process", { method: "POST" })
      const data = await response.json()

      if (data.success) {
        setIsProcessorRunning(true)
      }
    } catch (error) {
      console.error("Error starting processor:", error)
    }
  }

  const stopProcessor = async () => {
    try {
      const response = await fetch("/api/webhooks/process", { method: "DELETE" })
      const data = await response.json()

      if (data.success) {
        setIsProcessorRunning(false)
      }
    } catch (error) {
      console.error("Error stopping processor:", error)
    }
  }

  const retryJob = async (jobId: number) => {
    try {
      const response = await fetch("/api/webhooks/retry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      })

      const data = await response.json()

      if (data.success) {
        // Refresh the failed jobs list
        loadFailedJobs()
      }
    } catch (error) {
      console.error("Error retrying job:", error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />
      case "pending":
        return <ArrowPathIcon className="w-5 h-5 text-blue-500" />
      case "processing":
        return <ArrowPathIcon className="w-5 h-5 text-yellow-500 animate-spin" />
      case "failed":
        return <ExclamationTriangleIcon className="w-5 h-5 text-orange-500" />
      case "dead_letter":
        return <XCircleIcon className="w-5 h-5 text-red-500" />
      default:
        return <XCircleIcon className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      completed: "bg-green-500 text-white",
      pending: "bg-blue-500 text-white",
      processing: "bg-yellow-500 text-white",
      failed: "bg-orange-500 text-white",
      dead_letter: "bg-red-500 text-white",
    }

    return (
      <Badge className={colors[status as keyof typeof colors] || "bg-gray-500 text-white"}>
        {status.replace("_", " ")}
      </Badge>
    )
  }

  const getTotalByStatus = (status: string) => {
    return queueStats.filter((stat) => stat.status === status).reduce((sum, stat) => sum + stat.count, 0)
  }

  return (
    <div className="min-h-screen bg-midnight-blue">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-midnight-teal p-6 overflow-y-auto">
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
              <a
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-magnolia-white hover:bg-magnolia-white/10 transition-colors"
              >
                <ChartBarIcon className="w-5 h-5" />
                <span className="font-lora">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/content"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-magnolia-white hover:bg-magnolia-white/10 transition-colors"
              >
                <SparklesIcon className="w-5 h-5" />
                <span className="font-lora">Content Creation</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/inventory"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-magnolia-white hover:bg-magnolia-white/10 transition-colors"
              >
                <DocumentTextIcon className="w-5 h-5" />
                <span className="font-lora">Digital Inventory</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/payments"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-magnolia-white hover:bg-magnolia-white/10 transition-colors"
              >
                <CreditCardIcon className="w-5 h-5" />
                <span className="font-lora">Payments</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/shopify"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-magnolia-white hover:bg-magnolia-white/10 transition-colors"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                <span className="font-lora">Shopify Store</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/shopify/webhooks"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-magnolia-white/15 text-rich-gold ml-4"
              >
                <ArrowPathIcon className="w-5 h-5" />
                <span className="font-lora">Webhook Queue</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/clients"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-magnolia-white hover:bg-magnolia-white/10 transition-colors"
              >
                <UserGroupIcon className="w-5 h-5" />
                <span className="font-lora">Client Management</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/settings"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-magnolia-white hover:bg-magnolia-white/10 transition-colors"
              >
                <CogIcon className="w-5 h-5" />
                <span className="font-lora">Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-80 p-6">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-magnolia-white mb-2">Webhook Queue Management</h1>
            <p className="font-montserrat text-sage-green">
              Monitor and manage webhook processing with automatic retry mechanisms
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isProcessorRunning ? "bg-green-500" : "bg-red-500"}`} />
              <span className="text-magnolia-white text-sm">
                Processor {isProcessorRunning ? "Running" : "Stopped"}
              </span>
            </div>
            {isProcessorRunning ? (
              <Button onClick={stopProcessor} className="bg-red-500 hover:bg-red-600 text-white">
                <StopIcon className="w-4 h-4 mr-2" />
                Stop Processor
              </Button>
            ) : (
              <Button onClick={startProcessor} className="bg-green-500 hover:bg-green-600 text-white">
                <PlayIcon className="w-4 h-4 mr-2" />
                Start Processor
              </Button>
            )}
          </div>
        </header>

        {/* Queue Stats */}
        <div className="grid grid-cols-5 gap-6 mb-8">
          <Card className="bg-midnight-teal border-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <ArrowPathIcon className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-magnolia-white/70">Pending</p>
                  <h3 className="text-2xl font-bold text-magnolia-white">{getTotalByStatus("pending")}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-midnight-teal border-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <ArrowPathIcon className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-magnolia-white/70">Processing</p>
                  <h3 className="text-2xl font-bold text-magnolia-white">{getTotalByStatus("processing")}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-midnight-teal border-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-magnolia-white/70">Completed</p>
                  <h3 className="text-2xl font-bold text-magnolia-white">{getTotalByStatus("completed")}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-midnight-teal border-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <ExclamationTriangleIcon className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-magnolia-white/70">Failed</p>
                  <h3 className="text-2xl font-bold text-magnolia-white">{getTotalByStatus("failed")}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-midnight-teal border-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <XCircleIcon className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-magnolia-white/70">Dead Letter</p>
                  <h3 className="text-2xl font-bold text-magnolia-white">{getTotalByStatus("dead_letter")}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="queue" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-midnight-teal mb-6">
            <TabsTrigger
              value="queue"
              className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
            >
              Failed Jobs
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
            >
              Queue Statistics
            </TabsTrigger>
            <TabsTrigger
              value="setup"
              className="data-[state=active]:bg-rich-gold data-[state=active]:text-midnight-blue"
            >
              Retry Configuration
            </TabsTrigger>
          </TabsList>

          <TabsContent value="queue">
            <Card className="bg-midnight-teal border-none">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-magnolia-white">Failed Webhook Jobs</CardTitle>
                  <CardDescription className="text-magnolia-white/70">
                    Jobs that failed processing and can be manually retried
                  </CardDescription>
                </div>
                <Button onClick={loadFailedJobs} className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue">
                  <ArrowPathIcon className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {failedJobs.length === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <p className="text-magnolia-white">No failed jobs! All webhooks are processing successfully.</p>
                    </div>
                  ) : (
                    failedJobs.map((job) => (
                      <div
                        key={job.id}
                        className="flex items-center justify-between p-4 bg-midnight-blue/50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          {getStatusIcon(job.status)}
                          <div>
                            <h4 className="font-semibold text-magnolia-white">{job.webhookTopic}</h4>
                            <p className="text-sm text-magnolia-white/70">Shopify ID: {job.shopifyId}</p>
                            <p className="text-xs text-magnolia-white/50">
                              Retry {job.retryCount}/{job.maxRetries} • {new Date(job.updatedAt).toLocaleString()}
                            </p>
                            {job.lastError && (
                              <p className="text-xs text-red-400 mt-1 max-w-md truncate">{job.lastError}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(job.status)}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => retryJob(job.id)}
                            className="bg-sage-green/20 border-none text-sage-green hover:bg-sage-green/30"
                          >
                            <ArrowPathIcon className="w-4 h-4 mr-1" />
                            Retry
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <Card className="bg-midnight-teal border-none">
              <CardHeader>
                <CardTitle className="text-magnolia-white">Queue Statistics</CardTitle>
                <CardDescription className="text-magnolia-white/70">
                  Detailed breakdown of webhook processing performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {queueStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-midnight-blue/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(stat.status)}
                        <div>
                          <h4 className="font-semibold text-magnolia-white">{stat.webhookTopic}</h4>
                          <p className="text-sm text-magnolia-white/70">Status: {stat.status.replace("_", " ")}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-magnolia-white">{stat.count}</p>
                        <p className="text-xs text-magnolia-white/50">Avg retries: {stat.avgRetries.toFixed(1)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="setup">
            <Card className="bg-midnight-teal border-none">
              <CardHeader>
                <CardTitle className="text-magnolia-white">Retry Configuration</CardTitle>
                <CardDescription className="text-magnolia-white/70">
                  Understanding the automatic retry mechanism
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-magnolia-white">Retry Strategy</h3>
                    <p className="text-magnolia-white/80">
                      Failed webhooks are automatically retried with exponential backoff:
                    </p>
                    <div className="bg-midnight-blue/50 p-4 rounded-lg">
                      <ul className="space-y-2 text-magnolia-white/80">
                        <li>
                          • <strong>Retry 1:</strong> After 1 second
                        </li>
                        <li>
                          • <strong>Retry 2:</strong> After 5 seconds
                        </li>
                        <li>
                          • <strong>Retry 3:</strong> After 15 seconds
                        </li>
                        <li>
                          • <strong>Retry 4:</strong> After 1 minute
                        </li>
                        <li>
                          • <strong>Retry 5:</strong> After 5 minutes
                        </li>
                        <li>
                          • <strong>After 5 failures:</strong> Moved to dead letter queue
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-magnolia-white">Dead Letter Queue</h3>
                    <p className="text-magnolia-white/80">
                      Jobs that fail all retry attempts are moved to the dead letter queue for manual investigation.
                      These jobs can be manually retried after fixing the underlying issue.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-magnolia-white">Monitoring & Alerts</h3>
                    <p className="text-magnolia-white/80">
                      The system automatically sends alerts via Make.com when jobs are moved to the dead letter queue.
                      Configure your Make.com webhook URL in the environment variables.
                    </p>
                    <div className="bg-midnight-blue/50 p-4 rounded-lg">
                      <code className="text-magnolia-white font-mono">MAKE_WEBHOOK_URL=your_make_webhook_url_here</code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
