import { type NextRequest, NextResponse } from "next/server"

// 🌙 Welcome email sequence templates
const WELCOME_SEQUENCE = [
  {
    day: 0,
    subject: "Welcome to Your Sacred Journey ✨",
    template: "welcome-immediate",
    content: {
      title: "Your Sacred Offerings Await",
      message: "Beautiful soul, thank you for trusting us with your healing journey. Your digital sanctuary is ready.",
      cta: "Access Your Downloads",
    },
  },
  {
    day: 1,
    subject: "How to Begin Your Sacred Practice 🌙",
    template: "getting-started",
    content: {
      title: "Gentle Guidance for Your First Steps",
      message: "Let's explore how to integrate your new sacred tools into your daily rhythm with grace and intention.",
      cta: "Read the Guide",
    },
  },
  {
    day: 3,
    subject: "Your Healing Journey Reflection 🌸",
    template: "check-in",
    content: {
      title: "How Are You Feeling, Beautiful Soul?",
      message: "We're here to support you. Share your experience or ask any questions about your sacred practice.",
      cta: "Connect With Us",
    },
  },
  {
    day: 7,
    subject: "Deepening Your Sacred Practice 🔮",
    template: "deepening",
    content: {
      title: "Ready to Go Deeper?",
      message: "Discover advanced techniques and complementary offerings to enhance your healing journey.",
      cta: "Explore More",
    },
  },
]

export async function POST(request: NextRequest) {
  try {
    const { customerEmail, orderId, purchaseDate, items } = await request.json()

    // 🌸 Schedule welcome email sequence
    for (const email of WELCOME_SEQUENCE) {
      const sendDate = new Date(purchaseDate)
      sendDate.setDate(sendDate.getDate() + email.day)

      await scheduleEmail({
        to: customerEmail,
        subject: email.subject,
        template: email.template,
        content: email.content,
        sendAt: sendDate,
        metadata: {
          orderId,
          sequenceStep: email.day,
          customerEmail,
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: "Welcome sequence scheduled successfully",
      emailsScheduled: WELCOME_SEQUENCE.length,
    })
  } catch (error: any) {
    console.error("Email sequence error:", error)
    return NextResponse.json({ success: false, error: "Failed to schedule welcome sequence" }, { status: 500 })
  }
}

// 📅 Schedule email function
async function scheduleEmail(emailData: any) {
  // In a real implementation, you would integrate with your email service
  // to schedule emails (SendGrid, Mailgun, etc.)

  console.log("Scheduling email:", emailData.subject, "for", emailData.sendAt)

  // Mock email scheduling
  return Promise.resolve()
}
