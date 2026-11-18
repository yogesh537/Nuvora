import React from 'react';
import { ArrowRight, BadgeCheck, Trash2, X } from 'lucide-react';
import { useCompare } from '../../context/CompareContext';
import { useLeads } from '../../context/LeadContext';

export default function CompareModal() {
  const { comparedProducts, isCompareOpen, setIsCompareOpen, removeFromCompare, clearCompare } = useCompare();
  const { openQuoteModal } = useLeads();

  if (!isCompareOpen || comparedProducts.length === 0) return null;

  const rows = [
    { label: 'Product group', render: (product) => product.category },
    { label: 'Botanical name', render: (product) => <span className="italic">{product.botanicalName}</span> },
    {
      label: 'Example applications',
      render: (product) => (
        <ul className="space-y-1.5">
          {product.applications.slice(0, 3).map((application) => <li key={application}>{application}</li>)}
        </ul>
      )
    },
    {
      label: 'Specifications, order volume & pack',
      render: () => 'Discuss and confirm for the project'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#10231a]/75 p-3 backdrop-blur-sm">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="compare-title"
        className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden border border-[#d6d3c8] bg-[#f4f1e8] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between gap-4 bg-[#183126] px-5 py-4 text-white sm:px-7">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#d4ad49]">{comparedProducts.length} selected</p>
            <h2 id="compare-title" className="mt-1 text-lg font-black">Compare ingredients</h2>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={clearCompare} className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-white/65 hover:text-white">
              <Trash2 className="h-3.5 w-3.5" /> Clear
            </button>
            <button type="button" onClick={() => setIsCompareOpen(false)} aria-label="Close comparison" className="grid h-9 w-9 place-items-center border border-white/20 text-white/75 hover:bg-white/10 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="min-w-[600px]">
            <div className="grid gap-3" style={{ gridTemplateColumns: `170px repeat(${comparedProducts.length}, minmax(180px, 1fr))` }}>
              <div className="flex items-end pb-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#657067]">Ingredient profile</div>
              {comparedProducts.map((product) => (
                <article key={product.id} className="relative border border-[#183126]/15 bg-white/70 p-4">
                  <button
                    type="button"
                    onClick={() => removeFromCompare(product.id)}
                    aria-label={`Remove ${product.name} from comparison`}
                    className="absolute right-2 top-2 grid h-8 w-8 place-items-center text-[#657067] hover:bg-[#ebe7db] hover:text-[#183126]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <img src={product.image} alt={product.imageAlt || product.name} className="h-28 w-full object-cover" />
                  {product.imageCredit && (
                    <a href={product.imageCreditUrl} target="_blank" rel="noreferrer" className="mt-2 block text-[8px] text-[#657067] underline underline-offset-2">
                      Photo: {product.imageCredit}
                    </a>
                  )}
                  <h3 className="mt-3 pr-7 text-sm font-black leading-5">{product.name}</h3>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCompareOpen(false);
                      openQuoteModal(product);
                    }}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-[#183126] px-3 py-2.5 text-[9px] font-black uppercase tracking-[0.1em] text-white hover:bg-[#2b4939]"
                  >
                    Discuss ingredient <ArrowRight className="h-3.5 w-3.5 text-[#d4ad49]" />
                  </button>
                </article>
              ))}
            </div>

            {rows.map((row) => (
              <div key={row.label} className="grid gap-3 border-t border-[#183126]/15 py-4" style={{ gridTemplateColumns: `170px repeat(${comparedProducts.length}, minmax(180px, 1fr))` }}>
                <div className="pt-1 text-[9px] font-black uppercase tracking-[0.11em] text-[#657067]">{row.label}</div>
                {comparedProducts.map((product) => (
                  <div key={product.id} className="text-xs leading-5 text-[#425047]">{row.render(product)}</div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-start gap-2 border border-[#183126]/15 bg-[#ebe7db] p-3 text-[10px] leading-5 text-[#536056]">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#9b7a32]" />
            <p>Product specifications, order volumes, packaging and supporting documents are confirmed for each inquiry. Facility credential: FSSAI license.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
