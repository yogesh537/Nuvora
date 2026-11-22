import React from 'react';
import { ArrowRight, BadgeCheck, Sparkles, Trash2, X } from 'lucide-react';
import { useCompare } from '../../context/CompareContext';
import { useLeads } from '../../context/LeadContext';

export default function CompareModal() {
  const { comparedProducts, isCompareOpen, setIsCompareOpen, removeFromCompare, clearCompare } = useCompare();
  const { openQuoteModal } = useLeads();

  if (!isCompareOpen || comparedProducts.length === 0) return null;

  const rows = [
    { label: 'Category', render: (product) => <span className="font-semibold text-stone-900">{product.category}</span> },
    { label: 'Botanical Name', render: (product) => <span className="italic text-stone-600 font-medium">{product.botanicalName}</span> },
    {
      label: 'Recommended Applications',
      render: (product) => (
        <ul className="space-y-1">
          {product.applications.slice(0, 3).map((application) => (
            <li key={application} className="flex items-center gap-1.5 text-xs text-stone-600">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0B3B24]"></span>
              <span>{application}</span>
            </li>
          ))}
        </ul>
      )
    },
    {
      label: 'Specifications & Packing',
      render: () => <span className="text-stone-500 font-normal">Custom mesh &amp; bulk packing per order</span>
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-stone-950/75 p-3 sm:p-6 backdrop-blur-md font-['Poppins']">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="compare-title"
        className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-stone-200/80 bg-white shadow-2xl transition-all"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between gap-4 bg-gradient-to-r from-[#0B3B24] to-[#124E32] px-6 py-5 text-white sm:px-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#D5AA37]/20 border border-[#D5AA37]/40 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#F2D788]">
              <Sparkles className="h-3 w-3 text-[#F2D788]" />
              <span>{comparedProducts.length} Selected Ingredients</span>
            </div>
            <h2 id="compare-title" className="mt-1.5 text-xl sm:text-2xl font-bold tracking-tight text-white">
              Side-by-Side Ingredient Comparison
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={clearCompare}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/75 hover:text-white transition cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" /> Clear All
            </button>
            <button
              type="button"
              onClick={() => setIsCompareOpen(false)}
              aria-label="Close comparison"
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/20 bg-white/5 text-white/80 transition hover:bg-white/20 hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-5 sm:p-8">
          <div className="min-w-[600px]">
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: `170px repeat(${comparedProducts.length}, minmax(190px, 1fr))` }}
            >
              <div className="flex items-end pb-3 text-xs font-bold uppercase tracking-wider text-[#B58A27]">
                Product Card
              </div>
              {comparedProducts.map((product) => (
                <article
                  key={product.id}
                  className="relative rounded-2xl border border-stone-200 bg-[#FAF9F5] p-4 shadow-2xs hover:shadow-md transition-shadow"
                >
                  <button
                    type="button"
                    onClick={() => removeFromCompare(product.id)}
                    aria-label={`Remove ${product.name} from comparison`}
                    className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-lg bg-white/80 text-stone-500 hover:bg-stone-200 hover:text-stone-900 shadow-2xs cursor-pointer transition"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-white border border-stone-200">
                    <img
                      src={product.image}
                      alt={product.imageAlt || product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mt-3 pr-6 text-sm font-bold text-stone-900 leading-tight">
                    {product.name}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCompareOpen(false);
                      openQuoteModal(product);
                    }}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B3B24] px-3.5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#144d32] cursor-pointer"
                  >
                    <span>Inquire Quote</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#D5AA37]" />
                  </button>
                </article>
              ))}
            </div>

            {rows.map((row) => (
              <div
                key={row.label}
                className="grid gap-4 border-t border-stone-200 py-4 items-center"
                style={{ gridTemplateColumns: `170px repeat(${comparedProducts.length}, minmax(190px, 1fr))` }}
              >
                <div className="text-xs font-semibold text-stone-500">{row.label}</div>
                {comparedProducts.map((product) => (
                  <div key={product.id} className="text-xs leading-relaxed text-stone-700">
                    {row.render(product)}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs text-stone-600">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#0B3B24]" />
            <p>
              Product specifications, minimum order quantities, packaging options and supporting lab tests are confirmed for each client inquiry. Facility credential: FSSAI Central License.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
