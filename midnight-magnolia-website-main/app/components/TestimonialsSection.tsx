"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"

export default function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const testimonials = [
    {
      quote:
        "Midnight Magnolia saved my life. The Magnolia Reset journal helped me through my darkest days with such gentle wisdom. I finally found tools that understand my pace.",
      author: "Jasmine",
      role: "Healing Warrior",
      location: "Atlanta, GA",
      image: "🌸",
    },
    {
      quote:
        "As someone with ADHD, I've tried every planner. The Sacred Productivity system is the first that actually works WITH my brain. It's like having a gentle friend guiding me.",
      author: "Maya",
      role: "Creative Entrepreneur",
      location: "New Orleans, LA",
      image: "✨",
    },
    {
      quote:
        "The tarot deck speaks to my soul. Seeing powerful Black women represented in such beautiful, mystical art makes me feel seen and celebrated. Pure magic.",
      author: "Zara",
      role: "Spiritual Seeker",
      location: "Charleston, SC",
      image: "🔮",
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-magnolia-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sage-green font-montserrat text-sm tracking-wider uppercase mb-4">
            Voices from the Garden
          </p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-midnight-blue mb-6">
            Stories of Transformation
          </h2>
          <p className="font-lora text-xl text-midnight-blue/80 max-w-3xl mx-auto leading-relaxed">
            Every soul who enters our garden brings their own light. Here are some of their sacred stories.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Main testimonial display */}
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-12 shadow-lg text-center mb-8"
          >
            <div className="text-6xl mb-6">{testimonials[activeTestimonial].image}</div>

            <blockquote className="font-lora text-2xl text-midnight-blue leading-relaxed mb-8 italic">
              "{testimonials[activeTestimonial].quote}"
            </blockquote>

            <div className="space-y-2">
              <h4 className="font-playfair text-xl font-bold text-midnight-blue">
                {testimonials[activeTestimonial].author}
              </h4>
              <p className="font-montserrat text-sage-green font-semibold">{testimonials[activeTestimonial].role}</p>
              <p className="font-lora text-midnight-blue/60">{testimonials[activeTestimonial].location}</p>
            </div>
          </motion.div>

          {/* Testimonial navigation */}
          <div className="flex justify-center gap-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === activeTestimonial ? "bg-sage-green scale-125" : "bg-warm-gray hover:bg-sage-green/50"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Community stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
        >
          {[
            { number: "500+", label: "Healing souls in our garden" },
            { number: "10k+", label: "Journal entries written" },
            { number: "95%", label: "Feel more at peace" },
            { number: "24/7", label: "Gentle support available" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-playfair text-3xl font-bold text-gold mb-2">{stat.number}</div>
              <div className="font-lora text-midnight-blue/70">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
