import React, { useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { 
  Mail, 
  MessageCircle, 
  Truck, 
  ShieldCheck, 
  Headphones, 
  Package, 
  CheckCircle2, 
  Globe2 
} from 'lucide-react';

export default function NewsletterAndTrustStrip() {
  const { addLead } = useLeads();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    addLead({
      fullName: 'Newsletter Subscriber',
      company: 'Corporate Trade Contact',
      email: email,
      phone: 'N/A',
      country: 'Global',
      product: 'Monthly Price Updates & Harvest Trends',
      powderForm: 'N/A',
      quantity: 'Newsletter',
      packaging: 'Digital',
      targetDate: 'Immediate',
      intendedUse: 'Trade Intelligence',
      type: 'Price List Request',
      notes: `Subscribed for monthly FOB price index updates.`
    });

    setSubscribed(true);
  };

  const whatsappMessage = encodeURIComponent("Hello Nuvaro Agro, I need support regarding bulk dehydrated powder procurement.");
  const whatsappUrl = `https://wa.me/919820012345?text=${whatsappMessage}`;

  return (
    <div className="bg-[#183D28] text-white">
      
      {/* ======================================================== */}
      {/* 1. NEWSLETTER BANNER (Exact layout from Image 1)         */}
      {/* ======================================================== */}
      <div className="border-b border-emerald-900/60 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left Text */}
          <div className="space-y-1 text-center lg:text-left">
            <h3 className="font-bold text-lg sm:text-xl text-white">
              Stay Updated with Nuvaro Agro
            </h3>
            <p className="text-xs text-emerald-200">
              Get product updates, price lists and harvest trends straight to your inbox.
            </p>
          </div>

          {/* Center Input Form */}
          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-xl text-xs text-emerald-200 border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                <span>Thank you! You are subscribed to our monthly trade bulletin.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="px-4 py-2.5 rounded-xl bg-white text-stone-800 placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] w-64 sm:w-80"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#2b6957] hover:bg-[#347d68] text-white font-bold text-xs sm:text-sm transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* Right Follow Us */}
          <div className="flex items-center gap-3 text-xs">
            <span className="text-stone-300 font-medium">Follow Us</span>
            <div className="flex items-center gap-2">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-colors text-stone-200"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-stone-300 font-bold text-xs">
                in
              </span>
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-stone-300 font-bold text-xs">
                f
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. TRUST HIGHLIGHTS STRIP (Exact UI from Image 1, 3, 4, 5)*/}
      {/* Bulk Orders &bull; Delivery &bull; Packaging &bull; Support &bull; Chat*/}
      {/* ======================================================== */}
      <div className="py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full lg:w-auto">
            
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-emerald-300 shrink-0" />
              <div>
                <div className="font-bold text-xs sm:text-sm text-white">Bulk Orders</div>
                <div className="text-[11px] text-emerald-200">Wholesale Prices</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6 text-emerald-300 shrink-0" />
              <div>
                <div className="font-bold text-xs sm:text-sm text-white">Pan India & Global</div>
                <div className="text-[11px] text-emerald-200">Fast & On Time</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-300 shrink-0" />
              <div>
                <div className="font-bold text-xs sm:text-sm text-white">Secure Packaging</div>
                <div className="text-[11px] text-emerald-200">Safe & Reliable</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Headphones className="w-6 h-6 text-emerald-300 shrink-0" />
              <div>
                <div className="font-bold text-xs sm:text-sm text-white">Dedicated Support</div>
                <div className="text-[11px] text-emerald-200">For B2B Partners</div>
              </div>
            </div>

          </div>

          {/* Right WhatsApp Support Button */}
          <div className="shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-[#0e291b] hover:bg-[#123624] text-white border border-emerald-700/50 flex items-center gap-3 transition-colors shadow-sm"
            >
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4 fill-white" />
              </div>
              <div className="text-left">
                <div className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">Need Help?</div>
                <div className="text-xs font-bold text-white">Chat on WhatsApp</div>
              </div>
            </a>
          </div>

        </div>
      </div>

    </div>
  );
}
