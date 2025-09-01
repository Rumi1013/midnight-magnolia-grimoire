"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { MailIcon, PhoneIcon, ClockIcon, HeartIcon, MoonIcon, StarIcon, ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ContactForm from "../components/ContactForm"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
}

const floatingAnimation = {
  initial: { y: 0 },
  animate: (i: number) => ({
    y: [0, -15 * (i % 2 ? 1 : -1), 0],
    rotate: [0, i % 3 === 0 ? 5 : -5, 0],
    transition: {
      duration: 5 + i,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  }),
}

export default function ContactPageClient() {
  const [activeTab, setActiveTab] = useState("general")
  const [mounted, setMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    setMounted(true)
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Only render animations if mounted and not preferring reduced motion
  const shouldAnimate = mounted && !prefersReducedMotion

  return (
    <div className="bg-[#0A192F] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={0}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FAF3E0] mb-6">Begin a Conversation</h1>
          <motion.p
            variants={fadeIn}
            custom={1}
            className="text-xl md:text-2xl text-[#FAF3E0] opacity-90 max-w-3xl mx-auto mb-8"
          >
            "In the quiet spaces between words, healing begins. Reach out when your soul is ready."
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={fadeIn}
            custom={2}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link href="#contact-form">
              <Button className="bg-[#A3B18A] hover:bg-[#A3B18A] hover:opacity-90 text-[#0A192F] font-medium px-8 py-6 text-lg rounded-md transition-all duration-300 shadow-lg">
                Share Your Journey
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        {shouldAnimate && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                custom={i + 1}
                initial="initial"
                animate="animate"
                variants={floatingAnimation}
                className={`absolute text-4xl opacity-20 text-[#FAF3E0]`}
                style={{
                  top: `${20 + ((i * 15) % 60)}%`,
                  left: `${5 + ((i * 20) % 90)}%`,
                }}
              >
                {i % 3 === 0 ? "✧" : i % 3 === 1 ? "✦" : "✵"}
              </motion.div>
            ))}
            <motion.div
              custom={7}
              initial="initial"
              animate="animate"
              variants={floatingAnimation}
              className="absolute top-20 left-[15%] opacity-30"
            >
              <MoonIcon className="h-10 w-10 text-[#FAF3E0]" />
            </motion.div>
            <motion.div
              custom={8}
              initial="initial"
              animate="animate"
              variants={floatingAnimation}
              className="absolute top-40 right-[20%] opacity-20"
            >
              <StarIcon className="h-8 w-8 text-[#D4AF37]" />
            </motion.div>
          </div>
        )}
      </section>

      {/* Main Content */}
      <section id="contact-form" className="px-4 sm:px-6 lg:px-8 pb-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div className="lg:col-span-2" initial="hidden" animate="visible" variants={fadeIn} custom={2}>
              <Card className="bg-[#FAF3E0] bg-opacity-[0.03] border border-[#D4B99F] border-opacity-20 shadow-lg overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-3 mb-8 bg-[#0A192F] border border-[#D4B99F] border-opacity-30">
                      <TabsTrigger
                        value="general"
                        className="data-[state=active]:bg-[#A3B18A] data-[state=active]:text-[#0A192F] text-[#FAF3E0]"
                      >
                        General
                      </TabsTrigger>
                      <TabsTrigger
                        value="support"
                        className="data-[state=active]:bg-[#A3B18A] data-[state=active]:text-[#0A192F] text-[#FAF3E0]"
                      >
                        Support
                      </TabsTrigger>
                      <TabsTrigger
                        value="wholesale"
                        className="data-[state=active]:bg-[#A3B18A] data-[state=active]:text-[#0A192F] text-[#FAF3E0]"
                      >
                        Wholesale
                      </TabsTrigger>
                    </TabsList>

                    <AnimatePresence mode="wait">
                      <TabsContent value="general" key="general">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h2 className="text-2xl font-semibold text-[#FAF3E0] mb-4">General Inquiries</h2>
                          <p className="text-[#FAF3E0] opacity-80 mb-6">
                            Have a question about our offerings or interested in collaborating? We'd love to hear from
                            you.
                          </p>
                          <ContactForm formType="general" />
                        </motion.div>
                      </TabsContent>

                      <TabsContent value="support" key="support">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h2 className="text-2xl font-semibold text-[#FAF3E0] mb-4">Product Support</h2>
                          <p className="text-[#FAF3E0] opacity-80 mb-6">
                            Need assistance with an order or product? Our support team is here to help you.
                          </p>
                          <ContactForm formType="support" />
                        </motion.div>
                      </TabsContent>

                      <TabsContent value="wholesale" key="wholesale">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h2 className="text-2xl font-semibold text-[#FAF3E0] mb-4">Wholesale Inquiries</h2>
                          <p className="text-[#FAF3E0] opacity-80 mb-6">
                            Interested in carrying Midnight Magnolia products in your store? Let's discuss wholesale
                            options.
                          </p>
                          <ContactForm formType="wholesale" />
                        </motion.div>
                      </TabsContent>
                    </AnimatePresence>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>

            {/* Support Information */}
            <div className="space-y-8">
              <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={3}>
                <Card className="bg-[#FAF3E0] bg-opacity-[0.03] border border-[#D4B99F] border-opacity-20 shadow-lg">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold text-[#FAF3E0] mb-6">Connect With Us</h2>

                    <div className="space-y-6">
                      <motion.div
                        className="flex items-start group"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="mr-4 mt-1 group-hover:text-[#D4AF37] transition-colors duration-300">
                          <MailIcon className="h-5 w-5 text-[#A3B18A] group-hover:text-[#D4AF37] transition-colors duration-300" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#FAF3E0] group-hover:text-[#D4AF37] transition-colors duration-300">
                            Email
                          </h3>
                          <p className="text-[#FAF3E0] opacity-80">hello@midnightmagnolia.com</p>
                          <p className="text-sm text-[#FAF3E0] opacity-60 mt-1">Response within 48 hours</p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-start group"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="mr-4 mt-1">
                          <PhoneIcon className="h-5 w-5 text-[#A3B18A] group-hover:text-[#D4AF37] transition-colors duration-300" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#FAF3E0] group-hover:text-[#D4AF37] transition-colors duration-300">
                            Phone
                          </h3>
                          <p className="text-[#FAF3E0] opacity-80">(555) 123-4567</p>
                          <p className="text-sm text-[#FAF3E0] opacity-60 mt-1">Mon-Fri, 10am-6pm EST</p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-start group"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="mr-4 mt-1">
                          <ClockIcon className="h-5 w-5 text-[#A3B18A] group-hover:text-[#D4AF37] transition-colors duration-300" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#FAF3E0] group-hover:text-[#D4AF37] transition-colors duration-300">
                            Hours
                          </h3>
                          <p className="text-[#FAF3E0] opacity-80">Monday - Friday: 10am - 6pm EST</p>
                          <p className="text-[#FAF3E0] opacity-80">Saturday: 12pm - 4pm EST</p>
                          <p className="text-[#FAF3E0] opacity-80">Sunday: Closed</p>
                        </div>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={4}>
                <Card className="bg-[#FAF3E0] bg-opacity-[0.03] border border-[#D4B99F] border-opacity-20 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <HeartIcon className="h-5 w-5 text-[#A3B18A] mr-2" />
                      <h2 className="text-xl font-semibold text-[#FAF3E0]">Crisis Support</h2>
                    </div>
                    <p className="text-[#FAF3E0] opacity-80 mb-4">
                      If you're experiencing a mental health crisis or emergency situation, please reach out to these
                      resources:
                    </p>
                    <ul className="space-y-2 text-[#FAF3E0] opacity-80">
                      <li>
                        National Suicide Prevention Lifeline: <strong>988</strong>
                      </li>
                      <li>
                        Crisis Text Line: Text <strong>HOME</strong> to <strong>741741</strong>
                      </li>
                      <li>
                        Emergency Services: <strong>911</strong>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Return to Home Button */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                custom={5}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full border-[#D4B99F] border-opacity-50 text-[#FAF3E0] hover:bg-[#FAF3E0] hover:bg-opacity-5 transition-all duration-300"
                  >
                    Return to Home
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* FAQ Section */}
          <motion.div className="mt-16" initial="hidden" animate="visible" variants={fadeIn} custom={5}>
            <h2 className="text-3xl font-bold text-[#FAF3E0] mb-8 text-center">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "How quickly will I receive a response?",
                    answer:
                      "We strive to respond to all inquiries within 48 hours during business days. For urgent matters, please call our support line.",
                  },
                  {
                    question: "Do you offer consultations for healing practices?",
                    answer:
                      "Yes, we offer private consultations for those seeking personalized guidance on their healing journey. Please use the contact form and select 'General Inquiries' to schedule.",
                  },
                  {
                    question: "What is your shipping policy?",
                    answer:
                      "We ship all physical products within 3-5 business days. Digital products are delivered immediately after purchase. For international shipping inquiries, please contact us directly.",
                  },
                  {
                    question: "Do you offer refunds?",
                    answer:
                      "We offer refunds on physical products within 30 days of purchase if they are unused and in original packaging. Digital products are non-refundable due to their nature.",
                  },
                  {
                    question: "How can I join your community?",
                    answer:
                      "You can join our community by signing up for our newsletter, following us on social media, or becoming a member through our Community page. We welcome all who seek healing and growth.",
                  },
                ].map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-b border-[#D4B99F] border-opacity-30"
                  >
                    <AccordionTrigger className="text-[#FAF3E0] hover:text-[#A3B18A] text-lg py-4 transition-colors duration-300">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#FAF3E0] opacity-80">
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {faq.answer}
                      </motion.div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
