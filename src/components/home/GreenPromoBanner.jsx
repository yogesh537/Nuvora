import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function GreenPromoBanner({ onExploreProducts }) {
  return (
    <section className="bg-[#1a3d2b] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[320px]">

          {/* Left: Text */}
          <div className="py-14 lg:py-16 pr-0 lg:pr-10 relative z-10">
            {/* Decorative leaf in bg */}
            <div className="absolute right-0 top-0 opacity-10 pointer-events-none hidden lg:block">
              <svg width="300" height="300" viewBox="0 0 24 24" fill="white">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
              Power Your Business<br/>
              <span className="text-[#f0c060]">Naturally</span>
            </h2>
            <p className="text-emerald-200 text-sm leading-relaxed mb-8 max-w-md">
              Premium dehydrated powder solutions for food manufacturers, nutraceutical brands, bakeries & exporters. COA guaranteed, ISO certified, bulk export ready.
            </p>
            <button
              onClick={onExploreProducts}
              className="inline-flex items-center gap-2 bg-[#c8922b] hover:bg-[#f0c060] hover:text-stone-900 text-white font-bold text-sm px-7 py-3.5 rounded-lg transition-colors shadow-lg"
            >
              Explore Now
              <ArrowRight className="w-4 h-4"/>
            </button>
          </div>

          {/* Right: Image */}
          <div className="hidden lg:block relative h-full min-h-[320px]">
            <img
              src="https://plus.unsplash.com/premium_photo-1699201271040-044e345c8591?w=1000&auto=format&fit=crop&q=80"
              alt="Natural spice powders presented in glass jars"
              className="w-full h-full object-cover opacity-60"
              style={{ position: 'absolute', inset: 0 }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a3d2b] via-[#1a3d2b]/40 to-transparent"/>
          </div>

        </div>
      </div>
    </section>
  );
}
