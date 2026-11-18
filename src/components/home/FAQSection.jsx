import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "What is your minimum order quantity (MOQ)?",
    a: "Minimum quantities vary by product, packaging and production requirements. The current product MOQ is shared during inquiry, and custom runs are discussed separately."
  },
  {
    q: "How long does delivery take?",
    a: "Production and transit timing depend on the product, order size and destination. The estimated schedule is confirmed with your quotation."
  },
  {
    q: "Do you provide regulatory & marketing support?",
    a: "The facility holds an FSSAI license. Product specifications, batch documents and any additional tests are discussed and confirmed for each order."
  },
  {
    q: "Do you offer private labeling and custom mesh?",
    a: "Particle size, carrier preferences and retail packaging can be discussed in your brief. Available options are confirmed against product feasibility and order requirements."
  },
  {
    q: "Can I request a sample before placing a bulk order?",
    a: "Sample availability, quantity, shipping and accompanying documents are confirmed when you submit a request."
  },
  {
    q: "What payment methods and terms do you accept?",
    a: "Payment terms are provided with the quotation and depend on the order and destination. Please include your preferred terms in your inquiry."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="py-14 lg:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header with Arrows matching Image 1 */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-widest mb-1.5">
            <span>&rarr;</span>
            <span className="text-[#183D28]">Frequently Asked Questions</span>
            <span>&larr;</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#183D28] tracking-tight">
            Commercial Sourcing & Trade Inquiries
          </h2>
        </div>

        {/* 2-Column FAQ Grid matching Image 1 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E8E4DA] p-5 shadow-2xs hover:border-[#183D28]/40 transition-all cursor-pointer flex flex-col justify-between"
                onClick={() => toggle(idx)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-bold text-stone-900 text-sm leading-snug">
                    {faq.q}
                  </h4>
                  <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 shrink-0">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {isOpen && (
                  <p className="text-xs text-stone-600 mt-3 pt-3 border-t border-stone-100 leading-relaxed animate-fadeIn">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
