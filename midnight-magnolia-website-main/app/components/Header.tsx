"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { MoonIcon, SunIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import CartIcon from "./CartIcon"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: "Sacred Tools", href: "/shop" },
    { name: "Shop", href: "/shop" },
    { name: "Our Story", href: "/about" },
    { name: "Midnight Musings", href: "/blog" },
    { name: "Justice & Healing", href: "/justice" },
    { name: "Community", href: "/community" },
  ]

  return (
    <motion.header
      className={`fixed top-0 z-50 w-full backdrop-blur-md transition-all duration-300 ${
        scrolled ? "bg-midnight-blue/90 shadow-md" : "bg-midnight-blue/50"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 group">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 overflow-hidden rounded-full">
                <Image
                  src="/images/logo-minimal.jpg"
                  alt="Midnight Magnolia"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div>
                <div className="font-playfair text-xl font-bold text-magnolia-white">Midnight Magnolia</div>
                <div className="font-montserrat text-xs text-sage-green tracking-wider">DIGITAL SANCTUARY</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-lora text-sm text-magnolia-white hover:text-sage-green transition-colors duration-300 relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-green transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex flex-1 justify-end items-center gap-4">
          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 bg-magnolia-white/10 text-magnolia-white hover:bg-sage-green/20 hover:text-sage-green transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
          )}

          {/* Cart Icon */}
          <CartIcon />

          {/* CTA Button */}
          <button className="hidden sm:block bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm">
            Enter Garden
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden rounded-full p-2 bg-magnolia-white/10 text-magnolia-white hover:bg-sage-green/20 hover:text-sage-green transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-midnight-blue border-t border-magnolia-white/10"
        >
          <div className="px-6 py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block font-lora text-magnolia-white hover:text-sage-green transition-colors duration-300 py-2"
              >
                {item.name}
              </Link>
            ))}
            <button className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-6 py-3 rounded-full transition-all duration-300 mt-4">
              Enter Garden
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
