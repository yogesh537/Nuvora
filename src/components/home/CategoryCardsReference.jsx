import React from 'react';
import { 
  ArrowRight, 
  Carrot, 
  Apple, 
  Leaf, 
  Flame, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

const referenceCategories = [
  {
    id: "Vegetable Powders",
    title: "Vegetables",
    subtitle: "Spinach, Beetroot, Carrot",
    badge: "80 Mesh & Air Dried",
    accentColor: "text-emerald-700 bg-emerald-50",
    icon: Carrot,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=700&q=85",
    description: "Nutrient-dense dehydrated vegetables for soups, seasonings, and natural coloring."
  },
  {
    id: "Fruit Powders",
    title: "Fruits",
    subtitle: "Alphonso Mango, Banana",
    badge: "Spray Dried & Pure",
    accentColor: "text-amber-700 bg-amber-50",
    icon: Apple,
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=700&q=85",
    description: "100% natural fruit solids preserving natural fructose, aroma, and instant solubility."
  },
  {
    id: "Herbal & Ayurvedic Powders",
    title: "Herbal & Ayurvedic",
    subtitle: "Moringa, Amla, Ashwagandha",
    badge: "Botanical Powders",
    accentColor: "text-green-700 bg-green-50",
    icon: Leaf,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=700&q=85",
    description: "Botanical powders for wellness, beverage, food and personal-care formulations."
  },
  {
    id: "Spice Powders",
    title: "Spices & Roots",
    subtitle: "Turmeric, Garlic, Onion, Ginger",
    badge: "Steam Sterilized",
    accentColor: "text-orange-700 bg-orange-50",
    icon: Flame,
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=700&q=85",
    description: "High-essential oil dehydrated spices with strict international microbiological thresholds."
  },
  {
    id: "Superfood Blends",
    title: "Superfood Blends",
    subtitle: "Greens & Custom Formulations",
    badge: "Turnkey Private Label",
    accentColor: "text-teal-700 bg-teal-50",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=700&q=85",
    description: "Bespoke carrier-free botanical blends tailored to your exact active formulation."
  }
];

export default function CategoryCardsReference({ onSelectCategory }) {
  return (
    <section className="py-14 lg:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading matching reference */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#1F4D36] block mb-2 font-sans">
            SHOP BY CATEGORY
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#1F4D36] tracking-tight">
            Best of Nature, Handpicked for You
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-2">
            Dehydrated botanical powders processed to retain natural pigment, taste, and active nutrition.
          </p>
        </div>

        {/* 5 Cards Row matching reference design with smooth hover lift & zoom */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {referenceCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group cursor-pointer bg-white rounded-3xl p-3 border border-stone-200/90 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-2 hover:border-[#1F4D36]/40"
              >
                <div>
                  {/* Image Container with rounded top and floating icon badge */}
                  <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden bg-stone-100">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Floating Circular Badge in bottom-left corner of image */}
                    <div className="absolute bottom-2.5 left-2.5 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#1F4D36] group-hover:bg-[#1F4D36] group-hover:text-white transition-all duration-300 border border-stone-100 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Top Right Mini Tag */}
                    <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full border border-white/20">
                      {cat.badge}
                    </div>
                  </div>

                  {/* Card Titles */}
                  <div className="pt-4 pb-2 px-1">
                    <h3 className="font-bold text-sm sm:text-base text-stone-900 group-hover:text-[#1F4D36] transition-colors leading-tight">
                      {cat.title}
                    </h3>
                    <p className="text-[11px] text-stone-500 mt-0.5 truncate">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                {/* Bottom Row with Animated Arrow Button */}
                <div className="pt-2 px-1 flex items-center justify-between border-t border-stone-100 mt-1">
                  <span className="text-[11px] font-semibold text-[#1F4D36] group-hover:text-[#C9972B] transition-colors">
                    View Specs
                  </span>
                  <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center group-hover:bg-[#1F4D36] group-hover:text-white transition-all duration-300 group-hover:translate-x-1 shadow-sm">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
