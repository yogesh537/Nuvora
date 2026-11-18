import React, { useState } from 'react';
import { blogPostsData } from '../data/products';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, BookOpen } from 'lucide-react';
import { useLeads } from '../context/LeadContext';

export default function BlogPage({ selectedPost, onSelectPost, onBackToHome }) {
  const [activeArticle, setActiveArticle] = useState(selectedPost || null);
  const { openQuoteModal } = useLeads();

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {activeArticle ? (
          /* Single Article Reader View */
          <div className="max-w-4xl mx-auto space-y-8">
            <button
              onClick={() => setActiveArticle(null)}
              className="flex items-center gap-2 text-xs font-semibold text-[#1F4D36] hover:text-[#C9972B] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Articles
            </button>

            <article className="bg-white rounded-3xl p-6 sm:p-12 border border-stone-200 shadow-card space-y-6">
              <div className="space-y-3">
                <span className="bg-[#1F4D36] text-white text-[11px] font-bold px-3 py-1 rounded-full inline-block">
                  {activeArticle.category}
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 leading-tight">
                  {activeArticle.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-2 border-b border-stone-100 pb-4">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-[#C9972B]" /> {activeArticle.author}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#1F4D36]" /> {activeArticle.date}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-600" /> {activeArticle.readTime}
                  </span>
                </div>
              </div>

              {/* Cover Image */}
              <div className="rounded-2xl overflow-hidden h-72 sm:h-96">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Body Content */}
              <div className="prose prose-stone max-w-none text-stone-700 text-sm sm:text-base leading-relaxed space-y-4">
                <p className="font-semibold text-lg text-stone-900 leading-relaxed">
                  {activeArticle.excerpt}
                </p>

                <p>{activeArticle.content}</p>

                <h3 className="text-xl font-bold text-[#1F4D36] pt-4">
                  Key Technical Takeaways for Industrial Formulation
                </h3>

                <ul className="list-disc list-inside space-y-2 text-stone-700">
                  <li><strong>Particle Size Distribution:</strong> Spray-dried spheres demonstrate higher free-flowing bulk densities (0.50 - 0.65 g/ml), reducing warehouse footprint and improving automatic hopper dosing.</li>
                  <li><strong>Thermal Inactivation:</strong> Excessive heat during air-drying can degrade anthocyanins and betanins. Low-temperature vacuum cycles prevent color loss.</li>
                  <li><strong>Hygroscopic Control:</strong> Fruit sugars (fructose, glucose) require hermetic nitrogen-flushed barrier bags to eliminate ambient humidity agglomeration.</li>
                </ul>

                <p className="pt-2">
                  At <strong>Nuvaro Agro Pvt Ltd</strong>, our application laboratories assist client R&D teams in choosing the ideal drying method, carrier ratio, and mesh micronization to maximize product quality and cost-efficiency.
                </p>
              </div>

              {/* Bottom CTA Box */}
              <div className="mt-8 pt-6 border-t border-stone-200 bg-[#F5F1E6] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Need Custom Technical Specifications?</h4>
                  <p className="text-xs text-stone-600">Request sample batches with custom moisture limits or carrier ratios.</p>
                </div>
                <button
                  onClick={() => openQuoteModal()}
                  className="px-5 py-2.5 rounded-xl bg-[#C9972B] hover:bg-[#b58622] text-white font-bold text-xs shadow shrink-0"
                >
                  Request Technical Consultation
                </button>
              </div>
            </article>
          </div>
        ) : (
          /* All Articles Grid */
          <div>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#1F4D36] text-xs font-bold uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5" /> Technical Publications
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F4D36] tracking-tight">
                Drying Science & Industry Insights
              </h1>
              <p className="text-stone-600 text-sm mt-2">
                Whitepapers and regulatory advisories authored by our food technologists and QA specialists.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPostsData.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setActiveArticle(post)}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-card transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[#1F4D36] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                        {post.category}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="text-[11px] text-stone-400">
                        {post.date} &bull; {post.readTime}
                      </div>
                      <h3 className="font-bold text-base text-stone-900 group-hover:text-[#1F4D36] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 py-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#1F4D36]">
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
