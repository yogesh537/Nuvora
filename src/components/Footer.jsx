import React from 'react';
import { useLeads } from '../context/LeadContext';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

const quickLinks = [
  { label: 'Home', view: 'home' },
  { label: 'Products', view: 'products' },
  { label: 'About Us', view: 'about' },
  { label: 'Industries', view: 'industries' },
  { label: 'Quality Assurance', view: 'quality' },
];

const customerCareLinks = [
  { label: 'Request a Quote', action: 'quote' },
  { label: 'WhatsApp Support', action: 'whatsapp' },
  { label: 'Quality & Testing', view: 'quality' },
  { label: 'Private Label', view: 'private-label' },
];

const powderLinks = [
  { label: 'Vegetable Powders', category: 'Vegetable Powders' },
  { label: 'Spice Powders', category: 'Spice Powders' },
  { label: 'Herbal & Botanical', category: 'Herbal & Botanical' },
  { label: 'Exotic Fruit', category: 'Exotic Fruit' },
];

export default function Footer({ onNavigate, onSelectCategory }) {
  const { openQuoteModal } = useLeads();
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '918087405952';
  const companyEmail = import.meta.env.VITE_COMPANY_EMAIL || 'yogesh@nuvaroagro.com';

  const renderLinks = (links) => (
    <ul className="space-y-2.5">
      {links.map(({ label, view, action, category }) => (
        <li key={label}>
          {action === 'whatsapp' ? (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-stone-600 transition-colors hover:text-stone-900"
            >
              {label}
            </a>
          ) : (
            <button
              onClick={() => {
                if (action === 'quote') openQuoteModal();
                else if (category) onSelectCategory(category);
                else onNavigate(view);
              }}
              className="text-left text-xs text-stone-600 transition-colors hover:text-stone-900 focus:outline-none cursor-pointer"
            >
              {label}
            </button>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="w-full overflow-hidden border-t border-stone-200 bg-[#FBF9F5] text-stone-800">
      <div className="w-full">
        {/* Top bar with brand credentials and direct action */}
        <div className="mx-auto w-full max-w-7xl border-b border-stone-200 px-6 py-8 sm:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
              aria-label="Nuvaro Agro home"
            >
              <div className="flex flex-col items-start justify-center">
                <img
                  src="/images/nuvaro-logo-black.png"
                  alt="Nuvaro Logo"
                  className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
                />
                <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#B58A27] mt-1 pl-0.5">
                  Agro Global • Dehydrated Ingredients
                </span>
              </div>
            </button>
            <p className="mt-4 text-xs leading-relaxed text-stone-600">
              Direct factory supply of dehydrated vegetable, spice, and botanical powders for industrial food manufacturers, snack seasoning makers, and wellness brands globally.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-[10px] font-semibold text-stone-700">
                FSSAI License No. 10020021008942
              </span>
              <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-[10px] font-semibold text-stone-700">
                Steam Sterilized
              </span>
              <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-[10px] font-semibold text-stone-700">
                100% Traceable
              </span>
              <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-[10px] font-semibold text-stone-700">
                Direct Contract Farming
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-3 text-xs font-bold transition shadow-xs"
            >
              <MessageCircle className="h-4 w-4 fill-white text-[#25D366]" />
              <span>WhatsApp: +91 80874 05952</span>
            </a>
            <button
              onClick={() => openQuoteModal()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D5AA37] hover:bg-[#C59B2E] text-stone-950 px-5 py-3 text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <span>Request Quote</span>
            </button>
          </div>
        </div>

        {/* Link Columns */}
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-6 py-8 sm:px-12 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-900">Quick Links</h3>
            {renderLinks(quickLinks)}
          </div>
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-900">Customer Care</h3>
            {renderLinks(customerCareLinks)}
          </div>
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-900">Powder Groups</h3>
            {renderLinks(powderLinks)}
          </div>
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-900">Connect With Us</h3>
            <div className="space-y-2.5 text-xs text-stone-600">
              <a href={`mailto:${companyEmail}`} className="flex items-center gap-2 transition hover:text-stone-900 font-medium">
                <Mail className="h-3.5 w-3.5 shrink-0 text-[#D5AA37]" />
                {companyEmail}
              </a>
              <a href="tel:+918087405952" className="flex items-center gap-2 transition hover:text-stone-900 font-medium">
                <Phone className="h-3.5 w-3.5 shrink-0 text-[#D5AA37]" />
                +91 80874 05952
              </a>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D5AA37]" />
                Processing Facility: Gujarat &amp; Maharashtra, India
              </p>
            </div>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Message Nuvaro Agro on WhatsApp"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-stone-800 transition hover:border-[#25D366]"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366] fill-[#25D366]/20" />
              Chat on WhatsApp (+91 80874 05952)
            </a>
          </div>
        </div>

        {/* Bottom copyright & Admin Link */}
        <div className="border-t border-stone-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <span>© {new Date().getFullYear()} Nuvaro Agro Pvt Ltd. All rights reserved. • High Purity Dehydrated Powders, Flakes &amp; Granules</span>
          <button
            type="button"
            onClick={() => onNavigate('admin')}
            className="text-[11px] font-semibold text-stone-400 hover:text-[#0B7337] transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
          >
            <span>Admin Portal</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
