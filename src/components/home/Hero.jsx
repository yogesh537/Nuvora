import React from 'react';
import { useLeads } from '../../context/LeadContext';
import { ArrowRight, BadgeCheck, MessageCircle } from 'lucide-react';

export default function Hero({ onExploreProducts }) {
  const { openQuoteModal } = useLeads();
  const whatsappUrl = `https://wa.me/919820012345?text=${encodeURIComponent('Hello Nuvaro Agro, I want to inquire about bulk B2B pricing for dehydrated powders.')}`;

  return (
    <section className="relative overflow-hidden bg-[#F7F6F0]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-8 sm:py-16 lg:min-h-[620px] lg:grid-cols-2 lg:gap-14 lg:py-20">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1F4D36]/15 bg-white px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1F4D36] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#C9972B]" />
            Natural ingredients, thoughtfully made
          </div>

          <h1 className="max-w-xl text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.045em] text-stone-950 sm:text-5xl lg:text-[3.65rem]">
            Pure natural powders
            <span className="mt-1 block font-serif font-semibold italic text-[#1F4D36]">
              for vibrant formulations.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-sm leading-7 text-stone-600 sm:text-base">
            Bring color, flavor and function to your next product with carefully sourced vegetable, fruit, spice and botanical powders.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onExploreProducts}
              className="inline-flex items-center gap-2 rounded-lg bg-[#1F4D36] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1F4D36]/15 transition hover:-translate-y-0.5 hover:bg-[#193e2c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F4D36] focus-visible:ring-offset-2"
            >
              Explore our products
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={openQuoteModal}
              className="rounded-lg border border-stone-300 bg-white px-5 py-3.5 text-sm font-semibold text-stone-700 transition hover:border-[#1F4D36] hover:text-[#1F4D36] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F4D36] focus-visible:ring-offset-2"
            >
              Talk to our team
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-stone-200 pt-5 text-xs font-medium text-stone-600 sm:text-sm">
            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-[#1F4D36]" />
              ISO 22000 &amp; HACCP
            </span>
            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-[#1F4D36]" />
              Batch COA support
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[#C9972B]/15 blur-2xl sm:h-48 sm:w-48" />
          <div className="relative overflow-hidden rounded-[1.75rem] bg-[#E4E8DE] shadow-2xl shadow-[#193e2c]/15">
            <img
              src="https://plus.unsplash.com/premium_photo-1774416430699-ca015984fa4f?w=1200&auto=format&fit=crop&q=85"
              alt="Vibrant green botanical powder ready for food and wellness formulations"
              className="h-[320px] w-full object-cover sm:h-[440px] lg:h-[500px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#102b1d]/75 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">Naturally vibrant ingredients</p>
                <p className="mt-1 font-serif text-xl font-semibold sm:text-2xl">Goodness, in every batch.</p>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Message Nuvaro Agro on WhatsApp"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-[#1F4D36] transition hover:scale-105"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="absolute -bottom-4 left-4 hidden items-center gap-3 rounded-xl border border-stone-100 bg-white px-4 py-3 shadow-xl sm:flex lg:-left-7">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#F1F4ED] text-[#1F4D36]">
              <BadgeCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">Quality-led manufacturing</p>
              <p className="mt-0.5 text-[11px] text-stone-500">Specifications for your application</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
