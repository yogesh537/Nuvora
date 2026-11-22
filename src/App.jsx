import React, { useState, useEffect } from 'react';
import { LeadProvider } from './context/LeadContext';
import { CompareProvider } from './context/CompareContext';
import { ProductProvider, useProducts } from './context/ProductContext';

// Core Navigation & Footer
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import PageLoader from './components/PageLoader';

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
import AdminLoginPage from './views/AdminLoginPage';

function AppContent() {
  const { products } = useProducts();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('nuvaro_admin_auth') === 'true' ||
        sessionStorage.getItem('nuvaro_admin_auth') === 'true'
      );
    }
    return false;
  });

  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const authed =
        localStorage.getItem('nuvaro_admin_auth') === 'true' ||
        sessionStorage.getItem('nuvaro_admin_auth') === 'true';

      if (hash === '#admin') {
        return authed ? 'admin' : 'login';
      }
      if (hash === '#login') {
        return 'login';
      }
    }
    return 'home';
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [quickSpecProduct, setQuickSpecProduct] = useState(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);

  // Listen to hash changes for direct #admin and #login routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const authed =
        localStorage.getItem('nuvaro_admin_auth') === 'true' ||
        sessionStorage.getItem('nuvaro_admin_auth') === 'true';

      if (hash === '#admin') {
        if (authed) {
          setIsAdminLoggedIn(true);
          setCurrentView('admin');
        } else {
          setIsAdminLoggedIn(false);
          setCurrentView('login');
          window.location.hash = '#login';
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#login') {
        setCurrentView('login');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleAdminLogout = () => {
    localStorage.removeItem('nuvaro_admin_auth');
    localStorage.removeItem('nuvaro_admin_user');
    sessionStorage.removeItem('nuvaro_admin_auth');
    setIsAdminLoggedIn(false);
    setCurrentView('login');
    window.location.hash = '#login';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateView = (view) => {
    if (view === 'admin') {
      const authed =
        localStorage.getItem('nuvaro_admin_auth') === 'true' ||
        sessionStorage.getItem('nuvaro_admin_auth') === 'true';
      if (authed) {
        setIsAdminLoggedIn(true);
        setCurrentView('admin');
        window.location.hash = '#admin';
      } else {
        setIsAdminLoggedIn(false);
        setCurrentView('login');
        window.location.hash = '#login';
      }
    } else if (view === 'login') {
      setCurrentView('login');
      window.location.hash = '#login';
    } else {
      if (window.location.hash === '#admin' || window.location.hash === '#login') {
        window.location.hash = '';
      }
      setCurrentView(view);
    }
  };

  const handleSelectProduct = (product) => {
    if (window.location.hash === '#admin' || window.location.hash === '#login') {
      window.location.hash = '';
    }
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
    if (window.location.hash === '#admin' || window.location.hash === '#login') {
      window.location.hash = '';
    }
    setSelectedCategoryFilter(categoryName);
    setCurrentView('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FAF9F6] text-stone-900 selection:bg-[#D5AA37] selection:text-stone-950">
      <PageLoader />

      {currentView !== 'login' && currentView !== 'admin' && (
        <Navbar
          currentView={currentView}
          setCurrentView={handleNavigateView}
          onSelectCategory={handleSelectCategory}
        />
      )}

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

        {currentView === 'login' && (
          <AdminLoginPage
            onLoginSuccess={() => {
              setIsAdminLoggedIn(true);
              setCurrentView('admin');
              window.location.hash = '#admin';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToSite={() => {
              setCurrentView('home');
              window.location.hash = '';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'admin' && (
          isAdminLoggedIn ? (
            <AdminPortalPage
              onLogout={handleAdminLogout}
              onBackToSite={() => {
                setCurrentView('home');
                window.location.hash = '';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : (
            <AdminLoginPage
              onLoginSuccess={() => {
                setIsAdminLoggedIn(true);
                setCurrentView('admin');
                window.location.hash = '#admin';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBackToSite={() => {
                setCurrentView('home');
                window.location.hash = '';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )
        )}
      </main>

      {currentView !== 'login' && currentView !== 'admin' && (
        <Footer
          onNavigate={(viewId) => {
            handleNavigateView(viewId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectCategory={handleSelectCategory}
        />
      )}

      {currentView !== 'login' && currentView !== 'admin' && (
        <FloatingWhatsApp />
      )}
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
  );
}

export default function App() {
  return (
    <ProductProvider>
      <LeadProvider>
        <CompareProvider>
          <AppContent />
        </CompareProvider>
      </LeadProvider>
    </ProductProvider>
  );
}
