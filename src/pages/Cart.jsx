import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Trash2, Plus, Minus, ArrowLeft, MessageCircle, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();


  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let message = `Hello Devkrupa Jewellers! I am interested in placing an inquiry for the following items in my cart:\n\n`;
    
    cart.forEach((item, index) => {
      const weightStr = item.weight ? ` (${item.weight})` : '';
      message += `${index + 1}. ${item.name}${weightStr}\n   Qty: ${item.quantity}\n\n`;
    });

    message += `Customer Details:\n• Name: ${user?.displayName || 'Customer'}\n• Email: ${user?.email || 'N/A'}\n\nPlease confirm availability and let me know the estimate.`;

    const whatsappUrl = `https://wa.me/919638748423?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center bg-dominant px-4 text-center">
        <div className="bg-secondary/40 p-6 rounded-full border border-accent/20 mb-6 text-accent animate-pulse">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-serif font-bold text-primary mb-3">Your Cart is Empty</h2>
        <p className="text-muted/65 max-w-sm mb-8 text-sm leading-relaxed">
          It looks like you haven't added any premium jewelry to your cart yet. Explore our collections to find your perfect pieces.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 bg-accent text-dominant font-semibold px-8 py-3.5 rounded hover:bg-yellow-500 hover:scale-[1.01] transition-all text-sm shadow-lg shadow-accent/15 uppercase tracking-wider"
        >
          <ArrowLeft size={16} /> Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-dominant text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-white/10">
          <div>
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 px-4 py-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent text-sm text-secondary hover:text-primary transition-all focus:outline-none font-medium shadow-md mb-3"
            >
              <ArrowLeft size={16} className="text-accent" />
              <span>Back</span>
            </button>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary">Your Shopping Cart</h1>
          </div>
          <button 
            onClick={clearCart}
            className="text-red-500 hover:text-red-400 border border-red-500/20 hover:border-red-500/40 bg-red-500/5 px-4 py-2 rounded text-xs transition-colors font-semibold"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div 
                key={item.id} 
                className="bg-secondary/20 border border-white/10 rounded-lg p-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center hover:border-accent/30 transition-all duration-300 shadow-xl"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-20 h-20 bg-secondary flex items-center justify-center p-1 relative overflow-hidden border border-white/10 rounded shrink-0">
                    <img 
                      src={item.imageUrl} 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover blur-md opacity-25" 
                    />
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="max-w-full max-h-full object-contain relative z-10 rounded-sm" 
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-accent/80 font-bold uppercase tracking-[0.2em] mb-0.5 block">
                      {item.category}
                    </span>
                    <h3 className="font-serif font-bold text-primary text-base line-clamp-1">{item.name}</h3>
                    {item.weight && (
                      <p className="text-xs text-muted/65 mt-0.5 font-sans">Weight: {item.weight}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t border-white/5 sm:border-t-0">
                  {/* Quantity adjustment */}
                  <div className="flex items-center border border-white/15 rounded bg-dominant/50">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-muted hover:text-accent transition-colors"
                      title="Decrease"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-3 text-sm font-semibold text-primary">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-muted hover:text-accent transition-colors"
                      title="Increase"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Delete */}
                  <div className="flex items-center gap-4 text-right">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:bg-red-500/10 p-2.5 rounded transition-all border border-red-500/15 hover:border-red-500/50"
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary Panel */}
          <div className="lg:col-span-1">
            <div className="glass-effect p-6 rounded-lg border border-white/10 shadow-2xl relative sticky top-24 space-y-6">
              <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-accent/40"></div>
              <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-accent/40"></div>

              <h2 className="text-xl font-serif font-bold border-b border-white/5 pb-4">Cart Summary</h2>

              <div className="space-y-4 text-sm border-b border-white/5 pb-4">
                <div className="flex justify-between">
                  <span className="text-muted/65">Total Items</span>
                  <span className="font-semibold">{cart.reduce((tot, it) => tot + it.quantity, 0)}</span>
                </div>
              </div>

              <div className="bg-secondary/25 p-4 rounded border border-white/5 text-[11px] text-muted/60 leading-relaxed font-sans">
                ⚠️ **Notice**: Prices are not listed online. Devkrupa Jewellers will calculate and provide the final estimate based on current gold/silver rates and customization requirements upon consultation.
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 rounded transition-all hover:scale-[1.01] flex justify-center items-center gap-2 shadow-lg shadow-green-500/10"
                >
                  <MessageCircle size={18} /> Inquire Cart on WhatsApp
                </button>
                <Link
                  to="/products"
                  className="w-full block text-center border border-white/10 hover:bg-white/5 text-primary font-semibold py-3.5 rounded transition-all text-xs uppercase tracking-wider font-semibold"
                >
                  Add More Items
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
