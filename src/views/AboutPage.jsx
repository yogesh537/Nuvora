import React from 'react';
import { ArrowRight, ArrowUpRight, BadgeCheck, Building2, Leaf, PackageCheck, Sprout, UsersRound, ShieldCheck } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export default function AboutPage({ onExploreProducts, onOpenQuote }) {
  const { products } = useProducts();
  const categories = [...new Set(products.map((product) => product.category))];
  const featuredProduct = products.find((product) => product.id === 'ginger-powder') || products[0];

  const approach = [
    {
      number: '01',
      title: 'Direct Farm Sourcing',
      text: 'Direct contract farming partnerships in fertile agricultural regions across Gujarat and Maharashtra, ensuring complete pesticide control and traceability.',
      icon: Sprout
    },
    {
      number: '02',
      title: 'Precision Dehydration & Milling',
      text: 'Hygienic processing using low-temperature drying methods that preserve natural aroma, active volatile oils, and vibrant pigmentation.',
      icon: Leaf
    },
    {
      number: '03',
      title: 'Comprehensive Quality Scope',
      text: 'Full batch documentation, FSSAI compliance, steam sterilization, and independent laboratory testing before palletized export dispatch.',
      icon: PackageCheck
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans">
      {/* Light Theme Page Header */}
      <section className="border-b border-stone-200 bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-6 sm:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-4">
              <span>Direct Processor Supply</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-900 leading-[1.08]">
              Dehydrated Ingredients
              <br />
              <span className="text-amber-700">Manufactured with Intent.</span>
            </h1>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-stone-600 max-w-xl">
              Nuvaro Agro is an Indian processor and bulk exporter of dehydrated vegetable, spice, and botanical powders. We supply enterprise food manufacturers, snack blenders, and nutraceutical brands across 20+ countries.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onExploreProducts}
                className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-stone-800"
              >
                <span>Browse Ingredients Catalog</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-6 py-3.5 text-xs sm:text-sm font-semibold text-stone-800 transition hover:border-[#D5AA37]"
              >
                <span>Contact Sourcing Team</span>
                <ArrowUpRight className="h-4 w-4 text-[#D5AA37]" />
              </button>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 border-t border-stone-200 pt-6">
              <div>
                <p className="text-3xl font-bold text-stone-900">{String(products.length).padStart(2, '0')}</p>
                <p className="mt-1 text-xs font-semibold text-stone-500 uppercase tracking-wider">Listed Powders</p>
              </div>
              <div className="border-l border-stone-200 pl-6">
                <p className="text-3xl font-bold text-stone-900">{String(categories.length).padStart(2, '0')}</p>
                <p className="mt-1 text-xs font-semibold text-stone-500 uppercase tracking-wider">Product Groups</p>
              </div>
              <div className="border-l border-stone-200 pl-6">
                <p className="text-3xl font-bold text-stone-900">100%</p>
                <p className="mt-1 text-xs font-semibold text-stone-500 uppercase tracking-wider">Traceable Supply</p>
              </div>
            </div>
          </div>

          {/* Right Sourcing Showcase */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-xl">
            <img
              src="/images/powders/hero-beetroot-exact.jpg"
              alt="Harvested spices"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="rounded-md bg-stone-900/80 px-2.5 py-1 text-xs font-bold">
                Farm to Facility Processing
              </span>
              <p className="mt-1 text-xs text-white/90">
                Direct export supply with verified FSSAI facility license No. 10020021008942.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars of Processing */}
      <section className="mx-auto max-w-[1440px] px-6 sm:px-12 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700">How We Operate</span>
          <h2 className="text-3xl font-bold text-stone-900 mt-2">
            The Nuvaro Processing Standard
          </h2>
          <p className="mt-3 text-sm text-stone-600">
            From soil testing at partner farms to nitrogen-flushed container release.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {approach.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="rounded-2xl border border-stone-200 bg-white p-8 shadow-xs">
                <span className="font-mono text-xs font-bold text-amber-700 block mb-4">{step.number}</span>
                <Icon className="h-8 w-8 text-stone-900 mb-4" />
                <h3 className="text-lg font-bold text-stone-900">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-stone-600">{step.text}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
