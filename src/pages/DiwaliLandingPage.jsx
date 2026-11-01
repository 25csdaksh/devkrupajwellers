import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  MessageCircle, 
  ArrowRight, 
  Calendar, 
  ShieldCheck, 
  Award, 
  MapPin, 
  Phone, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Gem, 
  Percent, 
  Coins, 
  HeartHandshake,
  ExternalLink,
  Flame
} from 'lucide-react';
import { DIWALI_CAMPAIGN_CONFIG } from '../config/diwaliCampaignConfig';
import { useCampaignCountdown, buildWhatsAppUrl, formatFestiveDate } from '../utils/campaignAutomation';
import DiwaliOfferCard from '../components/diwali/DiwaliOfferCard';
import { fallbackProducts } from '../firebase/productsData';
import { silverProducts } from '../firebase/silverProductsData';

import heroNecklace from '../assets/hero_necklace_v2.jpg';
import bridalBanner from '../assets/bridal_collection_banner.jpg';
import silverPoojaThali from '../assets/silver_pooja_premium_thali_set.jpg';
import silverGanesha from '../assets/silver_pooja_ganesha_idol.jpg';
import diamondNecklace from '../assets/diamond_necklace_classic_pink.jpg';
import templeKada from '../assets/bangles_royal_temple_kada.jpg';
import antiqueLeafRing from '../assets/gold_ring_antique_leaf.jpg';

const DiwaliLandingPage = () => {
  const { title, subtitle, startDate, endDate, isActive, store, offers, faqs, generalDisclaimers } = DIWALI_CAMPAIGN_CONFIG;
  const { status } = useCampaignCountdown(startDate, endDate, isActive);

  const [openFaq, setOpenFaq] = useState(0);

  // SEO Document Title & Meta injection
  useEffect(() => {
    document.title = "Diwali 2026 Jewellery Offers & Collection | Devkrupa Jewellers Ahmedabad";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Celebrate Shubh Deepavali 2026 with Devkrupa Jewellers. Exclusive Dhanteras offers on 22K BIS Hallmarked Gold, 925 Sterling Silver Pooja Thalis, Certified Diamonds & 24K Gold Coins in Ahmedabad since 1916.";

    // Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = 'https://devkrupajewellers.com/diwali-2026';

    // Structured Data JSON-LD for LocalBusiness & SaleEvent
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "JewelryStore",
          "@id": "https://devkrupajewellers.com/#store",
          "name": "Devkrupa Jewellers",
          "url": "https://devkrupajewellers.com",
          "telephone": "+919638748423",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Near Ramdev Masala, Opp. Vikram Mill, Saraspur",
            "addressLocality": "Ahmedabad",
            "addressRegion": "Gujarat",
            "postalCode": "380018",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "23.0264246",
            "longitude": "72.6129031"
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "10:30",
              "closes": "20:30"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Sunday"],
              "opens": "11:00",
              "closes": "18:00"
            }
          ]
        },
        {
          "@type": "SaleEvent",
          "name": "Devkrupa Jewellers Diwali 2026 Festive Jewellery Campaign",
          "startDate": startDate,
          "endDate": endDate,
          "eventStatus": "https://schema.org/EventScheduled",
          "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
          "location": {
            "@type": "Place",
            "name": "Devkrupa Jewellers Showroom",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Near Ramdev Masala, Opp. Vikram Mill, Saraspur",
              "addressLocality": "Ahmedabad",
              "addressRegion": "Gujarat",
              "postalCode": "380018",
              "addressCountry": "IN"
            }
          },
          "description": "Premium Diwali 2026 festive gold, silver, and diamond jewellery privileges with up to 25% off making charges and complimentary silver tokens in Ahmedabad."
        }
      ]
    };

    let scriptTag = document.getElementById('diwali-ld-json');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'diwali-ld-json';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);

    return () => {
      // Clean up title on unmount
      document.title = "Devkrupa Jewellers";
    };
  }, [startDate, endDate]);

  const heroWhatsappUrl = buildWhatsAppUrl(
    store.whatsappNumber,
    "Hello Devkrupa Jewellers, I would like to inquire about your Diwali 2026 Festive Collection and Dhanteras booking privileges."
  );

  // Group offers for direct section mapping
  const goldOffer = offers.find(o => o.category === "Gold");
  const silverOffer = offers.find(o => o.category === "Silver");
  const diamondOffer = offers.find(o => o.category === "Diamond");
  const coinsOffer = offers.find(o => o.category === "Gold Coins");
  const makingChargesOffer = offers.find(o => o.category === "Making Charges");

  // Filter curated featured products from real catalogs
  const featuredGoldProducts = fallbackProducts.slice(0, 4);
  const featuredSilverItems = silverProducts.filter(p => p.category?.toLowerCase().includes('pooja') || p.category?.toLowerCase().includes('payal')).slice(0, 2);
  const combinedFeatured = [...featuredGoldProducts, ...featuredSilverItems];

  return (
    <div className="bg-[#FBF8F1] text-[#242124] min-h-screen font-sans selection:bg-[#D4AF37] selection:text-[#4A1020]">
      
      {/* =========================================================================
          SECTION 1: PREMIUM DIWALI HERO
          ========================================================================= */}
      <header className="relative bg-[#4A1020] text-[#FBF8F1] overflow-hidden border-b border-[#D4AF37]/40">
        {/* Background ambient texture */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Auspicious Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#4A1020] px-3.5 py-1 text-xs font-bold uppercase tracking-widest rounded-sm shadow-sm">
                  <Flame size={14} className="text-[#4A1020]" />
                  <span>Diwali 2026 Grand Celebration</span>
                </span>
                
                <span className="inline-flex items-center gap-1.5 text-xs text-[#FBF8F1]/80 bg-black/30 border border-[#D4AF37]/30 px-3 py-1 rounded-sm">
                  <Award size={13} className="text-[#D4AF37]" />
                  <span>110 Years of Legacy (Since 1916)</span>
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#FBF8F1] leading-[1.15] tracking-tight">
                Shubh Deepavali <span className="text-[#D4AF37]">2026</span>
                <br />
                <span className="text-2xl sm:text-3xl md:text-4xl font-normal italic font-serif text-[#FBF8F1]/90">
                  Festive Radiance &amp; Eternal Purity
                </span>
              </h1>

              {/* Tagline / Subtitle */}
              <p className="text-base sm:text-lg text-[#FBF8F1]/85 font-light leading-relaxed max-w-2xl">
                Illumine this auspicious season with Devkrupa Jewellers' mastercrafted 22K BIS Hallmarked gold, certified natural diamonds, and pure 925 sterling silver pooja masterpieces. Experience timeless craftsmanship trusted for four generations in Ahmedabad.
              </p>

              {/* Campaign Validity Info */}
              <div className="bg-black/35 border border-[#D4AF37]/30 p-4 rounded-sm max-w-xl backdrop-blur-sm">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span>Dhanteras to Diwali Campaign: {formatFestiveDate(startDate)} – {formatFestiveDate(endDate)}</span>
                  </span>
                  <span className="text-[11px] bg-[#4A1020] text-[#D4AF37] border border-[#D4AF37]/40 px-2 py-0.5 rounded-sm font-bold uppercase">
                    {status === 'upcoming' ? 'Upcoming' : 'Campaign Active'}
                  </span>
                </div>
              </div>

              {/* Hero Action CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href="#special-offers"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#D4AF37] hover:bg-[#c49f2e] text-[#4A1020] text-sm font-bold uppercase tracking-wider rounded-sm transition-all shadow-lg shadow-black/20"
                >
                  <span>Explore Festive Offers</span>
                  <ArrowRight size={17} />
                </a>

                <a
                  href={heroWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#128C7E] hover:bg-[#0c6b61] text-white text-sm font-semibold uppercase tracking-wider rounded-sm transition-all shadow-lg shadow-black/20 border border-green-400/30"
                >
                  <MessageCircle size={17} />
                  <span>WhatsApp VIP Booking</span>
                </a>
              </div>
            </div>

            {/* Right Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative border-2 border-[#D4AF37]/60 p-2.5 rounded-sm bg-[#140526] shadow-2xl">
                <div className="aspect-[4/5] overflow-hidden rounded-sm relative">
                  <img
                    src={heroNecklace}
                    alt="Devkrupa Jewellers Shubh Deepavali 2026 Heritage Necklace"
                    className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A1020]/90 via-transparent to-black/20" />
                  
                  <div className="absolute bottom-5 left-5 right-5 text-left p-4 bg-black/60 backdrop-blur-md rounded-sm border border-[#D4AF37]/40">
                    <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest block mb-1">
                      Festive Signature Piece
                    </span>
                    <h3 className="text-lg font-serif font-bold text-[#FBF8F1]">
                      Handcrafted Kundan &amp; 22K Gold Heritage Choker Set
                    </h3>
                    <p className="text-xs text-[#FBF8F1]/80 mt-1">
                      BIS 916 Hallmarked | Certified Natural Gemstones
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>


      {/* =========================================================================
          SECTION 2: FESTIVAL INTRODUCTION
          ========================================================================= */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-[#4A1020] text-xs font-bold uppercase tracking-widest">
            <Sparkles size={14} className="text-[#D4AF37]" />
            <span>The Sacred Spirit of Deepavali</span>
            <Sparkles size={14} className="text-[#D4AF37]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#4A1020]">
            Welcoming Prosperity, Light, and Generational Trust
          </h2>

          <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto my-3" />

          <p className="text-[#242124]/85 text-base sm:text-lg leading-relaxed">
            Diwali is more than a festival—it is an auspicious homecoming of Mahalakshmi, celebrating purity, wealth, and righteous beginnings. For 110 continuous years, Devkrupa Jewellers has accompanied Ahmedabad’s families during their most sacred Shubh Muhurats. 
          </p>
          <p className="text-[#242124]/75 text-sm sm:text-base leading-relaxed">
            From procuring the quintessential Dhanteras gold coin to adorning the Diwali bride in heritage temple jewellery, our commitment to 100% hallmarked authenticity and honest bullion pricing remains unwavering.
          </p>
        </div>

        {/* 4 Auspicious Festive Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <div className="bg-white p-6 border border-[#D4AF37]/30 rounded-sm shadow-sm text-center">
            <div className="w-12 h-12 bg-[#4A1020] text-[#D4AF37] rounded-sm flex items-center justify-center mx-auto mb-4">
              <Flame size={22} />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#4A1020] mb-2">Dhanteras Shubh Muhurat</h3>
            <p className="text-xs text-[#242124]/75 leading-relaxed">
              Guaranteed availability of 24K gold coins and pure silver articles for your Dhanteras pujan.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#D4AF37]/30 rounded-sm shadow-sm text-center">
            <div className="w-12 h-12 bg-[#4A1020] text-[#D4AF37] rounded-sm flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={22} />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#4A1020] mb-2">100% BIS Hallmarked</h3>
            <p className="text-xs text-[#242124]/75 leading-relaxed">
              Every gram of gold is certified 916 with unique HUID laser engraving verifiable on the BIS app.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#D4AF37]/30 rounded-sm shadow-sm text-center">
            <div className="w-12 h-12 bg-[#4A1020] text-[#D4AF37] rounded-sm flex items-center justify-center mx-auto mb-4">
              <Percent size={22} />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#4A1020] mb-2">Festive Making Privileges</h3>
            <p className="text-xs text-[#242124]/75 leading-relaxed">
              Direct festive concessions up to 25% on craftsmanship making charges on eligible collections.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#D4AF37]/30 rounded-sm shadow-sm text-center">
            <div className="w-12 h-12 bg-[#4A1020] text-[#D4AF37] rounded-sm flex items-center justify-center mx-auto mb-4">
              <Award size={22} />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#4A1020] mb-2">110-Year Ahmedabad Heritage</h3>
            <p className="text-xs text-[#242124]/75 leading-relaxed">
              Proudly serving Gujarat since 1916 with generational transparency and zero compromise.
            </p>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 3: SPECIAL OFFERS OVERVIEW
          ========================================================================= */}
      <section id="special-offers" className="py-16 bg-[#4A1020] text-[#FBF8F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest block mb-2">
              Exclusive Campaign Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FBF8F1]">
              Diwali 2026 Special Offers Overview
            </h2>
            <p className="text-[#FBF8F1]/80 text-sm mt-2">
              Explore our five signature festive offer categories tailored for Dhanteras, Lakshmi Pujan, and New Year celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {offers.map((offer) => (
              <a
                key={offer.id}
                href={`#section-${offer.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-[#380c18] hover:bg-[#2e0914] p-5 rounded-sm border border-[#D4AF37]/30 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider block mb-1">
                    {offer.category}
                  </span>
                  <h3 className="font-serif font-bold text-sm text-[#FBF8F1] group-hover:text-[#D4AF37] transition-colors leading-snug mb-2">
                    {offer.title}
                  </h3>
                  <div className="bg-[#4A1020] text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold px-2 py-1 rounded-sm inline-block mb-3">
                    {offer.discountHighlight}
                  </div>
                </div>
                <div className="text-[11px] text-[#D4AF37] flex items-center gap-1 font-semibold pt-2 border-t border-[#D4AF37]/20">
                  <span>View Details</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 4: GOLD JEWELLERY OFFERS
          ========================================================================= */}
      <section id="section-gold" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <span className="text-[#4A1020] font-bold text-xs uppercase tracking-widest block mb-1">
              Category 01
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#4A1020] mb-3">
              Gold Jewellery Festive Privileges
            </h2>
            <p className="text-[#242124]/80 text-sm leading-relaxed mb-4">
              From our acclaimed antique temple bangles to multi-tier bridal necklace sets, our 22K (916) hallmarked gold ornaments embody traditional royalty. During this festive season, enjoy up to 25% concession on mastercraft making charges.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#4A1020]">
                <CheckCircle2 size={15} className="text-[#D4AF37]" />
                <span>100% BIS Hallmarked 916 Gold with Unique HUID</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#4A1020]">
                <CheckCircle2 size={15} className="text-[#D4AF37]" />
                <span>Transparent bullion rate updated daily</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#4A1020]">
                <CheckCircle2 size={15} className="text-[#D4AF37]" />
                <span>Applicable on bridal chokers, temple kadas, and earrings</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {goldOffer && (
              <DiwaliOfferCard 
                offer={goldOffer} 
                campaignEndDate={endDate} 
                whatsappNumber={store.whatsappNumber} 
              />
            )}
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 5: SILVER JEWELLERY OFFERS
          ========================================================================= */}
      <section id="section-silver" className="py-16 sm:py-20 bg-white border-y border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              {silverOffer && (
                <DiwaliOfferCard 
                  offer={silverOffer} 
                  campaignEndDate={endDate} 
                  whatsappNumber={store.whatsappNumber} 
                />
              )}
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <span className="text-[#4A1020] font-bold text-xs uppercase tracking-widest block mb-1">
                Category 02
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#4A1020] mb-3">
                925 Sterling Silver &amp; Auspicious Pooja Articles
              </h2>
              <p className="text-[#242124]/80 text-sm leading-relaxed mb-4">
                Dhanteras and Diwali worship requires pure craftsmanship. Our pooja collection features 925 sterling silver Ganesha and Lakshmi idols, handcrafted Kamdhenu cows, intricately engraved pooja thali sets, and bridal payals.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#4A1020]">
                  <CheckCircle2 size={15} className="text-[#D4AF37]" />
                  <span>Flat 15% off on making charges for all silver articles</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#4A1020]">
                  <CheckCircle2 size={15} className="text-[#D4AF37]" />
                  <span>Certified 92.5% purity guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#4A1020]">
                  <CheckCircle2 size={15} className="text-[#D4AF37]" />
                  <span>Complimentary festive velvet presentation cases</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 6: DIAMOND JEWELLERY OFFERS
          ========================================================================= */}
      <section id="section-diamond" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <span className="text-[#4A1020] font-bold text-xs uppercase tracking-widest block mb-1">
              Category 03
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#4A1020] mb-3">
              Solitaires &amp; Natural Diamond Festive Splendour
            </h2>
            <p className="text-[#242124]/80 text-sm leading-relaxed mb-4">
              Bring timeless sparkle to your Diwali festivities with certified natural diamonds. Every single diamond piece is crafted with EF-VVS and GH-VS stones, mounted with utmost precision in 18K gold.
            </p>
            <div className="bg-[#4A1020]/5 p-4 rounded-sm border-l-4 border-[#D4AF37] mb-6">
              <span className="text-xs uppercase font-bold text-[#4A1020] block mb-1">
                Campaign Token of Prosperity:
              </span>
              <p className="text-sm font-semibold text-[#4A1020]">
                Receive a complimentary 10g pure 999 silver coin on diamond purchases above ₹1,00,000.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {diamondOffer && (
              <DiwaliOfferCard 
                offer={diamondOffer} 
                campaignEndDate={endDate} 
                whatsappNumber={store.whatsappNumber} 
              />
            )}
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 7: GOLD COINS OFFERS
          ========================================================================= */}
      <section id="section-gold-coins" className="py-16 sm:py-20 bg-white border-y border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              {coinsOffer && (
                <DiwaliOfferCard 
                  offer={coinsOffer} 
                  campaignEndDate={endDate} 
                  whatsappNumber={store.whatsappNumber} 
                />
              )}
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <span className="text-[#4A1020] font-bold text-xs uppercase tracking-widest block mb-1">
                Category 04
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#4A1020] mb-3">
                Auspicious 24K (999) Lakshmi-Ganesh Gold Coins
              </h2>
              <p className="text-[#242124]/80 text-sm leading-relaxed mb-4">
                Dhanteras gold investment is an Indian household tradition. Our 24 Karat 999.9 pure minted coins feature embossed Lakshmi and Ganeshji depictions, encased in tamper-evident certified blister packs.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#4A1020]">
                  <CheckCircle2 size={15} className="text-[#D4AF37]" />
                  <span>Zero making charges on 5g &amp; 10g denominations</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#4A1020]">
                  <CheckCircle2 size={15} className="text-[#D4AF37]" />
                  <span>Available from 1g to 10g denominations</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#4A1020]">
                  <CheckCircle2 size={15} className="text-[#D4AF37]" />
                  <span>Pre-book on WhatsApp to guarantee Dhanteras pickup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 8: MAKING CHARGES DISCOUNT TIERS
          ========================================================================= */}
      <section id="section-making-charges" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#4A1020] text-xs font-bold uppercase tracking-widest block mb-2">
            Transparent Pricing Policy
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#4A1020]">
            Festive Making Charges Discount Tiers
          </h2>
          <p className="text-[#242124]/80 text-sm mt-2">
            At Devkrupa Jewellers, we calculate prices transparently. The more you shop for your family’s festive requirements, the higher your savings on artisanal labor charges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 border-2 border-[#D4AF37]/30 rounded-sm shadow-sm relative">
            <span className="text-xs uppercase font-bold text-[#4A1020] tracking-wider block mb-1">
              Tier 01 • Festive Starters
            </span>
            <div className="text-3xl font-serif font-bold text-[#4A1020] mb-2">
              10% OFF
            </div>
            <div className="text-xs text-[#242124]/75 mb-4 font-medium">
              Applicable on purchases up to ₹1,50,000
            </div>
            <p className="text-xs text-[#242124]/80 leading-relaxed mb-4">
              Perfect for lightweight gold rings, daily wear chains, stud earrings, and festive silver pooja diyas.
            </p>
            <div className="text-[11px] text-[#4A1020] font-semibold bg-[#FBF8F1] p-2 rounded-sm border border-[#D4AF37]/20">
              Valid on net making charges
            </div>
          </div>

          <div className="bg-[#4A1020] text-[#FBF8F1] p-6 border-2 border-[#D4AF37] rounded-sm shadow-md relative">
            <div className="absolute top-3 right-3 bg-[#D4AF37] text-[#4A1020] text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
              Most Popular
            </div>
            <span className="text-xs uppercase font-bold text-[#D4AF37] tracking-wider block mb-1">
              Tier 02 • Family Celebrations
            </span>
            <div className="text-3xl font-serif font-bold text-[#D4AF37] mb-2">
              18% OFF
            </div>
            <div className="text-xs text-[#FBF8F1]/80 mb-4 font-medium">
              Purchases between ₹1,50,001 and ₹4,00,000
            </div>
            <p className="text-xs text-[#FBF8F1]/85 leading-relaxed mb-4">
              Ideal for pair of antique bangles, royal temple kadas, mangalsutras, and heavy silver dinner sets.
            </p>
            <div className="text-[11px] text-[#D4AF37] font-semibold bg-black/30 p-2 rounded-sm border border-[#D4AF37]/30">
              Maximum festive family value
            </div>
          </div>

          <div className="bg-white p-6 border-2 border-[#D4AF37]/30 rounded-sm shadow-sm relative">
            <span className="text-xs uppercase font-bold text-[#4A1020] tracking-wider block mb-1">
              Tier 03 • Grand Bridal &amp; Festive
            </span>
            <div className="text-3xl font-serif font-bold text-[#4A1020] mb-2">
              25% OFF
            </div>
            <div className="text-xs text-[#242124]/75 mb-4 font-medium">
              Purchases above ₹4,00,000
            </div>
            <p className="text-xs text-[#242124]/80 leading-relaxed mb-4">
              Exclusive privileges on grand heritage bridal sets, Jadau masterpieces, and royal heirloom sets.
            </p>
            <div className="text-[11px] text-[#4A1020] font-semibold bg-[#FBF8F1] p-2 rounded-sm border border-[#D4AF37]/20">
              VIP consultation included
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 9: FEATURED FESTIVE PRODUCTS
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-t border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
            <div>
              <span className="text-[#4A1020] text-xs font-bold uppercase tracking-widest block mb-1">
                Handpicked by Master Artisans
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#4A1020]">
                Featured Festive Masterpieces
              </h2>
              <p className="text-xs sm:text-sm text-[#242124]/75 mt-1">
                Authentic jewellery designs currently showcased in our showroom.
              </p>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4A1020] hover:text-[#D4AF37] uppercase tracking-wider transition-colors"
            >
              <span>Explore All Products</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {combinedFeatured.map((product) => {
              const productWhatsappUrl = buildWhatsAppUrl(
                store.whatsappNumber,
                `Hello Devkrupa Jewellers, I am interested in the ${product.name} featured in your Diwali 2026 campaign. Please share current pricing and availability.`
              );

              return (
                <div
                  key={product.id}
                  className="bg-[#FBF8F1] border border-[#D4AF37]/25 rounded-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative aspect-square w-full bg-[#140526] overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-[#4A1020] text-[#D4AF37] text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider border border-[#D4AF37]/40">
                      {product.purity || 'Hallmarked'}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <span className="text-[10px] text-[#4A1020] font-semibold uppercase tracking-wider block mb-1">
                      {product.category}
                    </span>
                    <h3 className="font-serif font-bold text-sm text-[#242124] line-clamp-1 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#242124]/75 line-clamp-2 mb-3 flex-grow">
                      {product.description}
                    </p>

                    <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[#4A1020]">
                        Weight: {product.weight || 'Available on request'}
                      </span>
                      <a
                        href={productWhatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-[#128C7E] hover:bg-[#0b6359] px-3 py-1.5 rounded-sm transition-colors"
                      >
                        <MessageCircle size={13} />
                        <span>Inquire</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 10: WHY CHOOSE DEVKRUPA JEWELLERS
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#4A1020] text-[#FBF8F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest block mb-2">
              Generations of Faith
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FBF8F1]">
              Why Choose Devkrupa Jewellers?
            </h2>
            <p className="text-[#FBF8F1]/80 text-sm mt-2">
              Since 1916, our founding principles of purity, transparency, and masterly art have defined our relationship with every customer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#380c18] p-6 rounded-sm border border-[#D4AF37]/30">
              <Award className="text-[#D4AF37] mb-3" size={28} />
              <h3 className="font-serif font-bold text-base text-[#FBF8F1] mb-1">110-Year Continuous Legacy</h3>
              <p className="text-xs text-[#FBF8F1]/80 leading-relaxed">
                Founded in 1916 in Ahmedabad, we have served four generations of families with absolute dedication, integrity, and warmth.
              </p>
            </div>

            <div className="bg-[#380c18] p-6 rounded-sm border border-[#D4AF37]/30">
              <ShieldCheck className="text-[#D4AF37] mb-3" size={28} />
              <h3 className="font-serif font-bold text-base text-[#FBF8F1] mb-1">BIS 916 Hallmark &amp; HUID</h3>
              <p className="text-xs text-[#FBF8F1]/80 leading-relaxed">
                Zero ambiguity. Every gold article is certified by the Bureau of Indian Standards with traceable 6-digit laser HUID stamping.
              </p>
            </div>

            <div className="bg-[#380c18] p-6 rounded-sm border border-[#D4AF37]/30">
              <Gem className="text-[#D4AF37] mb-3" size={28} />
              <h3 className="font-serif font-bold text-base text-[#FBF8F1] mb-1">Certified Natural Diamonds</h3>
              <p className="text-xs text-[#FBF8F1]/80 leading-relaxed">
                Every solitaire and diamond ornament comes with independent gemological certificates detailing 4Cs—Cut, Color, Clarity, and Carat.
              </p>
            </div>

            <div className="bg-[#380c18] p-6 rounded-sm border border-[#D4AF37]/30">
              <Percent className="text-[#D4AF37] mb-3" size={28} />
              <h3 className="font-serif font-bold text-base text-[#FBF8F1] mb-1">100% Transparent Invoicing</h3>
              <p className="text-xs text-[#FBF8F1]/80 leading-relaxed">
                Detailed breakdowns on every tax invoice: gross weight, net weight, daily bullion market rate, making charge, and statutory GST.
              </p>
            </div>

            <div className="bg-[#380c18] p-6 rounded-sm border border-[#D4AF37]/30">
              <HeartHandshake className="text-[#D4AF37] mb-3" size={28} />
              <h3 className="font-serif font-bold text-base text-[#FBF8F1] mb-1">100% Lifetime Exchange Value</h3>
              <p className="text-xs text-[#FBF8F1]/80 leading-relaxed">
                Enjoy transparent valuation and lifetime upgrade privileges across all Devkrupa gold and diamond jewellery collections.
              </p>
            </div>

            <div className="bg-[#380c18] p-6 rounded-sm border border-[#D4AF37]/30">
              <Coins className="text-[#D4AF37] mb-3" size={28} />
              <h3 className="font-serif font-bold text-base text-[#FBF8F1] mb-1">Computerized Karat Testing</h3>
              <p className="text-xs text-[#FBF8F1]/80 leading-relaxed">
                Exchange your old gold jewellery with non-destructive, precision XRF gold karat testing performed in front of you.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 11: FREQUENTLY ASKED QUESTIONS (FAQ)
          ========================================================================= */}
      <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-[#4A1020] text-xs font-bold uppercase tracking-widest block mb-2">
            Clear &amp; Transparent Answers
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#4A1020]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#242124]/75 mt-1">
            Everything you need to know about purchasing jewellery during our Diwali 2026 campaign.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white border border-[#D4AF37]/30 rounded-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="w-full text-left p-4 sm:p-5 flex justify-between items-center gap-4 hover:bg-[#FBF8F1] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-bold text-sm sm:text-base text-[#4A1020]">
                    {faq.question}
                  </span>
                  <span className="text-[#D4AF37] flex-shrink-0">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-[#242124]/85 leading-relaxed border-t border-[#D4AF37]/15 bg-[#FBF8F1]/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>


      {/* =========================================================================
          SECTION 12: CONTACT AND STORE INFORMATION
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-t border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[#4A1020] text-xs font-bold uppercase tracking-widest block mb-1">
                  Visit Our Showroom
                </span>
                <h2 className="text-3xl font-serif font-bold text-[#4A1020]">
                  Devkrupa Jewellers – Saraspur Showroom
                </h2>
                <p className="text-sm text-[#242124]/80 mt-2">
                  Experience our Diwali 2026 collections in person. Our jewellery specialists are at your service for personal trials and custom bookings.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href={store.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-4 bg-[#FBF8F1] border border-[#D4AF37]/30 rounded-sm hover:border-[#D4AF37] transition-all group"
                >
                  <div className="p-2.5 bg-[#4A1020] text-[#D4AF37] rounded-sm group-hover:bg-[#D4AF37] group-hover:text-[#4A1020] transition-colors">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#4A1020] group-hover:text-[#D4AF37] transition-colors">
                      Showroom Address
                    </h4>
                    <p className="text-xs text-[#242124]/80 leading-relaxed mt-0.5">
                      {store.address}
                    </p>
                    <span className="text-[11px] text-[#4A1020] font-semibold flex items-center gap-1 mt-1">
                      <span>View on Google Maps</span>
                      <ExternalLink size={11} />
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${store.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-start gap-3.5 p-4 bg-[#FBF8F1] border border-[#D4AF37]/30 rounded-sm hover:border-[#D4AF37] transition-all group"
                >
                  <div className="p-2.5 bg-[#4A1020] text-[#D4AF37] rounded-sm group-hover:bg-[#D4AF37] group-hover:text-[#4A1020] transition-colors">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#4A1020] group-hover:text-[#D4AF37] transition-colors">
                      Showroom Helpline
                    </h4>
                    <p className="text-xs text-[#242124]/80 leading-relaxed mt-0.5">
                      {store.phone} (Direct consultation &amp; reservations)
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 p-4 bg-[#FBF8F1] border border-[#D4AF37]/30 rounded-sm">
                  <div className="p-2.5 bg-[#4A1020] text-[#D4AF37] rounded-sm">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#4A1020]">
                      Festive Opening Hours
                    </h4>
                    <p className="text-xs text-[#242124]/80 leading-relaxed mt-0.5">
                      Monday to Saturday: {store.hours.monSat}<br />
                      Sunday: {store.hours.sunday}
                    </p>
                    <span className="text-[11px] text-[#4A1020] font-bold block mt-1">
                      {store.hours.dhanterasExtended}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Consultation Widget */}
            <div className="lg:col-span-6 bg-[#4A1020] text-[#FBF8F1] p-6 sm:p-8 rounded-sm border border-[#D4AF37]/50 shadow-lg">
              <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest block mb-2">
                Instant Festive Assistance
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#FBF8F1] mb-2">
                Plan Your Dhanteras &amp; Diwali Visit
              </h3>
              <p className="text-xs sm:text-sm text-[#FBF8F1]/85 mb-6 leading-relaxed">
                Avoid the festive rush! Pre-book your 24K gold coins or reserve an exclusive showroom consultation session with our senior jewellery curators.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-xs text-[#FBF8F1]/90">
                  <CheckCircle2 size={15} className="text-[#D4AF37]" />
                  <span>Lock in your design ahead of Pushya Nakshatra and Dhanteras</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#FBF8F1]/90">
                  <CheckCircle2 size={15} className="text-[#D4AF37]" />
                  <span>Personalized video consultation available upon request</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#FBF8F1]/90">
                  <CheckCircle2 size={15} className="text-[#D4AF37]" />
                  <span>Direct WhatsApp inquiry with store owner and master gemologist</span>
                </div>
              </div>

              <a
                href={heroWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#128C7E] hover:bg-[#0c6b61] text-white font-bold text-sm uppercase tracking-wider rounded-sm transition-all shadow-md"
              >
                <MessageCircle size={18} />
                <span>Chat on WhatsApp (+91 96387 48423)</span>
              </a>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 13: STATUTORY DISCLAIMERS & FOOTER NOTES
          ========================================================================= */}
      <footer className="py-10 bg-[#380c18] text-[#FBF8F1]/75 border-t border-[#D4AF37]/40 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-4">
            <span className="font-serif font-bold text-base text-[#D4AF37]">
              DEVKRUPA JEWELLERS • DIWALI 2026 CAMPAIGN
            </span>
            <span className="text-[11px] text-[#FBF8F1]/70">
              Valid: {formatFestiveDate(startDate)} to {formatFestiveDate(endDate)}
            </span>
          </div>

          <div>
            <h5 className="font-bold text-[#D4AF37] uppercase text-[11px] tracking-wider mb-2">
              Statutory Terms &amp; Conditions:
            </h5>
            <ul className="list-disc pl-5 space-y-1 text-[11px] text-[#FBF8F1]/70 leading-relaxed">
              {generalDisclaimers.map((disclaimer, idx) => (
                <li key={idx}>{disclaimer}</li>
              ))}
            </ul>
          </div>

          <p className="text-[10px] text-[#FBF8F1]/50 text-center pt-4 border-t border-white/10">
            © 2026 Devkrupa Jewellers (Since 1916). All rights reserved. Ahmedabad, Gujarat, India.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default DiwaliLandingPage;

