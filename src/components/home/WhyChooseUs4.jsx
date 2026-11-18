import React from 'react';

const reasons = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
      </svg>
    ),
    title: 'Premium Quality',
    sub: 'Organic Products',
    desc: 'Farm-sourced raw materials with stringent quality checks at every stage of processing.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>
      </svg>
    ),
    title: 'Sustainably',
    sub: 'Sourced',
    desc: 'Ethically sourced from certified farmers. Zero harmful chemicals. Eco-friendly packaging.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    title: 'Healthier',
    sub: 'Lifestyle',
    desc: 'Nutrient-dense dehydrated powders that retain the natural goodness of raw vegetables and herbs.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
    title: 'Trusted by',
    sub: 'Thousands',
    desc: '250+ food brands and manufacturers across 30 countries trust Nuvaro Agro for consistent quality.',
  },
];

export default function WhyChooseUs4() {
  return (
    <section className="py-14 bg-[#f8f7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-stone-900 mb-2">Why Choose Nuvaro Agro?</h2>
          <p className="text-stone-500 text-sm max-w-xl mx-auto">
            We are committed to delivering the best dehydrated powder products for a healthy lifestyle and professional formulation needs.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {reasons.map((r) => (
            <div key={r.title} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-white border border-stone-200 flex items-center justify-center text-[#1a3d2b] mb-4 group-hover:bg-[#1a3d2b] group-hover:text-white transition-all duration-300 shadow-sm">
                {r.icon}
              </div>
              <div className="font-bold text-stone-800 text-[14px] leading-tight">{r.title}</div>
              <div className="text-[#c8922b] font-bold text-[13px] mb-2">{r.sub}</div>
              <p className="text-stone-500 text-xs leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
