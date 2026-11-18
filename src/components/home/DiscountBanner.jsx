import React from 'react';
import { useLeads } from '../../context/LeadContext';

export default function DiscountBanner() {
  const { openQuoteModal } = useLeads();
  return (
    <div className="bg-[#1a3d2b] py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=200&q=80"
            alt="Powders"
            className="w-16 h-16 rounded-xl object-cover hidden sm:block opacity-80"
          />
          <div>
            <div className="text-white font-extrabold text-lg sm:text-xl">Get 10% Off Your First Order.</div>
            <div className="text-emerald-300 text-sm font-medium">Use code <span className="font-bold text-white bg-emerald-800 px-2 py-0.5 rounded">NUVARO10</span> at checkout</div>
          </div>
        </div>
        <button
          onClick={openQuoteModal}
          className="bg-[#c8922b] hover:bg-[#f0c060] hover:text-stone-900 text-white font-bold text-sm px-7 py-3 rounded-lg transition-colors shadow-lg shrink-0"
        >
          Shop Now →
        </button>
      </div>
    </div>
  );
}
