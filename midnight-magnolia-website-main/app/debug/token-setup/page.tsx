"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, CheckCircle, ExternalLink } from "lucide-react"

export default function TokenSetupPage() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null)

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text)
    setCopiedStep(step)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  const envVars = [
    {
      name: "SHOPIFY_STORE_DOMAIN",
      example: "your-shop-name.myshopify.com",
      description: "Your shop's domain (without https://)",
    },
    {
      name: "SHOPIFY_STOREFRONT_ACCESS_TOKEN",
      example: "shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      description: "Public Storefront Access Token for reading products",
    },
  ]

  return (
    <main className="min-h-screen bg-midnight-blue pt-24">
      <div className="container mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-magnolia-white mb-4">
              🌙 Simple Shopify Setup
            </h1>
            <p className="font-lora text-xl text-magnolia-white/80">
              You only need 2 things: your shop domain and a public Storefront token
            </p>
          </div>

          {/* Step-by-step guide */}
          <div className="space-y-8">
            {/* Step 1: Get Domain */}
            <div className="bg-magnolia-white rounded-2xl p-8">
              <h2 className="font-playfair text-2xl font-bold text-midnight-blue mb-6 flex items-center gap-3">
                <span className="bg-sage-green text-magnolia-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                Find Your Shop Domain
              </h2>
              <div className="space-y-4">
                <p className="font-lora text-midnight-blue/80">
                  Your shop domain is in your Shopify admin URL. It looks like:{" "}
                  <code className="bg-sage-green/10 px-2 py-1 rounded">your-shop-name.myshopify.com</code>
                </p>
                <div className="bg-sage-green/10 p-4 rounded-lg">
                  <p className="font-montserrat font-semibold text-midnight-blue mb-2">
                    Set this environment variable:
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="bg-midnight-blue text-magnolia-white px-3 py-2 rounded flex-1">
                      SHOPIFY_STORE_DOMAIN=your-shop-name.myshopify.com
                    </code>
                    <button
                      onClick={() => copyToClipboard("SHOPIFY_STORE_DOMAIN=your-shop-name.myshopify.com", 1)}
                      className="p-2 bg-sage-green text-magnolia-white rounded hover:bg-sage-green/80"
                    >
                      {copiedStep === 1 ? <CheckCircle size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Get Storefront Token */}
            <div className="bg-magnolia-white rounded-2xl p-8">
              <h2 className="font-playfair text-2xl font-bold text-midnight-blue mb-6 flex items-center gap-3">
                <span className="bg-sage-green text-magnolia-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                Generate Storefront Access Token
              </h2>
              <div className="space-y-4">
                <p className="font-lora text-midnight-blue/80">
                  This is a <strong>public token</strong> that allows reading products. It's safe to use in your app.
                </p>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h3 className="font-montserrat font-semibold text-midnight-blue mb-3">📋 Steps to Generate:</h3>
                  <ol className="space-y-2 font-lora text-midnight-blue/80">
                    <li>1. Go to your Shopify Admin</li>
                    <li>
                      2. Navigate to <strong>Apps → App and sales channel settings</strong>
                    </li>
                    <li>
                      3. Click <strong>"Develop apps"</strong>
                    </li>
                    <li>
                      4. Click <strong>"Create an app"</strong>
                    </li>
                    <li>5. Give it a name like "Website Integration"</li>
                    <li>
                      6. Click <strong>"Configure Storefront API scopes"</strong>
                    </li>
                    <li>
                      7. Enable these permissions:
                      <ul className="ml-4 mt-2 space-y-1">
                        <li>• Read products, variants, and collections</li>
                        <li>• Read product listings</li>
                      </ul>
                    </li>
                    <li>
                      8. Click <strong>"Save"</strong>
                    </li>
                    <li>
                      9. Click <strong>"Install app"</strong>
                    </li>
                    <li>
                      10. Copy the <strong>Storefront access token</strong>
                    </li>
                  </ol>
                </div>

                <div className="bg-sage-green/10 p-4 rounded-lg">
                  <p className="font-montserrat font-semibold text-midnight-blue mb-2">
                    Set this environment variable:
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="bg-midnight-blue text-magnolia-white px-3 py-2 rounded flex-1">
                      SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_your_token_here
                    </code>
                    <button
                      onClick={() => copyToClipboard("SHOPIFY_STOREFRONT_ACCESS_TOKEN=", 2)}
                      className="p-2 bg-sage-green text-magnolia-white rounded hover:bg-sage-green/80"
                    >
                      {copiedStep === 2 ? <CheckCircle size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Set in Vercel */}
            <div className="bg-magnolia-white rounded-2xl p-8">
              <h2 className="font-playfair text-2xl font-bold text-midnight-blue mb-6 flex items-center gap-3">
                <span className="bg-sage-green text-magnolia-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                Add to Vercel Environment Variables
              </h2>
              <div className="space-y-4">
                <p className="font-lora text-midnight-blue/80">Add both variables to your Vercel project settings:</p>

                <div className="grid gap-4">
                  {envVars.map((envVar, index) => (
                    <div key={index} className="bg-sage-green/5 border border-sage-green/20 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <code className="font-mono text-sm font-semibold text-midnight-blue">{envVar.name}</code>
                        <button
                          onClick={() => copyToClipboard(envVar.name, index + 10)}
                          className="text-sage-green hover:text-sage-green/70"
                        >
                          {copiedStep === index + 10 ? <CheckCircle size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                      <p className="font-lora text-sm text-midnight-blue/70 mb-2">{envVar.description}</p>
                      <code className="text-xs text-midnight-blue/60 bg-midnight-blue/5 px-2 py-1 rounded">
                        {envVar.example}
                      </code>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="font-lora text-midnight-blue/80">
                    <strong>💡 Tip:</strong> After adding the variables in Vercel, redeploy your app or the changes
                    won't take effect.
                  </p>
                </div>
              </div>
            </div>

            {/* Test Connection */}
            <div className="bg-magnolia-white rounded-2xl p-8">
              <h2 className="font-playfair text-2xl font-bold text-midnight-blue mb-6 flex items-center gap-3">
                <span className="bg-sage-green text-magnolia-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </span>
                Test Your Connection
              </h2>
              <div className="space-y-4">
                <p className="font-lora text-midnight-blue/80">
                  Once you've set the environment variables, test your connection:
                </p>
                <div className="flex gap-4">
                  <a
                    href="/debug/tokens"
                    className="flex items-center gap-2 px-6 py-3 bg-sage-green text-magnolia-white 
                             font-montserrat font-semibold rounded-full hover:bg-sage-green/90 transition-all duration-200"
                  >
                    <ExternalLink size={18} />
                    Test Tokens
                  </a>
                  <a
                    href="/shop"
                    className="flex items-center gap-2 px-6 py-3 bg-midnight-blue text-magnolia-white 
                             font-montserrat font-semibold rounded-full hover:bg-midnight-blue/90 transition-all duration-200"
                  >
                    <ExternalLink size={18} />
                    View Shop
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
