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
            <a
              href="https://wa.me/919820012345"
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
              className="text-left text-xs text-stone-600 transition-colors hover:text-stone-900 focus:outline-none"
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
        {/* Top bar with logo and newsletter */}
        <div className="mx-auto grid w-full max-w-7xl gap-8 border-b border-stone-200 px-6 py-8 sm:px-12 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 text-left focus:outline-none group"
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
            <p className="mt-4 max-w-lg text-xs leading-relaxed text-stone-600">
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
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold text-stone-900">Subscribe for Monthly Harvest &amp; Price Updates</h2>
            <p className="mt-1 text-xs text-stone-600">
              Get raw ingredient market updates, crop projections, and commercial FOB price schedules.
            </p>
            {subscribed ? (
              <p role="status" className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-900">
                Thank you! You are subscribed to our monthly trade bulletin.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-2 sm:flex-row">
                <label className="sr-only" htmlFor="footer-newsletter-email">
                  Email address
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter corporate email address"
                  className="min-w-0 flex-1 rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-xs text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#D5AA37] focus:ring-1 focus:ring-[#D5AA37]"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#D5AA37] px-5 py-2.5 text-xs font-bold text-stone-950 transition hover:bg-[#C59B2E]"
                >
                  Subscribe <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
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
              <a href="mailto:export@nuvaroagro.com" className="flex items-center gap-2 transition hover:text-stone-900">
                <Mail className="h-3.5 w-3.5 shrink-0 text-[#D5AA37]" />
                export@nuvaroagro.com
              </a>
              <a href="tel:+919820012345" className="flex items-center gap-2 transition hover:text-stone-900">
                <Phone className="h-3.5 w-3.5 shrink-0 text-[#D5AA37]" />
                +91 98200 12345
              </a>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D5AA37]" />
                Processing Facility: Gujarat &amp; Maharashtra, India
              </p>
            </div>
            <a
              href="https://wa.me/919820012345"
              target="_blank"
              rel="noreferrer"
              aria-label="Message Nuvaro Agro on WhatsApp"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-stone-800 transition hover:border-[#D5AA37]"
            >
              <MessageCircle className="h-4 w-4 text-emerald-600" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-stone-200 px-6 py-4 text-center text-xs text-stone-500">
          © {new Date().getFullYear()} Nuvaro Agro Pvt Ltd. All rights reserved. • High Purity Dehydrated Powders, Flakes &amp; Granules
        </div>
      </div>
    </footer>
  );
}
