import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, BadgeCheck, ClipboardList, FileCheck2, PackageCheck } from 'lucide-react';
import { useLeads } from '../context/LeadContext';
import { products } from '../data/products';

const heroProducts = [...new Set(products.map((product) => product.category))]
  .map((category) => products.find((product) => product.category === category))
  .filter(Boolean);
const initialHeroIndex = Math.max(0, heroProducts.findIndex((product) => product.id === 'beetroot-powder'));

const orderSteps = [
  {
    icon: ClipboardList,
    title: 'Share the brief',
    detail: 'Tell us the product, application, target volume and destination.'
  },
  {
    icon: FileCheck2,
    title: 'Confirm product fit',
    detail: 'Review the available specification and discuss any changes.'
  },
  {
    icon: BadgeCheck,
    title: 'Agree quality scope',
    detail: 'Confirm requested checks and documents for the specific order.'
  },
  {
    icon: PackageCheck,
    title: 'Quote and pack',
    detail: 'Align on quantity, packaging and delivery details before production.'
  }
];

const questions = [
  {
    question: 'What is the minimum order quantity?',
    answer: 'MOQ varies by product and packaging. The current quantity is confirmed with your quotation.'
  },
  {
    question: 'Can I request a product sample?',
    answer: 'Sample availability, quantity, shipping and accompanying documents are confirmed for each request.'
  },
  {
    question: 'Which quality documents are available?',
    answer: 'The facility holds an FSSAI license. Product specifications, batch documents and additional tests are discussed and confirmed per order.'
  },
  {
    question: 'Do you support private label packing?',
    answer: 'Share your preferred pack format and label needs in the inquiry. Options are confirmed against product and order requirements.'
  }
];

export default function HomePage({ onSelectProduct, onSelectCategory }) {
  const { openQuoteModal } = useLeads();
  const [heroProductIndex, setHeroProductIndex] = useState(initialHeroIndex);
  const [heroImageVisible, setHeroImageVisible] = useState(true);
  const heroProduct = heroProducts[heroProductIndex] || products[0];
  const categories = [...new Set(products.map((product) => product.category))];

  useEffect(() => {
    if (heroProducts.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    heroProducts.forEach((product) => {
      const image = new window.Image();
      image.src = product.image;
    });

    let transitionTimeout;
    const interval = window.setInterval(() => {
      setHeroImageVisible(false);
      transitionTimeout = window.setTimeout(() => {
        setHeroProductIndex((index) => (index + 1) % heroProducts.length);
        setHeroImageVisible(true);
      }, 450);
    }, 5000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(transitionTimeout);
    };
  }, []);

  return (
    <div className="bg-[#f4f1e8] text-[#183126]">
      <section className="bg-[#183126] text-[#f4f1e8]">
        <div className="mx-auto grid max-w-[1440px] lg:min-h-[590px] lg:grid-cols-[1.02fr_0.98fr]">
          <div className="order-2 flex flex-col justify-center px-5 pb-10 pt-8 sm:px-8 lg:order-1 lg:px-12 lg:py-16">
            <p className="border-l-2 border-[#d4ad49] pl-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#d4ad49] sm:text-[11px]">
              B2B ingredient supply
            </p>
            <h1 className="mt-6 max-w-2xl text-[clamp(2.7rem,5.6vw,5.8rem)] font-black leading-[0.9] tracking-[-0.06em]">
              Dehydrated
              <br />
              <span className="font-serif font-medium italic text-[#d4ad49]">powders for</span>
              <br />
              production.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              Vegetable, spice, fruit and botanical ingredients for food, beverage and wellness manufacturers. Browse the listed range or send us a product brief for a bulk quote.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => onSelectProduct()}
                className="inline-flex items-center gap-3 bg-[#d4ad49] px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#183126] transition hover:bg-[#e2c36d]"
              >
                Browse products <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => openQuoteModal()}
                className="inline-flex items-center gap-2 border border-white/35 px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.14em] text-white transition hover:border-white hover:bg-white/10"
              >
                Request a bulk quote <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/15 pt-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/65">
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-[#d4ad49]" /> FSSAI facility license
              </span>
              <span>Product documents agreed per order</span>
            </div>
          </div>

          <div className="order-1 min-h-[240px] overflow-hidden bg-[#756e5b] sm:min-h-[330px] lg:order-2 lg:min-h-0">
            <div className="relative h-full min-h-[240px] sm:min-h-[330px] lg:min-h-[590px]">
              <img
                src={heroProduct.image}
                alt={heroProduct.imageAlt || heroProduct.name}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${heroImageVisible ? 'opacity-100' : 'opacity-0'}`}
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10231a]/80 via-transparent to-[#10231a]/10" />
              <div className="absolute left-5 top-5 border border-white/40 bg-[#183126]/75 px-3 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-sm sm:left-8 sm:top-8">
                Product range / {String(products.length).padStart(2, '0')} listed
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 sm:p-8">
                <div className={`transition-opacity duration-300 ${heroImageVisible ? 'opacity-100' : 'opacity-0'}`}>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/65">{heroProduct.category}</p>
                  <p className="mt-1 text-xl font-black text-white sm:text-2xl">{heroProduct.name}</p>
                  {heroProduct.imageCredit && (
                    <a href={heroProduct.imageCreditUrl} target="_blank" rel="noreferrer" className="mt-1 inline-block text-[8px] text-white/65 underline underline-offset-2 hover:text-white">
                      Photo: {heroProduct.imageCredit}
                    </a>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onSelectProduct(heroProduct)}
                  className="grid h-11 w-11 shrink-0 place-items-center border border-white/50 text-white transition hover:bg-white hover:text-[#183126]"
                  aria-label={`View ${heroProduct.name}`}
                >
                  <ArrowUpRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#183126]/15 bg-[#ebe7db]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#7d6c53]">Browse by product group</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className="text-[10px] font-bold text-[#183126] underline decoration-[#9b7a32]/50 underline-offset-4 transition hover:text-[#9b7a32]"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mb-6 flex flex-col gap-4 border-b border-[#183126]/20 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9b7a32]">Product catalog / 01—{String(products.length).padStart(2, '0')}</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] sm:text-4xl">Powders in the current range</h2>
          </div>
          <p className="max-w-md text-xs leading-5 text-[#657067] sm:text-sm">
            Explore product applications. Request a quote to discuss specifications, quantity and packaging.
          </p>
        </div>

        <div className="hidden grid-cols-[minmax(240px,1.1fr)_180px_minmax(250px,1.3fr)_auto] gap-5 border-b border-[#183126]/15 px-3 py-3 text-[9px] font-black uppercase tracking-[0.16em] text-[#7d6c53] md:grid">
          <span>Ingredient</span>
          <span>Product group</span>
          <span>Example application</span>
          <span className="text-right">Inquiry</span>
        </div>

        <div>
          {products.slice(0, 6).map((product, index) => (
            <article
              key={product.id}
              className="grid gap-3 border-b border-[#183126]/15 py-4 sm:grid-cols-[minmax(0,1.1fr)_180px_minmax(0,1.3fr)_auto] sm:items-center sm:gap-5 sm:px-3"
            >
              <button
                type="button"
                onClick={() => onSelectProduct(product)}
                className="flex items-center gap-3 text-left"
              >
                <span className="hidden w-7 font-mono text-[10px] text-[#9b7a32] sm:block">{String(index + 1).padStart(2, '0')}</span>
                <img src={product.image} alt="" loading="lazy" className="h-12 w-12 shrink-0 object-cover sm:h-14 sm:w-14" />
                <span>
                  <span className="block text-sm font-bold text-[#183126]">{product.name}</span>
                  <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.12em] text-[#7d6c53] sm:hidden">{product.category}</span>
                </span>
              </button>
              <span className="hidden text-xs font-medium text-[#657067] sm:block">{product.category}</span>
              <div className="pl-[60px] sm:pl-0">
                <p className="text-[10px] leading-5 text-[#657067] sm:text-xs">{product.applications[0]}</p>
                {product.imageCredit && (
                  <a href={product.imageCreditUrl} target="_blank" rel="noreferrer" className="mt-1 inline-block text-[8px] text-[#657067] underline underline-offset-2">
                    Photo: {product.imageCredit}
                  </a>
                )}
              </div>
              <button
                type="button"
                onClick={() => openQuoteModal(product)}
                className="ml-[60px] inline-flex items-center gap-2 self-start border-b border-[#183126]/30 pb-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#183126] transition hover:border-[#9b7a32] hover:text-[#9b7a32] sm:ml-0 sm:self-auto"
              >
                Request quote <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </article>
          ))}
        </div>

        <button
          onClick={() => onSelectProduct()}
          className="mt-6 inline-flex items-center gap-2 border-b-2 border-[#183126] pb-2 text-[10px] font-black uppercase tracking-[0.14em] transition hover:border-[#9b7a32] hover:text-[#9b7a32]"
        >
          View all {products.length} products <ArrowRight className="h-4 w-4" />
        </button>
      </section>

      <section className="bg-[#ebe7db]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:px-12 lg:py-20">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9b7a32]">How an inquiry moves forward</p>
            <h2 className="mt-3 max-w-xl text-3xl font-black leading-[1.02] tracking-[-0.045em] sm:text-4xl">
              Clear details before production begins.
            </h2>
            <div className="mt-8 border-t border-[#183126]/20">
              {orderSteps.map(({ icon: Icon, title, detail }, index) => (
                <div key={title} className="grid grid-cols-[34px_1fr] gap-3 border-b border-[#183126]/20 py-4 sm:grid-cols-[48px_1fr] sm:gap-4">
                  <span className="font-mono text-[10px] font-bold text-[#9b7a32]">0{index + 1}</span>
                  <div className="flex gap-3">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#183126]" />
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-[0.08em]">{title}</h3>
                      <p className="mt-1 text-xs leading-5 text-[#657067]">{detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="flex flex-col justify-between bg-[#183126] p-6 text-[#f4f1e8] sm:p-8 lg:p-10">
            <div>
              <BadgeCheck className="h-7 w-7 text-[#d4ad49]" />
              <p className="mt-7 text-[10px] font-black uppercase tracking-[0.18em] text-[#d4ad49]">Facility credential</p>
              <h3 className="mt-2 text-3xl font-black tracking-[-0.04em]">FSSAI licensed</h3>
              <p className="mt-2 font-mono text-xs text-white/65">License no. 10020021008942</p>
              <p className="mt-6 max-w-md text-sm leading-6 text-white/70">
                Product specifications, sample availability, test scope and supporting documents are discussed and confirmed for each order.
              </p>
            </div>
            <button
              onClick={() => openQuoteModal()}
              className="mt-10 inline-flex w-full items-center justify-between border-t border-white/20 pt-4 text-left text-[10px] font-black uppercase tracking-[0.14em] text-white transition hover:text-[#d4ad49]"
            >
              Send your product brief <ArrowUpRight className="h-5 w-5" />
            </button>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9b7a32]">Sourcing questions</p>
            <h2 className="mt-3 text-3xl font-black leading-[1.02] tracking-[-0.045em] sm:text-4xl">Useful details, upfront.</h2>
            <button
              onClick={() => openQuoteModal()}
              className="mt-6 inline-flex items-center gap-2 border-b border-[#183126] pb-2 text-[10px] font-black uppercase tracking-[0.12em] hover:text-[#9b7a32]"
            >
              Ask about a product <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="border-t border-[#183126]/20">
            {questions.map(({ question, answer }) => (
              <details key={question} className="group border-b border-[#183126]/20 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-[#183126] marker:hidden">
                  {question}
                  <span className="font-mono text-lg font-normal text-[#9b7a32] group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pt-3 text-xs leading-6 text-[#657067]">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
