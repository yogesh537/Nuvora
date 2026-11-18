import React from 'react';
import { ArrowRight, ArrowUpRight, BadgeCheck, Building2, ClipboardCheck, Leaf, PackageCheck, Sprout, UsersRound } from 'lucide-react';
import { products } from '../data/products';

const companyImage = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85';

export default function AboutPage({ onExploreProducts, onOpenQuote }) {
  const categories = [...new Set(products.map((product) => product.category))];
  const featuredProduct = products.find((product) => product.id === 'ginger-powder') || products[0];
  const approach = [
    {
      number: '01',
      title: 'Start with the use',
      text: 'Understand the application, destination and the role the ingredient needs to play.',
      icon: Sprout
    },
    {
      number: '02',
      title: 'Review the product',
      text: 'Discuss the listed product data and any specification needs before an order is agreed.',
      icon: Leaf
    },
    {
      number: '03',
      title: 'Confirm the order',
      text: 'Align on quantity, packaging, checks and documents for the specific requirement.',
      icon: PackageCheck
    }
  ];

  return (
    <div className="min-h-screen bg-[#f4f1e8] text-[#183126]">
      <section className="relative overflow-hidden bg-[#183126] text-[#f4f1e8]">
        <div className="pointer-events-none absolute -right-36 -top-40 h-[34rem] w-[34rem] rounded-full border border-white/[0.08]" />
        <div className="pointer-events-none absolute -right-20 -top-24 h-[26rem] w-[26rem] rounded-full border border-[#d4ad49]/20" />
        <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:min-h-[690px] lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:gap-14 lg:px-12 lg:py-16">
          <div className="relative z-10">
            <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#d4ad49]">
              <span className="h-px w-8 bg-[#d4ad49]" /> About Nuvaro Agro
            </p>
            <h1 className="mt-7 max-w-3xl text-[clamp(3.2rem,7vw,6.7rem)] font-black leading-[0.84] tracking-[-0.075em]">
              Ingredients
              <br />
              <span className="font-serif font-medium italic text-[#d4ad49]">with intent.</span>
            </h1>
            <p className="mt-7 max-w-xl border-l border-white/25 pl-5 text-sm leading-7 text-white/70 sm:text-base">
              We supply vegetable, fruit, spice and botanical powders for manufacturers. Every conversation begins with what you are making and the details your order needs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={onExploreProducts} className="inline-flex items-center gap-3 bg-[#d4ad49] px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#183126] transition hover:bg-[#e2c36d]">
                Explore the catalog <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={onOpenQuote} className="inline-flex items-center gap-2 border border-white/35 px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.12em] text-white transition hover:bg-white/10">
                Talk to our team <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 border-t border-white/15 pt-5">
              <div>
                <p className="text-2xl font-black sm:text-3xl">{String(products.length).padStart(2, '0')}</p>
                <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.12em] text-white/55 sm:text-[9px]">Listed ingredients</p>
              </div>
              <div className="border-l border-white/15 pl-4 sm:pl-6">
                <p className="text-2xl font-black sm:text-3xl">{String(categories.length).padStart(2, '0')}</p>
                <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.12em] text-white/55 sm:text-[9px]">Product groups</p>
              </div>
              <div className="border-l border-white/15 pl-4 sm:pl-6">
                <p className="text-2xl font-black sm:text-3xl">01</p>
                <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.12em] text-white/55 sm:text-[9px]">Facility license</p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden bg-[#756e5b] sm:min-h-[500px] lg:min-h-[570px]">
            <img src={companyImage} alt="Agricultural fields" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10231a]/75 via-[#10231a]/10 to-[#10231a]/5" />
            <div className="absolute left-4 top-4 border border-white/35 bg-[#183126]/75 px-3 py-2 text-[8px] font-black uppercase tracking-[0.15em] text-white backdrop-blur-sm sm:left-6 sm:top-6 sm:text-[9px]">
              From ingredient to application
            </div>
            <div className="absolute inset-x-4 bottom-4 grid grid-cols-[76px_1fr] items-center gap-4 border border-white/20 bg-[#183126]/90 p-3 backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:grid-cols-[96px_1fr] sm:gap-5 sm:p-4">
              <img src={featuredProduct.image} alt={featuredProduct.imageAlt || featuredProduct.name} className="h-20 w-[76px] object-cover sm:h-24 sm:w-24" />
              <div className="min-w-0">
                <p className="text-[8px] font-black uppercase tracking-[0.16em] text-[#d4ad49]">A look at the range</p>
                <p className="mt-1 truncate text-sm font-black text-white sm:text-base">{featuredProduct.name}</p>
                <p className="mt-1 text-[9px] text-white/60">{featuredProduct.category}</p>
                {featuredProduct.imageCredit && (
                  <a href={featuredProduct.imageCreditUrl} target="_blank" rel="noreferrer" className="mt-1 inline-block text-[8px] text-white/60 underline underline-offset-2 hover:text-white">
                    Photo: {featuredProduct.imageCredit}
                  </a>
                )}
              </div>
              <span className="absolute right-3 top-3 font-mono text-[8px] text-white/40 sm:right-4 sm:top-4">01 / {String(products.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#183126]/15 bg-[#ebe7db]">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-12 lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#9b7a32]">Company / Nuvaro Agro</p>
            <h2 className="mt-4 max-w-xl text-4xl font-black leading-[0.94] tracking-[-0.055em] sm:text-5xl">
              An ingredient partner for businesses that make things.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#59635b]">
              Nuvaro Agro is an India-based B2B supplier of dehydrated vegetable, spice, fruit and botanical powders. We work with manufacturers and product teams to discuss ingredient fit, intended use and order requirements.
            </p>
          </div>
          <div className="grid border-l border-t border-[#183126]/20 sm:grid-cols-3">
            {[
              {
                icon: Building2,
                label: 'What we supply',
                detail: `${products.length} listed ingredients across ${categories.length} product groups.`
              },
              {
                icon: UsersRound,
                label: 'Who we work with',
                detail: 'Manufacturers and product teams across food, beverage and botanical applications.'
              },
              {
                icon: ClipboardCheck,
                label: 'How we work',
                detail: 'Specifications, packaging, checks and documents are discussed per inquiry.'
              }
            ].map(({ icon: Icon, label, detail }, index) => (
              <article key={label} className={`flex min-h-[190px] flex-col justify-between border-b border-r border-[#183126]/20 bg-[#f4f1e8] p-5 sm:p-6 ${index === 0 ? 'sm:col-span-3 sm:min-h-0 sm:flex-row sm:items-center sm:gap-6' : ''}`}>
                <div className={`flex items-center justify-between ${index === 0 ? 'sm:gap-6' : ''}`}>
                  <Icon className="h-5 w-5 text-[#9b7a32]" />
                  <span className="font-mono text-[9px] text-[#9b7a32]">0{index + 1}</span>
                </div>
                <div className={index === 0 ? 'sm:flex-1' : 'mt-8'}>
                  <h3 className="text-xs font-black uppercase tracking-[0.12em]">{label}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#657067]">{detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:px-12 lg:py-20">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#9b7a32]">A practical approach</p>
          <h2 className="mt-4 max-w-md text-4xl font-black leading-[0.93] tracking-[-0.055em] sm:text-5xl">
            Good supply starts with a clear brief.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-[#657067]">
            We work with product teams to connect an ingredient choice to the application, specification and order details that matter to them.
          </p>
        </div>
        <div className="border-t border-[#183126]/20">
          {approach.map(({ number, title, text, icon: Icon }) => (
            <article key={number} className="group grid grid-cols-[44px_1fr] gap-4 border-b border-[#183126]/20 py-5 sm:grid-cols-[64px_1fr] sm:gap-6 sm:py-6">
              <span className="font-serif text-2xl italic text-[#9b7a32]">{number}</span>
              <div className="flex items-start gap-4">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#183126]/60 transition-colors group-hover:text-[#9b7a32]" />
                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.06em]">{title}</h3>
                  <p className="mt-2 max-w-xl text-xs leading-6 text-[#657067]">{text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#183126]/15 bg-[#ebe7db]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
          <div className="flex flex-col gap-4 border-b border-[#183126]/20 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#9b7a32]">The current range / {String(products.length).padStart(2, '0')} ingredients</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] sm:text-4xl">Four groups, a world of uses.</h2>
            </div>
            <button onClick={onExploreProducts} className="inline-flex w-fit items-center gap-2 border-b border-[#183126] pb-1 text-[9px] font-black uppercase tracking-[0.12em] transition hover:text-[#9b7a32]">
              View all listed products <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid border-l border-t border-[#183126]/15 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => {
              const items = products.filter((product) => product.category === category);
              const representative = items[0];
              return (
                <article key={category} className="group border-b border-r border-[#183126]/15 bg-[#f4f1e8]">
                  <div className="relative h-40 overflow-hidden bg-[#756e5b]">
                    <img src={representative.image} alt={representative.imageAlt || representative.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#10231a]/75 to-transparent" />
                    <span className="absolute bottom-3 left-4 right-4 text-xs font-black text-white">{category}</span>
                    {representative.imageCredit && (
                      <a href={representative.imageCreditUrl} target="_blank" rel="noreferrer" className="absolute right-3 top-3 max-w-[calc(100%-1.5rem)] bg-[#183126]/85 px-2 py-1 text-right text-[7px] leading-3 text-white underline underline-offset-2">
                        Photo: {representative.imageCredit}
                      </a>
                    )}
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="font-mono text-[9px] text-[#9b7a32]">{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')} products</p>
                    <p className="mt-2 text-[10px] leading-5 text-[#657067]">{items.map((product) => product.name).join(' · ')}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="relative overflow-hidden bg-[#183126] p-6 text-[#f4f1e8] sm:p-9 lg:p-12">
          <div className="pointer-events-none absolute -right-10 -top-28 h-72 w-72 rounded-full border border-white/10" />
          <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.15em] text-[#d4ad49]">
                <BadgeCheck className="h-4 w-4" /> Facility credential
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] sm:text-3xl">FSSAI licensed facility</h2>
              <p className="mt-2 max-w-2xl text-xs leading-6 text-white/60">
                Additional quality checks and supporting documents are discussed and confirmed for each product and order.
              </p>
            </div>
            <button onClick={onOpenQuote} className="inline-flex items-center justify-between gap-8 border border-white/25 px-5 py-4 text-[9px] font-black uppercase tracking-[0.12em] text-white transition hover:border-[#d4ad49] hover:text-[#d4ad49]">
              Start an inquiry <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
