/**
 * Devkrupa Jewellers - Centralized Diwali 2026 Campaign Configuration
 * 
 * Rules:
 * - Timezone: Asia/Kolkata (IST)
 * - Dates strictly follow campaign period (Dhanteras to Diwali / New Year season 2026)
 * - Uses verified business phone: +919638748423
 * - Real jewellery assets from src/assets
 * - Prices and discounts reflect realistic, verified Indian jewellery business practices
 * - Explicit bullion & tax disclaimers included
 */

import bridalNecklaceAntique from '../assets/bridal_necklace_antique.jpg';
import bridalNecklaceChokerSet from '../assets/bridal_necklace_choker_set_v2.jpg';
import silverPoojaPremiumThaliSet from '../assets/silver_pooja_premium_thali_set.jpg';
import silverPoojaGaneshaIdol from '../assets/silver_pooja_ganesha_idol.jpg';
import diamondNecklaceClassicPink from '../assets/diamond_necklace_classic_pink.jpg';
import banglesRoyalTempleKada from '../assets/bangles_royal_temple_kada.jpg';
import heroNecklace from '../assets/hero_necklace_v2.jpg';
import goldRingAntiqueLeaf from '../assets/gold_ring_antique_leaf.jpg';

export const DIWALI_CAMPAIGN_CONFIG = {
  campaignId: "diwali-2026",
  title: "Shubh Deepavali 2026: Festive Radiance Collection",
  subtitle: "Celebrate 110 Years of Trust with Divine Craftsmanship & Exclusive Festive Privileges",
  startDate: "2026-10-25T00:00:00+05:30",
  endDate: "2026-11-15T23:59:59+05:30",
  timezone: "Asia/Kolkata",
  isActive: true,
  store: {
    name: "Devkrupa Jewellers",
    tagline: "Legacy of Trust Since 1916 (110 Years)",
    phone: "+91 96387 48423",
    whatsappNumber: "919638748423",
    email: "info@devkrupajewellers.com",
    address: "Near Ramdev Masala, Opp. Vikram Mill, Saraspur, Ahmedabad, Gujarat 380018",
    googleMapsUrl: "https://www.google.com/maps/place/DEVKRUPA+JEWELLERS/@23.0264246,72.6103282,801m/data=!3m2!1e3!4b1!4m6!3m5!1s0x395e858a97eb4da9:0x25f37a7e37301c0d!8m2!3d23.0264246!4d72.6129031!16s%2Fg%2F11ry4t3jy6?entry=ttu",
    hours: {
      monSat: "10:30 AM - 8:30 PM",
      sunday: "11:00 AM - 6:00 PM",
      dhanterasExtended: "Open till 10:30 PM on Dhanteras & Pushya Nakshatra"
    }
  },
  generalDisclaimers: [
    "Gold & Silver prices are pegged to the live daily bullion market rates in Ahmedabad and are updated daily.",
    "Festive privileges apply on eligible ornaments and collections as per showroom policy.",
    "3% GST will be levied on the final invoiced amount as mandated by Government of India regulations.",
    "All gold ornaments are 100% BIS Hallmarked (916 / 22K or 750 / 18K) with unique HUID verification.",
    "Diamonds are certified natural gemstones with authentic gemological grading reports.",
    "Campaign privileges are valid strictly from 25th October 2026 to 15th November 2026, or until stock lasts."
  ],
  offers: [
    {
      id: "diwali-gold-offer",
      title: "Royal 22K Gold Jewellery Festive Privilege",
      category: "Gold",
      offerType: "Custom promotional offer",
      discountValue: "Diwali Exclusive Offers on Gold Jewellery",
      discountHighlight: "Diwali Exclusive Offers",
      badge: "Festive Bestseller",
      description: "Adorn yourself this Dhanteras & Diwali in timeless 22K BIS Hallmarked gold necklaces, royal antique temple kadas, and handcrafted bridal sets with our exclusive festive privileges.",
      image: bridalNecklaceChokerSet,
      applicableCategories: ["Bridal Collection", "Bangles", "Rings", "Earrings", "Mangalsutra"],
      targetRoute: "/products",
      terms: [
        "Valid on select 22K (916) hallmarked gold jewellery pieces.",
        "Exclusive festive privileges applied at the time of showroom purchase.",
        "Cannot be combined with customized bespoke design orders requiring specialized die-casting.",
        "Applicable for both in-showroom purchases and pre-booked festive orders."
      ],
      whatsappInquiry: "Hello Devkrupa Jewellers, I am interested in your Diwali Exclusive Offers on Gold Jewellery. Please share details on available designs and booking."
    },
    {
      id: "diwali-silver-offer",
      title: "Shubh Pooja & 925 Sterling Silver Festive Offer",
      category: "Silver",
      offerType: "Custom promotional offer",
      discountValue: "Diwali Exclusive Offers on Silver Articles",
      discountHighlight: "Diwali Exclusive Offers",
      badge: "Auspicious Dhanteras",
      description: "Welcome Goddess Lakshmi into your home with certified 925 pure sterling silver pooja thali sets, Kamdhenu idols, Ganesha murtis, silver diyas, and handcrafted bridal payals.",
      image: silverPoojaPremiumThaliSet,
      applicableCategories: ["Silver Pooja Items", "Silver Payal", "Silver Kamarband", "Silver Articles"],
      targetRoute: "/silver",
      terms: [
        "Applies to pure 925 Sterling Silver Pooja articles, idols, and silver jewellery.",
        "Bullion silver rate calculated as per Ahmedabad bullion market on date of invoice.",
        "Exclusive festive privileges applicable on in-stock silver festive sets.",
        "Complimentary festive gift packaging included."
      ],
      whatsappInquiry: "Hello Devkrupa Jewellers, I would like to inquire about your Diwali Exclusive Offers on Silver Pooja & Jewellery articles. Please share catalog and Dhanteras booking options."
    },
    {
      id: "diwali-diamond-offer",
      title: "Solitaire & Natural Diamond Festive Splendour",
      category: "Diamond",
      offerType: "Custom promotional offer",
      discountValue: "Diwali Exclusive Offers on Certified Diamonds",
      discountHighlight: "Diwali Exclusive Offers",
      badge: "Luxury Exclusive",
      description: "Experience the eternal fire of certified natural diamonds with our signature festive privileges across exquisite diamond necklaces, solitaires, and festive party wear.",
      image: diamondNecklaceClassicPink,
      applicableCategories: ["Diamond Necklaces", "Diamond Rings", "Diamond Earrings"],
      targetRoute: "/products",
      terms: [
        "Exclusive festive privileges provided on eligible certified diamond jewellery purchases.",
        "Diamonds are 100% natural, ethically sourced, and independently certified.",
        "Offer valid during the Diwali campaign period.",
        "Not redeemable for cash or direct metal credit."
      ],
      whatsappInquiry: "Hello Devkrupa Jewellers, I am inquiring about the Diwali Exclusive Offers on Diamond Jewellery. Please provide details."
    },
    {
      id: "diwali-gold-coins-offer",
      title: "Auspicious 24K (999) Lakshmi-Ganesh Gold Coins",
      category: "Gold Coins",
      offerType: "Custom promotional offer",
      discountValue: "Diwali Exclusive Offers on 24K Minted Coins",
      discountHighlight: "Diwali Exclusive Offers",
      badge: "Pure Investment",
      description: "Invest in purest 24 Karat (999.9 Purity) Lakshmi & Ganesh minted gold coins for Dhanteras Shubh Muhurat. Certified tamper-proof tamper-evident blister packaging.",
      image: goldRingAntiqueLeaf,
      applicableCategories: ["Gold Coins", "Investment Bullion"],
      targetRoute: "/contact",
      terms: [
        "Available in 1 Gram, 2 Gram, 5 Gram, 8 Gram, and 10 Gram denominations.",
        "Exclusive festive privileges available during Shubh Muhurat shopping.",
        "Subject to daily 24K bullion spot price at time of billing + 3% GST.",
        "Advance booking recommended for guaranteed delivery on Dhanteras."
      ],
      whatsappInquiry: "Hello Devkrupa Jewellers, I want to reserve 24K (999 Purity) Lakshmi-Ganesh Gold Coins with Diwali Exclusive Offers. Please share current rates and booking process."
    },
    {
      id: "diwali-making-charges-tier",
      title: "Festive Making Charges Exclusive Privileges",
      category: "Making Charges",
      offerType: "Custom promotional offer",
      discountValue: "Diwali Exclusive Offers on Craftsmanship Charges",
      discountHighlight: "Diwali Exclusive Offers",
      badge: "Festive Privilege",
      description: "Transparent festive craftsmanship privileges across all traditional Kundan, Jadau, Antique Temple, and Contemporary Lightweight Festive Jewellery.",
      image: banglesRoyalTempleKada,
      applicableCategories: ["All Gold & Silver Collections"],
      targetRoute: "/products",
      terms: [
        "Special festive concessions on craftsmanship charges applied at showroom billing.",
        "Applies across all traditional Kundan, Antique Temple, and Bridal collections.",
        "Valid throughout the Diwali campaign period.",
        "Inquire with our showroom specialist for tailored bridal package benefits."
      ],
      whatsappInquiry: "Hello Devkrupa Jewellers, please guide me regarding your Diwali Exclusive Offers on Jewellery Making Charges."
    }
  ],
  faqs: [
    {
      question: "How are jewellery prices calculated during the Diwali 2026 campaign?",
      answer: "Every jewellery item at Devkrupa Jewellers follows 100% transparent pricing: (Net Gold/Silver Weight × Today's Live Bullion Rate) + (Making Charges after Festive Discount) + (Stone/Gemstone charges, if applicable) + 3% GST. We display the weight and purity on your official tax invoice."
    },
    {
      question: "Can I advance-book my jewellery for Dhanteras and Diwali pickup?",
      answer: "Yes! You can reserve your desired jewellery or 24K gold coins in advance to lock in your design and ensure prioritized handover on Dhanteras or Diwali day. Contact us directly on WhatsApp (+91 96387 48423) or visit our Saraspur showroom."
    },
    {
      question: "Are all gold ornaments BIS Hallmarked?",
      answer: "Absolutely. Devkrupa Jewellers has maintained the highest purity standards in Ahmedabad since 1916. Every single gold ornament bears the mandatory BIS Hallmark logo, karat purity (916 for 22K, 750 for 18K), and a unique 6-digit alphanumeric HUID code that can be verified on the official BIS Care app."
    },
    {
      question: "What are the showroom timings during the Diwali festive week?",
      answer: "Our showroom is open from 10:30 AM to 8:30 PM (Mon–Sat) and 11:00 AM to 6:00 PM on Sundays. On auspicious shopping days like Pushya Nakshatra and Dhanteras, we offer extended showroom hours until 10:30 PM for customer convenience."
    },
    {
      question: "Do you accept old gold exchange during the Diwali campaign?",
      answer: "Yes, we offer 100% transparent old gold valuation with computerized karat testing right in front of you. You can exchange your old gold for new festive jewellery and take advantage of all active Diwali making charge discounts."
    }
  ]
};

