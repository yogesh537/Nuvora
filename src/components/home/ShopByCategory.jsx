import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { products } from '../../data/products';

const categoryDetails = [
  {
    name: 'Spice Powders',
    description: 'Onion, garlic, ginger and green chilli.'
  },
  {
    name: 'Vegetable Powders',
    description: 'Beetroot and spinach for savory or beverage applications.'
  },
  {
    name: 'Herbal & Botanical',
    description: 'Moringa leaf and rose petal powders.'
  },
  {
    name: 'Exotic Fruit',
    description: 'Green jackfruit powder for product development.'
  }
];

export default function ShopByCategory({ onSelectCategory }) {
  const categories = categoryDetails
    .map((category) => {
      const categoryProducts = products.filter((product) => product.category === category.name);
      return {
        ...category,
        count: categoryProducts.length,
        image: categoryProducts[0]?.image
      };
    })
    .filter((category) => category.count > 0);

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mb-8 flex flex-col gap-4 border-b border-[#183126]/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#9b7a32]">Product groups / sourcing index</p>
            <h2 className="text-3xl font-black tracking-[-0.04em] text-[#183126] sm:text-4xl">Browse by ingredient</h2>
            <p className="mt-2 max-w-xl text-xs leading-5 text-[#657067] sm:text-sm">
              Start with the category that fits your formulation. Product specifications are available on request.
            </p>
          </div>
          <button
            onClick={() => onSelectCategory('All')}
            className="inline-flex items-center gap-2 self-start border-b border-[#183126]/40 pb-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#183126] transition hover:border-[#9b7a32] hover:text-[#9b7a32] sm:self-auto"
          >
            View full catalog <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {categories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => onSelectCategory(category.name)}
              className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9b7a32]"
            >
              <div className="relative aspect-[1.08/1] overflow-hidden bg-[#e8e5da]">
                <img
                  src={category.image}
                  alt={`${category.name} ingredient`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10231a]/75 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 border border-white/40 bg-[#183126]/75 px-2 py-1 font-mono text-[9px] text-white">
                  0{index + 1} / {String(category.count).padStart(2, '0')}
                </span>
                <ArrowUpRight className="absolute bottom-3 right-3 h-5 w-5 text-white transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <div className="border-b border-[#183126]/20 py-3">
                <h3 className="text-sm font-bold text-[#183126] sm:text-base">{category.name}</h3>
                <p className="mt-1 text-[10px] leading-4 text-[#657067] sm:text-xs">{category.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
