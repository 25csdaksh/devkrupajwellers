import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Gem, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { fallbackProducts } from '../firebase/productsData';

import heroImage from '../assets/hero_necklace_v2.jpg';
import ringImage from '../assets/ring_product.png';
import bridalBannerImage from '../assets/bridal_collection_banner.jpg';
import slide1 from '../assets/slide_1.jpg';
import slide2 from '../assets/slide_2.jpg';
import slide3 from '../assets/slide_3.jpg';
import slide4 from '../assets/slide_4.jpg';
import slide5 from '../assets/slide_5.jpg';
import specialityImage from '../assets/our_speciality.jpg';
import customizeNecklace from '../assets/customize_necklace.png';
import customizeVideo from '../assets/customize_video.mp4';

const Home = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const showcaseSlides = [
    {
      image: slide1,
      title: t('slide1Title'),
      subtitle: t('slide1Subtitle')
    },
    {
      image: slide2,
      title: t('slide2Title'),
      subtitle: t('slide2Subtitle')
    },
    {
      image: slide3,
      title: t('slide3Title'),
      subtitle: t('slide3Subtitle')
    },
    {
      image: slide4,
      title: t('slide4Title'),
      subtitle: t('slide4Subtitle')
    },
    {
      image: slide5,
      title: t('slide5Title'),
      subtitle: t('slide5Subtitle')
    }
  ];

  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Gem,
      title: t('premiumQuality') || 'Premium Quality',
      desc: t('qualityDesc') || 'Certified diamonds and highest purity gold crafted to perfection.'
    },
    {
      icon: Shield,
      title: t('secureShopping') || 'Secure Shopping',
      desc: t('secureDesc') || '100% secure transactions with insured worldwide shipping.'
    },
    {
      icon: Star,
      title: t('expertCraftsmanship') || 'Expert Craftsmanship',
      desc: t('expertDesc') || 'Decades of experience in creating timeless jewelry masterpieces.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % showcaseSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % showcaseSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + showcaseSlides.length) % showcaseSlides.length);
  };

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const q = query(collection(db, 'products'), limit(4));
        const querySnapshot = await getDocs(q);
        const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (list.length > 0) {
          setTrendingProducts(list);
        } else {
          setTrendingProducts(fallbackProducts.slice(0, 4));
        }
      } catch (e) {
        console.log("Using fallback products for trending section");
        setTrendingProducts(fallbackProducts.slice(0, 4));
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div className="w-full bg-dominant text-secondary transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden">
        {/* Lattice overlay pattern for subtle texture */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-10" 
             style={{ 
               backgroundImage: `radial-gradient(#D4AF37 1px, transparent 1px)`, 
               backgroundSize: '24px 24px' 
             }}>
        </div>
        
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-dominant via-dominant/85 to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-dominant to-transparent z-10"></div>
          <img 
            src={heroImage} 
            alt="Luxury Diamond Necklace" 
            className="w-full h-full object-cover object-bottom md:object-bottom scale-105 animate-[subtle-zoom_20s_infinite_alternate] pointer-events-none"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-2xl">
            <span className="text-accent font-semibold tracking-[0.4em] uppercase text-xs mb-4 block animate-[fadeInDown_1s_ease-out]">
              {t('welcome Message') || 'SINCE 1916 • COUTURE JEWELRY'}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 leading-[1.1] text-primary tracking-wide">
              {t('heroTitleLine1')} <br/>
              <span className="gold-gradient">{t('heroTitleLine2')}</span>
            </h1>
            <div className="w-24 h-[1px] bg-accent/60 mb-8"></div>
            <p className="text-lg text-[var(--color-text-secondary)] mb-10 max-w-lg leading-relaxed font-sans">
              {t('heroDesc')}
            </p>
            <div className="flex flex-wrap gap-5">
              <Link to="/products" className="relative group overflow-hidden bg-accent text-dominant px-8 py-4 rounded-sm font-semibold hover:text-white transition-colors duration-500 flex items-center gap-2 shadow-lg shadow-accent/10 hover:shadow-accent/20">
                <span className="absolute inset-0 w-full h-full bg-dominant transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></span>
                <span className="relative z-10 flex items-center gap-2 uppercase tracking-wider text-xs">
                  {t('exploreCollection')} <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
              <Link to="/contact" className="relative group overflow-hidden border border-accent/60 text-accent px-8 py-4 rounded-sm font-semibold hover:text-dominant transition-colors duration-500 flex items-center justify-center shadow-md">
                <span className="absolute inset-0 w-full h-full bg-accent transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></span>
                <span className="relative z-10 uppercase tracking-wider text-xs">{t('bookConsultation')}</span>
              </Link>
              {user ? (
                <Link to="/profile" className="relative group overflow-hidden border border-white/20 text-white px-8 py-4 rounded-sm font-semibold hover:text-dominant transition-colors duration-500 flex items-center justify-center shadow-md">
                  <span className="absolute inset-0 w-full h-full bg-accent transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></span>
                  <span className="relative z-10 uppercase tracking-wider text-xs">{t('profile')}</span>
                </Link>
              ) : (
                <Link to="/login" className="relative group overflow-hidden border border-white/20 text-white px-8 py-4 rounded-sm font-semibold hover:text-dominant transition-colors duration-500 flex items-center justify-center shadow-md">
                  <span className="absolute inset-0 w-full h-full bg-accent transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></span>
                  <span className="relative z-10 uppercase tracking-wider text-xs">{t('login')} / {t('signup')}</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2.5 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.4em] text-accent/60 font-bold">{t('scrollExplore') || 'Scroll to Explore'}</span>
          <div className="w-[1.5px] h-12 bg-gradient-to-b from-accent/50 via-accent/20 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-4 bg-accent animate-[bounce_2s_infinite]"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 spotlight-bg border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Desktop Grid Layout */}
          <div className="hidden md:grid grid-cols-3 gap-10">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center p-8 bg-gradient-to-b from-secondary/25 to-dominant/50 border border-accent/15 hover:border-accent/35 rounded-sm hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_15px_30px_-15px_rgba(212,175,55,0.15)] group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  <div className="relative mb-6 p-4 rounded-full bg-secondary/50 border border-accent/10 group-hover:border-accent/30 transition-colors duration-500">
                    <IconComponent className="text-accent w-7 h-7 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-primary tracking-wide mb-3 group-hover:text-accent transition-colors duration-300">{feature.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] opacity-90 leading-relaxed max-w-xs">{feature.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Mobile Carousel Layout */}
          <div className="md:hidden flex flex-col items-center">
            <div className="relative w-full overflow-hidden min-h-[260px] flex items-center justify-center">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                const isActive = index === activeFeature;
                return (
                  <div 
                    key={index} 
                    className={`absolute inset-x-0 w-full transition-all duration-500 ease-in-out flex flex-col items-center text-center p-8 bg-gradient-to-b from-secondary/25 to-dominant/50 border border-accent/15 rounded-sm ${
                      isActive 
                        ? 'opacity-100 translate-x-0 scale-100 z-10' 
                        : index < activeFeature 
                          ? 'opacity-0 -translate-x-full scale-95 z-0' 
                          : 'opacity-0 translate-x-full scale-95 z-0'
                    }`}
                  >
                    <div className="relative mb-6 p-4 rounded-full bg-secondary/50 border border-accent/10">
                      <IconComponent className="text-accent w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-primary tracking-wide mb-3">{feature.title}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] opacity-90 leading-relaxed max-w-xs mx-auto">{feature.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Carousel Navigation Dots */}
            <div className="flex gap-3 mt-6">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`diamond-dot ${index === activeFeature ? 'active' : ''}`}
                  aria-label={`Go to feature ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <div className="royal-frame">
                <div className="royal-frame-inner aspect-square md:aspect-[4/3] lg:aspect-square">
                  <img 
                    src={heroImage} 
                    alt="Our Legacy" 
                    className="w-full h-full object-cover opacity-80 transition-transform duration-700 hover:scale-105 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dominant via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <div className="bg-dominant/90 backdrop-blur px-6 py-4 rounded-sm border border-accent/25 inline-block shadow-xl">
                      <h3 className="text-4xl font-serif font-bold text-accent mb-0.5">110+</h3>
                      <p className="text-secondary font-medium tracking-widest uppercase text-[10px]">{t('yearsTrust') || 'Years of Trust'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 lg:pl-6">
              <span className="text-accent font-semibold tracking-[0.3em] uppercase text-xs mb-3 block">
                {t('ourHeritage') || 'OUR LEGACY'}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-3 leading-tight text-primary tracking-wide">
                {t('legacyTitle')}
              </h2>
              <div className="gold-divider w-32 mb-8">
                <Gem size={12} className="text-accent animate-pulse" />
              </div>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed mb-8">
                {t('legacyDesc')}
              </p>
              <Link to="/products" className="inline-flex items-center gap-2 text-accent font-semibold hover:text-primary transition-colors group">
                <span className="border-b border-accent/60 group-hover:border-primary pb-1 uppercase tracking-wider text-xs transition-colors">{t('exploreCollection')}</span>
                <ArrowRight size={18} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Speciality Section */}
      <section className="py-24 border-t border-white/5 bg-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            
            {/* Image Showcase */}
            <div className="w-full lg:w-1/2">
              <div className="royal-frame">
                <div className="royal-frame-inner aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center p-6 bg-dominant">
                  <img 
                    src={specialityImage} 
                    alt={t('specialityTitle')} 
                    className="absolute inset-0 w-full h-full object-cover opacity-15 blur-xl pointer-events-none scale-105"
                  />
                  <img 
                    src={specialityImage} 
                    alt={t('specialityTitle')} 
                    className="max-w-full max-h-full object-contain relative z-10 rounded-sm shadow-2xl transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Description Text */}
            <div className="w-full lg:w-1/2 lg:pr-6">
              <span className="text-accent font-semibold tracking-[0.3em] uppercase text-xs mb-3 block">
                {t('ourSpeciality')}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-3 leading-tight text-primary tracking-wide">
                {t('specialityTitle')}
              </h2>
              <div className="gold-divider w-32 mb-8">
                <Gem size={12} className="text-accent animate-pulse" />
              </div>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed mb-8">
                {t('specialityDesc')}
              </p>
              <Link to="/products?category=Bridal Collection" className="inline-flex items-center gap-2 text-accent font-semibold hover:text-primary transition-colors group">
                <span className="border-b border-accent/60 group-hover:border-primary pb-1 uppercase tracking-wider text-xs transition-colors">{t('exploreCollection')}</span>
                <ArrowRight size={18} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>
            
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-semibold tracking-[0.3em] uppercase text-xs mb-3 block">
              {t('exclusiveCatalog') || 'EXCLUSIVE SELECTIONS'}
            </span>
            <h2 className="text-4xl font-serif font-bold mb-3 text-primary tracking-wide">{t('trendingCollection')}</h2>
            <div className="gold-divider w-48 mx-auto">
              <Gem size={14} className="text-accent animate-pulse" />
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="animate-spin text-accent" size={40} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {trendingProducts.map((product) => (
                <div key={product.id} className="relative group overflow-hidden border border-white/5 hover:border-accent/25 bg-gradient-to-b from-secondary/10 to-dominant/40 p-4 transition-all duration-500 hover:shadow-[0_15px_30px_-15px_rgba(212,175,55,0.15)] flex flex-col h-full rounded-sm">
                  {/* Subtle ambient spotlight behind image */}
                  <div className="relative overflow-hidden aspect-square mb-4 bg-dominant flex items-center justify-center border border-white/5">
                    <img 
                      src={product.imageUrl || product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dominant/40 opacity-70 group-hover:opacity-20 transition-opacity"></div>
                    <div className="absolute bottom-4 left-4 right-4 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 z-10">
                      <Link to={`/product/${product.id}`} className="w-full block text-center bg-accent text-dominant py-2.5 font-bold uppercase tracking-wider text-[10px] hover:bg-white hover:text-dominant transition-colors shadow-lg">
                        {t('viewDetails')}
                      </Link>
                    </div>
                  </div>
                  <div className="flex-grow flex flex-col justify-between pt-1">
                    <div>
                      <span className="text-[9px] text-accent/80 font-bold uppercase tracking-[0.2em] mb-1 block">
                        {product.category || 'FINE JEWELRY'}
                      </span>
                      <h3 className="text-base font-serif font-bold text-primary group-hover:text-accent transition-colors duration-300 line-clamp-2">{product.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-16 text-center">
            <Link to="/products" className="inline-flex items-center gap-2 border-b border-accent/60 text-accent font-semibold pb-1 hover:text-primary hover:border-primary transition-all duration-300 uppercase tracking-wider text-xs">
              {t('viewAllJewelry')} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Showcase Slideshow Section */}
      <section className="py-24 border-y border-white/5 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-semibold tracking-[0.3em] uppercase text-xs mb-3 block">
              {t('visualGallery') || 'THE EDITORIAL GALLERY'}
            </span>
            <h2 className="text-4xl font-serif font-bold mb-3 text-primary tracking-wide">{t('ourShowcase')}</h2>
            <div className="gold-divider w-48 mx-auto mb-5">
              <Gem size={14} className="text-accent animate-pulse" />
            </div>
            <p className="text-[var(--color-text-secondary)] opacity-90 max-w-2xl mx-auto leading-relaxed text-sm font-sans">
              {t('showcaseDesc')}
            </p>
          </div>

          <div className="royal-frame">
            <div className="royal-frame-inner relative showcase-container-height w-full bg-dominant shadow-2xl group">
              {showcaseSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  {/* Blurred Backdrop - optimized blur filter on mobile */}
                  <img
                    src={slide.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-md md:blur-2xl opacity-15 scale-105 pointer-events-none"
                  />
                  
                  {/* Centered Main Image inside a subtle glassmorphic backdrop */}
                  <div className="absolute inset-0 flex items-center justify-center p-4 pb-44 md:p-12 md:pb-12 spotlight-bg">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="h-1/2 md:h-3/4 w-auto object-contain rounded-sm shadow-2xl border border-white/5"
                    />
                  </div>
                  
                  {/* Content Overlay - Glassmorphic Card with thin gold highlight */}
                  <div className="absolute bottom-4 left-4 right-4 md:left-12 md:bottom-12 md:max-w-md z-20 p-4 md:p-6 rounded-sm bg-dominant/85 border border-accent/20 backdrop-blur-md shadow-xl">
                    <span className="text-accent font-semibold tracking-widest uppercase text-[10px] mb-1.5 block">
                      {slide.subtitle}
                    </span>
                    <h3 className="text-base md:text-xl font-serif font-bold text-primary mb-2 md:mb-3 tracking-wide">
                      {slide.title}
                    </h3>
                    <Link
                      to="/products"
                      className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors text-xs font-semibold group"
                    >
                      <span className="uppercase tracking-wider">{t('exploreCollection')}</span>
                      <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}

              {/* Left/Right Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 md:w-11 md:h-11 rounded-full bg-dominant/70 hover:bg-accent hover:text-dominant border border-white/10 hover:border-accent text-primary flex items-center justify-center transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 shadow-lg"
              >
                <span className="text-sm">❮</span>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 md:w-11 md:h-11 rounded-full bg-dominant/70 hover:bg-accent hover:text-dominant border border-white/10 hover:border-accent text-primary flex items-center justify-center transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 shadow-lg"
              >
                <span className="text-sm">❯</span>
              </button>

              {/* Pagination Dots using custom Diamond styling */}
              <div className="absolute bottom-[180px] md:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {showcaseSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`diamond-dot ${index === currentSlide ? 'active' : ''}`}
                    aria-label={`Go to slide ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customize Collection Section */}
      <section className="py-24 border-t border-white/5 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Image Showcase - Diamond Necklace */}
            <div className="w-full lg:w-1/2">
              <div className="royal-frame">
                <div className="royal-frame-inner aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center p-6 bg-dominant">
                  <img 
                    src={customizeNecklace} 
                    alt={t('customizeCollectionSection')} 
                    className="absolute inset-0 w-full h-full object-cover opacity-15 blur-xl pointer-events-none scale-105"
                  />
                  <video 
                    src={customizeVideo}
                    poster={customizeNecklace}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="max-w-full max-h-full object-contain relative z-10 rounded-sm shadow-2xl transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Description Text */}
            <div className="w-full lg:w-1/2 lg:pl-6 flex flex-col">
              <span className="text-accent font-semibold tracking-[0.3em] uppercase text-xs mb-3 block">
                {t('customizeSubtitle')}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-3 leading-tight text-primary tracking-wide">
                {t('customizeCollectionSection')}
              </h2>
              <div className="gold-divider w-32 mb-8">
                <Gem size={12} className="text-accent animate-pulse" />
              </div>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed mb-8 font-sans">
                {t('customizeDesc')}
              </p>
              <Link to="/customize" className="relative group overflow-hidden bg-accent text-dominant px-8 py-4 rounded-sm font-semibold hover:text-white transition-colors duration-500 flex items-center gap-2 shadow-lg shadow-accent/10 hover:shadow-accent/25 self-start">
                <span className="absolute inset-0 w-full h-full bg-dominant transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></span>
                <span className="relative z-10 flex items-center gap-2 uppercase tracking-wider text-xs">
                  {t('exploreCollection')} <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
            
          </div>
        </div>
      </section>

      {/* Categories Banner */}
      <section className="relative py-36 bg-secondary/30 overflow-hidden border-t border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <img src={bridalBannerImage} alt="Bridal Collection Background" className="w-full h-full object-cover mix-blend-overlay scale-105" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex justify-start">
          <div className="max-w-2xl p-8 md:p-12 bg-dominant/90 backdrop-blur-md border border-accent/20 relative rounded-sm shadow-2xl">
            {/* Small subtle corner accents for framed look */}
            <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-accent/40"></div>
            <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-accent/40"></div>
            
            <span className="text-accent font-semibold tracking-[0.2em] uppercase text-xs mb-2 block">
              {t('bridalCollectionSubtitle') || 'THE BRIDAL SHADI COLLECTION'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-primary tracking-wide">{t('bridalCollection')}</h2>
            <p className="text-[var(--color-text-secondary)] mb-8 text-sm leading-relaxed font-sans">
              {t('bridalDesc')}
            </p>
            <Link to="/products?category=Bridal Collection" className="relative group overflow-hidden bg-white text-[#020B08] px-8 py-4 rounded-sm font-semibold hover:text-white transition-colors duration-500 inline-block shadow-lg">
              <span className="absolute inset-0 w-full h-full bg-accent transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></span>
              <span className="relative z-10 uppercase tracking-wider text-xs">{t('exploreBridal')}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
