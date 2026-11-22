import React from 'react';
import { useProducts } from '../../context/ProductContext';
import { ArrowRight } from 'lucide-react';

export default function ProductCategories({ onSelectCategory }) {
  const { products } = useProducts();
  const categoriesList = [...new Set(products.map((product) => product.category))].map((name) => {
    const categoryProducts = products.filter((product) => product.category === name);
    return {
      id: name,
      name,
      count: categoryProducts.length,
      image: categoryProducts[0].image,
      description: `Explore ${name.toLowerCase()} in the current ingredient range.`,
      samples: categoryProducts.map((product) => product.name)
    };
  });

  return (
    <section className="py-16 md:py-24 bg-[#F5F1E6]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#1F4D36] text-xs font-bold uppercase tracking-wider mb-2">
            Ingredient range
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1F4D36] tracking-tight">
            Browse by product group
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Review the listed products and example applications, then share a brief to discuss your requirements.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesList.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-card hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  <div className="absolute top-3 right-3 bg-[#1F4D36]/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-400/30">
                    {cat.count} {typeof cat.count === 'number' ? 'Powders' : ''}
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#C9972B] transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-xs text-stone-600 leading-relaxed min-h-[36px]">
                    {cat.description}
                  </p>

                  {/* Sample Powders Badges */}
                  <div className="mt-4 pt-3 border-t border-stone-100">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">
                      Popular Ingredients:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.samples.slice(0, 4).map((sample, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium bg-[#F5F1E6] text-stone-700 px-2 py-0.5 rounded-md border border-stone-200/60"
                        >
                          {sample}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Strip */}
              <div className="px-5 py-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#1F4D36] group-hover:text-[#C9972B] group-hover:bg-[#1F4D36]/5 transition-colors">
                <span>Explore ingredients</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
