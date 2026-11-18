import React from 'react';
import { ClipboardList, FileCheck2, PackageCheck } from 'lucide-react';

export default function ClientTestimonials() {
  const sourcingSteps = [
    {
      icon: ClipboardList,
      title: 'Define the product brief',
      description: 'Share the product, intended use, target specifications and destination market.'
    },
    {
      icon: FileCheck2,
      title: 'Agree on quality scope',
      description: 'Confirm the documents and any product-specific tests needed for the order.'
    },
    {
      icon: PackageCheck,
      title: 'Confirm packing details',
      description: 'Align on order quantity, packaging format and delivery requirements before quotation.'
    }
  ];

  return (
    <section className="bg-white py-14 lg:py-18">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A762F]">A clear sourcing process</span>
            <h2 className="text-2xl font-semibold tracking-tight text-[#1F4D36] sm:text-3xl">From product brief to order</h2>
            <p className="mt-2 text-xs text-stone-500 sm:text-sm">The key details to align before production and packing.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {sourcingSteps.map(({ icon: Icon, title, description }, index) => (
            <article key={title} className="rounded-xl border border-[#E8E8DE] bg-[#F7F7F0] p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#9A762F]">0{index + 1}</span>
                <Icon className="h-5 w-5 text-[#1F4D36]" strokeWidth={1.7} />
              </div>
              <h3 className="text-sm font-semibold text-stone-900">{title}</h3>
              <p className="mt-2 text-xs leading-6 text-stone-600 sm:text-[13px]">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
