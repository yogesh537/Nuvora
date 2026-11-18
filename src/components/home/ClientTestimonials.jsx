import React from 'react';
import { clientTestimonials } from '../../data/products';
import { Quote, Star } from 'lucide-react';

export default function ClientTestimonials() {
  return (
    <section className="bg-white py-14 lg:py-18">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A762F]">Trusted partnerships</span>
            <h2 className="text-2xl font-semibold tracking-tight text-[#1F4D36] sm:text-3xl">What our customers say</h2>
            <p className="mt-2 text-xs text-stone-500 sm:text-sm">Stories from food, wellness and ingredient teams.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {clientTestimonials.map((testimonial) => (
            <article key={testimonial.id} className="flex flex-col rounded-xl border border-[#E8E8DE] bg-[#F7F7F0] p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }, (_, index) => (
                    <Star key={index} className="h-3.5 w-3.5 fill-[#C9972B] text-[#C9972B]" />
                  ))}
                </div>
                <Quote className="h-5 w-5 text-[#1F4D36]/25" />
              </div>
              <blockquote className="flex-1 text-xs leading-6 text-stone-600 sm:text-[13px]">
                “{testimonial.quote}”
              </blockquote>
              <div className="mt-5 border-t border-stone-200 pt-4">
                <p className="text-xs font-semibold text-stone-900">{testimonial.client}</p>
                <p className="mt-1 text-[10px] leading-4 text-stone-500">
                  {testimonial.role} · {testimonial.company}
                </p>
                <p className="mt-1 text-[10px] font-medium text-[#1F4D36]">{testimonial.country}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
