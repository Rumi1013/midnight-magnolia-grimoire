"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface StripeSetupFormProps {
  onConnect: () => void
}

export default function StripeSetupForm({ onConnect }: StripeSetupFormProps) {
  const [setupOption, setSetupOption] = useState<"new" | "existing">("new")
  const [isLoading, setIsLoading] = useState(false)

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call to connect Stripe
    setTimeout(() => {
      setIsLoading(false)
      onConnect()
    }, 2000)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <RadioGroup
        value={setupOption}
        onValueChange={(value) => setSetupOption(value as "new" | "existing")}
        className="mb-6 space-y-4"
      >
        <div className="flex items-start space-x-3 bg-midnight-blue/50 p-4 rounded-lg">
          <RadioGroupItem value="new" id="new" className="mt-1 border-magnolia-white/50 text-rich-gold" />
          <div className="flex-1">
            <Label htmlFor="new" className="text-magnolia-white font-semibold">
              Create a new Stripe account
            </Label>
            <p className="text-sm text-magnolia-white/70 mt-1">
              Set up a new Stripe account to process payments for your digital products. Stripe offers secure payment
              processing with support for credit cards, Apple Pay, Google Pay, and more.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3 bg-midnight-blue/50 p-4 rounded-lg">
          <RadioGroupItem value="existing" id="existing" className="mt-1 border-magnolia-white/50 text-rich-gold" />
          <div className="flex-1">
            <Label htmlFor="existing" className="text-magnolia-white font-semibold">
              Connect an existing Stripe account
            </Label>
            <p className="text-sm text-magnolia-white/70 mt-1">
              Connect your existing Stripe account to start processing payments immediately. Your existing products,
              customers, and payment methods will be available.
            </p>
          </div>
        </div>
      </RadioGroup>

      <form onSubmit={handleConnect} className="space-y-6">
        {setupOption === "new" ? (
          <div className="space-y-4 bg-midnight-blue/30 p-6 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name" className="text-magnolia-white">
                  First Name
                </Label>
                <Input
                  id="first-name"
                  placeholder="Enter your first name"
                  className="bg-midnight-blue/50 border-magnolia-white/20 text-magnolia-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name" className="text-magnolia-white">
                  Last Name
                </Label>
                <Input
                  id="last-name"
                  placeholder="Enter your last name"
                  className="bg-midnight-blue/50 border-magnolia-white/20 text-magnolia-white"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-magnolia-white">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="bg-midnight-blue/50 border-magnolia-white/20 text-magnolia-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-name" className="text-magnolia-white">
                Business Name
              </Label>
              <Input
                id="business-name"
                placeholder="Enter your business name"
                className="bg-midnight-blue/50 border-magnolia-white/20 text-magnolia-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-website" className="text-magnolia-white">
                Business Website
              </Label>
              <Input
                id="business-website"
                placeholder="https://your-website.com"
                className="bg-midnight-blue/50 border-magnolia-white/20 text-magnolia-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country" className="text-magnolia-white">
                Country
              </Label>
              <select
                id="country"
                className="w-full bg-midnight-blue/50 border border-magnolia-white/20 text-magnolia-white rounded-md p-2"
                required
              >
                <option value="">Select your country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="space-y-4 bg-midnight-blue/30 p-6 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="stripe-account-id" className="text-magnolia-white">
                Stripe Account ID
              </Label>
              <Input
                id="stripe-account-id"
                placeholder="acct_1234567890"
                className="bg-midnight-blue/50 border-magnolia-white/20 text-magnolia-white"
                required
              />
              <p className="text-xs text-magnolia-white/70">
                You can find your Stripe Account ID in your Stripe Dashboard under Settings &gt; Account Settings
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stripe-api-key" className="text-magnolia-white">
                Stripe API Key
              </Label>
              <Input
                id="stripe-api-key"
                placeholder="sk_test_..."
                className="bg-midnight-blue/50 border-magnolia-white/20 text-magnolia-white"
                required
              />
              <p className="text-xs text-magnolia-white/70">
                You can find your API keys in your Stripe Dashboard under Developers &gt; API keys
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue px-8 py-6 text-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-midnight-blue border-t-transparent rounded-full"></div>
                Connecting...
              </>
            ) : (
              "Connect with Stripe"
            )}
          </Button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-magnolia-white/70">
          By connecting with Stripe, you agree to the{" "}
          <a
            href="https://stripe.com/terms"
            className="text-rich-gold hover:underline"
            target="_blank"
            rel="noreferrer noopener"
          >
            Stripe Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="https://stripe.com/privacy"
            className="text-rich-gold hover:underline"
            target="_blank"
            rel="noreferrer noopener"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}
