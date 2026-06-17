import { Link } from 'react-router-dom';
import { Menu, X, Search, Globe, ChevronDown, User, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user } = useAuth();
  const { getCartCount } = useCart();
  
  const cartCount = getCartCount();

  return (
    <nav className="fixed w-full z-50 glass-effect border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-serif font-bold gold-gradient tracking-wider">
              DEVKRUPA
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-primary hover:text-accent transition-colors font-medium text-sm">{t('home')}</Link>
            <Link to="/products" className="text-primary hover:text-accent transition-colors font-medium text-sm">{t('collection')}</Link>
            <Link to="/silver" className="text-primary hover:text-accent transition-colors font-medium text-sm">{t('silverCollection')}</Link>
            <Link to="/customize" className="text-primary hover:text-accent transition-colors font-medium text-sm">{t('customize')}</Link>
            <Link to="/contact" className="text-primary hover:text-accent transition-colors font-medium text-sm">{t('contact')}</Link>
            
            <div className="flex items-center space-x-4 border-l border-white/20 pl-4">
              <button className="text-primary hover:text-accent transition-colors p-1.5" title="Search">
                <Search size={18} />
              </button>

              <Link to="/cart" className="text-primary hover:text-accent transition-colors p-1.5 relative" title="View Cart">
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1.5 -translate-y-1 bg-accent text-dominant text-[9px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center border border-dominant shadow-md animate-[bounce_1.5s_infinite]">
                    {cartCount}
                  </span>
                )}
              </Link>


              <div className="relative group">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-accent/40 text-primary hover:text-accent transition-all text-xs font-semibold uppercase tracking-wider shadow-inner">
                  <Globe size={14} className="text-accent animate-pulse" />
                  <span>{language === 'en' ? 'EN' : language === 'hi' ? 'HI' : 'GU'}</span>
                  <ChevronDown size={12} className="text-muted group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute right-0 mt-3 w-40 bg-dominant/95 backdrop-blur-md border border-accent/20 rounded shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-1.5 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-50">
                  <button 
                    onClick={() => setLanguage('en')} 
                    className={`flex items-center w-full text-left px-4 py-2 text-xs font-medium tracking-wide transition-colors hover:bg-accent/10 hover:text-accent hover:text-white ${language === 'en' ? 'text-accent bg-white/5 border-l-2 border-accent' : 'text-primary border-l-2 border-transparent'}`}
                  >
                    English
                  </button>
                  <button 
                    onClick={() => setLanguage('hi')} 
                    className={`flex items-center w-full text-left px-4 py-2 text-xs font-medium tracking-wide transition-colors hover:bg-accent/10 hover:text-accent hover:text-white ${language === 'hi' ? 'text-accent bg-white/5 border-l-2 border-accent' : 'text-primary border-l-2 border-transparent'}`}
                  >
                    हिन्दी
                  </button>
                  <button 
                    onClick={() => setLanguage('gu')} 
                    className={`flex items-center w-full text-left px-4 py-2 text-xs font-medium tracking-wide transition-colors hover:bg-accent/10 hover:text-accent hover:text-white ${language === 'gu' ? 'text-accent bg-white/5 border-l-2 border-accent' : 'text-primary border-l-2 border-transparent'}`}
                  >
                    ગુજરાતી
                  </button>
                </div>
              </div>

              {user ? (
                <Link 
                  to="/profile" 
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 hover:border-accent text-accent transition-all text-xs font-semibold uppercase tracking-wider shadow"
                >
                  <User size={14} />
                  <span>{user.displayName?.split(' ')[0] || t('profile')}</span>
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-accent/40 text-primary hover:text-accent transition-all text-xs font-semibold uppercase tracking-wider"
                >
                  <User size={14} />
                  <span>{t('login')}</span>
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary hover:text-accent"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-secondary border-b border-white/10">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-primary hover:text-accent">{t('home')}</Link>
            <Link to="/products" className="block px-3 py-2 text-base font-medium text-primary hover:text-accent">{t('collection')}</Link>
            <Link to="/silver" className="block px-3 py-2 text-base font-medium text-primary hover:text-accent">{t('silverCollection')}</Link>
            <Link to="/customize" className="block px-3 py-2 text-base font-medium text-primary hover:text-accent">{t('customize')}</Link>
            <Link to="/contact" className="block px-3 py-2 text-base font-medium text-primary hover:text-accent">{t('contact')}</Link>
            
            {user ? (
              <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-accent hover:text-primary">{t('profile')} ({user.displayName?.split(' ')[0] || 'User'})</Link>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-accent hover:text-primary">{t('login')}</Link>
            )}
            
            <Link to="/cart" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-primary hover:text-accent flex items-center gap-2">
              <ShoppingBag size={18} className="text-accent" />
              <span>{t('cart')}</span>
              {cartCount > 0 && (
                <span className="bg-accent text-dominant text-[10px] font-bold rounded-full px-2 py-0.5 ml-1">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <div className="px-3 py-3 border-t border-white/5 mt-2 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-muted uppercase tracking-widest block mb-2 font-semibold">Select Language</span>
                <div className="flex items-center p-0.5 bg-white/5 border border-white/10 rounded-full gap-1">
                  <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-xs font-bold rounded-full transition-all uppercase tracking-wider text-center ${language === 'en' ? 'bg-accent text-dominant shadow' : 'text-muted'}`}>EN</button>
                  <button onClick={() => setLanguage('hi')} className={`px-3 py-1 text-xs font-bold rounded-full transition-all uppercase tracking-wider text-center ${language === 'hi' ? 'bg-accent text-dominant shadow' : 'text-muted'}`}>HI</button>
                  <button onClick={() => setLanguage('gu')} className={`px-3 py-1 text-xs font-bold rounded-full transition-all uppercase tracking-wider text-center ${language === 'gu' ? 'bg-accent text-dominant shadow' : 'text-muted'}`}>GU</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
