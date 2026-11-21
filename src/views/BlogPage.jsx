import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Clock3 } from 'lucide-react';
import { useLeads } from '../context/LeadContext';
import { blogPostsData, products } from '../data/products';

function ArticleMeta({ article }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-semibold text-[#657067]">
      {article.date && <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-[#9b7a32]" /> {article.date}</span>}
      {article.readTime && <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-[#9b7a32]" /> {article.readTime}</span>}
      <span className="text-[#9b7a32]">{article.category}</span>
    </div>
  );
}

function PhotoCredit({ article }) {
  if (!article.imageCredit) return null;
  return (
    <a
      href={article.imageCreditUrl}
      target="_blank"
      rel="noreferrer"
      onClick={(event) => event.stopPropagation()}
      className="inline-block text-[8px] font-medium text-[#657067] underline decoration-[#657067]/40 underline-offset-2 hover:text-[#183126]"
    >
      Photo: {article.imageCredit}
    </a>
  );
}

export default function BlogPage({ selectedPost, onSelectPost, onSelectProduct }) {
  const [activeArticle, setActiveArticle] = useState(selectedPost || null);
  const { openQuoteModal } = useLeads();

  useEffect(() => {
    setActiveArticle(selectedPost || null);
  }, [selectedPost]);

  const openArticle = (article) => {
    setActiveArticle(article);
    onSelectPost(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const closeArticle = () => {
    setActiveArticle(null);
    onSelectPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const openRelatedProduct = (product) => {
    onSelectPost(null);
    onSelectProduct(product);
  };

  if (activeArticle) {
    const relatedProduct = products.find((product) => product.id === activeArticle.productId);
    return (
      <div className="min-h-screen bg-[#f4f1e8] text-[#183126]">
        <section className="bg-[#183126] text-[#f4f1e8]">
          <div className="mx-auto max-w-[1440px] px-5 pt-5 sm:px-8 lg:px-12">
            <button type="button" onClick={closeArticle} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.12em] text-white/65 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> All articles
            </button>
          </div>
          <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1fr_0.85fr]">
            <div className="flex flex-col justify-center px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#d4ad49]">{activeArticle.category} / Sourcing notes</p>
              <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.05em] sm:text-5xl">{activeArticle.title}</h1>
              <div className="mt-6"><ArticleMeta article={activeArticle} /></div>
            </div>
            <div className="relative min-h-[260px] overflow-hidden bg-[#756e5b] sm:min-h-[360px] lg:min-h-[460px]">
              <img src={activeArticle.image} alt={activeArticle.imageAlt || ''} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10231a]/45 to-transparent" />
              {activeArticle.imageCredit && (
                <div className="absolute bottom-4 right-4 bg-[#f4f1e8]/95 px-2.5 py-1.5">
                  <PhotoCredit article={activeArticle} />
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_340px] lg:px-12 lg:py-16">
          <article className="max-w-3xl">
            <p className="border-l-2 border-[#9b7a32] pl-5 text-lg font-medium leading-8 text-[#425047] sm:text-xl">
              {activeArticle.excerpt}
            </p>
            {activeArticle.content && (
              <div className="mt-8 space-y-5 border-t border-[#183126]/20 pt-6 text-sm leading-7 text-[#59635b]">
                <p>{activeArticle.content}</p>
              </div>
            )}
            <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-[#183126]/20 pt-6">
              <button type="button" onClick={closeArticle} className="inline-flex items-center gap-2 border-b border-[#183126] pb-1 text-[9px] font-black uppercase tracking-[0.12em]">
                <ArrowLeft className="h-3.5 w-3.5" /> More articles
              </button>
              <button type="button" onClick={() => openQuoteModal(relatedProduct || null)} className="inline-flex items-center gap-2 bg-[#183126] px-4 py-3 text-[9px] font-black uppercase tracking-[0.1em] text-white hover:bg-[#2b4939]">
                Ask about a product <ArrowUpRight className="h-4 w-4 text-[#d4ad49]" />
              </button>
            </div>
          </article>

          <aside className="h-fit border-t border-[#183126]/20 bg-[#ebe7db] p-5 sm:p-6 lg:sticky lg:top-8">
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#9b7a32]">For your product brief</p>
            <h2 className="mt-3 text-xl font-black tracking-[-0.03em]">Questions worth clarifying</h2>
            <ul className="mt-5 space-y-3 border-t border-[#183126]/15 pt-4 text-xs leading-5 text-[#536056]">
              <li>Intended application and destination</li>
              <li>Product specification and order volume</li>
              <li>Packaging, checks and documents needed</li>
            </ul>
            {relatedProduct && (
              <div className="mt-6 border-t border-[#183126]/15 pt-5">
                <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#657067]">Related catalog item</p>
                <img src={relatedProduct.image} alt={relatedProduct.imageAlt || relatedProduct.name} className="mt-3 h-32 w-full object-cover" />
                {relatedProduct.imageCredit && (
                  <a href={relatedProduct.imageCreditUrl} target="_blank" rel="noreferrer" className="mt-2 block text-[8px] text-[#657067] underline underline-offset-2">
                    Photo: {relatedProduct.imageCredit}
                  </a>
                )}
                <p className="mt-3 text-xs font-black">{relatedProduct.name}</p>
                <p className="mt-1 text-[9px] text-[#657067]">{relatedProduct.category}</p>
                <button type="button" onClick={() => openRelatedProduct(relatedProduct)} className="mt-4 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.1em]">
                  View product <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </aside>
        </section>
      </div>
    );
  }

  const [featuredArticle, ...otherArticles] = blogPostsData;

  return (
    <div className="min-h-screen bg-[#f4f1e8] text-[#183126]">
      <section className="relative overflow-hidden bg-[#183126] text-[#f4f1e8]">
        <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="relative mx-auto grid max-w-[1440px] gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_0.65fr] lg:items-end lg:px-12 lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#d4ad49]">
              <BookOpen className="h-4 w-4" /> Field notes / Ingredient sourcing
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              Better questions
              <br />
              <span className="font-medium italic text-[#d4ad49]">make better briefs.</span>
            </h1>
          </div>
          <p className="max-w-lg text-sm leading-7 text-white/65">
            Practical notes for product teams reviewing ingredients, applications and the details to confirm before an order.
          </p>
        </div>
      </section>

      {featuredArticle && (
        <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
          <article className="grid overflow-hidden border border-[#183126]/20 md:grid-cols-[1.05fr_0.95fr]">
            <button type="button" onClick={() => openArticle(featuredArticle)} aria-label={`Read ${featuredArticle.title}`} className="group relative min-h-[260px] overflow-hidden bg-[#756e5b] text-left sm:min-h-[360px]">
              <img src={featuredArticle.image} alt={featuredArticle.imageAlt || ''} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10231a]/55 via-transparent to-transparent" />
              <span className="absolute left-4 top-4 bg-[#183126] px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-[#d4ad49]">Featured note</span>
            </button>
            <div className="flex flex-col justify-center bg-[#ebe7db] p-6 sm:p-9 lg:p-12">
              <ArticleMeta article={featuredArticle} />
              <button type="button" onClick={() => openArticle(featuredArticle)} className="mt-5 text-left text-3xl font-black leading-[1.02] tracking-[-0.045em] hover:text-[#9b7a32] sm:text-4xl">
                {featuredArticle.title}
              </button>
              <p className="mt-4 max-w-xl text-sm leading-6 text-[#657067]">{featuredArticle.excerpt}</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <button type="button" onClick={() => openArticle(featuredArticle)} className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.13em]">
                  Read the note <ArrowRight className="h-4 w-4 text-[#9b7a32]" />
                </button>
                <PhotoCredit article={featuredArticle} />
              </div>
            </div>
          </article>
        </section>
      )}

      <section className="border-y border-[#183126]/15 bg-[#ebe7db]">
        <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
          <div className="mb-7 flex flex-col gap-3 border-b border-[#183126]/20 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#9b7a32]">The archive / {String(otherArticles.length).padStart(2, '0')} notes</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">More from the field</h2>
            </div>
            <p className="max-w-md text-xs leading-5 text-[#657067]">Use these guides to prepare your next ingredient conversation.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherArticles.map((article, index) => (
              <article key={article.id} className="flex flex-col border border-[#183126]/15 bg-[#f4f1e8]">
                <button type="button" onClick={() => openArticle(article)} aria-label={`Read ${article.title}`} className="group relative h-48 overflow-hidden bg-[#756e5b] text-left">
                  <img src={article.image} alt={article.imageAlt || ''} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  <span className="absolute left-3 top-3 bg-[#183126] px-2.5 py-1.5 font-mono text-[9px] text-[#d4ad49]">{String(index + 2).padStart(2, '0')}</span>
                </button>
                <div className="flex flex-1 flex-col p-5">
                  <ArticleMeta article={article} />
                  <button type="button" onClick={() => openArticle(article)} className="mt-3 text-left text-lg font-black leading-tight tracking-[-0.025em] hover:text-[#9b7a32]">
                    {article.title}
                  </button>
                  <p className="mt-3 flex-1 text-xs leading-5 text-[#657067]">{article.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#183126]/15 pt-4">
                    <button type="button" onClick={() => openArticle(article)} className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.1em]">
                      Read note <ArrowUpRight className="h-3.5 w-3.5 text-[#9b7a32]" />
                    </button>
                    <PhotoCredit article={article} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
