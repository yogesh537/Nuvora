import React from 'react';
import {
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
    title: 'Product checks',
    detail: 'Agree the relevant appearance, aroma, moisture and particle-size criteria for the product specification.'
  },
  {
    number: '02',
    title: 'Testing needs',
    detail: 'Discuss microbiological, residue or contaminant tests based on the ingredient and destination market.'
  },
  {
    number: '03',
    title: 'Order records',
    detail: 'Confirm the batch information and supporting documents needed for the specific order.'
  }
];

export default function QualityCertificationsPage() {
  const { openQuoteModal } = useLeads();
  const showcaseProduct = products.find((product) => product.id === 'ginger-powder') || products[0];

  return (
    <div className="min-h-screen bg-[#f4f1e8] text-[#183126]">
      <section className="relative overflow-hidden bg-[#183126] text-[#f4f1e8]">
        <div className="pointer-events-none absolute -left-44 -top-40 h-[34rem] w-[34rem] rounded-full border border-white/[0.07]" />
        <div className="pointer-events-none absolute -left-24 -top-20 h-[25rem] w-[25rem] rounded-full border border-[#d4ad49]/20" />
        <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:min-h-[640px] lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-16 lg:px-12 lg:py-16">
          <div className="relative z-10">
            <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#d4ad49]">
              <span className="h-px w-8 bg-[#d4ad49]" /> Quality assurance / From lot to label
            </p>
            <h1 className="mt-7 max-w-3xl text-[clamp(3.2rem,7vw,6.6rem)] font-black leading-[0.84] tracking-[-0.075em]">
              Quality,
              <br />
              <span className="font-serif font-medium italic text-[#d4ad49]">made visible.</span>
            </h1>
            <p className="mt-7 max-w-xl border-l border-white/25 pl-5 text-sm leading-7 text-white/70 sm:text-base">
              Follow the decisions from incoming ingredient to finished pack. Process details, checks and documentation are agreed around the product, order and destination.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => openQuoteModal()} className="inline-flex items-center gap-3 bg-[#d4ad49] px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#183126] transition hover:bg-[#e2c36d]">
                Discuss your requirements <ArrowRight className="h-4 w-4" />
              </button>
              <a href="#quality-cycle" className="inline-flex items-center gap-2 border border-white/35 px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.12em] text-white transition hover:bg-white/10">
                Explore the process <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-9 flex items-center gap-3 border-t border-white/15 pt-5">
              <ShieldCheck className="h-5 w-5 shrink-0 text-[#d4ad49]" />
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.14em] text-white/50">Facility credential</p>
                <p className="mt-1 text-xs font-bold text-white">FSSAI license</p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[350px] overflow-hidden bg-[#756e5b] sm:min-h-[470px] lg:min-h-[520px]">
            <img src={showcaseProduct.image} alt={showcaseProduct.imageAlt || showcaseProduct.name} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10231a]/85 via-[#10231a]/10 to-[#10231a]/10" />
            <div className="absolute left-4 top-4 border border-white/35 bg-[#183126]/75 px-3 py-2 text-[8px] font-black uppercase tracking-[0.15em] text-white backdrop-blur-sm sm:left-6 sm:top-6 sm:text-[9px]">
              Illustrative ingredient image
            </div>
            <div className="absolute inset-x-4 bottom-4 border border-white/20 bg-[#183126]/90 p-4 backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:p-5">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.16em] text-[#d4ad49]">The quality conversation</p>
                  <p className="mt-2 text-lg font-black text-white sm:text-xl">{showcaseProduct.name}</p>
                  <p className="mt-1 text-[10px] text-white/60">Product requirements / checks / order documents</p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center border border-white/20 text-[#d4ad49]">
                  <BadgeCheck className="h-5 w-5" />
                </span>
              </div>
              {showcaseProduct.imageCredit && (
                <a href={showcaseProduct.imageCreditUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-[8px] text-white/60 underline underline-offset-2 hover:text-white">
                  Photo: {showcaseProduct.imageCredit}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="quality-cycle" className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mb-9 flex flex-col justify-between gap-5 border-b border-[#183126]/15 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9b7a32]">01 / Process flow</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black leading-[0.97] tracking-[-0.05em] sm:text-5xl">From raw ingredient to ready pack.</h2>
          </div>
          <p className="max-w-md text-xs leading-6 text-[#657067]">
            A practical sequence for discussing preparation, processing, quality review and packing. Exact controls depend on the ingredient and agreed specification.
          </p>
        </div>

        <div className="grid border-l border-t border-[#183126]/15 sm:grid-cols-2 lg:grid-cols-3">
          {qualityCycle.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <article key={stage.number} className={`group relative min-h-[230px] overflow-hidden border-b border-r border-[#183126]/15 p-5 transition-colors hover:bg-white sm:p-7 ${index === 5 ? 'bg-[#e9e3d3]' : 'bg-[#f8f6ef]'}`}>
                <div className="flex items-start justify-between">
                  <span className="font-serif text-3xl italic text-[#9b7a32]">{stage.number}</span>
                  <span className="grid h-10 w-10 place-items-center border border-[#183126]/15 text-[#183126]/60 transition-colors group-hover:border-[#9b7a32]/50 group-hover:text-[#9b7a32]">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mt-8 text-base font-black tracking-[-0.02em] sm:text-lg">{stage.title}</h3>
                <p className="mt-2 max-w-sm text-xs leading-6 text-[#657067]">{stage.detail}</p>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#9b7a32] transition-all duration-500 group-hover:w-full" />
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[#183126]/15 bg-[#ebe7db]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-16">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9b7a32]">02 / Test & record</p>
              <h2 className="mt-3 max-w-sm text-3xl font-black leading-[0.97] tracking-[-0.05em] sm:text-4xl">Agree the quality scope before the order.</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-[#657067]">
                Share your target market and product requirements. We’ll confirm which checks and supporting documents can be provided for the specific order.
              </p>
            </div>
            <button onClick={() => openQuoteModal()} className="mt-7 inline-flex w-fit items-center gap-2 border-b border-[#183126] pb-2 text-[10px] font-black uppercase tracking-[0.16em] transition hover:text-[#9b7a32]">
              Share your requirements <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <div className="divide-y divide-[#183126]/15 border-y border-[#183126]/15">
            {reviewAreas.map((area) => (
              <article key={area.number} className="grid gap-3 py-5 sm:grid-cols-[150px_1fr] sm:gap-6">
                <p className="text-[10px] font-black uppercase tracking-[0.12em]">
                  <span className="mr-2 font-mono text-[#9b7a32]">{area.number}</span>{area.title}
                </p>
                <p className="text-sm leading-6 text-[#657067]">{area.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="relative overflow-hidden bg-[#183126] p-6 text-[#f4f1e8] sm:p-9 lg:p-12">
          <div className="pointer-events-none absolute -right-10 -top-28 h-72 w-72 rounded-full border border-white/10" />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex items-start gap-4">
              <ShieldCheck className="mt-1 h-7 w-7 shrink-0 text-[#d4ad49]" />
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#d4ad49]">Facility credential</p>
                <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] sm:text-3xl">FSSAI licensed</h2>
                <p className="mt-2 font-mono text-[10px] text-white/55">License no. 10020021008942</p>
                <p className="mt-3 max-w-2xl text-xs leading-6 text-white/60">
                  This is the facility credential shown here. Any additional tests and supporting documents are discussed and confirmed per order.
                </p>
              </div>
            </div>
            <button onClick={() => openQuoteModal()} className="inline-flex items-center justify-between gap-8 border border-white/25 px-5 py-4 text-[9px] font-black uppercase tracking-[0.12em] text-white transition hover:border-[#d4ad49] hover:text-[#d4ad49]">
              Request a quote <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
