import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Simple logging instead of any external service calls
    console.log("Contact form submission:", data)

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Your message has been received. We'll respond within 48 hours.",
    })
  } catch (error) {
    console.error("Error processing contact form:", error)

    // Return error response
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 },
    )
  }
}
