import React from 'react';
import { ArrowRight } from 'lucide-react';

const posts = [
  {
    date: 'May 1, 2025',
    category: 'Technology',
    title: 'The Science of Spray Drying vs Freeze Drying',
    img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=500&q=80',
    slug: 'spray-vs-freeze-drying',
  },
  {
    date: 'May 5, 2025',
    category: 'Health & Nutrition',
    title: 'Top Dehydrated Powders for Daily Wellness Blends',
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80',
    slug: 'dehydrated-powders-wellness',
  },
  {
    date: 'May 10, 2025',
    category: 'B2B Insights',
    title: 'How Moringa Powder Boosts Natural Immunity & Energy',
    img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=80',
    slug: 'moringa-immunity',
  },
];

export default function LatestBlog({ onNavigate }) {
  return (
    <section className="py-14 bg-[#f8f7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-stone-900">Latest from Blog</h2>
            <p className="text-stone-500 text-sm mt-1">Top recipes and articles for a greener, growing business.</p>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="text-sm font-semibold text-[#1a3d2b] flex items-center gap-1 hover:underline"
          >
            View Articles <ArrowRight className="w-4 h-4"/>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p) => (
            <div key={p.slug} className="bg-white rounded-2xl overflow-hidden border border-stone-100 hover:shadow-md transition-all group cursor-pointer"
              onClick={() => onNavigate('blog')}>
              <div className="aspect-[16/9] overflow-hidden bg-stone-100">
                <img src={p.img} alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] text-stone-400">{p.date}</span>
                  <span className="text-[10px] bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">{p.category}</span>
                </div>
                <h3 className="font-bold text-[14px] text-stone-800 group-hover:text-[#1a3d2b] transition-colors leading-snug mb-3">{p.title}</h3>
                <span className="text-xs font-semibold text-[#c8922b] hover:underline">Read More →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
