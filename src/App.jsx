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

// Homepage Sections
import Hero from './components/home/Hero';
import TrustHighlights from './components/home/TrustHighlights';
import ShopByCategory from './components/home/ShopByCategory';
import ProductCarouselSection from './components/home/ProductCarouselSection';
import AboutAndImpactSection from './components/home/AboutAndImpactSection';
import GreenPromoBanner from './components/home/GreenPromoBanner';
import ClientTestimonials from './components/home/ClientTestimonials';
import BlogPreview from './components/home/BlogPreview';
import FAQSection from './components/home/FAQSection';

// Other Dedicated Views
import ProductListingPage from './views/ProductListingPage';
import ProductDetailPage from './views/ProductDetailPage';
import ManufacturingPage from './views/ManufacturingPage';
import QualityCertificationsPage from './views/QualityCertificationsPage';
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

  const handleSelectBlogPost = (post) => {
    setSelectedBlogPost(post);
    setCurrentView('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LeadProvider>
      <CompareProvider>
        <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-800 font-sans selection:bg-[#183D28] selection:text-white">

          <Navbar
            currentView={currentView}
            setCurrentView={setCurrentView}
            onSelectCategory={handleSelectCategory}
          />

          <main className="flex-1">
            {currentView === 'home' && (
              <>
                <Hero onExploreProducts={handleSelectProduct} />
                <TrustHighlights />
                <ShopByCategory onSelectCategory={handleSelectCategory} />
                <ProductCarouselSection
                  products={products}
                  onSelectProduct={handleSelectProduct}
                />
                <AboutAndImpactSection />
                <GreenPromoBanner onExploreProducts={handleSelectProduct} />
                <ClientTestimonials />
                <BlogPreview
                  onSelectBlogPost={handleSelectBlogPost}
                  onViewAllBlogs={() => {
                    setCurrentView('blog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
                <FAQSection />
              </>
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
              <div className="bg-[#FAF8F5] py-12">
                <ProductCarouselSection
                  products={products}
                  onSelectProduct={handleSelectProduct}
                />
              </div>
            )}

            {currentView === 'manufacturing' && (
              <ManufacturingPage onOpenQuote={() => setCurrentView('products')} />
            )}

            {currentView === 'quality' && (
              <QualityCertificationsPage />
            )}

            {currentView === 'private-label' && (
              <PrivateLabelPage />
            )}

            {currentView === 'blog' && (
              <BlogPage
                selectedPost={selectedBlogPost}
                onSelectPost={setSelectedBlogPost}
                onBackToHome={() => setCurrentView('home')}
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
            onRequestQuote={(p) => { setQuickSpecProduct(null); }}
          />
        </div>
      </CompareProvider>
    </LeadProvider>
  );
}
