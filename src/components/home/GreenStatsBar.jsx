import React from 'react';
import { Package, Sprout, ThumbsUp, Heart } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

export default function GreenStatsBar() {
  const { products } = useProducts();
  const stats = [
    {
      icon: Package,
      value: String(products.length),
      label: "Products listed",
      sublabel: "Powders across ingredient categories"
    },
    {
      icon: Package,
      value: "FSSAI",
      label: "Facility license",
      sublabel: "License details available on request"
    },
    {
      icon: Sprout,
      value: "Per order",
      label: "Quality scope",
      sublabel: "Checks and documents confirmed"
    },
    {
      icon: ThumbsUp,
      value: "B2B",
      label: "Product support",
      sublabel: "Specifications and packs discussed"
    }
  ];

  return (
    <div className="bg-[#1F4D36] text-white py-10 px-4 sm:px-6 relative overflow-hidden border-y border-emerald-900/60">
      
      {/* Subtle organic leaves background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex justify-around items-center">
        <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Text with Heart Icon matching reference */}
        <div className="text-center mb-8">
          <p className="text-xs sm:text-sm font-semibold text-emerald-200/90 tracking-wide flex items-center justify-center gap-1.5">
            <span>Ingredient sourcing and product support for commercial teams</span>
            <Heart className="w-3.5 h-3.5 text-[#C9972B] fill-[#C9972B]" />
          </p>
        </div>

        {/* 4 Stats Grid matching reference design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0 text-[#C9972B]">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-sans text-white tracking-tight leading-tight">
                    {item.value}
                  </div>
                  <div className="text-xs font-semibold text-emerald-100">
                    {item.label}
                  </div>
                  <div className="text-[10px] text-emerald-300/80">
                    {item.sublabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
