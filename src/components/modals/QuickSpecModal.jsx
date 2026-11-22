import React from 'react';
import { ArrowUpRight, BadgeCheck, Printer, X, Sparkles, FileText } from 'lucide-react';

export default function QuickSpecModal({ product, onClose, onRequestQuote }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-stone-950/75 p-3 sm:p-6 backdrop-blur-md print:bg-white print:p-0 font-['Poppins']">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-overview-title"
        className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-stone-200/80 bg-white shadow-2xl print:max-h-none print:w-full print:border-0 print:shadow-none"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex shrink-0 items-center justify-between gap-4 bg-gradient-to-r from-[#0B3B24] to-[#124E32] px-6 py-5 text-white sm:px-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#D5AA37]/20 border border-[#D5AA37]/40 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#F2D788]">
              <Sparkles className="h-3 w-3 text-[#F2D788]" />
              <span>Nuvaro Agro Technical Specification</span>
            </div>
            <h2 id="product-overview-title" className="mt-1.5 text-xl sm:text-2xl font-bold tracking-tight text-white">
              Product Overview &amp; Applications
            </h2>
          </div>
          <div className="flex items-center gap-2 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              aria-label="Print product overview"
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/20 bg-white/5 text-white/80 transition-colors hover:bg-white/20 hover:text-white cursor-pointer"
            >
              <Printer className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close product overview"
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/20 bg-white/5 text-white/80 transition-colors hover:bg-white/20 hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="overflow-y-auto p-6 sm:p-8" id="printable-spec-sheet">
          <div className="grid gap-6 sm:grid-cols-[180px_1fr] items-start">
            <div className="relative aspect-square sm:aspect-[4/5] overflow-hidden rounded-xl bg-stone-100 border border-stone-200">
              <img
                src={product.image}
                alt={product.imageAlt || product.name}
                className="h-full w-full object-cover"
              />
              {product.imageCredit && (
                <a
                  href={product.imageCreditUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-2 left-2 rounded-md bg-stone-900/80 px-2 py-0.5 text-[8px] font-medium text-white"
                >
                  Attribution
                </a>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <span className="inline-block rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-600 w-fit">
                {product.category}
              </span>
              <h3 className="mt-2 text-2xl font-bold text-stone-900 tracking-tight">
                {product.name}
              </h3>
              <p className="mt-1 text-sm italic text-stone-500 font-medium">
                {product.botanicalName}
              </p>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-stone-600 font-normal">
                {product.description}
              </p>
            </div>
          </div>

          <div className="mt-7 border-y border-stone-200 py-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#B58A27]">
              Industrial Applications
            </span>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {product.applications.map((application) => (
                <li
                  key={application}
                  className="rounded-xl border border-stone-200 bg-stone-50/60 px-4 py-2.5 text-xs font-medium text-stone-700 flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0B3B24]"></span>
                  <span>{application}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 grid gap-3.5 sm:grid-cols-3">
            {[
              ['Target Specification', 'Mesh size, moisture & color matched to application'],
              ['Order Volume & Packing', '25 kg Kraft bags, poly liners or private label'],
              ['Quality & Lab Reports', 'Batch COA, micro analysis & steam sterilized']
            ].map(([label, detail]) => (
              <div key={label} className="rounded-xl border border-stone-200 bg-[#FAF9F5] p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B58A27] block">
                  {label}
                </span>
                <p className="mt-1.5 text-xs font-medium leading-relaxed text-stone-800">
                  {detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs text-stone-600">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#0B3B24]" />
            <p>
              <strong className="font-semibold text-stone-900">Commercial Standard:</strong> FSSAI Central License &amp; ISO compliant processing. Detailed batch-specific certificate of analysis (COA) is issued with every commercial consignment.
            </p>
          </div>
        </div>

        <footer className="flex shrink-0 items-center justify-between gap-4 border-t border-stone-200 bg-white px-6 py-4 sm:px-8 print:hidden">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-stone-200 px-5 py-2.5 text-xs font-semibold text-stone-600 hover:bg-stone-50 transition cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onRequestQuote(product);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0B3B24] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#144d32] cursor-pointer"
          >
            <span>Request Commercial Quote</span>
            <ArrowUpRight className="h-4 w-4 text-[#D5AA37]" />
          </button>
        </footer>
      </section>
    </div>
  );
}
