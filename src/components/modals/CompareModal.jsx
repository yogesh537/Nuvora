import React from 'react';
import { useCompare } from '../../context/CompareContext';
import { useLeads } from '../../context/LeadContext';
import { X, Check, Trash2, ArrowRight } from 'lucide-react';

export default function CompareModal() {
  const { comparedProducts, isCompareOpen, setIsCompareOpen, removeFromCompare, clearCompare } = useCompare();
  const { openQuoteModal } = useLeads();

  if (!isCompareOpen || comparedProducts.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-6">
      <div 
        className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden transform transition-all max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1F4D36] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="bg-[#C9972B] text-white text-xs px-2.5 py-0.5 rounded-full font-bold">
              {comparedProducts.length} of 3 Selected
            </span>
            <h3 className="text-lg font-bold">Technical Specifications Comparison</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="text-xs text-stone-300 hover:text-red-300 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </button>
            <button
              onClick={() => setIsCompareOpen(false)}
              className="text-stone-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table / Matrix */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200">
                  <th className="py-4 px-3 w-44 font-semibold text-stone-500 uppercase tracking-wider bg-stone-50/60 sticky left-0 z-10">
                    Product Specification
                  </th>
                  {comparedProducts.map(p => (
                    <th key={p.id} className="py-4 px-4 min-w-[220px] align-top bg-white">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-16 h-16 rounded-xl object-cover border border-stone-200 shadow-sm"
                        />
                        <button
                          onClick={() => removeFromCompare(p.id)}
                          className="text-stone-400 hover:text-red-500 p-1 rounded hover:bg-red-50"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <h4 className="font-bold text-sm text-stone-900 leading-tight">{p.name}</h4>
                      <p className="italic text-[11px] text-stone-500">{p.botanicalName}</p>
                      <button
                        onClick={() => {
                          setIsCompareOpen(false);
                          openQuoteModal(p);
                        }}
                        className="mt-3 w-full py-1.5 px-3 rounded-lg bg-[#C9972B] hover:bg-[#b58622] text-white font-medium text-xs flex items-center justify-center gap-1 shadow-sm transition-all"
                      >
                        Request Quote <ArrowRight className="w-3 h-3" />
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-700">
                <tr>
                  <td className="py-3 px-3 font-semibold text-stone-600 bg-stone-50/60 sticky left-0">Category</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="py-3 px-4 font-medium">{p.category}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-stone-600 bg-stone-50/60 sticky left-0">Drying Process</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-[#1F4D36] font-semibold text-[11px] border border-emerald-200/60">
                        {p.process}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-stone-600 bg-stone-50/60 sticky left-0">Mesh Particle Size</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="py-3 px-4 font-semibold text-stone-900">{p.meshSize}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-stone-600 bg-stone-50/60 sticky left-0">Color & Odour</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="py-3 px-4">
                      <div className="font-medium text-stone-900">{p.color}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{p.taste}</div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-stone-600 bg-stone-50/60 sticky left-0">Moisture Limit</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="py-3 px-4 font-mono font-semibold text-emerald-800">{p.moisture}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-stone-600 bg-stone-50/60 sticky left-0">Total Ash %</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="py-3 px-4 font-mono">{p.ash}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-stone-600 bg-stone-50/60 sticky left-0">Bulk Density</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="py-3 px-4 font-mono">{p.bulkDensity}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-stone-600 bg-stone-50/60 sticky left-0">Microbial Limits (TPC)</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="py-3 px-4 font-mono text-[11px]">
                      <div>TPC: {p.microbiological.tpc}</div>
                      <div className="text-stone-500">Y&M: {p.microbiological.yeastMould}</div>
                      <div className="text-emerald-700 font-semibold">E. coli / Salm: Absent</div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-stone-600 bg-stone-50/60 sticky left-0">Minimum Order Qty (MOQ)</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="py-3 px-4 font-bold text-stone-900">{p.moq}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-stone-600 bg-stone-50/60 sticky left-0">Production Lead Time</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="py-3 px-4">{p.leadTime}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-stone-600 bg-stone-50/60 sticky left-0">HS Customs Code</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="py-3 px-4 font-mono text-stone-600">{p.hsCode}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-stone-600 bg-stone-50/60 sticky left-0">Export Certifications</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {p.certifications.map(c => (
                          <span key={c} className="text-[10px] bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded border border-stone-200">
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-stone-600 bg-stone-50/60 sticky left-0">Key Applications</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="py-3 px-4">
                      <ul className="list-disc list-inside text-[11px] text-stone-600 space-y-1">
                        {p.applications.slice(0, 3).map((app, i) => (
                          <li key={i} className="truncate">{app}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-50 border-t border-stone-200 px-6 py-3 flex items-center justify-between text-xs text-stone-500">
          <span>Need custom blending or toll drying? Contact our R&D pilot plant.</span>
          <button
            onClick={() => setIsCompareOpen(false)}
            className="px-4 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-200 font-medium text-stone-700 transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
