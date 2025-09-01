"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  DocumentDuplicateIcon,
  PencilIcon,
  EyeIcon,
  ArrowPathIcon,
  BookmarkIcon,
  CloudArrowDownIcon,
} from "@heroicons/react/24/outline"

interface ContentResult {
  id: string
  content: string
  type: "affirmation" | "tarot" | "journal" | "listing"
}

interface TemplateOption {
  id: string
  label: string
  prompt: string
}

export default function ContentCreationClient() {
  const [selectedType, setSelectedType] = useState<"affirmation" | "tarot" | "journal" | "listing">("affirmation")
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [results, setResults] = useState<ContentResult[]>([])
  const [selectedTones, setSelectedTones] = useState<string[]>(["poetic", "healing"])

  const contentTypes = [
    { id: "affirmation", label: "Affirmation Cards", active: true },
    { id: "tarot", label: "Tarot Descriptions", active: false },
    { id: "journal", label: "Journal Prompts", active: false },
    { id: "listing", label: "Product Listings", active: false },
    { id: "social", label: "Social Media", active: false },
    { id: "email", label: "Email Templates", active: false },
  ]

  const templateOptions: TemplateOption[] = [
    {
      id: "resilience",
      label: "Resilience",
      prompt: "Write a 2-line affirmation rooted in Black Southern feminine energy about resilience.",
    },
    {
      id: "healing",
      label: "Healing",
      prompt: "Write a 2-line affirmation rooted in Black Southern feminine energy about healing.",
    },
    {
      id: "softness",
      label: "Softness",
      prompt: "Write a 2-line affirmation rooted in Black Southern feminine energy about softness as strength.",
    },
    {
      id: "ancestral",
      label: "Ancestral",
      prompt: "Write a 2-line affirmation rooted in Black Southern feminine energy about ancestral wisdom.",
    },
  ]

  const toneOptions = [
    { id: "poetic", label: "Poetic" },
    { id: "healing", label: "Healing" },
    { id: "empowering", label: "Empowering" },
    { id: "reflective", label: "Reflective" },
  ]

  const sampleResults: ContentResult[] = [
    {
      id: "1",
      content: "\"Your softness ain't weakness, honey;\nIt's the river that carved the canyon.\"",
      type: "affirmation",
    },
    {
      id: "2",
      content: '"When ancestors whisper through magnolia blooms,\nYour healing becomes their living legacy."',
      type: "affirmation",
    },
    {
      id: "3",
      content: '"Stars that guided runaways now light your path;\nTheir determination flows in your veins."',
      type: "affirmation",
    },
  ]

  const handleTemplateSelect = (template: TemplateOption) => {
    setPrompt(template.prompt)
  }

  const handleToneToggle = (toneId: string) => {
    setSelectedTones((prev) => (prev.includes(toneId) ? prev.filter((id) => id !== toneId) : [...prev, toneId]))
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setResults(sampleResults)
      setIsGenerating(false)
    }, 2000)
  }

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    // You could add a toast notification here
  }

  return (
    <div className="min-h-screen bg-midnight-blue">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-midnight-teal p-6 overflow-y-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-rich-gold rounded-full flex items-center justify-center">
            <span className="text-midnight-blue font-bold">MM</span>
          </div>
          <div>
            <h2 className="font-playfair text-xl font-bold text-magnolia-white">Content Studio</h2>
            <p className="font-montserrat text-xs text-sage-green tracking-wider">AI-POWERED CREATION</p>
          </div>
        </div>

        {/* Content Types */}
        <div className="mb-8">
          <h3 className="font-playfair text-lg font-semibold text-magnolia-white mb-4">Content Types</h3>
          <ul className="space-y-2">
            {contentTypes.map((type) => (
              <li key={type.id}>
                <button
                  onClick={() => setSelectedType(type.id as any)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedType === type.id
                      ? "bg-magnolia-white/15 text-rich-gold"
                      : "text-magnolia-white hover:bg-magnolia-white/10"
                  }`}
                >
                  <span className="font-lora">{type.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Saved Templates */}
        <div>
          <h3 className="font-playfair text-lg font-semibold text-magnolia-white mb-4">Saved Templates</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-magnolia-white hover:text-rich-gold transition-colors">
                Black Feminine Energy Affirmations
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-magnolia-white hover:text-rich-gold transition-colors">
                Recovery Journal Prompts
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-magnolia-white hover:text-rich-gold transition-colors">
                Sobriety Planner Listing
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-80 p-6">
        {/* Header */}
        <header className="mb-8">
          <h1 className="font-playfair text-3xl font-bold text-magnolia-white mb-2">Content Creation</h1>
          <p className="font-montserrat text-sage-green flex items-center gap-2">
            <span className="text-xl">🌒</span>
            Waxing Crescent | Ideal for: New beginnings, setting intentions
          </p>
        </header>

        {/* Content Generator */}
        <div className="bg-midnight-teal p-6 rounded-lg mb-8">
          <h2 className="font-playfair text-xl font-bold text-rich-gold mb-6">Create Affirmation Card</h2>

          {/* Prompt Input */}
          <div className="mb-6">
            <label htmlFor="prompt" className="block font-montserrat text-sm font-semibold text-magnolia-white mb-2">
              Enter Your Prompt:
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-24 p-4 bg-midnight-blue/50 border border-magnolia-white/20 rounded-lg text-magnolia-white font-lora resize-none focus:outline-none focus:border-rich-gold"
              placeholder="Write a 2-line affirmation rooted in Black Southern feminine energy. Keep it poetic, healing, and brief enough to fit on a 3x5 card."
            />
          </div>

          {/* Template Options */}
          <div className="mb-6">
            <h4 className="font-montserrat text-sm font-semibold text-magnolia-white mb-3">Prompt Template Options:</h4>
            <div className="flex flex-wrap gap-2">
              {templateOptions.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className="px-3 py-2 bg-magnolia-white/10 text-magnolia-white rounded-lg text-sm font-montserrat hover:bg-magnolia-white/20 transition-colors"
                >
                  {template.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tone Settings */}
          <div className="mb-6">
            <h4 className="font-montserrat text-sm font-semibold text-magnolia-white mb-3">Tone & Style:</h4>
            <div className="flex flex-wrap gap-4">
              {toneOptions.map((tone) => (
                <label key={tone.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTones.includes(tone.id)}
                    onChange={() => handleToneToggle(tone.id)}
                    className="w-4 h-4 rounded border-2 border-magnolia-white/30 bg-transparent checked:bg-rich-gold checked:border-rich-gold"
                  />
                  <span className="font-montserrat text-sm text-magnolia-white">{tone.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full py-3 bg-rich-gold text-midnight-blue font-montserrat font-semibold rounded-lg hover:bg-rich-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isGenerating ? "Generating..." : "Generate Content"}
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-midnight-teal p-6 rounded-lg mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-playfair text-xl font-bold text-rich-gold">Generated Results</h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-2 bg-magnolia-white/10 text-magnolia-white rounded-lg text-sm font-montserrat hover:bg-magnolia-white/20 transition-colors">
                  <ArrowPathIcon className="w-4 h-4" />
                  Regenerate
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-magnolia-white/10 text-magnolia-white rounded-lg text-sm font-montserrat hover:bg-magnolia-white/20 transition-colors">
                  <BookmarkIcon className="w-4 h-4" />
                  Save
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-magnolia-white/10 text-magnolia-white rounded-lg text-sm font-montserrat hover:bg-magnolia-white/20 transition-colors">
                  <CloudArrowDownIcon className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {results.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-start p-4 bg-midnight-blue/50 rounded-lg border-l-4 border-rich-gold"
                >
                  <div className="flex-1">
                    <div className="font-playfair text-magnolia-white whitespace-pre-line">{result.content}</div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      onClick={() => copyToClipboard(result.content)}
                      className="p-2 text-magnolia-white/70 hover:text-magnolia-white transition-colors"
                      title="Copy to clipboard"
                    >
                      <DocumentDuplicateIcon className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-magnolia-white/70 hover:text-magnolia-white transition-colors"
                      title="Edit"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-magnolia-white/70 hover:text-magnolia-white transition-colors"
                      title="Visualize"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Card Preview */}
        <div className="bg-midnight-teal p-6 rounded-lg">
          <h3 className="font-playfair text-xl font-bold text-rich-gold mb-6">Card Preview</h3>
          <div className="flex gap-8">
            {/* Preview Card */}
            <div className="w-80 h-52 bg-midnight-blue rounded-lg p-6 flex flex-col justify-between shadow-lg">
              <div className="flex-1 flex flex-col justify-center text-center">
                <p className="font-playfair text-magnolia-white leading-relaxed">
                  "Your softness ain't weakness, honey;
                  <br />
                  It's the river that carved the canyon."
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 opacity-80">
                <span className="text-rich-gold text-lg">🌙</span>
                <span className="font-montserrat text-xs text-magnolia-white">Midnight Magnolia</span>
              </div>
            </div>

            {/* Style Options */}
            <div className="flex-1">
              <h4 className="font-montserrat text-sm font-semibold text-magnolia-white mb-4">Card Styling:</h4>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block font-montserrat text-xs text-magnolia-white mb-2">Background Color:</label>
                  <div className="flex gap-2">
                    <button className="w-6 h-6 rounded-full bg-midnight-blue border-2 border-rich-gold"></button>
                    <button className="w-6 h-6 rounded-full bg-midnight-teal border-2 border-transparent"></button>
                    <button className="w-6 h-6 rounded-full bg-magnolia-white border-2 border-transparent"></button>
                  </div>
                </div>
                <div>
                  <label className="block font-montserrat text-xs text-magnolia-white mb-2">Text Color:</label>
                  <div className="flex gap-2">
                    <button className="w-6 h-6 rounded-full bg-midnight-blue border-2 border-transparent"></button>
                    <button className="w-6 h-6 rounded-full bg-magnolia-white border-2 border-rich-gold"></button>
                    <button className="w-6 h-6 rounded-full bg-rich-gold border-2 border-transparent"></button>
                  </div>
                </div>
                <div>
                  <label className="block font-montserrat text-xs text-magnolia-white mb-2">Font:</label>
                  <select className="w-full p-2 bg-midnight-blue/50 border border-magnolia-white/20 rounded text-magnolia-white text-sm">
                    <option>Playfair Display</option>
                    <option>Lora</option>
                    <option>Montserrat</option>
                  </select>
                </div>
                <div>
                  <label className="block font-montserrat text-xs text-magnolia-white mb-2">Icon:</label>
                  <select className="w-full p-2 bg-midnight-blue/50 border border-magnolia-white/20 rounded text-magnolia-white text-sm">
                    <option>Crescent Moon</option>
                    <option>Magnolia Flower</option>
                    <option>None</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button className="flex-1 py-2 bg-magnolia-white/10 text-magnolia-white rounded text-sm font-montserrat hover:bg-magnolia-white/20 transition-colors">
                  Export as PNG
                </button>
                <button className="flex-1 py-2 bg-magnolia-white/10 text-magnolia-white rounded text-sm font-montserrat hover:bg-magnolia-white/20 transition-colors">
                  Export as JPG
                </button>
                <button className="flex-1 py-2 bg-magnolia-white/10 text-magnolia-white rounded text-sm font-montserrat hover:bg-magnolia-white/20 transition-colors">
                  Export as PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
