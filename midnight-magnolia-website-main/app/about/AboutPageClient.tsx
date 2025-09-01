"use client"

import Image from "next/image"
import FloatingMoon from "../../components/FloatingMoon"
import FloatingZodiac from "../../components/FloatingZodiac"

export default function AboutPageClient() {
  return (
    <>
      <FloatingMoon />
      <FloatingZodiac />

      <main className="min-h-screen bg-midnight-blue pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-midnight-blue to-midnight-teal">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-magnolia-white mb-6">
                Our Sacred Story
              </h1>
              <p className="font-lora text-xl text-magnolia-white/80 leading-relaxed">
                Born from transformation, rooted in resilience, and dedicated to creating digital sanctuaries where
                healing and prosperity intertwine like Spanish moss on ancient magnolia trees.
              </p>
            </div>
          </div>
        </section>

        {/* Founder Story */}
        <section className="py-20 bg-magnolia-white">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <p className="bg-sage-green text-magnolia-white font-montserrat text-sm tracking-wider uppercase px-4 py-2 rounded-full inline-block font-bold mb-6">
                    Founder & Visionary
                  </p>
                  <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-midnight-blue mb-6">
                    Latisha Vincent-Waters
                  </h2>
                  <p className="font-lora text-lg text-gray-800 leading-relaxed mb-6">
                    Midnight Magnolia was born during my own season of transformation—a time when I needed to create not
                    just a business, but a sanctuary. As a Black woman navigating chronic illness, career transition,
                    and the call to build something meaningful, I found myself at the intersection of necessity and
                    possibility.
                  </p>
                  <p className="font-lora text-lg text-gray-800 leading-relaxed mb-6">
                    With a background in data analytics and newly earned HTML/CSS certification, I began weaving
                    together my technical skills with my deep love for Southern heritage, spiritual practice, and the
                    healing arts. What emerged was more than a brand—it became a digital altar where technology serves
                    transformation.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-midnight-blue/5 rounded-2xl">
                    <div className="text-3xl mb-2">🎓</div>
                    <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-2">Certified</h3>
                    <p className="font-lora text-gray-700 text-sm">HTML/CSS Development</p>
                  </div>
                  <div className="text-center p-6 bg-sage-green/10 rounded-2xl">
                    <div className="text-3xl mb-2">📊</div>
                    <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-2">Analytics</h3>
                    <p className="font-lora text-gray-700 text-sm">Data-driven insights</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative w-full h-96 rounded-3xl overflow-hidden">
                  <Image
                    src="/founder-portrait.png"
                    alt="Latisha Vincent-Waters, Founder of Midnight Magnolia"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gold rounded-full flex items-center justify-center">
                  <div className="text-midnight-blue text-2xl">🌙</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-20 bg-midnight-blue">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-magnolia-white mb-6">
                Our Sacred Mission
              </h2>
              <p className="font-lora text-xl text-magnolia-white/80 max-w-3xl mx-auto leading-relaxed">
                To create digital sanctuaries where Southern Gothic grace meets ancestral wisdom, supporting souls on
                their journey toward healing, creativity, and sustainable prosperity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "🌱",
                  title: "Trauma-Informed Design",
                  description:
                    "Every tool and experience is crafted with gentleness, understanding that healing happens at your own sacred pace.",
                },
                {
                  icon: "🌸",
                  title: "Ancestral Wisdom",
                  description:
                    "Honoring the strength and knowledge passed down through generations of resilient women who paved our paths.",
                },
                {
                  icon: "✨",
                  title: "Neurodivergent Friendly",
                  description:
                    "Celebrating different minds with tools that work with your brain's unique patterns, not against them.",
                },
                {
                  icon: "🕊️",
                  title: "Inclusive Sanctuary",
                  description:
                    "A safe space for all identities, especially centering Black women and marginalized voices in wellness.",
                },
                {
                  icon: "🔮",
                  title: "Digital Innovation",
                  description:
                    "Blending ancient wisdom with modern technology to create accessible, beautiful healing tools.",
                },
                {
                  icon: "⚖️",
                  title: "Justice & Healing",
                  description:
                    "Understanding that true wellness includes systemic change and community support for all.",
                },
              ].map((value, index) => (
                <div
                  key={value.title}
                  className="bg-magnolia-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-magnolia-white/20 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="font-playfair text-xl font-semibold text-magnolia-white mb-4">{value.title}</h3>
                  <p className="font-lora text-magnolia-white/80 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Information */}
        <section className="py-20 bg-[#F5EDD6]">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-midnight-blue mb-6">
                  Rumi-Nations LLC
                </h2>
                <p className="font-lora text-xl text-gray-800 leading-relaxed">
                  The parent company behind Midnight Magnolia, established to create sustainable, healing-centered
                  businesses that serve our community with integrity and love.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="font-playfair text-2xl font-bold text-midnight-blue">Our Commitment</h3>
                  <ul className="space-y-4 font-lora text-gray-800">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-sage-green rounded-full mt-3 flex-shrink-0" />
                      <span>Ethical business practices rooted in community care</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-sage-green rounded-full mt-3 flex-shrink-0" />
                      <span>Sustainable income models that honor rest and boundaries</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-sage-green rounded-full mt-3 flex-shrink-0" />
                      <span>Technology solutions that center accessibility and inclusion</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-sage-green rounded-full mt-3 flex-shrink-0" />
                      <span>Creative expression as a pathway to healing and prosperity</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <h3 className="font-playfair text-2xl font-bold text-midnight-blue">Contact Information</h3>
                  <div className="space-y-4 font-lora text-gray-800">
                    <div>
                      <p className="font-semibold">Rumi-Nations LLC</p>
                      <p>10070 Dorchester Rd, #51599</p>
                      <p>Summerville, SC 29485</p>
                    </div>
                    <div>
                      <p>Phone: (803) 387-2552</p>
                      <p>Email: info@midnight-magnolia.com</p>
                    </div>
                    <div>
                      <p className="font-semibold">Business Hours:</p>
                      <p>Monday - Friday: 9 AM - 5 PM EST</p>
                      <p>Weekend: By appointment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-midnight-blue">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-magnolia-white mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="font-lora text-xl text-magnolia-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              Whether you're seeking healing tools, digital products, or simply a community that understands your path,
              we're here to support your transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105">
                Explore Our Products
              </button>
              <button className="border-2 border-sage-green hover:bg-sage-green text-sage-green hover:text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300">
                Connect With Us
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
