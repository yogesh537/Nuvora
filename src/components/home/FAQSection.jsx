import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "What is your minimum order quantity (MOQ)?",
    a: "Our standard export MOQ is 100 kg to 250 kg per powder line for initial commercial trial orders. For contracted annual buyers, we supply in full container loads (FCL 10 MT to 20 MT) with scheduled staggered dispatches."
  },
  {
    q: "How long does delivery take?",
    a: "Standard export batch production takes 7 - 10 business days. Ocean freight shipments depart weekly from Nhava Sheva (JNPT) and Mundra ports (transit 14-22 days to EU/USA). Express lab sample pouches arrive via DHL within 3 - 5 days."
  },
  {
    q: "Do you provide regulatory & marketing support?",
    a: "Yes. Every shipment includes batch-specific Certificate of Analysis (COA), Technical Data Sheet (TDS), Material Safety Data Sheet (MSDS), Phytosanitary certificate, Non-GMO declaration, and heavy metal & pesticide test reports."
  },
  {
    q: "Do you offer private labeling and custom mesh?",
    a: "Absolutely. We specialize in custom particle milling from 60 mesh to superfine 120 mesh, custom carrier ratios (including 100% carrier-free options), and complete private label retail packaging (stand-up pouches, jars, sachets)."
  },
  {
    q: "Can I get free samples before placing a bulk order?",
    a: "Yes, we dispatch 100g free laboratory samples for verified R&D, food science, and formulation teams worldwide. The sample arrives with complete analytical batch test results."
  },
  {
    q: "What payment methods and terms do you accept?",
    a: "We accept International Wire Transfer (T/T), Letter of Credit (L/C at sight), and standard B2B trade payment terms (30% Advance T/T and 70% balance against Bill of Lading copy)."
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
