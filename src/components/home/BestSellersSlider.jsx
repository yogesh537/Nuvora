import React, { useState } from 'react';
import { 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Eye, 
  MessageCircle, 
  FileText,
  ArrowRight
} from 'lucide-react';
import { useCompare } from '../../context/CompareContext';
import { useLeads } from '../../context/LeadContext';

export default function BestSellersSlider({ products, onSelectProduct, onOpenQuickSpec }) {
  const { toggleCompare, isCompared } = useCompare();
  const { openQuoteModal } = useLeads();
  const [scrollIndex, setScrollIndex] = useState(0);

  // We display all 9 user requested SKUs in the best sellers carousel
  const itemsPerPage = 6;
  const maxIndex = Math.max(0, products.length - itemsPerPage);

  const handlePrev = () => {
    setScrollIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setScrollIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-stone-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header: BEST SELLERS + VIEW ALL → */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E3A2B] tracking-tight uppercase">
              BEST SELLERS
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Hand-harvested, steam-sterilized export dehydrated powders trusted by 250+ food & supplement brands
            </p>
          </div>

          <button
            onClick={() => onSelectProduct(null)}
            className="text-xs sm:text-sm font-semibold text-stone-800 hover:text-[#1E3A2B] flex items-center gap-1.5 uppercase tracking-wider group"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Left Arrow Button */}
          {scrollIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-stone-200 flex items-center justify-center text-stone-700 hover:text-[#1E3A2B] hover:scale-105 transition-all z-20 focus:outline-none"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Arrow Button */}
          {scrollIndex < maxIndex && (
            <button
              onClick={handleNext}
              className="absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-stone-200 flex items-center justify-center text-stone-700 hover:text-[#1E3A2B] hover:scale-105 transition-all z-20 focus:outline-none"
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Products Grid (6 visible on large desktop, horizontally scrollable on mobile) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {products.slice(scrollIndex, scrollIndex + itemsPerPage).map((product) => {
              const inWishlist = isCompared(product.id);
              const waUrl = `https://wa.me/919820012345?text=${encodeURIComponent(`Hello Nuvaro Agro, I would like to inquire about wholesale B2B pricing and samples for ${product.name}.`)}`;

              return (
                <div 
                  key={product.id}
                  className="group flex flex-col justify-between rounded-xl bg-white transition-all duration-300"
                >
                  {/* Image Presentation Box (Matches canister/pouch on warm studio ground) */}
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#F6F4EE] border border-stone-200/80 mb-3 group-hover:shadow-md transition-shadow">
                    
                    {/* Top Right Heart Wishlist Icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCompare(product);
                      }}
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-stone-600 hover:text-rose-600 transition-colors z-10 shadow-xs"
                      title={inWishlist ? "Remove from wishlist" : "Add to wishlist / compare"}
                    >
                      <Heart 
                        className={`w-4 h-4 ${inWishlist ? 'fill-rose-500 text-rose-500' : ''}`} 
                        strokeWidth={1.75}
                      />
                    </button>

                    {/* Product Image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      onClick={() => onSelectProduct(product)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    />

                    {/* Hover Quick Action Buttons */}
                    <div className="absolute inset-x-2 bottom-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className="w-full bg-[#1E3A2B] text-white py-1.5 rounded-lg text-[11px] font-semibold tracking-wider uppercase hover:bg-[#152a1f] shadow-md flex items-center justify-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Specs</span>
                      </button>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full bg-white text-stone-800 border border-stone-200 py-1.5 rounded-lg text-[10.5px] font-semibold tracking-wider hover:bg-[#F6F4EE] shadow-xs flex items-center justify-center gap-1"
                      >
                        <MessageCircle className="w-3 h-3 text-emerald-600" />
                        <span>WhatsApp Quote</span>
                      </a>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="space-y-1 text-left px-1">
                    
                    {/* Product Name */}
                    <h3 
                      onClick={() => onSelectProduct(product)}
                      className="font-serif font-bold text-stone-900 text-[13px] sm:text-sm hover:text-[#1E3A2B] transition-colors line-clamp-1 cursor-pointer"
                      title={product.name}
                    >
                      {product.name}
                    </h3>

                    {/* Category / Form */}
                    <p className="text-[11px] text-stone-500 font-medium truncate">
                      {product.category} &bull; {product.meshSize ? product.meshSize.split(' ')[0] : '80 Mesh'}
                    </p>

                    {/* Price / MOQ */}
                    <div className="text-xs sm:text-[13px] font-semibold text-stone-900 pt-0.5">
                      {product.pricePerKg} <span className="text-[10.5px] text-stone-500 font-normal">/ kg &bull; MOQ {product.moq}</span>
                    </div>

                    {/* Star Rating (★★★★★ 1,250) */}
                    <div className="flex items-center gap-1 pt-1">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] text-stone-400 font-medium">
                        ({product.reviewsCount || 1250})
                      </span>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
