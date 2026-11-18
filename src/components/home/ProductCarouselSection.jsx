import React from 'react';
import { useLeads } from '../../context/LeadContext';
import { ArrowRight } from 'lucide-react';

const powderImages = [
  'https://plus.unsplash.com/premium_photo-1699201271040-044e345c8591?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1611255942500-dd0189272535?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1611255944156-2c324e4c5a23?w=800&auto=format&fit=crop&q=80',
  'https://plus.unsplash.com/premium_photo-1723489272673-659295e77b8e?w=800&auto=format&fit=crop&q=80',
];

export default function ProductCarouselSection({ products, onSelectProduct }) {
  const { openQuoteModal } = useLeads();
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="bg-[#F7F7F0] py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A762F]">A customer favorite</span>
            <h2 className="text-2xl font-semibold tracking-tight text-[#1F4D36] sm:text-3xl">Our best-selling powders</h2>
            <p className="mt-2 max-w-xl text-xs leading-5 text-stone-500 sm:text-sm">
              Carefully processed ingredients, prepared to meet the needs of commercial formulations.
            </p>
          </div>
          <button
            onClick={() => onSelectProduct(null)}
            className="hidden shrink-0 items-center gap-1.5 text-xs font-semibold text-[#1F4D36] transition hover:text-[#9A762F] sm:inline-flex"
          >
            View all products <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <article
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-[#E8E8DE] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <button
                type="button"
                onClick={() => onSelectProduct(product)}
                className="relative block h-48 overflow-hidden bg-[#F0EEE6] text-left"
                aria-label={`View ${product.name} details`}
              >
                <img
                  src={powderImages[index]}
                  alt="A selection of natural food powders"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full border border-white/60 bg-white/90 px-2.5 py-1 text-[9px] font-semibold text-[#1F4D36] backdrop-blur-sm">
                  {product.meshSize}
                </span>
              </button>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-serif text-base font-semibold leading-snug text-stone-900">{product.name}</h3>
                <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-stone-500">{product.description}</p>
                <div className="mt-auto flex gap-2 pt-4">
                  <button
                    onClick={() => openQuoteModal(product)}
                    className="flex-1 rounded-lg bg-[#C9972B] px-3 py-2.5 text-[10px] font-semibold text-white transition-colors hover:bg-[#ad7a21]"
                  >
                    Request a quote
                  </button>
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="rounded-lg border border-[#1F4D36]/20 px-3 py-2.5 text-[10px] font-semibold text-[#1F4D36] transition-colors hover:bg-[#F3F5EF]"
                  >
                    Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <button
          onClick={() => onSelectProduct(null)}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#1F4D36]/20 bg-white px-4 py-3 text-xs font-semibold text-[#1F4D36] transition hover:bg-[#F3F5EF] sm:hidden"
        >
          View all products <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
