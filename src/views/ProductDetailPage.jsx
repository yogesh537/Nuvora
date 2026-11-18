import React, { useState } from 'react';
import { useLeads } from '../context/LeadContext';
import { 
  ArrowLeft, 
  MessageCircle, 
  CheckCircle2, 
  FlaskConical, 
  Leaf, 
  ShieldCheck, 
  Headphones, 
  Search, 
  Star, 
  Sparkles,
  Download,
  Printer
} from 'lucide-react';

export default function ProductDetailPage({ product, onBack, onOpenQuickSpec }) {
  const { openQuoteModal } = useLeads();
  const [selectedSize, setSelectedSize] = useState(product.packaging[0] || '25kg Fibre Drum');
  const [activeThumb, setActiveThumb] = useState(product.image);

  const whatsappMessage = encodeURIComponent(`Hello Nuvaro Agro, I want to inquire about bulk ordering ${product.name} (${selectedSize}). Please share proforma pricing and COA.`);
  const whatsappUrl = `https://wa.me/919820012345?text=${whatsappMessage}`;

  const thumbs = [
    product.image,
    product.rawImage,
    "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=400&q=80"
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Navigation matching Image 2 */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-6">
          <div className="flex items-center gap-1.5">
            <button onClick={onBack} className="hover:text-[#183D28]">Home</button>
            <span>&gt;</span>
            <button onClick={onBack} className="hover:text-[#183D28]">Products</button>
            <span>&gt;</span>
            <span className="font-semibold text-stone-900">{product.name}</span>
          </div>

          <button
            onClick={onBack}
            className="flex items-center gap-1 font-semibold text-stone-700 hover:text-[#183D28]"
          >
            &larr; Previous Product
          </button>
        </div>

        {/* Main Product Card matching Image 2 & 3 */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E4DA] shadow-card mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Product Showcase with Stone Plinth & Thumbnails */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex gap-4 items-start">
                
                {/* Thumbnails list on left of main picture (Image 3) */}
                <div className="flex flex-col gap-2 shrink-0">
                  {thumbs.map((thumb, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveThumb(thumb)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        activeThumb === thumb ? 'border-[#183D28] shadow-sm' : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={thumb} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Main Large Product Photo on Stone Plinth with Botanical Leaves */}
                <div className="relative rounded-3xl overflow-hidden bg-[#F2EDE4] flex-1 h-[420px] sm:h-[480px] group border border-stone-200">
                  <img
                    src={activeThumb}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Zoom Icon Button on top right */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-stone-700 hover:text-[#183D28]">
                    <Search className="w-4 h-4" />
                  </div>

                  {/* Mesh Tag */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#183D28] border border-stone-200">
                    {product.meshSize} &bull; {product.process}
                  </div>
                </div>
              </div>

              {/* 4 Bottom Micro Feature Pills (Exact UI from Image 2) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-stone-200 text-center flex flex-col items-center">
                  <FlaskConical className="w-4 h-4 text-[#183D28] mb-1" />
                  <span className="text-[11px] font-bold text-stone-900 leading-tight">Research Backed</span>
                  <span className="text-[9px] text-stone-500">HPLC Tested</span>
                </div>

                <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-stone-200 text-center flex flex-col items-center">
                  <Leaf className="w-4 h-4 text-[#183D28] mb-1" />
                  <span className="text-[11px] font-bold text-stone-900 leading-tight">Natural & Safe</span>
                  <span className="text-[9px] text-stone-500">Zero Chemicals</span>
                </div>

                <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-stone-200 text-center flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 text-[#183D28] mb-1" />
                  <span className="text-[11px] font-bold text-stone-900 leading-tight">100% Pure</span>
                  <span className="text-[9px] text-stone-500">No Additives</span>
                </div>

                <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-stone-200 text-center flex flex-col items-center">
                  <Headphones className="w-4 h-4 text-[#183D28] mb-1" />
                  <span className="text-[11px] font-bold text-stone-900 leading-tight">24/7 Support</span>
                  <span className="text-[9px] text-stone-500">B2B Trade Desk</span>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Ratings, Specs, Description & Action Buttons */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#183D28] tracking-tight">
                  {product.name}
                </h1>
                <p className="text-sm text-stone-600 mt-1">
                  Botanical: <strong className="italic">{product.botanicalName}</strong> &bull; {product.taste}
                </p>

                {/* Rating Strip */}
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <span>★ ★ ★ ★ ★</span>
                    <span className="text-stone-900 font-semibold">{product.rating} ({product.reviewsCount} reviews)</span>
                  </div>
                  <span className="text-stone-300">|</span>
                  <span className="text-emerald-800 font-semibold">200+ metric tons supplied this quarter</span>
                </div>
              </div>

              {/* Sizes / Packaging Available (Image 2 style) */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-bold text-stone-700 block">Packaging Sizes Available:</span>
                <div className="flex flex-wrap gap-2">
                  {product.packaging.map((pack, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(pack)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        selectedSize === pack
                          ? 'bg-[#183D28] text-white border-[#183D28] shadow-sm'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {pack}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3 Circular Feature Pills (Image 2 style) */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-100 text-center">
                <div className="p-2.5 rounded-2xl bg-[#FAF8F5] border border-stone-200">
                  <Sparkles className="w-4 h-4 text-[#183D28] mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-stone-800 block">Enriched with Pure Extracts</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-[#FAF8F5] border border-stone-200">
                  <ShieldCheck className="w-4 h-4 text-[#183D28] mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-stone-800 block">Zero Additives & Fillers</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-[#FAF8F5] border border-stone-200">
                  <Leaf className="w-4 h-4 text-[#183D28] mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-stone-800 block">Sustainably Farm Sourced</span>
                </div>
              </div>

              {/* Product Description */}
              <div className="space-y-1.5 pt-2">
                <h3 className="font-bold text-sm text-stone-900">Product Description</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* 2-Column Specs: Key Benefits & Analytical Standards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100 text-xs">
                <div>
                  <h4 className="font-bold text-stone-900 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Key Benefits & Features
                  </h4>
                  <ul className="space-y-1 text-stone-600">
                    <li>&bull; Moisture: <strong>{product.moisture}</strong></li>
                    <li>&bull; Total Ash: <strong>{product.ash}</strong></li>
                    <li>&bull; Bulk Density: <strong>{product.bulkDensity}</strong></li>
                    <li>&bull; Shelf Life: <strong>{product.shelfLife}</strong></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-stone-900 mb-2 flex items-center gap-1.5">
                    <FlaskConical className="w-4 h-4 text-emerald-700" /> Microbiological Safety
                  </h4>
                  <ul className="space-y-1 text-stone-600 font-mono text-[11px]">
                    <li>&bull; TPC: {product.microbiological.tpc}</li>
                    <li>&bull; Y&M: {product.microbiological.yeastMould}</li>
                    <li>&bull; E. coli: {product.microbiological.eColi}</li>
                    <li>&bull; Salmonella: {product.microbiological.salmonella}</li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons (View Details on WhatsApp + Order on WhatsApp) */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-[#183D28] hover:bg-[#122D1E] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                  <span>View Details on WhatsApp</span>
                </a>

                <button
                  onClick={() => openQuoteModal(product)}
                  className="py-3.5 px-6 rounded-2xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs sm:text-sm border border-stone-300 hover:border-stone-400 shadow-2xs transition-all flex items-center justify-center gap-2"
                >
                  <span>Request Official CIF/FOB Quote</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom Banner: "Interested in Bulk Order?" matching Image 2 */}
        <div className="bg-[#183D28] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-card">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-300 shrink-0 mx-auto sm:mx-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Interested in Bulk Order?</h3>
              <p className="text-xs text-emerald-200 mt-0.5">
                Get best wholesale container prices and customized proforma invoices for your business.
              </p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-white hover:bg-stone-100 text-[#183D28] font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
            <span>Contact Us on WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
}
