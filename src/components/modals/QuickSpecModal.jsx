import React from 'react';
import { ArrowUpRight, BadgeCheck, Printer, X } from 'lucide-react';

export default function QuickSpecModal({ product, onClose, onRequestQuote }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#10231a]/75 p-3 backdrop-blur-sm print:bg-white print:p-0">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-overview-title"
        className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden border border-[#d6d3c8] bg-[#f4f1e8] shadow-2xl print:max-h-none print:w-full print:border-0 print:shadow-none"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex shrink-0 items-center justify-between gap-4 bg-[#183126] px-5 py-4 text-white sm:px-7">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.17em] text-[#d4ad49]">Nuvaro Agro / Product overview</p>
            <h2 id="product-overview-title" className="mt-1 text-lg font-black">A starting point for discussion</h2>
          </div>
          <div className="flex items-center gap-2 print:hidden">
            <button type="button" onClick={() => window.print()} aria-label="Print product overview" className="grid h-9 w-9 place-items-center border border-white/20 text-white/75 hover:bg-white/10 hover:text-white">
              <Printer className="h-4 w-4" />
            </button>
            <button type="button" onClick={onClose} aria-label="Close product overview" className="grid h-9 w-9 place-items-center border border-white/20 text-white/75 hover:bg-white/10 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="overflow-y-auto p-5 sm:p-7" id="printable-spec-sheet">
          <div className="grid gap-5 sm:grid-cols-[180px_1fr]">
            <div className="relative min-h-40 overflow-hidden bg-[#e6e2d7] sm:min-h-48">
              <img src={product.image} alt={product.imageAlt || product.name} className="absolute inset-0 h-full w-full object-cover" />
              {product.imageCredit && (
                <a href={product.imageCreditUrl} target="_blank" rel="noreferrer" className="absolute bottom-2 left-2 bg-[#183126]/85 px-2 py-1 text-[8px] font-semibold text-white">
                  Photo credit
                </a>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#9b7a32]">{product.category}</p>
              <h3 className="mt-2 text-2xl font-black leading-tight tracking-[-0.04em] text-[#183126]">{product.name}</h3>
              <p className="mt-2 text-sm italic text-[#657067]">{product.botanicalName}</p>
              <p className="mt-4 text-sm leading-6 text-[#536056]">{product.description}</p>
            </div>
          </div>

          <div className="mt-7 border-y border-[#183126]/15 py-5">
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#9b7a32]">Example applications</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {product.applications.map((application) => (
                <li key={application} className="border border-[#183126]/10 bg-white/70 px-3 py-2.5 text-xs leading-5 text-[#425047]">{application}</li>
              ))}
            </ul>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ['Specification', 'Discuss for your application'],
              ['Order volume & pack', 'Confirm for your project'],
              ['Checks & documents', 'Agree per order']
            ].map(([label, detail]) => (
              <div key={label} className="border border-[#183126]/15 bg-white/60 p-4">
                <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#657067]">{label}</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-[#183126]">{detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-start gap-2 border border-[#183126]/15 bg-[#ebe7db] p-3 text-[11px] leading-5 text-[#536056]">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#9b7a32]" />
            <p><strong className="text-[#183126]">Facility credential:</strong> FSSAI license. This overview is not a batch certificate; final details and order documents are confirmed for the relevant order.</p>
          </div>

          {product.imageCredit && (
            <p className="mt-4 text-[9px] text-[#657067]">
              Image attribution: <a href={product.imageCreditUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">{product.imageCredit}</a>
            </p>
          )}
        </div>

        <footer className="flex shrink-0 items-center justify-between gap-4 border-t border-[#183126]/15 bg-white px-5 py-3.5 sm:px-7 print:hidden">
          <button type="button" onClick={onClose} className="text-[9px] font-black uppercase tracking-[0.12em] text-[#657067] hover:text-[#183126]">
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onRequestQuote(product);
            }}
            className="inline-flex items-center gap-2 bg-[#183126] px-4 py-3 text-[9px] font-black uppercase tracking-[0.1em] text-white hover:bg-[#2b4939]"
          >
            Discuss this ingredient <ArrowUpRight className="h-4 w-4 text-[#d4ad49]" />
          </button>
        </footer>
      </section>
    </div>
  );
}
