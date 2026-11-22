import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLeads } from '../../context/LeadContext';

const allPowders = [
  {
    name: 'Dehydrated Onion Powder',
    price: '$3.80 / kg',
    moq: '500 kg',
    stars: 4.9,
    reviews: 1256,
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80',
    badge: 'Best Seller',
    badgeColor: 'bg-amber-500',
    waMsg: 'Hello, I want bulk pricing for Dehydrated Onion Powder from Nuvaro Agro.',
  },
  {
    name: 'Ginger Powder',
    price: '$6.40 / kg',
    moq: '250 kg',
    stars: 4.9,
    reviews: 982,
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=400&q=80',
    badge: 'Premium',
    badgeColor: 'bg-yellow-600',
    waMsg: 'Hello, I want bulk pricing for Ginger Powder from Nuvaro Agro.',
  },
  {
    name: 'Dehydrated Garlic Powder',
    price: '$4.20 / kg',
    moq: '500 kg',
    stars: 4.8,
    reviews: 1150,
    image: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=400&q=80',
    badge: 'Export Ready',
    badgeColor: 'bg-blue-600',
    waMsg: 'Hello, I want bulk pricing for Garlic Powder from Nuvaro Agro.',
  },
  {
    name: 'Beetroot Powder',
    price: '$5.90 / kg',
    moq: '200 kg',
    stars: 4.7,
    reviews: 875,
    image: 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?auto=format&fit=crop&w=400&q=80',
    badge: 'Natural Color',
    badgeColor: 'bg-rose-500',
    waMsg: 'Hello, I want bulk pricing for Beetroot Powder from Nuvaro Agro.',
  },
  {
    name: 'Moringa Leaf Powder',
    price: '$4.75 / kg',
    moq: '100 kg',
    stars: 4.8,
    reviews: 1420,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=80',
    badge: 'Botanical',
    badgeColor: 'bg-green-600',
    waMsg: 'Hello, I want bulk pricing for Moringa Powder from Nuvaro Agro.',
  },
  {
    name: 'Rose Petal Powder',
    price: '$9.20 / kg',
    moq: '100 kg',
    stars: 4.9,
    reviews: 653,
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=400&q=80',
    badge: 'Floral',
    badgeColor: 'bg-pink-500',
    waMsg: 'Hello, I want bulk pricing for Rose Petal Powder from Nuvaro Agro.',
  },
];

export default function CustomerFavorites({ onSelectProduct }) {
  const { openQuoteModal } = useLeads();

  return (
    <section className="py-14 bg-[#f8f7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-stone-900">Customer Favorites</h2>
            <p className="text-stone-500 text-sm mt-1">Loved by our clients, these are the most popular powders.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onSelectProduct(null)}
              className="text-sm font-semibold text-[#1a3d2b] flex items-center gap-1 hover:underline"
            >
              View All <ArrowRight className="w-4 h-4"/>
            </button>
          </div>
        </div>

        {/* Horizontal scrollable row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {allPowders.map((p) => {
            const waUrl = `https://wa.me/918087405952?text=${encodeURIComponent(p.waMsg)}`;
            return (
              <div key={p.name} className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-all group flex flex-col">
                <div className="relative aspect-square bg-stone-50 overflow-hidden">
                  <img src={p.image} alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  <span className={`absolute top-2 left-2 ${p.badgeColor} text-white text-[9px] font-bold px-2 py-0.5 rounded-full`}>
                    {p.badge}
                  </span>
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <h4 className="font-bold text-[12px] text-stone-800 leading-snug mb-1 line-clamp-2">{p.name}</h4>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_,i) => (
                        <svg key={i} className="w-2.5 h-2.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-[10px] text-stone-400">({p.reviews})</span>
                  </div>
                  <div className="text-xs font-bold text-stone-800 mb-3">{p.price}</div>
                  <button
                    onClick={() => openQuoteModal(p)}
                    className="w-full bg-[#c8922b] hover:bg-[#b07d22] text-white text-[10px] font-bold py-2 rounded-lg transition-colors mt-auto"
                  >
                    Request Quote
                  </button>
                  <a href={waUrl} target="_blank" rel="noreferrer"
                    className="w-full text-center text-emerald-700 text-[10px] font-semibold mt-1.5 hover:underline flex items-center justify-center gap-1">
                    <MessageCircle className="w-3 h-3"/>
                    WhatsApp
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
