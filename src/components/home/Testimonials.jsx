import React from 'react';

const testimonials = [
  {
    name: 'Sarah Donham',
    company: 'FoodTech Innovations Ltd, UK',
    role: 'Head of Procurement',
    avatar: 'SD',
    text: '"Nuvaro Agro\'s moringa powder is phenomenal — rich colour, excellent solubility, and the COA matches perfectly. We\'ve been sourcing from them for 2 years and lead to head to Nuvaro Agro highly."',
    stars: 5,
  },
  {
    name: 'Michael Khoon',
    company: 'AsiaNutra Pte Ltd, Singapore',
    role: 'Product Development Manager',
    avatar: 'MK',
    text: '"Natural vibrancy has surpassed still formulated from non-tomato post-freeze powders for ulcer and pain aromas. Highly recommended for nutraceutical formulations."',
    stars: 5,
  },
  {
    name: 'Emily Cozy',
    company: 'PureHealth Brands, Australia',
    role: 'Director of Sourcing',
    avatar: 'EC',
    text: '"Really a standout hub has never been more about healthy health to the better energy. Their beetroot and spinach powders have transformed our green blend line."',
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-stone-900">What Our Customers Say</h2>
            <p className="text-stone-500 text-sm mt-1">Best stories from real food brands and manufacturers.</p>
          </div>
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-stone-500 hover:bg-stone-100 cursor-pointer transition-colors">‹</div>
            <div className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-stone-500 hover:bg-stone-100 cursor-pointer transition-colors">›</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-[#f8f7f2] rounded-2xl p-6 border border-stone-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#1a3d2b] text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-[13px] text-stone-800">{t.name}</div>
                  <div className="text-[11px] text-stone-500">{t.role}, {t.company}</div>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.stars)].map((_,i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-stone-600 text-xs leading-relaxed italic">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
