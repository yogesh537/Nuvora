import React, { useState } from 'react';
import { LeadProvider } from './context/LeadContext';
import { CompareProvider } from './context/CompareContext';
import { products } from './data/products';

// Core Navigation & Footer
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// Modals
import QuoteRequestModal from './components/modals/QuoteRequestModal';
import CatalogueDownloadModal from './components/modals/CatalogueDownloadModal';
import CompareModal from './components/modals/CompareModal';
import QuickSpecModal from './components/modals/QuickSpecModal';

// Other Dedicated Views
import HomePage from './views/HomePage';
import ProductListingPage from './views/ProductListingPage';
import ProductDetailPage from './views/ProductDetailPage';
import AboutPage from './views/AboutPage';
import IndustriesPage from './views/IndustriesPage';
import QualityCertificationsPage from './views/QualityCertificationsPage';
import CertificatesPage from './views/CertificatesPage';
import PrivateLabelPage from './views/PrivateLabelPage';
import BlogPage from './views/BlogPage';
import AdminPortalPage from './views/AdminPortalPage';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [quickSpecProduct, setQuickSpecProduct] = useState(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);

  const handleSelectProduct = (product) => {
    if (product) {
      setSelectedProduct(product);
      setCurrentView('product-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView('products');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (categoryName) => {
    setSelectedCategoryFilter(categoryName);
    setCurrentView('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LeadProvider>
      <CompareProvider>
        <div className="min-h-screen flex flex-col font-sans bg-[#FAF9F6] text-stone-900 selection:bg-[#D5AA37] selection:text-stone-950">

          <Navbar
            currentView={currentView}
            setCurrentView={setCurrentView}
            onSelectCategory={handleSelectCategory}
          />

          <main className="flex-1">
            {currentView === 'home' && (
              <HomePage
                onSelectProduct={handleSelectProduct}
                onSelectCategory={handleSelectCategory}
                onOpenQuickSpec={(p) => setQuickSpecProduct(p)}
              />
            )}

            {currentView === 'products' && (
              <ProductListingPage
                products={products}
                selectedCategory={selectedCategoryFilter}
                onSelectProduct={handleSelectProduct}
                onOpenQuickSpec={(p) => setQuickSpecProduct(p)}
              />
            )}

            {currentView === 'product-detail' && selectedProduct && (
              <ProductDetailPage
                product={selectedProduct}
                onBack={() => setCurrentView('products')}
                onOpenQuickSpec={(p) => setQuickSpecProduct(p)}
              />
            )}

            {currentView === 'industries' && (
              <IndustriesPage
                onExploreProducts={() => handleSelectProduct(null)}
                onOpenQuote={() => document.dispatchEvent(new CustomEvent('openQuoteModal'))}
              />
            )}

            {currentView === 'about' && (
              <AboutPage
                onExploreProducts={() => handleSelectProduct(null)}
                onOpenQuote={() => document.dispatchEvent(new CustomEvent('openQuoteModal'))}
              />
            )}

            {(currentView === 'certificates' || currentView === 'quality') && (
              <CertificatesPage />
            )}

            {(currentView === 'private-label' || currentView === 'privatelabel') && (
              <PrivateLabelPage />
            )}

            {currentView === 'blog' && (
              <BlogPage
                selectedPost={selectedBlogPost}
                onSelectPost={setSelectedBlogPost}
                onSelectProduct={handleSelectProduct}
              />
            )}

            {currentView === 'admin' && (
              <AdminPortalPage />
            )}
          </main>

          <Footer
            onNavigate={(viewId) => {
              setCurrentView(viewId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectCategory={handleSelectCategory}
          />

          <FloatingWhatsApp />
          <QuoteRequestModal />
          <CatalogueDownloadModal />
          <CompareModal />
          <QuickSpecModal
            product={quickSpecProduct}
            onClose={() => setQuickSpecProduct(null)}
            onRequestQuote={(product) => {
              setQuickSpecProduct(null);
              document.dispatchEvent(new CustomEvent('openQuoteModal', { detail: product }));
            }}
          />
        </div>
      </CompareProvider>
    </LeadProvider>
  );
}
