"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Star, Truck, Shield, Gift } from "lucide-react"

export default function ShopifySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeTab, setActiveTab] = useState("featured")

  const featuredProducts = [
    {
      name: "Magnolia Bloom Tote Bag",
      description: "Elegant tote featuring our signature magnolia design on premium eco-canvas",
      price: "$34.99",
      originalPrice: "$42.99",
      rating: 4.8,
      reviews: 127,
      image: "/magnolia-tote-bag.png",
      category: "Accessories",
      bestseller: true,
      comingSoon: true,
    },
    {
      name: "Southern Gothic Throw Pillow",
      description: "Decorative pillow with mystical Southern Gothic motifs in midnight blue and gold",
      price: "$29.99",
      originalPrice: "$35.99",
      rating: 4.9,
      reviews: 89,
      image: "/southern-gothic-pillow.png",
      category: "Home Decor",
      bestseller: false,
      comingSoon: true,
    },
    {
      name: "Midnight Moon Mug",
      description: "Ceramic mug featuring crescent moon and magnolia design in our signature colors",
      price: "$19.99",
      originalPrice: "$24.99",
      rating: 4.7,
      reviews: 203,
      image: "/midnight-moon-mug.png",
      category: "Kitchenware",
      bestseller: true,
      comingSoon: true,
    },
    {
      name: "Healing Journey Journal Cover",
      description: "Hardcover journal with our exclusive Southern Gothic artwork",
      price: "$24.99",
      originalPrice: "$29.99",
      rating: 4.9,
      reviews: 156,
      image: "/healing-journal-cover.png",
      category: "Stationery",
      bestseller: false,
      comingSoon: true,
    },
    {
      name: "Mystical Cat Bandana",
      description: "Soft cotton bandana featuring crescent moons and stars for your magical familiar",
      price: "$16.99",
      originalPrice: "$21.99",
      rating: 4.8,
      reviews: 94,
      image: "/mystical-cat-bandana.png",
      category: "Pet Accessories",
      bestseller: true,
      comingSoon: true,
    },
    {
      name: "Sacred Paws Food Bowl",
      description: "Ceramic pet bowl with protective symbols and magnolia motifs",
      price: "$22.99",
      originalPrice: "$27.99",
      rating: 4.6,
      reviews: 67,
      image: "/sacred-paws-bowl.png",
      category: "Pet Accessories",
      bestseller: false,
      comingSoon: true,
    },
    {
      name: "Moonlight Pet Collar",
      description: "Adjustable collar with celestial charms and soft padding for comfort",
      price: "$28.99",
      originalPrice: "$34.99",
      rating: 4.7,
      reviews: 112,
      image: "/moonlight-pet-collar.png",
      category: "Pet Accessories",
      bestseller: false,
      comingSoon: true,
    },
    {
      name: "Healing Herbs Pet Toy",
      description: "Organic catnip toy shaped like sage bundle for spiritual cleansing play",
      price: "$12.99",
      originalPrice: "$16.99",
      rating: 4.9,
      reviews: 203,
      image: "/healing-herbs-pet-toy.png",
      category: "Pet Accessories",
      bestseller: true,
      comingSoon: true,
    },
  ]

  const collections = [
    {
      name: "Sacred Home Collection",
      description: "Transform your space into a healing sanctuary",
      itemCount: 24,
      image: "/southern-gothic-pillow.png",
    },
    {
      name: "Mystical Accessories",
      description: "Carry your magic with you wherever you go",
      itemCount: 18,
      image: "/magnolia-tote-bag.png",
    },
    {
      name: "Midnight Menagerie",
      description: "Sacred accessories for your beloved animal companions",
      itemCount: 15,
      image: "/mystical-cat-bandana.png",
    },
  ]

  const storeFeatures = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Free Shipping",
      description: "On orders over $50 within the US",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Quality Guarantee",
      description: "30-day return policy on all items",
    },
    {
      icon: <Gift className="h-6 w-6" />,
      title: "Healing Bundles",
      description: "Curated sets for your journey",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Made with Love",
      description: "Each item infused with intention",
    },
  ]

  return (
    <section ref={ref} id="shop" className="py-20 bg-[#F5EDD6]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="bg-midnight-blue text-magnolia-white font-montserrat text-sm tracking-wider uppercase px-4 py-2 rounded-full inline-block mb-4 font-bold">
            Sacred Marketplace
          </p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-midnight-blue mb-6">
            Midnight Magnolia Shop
          </h2>
          <p className="font-lora text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
            Beautiful, intentional products that support your healing journey. From home decor to pet accessories, each
            item is chosen with love and designed to bring peace to your sacred space.
          </p>
        </motion.div>

        <Tabs defaultValue="featured" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 max-w-2xl mx-auto mb-12">
            <TabsTrigger value="featured" className="font-montserrat">
              Featured
            </TabsTrigger>
            <TabsTrigger value="collections" className="font-montserrat">
              Collections
            </TabsTrigger>
            <TabsTrigger value="about" className="font-montserrat">
              Our Promise
            </TabsTrigger>
          </TabsList>

          {/* Featured Products Tab */}
          <TabsContent value="featured">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={activeTab === "featured" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group relative"
                >
                  {/* Coming Soon Banner */}
                  {product.comingSoon && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-gold to-sage-green text-midnight-blue font-montserrat font-bold text-xs px-3 py-1 rounded-full shadow-lg z-10">
                      COMING SOON
                    </div>
                  )}

                  <div className="relative h-48 w-full">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.bestseller && (
                      <div className="absolute top-3 right-3 bg-gold text-midnight-blue text-xs font-montserrat font-bold px-3 py-1 rounded-full">
                        Bestseller
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3 bg-midnight-blue text-magnolia-white text-xs font-montserrat font-semibold px-2 py-1 rounded-full">
                      {product.category}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-playfair text-lg font-bold text-midnight-blue mb-2 group-hover:text-sage-green transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="font-lora text-gray-700 text-sm mb-3 leading-relaxed">{product.description}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating) ? "text-gold fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-montserrat text-xs text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-playfair text-lg font-bold text-midnight-blue">{product.price}</span>
                        <span className="font-lora text-xs text-gray-500 line-through">{product.originalPrice}</span>
                      </div>
                    </div>

                    <button
                      className={`w-full font-montserrat font-semibold px-4 py-2 rounded-full transition-all duration-300 min-h-[40px] text-sm ${
                        product.comingSoon
                          ? "bg-warm-gray text-gray-600 cursor-not-allowed"
                          : "bg-sage-green hover:bg-sage-green/90 text-midnight-blue hover:shadow-lg"
                      }`}
                      disabled={product.comingSoon}
                    >
                      {product.comingSoon ? "Coming Soon" : "Add to Cart"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Collections Tab */}
          <TabsContent value="collections">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={activeTab === "collections" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {collections.map((collection, index) => (
                <Card
                  key={collection.name}
                  className="bg-white border-sage-green/20 overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="font-playfair text-2xl text-midnight-blue">{collection.name}</CardTitle>
                    <CardDescription className="font-lora text-gray-700">{collection.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
                    <span className="font-montserrat text-sm text-sage-green font-semibold">
                      {collection.itemCount} items
                    </span>
                    <button className="text-sage-green font-montserrat font-semibold hover:text-midnight-blue transition-colors duration-300">
                      Shop Collection →
                    </button>
                  </CardFooter>
                </Card>
              ))}
            </motion.div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={activeTab === "about" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {storeFeatures.map((feature, index) => (
                  <Card
                    key={feature.title}
                    className="bg-white border-sage-green/20 text-center hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex justify-center text-sage-green mb-4">{feature.icon}</div>
                      <CardTitle className="font-playfair text-xl text-midnight-blue">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-lora text-gray-700">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-midnight-blue/5 rounded-3xl p-8 text-center">
                <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-4">Our Sacred Promise</h3>
                <p className="font-lora text-gray-800 leading-relaxed max-w-3xl mx-auto mb-6">
                  Every product in our shop is carefully selected or designed to support your healing journey. We
                  believe that the objects in your space should bring you peace, inspiration, and gentle reminders of
                  your own sacred worth. From the moment you place your order to the day it arrives at your door, we
                  infuse every step with intention and love.
                </p>
                <button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300 min-h-[44px]">
                  Visit Our Shopify Store
                </button>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
