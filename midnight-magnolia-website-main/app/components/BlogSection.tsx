"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export default function BlogSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const blogPosts = [
    {
      title: "Healing is Not Linear: Embracing Your Sacred Pace",
      excerpt:
        "A gentle reminder that your healing journey doesn't need to follow anyone else's timeline. Learn to honor your own rhythm and celebrate small victories.",
      category: "Healing",
      readTime: "5 min read",
      date: "Dec 15, 2024",
      image: "/images/logo-main.jpg",
    },
    {
      title: "Building Your Digital Empire with ADHD",
      excerpt:
        "Practical strategies for neurodivergent entrepreneurs to create sustainable online businesses without burning out. Gentle productivity for chaotic minds.",
      category: "Entrepreneurship",
      readTime: "8 min read",
      date: "Dec 12, 2024",
      image: "/images/logo-minimal.jpg",
    },
    {
      title: "Ancestral Wisdom in Modern Tarot",
      excerpt:
        "How to connect with your ancestors through tarot practice and why representation matters in divination tools. Featuring our Midnight Messages deck.",
      category: "Spirituality",
      readTime: "6 min read",
      date: "Dec 10, 2024",
      image: "/images/logo-circular.jpg",
    },
    {
      title: "Southern Gothic Aesthetics in Digital Spaces",
      excerpt:
        "Creating beautiful, mystical online spaces that honor Southern heritage while embracing modern technology. Design tips for spiritual entrepreneurs.",
      category: "Design",
      readTime: "7 min read",
      date: "Dec 8, 2024",
      image: "/images/logo-smoke.jpg",
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-[#F5EDD6]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="bg-midnight-blue text-magnolia-white font-montserrat text-sm tracking-wider uppercase px-4 py-2 rounded-full inline-block mb-4 font-bold">
            Sacred Writings
          </p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-midnight-blue mb-6">Midnight Musings</h2>
          <p className="font-lora text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
            Stories, wisdom, and gentle guidance for your healing journey. Written with love for beautiful, complex
            souls navigating life with grace and intention.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-sage-green text-magnolia-white px-3 py-1 rounded-full text-xs font-montserrat font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="font-montserrat">{post.date}</span>
                  <span>•</span>
                  <span className="font-montserrat">{post.readTime}</span>
                </div>

                <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-4 group-hover:text-sage-green transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="font-lora text-gray-700 leading-relaxed mb-6">{post.excerpt}</p>

                <button className="text-sage-green font-montserrat font-semibold hover:text-midnight-blue transition-colors duration-300 flex items-center gap-2">
                  Read More
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className="border-2 border-sage-green hover:bg-sage-green text-sage-green hover:text-magnolia-white font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300 min-h-[44px]">
            Visit Midnight Musings
          </button>
        </motion.div>
      </div>
    </section>
  )
}
