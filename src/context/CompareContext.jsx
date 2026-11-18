import React, { createContext, useContext, useState } from 'react';

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [comparedProducts, setComparedProducts] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const addToCompare = (product) => {
    if (comparedProducts.some(p => p.id === product.id)) {
      setIsCompareOpen(true);
      return;
    }
    if (comparedProducts.length >= 3) {
      alert("You can compare up to 3 powders at a time. Please remove one to add another.");
      setIsCompareOpen(true);
      return;
    }
    setComparedProducts(prev => [...prev, product]);
    setIsCompareOpen(true);
  };

  const removeFromCompare = (productId) => {
    setComparedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const clearCompare = () => {
    setComparedProducts([]);
    setIsCompareOpen(false);
  };

  return (
    <CompareContext.Provider value={{
      comparedProducts,
      isCompareOpen,
      setIsCompareOpen,
      addToCompare,
      removeFromCompare,
      clearCompare
    }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
