import React from 'react';
import { products } from '../../data/products';

const categories = new Set(products.map((product) => product.category));

const highlights = [
  { value: products.length, label: 'Powders listed' },
  { value: categories.size, label: 'Ingredient groups' },
  { value: 'FSSAI', label: 'Facility license' },
  { value: 'Per order', label: 'Quality scope' }
];

export default function TrustHighlights() {
  return (
    <section className="bg-[#183126] text-[#f4f1e8]" aria-label="Sourcing facts">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 px-5 sm:px-8 lg:grid-cols-4 lg:px-12">
        {highlights.map((item, index) => (
          <div
            key={item.label}
            className={`flex min-h-[76px] items-center gap-3 border-white/15 py-4 ${index % 2 === 0 ? 'border-r pr-4' : 'pl-4'} ${index > 1 ? 'border-t lg:border-t-0' : ''} ${index > 0 && index % 2 === 0 ? 'lg:border-l lg:pl-6' : ''} ${index === 0 ? 'lg:pl-0 lg:pr-6' : ''} ${index === 3 ? 'lg:pl-6 lg:pr-0' : ''}`}
          >
            <span className="font-serif text-xl font-bold text-[#d4ad49] sm:text-2xl">{item.value}</span>
            <span className="text-[9px] font-bold uppercase leading-4 tracking-[0.12em] text-white/70 sm:text-[10px]">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
