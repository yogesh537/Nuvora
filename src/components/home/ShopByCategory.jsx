import React from 'react';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Vegetable Powders',
    desc: 'Spinach, beetroot, tomato & more',
    image: 'https://images.unsplash.com/photo-1704079698754-5e621edb610b?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Spice Powders',
    desc: 'Onion, garlic, ginger & chilli',
    image: 'https://images.unsplash.com/photo-1611255942500-dd0189272535?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Herbal & Botanical',
    desc: 'Moringa, rose petal, tulsi',
    image: 'https://images.unsplash.com/photo-1652757359639-575cbb557a38?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Exotic Fruit',
    desc: 'Jackfruit, mango, amla & banana',
    image: 'https://plus.unsplash.com/premium_photo-1755174757420-f4990bf672dd?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Superfood Blends',
    desc: 'Moringa, greens & custom blends',
    image: 'https://images.unsplash.com/photo-1710857389305-5cba9211033f?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Custom Formulations',
    desc: 'Made to your specifications',
    image: 'https://images.unsplash.com/photo-1611255944156-2c324e4c5a23?auto=format&fit=crop&w=600&q=80',
  },
];

export default function ShopByCategory({ onSelectCategory }) {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A762F]">Find your ingredient</span>
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-[#1F4D36] sm:text-3xl">
              Explore our categories
            </h2>
            <p className="mt-2 max-w-xl text-xs leading-5 text-stone-500 sm:text-sm">
              From familiar kitchen staples to distinctive botanicals, find the right ingredient for your next formulation.
            </p>
          </div>
          <button
            onClick={() => onSelectCategory('All')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F4D36] transition hover:text-[#9A762F]"
          >
            See all products <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onSelectCategory(category.name)}
              className="group overflow-hidden rounded-xl border border-stone-100 bg-[#F7F7F0] text-left transition duration-300 hover:-translate-y-1 hover:border-[#1F4D36]/20 hover:shadow-lg"
            >
              <div className="aspect-[1.15/1] overflow-hidden bg-[#E8EBDD]">
                <img
                  src={category.image}
                  alt={`${category.name} powder`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-3 sm:p-3.5">
                <div className="text-xs font-semibold leading-tight text-stone-800 transition-colors group-hover:text-[#1F4D36]">
                  {category.name}
                </div>
                <div className="mt-1 text-[10px] leading-4 text-stone-500">{category.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
