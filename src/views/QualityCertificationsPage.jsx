import React from 'react';
import { certificationsData } from '../data/products';
import { ShieldCheck, Award, Download, CheckCircle2, FileText, ExternalLink } from 'lucide-react';
import { useLeads } from '../context/LeadContext';

export default function QualityCertificationsPage() {
  const { openQuoteModal } = useLeads();

  const handleDownloadCertificate = (cert) => {
    const text = `
========================================================================
NUVARO AGRO PVT LTD &bull; CERTIFICATE OF REGULATORY COMPLIANCE
Standard: ${cert.code} - ${cert.title}
Issuing Certification Body: ${cert.issuer}
Validity: ${cert.validity}
Certified Scope: ${cert.scope}

COMPANY DETAILS:
Nuvaro Agro Pvt Ltd
Industrial Processing Zone, Maharashtra - Gujarat Agri Corridor, India
FSSAI Central Export License: 10020021008942
US FDA Facility Reg: 19482019482

COMPLIANCE ATTESTATION:
This document confirms that Nuvaro Agro Pvt Ltd operates a fully certified,
continuously audited manufacturing and export facility for dehydrated vegetable,
fruit, herbal, and spice powders in accordance with global food safety standards.
========================================================================
`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Nuvaro_Agro_Certificate_${cert.code.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#1F4D36] text-xs font-bold uppercase tracking-wider mb-2">
            Zero-Defect Export Compliance
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1F4D36] tracking-tight">
            Quality Assurance & Certifications
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            Our facilities are certified by leading global accredited bodies to ensure smooth customs clearance across the European Union, United States, Middle East, and Asia-Pacific.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certificationsData.map((cert, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#1F4D36] flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-[#C9972B]" />
                </div>

                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block mb-1">
                  {cert.badge}
                </span>

                <h3 className="font-bold text-stone-900 text-base mb-1">
                  {cert.code}
                </h3>

                <p className="text-xs text-stone-500 font-medium mb-3">
                  {cert.title}
                </p>

                <div className="bg-stone-50 rounded-xl p-3 text-[11px] text-stone-600 space-y-1.5 border border-stone-100">
                  <div>
                    <span className="font-semibold text-stone-700">Audit Body:</span> {cert.issuer}
                  </div>
                  <div>
                    <span className="font-semibold text-stone-700">Scope:</span> {cert.scope}
                  </div>
                  <div>
                    <span className="font-semibold text-emerald-700">{cert.validity}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100">
                <button
                  onClick={() => handleDownloadCertificate(cert)}
                  className="w-full py-2 px-3 rounded-lg bg-stone-100 hover:bg-[#1F4D36] text-stone-700 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download Certificate
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Testing Standards Matrix */}
        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-card mb-12">
          <h2 className="text-xl font-bold text-[#1F4D36] mb-4">
            Laboratory Analytical Protocol Summary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">Heavy Metals Testing</span>
              <p className="text-stone-600 text-[11px]">
                AAS testing for Lead (&lt;0.5ppm), Cadmium (&lt;0.1ppm), Arsenic (&lt;0.5ppm) and Mercury (&lt;0.05ppm).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">Pesticide Residue</span>
              <p className="text-stone-600 text-[11px]">
                GC-MS/MS multi-residue screening adhering to EU EC 396/2005 and US FDA CFR 40 limits.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">Allergen Free</span>
              <p className="text-stone-600 text-[11px]">
                100% Gluten-free, dairy-free, soy-free and peanut-free dedicated drying lines.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">Microbiological Safety</span>
              <p className="text-stone-600 text-[11px]">
                Absence of Salmonella, E. coli, Listeria and Staphylococcus aureus in every batch.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
