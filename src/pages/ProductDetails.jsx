import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MessageCircle, Shield, Truck, RefreshCw, Star, Loader2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { fallbackProducts } from '../firebase/productsData';
import { silverProducts } from '../firebase/silverProductsData';
import { customProducts } from '../firebase/customProductsData';

const ProductDetails = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Try gold/diamond products first
        let docRef = doc(db, 'products', id);
        let docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
          setLoading(false);
          return;
        }

        // Try silver products next
        docRef = doc(db, 'silver_products', id);
        docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
          setLoading(false);
          return;
        }

        // Try custom products next
        docRef = doc(db, 'custom_products', id);
        docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
          setLoading(false);
          return;
        }

        // If not found in firestore, check fallback lists
        const combinedFallbacks = [...fallbackProducts, ...silverProducts, ...customProducts];
        const fallback = combinedFallbacks.find(p => p.id === id || String(p.id) === String(id));
        if (fallback) {
          setProduct(fallback);
        } else {
          // Check numeric ID fallback for compatibility
          const index = parseInt(id) - 1;
          if (index >= 0 && index < fallbackProducts.length) {
            setProduct(fallbackProducts[index]);
          } else {
            setProduct(fallbackProducts[0]);
          }
        }
      } catch (error) {
        console.log("Firebase error or product not found, using local fallback");
        const combinedFallbacks = [...fallbackProducts, ...silverProducts, ...customProducts];
        const fallback = combinedFallbacks.find(p => p.id === id || String(p.id) === String(id));
        if (fallback) {
          setProduct(fallback);
        } else {
          const index = parseInt(id) - 1;
          if (index >= 0 && index < fallbackProducts.length) {
            setProduct(fallbackProducts[index]);
          } else {
            setProduct(fallbackProducts[0]);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleWhatsAppInquiry = () => {
    if (!product) return;
    const message = `Hello Devkrupa Jewellers! I am interested in the "${product.name}" (Product ID: ${product.id}). Please provide more details.`;
    const whatsappUrl = `https://wa.me/919638748423?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button & Breadcrumb */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 px-4 py-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent text-sm text-secondary hover:text-primary transition-all focus:outline-none font-medium shadow-md"
          >
            <ArrowLeft size={16} className="text-accent" />
            <span>Back</span>
          </button>
          <div className="text-sm text-muted">
            Home / Collection / {product.category} / <span className="text-primary">{product.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Images Section */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden border border-white/10 bg-secondary/10 flex items-center justify-center p-6 relative">
              <img src={product.imageUrl || product.image} alt="" className="absolute inset-0 w-full h-full object-cover blur-xl opacity-15 pointer-events-none scale-105" />
              <img src={product.imageUrl || product.image} alt={product.name} className="max-w-full max-h-full object-contain relative z-10 rounded-sm" />
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-primary">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center text-yellow-500 text-sm">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <span className="text-muted ml-2">(18 Reviews)</span>
                </div>
              </div>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {product.description || t('productDesc')}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-muted">{t('material')}</span>
                <span className="font-medium">{product.material || "22K Yellow Gold"}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-muted">{t('weight')}</span>
                <span className="font-medium">{product.weight || "10.5 Grams"}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-muted">{t('diamondCut')}</span>
                <span className="font-medium">{product.diamondCut || "Excellent Brilliant"}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-muted">{t('purity')}</span>
                <span className="font-medium">{product.purity || "22K Gold (916)"}</span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`w-full font-bold py-4 px-6 rounded transition-all flex items-center justify-center gap-2 mb-4 border ${
                added 
                  ? 'bg-green-500/10 border-green-500 text-green-500 hover:bg-green-500/20 shadow-md' 
                  : 'bg-accent text-dominant hover:bg-yellow-500 hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-accent/15 border-transparent'
              }`}
            >
              <ShoppingBag size={18} />
              <span>{added ? t('addedToCart') : t('addToCart')}</span>
            </button>

            {/* Actions */}
            <div className="mb-10">
              <button 
                onClick={handleWhatsAppInquiry}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 px-6 rounded font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle size={20} /> {t('inquireWhatsApp')}
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-auto">
              <div className="flex flex-col items-center text-center p-4 glass-effect rounded border border-white/5">
                <Shield className="text-accent mb-2" size={24} />
                <span className="text-sm text-secondary">{t('lifetimeWarranty')}</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 glass-effect rounded border border-white/5">
                <Truck className="text-accent mb-2" size={24} />
                <span className="text-sm text-secondary">{t('insuredShipping')}</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 glass-effect rounded border border-white/5">
                <RefreshCw className="text-accent mb-2" size={24} />
                <span className="text-sm text-secondary">{t('easyReturns')}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
