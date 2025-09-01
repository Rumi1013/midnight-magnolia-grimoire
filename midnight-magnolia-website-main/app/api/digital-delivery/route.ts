import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { orderId, customerEmail, items } = await request.json()

    // 🌙 Generate download links for digital products
    const digitalItems = items.filter((item: any) => item.digitalDelivery === "instant")

    const downloadLinks = digitalItems.map((item: any) => ({
      productId: item.productId,
      name: item.name,
      format: item.format,
      downloadUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/download/${item.productId}?token=${generateSecureToken()}`,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    }))

    // 🌸 Send welcome email with download links
    await sendWelcomeEmail({
      email: customerEmail,
      orderId,
      downloadLinks,
      items: digitalItems,
    })

    return NextResponse.json({
      success: true,
      downloadLinks,
      message: "Digital offerings delivered successfully",
    })
  } catch (error: any) {
    console.error("Digital delivery error:", error)
    return NextResponse.json({ success: false, error: "Failed to deliver digital products" }, { status: 500 })
  }
}

// 🔐 Generate secure download token
function generateSecureToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// 📧 Send welcome email with downloads
async function sendWelcomeEmail(data: any) {
  // In a real implementation, you would integrate with your email service
  // (SendGrid, Mailgun, etc.) to send the welcome email with download links

  console.log("Sending welcome email to:", data.email)
  console.log("Download links:", data.downloadLinks)

  // Mock email sending
  return Promise.resolve()
}
