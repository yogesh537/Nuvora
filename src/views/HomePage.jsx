import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  Sparkles,
  Search,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Scale,
  Truck,
  CheckCircle2,
  Clock,
  Layers,
  Phone,
  Sprout,
  Globe2,
  HeartHandshake,
  Award,
  Star,
  Plus,
  Minus,
  ArrowUp
} from 'lucide-react';
import { useLeads } from '../context/LeadContext';
import { useCompare } from '../context/CompareContext';
import { products } from '../data/products';

export default function HomePage({ onSelectProduct, onSelectCategory, onOpenQuickSpec }) {
  const { openQuoteModal, openSampleModal } = useLeads();
  const { comparedProducts, addToCompare, removeFromCompare } = useCompare();

  // --- Hero Carousel Slides (Matching Image 1 & Previous User Uploads) ---
  const heroSlides = [
    {
      id: 'ginger-powder',
      title: "India’s Trusted Bulk Supplier of Dehydrated Powders",
      subtitle: "100% natural vegetable and fruit powders for leading food & pharma brands across the globe.",
      cta: "View Products",
      image: '/images/hero-ginger-exact.jpg',
      alt: "Ginger Powder & Roots",
      badge: "Pure Ginger Root Sifted",
      hasLeftLeaf: true,
      hasTextLeaf: false,
    },
    {
      id: 'beetroot-powder',
      title: "Spice Powders, Flakes & Granules – All in Bulk",
      subtitle: "Authentic Indian flavor, delivered in bulk quantities globally.",
      cta: "Dehydrated Powders",
      image: '/images/powders/hero-beetroot-exact.jpg',
      alt: "Vibrant Beetroot Powder",
      badge: "Vibrant Red • 80-100 Mesh",
      hasLeftLeaf: true,
      hasTextLeaf: true,
    },
    {
      id: 'jackfruit-powder',
      title: "Superfood Flours & Exotic Dehydrated Essentials",
      subtitle: "Low-GI green jackfruit flour, garlic flakes, and farm-fresh dried alliums.",
      cta: "Explore Catalog",
      image: '/images/card-onion-granules-exact.jpg',
      alt: "Dehydrated Onion & Garlic",
      badge: "Low GI • 100% Natural",
      hasLeftLeaf: true,
      hasTextLeaf: false,
    }
  ];

  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const currentHero = heroSlides[heroSlide];
  const currentHeroProduct =
    products.find((p) => p.id === currentHero.id) || products[0];

  // --- 6 Trust Pillars (Matching Screenshot Top Row) ---
  const trustPillars = [
    { title: 'Purely Grown', icon: Sprout },
    { title: 'Naturally Trusted', icon: HeartHandshake },
    { title: 'Rooted in Care', icon: Globe2 },
    { title: 'Sustainably Yours', icon: Leaf },
    { title: 'Ethically Nurtured', icon: Award },
    { title: 'Timeless Quality', icon: Clock }
  ];

  // --- Recent Products Carousel Items (Matching Image 3 Exactly) ---
  const recentProducts = [
    {
      id: 'onion-powder',
      name: 'Onion Granules',
      category: 'Spice Powders',
      format: '16-40 Mesh Granules',
      rating: 5,
      image: '/images/card-onion-granules-exact.jpg',
      fallback: '/images/card-red-onion.jpg'
    },
    {
      id: 'carrot-powder',
      name: 'Carrot Flakes',
      category: 'Vegetable Powders',
      format: 'Dehydrated Carrot Slices',
      rating: 5,
      image: '/images/card-carrot-flakes-exact.jpg',
      fallback: '/images/card-cabbage.jpg'
    },
    {
      id: 'garlic-powder',
      name: 'Garlic Minced',
      category: 'Spice Powders',
      format: 'Minced & Granules',
      rating: 5,
      image: '/images/card-garlic-minced-exact.jpg',
      fallback: '/images/powders/garlic-powder.jpg',
      isGreenText: true
    },
    {
      id: 'pink-onion-flakes',
      name: 'Pink Onion Flakes',
      category: 'Spice Powders',
      format: 'Crisp Dehydrated Flakes',
      rating: 5,
      image: '/images/card-pink-flakes-exact.jpg',
      fallback: '/images/card-pink-onion.jpg'
    },
    {
      id: 'beetroot-powder',
      name: 'Beetroot Powder',
      category: 'Vegetable Powders',
      format: '80-100 Mesh Fine',
      rating: 5,
      image: '/images/powders/beetroot-powder.jpg',
      fallback: '/images/card-red-onion.jpg'
    },
    {
      id: 'jackfruit-powder',
      name: 'Green Jackfruit Flour',
      category: 'Specialty Powders',
      format: 'Prebiotic Raw Fruit',
      rating: 5,
      image: '/images/powders/jackfruit-powder.jpg',
      fallback: '/images/card-ginger.jpg'
    }
  ];

  const [recentIndex, setRecentIndex] = useState(0);
  const visibleCards = 4;
  const maxRecentIndex = Math.max(0, recentProducts.length - visibleCards);

  const nextRecent = () => {
    setRecentIndex((prev) => (prev >= maxRecentIndex ? 0 : prev + 1));
  };
  const prevRecent = () => {
    setRecentIndex((prev) => (prev <= 0 ? maxRecentIndex : prev - 1));
  };

  // --- Execution Process Steps (Matching Image 4 Exactly) ---
  const executionSteps = [
    {
      step: '01',
      title: 'Sourcing with Soul',
      desc: 'From sun-kissed fields to careful hands, we source ethically grown harvests, nurtured with tradition and integrity.',
      icon: Globe2,
      isGreenCard: false,
    },
    {
      step: '02',
      title: 'Refining Purity, Preserving Excellence',
      desc: 'Every grain undergoes meticulous grading and sorting, ensuring nature’s best reaches you in its purest form.',
      icon: Sprout,
      isGreenCard: true, // Exact green card from Image 4 screenshot
    },
    {
      step: '03',
      title: 'Precision Dehydration & Milling',
      desc: 'Low-temperature dehydration locks in volatile essential oils, authentic flavors, and vital nutrients.',
      icon: Scale,
      isGreenCard: false,
    },
    {
      step: '04',
      title: 'Global Delivery & Export Assurance',
      desc: 'Hermetically packed under stringent international standards, dispatched with verified COAs to 40+ countries.',
      icon: Truck,
      isGreenCard: false,
    }
  ];

  // --- Trending Products Spotlight (Matching Image 5 Exactly) ---
  const trendingList = [
    {
      id: 'red-onion-flakes',
      title: "Red Onion Flakes",
      rating: 5,
      description: "Bursting with flavor, Red Onion Flakes are made from high-quality red onions, carefully dehydrated to retain their natural sweetness and tangy taste. These flakes are perfect for adding depth to gravies, sauces, and spice mixes, delivering the essence of fresh onions with extended shelf life and zero preparation hassle.",
      image: '/images/spotlight-red-onion-flakes.jpg',
      category: 'Spice Powders'
    },
    {
      id: 'beetroot-powder',
      title: "Pure Beetroot Powder",
      rating: 5,
      description: "Rich in natural betacyanin pigments and dietary nitrates, our spray-dried and dehydrated beetroot powder provides vivid ruby-red coloration and mild earthy sweetness for smoothies, bakery, and clean-label confectionery.",
      image: '/images/powders/beetroot-powder.jpg',
      category: 'Vegetable Powders'
    },
    {
      id: 'ginger-powder',
      title: "Ginger Powder & Bits",
      rating: 5,
      description: "Sun-dried ginger rhizomes milled to an aromatic 80-100 mesh, offering high gingerol potency, warming spice punch, and pure solubility for nutraceutical and culinary formulations.",
      image: '/images/hero-ginger-exact.jpg',
      category: 'Spice Powders'
    },
    {
      id: 'jackfruit-powder',
      title: "Green Jackfruit Flour",
      rating: 5,
      description: "A clinically proven low glycemic index superfood flour ground from mature, unripe green jackfruits. Naturally rich in insoluble prebiotic fiber and resistant starch.",
      image: '/images/powders/jackfruit-powder.jpg',
      category: 'Specialty Powders'
    }
  ];
  const [selectedTrending, setSelectedTrending] = useState(0);

  // --- FAQs Accordion State (Matching Image 6 Exactly) ---
  const faqItems = [
    {
      question: "What Is The Shelf Life Of Dehydrated Vegetable Powder?",
      answer: "Our dehydrated vegetable and fruit powders typically have a shelf life of 12 to 24 months when stored in a cool, dry place away from direct sunlight in airtight moisture-barrier packaging."
    },
    {
      question: "Do You Supply In Bulk Quantities?",
      answer: "Yes, we specialize in bulk supply for manufacturers, exporters, traders, and distributors."
    },
    {
      question: "Are Your Products Free From Additives?",
      answer: "Yes, 100% pure with zero artificial colors, zero synthetic preservatives, and zero chemical additives. Non-GMO and allergen-free."
    },
    {
      question: "Can I Get Product Samples Before Placing A Bulk Order?",
      answer: "Absolutely. We provide laboratory sample kits and commercial sample dispatch (100g - 500g) via international express courier within 48 hours."
    },
    {
      question: "Do You Export Internationally?",
      answer: "Yes, we export to over 40 countries across North America, Europe, the Middle East, Southeast Asia, and Africa with complete customs and phytosanitary clearance."
    },
    {
      question: "What Is Your Minimum Order Quantity (MOQ)?",
      answer: "Our standard export MOQ is 500 kg per ingredient, and 50–100 kg for trial domestic or specialized batches."
    }
  ];
  const [openFaqIndex, setOpenFaqIndex] = useState(1); // Item 1 (Do you supply in bulk) is open in Image 6

  const toggleFaq = (idx) => {
    setOpenFaqIndex((prev) => (prev === idx ? -1 : idx));
  };

  // --- Catalog Filters ---
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.botanicalName?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query);
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const scrollToCatalog = () => {
    const el = document.getElementById('products-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#D5AA37] selection:text-stone-950 overflow-x-hidden">

      {/* =========================================================================
          HERO SECTION: BOTANICAL FOLIAGE THEME (Exact Match to Image 1 & Image 7)
          ========================================================================= */}
      <section className="relative w-full bg-[#102B1D] text-white py-12 sm:py-16 lg:py-20 overflow-hidden border-b border-emerald-950">
        {/* Dark Tropical Leaf Background Texture */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-45 mix-blend-luminosity"
          style={{ backgroundImage: `url('/images/hero-green-bg.jpg')` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0C2216]/95 via-[#0F2D1F]/80 to-transparent" />

        {/* Floating Green Spice Leaf on Left Margin (from Screenshot Image 1) */}
        <div className="pointer-events-none absolute left-3 sm:left-6 md:left-10 top-[48%] -translate-y-1/2 z-10 w-12 sm:w-16 md:w-20 select-none animate-float">
          <img
            src="/images/leaf-left-exact.png"
            alt=""
            className="w-full h-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] opacity-95"
            onError={(e) => {
              e.target.src = '/images/leaf-left-trans.png';
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-10 lg:gap-14 xl:gap-20">
            
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <div className="relative inline-block">
                <h1 className="text-[32px] sm:text-[44px] md:text-[50px] lg:text-[54px] xl:text-[58px] font-black leading-[1.12] tracking-tight text-white">
                  {currentHero.title.split('–')[0]}
                  {currentHero.title.includes('–') && (
                    <>
                      <br />
                      <span className="relative inline-block">
                        – {currentHero.title.split('–')[1]}
                        {/* Floating Leaf Overlapping Right Side */}
                        {currentHero.hasTextLeaf && (
                          <span className="pointer-events-none absolute -right-10 sm:-right-14 -top-4 w-12 sm:w-16 select-none animate-float-delayed">
                            <img
                              src="/images/leaf-text-exact.png"
                              alt=""
                              className="w-full h-auto drop-shadow-[0_6px_15px_rgba(0,0,0,0.6)]"
                              onError={(e) => {
                                e.target.src = '/images/leaf-text-trans.png';
                              }}
                            />
                          </span>
                        )}
                      </span>
                    </>
                  )}
                </h1>
              </div>

              <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-emerald-100/90 leading-relaxed font-normal max-w-lg">
                {currentHero.subtitle}
              </p>

              <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={scrollToCatalog}
                  className="rounded-full bg-[#EAB308] hover:bg-[#F59E0B] px-8 sm:px-10 py-3.5 text-sm sm:text-base font-bold text-stone-950 shadow-lg shadow-black/25 transition-all duration-300 hover:scale-102 active:scale-95 focus:outline-none"
                >
                  {currentHero.cta}
                </button>
                <button
                  type="button"
                  onClick={() => openQuoteModal(currentHeroProduct)}
                  className="rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/20 hover:border-white"
                >
                  Request Bulk Quote
                </button>
              </div>

              {/* 3-Line Indicators (from Screenshot Image 1) */}
              <div className="mt-12 sm:mt-16 flex items-center gap-3">
                {heroSlides.map((_, idx) => {
                  const isActive = idx === heroSlide;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setHeroSlide(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className="py-2 focus:outline-none"
                    >
                      <div
                        className={`h-[4px] rounded-full transition-all duration-300 ${
                          isActive
                            ? 'w-14 sm:w-18 bg-[#EAB308]'
                            : 'w-10 sm:w-12 bg-white/40 hover:bg-white/70'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Sliding Image (Exact Match to Image 1 & Image 7) */}
            <div className="relative flex justify-center lg:justify-end">
              <div
                onClick={() => onSelectProduct(currentHeroProduct)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-2xl border border-white/20 transition-all duration-500 hover:scale-[1.02] w-full max-w-[500px] aspect-[4/3] bg-black/40"
              >
                <img
                  key={currentHero.image}
                  src={currentHero.image}
                  alt={currentHero.alt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  loading="eager"
                  onError={(e) => {
                    e.target.src = '/images/powders/hero-beetroot-exact.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#EAB308]">
                        {currentHero.badge}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-white">
                        {currentHero.alt}
                      </h4>
                    </div>
                    <span className="rounded-full bg-[#EAB308] text-stone-950 p-2 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: 6 TRUST PILLARS (Matching Screenshot Top Row)
          ========================================================================= */}
      <section className="border-b border-stone-200 bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {trustPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="group flex flex-col items-center text-center cursor-default transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-50/50 text-emerald-700 transition-all duration-300 group-hover:border-emerald-600 group-hover:bg-emerald-100 group-hover:scale-105 shadow-xs">
                    <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="mt-3 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-700 group-hover:text-emerald-800 transition-colors">
                    {pillar.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: ABOUT US (Exact Match to Image 2: Text, Collage & Yellow Call Badge)
          ========================================================================= */}
      <section className="mx-auto max-w-[1440px] px-6 sm:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] items-center gap-12 lg:gap-16">
          
          {/* Left: 4-Photo Collage with Yellow Call Us Anytime Badge */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            {/* Green Dot-Matrix Background Accents from Screenshot */}
            <div className="absolute -top-6 -left-6 z-0 h-36 w-36 bg-[radial-gradient(#15803d_2px,transparent_2px)] [background-size:14px_14px] opacity-35" />
            <div className="absolute -bottom-6 -right-6 z-0 h-36 w-36 bg-[radial-gradient(#15803d_2px,transparent_2px)] [background-size:14px_14px] opacity-35" />

            {/* Collage 4-Photo Grid */}
            <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="overflow-hidden rounded-xl shadow-md transition duration-500 hover:scale-103 aspect-[1/1.1]">
                <img
                  src="/images/collage-hands.jpg"
                  alt="Harvested wheat crop"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="overflow-hidden rounded-xl shadow-md transition duration-500 hover:scale-103 aspect-[1.1/1]">
                <img
                  src="/images/collage-bullock.jpg"
                  alt="Farmer plowing green field with white bullocks"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="overflow-hidden rounded-xl shadow-md transition duration-500 hover:scale-103 aspect-[1/1.2]">
                <img
                  src="/images/collage-woman.jpg"
                  alt="Harvesting red chili peppers"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="overflow-hidden rounded-xl shadow-md transition duration-500 hover:scale-103 aspect-[1/1]">
                <img
                  src="/images/collage-farmer.jpg"
                  alt="Dedicated smiling Indian farmer"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Floating "Call Us Anytime" Yellow Card (Exact Match to Screenshot Image 2) */}
            <div className="absolute -bottom-5 sm:-bottom-7 left-6 sm:left-10 z-20 animate-float">
              <a
                href="tel:+918888006532"
                className="flex items-center gap-3.5 rounded-2xl bg-[#EAB308] px-5 py-3.5 shadow-xl transition-all duration-300 hover:bg-[#F59E0B] hover:scale-105 group"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#183D28] text-white shadow-sm transition-transform group-hover:rotate-12">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-900/80">
                    Call Us Anytime
                  </span>
                  <span className="block text-base sm:text-lg font-black text-stone-950 tracking-tight">
                    +91 8888006532
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right: Exact Copy from Screenshot Image 2 */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 mb-3">
              <Leaf className="h-3.5 w-3.5" />
              <span>ABOUT US</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight leading-[1.18]">
              Leading Dehydrated Vegetable &amp; Fruit Powder Wholesale Supplier in India
            </h2>

            <p className="mt-6 text-sm sm:text-base leading-relaxed text-stone-600">
              Welcome to Bulk in Global, India’s trusted name in the world of dehydrated vegetable powder, dehydrated fruit powder, spice powders, whole spices, and flakes and granules. Whether you’re sourcing for food production, retail, exports, or your restaurant chain – we’re the go-to wholesale suppliers in India for all things dry, natural, and flavorful.
            </p>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-stone-600">
              We specialize in delivering <strong>bulk dehydrated powders</strong> and spices that retain the color, taste, and nutritional value of fresh produce – minus the perishability. Our products are ready to use, shelf-stable, and packed under strict hygienic conditions.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={scrollToCatalog}
                className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-3.5 text-xs sm:text-sm font-bold text-white transition hover:bg-stone-800"
              >
                <span>View Product Range</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => openQuoteModal()}
                className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-6 py-3.5 text-xs sm:text-sm font-bold text-stone-800 transition hover:border-[#D5AA37]"
              >
                <span>Request Custom Sourcing</span>
                <ArrowUpRight className="h-4 w-4 text-[#D5AA37]" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: RECENT PRODUCTS CAROUSEL (Exact Match to Image 3)
          ========================================================================= */}
      <section className="border-y border-stone-200 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12">
          
          {/* Header with Sunburst Rays from Screenshot */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <div className="inline-flex flex-col items-center mb-2">
              <div className="flex items-center gap-1 text-emerald-600 mb-1">
                <span className="h-2 w-0.5 bg-emerald-600 rotate-[-25deg]" />
                <span className="h-3 w-0.5 bg-emerald-600" />
                <span className="h-2 w-0.5 bg-emerald-600 rotate-[25deg]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                DELIGHTFULLY REFRESHING
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight">
              Recent Products
            </h2>
          </div>

          {/* Cards Grid / Slider */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentProducts.slice(recentIndex, recentIndex + visibleCards).map((item, idx) => {
                const fullProduct = products.find((p) => p.id === item.id) || products[0];

                return (
                  <div
                    key={`${item.name}-${idx}`}
                    onClick={() => onSelectProduct(fullProduct)}
                    className="group cursor-pointer rounded-xl border border-stone-200 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-2 hover:border-stone-400 hover:shadow-xl flex flex-col justify-between relative"
                  >
                    <div>
                      {/* Product Photo */}
                      <div className="relative aspect-[1/1] w-full overflow-hidden rounded-lg bg-stone-50 flex items-center justify-center p-2 mb-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-108"
                          onError={(e) => {
                            e.target.src = item.fallback;
                          }}
                        />

                        {/* Yellow Pill Button "View Details" (from Garlic Minced card in screenshot) */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
                          <span className="rounded-full bg-[#EAB308] hover:bg-[#F59E0B] px-5 py-2 text-xs font-bold text-stone-950 shadow-md">
                            View Details
                          </span>
                        </div>
                      </div>

                      {/* Product Name */}
                      <h3 className={`text-sm sm:text-base font-extrabold ${item.isGreenText ? 'text-emerald-700' : 'text-stone-900'} group-hover:text-amber-800 transition-colors`}>
                        {item.name}
                      </h3>

                      {/* Specification format */}
                      <p className="mt-1 text-xs text-stone-500 font-medium">
                        {item.format}
                      </p>

                      {/* 5-Star Rating in Gold (from Screenshot) */}
                      <div className="mt-2.5 flex items-center gap-1 text-[#F59E0B]">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-[#F59E0B]" />
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-700 group-hover:text-amber-800">
                      <span>View Specifications</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slider Controls */}
            {recentProducts.length > visibleCards && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={prevRecent}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-xs transition hover:border-stone-900 hover:text-stone-900"
                  aria-label="Previous products"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Slider Indicator Lines (from Screenshot) */}
                <div className="flex items-center gap-2">
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      recentIndex === 0 ? 'w-10 bg-[#D5AA37]' : 'w-6 bg-stone-200'
                    }`}
                  />
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      recentIndex > 0 ? 'w-10 bg-[#D5AA37]' : 'w-6 bg-stone-200'
                    }`}
                  />
                </div>

                <button
                  type="button"
                  onClick={nextRecent}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-xs transition hover:border-stone-900 hover:text-stone-900"
                  aria-label="Next products"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: EXECUTION PROCESS (Exact Match to Image 4: White Cards & Green Card 2)
          ========================================================================= */}
      <section className="mx-auto max-w-[1440px] px-6 sm:px-12 py-16 sm:py-24">
        
        {/* Header with Sunburst Rays */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex flex-col items-center mb-2">
            <div className="flex items-center gap-1 text-emerald-600 mb-1">
              <span className="h-2 w-0.5 bg-emerald-600 rotate-[-25deg]" />
              <span className="h-3 w-0.5 bg-emerald-600" />
              <span className="h-2 w-0.5 bg-emerald-600 rotate-[25deg]" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              EXECUTION PROCESS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight">
            A Journey of Trust &amp; Excellence
          </h2>
        </div>

        {/* 4 Process Cards matching Image 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {executionSteps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.step}
                className={`relative rounded-xl border p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between overflow-hidden ${
                  step.isGreenCard
                    ? 'bg-[#0B7337] border-[#0B7337] text-white shadow-lg' // Card 2 Green Background from Image 4
                    : 'bg-white border-stone-200 text-stone-900 shadow-xs'
                }`}
              >
                <div>
                  {/* Yellow round icon with decorative sunburst rays */}
                  <div className="relative mb-6 inline-block">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FBBF24] text-stone-950 shadow-md">
                      <Icon className="h-8 w-8 text-stone-900 stroke-[1.8]" />
                    </div>
                  </div>

                  <h3 className={`text-lg sm:text-xl font-bold leading-snug ${step.isGreenCard ? 'text-white' : 'text-stone-900'}`}>
                    {step.title}
                  </h3>

                  <p className={`mt-3 text-xs sm:text-sm leading-relaxed ${step.isGreenCard ? 'text-emerald-50/90' : 'text-stone-600'}`}>
                    {step.desc}
                  </p>
                </div>

                {/* Bottom Right Arrow Triangle Cut (Exact from Screenshot Image 4) */}
                <div className="mt-8 flex justify-end">
                  <div className={`flex items-center justify-center h-10 w-12 rounded-tl-lg transition-transform hover:translate-x-1 ${
                    step.isGreenCard ? 'bg-[#064e26] text-white' : 'bg-stone-100 text-stone-800'
                  }`}>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: TRENDING PRODUCTS / TOP SELLING PRODUCTS (Exact Match to Image 5)
          ========================================================================= */}
      <section className="border-y border-stone-200 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              TRENDING PRODUCTS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight mt-1">
              Top Selling Products
            </h2>
          </div>

          {/* Spotlight Showcase Container (Exact Match to Image 5) */}
          <div className="relative mx-auto max-w-5xl rounded-2xl border border-stone-200/90 bg-white p-6 sm:p-10 shadow-sm">
            {/* Green Dot Matrix Background Accent on Left */}
            <div className="absolute top-10 left-6 z-0 h-36 w-24 bg-[radial-gradient(#15803d_2px,transparent_2px)] [background-size:12px_12px] opacity-40 hidden sm:block" />

            {/* Spotlight Content */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-14">
              
              {/* Left: Big photo of Red Onion Flakes in glass bowl with fresh onions */}
              <div className="flex justify-center">
                <div className="relative aspect-square w-full max-w-[380px] overflow-hidden rounded-2xl bg-stone-50 flex items-center justify-center p-4">
                  <img
                    src={trendingList[selectedTrending].image}
                    alt={trendingList[selectedTrending].title}
                    className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* Right: Stars, Title, Description, Get Enquiry Button */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1 text-[#F59E0B] mb-2">
                  {[...Array(trendingList[selectedTrending].rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#F59E0B]" />
                  ))}
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  {trendingList[selectedTrending].title}
                </h3>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-stone-600">
                  {trendingList[selectedTrending].description}
                </p>

                <div className="mt-7">
                  <button
                    type="button"
                    onClick={() => {
                      const prod = products.find((p) => p.name.toLowerCase().includes(trendingList[selectedTrending].title.toLowerCase())) || products[0];
                      openQuoteModal(prod);
                    }}
                    className="rounded-full bg-[#EAB308] hover:bg-[#F59E0B] px-10 py-3.5 text-sm sm:text-base font-bold text-stone-950 shadow-md transition-all duration-300 hover:scale-102 active:scale-95"
                  >
                    Get Enquiry
                  </button>
                </div>
              </div>

            </div>

            {/* Switchers for Other Top Sellers */}
            <div className="mt-10 pt-6 border-t border-stone-100 flex flex-wrap items-center justify-center gap-2">
              {trendingList.map((item, idx) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setSelectedTrending(idx)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                    selectedTrending === idx
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: FREQUENTLY ASKED QUESTIONS (Exact Match to Image 6)
          ========================================================================= */}
      <section className="mx-auto max-w-[1440px] px-6 sm:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-12 lg:gap-16">
          
          {/* Left Column: Accordions matching Image 6 */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              FAQS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight mt-1 mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {faqItems.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;

                return (
                  <div
                    key={faq.question}
                    className="rounded-lg border border-stone-200 bg-white overflow-hidden transition-all duration-300 shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className={`text-sm sm:text-base font-bold transition-colors ${
                        isOpen ? 'text-emerald-700' : 'text-stone-900' // Green title when open as in Image 6
                      }`}>
                        {faq.question}
                      </span>
                      <span className={`shrink-0 text-stone-400 transition-colors ${isOpen ? 'text-emerald-700 font-bold' : ''}`}>
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Mortar & Pestle Spice Collage (Exact Match to Image 6) */}
          <div className="relative flex justify-center">
            {/* Green Dot Grid Background Accent */}
            <div className="absolute -top-8 -right-4 z-0 h-44 w-32 bg-[radial-gradient(#15803d_2px,transparent_2px)] [background-size:12px_12px] opacity-45" />

            {/* Overlapping Collage from Image 6 */}
            <div className="relative z-10 w-full max-w-[420px] rounded-2xl overflow-hidden shadow-2xl border border-stone-200/80 bg-white">
              <img
                src="/images/faq-spice-collage.jpg"
                alt="Stone mortar pestle with red chilies and ground chili powder"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: BULK POWDER CATALOG & FORMAT FILTERS
          ========================================================================= */}
      <section id="products-catalog" className="border-t border-stone-200 bg-[#FAF9F6] py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12">
          
          <div className="mb-10 flex flex-col justify-between gap-4 border-b border-stone-200 pb-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                EXPORT INGREDIENTS
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-stone-900 mt-1">
                Dehydrated Powder &amp; Flakes Catalog
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-xl">
                Select any ingredient to view full technical specifications, COA parameters, and packaging options.
              </p>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isCompared = comparedProducts.some((p) => p.id === product.id);

              return (
                <div
                  key={product.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-stone-400"
                >
                  <div>
                    {/* Powder Photo */}
                    <div
                      onClick={() => onSelectProduct(product)}
                      className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden bg-stone-100"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-106"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                      
                      <span className="absolute top-3 left-3 rounded-full bg-stone-900/80 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        {product.category}
                      </span>

                      {product.meshSize && (
                        <span className="absolute top-3 right-3 rounded-md bg-white/95 backdrop-blur-sm px-2 py-0.5 text-[10px] font-mono font-semibold text-stone-900">
                          {product.meshSize.split('(')[0].trim()}
                        </span>
                      )}

                      <div className="absolute inset-x-3 bottom-3 flex items-end justify-between text-white">
                        <div>
                          <p className="text-[10px] italic text-white/80">{product.botanicalName}</p>
                          <p className="text-xs font-bold text-amber-300">{product.purity || '100% Pure'}</p>
                        </div>
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm group-hover:bg-[#D5AA37] group-hover:text-stone-950 transition-colors">
                          <ArrowUpRight className="h-4 w-4 font-bold" />
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="cursor-pointer text-base font-extrabold text-stone-900 hover:text-amber-800 transition-colors line-clamp-1"
                      >
                        {product.name}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-stone-600 line-clamp-2">
                        {product.description}
                      </p>

                      {product.forms && (
                        <div className="mt-3.5 border-t border-stone-100 pt-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                            Available Formats:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {product.forms.map((f) => (
                              <span key={f} className="rounded bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-700">
                                {f.split('(')[0].trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="border-t border-stone-100 bg-stone-50/70 p-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="flex-1 rounded-lg bg-stone-900 py-2 text-center text-xs font-bold text-white transition hover:bg-stone-800 flex items-center justify-center gap-1"
                    >
                      <span>View Details</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenQuickSpec(product)}
                      title="Quick Specs Sheet"
                      className="rounded-lg border border-stone-300 bg-white p-2 text-stone-600 hover:border-stone-900 hover:text-stone-900 transition"
                    >
                      <FileText className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openQuoteModal(product)}
                      title="Request Quote"
                      className="rounded-lg border border-amber-300 bg-amber-50 p-2 text-amber-800 hover:bg-amber-100 transition"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      title={isCompared ? 'Remove from compare' : 'Add to compare'}
                      onClick={() => (isCompared ? removeFromCompare(product.id) : addToCompare(product))}
                      className={`rounded-lg border p-2 transition ${isCompared ? 'border-amber-500 bg-amber-400 text-stone-950' : 'border-stone-300 bg-white text-stone-600 hover:border-stone-900'}`}
                    >
                      <Layers className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 8: DIRECT BULK QUOTATION STRIP
          ========================================================================= */}
      <section className="bg-stone-900 text-white py-16">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12">
          <div className="rounded-2xl bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 border border-stone-700 p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#EAB308]">
                Direct Factory Pricing
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
                Request a Custom Bulk Sourcing Quotation
              </h2>
              <p className="mt-3 text-sm text-stone-300 leading-relaxed">
                Receive commercial pricing schedules for 500kg up to full container loads (FCL), with fast 48-hour dispatch for laboratory testing samples.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                type="button"
                onClick={() => openQuoteModal()}
                className="rounded-xl bg-[#EAB308] hover:bg-[#F59E0B] px-8 py-3.5 text-center text-xs sm:text-sm font-extrabold uppercase tracking-wider text-stone-950 shadow-md transition active:scale-95"
              >
                Request Quotation
              </button>
              <button
                type="button"
                onClick={() => openSampleModal()}
                className="rounded-xl border border-stone-500 bg-white/10 px-8 py-3.5 text-center text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white/20"
              >
                Request 100g Sample
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Scroll-to-Top Button (from Screenshot Image 6) */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-white border border-stone-300 text-stone-800 shadow-xl hover:border-emerald-700 hover:text-emerald-700 transition-all hover:scale-110 active:scale-95"
      >
        <ArrowUp className="h-5 w-5" />
      </button>

    </div>
  );
}