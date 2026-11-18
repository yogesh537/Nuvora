import React from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  ClipboardCheck,
  FlaskConical,
  Leaf,
  Microscope,
  PackageCheck,
  Scale,
  ShieldCheck
} from 'lucide-react';
import { useLeads } from '../context/LeadContext';
import { products } from '../data/products';

const qualityCycle = [
  {
    number: '01',
    title: 'Receive & identify',
    detail: 'Review incoming material against the agreed product requirements.',
    icon: Leaf
  },
  {
    number: '02',
    title: 'Prepare',
    detail: 'Select cleaning and preparation steps for the raw ingredient and intended use.',
    icon: ClipboardCheck
  },
  {
    number: '03',
    title: 'Dry & mill',
    detail: 'Discuss the dehydration and milling route needed for the product brief.',
    icon: Scale
  },
  {
    number: '04',
    title: 'Review the process',
    detail: 'Confirm relevant appearance, aroma and physical checks against the agreed specification.',
    icon: FlaskConical
  },
  {
    number: '05',
    title: 'Set test scope',
    detail: 'Agree finished-product tests and supporting documents for the order and destination.',
    icon: Microscope
  },
  {
    number: '06',
    title: 'Pack & release',
    detail: 'Confirm pack format, labeling and batch details before the order is released.',
    icon: PackageCheck
  }
];

const reviewAreas = [
  {
    number: '01',
    title: 'Product specification',
    detail: 'Appearance, aroma, moisture and particle-size criteria are discussed for the product brief.'
  },
  {
    number: '02',
    title: 'Testing requirements',
    detail: 'Microbiological, residue or contaminant tests can be discussed based on ingredient and destination.'
  },
  {
    number: '03',
    title: 'Order documentation',
    detail: 'Batch information and supporting documents are confirmed for the specific order.'
  }
];

export default function QualityCertificationsPage() {
  const { openQuoteModal } = useLeads();
  const showcaseProduct = products.find((product) => product.id === 'ginger-powder') || products[0];

  return (
    <div className="min-h-screen bg-[#f4f1e8] text-[#183126]">
      <section className="relative overflow-hidden border-b border-[#183126]/15 bg-[#f4f1e8]">
        <div className="pointer-events-none absolute -left-36 -top-32 h-[28rem] w-[28rem] rounded-full border border-[#183126]/[0.06]" />
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:min-h-[650px] lg:grid-cols-[1fr_0.88fr] lg:items-center lg:gap-16 lg:px-12 lg:py-16">
          <div className="relative z-10">
            <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#9b7a32]">
              <span className="h-px w-8 bg-[#9b7a32]" /> Quality assurance / Agreed per order
            </p>
            <h1 className="mt-7 max-w-3xl text-[clamp(3rem,6.6vw,6.4rem)] font-black leading-[0.86] tracking-[-0.075em]">
              Know what
              <br />
              <span className="font-serif font-medium italic text-[#9b7a32]">gets checked.</span>
            </h1>
            <p className="mt-7 max-w-xl border-l border-[#183126]/25 pl-5 text-sm leading-7 text-[#59635b] sm:text-base">
              We discuss how an ingredient is reviewed, which product checks fit your brief, and what documentation or pack details your order needs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => openQuoteModal()} className="inline-flex items-center gap-3 bg-[#183126] px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#2b4939]">
                Discuss your requirements <ArrowRight className="h-4 w-4 text-[#d4ad49]" />
              </button>
              <a href="#quality-route" className="inline-flex items-center gap-2 border border-[#183126]/25 px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#183126] transition hover:border-[#9b7a32] hover:text-[#9b7a32]">
                Follow the route <ArrowDownRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-9 flex max-w-xl items-center justify-between gap-5 border-t border-[#183126]/15 pt-5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 shrink-0 text-[#9b7a32]" />
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#7d6c53]">Facility credential</p>
                  <p className="mt-1 text-xs font-bold">FSSAI license</p>
                </div>
              </div>
              <p className="font-mono text-[9px] text-[#657067]">10020021008942</p>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden bg-[#756e5b] sm:min-h-[480px] lg:min-h-[530px]">
            <img src={showcaseProduct.image} alt={showcaseProduct.imageAlt || showcaseProduct.name} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10231a]/80 via-transparent to-[#10231a]/10" />
            <div className="absolute left-4 top-4 border border-white/40 bg-[#183126]/75 px-3 py-2 text-[8px] font-black uppercase tracking-[0.15em] text-white backdrop-blur-sm sm:left-6 sm:top-6 sm:text-[9px]">
              Illustrative ingredient image
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 sm:bottom-6 sm:left-6 sm:right-6">
              <div className="border-l-2 border-[#d4ad49] pl-3 text-white">
                <p className="text-[8px] font-black uppercase tracking-[0.16em] text-white/65">The quality conversation</p>
                <p className="mt-1 text-xl font-black sm:text-2xl">{showcaseProduct.name}</p>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center border border-white/60 bg-[#183126]/50 text-white backdrop-blur-sm">
                <BadgeCheck className="h-5 w-5 text-[#d4ad49]" />
              </span>
            </div>
            {showcaseProduct.imageCredit && (
              <a href={showcaseProduct.imageCreditUrl} target="_blank" rel="noreferrer" className="absolute bottom-[4.5rem] right-4 text-[8px] text-white/75 underline underline-offset-2 hover:text-white sm:bottom-[5rem] sm:right-6">
                Photo: {showcaseProduct.imageCredit}
              </a>
            )}
          </div>
        </div>
      </section>

      <section id="quality-route" className="bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="mb-8 grid gap-4 border-b border-[#183126]/15 pb-6 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9b7a32]">The quality route / 06 checkpoints</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black leading-[0.97] tracking-[-0.05em] sm:text-5xl">
                From raw ingredient
                <br className="hidden sm:block" /> to ready pack.
              </h2>
            </div>
            <p className="max-w-sm text-xs leading-6 text-[#657067]">
              A clear sequence for discussing preparation, processing, quality review and packing. Exact controls depend on the ingredient and agreed specification.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14">
            <ol className="relative ml-4 border-l border-[#9b7a32]/50">
              {qualityCycle.map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <li key={stage.number} className={`group relative border-b border-[#183126]/10 py-5 pl-8 sm:py-6 lg:grid lg:grid-cols-[190px_1fr_40px] lg:items-center lg:gap-5 ${index === qualityCycle.length - 1 ? 'border-b-0' : ''}`}>
                    <span className="absolute -left-[17px] top-5 grid h-8 w-8 place-items-center rounded-full border border-[#9b7a32]/60 bg-white font-mono text-[9px] font-bold text-[#9b7a32] transition-colors group-hover:bg-[#183126] group-hover:text-white sm:top-6">
                      {stage.number}
                    </span>
                    <h3 className="text-sm font-black uppercase tracking-[0.08em]">{stage.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-[#657067] lg:mt-0 lg:text-sm">{stage.detail}</p>
                    <Icon className="absolute right-0 top-5 hidden h-5 w-5 text-[#9b7a32]/70 lg:block" />
                  </li>
                );
              })}
            </ol>

            <aside className="h-fit bg-[#ebe7db] p-5 sm:p-7 lg:sticky lg:top-8">
              <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#9b7a32]">Before the order moves forward</p>
              <h3 className="mt-3 text-2xl font-black leading-tight tracking-[-0.04em]">Set the scope together.</h3>
              <p className="mt-3 text-xs leading-6 text-[#657067]">
                The intended application and destination help shape which specifications, checks and records to discuss.
              </p>
              <div className="mt-5 border-t border-[#183126]/15">
                {[
                  ['01', 'Product requirements'],
                  ['02', 'Destination market'],
                  ['03', 'Pack and order details']
                ].map(([number, label]) => (
                  <div key={number} className="flex items-center gap-3 border-b border-[#183126]/15 py-3">
                    <span className="font-mono text-[9px] font-bold text-[#9b7a32]">{number}</span>
                    <span className="text-xs font-bold">{label}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => openQuoteModal()} className="mt-5 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.12em] hover:text-[#9b7a32]">
                Share your brief <ArrowUpRight className="h-4 w-4" />
              </button>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-[#183126] text-[#f4f1e8]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
          <div className="mb-8 flex flex-col gap-4 border-b border-white/15 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4ad49]">Testing & records / Order-specific</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black leading-[0.97] tracking-[-0.05em] sm:text-4xl">Make the requirements clear up front.</h2>
            </div>
            <p className="max-w-sm text-xs leading-6 text-white/55">Testing and documentation are discussed and confirmed for each order.</p>
          </div>
          <div className="grid border-l border-t border-white/15 sm:grid-cols-3">
            {reviewAreas.map((area) => (
              <article key={area.number} className="border-b border-r border-white/15 p-5 sm:p-6 lg:p-8">
                <p className="font-serif text-3xl italic text-[#d4ad49]">{area.number}</p>
                <h3 className="mt-6 text-sm font-black uppercase tracking-[0.08em]">{area.title}</h3>
                <p className="mt-3 text-xs leading-6 text-white/60">{area.detail}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#d4ad49]" />
              <p className="max-w-xl text-xs leading-5 text-white/65">
                The facility credential shown is the FSSAI license. Additional tests and supporting documents are agreed per order.
              </p>
            </div>
            <button onClick={() => openQuoteModal()} className="inline-flex items-center justify-between gap-8 bg-[#d4ad49] px-5 py-4 text-[9px] font-black uppercase tracking-[0.12em] text-[#183126] transition hover:bg-[#e2c36d]">
              Request a quote <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
