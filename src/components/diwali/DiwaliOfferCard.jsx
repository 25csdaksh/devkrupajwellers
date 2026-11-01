import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight, ShieldCheck, ChevronDown, ChevronUp, Sparkles, Calendar } from 'lucide-react';
import { buildWhatsAppUrl, formatFestiveDate } from '../../utils/campaignAutomation';

const DiwaliOfferCard = ({ offer, campaignEndDate, whatsappNumber }) => {
  const [showTerms, setShowTerms] = useState(false);

  const whatsappUrl = buildWhatsAppUrl(
    whatsappNumber || '919638748423',
    offer.whatsappInquiry || `Hello Devkrupa Jewellers, I am interested in your Diwali 2026 ${offer.title}. Please provide more details.`
  );

  return (
    <article className="bg-[#FBF8F1] border border-[#D4AF37]/30 rounded-sm shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden group">
      {/* Visual Header */}
      <div className="relative aspect-[4/3] w-full bg-[#140526] overflow-hidden">
        <img
          src={offer.image}
          alt={offer.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4A1020]/80 via-transparent to-black/30 pointer-events-none" />

        {/* Category & Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="bg-[#4A1020] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-semibold px-2.5 py-1 uppercase tracking-wider rounded-sm shadow">
            {offer.category}
          </span>
          {offer.badge && (
            <span className="bg-[#D4AF37] text-[#4A1020] text-xs font-bold px-2.5 py-1 tracking-wider uppercase rounded-sm shadow flex items-center gap-1">
              <Sparkles size={12} />
              {offer.badge}
            </span>
          )}
        </div>

        {/* Discount Tag highlight */}
        {offer.discountHighlight && (
          <div className="absolute bottom-3 right-3 bg-[#4A1020] text-[#D4AF37] border border-[#D4AF37] text-xs font-bold px-3 py-1 rounded-sm shadow-md tracking-wider">
            {offer.discountHighlight}
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-6 flex flex-col flex-grow text-[#242124]">
        <h3 className="font-serif text-xl font-bold text-[#4A1020] mb-2 leading-snug">
          {offer.title}
        </h3>

        <p className="text-sm text-[#242124]/80 leading-relaxed mb-4 flex-grow">
          {offer.description}
        </p>

        {/* Offer Benefit Highlight Box */}
        {offer.discountValue && (
          <div className="bg-[#4A1020]/5 border-l-4 border-[#D4AF37] p-3 mb-4 rounded-r-sm">
            <span className="text-xs uppercase font-bold text-[#4A1020] tracking-wider block">
              Festive Privilege:
            </span>
            <span className="text-sm font-semibold text-[#4A1020]">
              {offer.discountValue}
            </span>
          </div>
        )}

        {/* Validity */}
        <div className="flex items-center gap-2 text-xs text-[#242124]/70 mb-4 pb-4 border-b border-[#D4AF37]/20">
          <Calendar size={14} className="text-[#4A1020]" />
          <span>Valid through: <strong className="text-[#4A1020]">{formatFestiveDate(campaignEndDate)}</strong></span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <Link
            to={offer.targetRoute || '/products'}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#4A1020] hover:bg-[#380c18] text-[#FBF8F1] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
          >
            <span>View Catalog</span>
            <ArrowRight size={14} className="text-[#D4AF37]" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors shadow-sm"
          >
            <MessageCircle size={15} />
            <span>Inquire Offer</span>
          </a>
        </div>

        {/* Terms & Conditions Accordion */}
        {offer.terms && offer.terms.length > 0 && (
          <div className="mt-2 pt-2 border-t border-[#D4AF37]/15">
            <button
              type="button"
              onClick={() => setShowTerms(!showTerms)}
              className="w-full flex items-center justify-between text-left text-xs font-medium text-[#4A1020] hover:text-[#D4AF37] transition-colors py-1"
              aria-expanded={showTerms}
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#D4AF37]" />
                <span>Terms & Conditions</span>
              </span>
              {showTerms ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {showTerms && (
              <ul className="mt-2 space-y-1.5 text-[11px] text-[#242124]/75 pl-4 list-disc bg-white/70 p-3 rounded-sm border border-[#D4AF37]/20">
                {offer.terms.map((term, index) => (
                  <li key={index} className="leading-relaxed">
                    {term}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default DiwaliOfferCard;

