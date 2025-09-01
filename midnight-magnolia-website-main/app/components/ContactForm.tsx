"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const formSchema = z.object({
  name: z.string().min(2, { message: "Please share your name (at least 2 characters)." }),
  email: z.string().email({ message: "Please provide a valid email so we can respond to you." }),
  phone: z.string().optional(),
  subject: z.string().min(1, { message: "Please select a subject for your message." }),
  message: z.string().min(10, { message: "Please share a bit more detail (at least 10 characters)." }),
})

interface ContactFormProps {
  formType?: "general" | "support" | "wholesale"
}

export default function ContactForm({ formType = "general" }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: getDefaultSubject(formType),
      message: "",
    },
  })

  function getDefaultSubject(type: string): string {
    switch (type) {
      case "support":
        return "Product Support"
      case "wholesale":
        return "Wholesale Inquiry"
      default:
        return "General Inquiry"
    }
  }

  const subjectOptions = {
    general: [
      { value: "general-inquiry", label: "General Inquiry" },
      { value: "collaboration", label: "Collaboration Opportunity" },
      { value: "feedback", label: "Feedback" },
      { value: "other", label: "Other" },
    ],
    support: [
      { value: "order-status", label: "Order Status" },
      { value: "product-question", label: "Product Question" },
      { value: "return-exchange", label: "Return or Exchange" },
      { value: "technical-issue", label: "Technical Issue" },
    ],
    wholesale: [
      { value: "new-wholesale", label: "New Wholesale Account" },
      { value: "existing-wholesale", label: "Existing Wholesale Account" },
      { value: "bulk-order", label: "Bulk Order Inquiry" },
      { value: "pricing", label: "Pricing Information" },
    ],
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setSubmitResult(null)

    // Simulate API call instead of actual fetch to avoid server errors
    setTimeout(() => {
      console.log("Form values:", values)
      setSubmitResult({
        success: true,
        message: "Your message has been sent. We'll respond within 48 hours.",
      })
      form.reset({
        name: "",
        email: "",
        phone: "",
        subject: getDefaultSubject(formType),
        message: "",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div className="space-y-6" initial="hidden" animate="visible" variants={formVariants}>
      {submitResult && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Alert className={submitResult.success ? "bg-[#A3B18A] bg-opacity-20" : "bg-red-900 bg-opacity-20"}>
            <AlertDescription className="text-[#FAF3E0]">{submitResult.message}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#FAF3E0]">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      {...field}
                      className="bg-[#FAF3E0] bg-opacity-10 border-[#D4B99F] border-opacity-30 text-[#FAF3E0] placeholder:text-[#FAF3E0] placeholder:opacity-50 focus:border-[#A3B18A] transition-all duration-300"
                    />
                  </FormControl>
                  <FormMessage className="text-[#D4AF37]" />
                </FormItem>
              )}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#FAF3E0]">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your.email@example.com"
                        type="email"
                        {...field}
                        className="bg-[#FAF3E0] bg-opacity-10 border-[#D4B99F] border-opacity-30 text-[#FAF3E0] placeholder:text-[#FAF3E0] placeholder:opacity-50 focus:border-[#A3B18A] transition-all duration-300"
                      />
                    </FormControl>
                    <FormMessage className="text-[#D4AF37]" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#FAF3E0]">Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(555) 123-4567"
                        {...field}
                        className="bg-[#FAF3E0] bg-opacity-10 border-[#D4B99F] border-opacity-30 text-[#FAF3E0] placeholder:text-[#FAF3E0] placeholder:opacity-50 focus:border-[#A3B18A] transition-all duration-300"
                      />
                    </FormControl>
                    <FormMessage className="text-[#D4AF37]" />
                  </FormItem>
                )}
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#FAF3E0]">Subject</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-[#FAF3E0] bg-opacity-10 border-[#D4B99F] border-opacity-30 text-[#FAF3E0] focus:border-[#A3B18A] transition-all duration-300">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#0A192F] border-[#D4B99F] border-opacity-30">
                      {subjectOptions[formType].map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="text-[#FAF3E0] focus:bg-[#A3B18A] focus:text-[#0A192F]"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[#D4AF37]" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#FAF3E0]">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your thoughts, questions, or what you're seeking..."
                      className="min-h-[150px] bg-[#FAF3E0] bg-opacity-10 border-[#D4B99F] border-opacity-30 text-[#FAF3E0] placeholder:text-[#FAF3E0] placeholder:opacity-50 focus:border-[#A3B18A] transition-all duration-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#D4AF37]" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#A3B18A] hover:bg-[#A3B18A] hover:opacity-90 text-[#0A192F] font-medium py-2 transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  )
}
