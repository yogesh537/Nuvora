import React from 'react';
import { blogPostsData } from '../../data/products';
import { ArrowRight, Calendar, Clock, User, BookOpen } from 'lucide-react';

export default function BlogPreview({ onSelectBlogPost, onViewAllBlogs }) {
  return (
    <section className="py-16 md:py-24 bg-[#F5F1E6]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#1F4D36] text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" /> Technical Knowledge Base
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1F4D36] tracking-tight">
              Drying Science & Industry Insights
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Engineering guides, regulatory compliance updates, and analytical testing methodologies.
            </p>
          </div>

          <button
            onClick={onViewAllBlogs}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-bold text-[#1F4D36] hover:text-[#C9972B] transition-colors"
          >
            <span>View All Research Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPostsData.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectBlogPost(post)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail */}
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

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-stone-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#C9972B]" /> {post.date}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-600" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-stone-900 group-hover:text-[#1F4D36] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#1F4D36] group-hover:text-[#C9972B]">
                <span>Read Full Analysis</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
