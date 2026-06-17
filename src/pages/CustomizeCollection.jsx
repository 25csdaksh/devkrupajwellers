import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Gem, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { customProducts } from '../firebase/customProductsData';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const CustomizeCollection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'custom_products'));
        const productList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        if (productList.length > 0) {
          setProducts(productList);
        } else {
          throw new Error("No custom products in DB, using fallback");
        }
      } catch (error) {
        console.log("Firebase not configured or empty for custom, using fallback data");
        setProducts(customProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomProducts();
  }, []);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Back Button */}
        <div className="mb-6 flex justify-start">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 px-4 py-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent text-sm text-secondary hover:text-primary transition-all focus:outline-none font-medium shadow-md"
          >
            <ArrowLeft size={16} className="text-accent" />
            <span>Back</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-semibold tracking-[0.3em] uppercase text-xs mb-3 block">
            {t('customizeSubtitle')}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3 gold-gradient">{t('customizeCollectionSection')}</h1>
          <div className="gold-divider w-48 mx-auto mb-6">
            <Gem size={14} className="text-accent animate-pulse" />
          </div>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto text-sm leading-relaxed">
            {t('customizeDesc')}
          </p>
        </div>

        {/* Product Grid */}
        <div className="w-full">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-accent" size={48} />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-muted bg-secondary/10 rounded border border-white/5">
              No custom items found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div key={product.id} className="relative group overflow-hidden border border-white/5 hover:border-accent/25 bg-gradient-to-b from-secondary/10 to-dominant/40 p-4 transition-all duration-500 hover:shadow-[0_15px_30px_-15px_rgba(212,175,55,0.15)] flex flex-col h-full rounded-sm">
                  
                  {/* Image Showcase */}
                  <div className="relative overflow-hidden aspect-square mb-4 bg-dominant flex items-center justify-center border border-white/5">
                    <img 
                      src={product.imageUrl} 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover blur-xl opacity-15 pointer-events-none scale-105"
                    />
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="max-w-full max-h-full object-contain relative z-10 rounded transition-transform duration-750 group-hover:scale-[1.03]"
                    />
                    <div className="absolute bottom-4 left-4 right-4 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 z-10">
                      <Link to={`/product/${product.id}`} className="w-full block text-center bg-accent text-dominant py-2.5 font-bold uppercase tracking-wider text-[10px] hover:bg-white hover:text-dominant transition-colors shadow-lg">
                        {t('viewDetails')}
                      </Link>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-grow flex flex-col justify-between pt-1">
                    <div>
                      <span className="text-[9px] text-accent/80 font-bold uppercase tracking-[0.2em] mb-1 block">
                        {product.category}
                      </span>
                      <h3 className="text-base font-serif font-bold text-primary group-hover:text-accent transition-colors duration-300 line-clamp-2">
                        {product.name}
                      </h3>
                    </div>
                    <div className="flex justify-end items-center mt-4 pt-3 border-t border-white/5">
                      <span className="text-[10px] text-muted border border-white/10 rounded px-2 py-0.5 bg-white/5 uppercase tracking-wider">Bespoke Design</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CustomizeCollection;
