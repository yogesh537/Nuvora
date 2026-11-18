import React from 'react';
import { ArrowRight, MessageCircle, Eye, Star } from 'lucide-react';
import { useLeads } from '../../context/LeadContext';

const featuredProducts = [
  {
    id: 'onion-powder',
    badge: 'Best Seller',
    badgeColor: 'bg-amber-500',
    name: 'Dehydrated Onion Powder',
    botanicalName: 'Allium cepa',
    desc: 'Free-flowing steam-sterilized white onion powder. 80-100 mesh, moisture ≤5%.',
    price: '$3.80 / kg',
    moq: 'MOQ: 500 kg',
    rating: 4.9,
    reviews: 1256,
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=500&q=80',
    waMsg: 'Hello, I want bulk pricing for Dehydrated Onion Powder from Nuvaro Agro.',
  },
  {
    id: 'moringa-powder',
    badge: 'Organic',
    badgeColor: 'bg-green-600',
    name: 'Moringa Leaf Powder',
    botanicalName: 'Moringa oleifera',
    desc: 'NPOP certified organic shade-dried moringa superfine powder. 28% plant protein.',
    price: '$4.75 / kg',
    moq: 'MOQ: 100 kg',
    rating: 4.8,
    reviews: 1420,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=80',
    waMsg: 'Hello, I want bulk pricing for Moringa Leaf Powder from Nuvaro Agro.',
  },
  {
    id: 'beetroot-powder',
    badge: 'New',
    badgeColor: 'bg-rose-500',
    name: 'Beetroot Spray Dried Powder',
    botanicalName: 'Beta vulgaris',
    desc: 'Ruby red nitrate-rich beetroot powder. Water soluble, clean label, vibrant colour.',
    price: '$5.90 / kg',
    moq: 'MOQ: 200 kg',
    rating: 4.7,
    reviews: 875,
    image: 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?auto=format&fit=crop&w=500&q=80',
    waMsg: 'Hello, I want bulk pricing for Beetroot Powder from Nuvaro Agro.',
  },
  {
    id: 'ginger-powder',
    badge: 'Premium',
    badgeColor: 'bg-yellow-600',
    name: 'Ginger Powder Superfine',
    botanicalName: 'Zingiber officinale',
    desc: 'Warm golden-tan 80-100 mesh ginger powder standardized for 5% gingerols.',
    price: '$6.40 / kg',
    moq: 'MOQ: 250 kg',
    rating: 4.9,
    reviews: 982,
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=500&q=80',
    waMsg: 'Hello, I want bulk pricing for Ginger Powder from Nuvaro Agro.',
  },
];

export default function FeaturedProducts({ onSelectProduct }) {
  const { openQuoteModal } = useLeads();

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#c8922b] mb-2">Featured Products</div>
            <h2 className="text-3xl font-extrabold text-stone-900 leading-tight">
              Our Best Selling<br/>Powders
            </h2>
            <p className="text-stone-500 text-sm mt-2">
              Handcrafted by quality, trusted by food brands worldwide.
            </p>
          </div>
          <button
            onClick={() => onSelectProduct(null)}
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#1a3d2b] hover:underline"
          >
            View Products <ArrowRight className="w-4 h-4"/>
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => {
            const waUrl = `https://wa.me/919820012345?text=${encodeURIComponent(p.waMsg)}`;
            return (
              <div key={p.id} className="group bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">

                {/* Image */}
                <div className="relative aspect-square bg-stone-50 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    onClick={() => onSelectProduct({ id: p.id, name: p.name })}
                  />
                  <span className={`absolute top-3 left-3 ${p.badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide`}>
                    {p.badge}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="text-[11px] italic text-stone-400 mb-0.5">{p.botanicalName}</div>
                  <h3
                    className="font-bold text-[14px] text-stone-800 group-hover:text-[#1a3d2b] cursor-pointer mb-1 transition-colors"
                    onClick={() => onSelectProduct({ id: p.id, name: p.name })}
                  >
                    {p.name}
                  </h3>
                  <p className="text-[12px] text-stone-500 leading-snug mb-3 flex-1">{p.desc}</p>

                  {/* Price row */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-stone-900 text-sm">{p.price}</span>
                    <span className="text-[11px] text-stone-400 font-medium">{p.moq}</span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_,i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-[11px] text-stone-400">({p.reviews.toLocaleString()})</span>
                  </div>

                  {/* Action buttons - B2B style (no cart) */}
                  <div className="space-y-2">
                    <button
                      onClick={() => openQuoteModal()}
                      className="w-full bg-[#c8922b] hover:bg-[#b07d22] text-white text-xs font-bold py-2.5 rounded-lg transition-colors"
                    >
                      Request Quote
                    </button>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full border border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5"/>
                      Order on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile view all */}
        <div className="mt-6 text-center sm:hidden">
          <button onClick={() => onSelectProduct(null)} className="text-sm font-semibold text-[#1a3d2b] flex items-center gap-1 mx-auto">
            View All Products <ArrowRight className="w-4 h-4"/>
          </button>
        </div>

      </div>
    </section>
  );
}
