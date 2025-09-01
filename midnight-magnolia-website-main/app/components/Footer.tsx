import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-midnight-blue border-t border-magnolia-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">🌸</div>
              <div>
                <div className="font-playfair text-2xl font-bold text-magnolia-white">Midnight Magnolia</div>
                <div className="font-montserrat text-sm text-sage-green tracking-wider">
                  DIGITAL SANCTUARY FOR HEALING
                </div>
              </div>
            </div>
            <p className="font-lora text-magnolia-white/70 leading-relaxed max-w-md">
              Where ancestral wisdom meets Southern Gothic grace. Your journey of healing through gentle productivity
              and sacred rituals begins here.
            </p>
            <div className="flex gap-4 mt-6">
              {["🌙", "✨", "🌱", "🕯️"].map((emoji, index) => (
                <div key={index} className="text-2xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                  {emoji}
                </div>
              ))}
            </div>
          </div>

          {/* Sacred Tools */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-magnolia-white mb-4">Sacred Tools</h3>
            <ul className="space-y-3">
              {[
                "The Magnolia Reset",
                "Midnight Messages",
                "Sacred Productivity",
                "Healing Journals",
                "Ritual Guides",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="font-lora text-magnolia-white/70 hover:text-sage-green transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-magnolia-white mb-4">Community</h3>
            <ul className="space-y-3">
              {["Our Story", "Healing Circle", "Testimonials", "Support", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="font-lora text-magnolia-white/70 hover:text-sage-green transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-magnolia-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="font-lora text-magnolia-white/60 text-sm">
            © 2024 Midnight Magnolia. Crafted with love and intention. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="font-lora text-magnolia-white/60 hover:text-sage-green transition-colors text-sm">
              Privacy
            </Link>
            <Link href="#" className="font-lora text-magnolia-white/60 hover:text-sage-green transition-colors text-sm">
              Terms
            </Link>
            <Link href="#" className="font-lora text-magnolia-white/60 hover:text-sage-green transition-colors text-sm">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
