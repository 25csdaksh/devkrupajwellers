import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error("Error loading cart from localStorage:", err);
      }
    }
  }, []);

  // Save cart to LocalStorage when updated
  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // Add Item to Cart
  const addToCart = (product, quantity = 1) => {
    const existingIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
      saveCart(updatedCart);
    } else {
      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price || 0,
        weight: product.weight || '',
        category: product.category || '',
        imageUrl: product.imageUrl || product.image || '',
        material: product.material || '',
        quantity: quantity
      };
      saveCart([...cart, newItem]);
    }
  };

  // Remove Item from Cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    saveCart(updatedCart);
  };

  // Update Item Quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const updatedCart = cart.map(item => 
      item.id === productId ? { ...item, quantity } : item
    );
    saveCart(updatedCart);
  };

  // Clear entire Cart
  const clearCart = () => {
    saveCart([]);
  };

  // Get total count of items in cart
  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Get subtotal of items in cart
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      getCartCount, 
      getCartTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
