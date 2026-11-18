import React, { useState } from 'react';
import { useLeads } from '../context/LeadContext';
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';

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

const companyLinks = [
  { label: 'About Nuvaro', view: 'about' },
  { label: 'Industries We Serve', view: 'industries' },
  { label: 'Private Label', view: 'private-label' },
  { label: 'Insights & Articles', view: 'blog' },
];

const powderLinks = [
  { label: 'Vegetable Powders', category: 'Vegetable Powders' },
  { label: 'Spice Powders', category: 'Spice Powders' },
  { label: 'Herbal & Botanical', category: 'Herbal & Botanical' },
  { label: 'Exotic Fruit', category: 'Exotic Fruit' },
];

export default function Footer({ onNavigate, onSelectCategory }) {
  const { addLead, openQuoteModal } = useLeads();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();
    addLead({
      fullName: 'Newsletter Subscriber',
      company: 'Corporate Trade Contact',
      email,
      phone: 'N/A',
      country: 'Global',
      product: 'Monthly Price Updates & Harvest Trends',
      powderForm: 'N/A',
      quantity: 'Newsletter',
      packaging: 'Digital',
      targetDate: 'Immediate',
      intendedUse: 'Trade Intelligence',
      type: 'Price List Request',
      notes: 'Subscribed for monthly FOB price index updates.',
    });
    setSubscribed(true);
  };

  const renderLinks = (links) => (
    <ul className="space-y-2.5">
      {links.map(({ label, view, action, category }) => (
        <li key={label}>
          {action === 'whatsapp' ? (
            <a href="https://wa.me/919820012345" target="_blank" rel="noreferrer" className="text-[11px] leading-5 text-[#6f665d] transition-colors hover:text-[#1f4d36]">
              {label}
            </a>
          ) : (
            <button
              onClick={() => {
                if (action === 'quote') openQuoteModal();
                else if (category) onSelectCategory(category);
                else onNavigate(view);
              }}
              className="text-left text-[11px] leading-5 text-[#6f665d] transition-colors hover:text-[#1f4d36] focus:outline-none focus-visible:text-[#1f4d36]"
            >
              {label}
            </button>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="w-full overflow-hidden border-t-4 border-[#1f4d36] bg-[#fbf6ed] text-[#433b34]">
      <div className="w-full">
        <div className="mx-auto grid w-full max-w-7xl gap-8 border-b border-[#e8ded0] px-5 py-7 sm:px-8 sm:py-9 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-12">
          <div>
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f4d36]"
              aria-label="Nuvaro Agro home"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-[#d8c6ae] bg-[#f1e7d7] text-[#1f4d36]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11 20A7 7 0 0 1 4 13c0-4.5 4.5-8 7-9 2.5 1 7 4.5 7 9a7 7 0 0 1-7 7Z" />
                  <path d="M11 20v-9" />
                </svg>
              </span>
              <span>
                <span className="block font-serif text-2xl font-semibold tracking-tight text-[#183126]">Nuvaro Agro</span>
                <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#83776c]">Dehydrated ingredients</span>
              </span>
            </button>
            <p className="mt-4 max-w-lg text-[11px] leading-5 text-[#756b62] sm:text-xs">
              Rooted in nature, made for modern food and wellness brands. Discover premium vegetable, fruit, spice and botanical powders for your next formulation.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['FSSAI Licensed Facility'].map((certification) => (
                <span key={certification} className="rounded-full border border-[#e5d9c8] bg-white/70 px-2.5 py-1 text-[9px] font-semibold tracking-wide text-[#6f665d]">
                  {certification}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-lg font-semibold text-[#40372f]">Notes from the field</h2>
            <p className="mt-1 text-[11px] leading-5 text-[#756b62]">
              Product updates, harvest news and ingredient insights, delivered occasionally.
            </p>
            {subscribed ? (
              <p role="status" className="mt-4 rounded-lg border border-[#bfcdb5] bg-[#eef2e8] px-4 py-3 text-xs font-medium text-[#1f4d36]">
                Thank you. You are subscribed to our trade bulletin.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-2 sm:flex-row">
                <label className="sr-only" htmlFor="footer-newsletter-email">Email address</label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email address"
                  className="min-w-0 flex-1 border border-[#ded2c2] bg-white px-3.5 py-3 text-[11px] text-[#433b34] outline-none transition placeholder:text-[#a49a8e] focus:border-[#1f4d36] focus:ring-2 focus:ring-[#1f4d36]/10"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-[#1f4d36] px-5 py-3 text-[11px] font-semibold text-white transition-colors hover:bg-[#193e2c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9972B] focus-visible:ring-offset-2"
                >
                  Subscribe <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-5 py-7 sm:px-8 sm:py-8 md:grid-cols-4 md:gap-6 lg:px-12">
          <div>
            <h3 className="mb-3 font-serif text-sm font-semibold text-[#40372f]">Quick Links</h3>
            {renderLinks(quickLinks)}
          </div>
          <div>
            <h3 className="mb-3 font-serif text-sm font-semibold text-[#40372f]">Customer Care</h3>
            {renderLinks(customerCareLinks)}
          </div>
          <div>
            <h3 className="mb-3 font-serif text-sm font-semibold text-[#40372f]">Company Links</h3>
            {renderLinks(companyLinks)}
          </div>
          <div>
            <h3 className="mb-3 font-serif text-sm font-semibold text-[#40372f]">Connect With Us</h3>
            <div className="space-y-2.5 text-[11px] leading-5 text-[#6f665d]">
              <a href="mailto:export@nuvaroagro.com" className="flex items-center gap-2 transition-colors hover:text-[#1f4d36]">
                <Mail className="h-3.5 w-3.5 shrink-0 text-[#C9972B]" />
                export@nuvaroagro.com
              </a>
              <a href="tel:+919820012345" className="flex items-center gap-2 transition-colors hover:text-[#1f4d36]">
                <Phone className="h-3.5 w-3.5 shrink-0 text-[#C9972B]" />
                +91 98200 12345
              </a>
              <p className="flex items-start gap-2">
                <MapPin className="mt-1 h-3.5 w-3.5 shrink-0 text-[#C9972B]" />
                Gujarat &amp; Maharashtra, India
              </p>
            </div>
            <a
              href="https://wa.me/919820012345"
              target="_blank"
              rel="noreferrer"
              aria-label="Message Nuvaro Agro on WhatsApp"
              className="mt-4 inline-grid h-9 w-9 place-items-center rounded-full border border-[#e2d6c7] bg-white text-[#1f4d36] transition-colors hover:border-[#1f4d36] hover:bg-[#1f4d36] hover:text-white"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="border-t border-[#e8ded0] px-5 py-4 text-center text-[10px] text-[#81766b] sm:px-8">
          © {new Date().getFullYear()} Nuvaro Agro Pvt Ltd. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
