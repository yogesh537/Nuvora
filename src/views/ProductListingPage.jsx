import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, Layers, Search, X } from 'lucide-react';
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
          ...(product.applications || [])
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
    <div className="min-h-screen bg-[#f4f1e8] text-[#183126]">
      <section className="relative overflow-hidden bg-[#183126] text-[#f4f1e8]">
        <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-12 -top-20 h-72 w-72 rounded-full border border-[#d4ad49]/20" />
        <div className="relative mx-auto grid max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:px-12 lg:py-20">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4ad49]">Nuvaro Agro / Ingredient catalog</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              Find the right
              <br />
              <span className="font-serif font-medium italic text-[#d4ad49]">starting point.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              Explore the listed ingredients and example applications. Share your brief to discuss fit, specifications, packaging and order details.
            </p>
          </div>
          <div className="flex items-center gap-8 border-t border-white/20 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div>
              <p className="text-3xl font-black">{String(products.length).padStart(2, '0')}</p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/55">Listed ingredients</p>
            </div>
            <div>
              <p className="text-3xl font-black">{String(categories.length).padStart(2, '0')}</p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/55">Product groups</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#183126]/15 bg-[#ebe7db]">
        <div className="mx-auto flex max-w-[1440px] flex-wrap gap-x-6 gap-y-3 px-5 py-4 sm:px-8 lg:px-12">
          {['All', ...categories].map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setCategoryFilter(category)}
              aria-pressed={categoryFilter === category}
              className={`border-b-2 pb-1 text-[10px] font-black uppercase tracking-[0.12em] ${categoryFilter === category ? 'border-[#9b7a32] text-[#183126]' : 'border-transparent text-[#657067] hover:text-[#183126]'}`}
            >
              {category === 'All' ? 'All ingredients' : category}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="flex flex-col gap-5 border-b border-[#183126]/20 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <label htmlFor="product-search" className="mb-2 block text-[9px] font-black uppercase tracking-[0.16em] text-[#657067]">
              Search ingredients and uses
            </label>
            <div className="relative w-full sm:w-[min(100%,440px)]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7d6c53]" />
              <input
                id="product-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Ingredient, botanical name or application"
                className="w-full border border-[#183126]/20 bg-white py-3 pl-10 pr-10 text-xs text-[#183126] outline-none placeholder:text-[#8a8b81] focus:border-[#9b7a32]"
              />
              {search && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#657067] hover:text-[#183126]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <label className="text-[9px] font-black uppercase tracking-[0.16em] text-[#657067]">
              Sort
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="mt-2 block min-w-36 border border-[#183126]/20 bg-white px-3 py-3 text-xs font-medium normal-case tracking-normal text-[#183126] outline-none focus:border-[#9b7a32]"
              >
                <option value="name">Name A–Z</option>
                <option value="category">Product group</option>
              </select>
            </label>
            {hasActiveFilters && (
              <button type="button" onClick={resetFilters} className="pb-3 text-[10px] font-black uppercase tracking-[0.12em] text-[#8a493b] underline underline-offset-4">
                Clear filters
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between py-5">
          <p className="text-xs text-[#657067]">
            <strong className="text-[#183126]">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'ingredient' : 'ingredients'}
          </p>
          <p className="hidden text-[9px] font-black uppercase tracking-[0.14em] text-[#7d6c53] md:block">Order specifications confirmed per inquiry</p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="border-y border-[#183126]/20 py-16 text-center">
            <h2 className="text-xl font-black">No ingredients match that search.</h2>
            <p className="mt-2 text-sm text-[#657067]">Try another search or clear the selected product group.</p>
            <button type="button" onClick={resetFilters} className="mt-5 border-b border-[#183126] pb-1 text-[10px] font-black uppercase tracking-[0.12em]">
              Clear search and filters
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {filteredProducts.map((product, index) => {
              const isCompared = comparedProducts.some((item) => item.id === product.id);
              return (
                <article key={product.id} className="group flex min-w-0 flex-col border border-[#183126]/15 bg-white/70 transition-shadow hover:shadow-[0_18px_45px_-30px_rgba(24,49,38,0.5)]">
                  <div className="relative h-56 overflow-hidden bg-[#e6e2d7] sm:h-60">
                    <img
                      src={product.image}
                      alt={product.imageAlt || ''}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#10231a]/65 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 text-[9px] font-black uppercase tracking-[0.15em] text-white">
                      {product.category} <span className="ml-2 font-mono text-white/65">{String(index + 1).padStart(2, '0')}</span>
                    </span>
                    {product.imageCredit && (
                      <a
                        href={product.imageCreditUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute right-3 top-3 max-w-[calc(100%-1.5rem)] border border-white/50 bg-[#183126]/85 px-2 py-1 text-right text-[7px] font-bold leading-3 text-white backdrop-blur-sm hover:bg-[#183126]"
                      >
                        Photo: {product.imageCredit}
                      </a>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="text-[9px] font-bold italic tracking-wide text-[#7d6c53]">{product.botanicalName}</p>
                    <h2 className="mt-2 text-xl font-black leading-tight tracking-[-0.035em]">{product.name}</h2>
                    <p className="mt-3 text-xs leading-5 text-[#657067]">{product.description}</p>
                    <div className="mt-5 border-t border-[#183126]/15 pt-4">
                      <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#9b7a32]">Example uses to discuss</p>
                      <p className="mt-2 text-xs leading-5 text-[#425047]">{product.applications?.slice(0, 2).join(' · ')}</p>
                    </div>
                    <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="inline-flex min-h-10 flex-1 items-center justify-between gap-2 bg-[#183126] px-3.5 text-[9px] font-black uppercase tracking-[0.1em] text-white transition hover:bg-[#2b4939]"
                      >
                        View ingredient <ArrowUpRight className="h-4 w-4 text-[#d4ad49]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => openQuoteModal(product)}
                        aria-label={`Request a quote for ${product.name}`}
                        className="grid h-10 w-10 place-items-center border border-[#183126]/20 text-[#183126] transition hover:border-[#9b7a32] hover:text-[#9b7a32]"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label={`${isCompared ? 'Remove' : 'Add'} ${product.name} ${isCompared ? 'from' : 'to'} comparison`}
                        aria-pressed={isCompared}
                        onClick={() => (isCompared ? removeFromCompare(product.id) : addToCompare(product))}
                        className={`grid h-10 w-10 place-items-center border transition ${isCompared ? 'border-[#9b7a32] bg-[#d4ad49] text-[#183126]' : 'border-[#183126]/20 text-[#183126] hover:border-[#9b7a32]'}`}
                      >
                        <Layers className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenQuickSpec(product)}
                        className="w-full border-t border-[#183126]/15 pt-3 text-left text-[9px] font-black uppercase tracking-[0.1em] text-[#657067] hover:text-[#183126]"
                      >
                        Open product overview
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {comparedProducts.length > 0 && (
          <div className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 items-center justify-between gap-4 border border-white/20 bg-[#183126] px-4 py-3 text-white shadow-xl sm:bottom-6 sm:px-5">
            <p className="text-xs"><strong>{comparedProducts.length}</strong> ingredients selected to compare</p>
            <button
              type="button"
              onClick={() => setIsCompareOpen(true)}
              className="inline-flex shrink-0 items-center gap-2 bg-[#d4ad49] px-3 py-2 text-[9px] font-black uppercase tracking-[0.08em] text-[#183126]"
            >
              Compare <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
