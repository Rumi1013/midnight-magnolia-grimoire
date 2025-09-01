"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Calendar, Clock, Tag, ChevronRight } from "lucide-react"
import FloatingMoon from "@/app/components/FloatingMoon"
import FloatingZodiac from "@/app/components/FloatingZodiac"

const categories = [
  "All Posts",
  "Ancestral Wisdom",
  "Gentle Productivity",
  "Healing Practices",
  "Southern Gothic",
  "ADHD & Neurodivergence",
  "Ritual & Ceremony",
]

const blogPosts = [
  {
    id: 1,
    title: "Embracing the Shadows: Finding Healing in Southern Gothic Traditions",
    excerpt:
      "Explore how the haunting beauty of Southern Gothic literature and aesthetics can provide a framework for processing trauma and finding peace in the shadows.",
    category: "Southern Gothic",
    author: "Latisha Vincent-Waters",
    date: "June 4, 2024",
    readTime: "8 min read",
    image: "/placeholder.svg?key=ruqy2",
    featured: true,
  },
  {
    id: 2,
    title: "The Gentle Revolution: Productivity Systems for Chronically Ill & Neurodivergent Folks",
    excerpt:
      "Traditional productivity systems often fail those with chronic illness or ADHD. Discover gentler approaches that honor your energy levels and unique brain wiring.",
    category: "Gentle Productivity",
    author: "Latisha Vincent-Waters",
    date: "May 28, 2024",
    readTime: "12 min read",
    image: "/placeholder.svg?height=600&width=800",
    featured: true,
  },
  {
    id: 3,
    title: "Ancestral Kitchen Witchery: Healing Recipes From Black Southern Traditions",
    excerpt:
      "Rediscover the healing power of traditional recipes passed down through generations of Black Southern families, and how cooking can become a sacred ritual.",
    category: "Ancestral Wisdom",
    author: "Latisha Vincent-Waters",
    date: "May 15, 2024",
    readTime: "10 min read",
    image: "/placeholder.svg?height=600&width=800",
    featured: false,
  },
  {
    id: 4,
    title: "Moon Phase Rituals: Aligning Your Healing Journey with Lunar Cycles",
    excerpt:
      "Learn how to create simple yet powerful rituals that align with the phases of the moon, helping you set intentions, release what no longer serves you, and celebrate growth.",
    category: "Ritual & Ceremony",
    author: "Latisha Vincent-Waters",
    date: "May 7, 2024",
    readTime: "9 min read",
    image: "/placeholder.svg?height=600&width=800",
    featured: false,
  },
  {
    id: 5,
    title: "The ADHD Tax: Financial Wellness Strategies for Neurodivergent Minds",
    excerpt:
      "Managing finances with ADHD presents unique challenges. Discover compassionate approaches to budgeting, bill payment, and financial planning that work with your brain.",
    category: "ADHD & Neurodivergence",
    author: "Latisha Vincent-Waters",
    date: "April 22, 2024",
    readTime: "11 min read",
    image: "/placeholder.svg?height=600&width=800",
    featured: false,
  },
  {
    id: 6,
    title: "Trauma-Informed Movement: Gentle Practices for Reconnecting with Your Body",
    excerpt:
      "Traditional exercise can be triggering for trauma survivors. Explore gentle, trauma-informed movement practices that help you rebuild a loving relationship with your body.",
    category: "Healing Practices",
    author: "Latisha Vincent-Waters",
    date: "April 10, 2024",
    readTime: "7 min read",
    image: "/placeholder.svg?height=600&width=800",
    featured: false,
  },
  {
    id: 7,
    title: "Digital Altars: Creating Sacred Space in a Virtual World",
    excerpt:
      "In our increasingly digital lives, learn how to create meaningful virtual sacred spaces that support your spiritual practice and healing journey.",
    category: "Ritual & Ceremony",
    author: "Latisha Vincent-Waters",
    date: "March 28, 2024",
    readTime: "8 min read",
    image: "/placeholder.svg?height=600&width=800",
    featured: false,
  },
  {
    id: 8,
    title: "Honoring Ancestral Wisdom in Modern Healing Practices",
    excerpt:
      "Discover how to integrate traditional healing wisdom from your ancestors into contemporary wellness practices, creating a bridge between past and present.",
    category: "Ancestral Wisdom",
    author: "Latisha Vincent-Waters",
    date: "March 15, 2024",
    readTime: "10 min read",
    image: "/placeholder.svg?height=600&width=800",
    featured: false,
  },
]

export default function BlogPageClient() {
  const [selectedCategory, setSelectedCategory] = useState("All Posts")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts.filter((post) => {
    // Filter by category
    if (selectedCategory !== "All Posts" && post.category !== selectedCategory) return false

    // Filter by search query
    if (
      searchQuery &&
      !post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false

    return true
  })

  // Get featured posts
  const featuredPosts = blogPosts.filter((post) => post.featured)

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
                Midnight Musings
              </h1>
              <p className="font-lora text-xl text-magnolia-white/80 leading-relaxed mb-8">
                Healing wisdom, ancestral stories, and gentle guidance for your journey. Our writings honor the shadows
                while illuminating paths toward wholeness.
              </p>
              <div className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Search articles..."
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

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-16 bg-[#0A192F] border-b border-magnolia-white/10">
            <div className="container mx-auto px-6">
              <h2 className="font-playfair text-3xl font-bold text-magnolia-white mb-10">Featured Stories</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="group"
                  >
                    <Link href={`/blog/${post.id}`} className="block">
                      <div className="relative h-80 overflow-hidden rounded-xl mb-6">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/90 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6">
                          <span className="inline-block px-4 py-1 rounded-full bg-sage-green/90 text-midnight-blue font-montserrat text-xs font-semibold mb-3">
                            {post.category}
                          </span>
                          <h3 className="font-playfair text-2xl font-bold text-magnolia-white mb-2 group-hover:text-sage-green transition-colors duration-300">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-4 text-magnolia-white/70">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span className="font-lora text-sm">{post.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span className="font-lora text-sm">{post.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Blog Content */}
        <section className="py-16 bg-magnolia-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar - Categories */}
              <div className="lg:w-1/4">
                <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
                  <h2 className="font-playfair text-xl font-bold text-midnight-blue mb-4">Categories</h2>
                  <ul className="space-y-2">
                    {categories.map((category) => (
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
                    <h2 className="font-playfair text-xl font-bold text-midnight-blue mb-4">Join Our Newsletter</h2>
                    <p className="font-lora text-gray-700 text-sm mb-4">
                      Receive healing wisdom and updates directly in your inbox.
                    </p>
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-sage-green font-lora mb-3"
                    />
                    <button className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>

              {/* Blog Posts Grid */}
              <div className="lg:w-3/4">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-playfair text-2xl font-bold text-midnight-blue">
                    {selectedCategory}{" "}
                    <span className="font-lora font-normal text-gray-600">({filteredPosts.length})</span>
                  </h2>
                </div>

                {filteredPosts.length === 0 ? (
                  <div className="bg-white p-8 rounded-xl text-center">
                    <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-2">No posts found</h3>
                    <p className="font-lora text-gray-700">
                      Try adjusting your search or category filters to find what you're looking for.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredPosts.map((post) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-xl shadow-sm overflow-hidden group"
                      >
                        <Link href={`/blog/${post.id}`} className="block">
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                              <Tag size={14} className="text-sage-green" />
                              <span className="font-montserrat text-xs font-semibold text-sage-green">
                                {post.category}
                              </span>
                            </div>
                            <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-3 group-hover:text-sage-green transition-colors duration-300">
                              {post.title}
                            </h3>
                            <p className="font-lora text-gray-700 mb-4 line-clamp-2">{post.excerpt}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar size={14} />
                                  <span className="font-lora text-xs">{post.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock size={14} />
                                  <span className="font-lora text-xs">{post.readTime}</span>
                                </div>
                              </div>
                              <span className="font-montserrat text-sage-green text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                                Read More <ChevronRight size={14} />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
