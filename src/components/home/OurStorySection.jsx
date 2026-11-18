import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLeads } from '../../context/LeadContext';

export default function OurStorySection() {
  const { openQuoteModal } = useLeads();
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left: Text */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#c8922b] mb-3">Our Story</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight mb-5">
              Science Backed,<br/>
              Plant Powered for<br/>
              a Better Future
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed mb-4">
              At Nuvaro Agro, we work with vegetable, fruit, spice and botanical ingredients and process them into powders for commercial formulations.
            </p>
            <p className="text-stone-500 text-sm leading-relaxed mb-6">
              Our facility holds an FSSAI license. Product specifications, quality checks and batch documents are discussed and confirmed for each order.
            </p>
            <div className="flex items-center gap-3 mb-6">
              {[
                { icon: '🔬', label: 'Research Backed' },
                { icon: '✅', label: 'Trusted by Brands' },
                { icon: '🧪', label: 'Quality Focused' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-full">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => openQuoteModal()}
              className="inline-flex items-center gap-2 bg-[#c8922b] hover:bg-[#b07d22] text-white font-bold text-sm px-6 py-3 rounded-lg transition-colors"
            >
              Shop Now <ArrowRight className="w-4 h-4"/>
            </button>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80"
                alt="Nuvaro Agro manufacturing facility"
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>
            {/* Stats overlay */}
            <div className="absolute -bottom-5 -left-5 grid grid-cols-2 gap-2 bg-white p-4 rounded-2xl shadow-xl border border-stone-100">
              {[
                { n: '9', label: 'Products listed' },
                { n: 'FSSAI', label: 'Facility license' },
                { n: 'By order', label: 'Quality scope' },
                { n: 'B2B', label: 'Product inquiries' },
              ].map(stat => (
                <div key={stat.label} className="text-center px-3">
                  <div className="font-extrabold text-lg text-[#1a3d2b]">{stat.n}</div>
                  <div className="text-[10px] text-stone-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
