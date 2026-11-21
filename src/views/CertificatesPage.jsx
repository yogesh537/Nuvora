import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Download,
  ExternalLink,
  Award,
  Clock,
  Building2,
  QrCode,
  ArrowRight,
  ArrowUpRight,
  Scale,
  FlaskConical,
  Check
} from 'lucide-react';
import { useLeads } from '../context/LeadContext';

export default function CertificatesPage() {
  const { openQuoteModal, openSampleModal } = useLeads();

  const testingParameters = [
    {
      parameter: 'Moisture Content',
      standard: 'Max 5.0%',
      method: 'Karl Fischer / Vacuum Oven at 70°C',
      compliance: 'Complies'
    },
    {
      parameter: 'Total Ash Content',
      standard: '4.0% – 7.5% (depending on ingredient)',
      method: 'Muffle Furnace Ashing at 550°C',
      compliance: 'Complies'
    },
    {
      parameter: 'Acid Insoluble Ash',
      standard: 'Max 0.5%',
      method: 'Dilute HCl Insoluble Digestion',
      compliance: 'Complies'
    },
    {
      parameter: 'Particle Size (Mesh)',
      standard: '60 – 100 Mesh (Fine Sifted) / 16-40 Mesh (Flakes)',
      method: 'Mechanical Sieve Shaker Analysis',
      compliance: 'Complies'
    },
    {
      parameter: 'Artificial Colors / Dyes',
      standard: 'Nil (100% Zero Synthetic Colorants)',
      method: 'Thin Layer Chromatography (TLC)',
      compliance: 'Complies (Zero)'
    },
    {
      parameter: 'Heavy Metals (Lead, Cadmium, Arsenic)',
      standard: 'Well Below FSSAI Maximum Permissible Limits',
      method: 'Inductively Coupled Plasma (ICP-MS)',
      compliance: 'Complies'
    },
    {
      parameter: 'Total Plate Count (TPC)',
      standard: '< 50,000 CFU/g',
      method: 'Standard Plate Count Agar (PCA)',
      compliance: 'Complies'
    },
    {
      parameter: 'Yeast & Mold',
      standard: '< 1,000 CFU/g',
      method: 'Potato Dextrose Agar (PDA)',
      compliance: 'Complies'
    },
    {
      parameter: 'E. Coli & Salmonella',
      standard: 'Absent in 25g',
      method: 'Selective Culture & Enrichment',
      compliance: 'Absent (Negative)'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-[#FBBF24] selection:text-stone-950">
      
      {/* =========================================================================
          HERO BANNER: OFFICIAL FSSAI COMPLIANCE
          ========================================================================= */}
      <section className="relative w-full bg-gradient-to-b from-stone-50 via-white to-stone-50/60 py-12 sm:py-16 border-b border-stone-200/80 overflow-hidden">
        {/* Soft Ambient Radiance */}
        <div className="pointer-events-none absolute left-1/4 top-0 -z-10 h-72 w-96 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="pointer-events-none absolute right-1/4 top-10 -z-10 h-72 w-80 rounded-full bg-amber-400/5 blur-3xl" />

        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 text-center">
          
          {/* Breadcrumbs */}
          <div className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold text-stone-500">
            <span>Home</span>
            <span>/</span>
            <span className="text-[#0B7337]">Certificates</span>
            <span>/</span>
            <span className="text-stone-900">FSSAI Central License</span>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-50 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#0B7337] shadow-2xs mb-3">
            <span className="h-2 w-2 rounded-full bg-[#0B7337] animate-pulse" />
            Statutory Food Safety Certification
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-stone-900">
            FSSAI Central Food License &amp; Quality Scope
          </h1>

          <p className="mt-4 mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-stone-600">
            Nuvaro Agro Global operates under the statutory certification of the Food Safety and Standards Authority of India (FSSAI), Ministry of Health &amp; Family Welfare, Government of India.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 border border-stone-200 px-3.5 py-1 text-xs font-mono font-bold text-stone-800">
              License No: 10020021008942
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 border border-emerald-300 px-3 py-1 text-xs font-bold text-[#0B7337]">
              <Check className="h-3.5 w-3.5 stroke-[3]" /> Central License Active &amp; Verified
            </span>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 1: OFFICIAL FSSAI LICENSE DOCUMENT SPOTLIGHT
          ========================================================================= */}
      <section className="mx-auto max-w-[1440px] px-6 sm:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-stretch">
          
          {/* Certificate Dossier Container */}
          <div className="relative rounded-3xl border-2 border-emerald-600/30 bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/30 p-6 sm:p-10 shadow-lg shadow-emerald-950/5 flex flex-col justify-between">
            <div>
              {/* Certificate Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-emerald-200/80 pb-6 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0B7337] text-white shadow-md">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#0B7337] block">
                      Food Safety and Standards Authority of India
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                      Central License Certificate
                    </h3>
                    <span className="text-xs text-stone-500 font-medium">
                      Ministry of Health &amp; Family Welfare • Government of India
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-start sm:items-end">
                  <span className="rounded-full bg-[#0B7337] text-white text-[11px] font-extrabold px-3 py-1 shadow-2xs">
                    Central Authority
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono mt-1">
                    FSS Act, 2006
                  </span>
                </div>
              </div>

              {/* License Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="rounded-2xl border border-emerald-200/60 bg-white/90 p-4 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Central License Number
                  </span>
                  <span className="text-lg font-mono font-black text-stone-900 tracking-wider">
                    10020021008942
                  </span>
                </div>

                <div className="rounded-2xl border border-emerald-200/60 bg-white/90 p-4 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Entity / Establishment
                  </span>
                  <span className="text-base font-extrabold text-stone-900 block">
                    Nuvaro Agro Global Pvt. Ltd.
                  </span>
                </div>

                <div className="rounded-2xl border border-emerald-200/60 bg-white/90 p-4 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Category of Operation
                  </span>
                  <span className="text-sm font-bold text-stone-800 block">
                    Manufacturer &amp; Bulk Exporter
                  </span>
                </div>

                <div className="rounded-2xl border border-emerald-200/60 bg-white/90 p-4 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Licensed Product Scope
                  </span>
                  <span className="text-sm font-bold text-stone-800 block">
                    Dehydrated Vegetables, Fruits &amp; Spices
                  </span>
                </div>
              </div>

              {/* Statutory Assurances */}
              <div className="space-y-3 rounded-2xl border border-emerald-100 bg-white p-5 shadow-2xs mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B7337]">
                  Statutory Commitments &amp; Processing Standards
                </h4>
                <ul className="space-y-2 text-xs text-stone-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#0B7337] shrink-0 mt-0.5" />
                    <span>
                      <strong>100% Pure Agricultural Sourcing:</strong> Processed solely from selected farm harvests with zero chemical adulteration or synthetic fillers.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#0B7337] shrink-0 mt-0.5" />
                    <span>
                      <strong>Hygienic Low-Temperature Processing:</strong> State-of-the-art dehydration preserving heat-sensitive phytonutrients and volatile essential oils.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#0B7337] shrink-0 mt-0.5" />
                    <span>
                      <strong>Hermetic Moisture-Barrier Packaging:</strong> Sealed in food-grade poly liners inside 25kg fiber drums or multi-wall corrugated master cartons.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-emerald-200/80">
              <span className="text-xs text-stone-500">
                Official FSSAI documentation provided with every export consignment.
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => openQuoteModal()}
                  className="flex-1 sm:flex-none rounded-full bg-[#FBBF24] hover:bg-[#F59E0B] px-6 py-2.5 text-xs font-bold text-stone-950 shadow-md shadow-amber-500/15 transition-all hover:scale-102"
                >
                  Request Official Certificate Copy
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Statutory Verification & Facility Scope */}
          <div className="flex flex-col justify-between gap-6">
            
            {/* Quick Verification Card */}
            <div className="rounded-3xl border border-stone-200 bg-[#F9F9F8] p-6 sm:p-8 shadow-xs flex-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0B7337] block mb-2">
                VERIFICATION &amp; TRACEABILITY
              </span>
              <h3 className="text-xl font-extrabold text-stone-900 tracking-tight">
                Government Compliance Verification
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                Our central license can be verified through the official FSSAI Food Safety Compliance System (FoSCoS) portal using license number <strong className="text-stone-900 font-mono">10020021008942</strong>.
              </p>

              <div className="mt-6 space-y-3">
                <div className="rounded-xl border border-stone-200/80 bg-white p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-[#0B7337]" />
                    <div>
                      <span className="text-xs font-bold text-stone-900 block">Processing Unit 1</span>
                      <span className="text-[11px] text-stone-500">Mahuva, Gujarat (Allium &amp; Flakes Hub)</span>
                    </div>
                  </div>
                  <span className="rounded bg-emerald-50 text-[#0B7337] text-[10px] font-bold px-2 py-0.5 border border-emerald-200">
                    Active
                  </span>
                </div>

                <div className="rounded-xl border border-stone-200/80 bg-white p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-[#0B7337]" />
                    <div>
                      <span className="text-xs font-bold text-stone-900 block">Processing Unit 2</span>
                      <span className="text-[11px] text-stone-500">Nashik, Maharashtra (Botanicals &amp; Roots)</span>
                    </div>
                  </div>
                  <span className="rounded bg-emerald-50 text-[#0B7337] text-[10px] font-bold px-2 py-0.5 border border-emerald-200">
                    Active
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
                <div className="flex items-start gap-2.5">
                  <Award className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-amber-900 block">
                      Export Certificate of Analysis (COA)
                    </span>
                    <p className="mt-1 text-[11px] text-amber-800/90 leading-relaxed">
                      Every commercial export invoice includes lot-specific lab test reports covering moisture, microbiological counts, and heavy metal assays.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Request Samples Card */}
            <div className="rounded-3xl border-2 border-[#0B7337] bg-white p-6 shadow-sm flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-stone-900">
                  Need a Sample Kit for Lab Evaluation?
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  We dispatch 100g – 500g sealed test samples with matching COA.
                </p>
              </div>
              <button
                type="button"
                onClick={() => openSampleModal()}
                className="shrink-0 rounded-full border border-[#0B7337] bg-emerald-50 hover:bg-[#0B7337] hover:text-white px-5 py-2 text-xs font-bold text-[#0B7337] transition-all"
              >
                Request 100g Sample
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: STATUTORY LABORATORY TESTING PARAMETERS TABLE
          ========================================================================= */}
      <section className="border-t border-stone-200 bg-[#F9F9F8] py-14 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12">
          
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0B7337]">
              ANALYTICAL TESTING SCOPE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight mt-1">
              FSSAI Quality &amp; Safety Test Parameters
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600">
              Rigorous laboratory analysis protocols executed on every raw material intake and post-dehydration milling batch.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-stone-200 bg-stone-50 text-[11px] font-bold uppercase tracking-wider text-stone-700">
                  <tr>
                    <th scope="col" className="py-3.5 px-5">Quality Parameter</th>
                    <th scope="col" className="py-3.5 px-5">FSSAI / In-House Standard</th>
                    <th scope="col" className="py-3.5 px-5 hidden md:table-cell">Analytical Test Method</th>
                    <th scope="col" className="py-3.5 px-5 text-right">Batch Compliance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {testingParameters.map((item) => (
                    <tr key={item.parameter} className="hover:bg-emerald-50/30 transition-colors">
                      <td className="py-3.5 px-5 font-bold text-stone-900">
                        {item.parameter}
                      </td>
                      <td className="py-3.5 px-5 font-medium text-stone-800">
                        {item.standard}
                      </td>
                      <td className="py-3.5 px-5 text-xs text-stone-500 hidden md:table-cell">
                        {item.method}
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-bold text-[#0B7337]">
                          <Check className="h-3 w-3 stroke-[3]" />
                          {item.compliance}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: DIRECT QUOTE & SAMPLE CTA
          ========================================================================= */}
      <section className="bg-white py-14 sm:py-20 border-t border-stone-200">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 text-center">
          <div className="rounded-3xl border-2 border-emerald-600/25 bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/40 p-8 sm:p-12 max-w-4xl mx-auto shadow-md">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-[#0B7337] bg-white border border-emerald-200 shadow-2xs mb-3">
              Official Compliance Dossier
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 tracking-tight">
              Request Verified FSSAI Certificate &amp; Batch COA
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
              Contact our international trade desk for official high-resolution certificate PDFs, laboratory testing records, and customized product specifications.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => openQuoteModal()}
                className="rounded-full bg-[#FBBF24] hover:bg-[#F59E0B] px-8 py-3 text-xs sm:text-sm font-bold text-stone-950 shadow-md shadow-amber-500/15 transition-all hover:scale-102"
              >
                Request FSSAI Certificate Copy
              </button>
              <button
                type="button"
                onClick={() => openSampleModal()}
                className="rounded-full border-2 border-[#0B7337] bg-white hover:bg-emerald-50 px-8 py-3 text-xs sm:text-sm font-bold text-[#0B7337] transition-all shadow-2xs"
              >
                Request Test Samples
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
