// 🌙 Sacred Midnight Magnolia Brand Constants

export const BRAND = {
  name: "Midnight Magnolia",
  tagline: "Southern Gothic Wellness Sanctuary",
  description: "Digital sanctuary for healing through Southern Gothic grace",
  mission: "Blending healing, ancestral wisdom, and gentle productivity for people with chronic illness and ADHD",
} as const

export const COLORS = {
  midnightBlue: "#0A192F",
  magnoliaWhite: "#FAF3E0",
  sageGreen: "#A3B18A",
  warmGray: "#D4B99F",
  gold: "#D4AF37",
} as const

export const FONTS = {
  playfair: "var(--font-playfair)",
  lora: "var(--font-lora)",
  montserrat: "var(--font-montserrat)",
} as const

export const BREAKPOINTS = {
  mobile: "768px",
  tablet: "1024px",
  desktop: "1280px",
} as const

export const ANIMATIONS = {
  duration: {
    fast: "0.15s",
    normal: "0.3s",
    slow: "0.5s",
  },
  easing: {
    default: "ease-in-out",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },
} as const

export const SACRED_MESSAGES = {
  loading: [
    "Preparing your healing sanctuary...",
    "Gathering sacred energies...",
    "Aligning with divine timing...",
    "Blessing your digital altar...",
  ],
  errors: [
    "The healing energies have encountered an unexpected disturbance.",
    "Sacred sanctuary disrupted - let us restore the balance.",
    "Divine timing suggests a moment of pause and reflection.",
  ],
  success: [
    "Sacred connection established! ✨",
    "Divine energies are flowing beautifully! 🌙",
    "Your healing sanctuary is ready! 🌸",
  ],
} as const
