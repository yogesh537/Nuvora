import React from 'react';

const categories = [
  {
    name: "ONION POWDER",
    categoryFilter: "Spice Powders",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=350&q=80",
    color: "from-amber-100/60 to-amber-50"
  },
  {
    name: "GARLIC POWDER",
    categoryFilter: "Spice Powders",
    image: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=350&q=80",
    color: "from-stone-100 to-stone-50"
  },
  {
    name: "GINGER POWDER",
    categoryFilter: "Spice Powders",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=350&q=80",
    color: "from-amber-200/50 to-amber-100/30"
  },
  {
    name: "BEETROOT POWDER",
    categoryFilter: "Vegetable Powders",
    image: "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?auto=format&fit=crop&w=350&q=80",
    color: "from-rose-200/50 to-rose-100/30"
  },
  {
    name: "MORINGA LEAF",
    categoryFilter: "Herbal & Botanical",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=350&q=80",
    color: "from-emerald-200/50 to-emerald-100/30"
  },
  {
    name: "SPINACH POWDER",
    categoryFilter: "Vegetable Powders",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=350&q=80",
    color: "from-green-200/50 to-green-100/30"
  },
  {
    name: "ROSE PETAL",
    categoryFilter: "Herbal & Botanical",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=350&q=80",
    color: "from-pink-200/50 to-pink-100/30"
  },
  {
    name: "JACKFRUIT & CHILLI",
    categoryFilter: "Exotic Fruit",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=350&q=80",
    color: "from-amber-100 to-emerald-50"
  }
];

export default function ShopByCategoryCircular({ onSelectCategory }) {
  return (
    <section className="py-14 sm:py-16 bg-[#FAF8F5] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Ornamental Header: — SHOP BY CATEGORY — */}
        <div className="flex items-center justify-center gap-4 mb-10 sm:mb-12">
          <div className="h-px bg-stone-300 w-16 sm:w-28"></div>
          <div className="flex items-center gap-2 text-stone-700">
            <span className="text-xs sm:text-[13px] font-serif font-bold uppercase tracking-[0.26em]">
              SHOP BY CATEGORY
            </span>
          </div>
          <div className="h-px bg-stone-300 w-16 sm:w-28"></div>
        </div>

        {/* 8 Circular Dishes Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 sm:gap-5 text-center">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => onSelectCategory(cat.categoryFilter)}
              className="flex flex-col items-center group focus:outline-none"
            >
              {/* Circular Ceramic Dish with Powder */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-white border border-stone-300 shadow-sm group-hover:shadow-md group-hover:border-[#1E3A2B] transition-all duration-300 mb-3 relative overflow-hidden">
                <div className="w-full h-full rounded-full overflow-hidden bg-stone-100 relative">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Subtle inner shadow of porcelain dish */}
                  <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none border border-black/5"></div>
                </div>
              </div>

              {/* Title & Link */}
              <span className="text-[11px] sm:text-xs font-serif font-bold uppercase tracking-wider text-stone-900 group-hover:text-[#1E3A2B] transition-colors leading-tight">
                {cat.name}
              </span>
              <span className="text-[10px] text-stone-500 font-medium group-hover:underline mt-0.5">
                Shop Now
              </span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
