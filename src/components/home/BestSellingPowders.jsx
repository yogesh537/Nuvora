import React from 'react';
import { useLeads } from '../../context/LeadContext';
import { useCompare } from '../../context/CompareContext';
import { 
  ArrowRight, 
  Layers, 
  FileText, 
  Check, 
  Star, 
  Package, 
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';

export default function BestSellingPowders({ products, onSelectProduct, onOpenQuickSpec }) {
  const { openQuoteModal } = useLeads();
  const { comparedProducts, addToCompare, removeFromCompare } = useCompare();

  // Filter top best selling powders
  const featuredList = products.filter(p => p.featured).slice(0, 8);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading & Sub-header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-[#C9972B] text-xs font-bold uppercase tracking-wider mb-2 border border-amber-200">
              <Sparkles className="w-3.5 h-3.5" /> High-Demand Export Lines
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1F4D36] tracking-tight">
              Best-Selling Dehydrated Powders
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Consistently manufactured in volume with rapid lead times and verified export compliance.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <span className="text-xs text-stone-500 font-medium">Bulk supply only &bull; Lab samples available</span>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredList.map((product) => {
            const isCompared = comparedProducts.some(p => p.id === product.id);

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-elevated transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative h-48 bg-stone-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Process Badge */}
                    <div className="absolute top-3 left-3 bg-[#1F4D36]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                      {product.process}
                    </div>

                    {/* Compare Quick Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        isCompared ? removeFromCompare(product.id) : addToCompare(product);
                      }}
                      className={`absolute top-3 right-3 p-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm transition-all flex items-center gap-1 shadow-sm ${
                        isCompared
                          ? 'bg-[#C9972B] text-white'
                          : 'bg-white/90 text-stone-700 hover:bg-white'
                      }`}
                      title="Add to side-by-side comparison"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span className="text-[10px] hidden group-hover:inline">
                        {isCompared ? 'Compared' : 'Compare'}
                      </span>
                    </button>

                    {/* Quick View Spec Sheet Link */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenQuickSpec(product);
                      }}
                      className="absolute bottom-2 right-2 bg-white/90 hover:bg-white text-stone-700 hover:text-[#1F4D36] text-[10px] font-bold px-2 py-1 rounded-md shadow-sm transition-colors flex items-center gap-1"
                    >
                      <FileText className="w-3 h-3 text-[#C9972B]" /> Spec Sheet
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <div className="text-[11px] text-stone-500 italic">
                        {product.botanicalName}
                      </div>
                      <h3 
                        onClick={() => onSelectProduct(product)}
                        className="font-bold text-base text-stone-900 group-hover:text-[#1F4D36] cursor-pointer transition-colors"
                      >
                        {product.name}
                      </h3>
                    </div>

                    {/* Technical Spec Matrix Badges */}
                    <div className="bg-[#F5F1E6]/70 rounded-xl p-2.5 space-y-1.5 text-[11px] border border-amber-200/40">
                      <div className="flex justify-between items-center text-stone-600">
                        <span>Mesh Size:</span>
                        <span className="font-semibold text-stone-900">{product.meshSize}</span>
                      </div>
                      <div className="flex justify-between items-center text-stone-600">
                        <span>Moisture:</span>
                        <span className="font-semibold text-emerald-800">{product.moisture}</span>
                      </div>
                      <div className="flex justify-between items-center text-stone-600">
                        <span>Minimum Order (MOQ):</span>
                        <span className="font-bold text-stone-900">{product.moq}</span>
                      </div>
                    </div>

                    {/* Certifications micro badges */}
                    <div className="flex items-center gap-1 flex-wrap">
                      {product.certifications.slice(0, 3).map((cert, i) => (
                        <span key={i} className="text-[9px] font-medium bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded border border-stone-200">
                          {cert}
                        </span>
                      ))}
                      {product.certifications.length > 3 && (
                        <span className="text-[9px] text-stone-400 font-semibold">
                          +{product.certifications.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer: B2B CTAs (NO ADD TO CART!) */}
                <div className="p-4 pt-0 space-y-2">
                  <button
                    onClick={() => openQuoteModal(product)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#C9972B] hover:bg-[#b58622] text-white font-bold text-xs shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-1.5 group-hover:scale-[1.02]"
                  >
                    <span>Request Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onSelectProduct(product)}
                    className="w-full py-1.5 text-center text-stone-500 hover:text-[#1F4D36] text-[11px] font-semibold transition-colors"
                  >
                    View Full Technical Profile &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Products CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onSelectProduct(null)} // navigate to product list
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1F4D36] hover:bg-[#163a28] text-white text-xs sm:text-sm font-bold shadow-md transition-all"
          >
            <span>View All 12+ Dehydrated Powder Specifications</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
