import { Facebook, Instagram, Twitter, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-[var(--color-footer-bg)] border-t border-white/10 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-serif font-bold gold-gradient mb-4">DEVKRUPA JEWELLERS</h2>
            <p className="text-secondary max-w-md">
              {t('aboutDesc')}
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-muted hover:text-accent transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-muted hover:text-accent transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-muted hover:text-accent transition-colors"><Twitter size={20} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-semibold text-primary mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted hover:text-accent transition-colors">{t('home')}</Link></li>
              <li><Link to="/products" className="text-muted hover:text-accent transition-colors">{t('ourCollection')}</Link></li>
              <li><Link to="/contact" className="text-muted hover:text-accent transition-colors">{t('contactUs')}</Link></li>
              <li><Link to="/admin" className="text-muted hover:text-accent transition-colors opacity-60 hover:opacity-100">Admin Portal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif font-semibold text-primary mb-4">{t('contactInfo')}</h3>
            <ul className="space-y-2 text-muted">
              <li>
                <a 
                  href="https://www.google.com/maps/place/DEVKRUPA+JEWELLERS/@23.0264246,72.6103282,801m/data=!3m2!1e3!4b1!4m6!3m5!1s0x395e858a97eb4da9:0x25f37a7e37301c0d!8m2!3d23.0264246!4d72.6129031!16s%2Fg%2F11ry4t3jy6?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  near ramdev masala, opp. vikram mill,<br />
                  saraspur, Ahmedabad, Gujarat
                </a>
              </li>
              <li>{t('phone')}: <a href="tel:+919638748423" className="hover:text-accent transition-colors">+91 96387 48423</a></li>
              <li>{t('email')}: info@devkrupajewellers.com</li>
              <li className="pt-3">
                <a 
                  href="https://www.google.com/maps/place/DEVKRUPA+JEWELLERS/@23.0264246,72.6103282,801m/data=!3m2!1e3!4b1!4m6!3m5!1s0x395e858a97eb4da9:0x25f37a7e37301c0d!8m2!3d23.0264246!4d72.6129031!16s%2Fg%2F11ry4t3jy6?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-yellow-500 text-dominant px-4 py-2.5 rounded font-semibold text-xs transition-all shadow-md focus:outline-none uppercase tracking-wider"
                >
                  <MapPin size={14} />
                  <span>{t('viewLocation')}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-muted text-sm">
          <p>&copy; {new Date().getFullYear()} Devkrupa Jewellers. {t('rightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
