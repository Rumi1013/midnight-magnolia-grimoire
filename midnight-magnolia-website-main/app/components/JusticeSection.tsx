"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export default function JusticeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const justiceInitiatives = [
    {
      title: "Accessibility First",
      description:
        "All our digital tools are designed with neurodivergent minds and chronic illness in mind. We believe healing should be accessible to everyone.",
      icon: "♿",
      actions: [
        "Screen reader compatible designs",
        "Flexible pacing in all programs",
        "Multiple format options",
        "Sliding scale pricing available",
      ],
    },
    {
      title: "Representation Matters",
      description:
        "Our tarot deck and content center Black women and marginalized voices, creating space for authentic spiritual practice.",
      icon: "✊🏾",
      actions: [
        "Black women featured in tarot imagery",
        "Inclusive spiritual practices",
        "Diverse healing modalities",
        "Community amplification",
      ],
    },
    {
      title: "Economic Justice",
      description:
        "We support financial independence through digital entrepreneurship and provide tools for building sustainable income streams.",
      icon: "💰",
      actions: [
        "Business education for marginalized creators",
        "Passive income strategy sharing",
        "Community resource pooling",
        "Mentorship opportunities",
      ],
    },
    {
      title: "Healing Justice",
      description:
        "Trauma-informed approaches to all our work, recognizing that healing happens in community and at your own pace.",
      icon: "🌱",
      actions: [
        "Trauma-informed design principles",
        "Community healing circles",
        "Gentle accountability practices",
        "Sobriety and recovery support",
      ],
    },
    {
      title: "Criminal Justice Reform",
      description:
        "Supporting reentry and second chances through resources, advocacy, and community support for justice-impacted individuals.",
      icon: "⚖️",
      actions: [
        "Parole preparation resources",
        "Expungement guidance materials",
        "Reentry support networks",
        "Advocacy for policy reform",
      ],
    },
    {
      title: "Legal Resource Hub",
      description:
        "Connecting community members with legal aid, know-your-rights information, and pathways to record clearing.",
      icon: "📚",
      actions: [
        "Pardon application assistance",
        "Expungement eligibility screening",
        "Legal clinic partnerships",
        "Rights education workshops",
      ],
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-midnight-blue">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="relative w-24 h-24 mx-auto mb-6">
            <Image src="/images/logo-main.jpg" alt="Justice & Healing" fill className="object-contain" />
          </div>
          <p className="text-sage-green font-montserrat text-sm tracking-wider uppercase mb-4">Sacred Activism</p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-magnolia-white mb-6">Justice & Healing</h2>
          <p className="font-lora text-xl text-magnolia-white/80 max-w-3xl mx-auto leading-relaxed">
            Our commitment to creating equitable, accessible, and healing-centered spaces for all souls seeking
            transformation. Justice is not separate from healing—it is healing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {justiceInitiatives.map((initiative, index) => (
            <motion.div
              key={initiative.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-magnolia-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-magnolia-white/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">{initiative.icon}</div>
                <h3 className="font-playfair text-xl font-bold text-magnolia-white">{initiative.title}</h3>
              </div>

              <p className="font-lora text-magnolia-white/80 leading-relaxed mb-6">{initiative.description}</p>

              <ul className="space-y-3">
                {initiative.actions.map((action, idx) => (
                  <li key={idx} className="flex items-center gap-3 font-lora text-magnolia-white/70">
                    <div className="w-2 h-2 bg-sage-green rounded-full flex-shrink-0" />
                    {action}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Legal Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 p-8 bg-magnolia-white/5 rounded-2xl border border-magnolia-white/10"
        >
          <h4 className="font-playfair text-xl font-semibold text-magnolia-white mb-4">Important Legal Disclaimer</h4>
          <p className="font-lora text-magnolia-white/70 text-sm leading-relaxed mb-4">
            <strong>This is not legal advice.</strong> The information provided through Midnight Magnolia's justice
            resources is for educational purposes only and does not constitute legal advice. Laws vary by jurisdiction
            and individual circumstances differ significantly.
          </p>
          <p className="font-lora text-magnolia-white/70 text-sm leading-relaxed">
            For specific legal guidance regarding parole, pardons, expungements, or other legal matters, please consult
            with a qualified attorney licensed in your jurisdiction. We encourage connecting with local legal aid
            organizations, public defenders, or pro bono legal clinics for personalized assistance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-12"
        >
          <p className="font-lora text-magnolia-white/80 mb-6 max-w-2xl mx-auto">
            "Justice is what love looks like in public." - Cornel West
          </p>
          <button className="border-2 border-sage-green hover:bg-sage-green text-sage-green hover:text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300 min-h-[44px]">
            Access Justice Resources
          </button>
        </motion.div>
      </div>
    </section>
  )
}
