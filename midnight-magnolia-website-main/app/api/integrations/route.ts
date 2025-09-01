import { type NextRequest, NextResponse } from "next/server"

// Mock integration status - in production, these would be real API calls
const integrationStatus = {
  notion: {
    connected: true,
    lastSync: new Date().toISOString(),
    databases: ["Content Calendar", "Product Inventory", "Client Database"],
    status: "active",
  },
  airtable: {
    connected: true,
    lastSync: new Date().toISOString(),
    bases: ["Marketing Database", "Sales Pipeline", "Content Library"],
    status: "active",
  },
  hubspot: {
    connected: true,
    lastSync: new Date().toISOString(),
    contacts: 1247,
    deals: 23,
    status: "active",
  },
  makecom: {
    connected: false,
    lastSync: null,
    scenarios: ["Content Distribution", "Lead Nurturing", "Order Processing"],
    status: "needs_reconnection",
    error: "SSL certificate verification failed",
  },
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      integrations: integrationStatus,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch integration status" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { platform, action } = await request.json()

    // Handle reconnection requests
    if (action === "reconnect" && platform === "makecom") {
      // In production, this would initiate OAuth flow or API key validation
      integrationStatus.makecom.connected = true
      integrationStatus.makecom.status = "active"
      integrationStatus.makecom.error = undefined
      integrationStatus.makecom.lastSync = new Date().toISOString()

      return NextResponse.json({
        success: true,
        message: "Make.com reconnected successfully",
        integration: integrationStatus.makecom,
      })
    }

    return NextResponse.json({ success: false, error: "Invalid action or platform" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to process integration request" }, { status: 500 })
  }
}
