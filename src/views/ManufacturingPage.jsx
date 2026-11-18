import React from 'react';
import { 
  Building2, 
  Wind, 
  Snowflake, 
  SlidersHorizontal, 
  ShieldCheck, 
  Search, 
  Waves, 
  Award, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { useLeads } from '../context/LeadContext';

export default function ManufacturingPage({ onOpenQuote }) {
  const { openQuoteModal } = useLeads();

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#1F4D36] text-xs font-bold uppercase tracking-wider mb-2">
            State-of-the-Art Processing Plant
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1F4D36] tracking-tight">
            Advanced Dehydration Infrastructure
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            Located in the fertile agri-belt of Western India with seamless access to contracted organic farms and international export ports.
          </p>
        </div>

        {/* Hero Plant Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 text-center shadow-card">
            <div className="text-3xl font-extrabold text-[#1F4D36]">45,000</div>
            <div className="text-xs text-stone-500 mt-1 font-medium">Sq. Ft. GMP Cleanroom Plant</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-stone-200 text-center shadow-card">
            <div className="text-3xl font-extrabold text-[#C9972B]">12,000 MT</div>
            <div className="text-xs text-stone-500 mt-1 font-medium">Annual Powder Capacity</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-stone-200 text-center shadow-card">
            <div className="text-3xl font-extrabold text-[#1F4D36]">Class 100k</div>
            <div className="text-xs text-stone-500 mt-1 font-medium">Controlled Packaging Hygiene</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-stone-200 text-center shadow-card">
            <div className="text-3xl font-extrabold text-[#C9972B]">100%</div>
            <div className="text-xs text-stone-500 mt-1 font-medium">Solar & Clean Energy Powered</div>
          </div>
        </div>

        {/* Core Technologies Grid */}
        <div className="space-y-12 mb-16">
          <h2 className="text-2xl font-bold text-[#1F4D36] text-center">
            Our Core Drying & Dehydration Technologies
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#1F4D36] flex items-center justify-center">
                <Wind className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">1. Co-Current Spray Drying Towers</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Multi-stage atomizers atomize fresh vegetable or fruit puree into microscopic droplets within seconds. Ideal for instant solubility, high bulk density, and carrier-free formulations.
              </p>
              <ul className="text-xs text-stone-700 space-y-1 pt-2 border-t border-stone-100">
                <li>&bull; Retention of natural fruit sugars & aroma</li>
                <li>&bull; Non-caking, free-flowing particle morphology</li>
                <li>&bull; Capacity: 1.5 MT finished powder / hour</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#1F4D36] flex items-center justify-center">
                <Snowflake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">2. Vacuum Lyophilization (Freeze Drying)</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Deep freezing to -40°C followed by high-vacuum sublimation removes water ice directly without melting. Preserves 98%+ heat-sensitive vitamins, enzymes, and cellular texture.
              </p>
              <ul className="text-xs text-stone-700 space-y-1 pt-2 border-t border-stone-100">
                <li>&bull; Premium nutraceutical grade botanicals</li>
                <li>&bull; Zero oxidation & maximum color retention</li>
                <li>&bull; Perfect for delicate berries & functional herbs</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#1F4D36] flex items-center justify-center">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">3. Continuous Belt & Fluid Bed Air Dryers</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Multi-zone controlled air circulation and gentle de-humidified air dehydration for root vegetables, spices, and fibrous botanicals like ginger, garlic, and turmeric.
              </p>
              <ul className="text-xs text-stone-700 space-y-1 pt-2 border-t border-stone-100">
                <li>&bull; Low-temperature drying curves &lt; 55°C</li>
                <li>&bull; Maintains aromatic essential oils and allicin</li>
                <li>&bull; Steam-sterilized inline options</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quality Testing Laboratory Section */}
        <div className="bg-[#1F4D36] text-white rounded-3xl p-8 md:p-12 shadow-elevated mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9972B]/20 text-[#C9972B] text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" /> In-House ISO/IEC 17025 Accredited Laboratory
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Every Batch Scientifically Validated Before Container Sealing
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                Our in-house analytical testing center is equipped with High-Performance Liquid Chromatography (HPLC), Atomic Absorption Spectrophotometry (AAS for heavy metals), and full microbiological incubators.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9972B]" />
                  <span>Heavy Metals (Pb, Cd, As, Hg)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9972B]" />
                  <span>500+ Multi-Residue Pesticide Screen</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9972B]" />
                  <span>Microbial TPC, Yeast, E. coli, Salmonella</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9972B]" />
                  <span>Active Markers (Curcumin, Betanin, Lycopene)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/10 rounded-2xl p-6 border border-emerald-500/30 text-center space-y-4">
              <h3 className="font-bold text-white text-base">Schedule a Plant Audit</h3>
              <p className="text-xs text-stone-200">
                We welcome third-party and client technical audits by QA teams representing global brands.
              </p>
              <button
                onClick={() => openQuoteModal({ name: "Plant Audit / Technical Consultation", process: "Facility Inspection", meshSize: "N/A", moq: "Audit" })}
                className="w-full py-3 px-4 rounded-xl bg-[#C9972B] hover:bg-[#b58622] text-white font-bold text-xs shadow-md transition-all"
              >
                Request Technical Plant Audit / Tour
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
