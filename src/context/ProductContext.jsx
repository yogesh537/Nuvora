import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { products as initialProducts } from '../data/products';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('nuvaro_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Could not load products from localStorage", e);
    }
    return initialProducts;
  });

  const [isLoading, setIsLoading] = useState(false);

  // Sync from backend API on mount
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
          localStorage.setItem('nuvaro_products', JSON.stringify(data));
          return;
        }
      }
    } catch (err) {
      // Backend may be offline or in static preview, fallback to localStorage/initial
      console.log('Running in local/offline storage mode for products');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Persist to localStorage whenever products change
  useEffect(() => {
    try {
      localStorage.setItem('nuvaro_products', JSON.stringify(products));
    } catch (e) {
      console.error("Failed to save products to localStorage", e);
    }
  }, [products]);

  // Upload an image to the backend or convert to DataURL
  const uploadProductImage = async (file) => {
    if (!file) return null;

    // First convert to Base64
    const toBase64 = (f) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(f);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

    const base64Data = await toBase64(file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Data })
      });

      if (res.ok) {
        const result = await res.json();
        if (result.url) {
          return result.url;
        }
      }
    } catch (err) {
      console.warn('Backend upload unavailable, using embedded DataURL', err);
    }

    // Fallback to Base64 DataURL (works 100% offline and in client-only mode)
    return base64Data;
  };

  // Add a new product (Admin)
  const addProduct = async (productData) => {
    const slug = productData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || `product-${Date.now()}`;

    let finalId = slug;
    let counter = 1;
    while (products.some(p => p.id === finalId)) {
      finalId = `${slug}-${counter++}`;
    }

    const newProduct = {
      id: finalId,
      name: productData.name,
      botanicalName: productData.botanicalName || '',
      category: productData.category || 'Spice Powders',
      forms: productData.forms && productData.forms.length 
        ? productData.forms 
        : ['Fine Powder (80-100 Mesh)'],
      meshSize: productData.meshSize || '80-100 Mesh',
      purity: productData.purity || '100% Pure, Zero Artificial Additives',
      colorProfile: productData.colorProfile || 'Natural',
      description: productData.description || 'Export-grade pure dehydrated powder.',
      applications: productData.applications && productData.applications.length 
        ? productData.applications 
        : ['Commercial Food Processing', 'Seasonings & Blends'],
      image: productData.image || '/images/powders/onion-powder.jpg',
      imageAlt: productData.imageAlt || `${productData.name} dehydrated powder`,
      featured: productData.featured || false,
      createdAt: new Date().toISOString()
    };

    // Optimistic local update
    setProducts(prev => [newProduct, ...prev]);

    // Send to backend API
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.product) {
          // Re-sync with server version
          setProducts(prev => prev.map(p => p.id === finalId ? data.product : p));
        }
      }
    } catch (err) {
      console.log('Saved product to local storage (server offline)', err);
    }

    return newProduct;
  };

  // Update existing product (Admin)
  const updateProduct = async (id, updatedData) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));

    try {
      await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
    } catch (err) {
      console.warn('Backend update failed, kept in local state', err);
    }
  };

  // Delete product (Admin)
  const deleteProduct = async (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));

    try {
      await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.warn('Backend delete failed, removed from local state', err);
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      isLoading,
      addProduct,
      updateProduct,
      deleteProduct,
      uploadProductImage,
      refreshProducts: fetchProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
