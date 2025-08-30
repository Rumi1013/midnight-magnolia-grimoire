
// MidnightMagnoliaTierGraphics.jsx

import React from 'react';

const MidnightMagnoliaTierGraphics = () => {
  const colors = {
    midnightBlue: "#0A192F",
    magnoliaWhite: "#FAF3E0",
    richGold: "#D4AF37",
    sageGreen: "#A3B18A"
  };

  const tierData = [
    {
      name: "Magnolia Seed",
      price: "$3",
      tagline: "Plant the seeds of transformation",
      icon: "*",
      benefits: ["Monthly digital affirmation cards", "Exclusive wallpapers", "Supporter recognition"]
    },
    {
      name: "Crescent Bloom",
      price: "$7",
      tagline: "Illuminate your path through shadow and light",
      icon: "*",
      benefits: ["Everything in Magnolia Seed", "Monthly tarot card", "Private blog content"]
    },
    {
      name: "Golden Grove",
      price: "$15",
      tagline: "Nurture your creative spirit and ancestral wisdom",
      icon: "*",
      benefits: ["Everything in previous tiers", "Printable journal pages", "Audio rituals"]
    },
    {
      name: "Moonlit Sanctuary",
      price: "$30",
      tagline: "Enter the sacred space of collective healing",
      icon: "*",
      benefits: ["Everything in previous tiers", "Personalized content", "Community gatherings"]
    },
    {
      name: "House of Midnight",
      price: "$75",
      tagline: "Dwell in the ancestral mansion of creative abundance",
      icon: "*",
      benefits: ["Everything in previous tiers", "Quarterly mailings", "1:1 connection with creator"]
    }
  ];

  return (
    <div style={{ fontFamily: "Montserrat, sans-serif", color: colors.magnoliaWhite }}>
      <h1 style={{ fontFamily: "Playfair Display, serif", color: colors.richGold }}>
        Midnight Magnolia Patreon Tiers
      </h1>
      {/* Tier blocks go here */}
    </div>
  );
};

export default MidnightMagnoliaTierGraphics;
