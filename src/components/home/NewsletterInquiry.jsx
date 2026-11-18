import React, { useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { Mail, ArrowRight, CheckCircle2, ShieldCheck, Download, Sparkles } from 'lucide-react';

export default function NewsletterInquiry() {
  const { addLead } = useLeads();
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('All Dehydrated Powders');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    addLead({
      fullName: 'Price List Subscriber',
      company: 'Corporate Subscriber',
      email: email,
      phone: 'N/A',
      country: 'Global',
      product: `Export Price Sheet - ${category}`,
      powderForm: 'Standard Grade',
      quantity: 'Price List Request',
      packaging: 'Digital',
      targetDate: 'Immediate',
      intendedUse: 'Wholesale Price Comparison',
      type: 'Price List Request',
      notes: `User subscribed for wholesale monthly market price sheet for ${category}`
    });

    setSubscribed(true);
  };

  return (
    <section className="bg-[#1F4D36] text-white py-14 border-t border-emerald-900/60 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9972B]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9972B]/20 text-[#C9972B] text-xs font-bold uppercase tracking-wider border border-[#C9972B]/30">
              <Sparkles className="w-3.5 h-3.5" /> Monthly Global Market Update
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Get Monthly Wholesale Price Indexes & Harvest Forecasts
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed max-w-xl">
              Stay ahead of raw produce seasonality, crop yield reports from Indian agricultural belts, freight rate alerts, and benchmark FOB export prices.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-emerald-500/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C9972B] text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Monthly Price Guidance Dispatched!</h4>
                  <p className="text-xs text-emerald-200 mt-0.5">
                    We've emailed our current FOB/CIF benchmark price index to <strong>{email}</strong>.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter corporate business email..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-stone-800 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9972B]"
                    />
                  </div>

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-3.5 py-3 rounded-xl bg-white/15 text-white border border-white/20 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#C9972B]"
                  >
                    <option value="All Dehydrated Powders" className="text-stone-800">All Powders Index</option>
                    <option value="Vegetable Powders" className="text-stone-800">Vegetable Powders</option>
                    <option value="Fruit Powders" className="text-stone-800">Fruit Powders</option>
                    <option value="Herbal Powders" className="text-stone-800">Herbal & Ayurvedic</option>
                    <option value="Spice Powders" className="text-stone-800">Spice Powders</option>
                  </select>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#C9972B] hover:bg-[#b58622] text-white font-bold text-xs sm:text-sm shadow-md transition-colors shrink-0 flex items-center justify-center gap-1.5"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C9972B]" />
                  <span>Strictly B2B trade intelligence. Unsubscribe at any time.</span>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
