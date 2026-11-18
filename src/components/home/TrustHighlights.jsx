import React from 'react';
import { FlaskConical, Headphones, Leaf, ShieldCheck } from 'lucide-react';

const highlights = [
  { Icon: Leaf, title: 'Naturally sourced', detail: 'Pure botanical ingredients' },
  { Icon: FlaskConical, title: 'Made for function', detail: 'Consistent specifications' },
  { Icon: ShieldCheck, title: 'Quality assured', detail: 'Batch COA available' },
  { Icon: Headphones, title: 'B2B support', detail: 'Here for your team' },
];

export default function TrustHighlights() {
  return (
    <section className="bg-[#F7F7F0] py-5">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 sm:px-8 md:grid-cols-4 md:gap-4">
        {highlights.map(({ Icon, title, detail }) => (
          <div key={title} className="flex items-center gap-3 rounded-xl border border-[#E8E8DE] bg-white p-3.5 sm:p-4">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F0F2E9] text-[#1F4D36]">
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-semibold leading-tight text-stone-800 sm:text-xs">{title}</p>
              <p className="mt-1 text-[9px] leading-tight text-stone-500 sm:text-[10px]">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
