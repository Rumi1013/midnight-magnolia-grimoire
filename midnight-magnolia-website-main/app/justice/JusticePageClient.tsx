"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { FileText, ExternalLink, Download, Info, Search } from "lucide-react"
import FloatingMoon from "@/app/components/FloatingMoon"
import FloatingZodiac from "@/app/components/FloatingZodiac"

const resourceCategories = [
  "All Resources",
  "Parole Resources",
  "Pardon Information",
  "Expungement Guides",
  "Legal Support",
  "Healing & Trauma",
  "Advocacy Tools",
]

const resources = [
  {
    id: 1,
    title: "Understanding the Parole Process: A Step-by-Step Guide",
    description:
      "A comprehensive guide to navigating the parole system, including preparation tips, documentation requirements, and what to expect during hearings.",
    category: "Parole Resources",
    type: "PDF Guide",
    fileSize: "2.4 MB",
    lastUpdated: "May 2024",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Pardon Application Template & Checklist",
    description:
      "Complete template and checklist for pardon applications, with sample language, supporting document requirements, and timeline expectations.",
    category: "Pardon Information",
    type: "Downloadable Template",
    fileSize: "1.8 MB",
    lastUpdated: "June 2024",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "State-by-State Expungement Eligibility Guide",
    description:
      "Detailed breakdown of expungement eligibility requirements for all 50 states, including waiting periods, eligible offenses, and application procedures.",
    category: "Expungement Guides",
    type: "Interactive Guide",
    fileSize: "Online Resource",
    lastUpdated: "April 2024",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "Trauma-Informed Legal Advocacy Handbook",
    description:
      "Guide for legal advocates on supporting clients with trauma histories through the justice system using trauma-informed approaches.",
    category: "Legal Support",
    type: "PDF Handbook",
    fileSize: "3.2 MB",
    lastUpdated: "March 2024",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "Healing Justice Meditation & Journaling Prompts",
    description:
      "Collection of meditation practices and journaling prompts specifically designed for processing trauma related to the justice system.",
    category: "Healing & Trauma",
    type: "Audio & PDF",
    fileSize: "45 MB",
    lastUpdated: "May 2024",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 6,
    title: "Community Advocacy Toolkit: Changing Local Policies",
    description:
      "Practical tools for organizing community advocacy efforts to change local policies around criminal justice reform and restoration.",
    category: "Advocacy Tools",
    type: "Online Toolkit",
    fileSize: "Online Resource",
    lastUpdated: "June 2024",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 7,
    title: "Financial Assistance Resources for Legal Fees",
    description:
      "Comprehensive list of organizations, grants, and programs that provide financial assistance for legal fees related to parole, pardons, and expungement.",
    category: "Legal Support",
    type: "Resource Directory",
    fileSize: "1.5 MB",
    lastUpdated: "April 2024",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 8,
    title: "Preparing for Parole Board Interviews: Practice Questions",
    description:
      "Collection of common parole board interview questions with guidance on how to prepare thoughtful, authentic responses.",
    category: "Parole Resources",
    type: "PDF Guide",
    fileSize: "1.2 MB",
    lastUpdated: "May 2024",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 9,
    title: "Expungement Self-Assessment Tool",
    description:
      "Interactive tool to help individuals determine if they might be eligible for expungement based on their specific circumstances and state laws.",
    category: "Expungement Guides",
    type: "Online Tool",
    fileSize: "Online Resource",
    lastUpdated: "June 2024",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function JusticePageClient() {
  const [selectedCategory, setSelectedCategory] = useState("All Resources")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredResources = resources.filter((resource) => {
    // Filter by category
    if (selectedCategory !== "All Resources" && resource.category !== selectedCategory) return false

    // Filter by search query
    if (
      searchQuery &&
      !resource.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false

    return true
  })

  return (
    <>
      <FloatingMoon />
      <FloatingZodiac />

      <main className="min-h-screen bg-midnight-blue pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-midnight-blue to-midnight-blue/80">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-magnolia-white mb-6">
                Justice & Healing
              </h1>
              <p className="font-lora text-xl text-magnolia-white/80 leading-relaxed mb-8">
                Resources for navigating parole, pardon, and expungement processes, alongside tools for healing from
                systemic trauma. Justice and restoration go hand in hand.
              </p>
              <div className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-12 rounded-full bg-magnolia-white/10 backdrop-blur-sm border border-magnolia-white/20 text-magnolia-white placeholder-magnolia-white/50 focus:outline-none focus:ring-2 focus:ring-sage-green/50 font-lora"
                />
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-magnolia-white/70"
                  size={18}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="py-8 bg-[#0A192F] border-y border-magnolia-white/10">
          <div className="container mx-auto px-6">
            <div className="bg-magnolia-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col md:flex-row gap-4 items-center">
              <div className="bg-gold/20 p-3 rounded-full">
                <Info size={24} className="text-gold" />
              </div>
              <div>
                <h2 className="font-playfair text-xl font-bold text-magnolia-white mb-2">Legal Disclaimer</h2>
                <p className="font-lora text-magnolia-white/80">
                  The resources provided are for informational purposes only and do not constitute legal advice. Please
                  consult with a qualified attorney for guidance specific to your situation. Laws vary by state and
                  change over time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 bg-magnolia-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar - Categories */}
              <div className="lg:w-1/4">
                <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
                  <h2 className="font-playfair text-xl font-bold text-midnight-blue mb-4">Resource Categories</h2>
                  <ul className="space-y-2">
                    {resourceCategories.map((category) => (
                      <li key={category}>
                        <button
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left py-2 px-3 rounded-lg font-lora transition-colors ${
                            selectedCategory === category
                              ? "bg-sage-green/20 text-midnight-blue font-semibold"
                              : "text-gray-700 hover:bg-sage-green/10"
                          }`}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h2 className="font-playfair text-xl font-bold text-midnight-blue mb-4">Need Help?</h2>
                    <p className="font-lora text-gray-700 text-sm mb-4">
                      If you need personalized assistance or can't find what you're looking for, please reach out.
                    </p>
                    <Link
                      href="/contact"
                      className="block w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg text-center"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>

              {/* Resources Grid */}
              <div className="lg:w-3/4">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-playfair text-2xl font-bold text-midnight-blue">
                    {selectedCategory}{" "}
                    <span className="font-lora font-normal text-gray-600">({filteredResources.length})</span>
                  </h2>
                </div>

                {filteredResources.length === 0 ? (
                  <div className="bg-white p-8 rounded-xl text-center">
                    <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-2">No resources found</h3>
                    <p className="font-lora text-gray-700">
                      Try adjusting your search or category filters to find what you're looking for.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-8">
                    {filteredResources.map((resource) => (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-xl shadow-sm overflow-hidden group"
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 relative h-48 md:h-auto overflow-hidden">
                            <Image
                              src={resource.image || "/placeholder.svg"}
                              alt={resource.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="md:w-2/3 p-6">
                            <div className="flex items-center gap-2 mb-3">
                              <FileText size={14} className="text-sage-green" />
                              <span className="font-montserrat text-xs font-semibold text-sage-green">
                                {resource.category}
                              </span>
                            </div>
                            <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-3 group-hover:text-sage-green transition-colors duration-300">
                              {resource.title}
                            </h3>
                            <p className="font-lora text-gray-700 mb-4">{resource.description}</p>
                            <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-4">
                              <div className="flex items-center gap-1">
                                <span className="font-lora text-xs font-semibold">Type:</span>
                                <span className="font-lora text-xs">{resource.type}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="font-lora text-xs font-semibold">Size:</span>
                                <span className="font-lora text-xs">{resource.fileSize}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="font-lora text-xs font-semibold">Updated:</span>
                                <span className="font-lora text-xs">{resource.lastUpdated}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                              <Link
                                href={`/justice/resources/${resource.id}`}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-sage-green text-midnight-blue font-montserrat text-sm font-semibold transition-all duration-300 hover:bg-sage-green/90 hover:shadow-md"
                              >
                                <ExternalLink size={14} />
                                View Resource
                              </Link>
                              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-midnight-blue/10 text-midnight-blue font-montserrat text-sm font-semibold transition-all duration-300 hover:bg-midnight-blue/20">
                                <Download size={14} />
                                Download
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-20 bg-[#0A192F]">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-playfair text-4xl font-bold text-magnolia-white mb-6">Support Our Work</h2>
              <p className="font-lora text-xl text-magnolia-white/80 leading-relaxed mb-8">
                Your contribution helps us continue providing free resources and support for those navigating the
                justice system and healing from systemic trauma.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/donate"
                  className="bg-gold hover:bg-gold/90 text-midnight-blue font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg"
                >
                  Donate
                </Link>
                <Link
                  href="/volunteer"
                  className="bg-magnolia-white/10 hover:bg-magnolia-white/20 text-magnolia-white font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg"
                >
                  Volunteer
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
