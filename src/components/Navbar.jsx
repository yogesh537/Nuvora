import React, { useState, useEffect } from 'react';
import { useLeads } from '../context/LeadContext';
import { useCompare } from '../context/CompareContext';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, onSelectCategory }) {
  const { openQuoteModal } = useLeads();
  const { comparedProducts, setIsCompareOpen } = useCompare();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (view) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setShopDropdown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'Products', view: 'products', hasDropdown: true },
    { label: 'Manufacturing', view: 'manufacturing' },
    { label: 'Quality & Certs', view: 'quality' },
    { label: 'Private Label', view: 'private-label' },
    { label: 'Blog', view: 'blog' },
  ];

  const categories = ['Vegetable Powders','Spice Powders','Herbal & Botanical','Exotic Fruit','Superfood Blends','Custom Formulations'];

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-stone-100 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${isScrolled ? 'shadow-md shadow-stone-900/5' : 'shadow-sm'}`}>
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">

        {/* Logo */}
        <button onClick={() => go('home')} className="flex items-center gap-2 shrink-0 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1F4D36] transition-transform group-hover:scale-105 sm:h-10 sm:w-10">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 4 13c0-4.5 4.5-8 7-9 2.5 1 7 4.5 7 9a7 7 0 0 1-7 7Z"/>
              <path d="M11 20v-9"/>
            </svg>
          </div>
          <div className="leading-tight">
            <div className="font-bold text-[14px] tracking-tight text-[#1F4D36] sm:text-[16px]">Nuvaro Agro</div>
            <div className="mt-0.5 text-[7px] font-semibold uppercase tracking-[0.1em] text-stone-500 sm:text-[9px] sm:tracking-[0.16em]">Ingredient specialists</div>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav aria-label="Main navigation" className="hidden items-center gap-5 text-[12px] font-medium text-stone-600 xl:flex">
          {navLinks.map(link => (
            <div key={link.view} className="relative" onMouseLeave={() => link.hasDropdown && setShopDropdown(false)}>
              <button
                onMouseEnter={() => link.hasDropdown && setShopDropdown(true)}
                onClick={() => go(link.view)}
                aria-current={currentView === link.view ? 'page' : undefined}
                className={`flex items-center gap-0.5 border-b-2 py-2 transition-colors ${currentView === link.view ? 'border-[#1F4D36] font-semibold text-[#1F4D36]' : 'border-transparent hover:text-[#1F4D36]'}`}
              >
                {link.label}
                {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 mt-0.5 text-stone-400"/>}
              </button>
              {link.hasDropdown && shopDropdown && (
                <div
                  className="absolute left-0 top-full z-50 mt-1 w-56 rounded-xl border border-stone-100 bg-white py-1.5 shadow-xl"
                  onMouseEnter={() => setShopDropdown(true)}
                >
                  {categories.map(c => (
                    <button key={c} onClick={() => { onSelectCategory(c); setShopDropdown(false); }}
                      className="w-full px-4 py-2 text-left text-xs text-stone-700 transition-colors hover:bg-green-50 hover:text-[#1F4D36]">
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3 shrink-0">
          {comparedProducts.length > 0 && (
            <button onClick={() => setIsCompareOpen(true)}
              className="hidden sm:block text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
              Compare ({comparedProducts.length})
            </button>
          )}
          <button onClick={() => go('admin')}
            className="hidden rounded-lg border border-stone-200 px-3.5 py-2 text-xs font-semibold text-stone-600 transition-colors hover:bg-stone-50 xl:block">
            Admin
          </button>
          <button onClick={openQuoteModal}
            className="rounded-lg bg-[#1F4D36] px-2.5 py-2.5 text-[10px] font-semibold text-white shadow-sm transition-colors hover:bg-[#193e2c] sm:px-5 sm:text-xs">
            <span className="sm:hidden">Get a quote</span>
            <span className="hidden sm:inline">Request a quote</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="rounded-lg p-2 text-stone-700 transition hover:bg-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F4D36] xl:hidden"
          >
            {mobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="space-y-2 border-t border-stone-100 bg-white px-6 py-4 shadow-lg xl:hidden">
          {navLinks.map(link => (
            <button key={link.view} onClick={() => go(link.view)}
              className={`block w-full rounded-md py-2 text-left text-sm transition-colors ${currentView === link.view ? 'font-semibold text-[#1F4D36]' : 'text-stone-700 hover:text-[#1F4D36]'}`}>
              {link.label}
            </button>
          ))}
          <button onClick={() => { openQuoteModal(); setMobileMenuOpen(false); }}
            className="mt-2 w-full rounded-lg bg-[#1F4D36] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#193e2c]">
            Request a quote
          </button>
        </div>
      )}
    </header>
  );
}
