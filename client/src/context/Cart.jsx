import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './Auth.jsx';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [auth] = useAuth();

  useEffect(() => {
    if (auth?.user) {
      const storedCart = JSON.parse(localStorage.getItem(`cart_${auth.user._id}`)) || [];
      setCart(storedCart);
    } else {
      setCart([]);
    }
  }, [auth]);

  const saveCart = (newCart) => {
    setCart(newCart);
    if (auth?.user) {
      localStorage.setItem(`cart_${auth.user._id}`, JSON.stringify(newCart));
    }
  };

  return (
    <CartContext.Provider value={[cart, saveCart]}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
