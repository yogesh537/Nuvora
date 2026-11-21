import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, MessageCircle, PackageCheck, FileText, CheckCircle2 } from 'lucide-react';
import { useLeads } from '../context/LeadContext';

export default function ProductDetailPage({ product, onBack, onOpenQuickSpec }) {
  const { openQuoteModal } = useLeads();
  const whatsappMessage = encodeURIComponent(
    `Hello Nuvaro Agro, I would like to inquire about bulk ordering ${product.name}.`
  );
  const whatsappUrl = `https://wa.me/919820012345?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans">
      {/* Back button strip */}
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 py-3.5">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-600 hover:text-stone-950 transition"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Powder Catalog
          </button>
        </div>
      </div>

      {/* Main Product Showcase Hero (Light Theme) */}
      <section className="border-b border-stone-200 bg-white py-12 sm:py-16">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-6 sm:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-3">
              <span>{product.category}</span>
              <span>•</span>
              <span>Bulk Commercial Supply</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight">
              {product.name}
            </h1>
            <p className="mt-2 text-base italic text-stone-500 font-serif">
              {product.botanicalName}
            </p>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-stone-600 max-w-xl">
              {product.description}
            </p>

            {/* Quick Specs Badges */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-y border-stone-200 py-4 max-w-xl">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Mesh Size</span>
                <span className="block text-xs font-bold text-stone-800 mt-0.5">{product.meshSize || '80-100 Mesh'}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Purity</span>
                <span className="block text-xs font-bold text-stone-800 mt-0.5">{product.purity || '100% Pure'}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Color Profile</span>
                <span className="block text-xs font-bold text-stone-800 mt-0.5">{product.colorProfile || 'Natural'}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openQuoteModal(product)}
                className="inline-flex items-center gap-2.5 rounded-xl bg-[#D5AA37] px-7 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-stone-950 shadow-sm transition hover:bg-[#C59B2E] active:scale-95"
              >
                <span>Request Bulk Quote</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3.5 text-xs sm:text-sm font-bold text-stone-800 transition hover:border-emerald-600 hover:text-emerald-700"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => onOpenQuickSpec && onOpenQuickSpec(product)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 px-3 py-2"
              >
                <FileText className="h-4 w-4 text-stone-500" /> Technical Spec Sheet
              </button>
            </div>
          </div>

          {/* Right Product Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-lg">
            <img
              src={product.image}
              alt={product.imageAlt || product.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-stone-800 border border-stone-200">
              Commercial Grade: {product.name}
            </div>
          </div>
        </div>
      </section>

      {/* Applications & Brief Builder Details */}
      <section className="mx-auto grid max-w-[1440px] gap-10 px-6 sm:px-12 py-14 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Applications */}
        <div>
          <div className="border-b border-stone-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">Formulation Guide</span>
            <h2 className="mt-1 text-2xl font-extrabold text-stone-900">Recommended Industrial Applications</h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600">
              Formulated for food processors, snack seasonings, and wellness beverage blenders. Custom granulometry is available upon request.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {product.applications?.map((app, index) => (
              <div key={app} className="p-5 rounded-xl border border-stone-200 bg-white shadow-xs">
                <span className="font-mono text-xs font-bold text-amber-800">0{index + 1}</span>
                <h3 className="mt-2 text-sm font-bold text-stone-900">{app}</h3>
              </div>
            ))}
          </div>

          {product.forms && (
            <div className="mt-8 rounded-xl border border-stone-200 bg-white p-6">
              <h3 className="text-sm font-bold text-stone-900 mb-3">Available Processing Formats</h3>
              <div className="flex flex-wrap gap-2">
                {product.forms.map((f) => (
                  <span key={f} className="rounded-lg bg-stone-100 px-3 py-1.5 text-xs font-semibold text-stone-800 border border-stone-200">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Aside: Brief details */}
        <aside className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 h-fit shadow-xs">
          <div className="flex items-start gap-3 border-b border-stone-200 pb-5">
            <PackageCheck className="h-6 w-6 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-bold text-stone-900">Commercial Order Details</h3>
              <p className="text-xs text-stone-500 mt-0.5">Key parameters verified with your quotation</p>
            </div>
          </div>

          <dl className="mt-4 space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-stone-100">
              <dt className="text-stone-500">Standard Pack</dt>
              <dd className="font-semibold text-stone-900">20kg / 25kg Multi-Wall Bags or Fibre Drums</dd>
            </div>
            <div className="flex justify-between py-2 border-b border-stone-100">
              <dt className="text-stone-500">Facility License</dt>
              <dd className="font-semibold text-stone-900">FSSAI No. 10020021008942</dd>
            </div>
            <div className="flex justify-between py-2 border-b border-stone-100">
              <dt className="text-stone-500">Quality Documents</dt>
              <dd className="font-semibold text-stone-900">Batch COA, Allergen Free, Micro Test</dd>
            </div>
            <div className="flex justify-between py-2 border-b border-stone-100">
              <dt className="text-stone-500">Shelf Life</dt>
              <dd className="font-semibold text-stone-900">24 Months (Moisture-Sealed Storage)</dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={() => openQuoteModal(product)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-stone-800"
          >
            <span>Request Commercial Quote</span>
            <ArrowRight className="h-4 w-4 text-[#D5AA37]" />
          </button>
        </aside>
      </section>
    </div>
  );
}
