import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { fallbackProducts } from '../firebase/productsData';

const Products = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const categories = ['All', 'Rings', 'Bridal Collection', 'Diamond Necklaces', 'Earrings', 'Bangles', 'Mangalsutra'];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) {
      setActiveCategory(cat);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        if (productList.length > 0) {
          setProducts(productList);
        } else {
          throw new Error("No products in DB, using fallback");
        }
      } catch (error) {
        console.log("Firebase not configured or empty, using dummy data");
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Back Button */}
        <div className="mb-6 flex justify-start">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 px-4 py-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent text-sm text-primary hover:text-accent transition-all focus:outline-none font-medium shadow-md"
          >
            <ArrowLeft size={16} className="text-accent" />
            <span>Back</span>
          </button>
        </div>


        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-primary">{t('ourCollection')}</h1>
          <p className="text-[var(--color-text-secondary)] opacity-90 max-w-2xl mx-auto">
            {t('collectionDesc')}
          </p>
        </div>
 
        {/* Horizontal Category Filters */}
        <div className="mb-12 flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-2.5 max-w-5xl px-4">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border backdrop-blur-md ${
                  activeCategory === cat 
                  ? 'bg-accent border-accent text-dominant shadow-lg shadow-accent/20 scale-105' 
                  : 'bg-white/5 border-white/10 text-primary hover:text-accent hover:bg-white/10'
                }`}
              >
                {t(`cat${cat.replace(/\s+/g, '')}`)}
              </button>
            ))}
          </div>
        </div>
 
        {/* Product Grid */}
        <div className="w-full">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-accent" size={48} />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-muted bg-secondary/10 rounded border border-white/5">
              No products found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className="group glass-effect rounded-lg overflow-hidden border border-white/5 hover:border-accent/50 transition-all duration-300 flex flex-col h-full">
                  <div className="relative aspect-[4/5] bg-secondary/30 overflow-hidden flex items-center justify-center p-4">
                    <img 
                      src={product.imageUrl || product.image} 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover blur-xl opacity-15 pointer-events-none scale-105"
                    />
                    <img 
                      src={product.imageUrl || product.image} 
                      alt={product.name} 
                      className="max-w-full max-h-full object-contain relative z-10 rounded transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-dominant/80 backdrop-blur px-3 py-1 text-xs font-semibold rounded-full border border-white/10 text-primary z-20">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <h3 className="text-lg font-serif font-semibold mb-2 text-primary group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex justify-end items-center mt-auto pt-4 border-t border-white/5">
                      <span className="text-xs text-muted border border-white/10 rounded px-2 py-0.5 bg-white/5">22K Gold</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
