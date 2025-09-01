import { type NextRequest, NextResponse } from "next/server"

interface GenerateRequest {
  prompt: string
  contentType: "affirmation" | "tarot" | "journal" | "listing"
  tones: string[]
}

// Mock AI responses - in production, this would call OpenAI or other AI APIs
const generateMockContent = (prompt: string, contentType: string, tones: string[]) => {
  const affirmations = [
    "\"Your softness ain't weakness, honey;\nIt's the river that carved the canyon.\"",
    '"When ancestors whisper through magnolia blooms,\nYour healing becomes their living legacy."',
    '"Stars that guided runaways now light your path;\nTheir determination flows in your veins."',
    '"Like Spanish moss that bends but never breaks,\nYour grace transforms every storm into strength."',
    '"Grandmother\'s prayers still echo in your bones;\nLet their wisdom guide your healing home."',
  ]

  const tarotDescriptions = [
    "The Empress as Beyoncé: Embodying divine feminine power, creativity flows through you like honey from the hive. Your artistic vision births new worlds.",
    "The Star as Maya Angelou: Hope rises from the depths of experience. Your words become beacons for those still finding their way through darkness.",
    "The High Priestess as Toni Morrison: Ancient wisdom speaks through your intuition. Trust the stories that your soul remembers.",
  ]

  const journalPrompts = [
    "What ancestral strength do you carry in your DNA? Write about a moment when you felt your grandmother's resilience flowing through you.",
    "Describe a time when your softness was actually your greatest power. How did gentleness create change where force could not?",
    "If your healing journey was a magnolia tree, what season are you in right now? What needs tending?",
  ]

  const listings = [
    "Transform your daily routine with this beautifully designed productivity planner rooted in Black Southern wisdom. Each page honors your energy cycles while helping you achieve your goals with grace.",
    "Discover the healing power of ancestral affirmations with this digital card deck. 52 cards featuring empowering messages that connect you to your roots while nurturing your growth.",
    "Begin your sobriety journey with intention and support. This 90-day guided journal combines trauma-informed practices with Southern comfort wisdom.",
  ]

  switch (contentType) {
    case "affirmation":
      return affirmations.slice(0, 3)
    case "tarot":
      return tarotDescriptions
    case "journal":
      return journalPrompts
    case "listing":
      return listings
    default:
      return affirmations.slice(0, 3)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, contentType, tones }: GenerateRequest = await request.json()

    if (!prompt || !contentType) {
      return NextResponse.json({ success: false, error: "Prompt and content type are required" }, { status: 400 })
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const results = generateMockContent(prompt, contentType, tones)

    return NextResponse.json({
      success: true,
      results: results.map((content, index) => ({
        id: `${Date.now()}-${index}`,
        content,
        type: contentType,
        tones,
        createdAt: new Date().toISOString(),
      })),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to generate content" }, { status: 500 })
  }
}
