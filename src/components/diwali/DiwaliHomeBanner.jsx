import { Link } from 'react-router-dom';
import { Sparkles, MessageCircle, ArrowRight, Calendar, Award } from 'lucide-react';
import { DIWALI_CAMPAIGN_CONFIG } from '../../config/diwaliCampaignConfig';
import { useCampaignCountdown, buildWhatsAppUrl, formatFestiveDate } from '../../utils/campaignAutomation';
import bridalBanner from '../../assets/bridal_collection_banner.jpg';

const DiwaliHomeBanner = () => {
  const { title, subtitle, startDate, endDate, isActive, store } = DIWALI_CAMPAIGN_CONFIG;
  const { status, timeLeft } = useCampaignCountdown(startDate, endDate, isActive);

  // If campaign is expired or deactivated, we can conditionally hide or show celebratory concluded note
  if (status === 'expired') {
    return null;
  }

  const defaultWhatsappMessage = `Hello Devkrupa Jewellers, I saw your Diwali 2026 Festive Campaign on your website. Please share the exclusive Dhanteras & Diwali offers with me.`;
  const whatsappUrl = buildWhatsAppUrl(store.whatsappNumber, defaultWhatsappMessage);

  return (
    <section 
      aria-label="Diwali 2026 Campaign Announcement"
      className="relative my-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-[#4A1020] text-[#FBF8F1] border border-[#D4AF37]/50 rounded-sm shadow-xl overflow-hidden relative">
        {/* Subtle decorative gold corner filigree lines */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#D4AF37]/40 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#D4AF37]/40 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Visual Showcase (5 Cols) */}
          <div className="lg:col-span-5 relative h-72 sm:h-80 lg:h-full min-h-[340px] overflow-hidden bg-black/40">
            <img
              src={bridalBanner}
              alt="Devkrupa Jewellers Diwali 2026 Festive Jewellery Collection"
              loading="lazy"
              className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4A1020] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#4A1020]" />
            
            <div className="absolute top-4 left-4 bg-[#FBF8F1] text-[#4A1020] px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-sm border border-[#D4AF37] flex items-center gap-1.5 shadow">
              <Sparkles size={13} className="text-[#D4AF37]" />
              <span>Diwali Festive Special 2026</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm p-3 rounded-sm border border-[#D4AF37]/30 text-xs">
              <div className="flex items-center gap-2 text-[#D4AF37] font-semibold mb-0.5">
                <Award size={14} />
                <span>110 Years of Hallmark Trust (Since 1916)</span>
              </div>
              <p className="text-[#FBF8F1]/80 text-[11px]">
                Ahmedabad's trusted family jeweller for 4 generations.
              </p>
            </div>
          </div>

          {/* Campaign Details (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            {/* Top Status & Validity Row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-[#D4AF37] text-[#4A1020] text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#4A1020] animate-pulse" />
                {status === 'upcoming' ? 'Campaign Starts Soon' : 'Festive Season Live'}
              </span>

              <div className="flex items-center gap-1.5 text-xs text-[#FBF8F1]/80 bg-black/25 px-3 py-1 rounded-sm border border-white/10">
                <Calendar size={13} className="text-[#D4AF37]" />
                <span>Valid: {formatFestiveDate(startDate)} – {formatFestiveDate(endDate)}</span>
              </div>
            </div>

            {/* Campaign Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#FBF8F1] mb-3 leading-tight tracking-wide">
              {title}
            </h2>

            {/* Promotional Description */}
            <p className="text-sm sm:text-base text-[#FBF8F1]/90 mb-6 font-light leading-relaxed max-w-2xl">
              Celebrate the festival of prosperity with 100% BIS 916 hallmarked gold, sparkling certified diamonds, and 925 sterling silver pooja masterpieces. Enjoy exclusive festive concessions on making charges and complimentary silver tokens this Dhanteras.
            </p>

            {/* Live Campaign Countdown Timer */}
            {!timeLeft.isPast && (
              <div className="mb-6 bg-black/30 border border-[#D4AF37]/30 p-3 sm:p-4 rounded-sm">
                <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] block font-semibold mb-2">
                  {status === 'upcoming' ? 'Campaign Commences In:' : 'Festive Privileges Conclude In:'}
                </span>
                <div className="grid grid-cols-4 gap-2 text-center max-w-xs">
                  <div className="bg-[#4A1020]/90 border border-[#D4AF37]/40 p-2 rounded-sm">
                    <span className="text-lg sm:text-xl font-bold text-[#FBF8F1] block">{timeLeft.days}</span>
                    <span className="text-[10px] text-[#D4AF37] uppercase">Days</span>
                  </div>
                  <div className="bg-[#4A1020]/90 border border-[#D4AF37]/40 p-2 rounded-sm">
                    <span className="text-lg sm:text-xl font-bold text-[#FBF8F1] block">{timeLeft.hours}</span>
                    <span className="text-[10px] text-[#D4AF37] uppercase">Hours</span>
                  </div>
                  <div className="bg-[#4A1020]/90 border border-[#D4AF37]/40 p-2 rounded-sm">
                    <span className="text-lg sm:text-xl font-bold text-[#FBF8F1] block">{timeLeft.minutes}</span>
                    <span className="text-[10px] text-[#D4AF37] uppercase">Mins</span>
                  </div>
                  <div className="bg-[#4A1020]/90 border border-[#D4AF37]/40 p-2 rounded-sm">
                    <span className="text-lg sm:text-xl font-bold text-[#FBF8F1] block">{timeLeft.seconds}</span>
                    <span className="text-[10px] text-[#D4AF37] uppercase">Secs</span>
                  </div>
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/diwali-2026"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D4AF37] hover:bg-[#c49f2e] text-[#4A1020] text-sm font-bold uppercase tracking-wider rounded-sm transition-colors shadow-md"
              >
                <span>Explore Diwali Offers</span>
                <ArrowRight size={16} />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#128C7E] hover:bg-[#0d695e] text-white text-sm font-semibold uppercase tracking-wider rounded-sm transition-colors border border-green-400/30 shadow-md"
              >
                <MessageCircle size={16} />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>

            <p className="text-[11px] text-[#FBF8F1]/60 mt-4 italic">
              *T&amp;C apply. Gold &amp; silver bullion prices subject to daily market rates. Certified BIS Hallmark on every gold ornament.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiwaliHomeBanner;

