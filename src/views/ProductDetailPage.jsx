import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, MessageCircle, PackageCheck } from 'lucide-react';
import { useLeads } from '../context/LeadContext';

export default function ProductDetailPage({ product, onBack, onOpenQuickSpec }) {
  const { openQuoteModal } = useLeads();
  const whatsappMessage = encodeURIComponent(
    `Hello Nuvaro Agro, I would like to discuss ${product.name}.`
  );
  const whatsappUrl = `https://wa.me/919820012345?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-[#f4f1e8] text-[#183126]">
      <section className="bg-[#183126] text-[#f4f1e8]">
        <div className="mx-auto max-w-[1440px] px-5 pt-5 sm:px-8 lg:px-12">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.12em] text-white/65 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Ingredient catalog
          </button>
        </div>
        <div className="mx-auto grid max-w-[1440px] lg:min-h-[590px] lg:grid-cols-[1fr_0.95fr]">
          <div className="flex flex-col justify-center px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#d4ad49]">{product.category} / Ingredient profile</p>
            <h1 className="mt-5 max-w-2xl text-4xl font-black leading-[0.92] tracking-[-0.05em] sm:text-5xl lg:text-6xl">{product.name}</h1>
            <p className="mt-4 text-sm italic text-white/65">{product.botanicalName}</p>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/75">{product.description}</p>
            <p className="mt-5 max-w-xl text-xs leading-6 text-white/55">
              Applications shown are starting points for discussion. Suitability, final specifications, order quantity and supporting documents are confirmed for your project.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openQuoteModal(product)}
                className="inline-flex items-center gap-3 bg-[#d4ad49] px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#183126] hover:bg-[#e2c36d]"
              >
                Tell us about your project <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/30 px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.12em] text-white hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
              </a>
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden bg-[#756e5b] sm:min-h-[420px] lg:min-h-[590px]">
            <img src={product.image} alt={product.imageAlt || product.name} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10231a]/75 via-transparent to-[#10231a]/10" />
            <span className="absolute left-5 top-5 border border-white/40 bg-[#183126]/75 px-3 py-2 text-[9px] font-black uppercase tracking-[0.15em] text-white backdrop-blur-sm">
              Illustrative ingredient image
            </span>
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 sm:p-8">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-white/60">Product group</p>
                <p className="mt-1 text-lg font-black text-white">{product.category}</p>
              </div>
              {product.imageCredit && (
                <a
                  href={product.imageCreditUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[9px] font-semibold text-white/75 underline decoration-white/40 underline-offset-4 hover:text-white"
                >
                  Photo: {product.imageCredit}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-16">
        <div>
          <div className="border-b border-[#183126]/20 pb-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#9b7a32]">Application guide</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">What are you making?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#657067]">
              Use these examples to start a conversation. Share your formula, process and market so the team can review the intended fit with you.
            </p>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {product.applications.map((application, index) => (
              <article key={application} className="border border-[#183126]/15 bg-white/70 p-5">
                <p className="font-mono text-[10px] text-[#9b7a32]">0{index + 1}</p>
                <h3 className="mt-4 text-sm font-bold leading-5 text-[#183126]">{application}</h3>
              </article>
            ))}
          </div>
        </div>

        <aside className="flex h-fit flex-col bg-[#ebe7db] p-5 sm:p-7">
          <div className="flex items-start gap-3 border-b border-[#183126]/15 pb-5">
            <PackageCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#9b7a32]" />
            <div>
              <h2 className="text-lg font-black">Build your product brief</h2>
              <p className="mt-1 text-xs leading-5 text-[#657067]">A few practical details help us review your request.</p>
            </div>
          </div>
          <dl className="mt-2">
            {[
              ['Ingredient', product.name],
              ['Order volume', 'Discuss for your project'],
              ['Packaging', 'Confirm available formats'],
              ['Quality documents', 'Agree per order']
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-[0.8fr_1.2fr] gap-3 border-b border-[#183126]/15 py-3.5">
                <dt className="text-[10px] font-bold text-[#657067]">{label}</dt>
                <dd className="text-xs font-semibold leading-5 text-[#183126]">{value}</dd>
              </div>
            ))}
          </dl>
          <button
            type="button"
            onClick={() => openQuoteModal(product)}
            className="mt-5 flex w-full items-center justify-between bg-[#183126] px-4 py-3.5 text-left text-[10px] font-black uppercase tracking-[0.12em] text-white hover:bg-[#2b4939]"
          >
            Start an inquiry <ArrowRight className="h-4 w-4 text-[#d4ad49]" />
          </button>
          <button
            type="button"
            onClick={() => onOpenQuickSpec(product)}
            className="mt-4 inline-flex items-center gap-2 text-left text-[9px] font-black uppercase tracking-[0.11em] text-[#536056] hover:text-[#183126]"
          >
            Open product overview <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </aside>
      </section>

      <section className="border-t border-[#183126]/15 bg-[#ebe7db]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <div className="flex items-start gap-3">
            <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#9b7a32]" />
            <p className="max-w-2xl text-xs leading-5 text-[#536056]">
              Facility credential: FSSAI license. Additional tests and supporting documents are discussed and confirmed for each order.
            </p>
          </div>
          <button type="button" onClick={onBack} className="inline-flex shrink-0 items-center gap-2 border-b border-[#183126] pb-1 text-[9px] font-black uppercase tracking-[0.12em]">
            Back to catalog <ArrowLeft className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
}
