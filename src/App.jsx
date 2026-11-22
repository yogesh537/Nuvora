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

function getViewAndPath() {
  if (typeof window === 'undefined') return { view: 'home', path: '/' };
  const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  const hash = window.location.hash.toLowerCase();

  // Support both clean pathname (preferred) and legacy hash
  if (pathname === '/login' || hash === '#login') return { view: 'login', path: '/login' };
  if (pathname === '/admin' || hash === '#admin') return { view: 'admin', path: '/admin' };
  if (pathname === '/products' || hash === '#products') return { view: 'products', path: '/products' };
  if (pathname === '/about' || hash === '#about') return { view: 'about', path: '/about' };
  if (pathname === '/certificates' || pathname === '/quality' || hash === '#certificates') return { view: 'certificates', path: '/certificates' };
  if (pathname === '/blog' || pathname === '/blogs' || hash === '#blog') return { view: 'blog', path: '/blog' };
  if (pathname === '/industries' || hash === '#industries') return { view: 'industries', path: '/industries' };
  if (pathname === '/private-label' || pathname === '/privatelabel') return { view: 'private-label', path: '/private-label' };

  return { view: 'home', path: '/' };
}

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
      const { view, path } = getViewAndPath();
      const authed =
        localStorage.getItem('nuvaro_admin_auth') === 'true' ||
        sessionStorage.getItem('nuvaro_admin_auth') === 'true';

      // Clean up any legacy hash to standard pathname
      if (window.location.hash) {
        window.history.replaceState({ view }, '', path);
      }

      if (view === 'admin') {
        return authed ? 'admin' : 'login';
      }
      return view;
    }
    return 'home';
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [quickSpecProduct, setQuickSpecProduct] = useState(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);

  // Centralized router helper using HTML5 history pushState
  const navigate = (view, customPath = null, replace = false) => {
    let targetPath = customPath;
    if (!targetPath) {
      switch (view) {
        case 'login': targetPath = '/login'; break;
        case 'admin': targetPath = '/admin'; break;
        case 'products': targetPath = '/products'; break;
        case 'about': targetPath = '/about'; break;
        case 'certificates': targetPath = '/certificates'; break;
        case 'blog': targetPath = '/blog'; break;
        case 'industries': targetPath = '/industries'; break;
        case 'private-label': targetPath = '/private-label'; break;
        case 'home': default: targetPath = '/'; break;
      }
    }

    if (window.location.pathname !== targetPath || window.location.hash) {
      if (replace) {
        window.history.replaceState({ view }, '', targetPath);
      } else {
        window.history.pushState({ view }, '', targetPath);
      }
    }

    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to browser back/forward and URL pathname changes
  useEffect(() => {
    const handleLocationChange = () => {
      const authed =
        localStorage.getItem('nuvaro_admin_auth') === 'true' ||
        sessionStorage.getItem('nuvaro_admin_auth') === 'true';

      const { view, path } = getViewAndPath();

      // Clean up any hash into clean pathname
      if (window.location.hash) {
        window.history.replaceState({ view }, '', path);
      }

      if (view === 'admin') {
        if (authed) {
          setIsAdminLoggedIn(true);
          setCurrentView('admin');
        } else {
          setIsAdminLoggedIn(false);
          navigate('login', '/login', true);
        }
      } else {
        setCurrentView(view);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleAdminLogout = () => {
    localStorage.removeItem('nuvaro_admin_auth');
    localStorage.removeItem('nuvaro_admin_user');
    sessionStorage.removeItem('nuvaro_admin_auth');
    setIsAdminLoggedIn(false);
    navigate('login', '/login');
  };

  const handleNavigateView = (view) => {
    if (view === 'admin') {
      const authed =
        localStorage.getItem('nuvaro_admin_auth') === 'true' ||
        sessionStorage.getItem('nuvaro_admin_auth') === 'true';
      if (authed) {
        setIsAdminLoggedIn(true);
        navigate('admin', '/admin');
      } else {
        setIsAdminLoggedIn(false);
        navigate('login', '/login');
      }
    } else if (view === 'login') {
      navigate('login', '/login');
    } else {
      navigate(view);
    }
  };

  const handleSelectProduct = (product) => {
    if (product) {
      setSelectedProduct(product);
      setCurrentView('product-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('products', '/products');
    }
  };

  const handleSelectCategory = (categoryName) => {
    setSelectedCategoryFilter(categoryName);
    navigate('products', '/products');
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
              navigate('admin', '/admin');
            }}
            onBackToSite={() => {
              navigate('home', '/');
            }}
          />
        )}

        {currentView === 'admin' && (
          isAdminLoggedIn ? (
            <AdminPortalPage
              onLogout={handleAdminLogout}
              onBackToSite={() => {
                navigate('home', '/');
              }}
            />
          ) : (
            <AdminLoginPage
              onLoginSuccess={() => {
                setIsAdminLoggedIn(true);
                navigate('admin', '/admin');
              }}
              onBackToSite={() => {
                navigate('home', '/');
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
