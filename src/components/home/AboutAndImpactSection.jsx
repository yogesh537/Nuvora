import React from 'react';
import { 
  FlaskConical, 
  ShieldCheck, 
  Users, 
  Package, 
  Headphones, 
  Award,
  Sparkles
} from 'lucide-react';

export default function AboutAndImpactSection() {
  return (
    <section id="about-section" className="py-14 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ======================================================== */}
          {/* LEFT CARD: About Us (Exact layout from Image 1 & 5)      */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#E8E4DA] shadow-card flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#183D28] font-sans">
                ABOUT US
              </span>

              <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#183D28] leading-tight">
                Ingredient supply, shaped around your application.
              </h2>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Nuvaro Agro supplies dehydrated vegetable, fruit, herbal, and spice powders for food, beverage, and wellness brands. Our work connects selected ingredients with clear specifications, order-specific quality checks and responsive B2B support.
              </p>

              {/* 3 Micro Icons Strip */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-stone-200/60">
                <div className="text-center sm:text-left">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#183D28] shadow-2xs mb-1 mx-auto sm:mx-0">
                    <FlaskConical className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-stone-900 block leading-tight">Application-led</span>
                  <span className="text-[10px] text-stone-500">Start with product use</span>
                </div>

                <div className="text-center sm:text-left">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#183D28] shadow-2xs mb-1 mx-auto sm:mx-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-stone-900 block leading-tight">FSSAI Licensed</span>
                  <span className="text-[10px] text-stone-500">FSSAI facility license</span>
                </div>

                <div className="text-center sm:text-left">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#183D28] shadow-2xs mb-1 mx-auto sm:mx-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-stone-900 block leading-tight">Customer Focused</span>
                  <span className="text-[10px] text-stone-500">Custom B2B Solutions</span>
                </div>
              </div>
            </div>

            {/* Image of Powders on Stone Plinth with Leaves */}
            <div className="mt-6 rounded-2xl overflow-hidden h-48 sm:h-56 bg-stone-200">
              <img
                src="https://images.unsplash.com/photo-1611255944156-2c324e4c5a23?auto=format&fit=crop&w=1000&q=80"
                alt="Open jars of natural spice powders"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT CARD: Our Impact in Numbers (Image 1 & 5)           */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#E8E4DA] shadow-card flex flex-col justify-between">
            <div className="text-center sm:text-left mb-6">
              <h3 className="text-2xl font-serif font-extrabold text-[#183D28]">
                Product & Service Overview
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Product range, facility license and order-specific support.
              </p>
            </div>

            {/* 4 Metric Boxes Grid (Exact UI from Reference Screenshot 1 & 5) */}
            <div className="grid grid-cols-2 gap-4 my-auto">
              
              <div className="bg-white p-5 rounded-2xl border border-[#E8E4DA] text-center shadow-2xs flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#183D28] mb-2">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-2xl font-extrabold font-sans text-stone-900">FSSAI</div>
                <div className="text-xs text-stone-500 font-medium mt-0.5">Facility License</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E8E4DA] text-center shadow-2xs flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#183D28] mb-2">
                  <Package className="w-5 h-5" />
                </div>
                <div className="text-2xl font-extrabold font-sans text-stone-900">{products.length}</div>
                <div className="text-xs text-stone-500 font-medium mt-0.5">Listed Products</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E8E4DA] text-center shadow-2xs flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#183D28] mb-2">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-2xl font-extrabold font-sans text-stone-900">By order</div>
                <div className="text-xs text-stone-500 font-medium mt-0.5">Quality Checks</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E8E4DA] text-center shadow-2xs flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#183D28] mb-2">
                  <Headphones className="w-5 h-5" />
                </div>
                <div className="text-2xl font-extrabold font-sans text-stone-900">B2B</div>
                <div className="text-xs text-stone-500 font-medium mt-0.5">Product Inquiries</div>
              </div>

            </div>

            <div className="mt-6 pt-4 border-t border-stone-200/60 text-center text-xs text-stone-500">
              Availability, quality checks, documents and delivery requirements are confirmed for each inquiry.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
