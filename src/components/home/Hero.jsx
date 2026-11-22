import React from 'react';
import { ArrowRight, ArrowUpRight, BadgeCheck } from 'lucide-react';
import { useLeads } from '../../context/LeadContext';
import { useProducts } from '../../context/ProductContext';

export default function Hero({ onExploreProducts }) {
  const { openQuoteModal } = useLeads();
  const { products } = useProducts();
  const featuredProducts = products.filter((product) => product.featured).slice(0, 4);

  return (
    <section className="overflow-hidden border-b border-[#183126]/15 bg-[#f4f1e8] text-[#183126]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14 lg:px-12 lg:py-16">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#7d6c53] sm:text-[11px]">
            <span className="h-px w-8 bg-[#b38a32]" />
            B2B powder ingredients
          </div>

          <h1 className="mt-7 max-w-[680px] text-[clamp(2.8rem,5.6vw,5.6rem)] font-black leading-[0.91] tracking-[-0.065em]">
            Bulk powders
            <br />
            <span className="font-serif font-medium italic text-[#9b7a32]">for manufacturers.</span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-[#5d665f] sm:text-base">
            Dehydrated vegetable, spice, fruit and botanical powders for food, beverage and wellness manufacturers. Browse the range or send us your product brief for a bulk quotation.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => onExploreProducts()}
              className="inline-flex items-center gap-3 bg-[#183126] px-5 py-3.5 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#2b4a38] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9b7a32] focus-visible:ring-offset-2"
            >
              Browse products
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => openQuoteModal()}
              className="inline-flex items-center gap-2 border border-[#183126]/30 px-5 py-3.5 text-xs font-black uppercase tracking-[0.12em] text-[#183126] transition hover:border-[#183126] hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9b7a32] focus-visible:ring-offset-2"
            >
              Request a bulk quote
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-8 grid max-w-lg grid-cols-2 border-y border-[#183126]/15 py-4">
            <div className="pr-4">
              <p className="text-xl font-black tracking-tight">{products.length}</p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#657067]">Listed powder products</p>
            </div>
            <div className="border-l border-[#183126]/15 pl-4">
              <p className="flex items-center gap-1.5 text-sm font-black tracking-tight">
                <BadgeCheck className="h-4 w-4 text-[#9b7a32]" />
                FSSAI
              </p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#657067]">Facility license</p>
            </div>
          </div>
          <p className="mt-3 text-[10px] leading-5 text-[#657067]">
            Specifications, sample availability and test scope are confirmed for each order.
          </p>
        </div>

        <div className="min-w-0">
          <div className="mb-3 flex items-end justify-between border-b border-[#183126]/20 pb-3">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#9b7a32]">The ingredient range</p>
              <p className="mt-1 text-xs font-semibold text-[#183126]">Selected products</p>
            </div>
            <button
              onClick={() => onExploreProducts()}
              className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#183126] hover:text-[#9b7a32]"
            >
              View range <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {featuredProducts.map((product, index) => (
              <button
                key={product.id}
                type="button"
                onClick={() => onExploreProducts(product)}
                className="group relative aspect-[1.15/1] min-h-[150px] overflow-hidden bg-[#d9d8cd] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9b7a32] sm:min-h-[205px]"
                aria-label={`View ${product.name}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10231a]/85 via-[#10231a]/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-4">
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-white/70">{product.category}</p>
                    <p className="mt-1 text-xs font-bold leading-tight text-white sm:text-sm">{product.name}</p>
                  </div>
                  <ArrowUpRight className="mb-0.5 h-4 w-4 shrink-0 text-white/80 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </button>
            ))}
          </div>
          <p className="mt-2 text-right text-[9px] font-medium uppercase tracking-[0.12em] text-[#7d6c53]">
            Product photographs shown for range identification
          </p>
        </div>
      </div>
    </section>
  );
}
