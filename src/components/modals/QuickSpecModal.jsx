import React from 'react';
import { X, Printer, Download, ShieldCheck, CheckCircle2, Award, Calendar } from 'lucide-react';

export default function QuickSpecModal({ product, onClose, onRequestQuote }) {
  if (!product) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 print:p-0 print:bg-white">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden transform transition-all flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none print:w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#1F4D36] text-white px-6 py-4 flex items-center justify-between shrink-0 print:bg-stone-900">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#C9972B] text-white flex items-center justify-center font-bold text-sm">
              TDS
            </div>
            <div>
              <h3 className="text-base font-bold">Standard Certificate of Analysis / Technical Spec Sheet</h3>
              <p className="text-xs text-stone-200">Nuvaro Agro Pvt Ltd &bull; Quality Assurance Division</p>
            </div>
          </div>
          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white transition-colors"
              title="Print Specification Sheet"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Spec Sheet Document Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-stone-700 bg-white" id="printable-spec-sheet">
          {/* Document Header */}
          <div className="border-b-2 border-[#1F4D36] pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <h2 className="text-xl font-extrabold text-[#1F4D36] tracking-tight">NUVARO AGRO PVT LTD</h2>
              <p className="text-[11px] text-stone-500 font-medium">Export Processing Plant: Survey No. 42/B, Agri Industrial Park, India</p>
              <p className="text-[11px] text-stone-500">ISO 22000:2018 | HACCP | FSSAI Lic: 10020021008942 | US FDA: 19482019482</p>
            </div>
            <div className="text-right text-[11px] font-mono bg-stone-50 p-2.5 rounded-lg border border-stone-200">
              <div>Doc Ref: <span className="font-bold text-stone-900">TDS-{product.id.toUpperCase()}-26</span></div>
              <div>Issue Date: <span className="text-stone-700">November 2026</span></div>
              <div>Batch Validity: <span className="text-emerald-700 font-semibold">{product.shelfLife}</span></div>
            </div>
          </div>

          {/* Product Identification */}
          <div className="bg-[#F5F1E6]/60 rounded-xl p-4 border border-amber-200/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-bold tracking-wider">Product Name</span>
                <span className="font-bold text-sm text-stone-900">{product.name}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-bold tracking-wider">Botanical Name</span>
                <span className="italic font-medium text-stone-800">{product.botanicalName}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-bold tracking-wider">Drying Method</span>
                <span className="font-semibold text-emerald-800">{product.process}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-bold tracking-wider">HS Customs Code</span>
                <span className="font-mono text-stone-800">{product.hsCode}</span>
              </div>
            </div>
          </div>

          {/* Physical & Sensory Parameters Table */}
          <div>
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C9972B]"></span> 1. Sensory & Physical Parameters
            </h4>
            <table className="w-full border border-stone-200 rounded-lg overflow-hidden">
              <tbody className="divide-y divide-stone-200">
                <tr className="bg-stone-50">
                  <td className="py-2 px-3 font-medium text-stone-600 w-1/3">Appearance & Color</td>
                  <td className="py-2 px-3 text-stone-900 font-semibold">{product.color}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium text-stone-600">Taste & Odor</td>
                  <td className="py-2 px-3 text-stone-900">{product.taste}</td>
                </tr>
                <tr className="bg-stone-50">
                  <td className="py-2 px-3 font-medium text-stone-600">Particle Size / Mesh</td>
                  <td className="py-2 px-3 font-mono font-semibold text-stone-900">{product.meshSize} (99% pass through)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium text-stone-600">Bulk Density</td>
                  <td className="py-2 px-3 font-mono text-stone-900">{product.bulkDensity}</td>
                </tr>
                <tr className="bg-stone-50">
                  <td className="py-2 px-3 font-medium text-stone-600">Extraneous Matter</td>
                  <td className="py-2 px-3 text-emerald-700 font-semibold">Nil / Free from foreign particles</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Chemical Analysis Table */}
          <div>
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1F4D36]"></span> 2. Chemical Specifications
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <span className="text-stone-500 text-[10px] uppercase font-bold">Moisture Content</span>
                <p className="text-base font-bold text-stone-900 font-mono mt-0.5">{product.moisture}</p>
                <span className="text-[10px] text-stone-500">Method: Karl Fischer / IR Balance</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <span className="text-stone-500 text-[10px] uppercase font-bold">Total Ash Content</span>
                <p className="text-base font-bold text-stone-900 font-mono mt-0.5">{product.ash}</p>
                <span className="text-[10px] text-stone-500">Method: 550°C Muffle Furnace</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <span className="text-stone-500 text-[10px] uppercase font-bold">Protein Content</span>
                <p className="text-base font-bold text-stone-900 font-mono mt-0.5">{product.protein}</p>
                <span className="text-[10px] text-stone-500">Method: Kjeldahl (N x 6.25)</span>
              </div>
            </div>
          </div>

          {/* Microbiological Limits */}
          <div>
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span> 3. Microbiological Standards (Standard Batch Release Limits)
            </h4>
            <table className="w-full border border-stone-200 rounded-lg overflow-hidden text-center">
              <thead className="bg-stone-100 text-stone-700 font-semibold border-b border-stone-200">
                <tr>
                  <th className="py-2 px-3 text-left">Microbial Parameter</th>
                  <th className="py-2 px-3">Standard Limit</th>
                  <th className="py-2 px-3">Test Method</th>
                  <th className="py-2 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-mono text-[11px]">
                <tr>
                  <td className="py-2 px-3 text-left font-medium text-stone-800">Total Plate Count (TPC)</td>
                  <td className="py-2 px-3 text-stone-900">{product.microbiological.tpc}</td>
                  <td className="py-2 px-3 text-stone-500">ISO 4833-1</td>
                  <td className="py-2 px-3 text-right text-emerald-700 font-semibold">Pass</td>
                </tr>
                <tr className="bg-stone-50/50">
                  <td className="py-2 px-3 text-left font-medium text-stone-800">Yeast & Mould</td>
                  <td className="py-2 px-3 text-stone-900">{product.microbiological.yeastMould}</td>
                  <td className="py-2 px-3 text-stone-500">ISO 21527-2</td>
                  <td className="py-2 px-3 text-right text-emerald-700 font-semibold">Pass</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-left font-medium text-stone-800">Escherichia coli</td>
                  <td className="py-2 px-3 text-stone-900">{product.microbiological.eColi}</td>
                  <td className="py-2 px-3 text-stone-500">ISO 16649-2</td>
                  <td className="py-2 px-3 text-right text-emerald-700 font-semibold">Absent</td>
                </tr>
                <tr className="bg-stone-50/50">
                  <td className="py-2 px-3 text-left font-medium text-stone-800">Salmonella spp.</td>
                  <td className="py-2 px-3 text-stone-900">{product.microbiological.salmonella}</td>
                  <td className="py-2 px-3 text-stone-500">ISO 6579-1</td>
                  <td className="py-2 px-3 text-right text-emerald-700 font-semibold">Absent</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Heavy Metals & Contaminants declaration */}
          <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-200/50 flex items-start gap-2 text-[11px] text-stone-600">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <p>
              <strong>Heavy Metals & Residue Compliance:</strong> Lead (Pb) &lt; 0.5 ppm, Cadmium (Cd) &lt; 0.1 ppm, Arsenic (As) &lt; 0.5 ppm, Mercury (Hg) &lt; 0.05 ppm. Product is non-irradiated, 100% Non-GMO, and compliant with EU Regulation (EC) No 1881/2006 and US FDA Title 21 CFR.
            </p>
          </div>

          {/* Packaging & Signatures */}
          <div className="border-t border-stone-200 pt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px]">
            <div>
              <p><strong>Approved Packaging:</strong> {product.packaging.join(' | ')}</p>
              <p className="text-stone-500">Standard Export MOQ: {product.moq} &bull; Lead Time: {product.leadTime}</p>
            </div>
            <div className="text-right">
              <div className="font-semibold text-stone-900">Dr. A. Sharma, Ph.D.</div>
              <div className="text-stone-500">Head of Quality Control & Regulatory Affairs</div>
              <div className="text-[10px] text-emerald-700 font-mono">Digitally Verified &bull; Nuvaro Agro QC Lab</div>
            </div>
          </div>
        </div>

        {/* Modal Footer Bar */}
        <div className="bg-stone-50 border-t border-stone-200 px-6 py-3.5 flex items-center justify-between shrink-0 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-200 text-xs font-semibold"
          >
            Close
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Save PDF
            </button>
            <button
              onClick={() => {
                onClose();
                onRequestQuote(product);
              }}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#C9972B] hover:bg-[#b58622] text-white text-xs font-bold shadow-sm transition-all"
            >
              Request Quote for {product.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
