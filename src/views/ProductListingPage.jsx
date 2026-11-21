import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, Layers, Search, X, FileText, Sparkles } from 'lucide-react';
import { useLeads } from '../context/LeadContext';
import { useCompare } from '../context/CompareContext';

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
  const [sortBy, setSortBy] = useState('name');
  const categories = [...new Set(products.map((product) => product.category))];

  useEffect(() => {
    setCategoryFilter(selectedCategory || 'All');
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products
      .filter((product) => {
        const searchableText = [
          product.name,
          product.botanicalName,
          product.category,
          ...(product.applications || []),
          ...(product.forms || [])
        ].filter(Boolean).join(' ').toLowerCase();
        return (!query || searchableText.includes(query))
          && (categoryFilter === 'All' || product.category === categoryFilter);
      })
      .sort((a, b) => sortBy === 'category'
        ? a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
        : a.name.localeCompare(b.name));
  }, [products, search, categoryFilter, sortBy]);

  const resetFilters = () => {
    setSearch('');
    setCategoryFilter('All');
  };
  const hasActiveFilters = categoryFilter !== 'All' || search.trim() !== '';

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans">
      {/* Botanical Green Banner (Exact Match to Screenshot Image 7) */}
      <section className="relative w-full bg-[#102B1D] text-white py-14 sm:py-20 overflow-hidden border-b border-emerald-950">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-45 mix-blend-luminosity"
          style={{ backgroundImage: `url('/images/hero-green-bg.jpg')` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0C2216]/95 via-[#0F2D1F]/80 to-transparent" />

        {/* Floating Green Leaf on Left (from Screenshot Image 7) */}
        <div className="pointer-events-none absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 z-10 w-12 sm:w-16 opacity-90 select-none animate-float">
          <img
            src="/images/leaf-left-exact.png"
            alt=""
            className="w-full h-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
            onError={(e) => {
              e.target.src = '/images/leaf-left-trans.png';
            }}
          />
        </div>

        {/* Dot Matrix Pattern on Right (from Screenshot Image 7) */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 z-0 h-36 w-36 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:12px_12px] opacity-20 hidden md:block" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-12 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white capitalize">
            {categoryFilter === 'All' ? 'Dehydrated-Vegetables-Powder' : categoryFilter.replace(/\s+/g, '-')}
          </h1>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-emerald-200/90">
            <span>Home</span>
            <span>-</span>
            <span className="text-[#EAB308] font-semibold">
              {categoryFilter === 'All' ? 'Dehydrated-Vegetables-Powder' : categoryFilter.replace(/\s+/g, '-')}
            </span>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-6 py-4 sm:px-12">
          <div className="flex flex-wrap items-center gap-2">
            {['All', ...categories].map((category) => (
              <button
                type="button"
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  categoryFilter === category
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900 border border-stone-200'
                }`}
              >
                {category === 'All' ? 'All Powders' : category}
              </button>
            ))}
          </div>

          <div className="text-xs font-semibold text-stone-500">
            Showing 1-{filteredProducts.length} of {products.length} results
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="mx-auto max-w-[1440px] px-6 sm:px-12 py-8">
        <div className="flex flex-col gap-4 border-b border-stone-200 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <label htmlFor="product-search" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-500">
              Search Powders &amp; Applications
            </label>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                id="product-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search powder, mesh or application..."
                className="w-full rounded-lg border border-stone-300 bg-white py-2 pl-9 pr-9 text-xs text-stone-900 outline-none placeholder:text-stone-400 focus:border-[#D5AA37] focus:ring-1 focus:ring-[#D5AA37]"
              />
              {search && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 font-medium">Sort By</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-full border border-stone-300 bg-white px-4 py-1.5 text-xs font-semibold text-stone-800 outline-none hover:border-[#D5AA37] cursor-pointer shadow-2xs"
              >
                <option value="name">Recently Added</option>
                <option value="name">Name A–Z</option>
                <option value="category">Category</option>
              </select>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-bold text-amber-800 underline underline-offset-4"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between py-4 text-xs text-stone-500 font-medium">
          <p>
            Showing <strong className="text-stone-900">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'powder' : 'powders'}
          </p>
          <p className="hidden md:block text-stone-400">Specifications &amp; COA available for every order</p>
        </div>

        {/* Powder Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="border border-stone-200 bg-white rounded-2xl py-16 text-center my-6">
            <h2 className="text-lg font-bold text-stone-900">No powders match that search.</h2>
            <p className="mt-1 text-sm text-stone-500">Try another search keyword or reset category filters.</p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 rounded-lg bg-stone-900 px-4 py-2 text-xs font-bold text-white hover:bg-stone-800"
            >
              Clear Search &amp; Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => {
              const isCompared = comparedProducts.some((item) => item.id === product.id);
              return (
                <article
                  key={product.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-xs transition hover:shadow-xl hover:border-stone-400"
                >
                  <div>
                    {/* Powder Photography */}
                    <div
                      onClick={() => onSelectProduct(product)}
                      className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden bg-stone-100"
                    >
                      <img
                        src={product.image}
                        alt={product.imageAlt || product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-106"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 rounded-full bg-stone-900/80 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        {product.category}
                      </span>
                      {product.meshSize && (
                        <span className="absolute top-3 right-3 rounded-md bg-white/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-mono font-semibold text-stone-900">
                          {product.meshSize.split('(')[0].trim()}
                        </span>
                      )}
                      <div className="absolute inset-x-3 bottom-3 flex items-end justify-between text-white">
                        <div>
                          <p className="text-[10px] italic text-white/80">{product.botanicalName}</p>
                          <p className="text-xs font-bold text-amber-300">{product.purity || '100% Pure'}</p>
                        </div>
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm group-hover:bg-[#D5AA37] group-hover:text-stone-950 transition-colors">
                          <ArrowUpRight className="h-4 w-4 font-bold" />
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <h2
                        onClick={() => onSelectProduct(product)}
                        className="cursor-pointer text-base font-extrabold text-stone-900 hover:text-amber-800 transition-colors line-clamp-1"
                      >
                        {product.name}
                      </h2>
                      <p className="mt-2 text-xs leading-relaxed text-stone-600 line-clamp-2">
                        {product.description}
                      </p>

                      {product.forms && (
                        <div className="mt-3.5 border-t border-stone-100 pt-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                            Available Formats:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {product.forms.map((f) => (
                              <span key={f} className="rounded bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-700">
                                {f.split('(')[0].trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {product.applications?.slice(0, 2).map((app) => (
                          <span key={app} className="rounded-full bg-amber-50 border border-amber-200/60 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                            {app.split('&')[0].trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-stone-100 bg-stone-50/70 p-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="flex-1 rounded-lg bg-stone-900 py-2 text-center text-xs font-bold text-white transition hover:bg-stone-800 flex items-center justify-center gap-1"
                    >
                      <span>View Details</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenQuickSpec(product)}
                      title="Quick Specs Sheet"
                      className="rounded-lg border border-stone-300 bg-white p-2 text-stone-600 hover:border-stone-900 hover:text-stone-900 transition"
                    >
                      <FileText className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openQuoteModal(product)}
                      title="Request Quote"
                      className="rounded-lg border border-amber-300 bg-amber-50 p-2 text-amber-800 hover:bg-amber-100 transition"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      title={isCompared ? 'Remove from compare' : 'Add to compare'}
                      onClick={() => (isCompared ? removeFromCompare(product.id) : addToCompare(product))}
                      className={`rounded-lg border p-2 transition ${isCompared ? 'border-amber-500 bg-amber-400 text-stone-950' : 'border-stone-300 bg-white text-stone-600 hover:border-stone-900'}`}
                    >
                      <Layers className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Compare Floating Bar */}
        {comparedProducts.length > 0 && (
          <div className="fixed bottom-6 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 items-center justify-between gap-4 rounded-xl border border-stone-300 bg-white px-5 py-3 text-stone-900 shadow-2xl">
            <p className="text-xs font-bold">
              {comparedProducts.length} powders selected to compare
            </p>
            <button
              type="button"
              onClick={() => setIsCompareOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#D5AA37] px-4 py-2 text-xs font-bold text-stone-950 transition hover:bg-[#C59B2E]"
            >
              Compare Now <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
