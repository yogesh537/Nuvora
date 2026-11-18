import React from 'react';
import { ArrowDownRight, ArrowUpRight, Factory, FlaskConical, PackageCheck, ShieldCheck } from 'lucide-react';
import { industriesList, products } from '../data/products';

export default function IndustriesPage({ onExploreProducts, onOpenQuote }) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f4f1e8] text-[#183126]">
      <section className="border-b border-[#183126]/15">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[67%_33%]">
            <div className="py-12 lg:min-h-[560px] lg:border-r lg:border-[#183126]/15 lg:pr-12 lg:py-16">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#9b7a32]">Application index</p>
                <span className="hidden h-px w-32 bg-[#183126]/30 sm:block" />
              </div>
              <h1 className="mt-16 max-w-5xl text-[clamp(3.8rem,8vw,8.4rem)] font-black leading-[0.78] tracking-[-0.075em]">
                Built for
                <br />
                <span className="font-serif font-medium italic text-[#9b7a32]">real</span> systems.
              </h1>
              <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-lg border-l border-[#183126]/30 pl-5 text-sm leading-7 text-[#5d665f]">
                  Ingredient programs are different in every industry. Product selection, processing preferences and commercial specifications are discussed in context of intended use.
                </p>
                <button
                  onClick={onExploreProducts}
                  className="group flex shrink-0 items-center gap-5 border-b border-[#183126] pb-2 text-xs font-black uppercase tracking-[0.18em]"
                >
                  View catalog
                  <ArrowDownRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
                </button>
              </div>
            </div>

            <div className="relative hidden lg:flex lg:flex-col lg:justify-end">
              <img
                src={industriesList[0].image}
                alt={industriesList[0].imageAlt}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#183126]/20" />
              {industriesList[0].imageCredit && (
                <a
                  href={industriesList[0].imageCreditUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute right-6 top-6 bg-[#183126]/75 px-2.5 py-1.5 text-[8px] text-white underline underline-offset-2"
                >
                  Photo credit
                </a>
              )}
              <div className="relative m-5 grid grid-cols-2 border border-white/30 bg-[#183126]/75 text-white backdrop-blur-md">
                {[
                  [String(industriesList.length).padStart(2, '0'), 'Segments'],
                  [String(products.length).padStart(2, '0'), 'Listed powders'],
                  ['FSSAI', 'Facility license'],
                  ['Per order', 'Quality scope']
                ].map(([value, label]) => (
                  <div key={label} className="border-b border-r border-white/20 p-5 even:border-r-0">
                    <p className="text-2xl font-black text-[#d4ad49]">{value}</p>
                    <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/65">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mb-8 flex items-end justify-between border-b border-[#183126]/15 pb-5">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#9b7a32]">Industries / Application matrix</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Find your formulation</h2>
          </div>
          <span className="hidden text-xs font-bold text-[#7d6c53] sm:block">{industriesList.length} sectors</span>
        </div>

        <div className="border-l border-t border-[#183126]/15">
          {industriesList.map((industry, index) => (
            <article
              key={industry.name}
              className="group grid border-b border-r border-[#183126]/15 md:grid-cols-[180px_1fr_220px]"
            >
              <div className="relative hidden overflow-hidden md:block">
                <img src={industry.image} alt={industry.imageAlt || industry.name} className="h-full min-h-[180px] w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#183126]/5 transition group-hover:bg-transparent" />
                {industry.imageCredit && (
                  <a
                    href={industry.imageCreditUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-2 left-2 right-2 bg-[#183126]/85 px-2 py-1 text-[8px] leading-3 text-white underline underline-offset-2"
                  >
                    Photo: {industry.imageCredit}
                  </a>
                )}
              </div>

              <div className="flex min-h-[180px] flex-col justify-between p-6 sm:p-8">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#9b7a32]">{industry.eyebrow}</p>
                    <h3 className="mt-3 text-2xl font-black tracking-[-0.03em] sm:text-3xl">{industry.name}</h3>
                  </div>
                  <span className="font-serif text-xl italic text-[#9b7a32]">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <p className="mt-5 max-w-2xl text-sm leading-6 text-[#5d665f]">{industry.description}</p>
              </div>

              <div className="flex flex-col justify-between border-t border-[#183126]/15 p-6 md:border-l md:border-t-0 sm:p-7">
                <div className="flex flex-wrap gap-2">
                  {industry.powders.map((powder) => (
                    <span
                      key={powder}
                      className="border border-[#183126]/20 px-2.5 py-1.5 text-[10px] font-bold text-[#183126]"
                    >
                      {powder}
                    </span>
                  ))}
                </div>
                <button
                  onClick={onOpenQuote}
                  className="mt-6 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.16em]"
                >
                  Discuss use case
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#183126] text-[#f4f1e8]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: FlaskConical, label: 'Specification', text: 'Discuss target particle, moisture and color specifications, along with any required tests, for each use.' },
              { icon: ShieldCheck, label: 'Documentation', text: 'The FSSAI facility license is available; product-specific documents are discussed per order.' },
              { icon: PackageCheck, label: 'Supply', text: 'Quantity, repeat supply and packaging options are confirmed with each quotation.' }
            ].map((item, index) => (
              <div key={item.label} className={`grid grid-cols-[52px_1fr] gap-4 ${index > 0 ? 'border-t border-white/15 pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0' : ''}`}>
                <item.icon className="h-8 w-8 text-[#d4ad49]" />
                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.12em]">{item.label}</h3>
                  <p className="mt-2 text-xs leading-6 text-white/60">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="grid border border-[#183126]/20 lg:grid-cols-[68%_32%]">
          <div className="p-7 sm:p-10">
            <Factory className="h-7 w-7 text-[#9b7a32]" />
            <p className="mt-8 text-[11px] font-black uppercase tracking-[0.22em] text-[#9b7a32]">Technical inquiry</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-[1.05] tracking-[-0.03em] sm:text-5xl">
              Have a specification that needs to be solved?
            </h2>
          </div>
          <button
            onClick={onOpenQuote}
            className="group flex min-h-48 items-end justify-between bg-[#183126] p-7 text-left text-white transition hover:bg-[#244635] sm:p-10"
          >
            <span className="text-sm font-black uppercase tracking-[0.16em]">Talk to technical sales</span>
            <ArrowUpRight className="h-10 w-10 text-[#d4ad49] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
