import React, { useState, useMemo } from 'react';
import { useLeads } from '../context/LeadContext';
import { useCompare } from '../context/CompareContext';
import { 
  Search, 
  Filter, 
  Layers, 
  FileText, 
  ArrowRight, 
  SlidersHorizontal, 
  Check, 
  X, 
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function ProductListingPage({ 
  products, 
  selectedCategory, 
  onSelectProduct, 
  onOpenQuickSpec 
}) {
  const { openQuoteModal } = useLeads();
  const { comparedProducts, addToCompare, removeFromCompare, setIsCompareOpen } = useCompare();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(selectedCategory || 'All');
  const [processFilter, setProcessFilter] = useState('All');
  const [meshFilter, setMeshFilter] = useState('All');
  const [certFilter, setCertFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter products dynamically
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Search
      const matchesSearch = 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.botanicalName.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.applications.some(a => a.toLowerCase().includes(search.toLowerCase()));

      // Category
      const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;

      // Drying Process
      const matchesProcess = processFilter === 'All' || p.process.toLowerCase().includes(processFilter.toLowerCase());

      // Mesh
      const matchesMesh = meshFilter === 'All' || p.meshSize.includes(meshFilter);

      // Certification
      const matchesCert = certFilter === 'All' || p.certifications.includes(certFilter);

      return matchesSearch && matchesCategory && matchesProcess && matchesMesh && matchesCert;
    }).sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, search, categoryFilter, processFilter, meshFilter, certFilter, sortBy]);

  const resetFilters = () => {
    setSearch('');
    setCategoryFilter('All');
    setProcessFilter('All');
    setMeshFilter('All');
    setCertFilter('All');
  };

  const hasActiveFilters = categoryFilter !== 'All' || processFilter !== 'All' || meshFilter !== 'All' || certFilter !== 'All' || search !== '';

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1F4D36] font-semibold">Product Catalog & Specifications</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F4D36] tracking-tight">
                Industrial Dehydrated Powder Portfolio
              </h1>
              <p className="text-stone-600 text-sm mt-1 max-w-2xl">
                Download Certificates of Analysis (COA), Technical Data Sheets (TDS), and request bulk container quotations or free 100g lab testing samples.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs bg-white px-3 py-1.5 rounded-lg border border-stone-200 font-semibold text-stone-700 shadow-2xs">
                Showing <strong>{filteredProducts.length}</strong> of {products.length} Products
              </span>
            </div>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search powder, botanical name, application..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1F4D36] focus:bg-white transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Filter Buttons & Sort */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-700 outline-none"
              >
                <option value="All">All Categories</option>
                <option value="Vegetable Powders">Vegetable Powders</option>
                <option value="Fruit Powders">Fruit Powders</option>
                <option value="Herbal & Ayurvedic Powders">Herbal & Ayurvedic</option>
                <option value="Spice Powders">Spice Powders</option>
              </select>

              <select
                value={processFilter}
                onChange={(e) => setProcessFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-700 outline-none"
              >
                <option value="All">All Drying Methods</option>
                <option value="Spray">Spray Dried</option>
                <option value="Air">Air Dried</option>
                <option value="Freeze">Freeze Dried</option>
                <option value="Drum">Drum Dried</option>
              </select>

              <select
                value={meshFilter}
                onChange={(e) => setMeshFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-700 outline-none hidden sm:block"
              >
                <option value="All">All Mesh Sizes</option>
                <option value="60 Mesh">60 Mesh</option>
                <option value="80 Mesh">80 Mesh</option>
                <option value="100 Mesh">100 Mesh Superfine</option>
              </select>

              <select
                value={certFilter}
                onChange={(e) => setCertFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-700 outline-none hidden sm:block"
              >
                <option value="All">All Certifications</option>
                <option value="Organic NPOP">Organic Certified</option>
                <option value="Halal">Halal</option>
                <option value="Kosher">Kosher</option>
                <option value="US FDA Reg">US FDA</option>
                <option value="ISO 22000">ISO 22000</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors whitespace-nowrap"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 shadow-sm max-w-md mx-auto">
            <Filter className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-800">No Powders Match Your Filter</h3>
            <p className="text-xs text-stone-500 mt-1 mb-4">
              Try resetting your search query or selecting 'All' drying methods.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-lg bg-[#1F4D36] text-white text-xs font-semibold"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isCompared = comparedProducts.some(p => p.id === product.id);

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-elevated transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Image Area */}
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

                      {/* Spec Sheet Preview Button */}
                      <button
                        onClick={() => onOpenQuickSpec(product)}
                        className="absolute bottom-2 right-2 bg-white/90 hover:bg-white text-stone-700 hover:text-[#1F4D36] text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm transition-colors flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3 text-[#C9972B]" /> Spec Sheet
                      </button>
                    </div>

                    {/* Card Content */}
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

                      {/* Tech Spec Badges */}
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
                        <div className="flex justify-between items-center text-stone-600">
                          <span>HS Customs Code:</span>
                          <span className="font-mono text-stone-700">{product.hsCode}</span>
                        </div>
                      </div>

                      {/* Certifications row */}
                      <div className="flex items-center gap-1 flex-wrap">
                        {product.certifications.slice(0, 3).map((cert, i) => (
                          <span key={i} className="text-[9px] font-medium bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded border border-stone-200">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: B2B CTAs */}
                  <div className="p-4 pt-0 space-y-2">
                    <button
                      onClick={() => openQuoteModal(product)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#C9972B] hover:bg-[#b58622] text-white font-bold text-xs shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Request Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onSelectProduct(product)}
                      className="w-full py-1.5 text-center text-stone-500 hover:text-[#1F4D36] text-[11px] font-semibold transition-colors"
                    >
                      View Full Specifications &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Floating Compare Pill on bottom */}
        {comparedProducts.length > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 bg-[#1F4D36] text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-600 flex items-center gap-4 animate-bounce">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#C9972B] text-white font-bold text-xs flex items-center justify-center">
                {comparedProducts.length}
              </span>
              <span className="text-xs font-semibold">Powders Selected for Comparison</span>
            </div>
            <button
              onClick={() => setIsCompareOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-[#C9972B] hover:bg-[#b58622] text-white text-xs font-bold transition-colors"
            >
              Compare Specifications Matrix
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
