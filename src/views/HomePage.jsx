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

  // --- Hero Carousel Slides (Full HD Studio Assets) ---
  const heroSlides = [
    {
      id: 'ginger-powder',
      eyebrow: '100% PURE & STEAM STERILIZED',
      titlePrefix: 'India’s Trusted Bulk Supplier of ',
      titleHighlight: 'Dehydrated Powders',
      subtitle: 'Pure vegetable, fruit, and spice powders with guaranteed volatile oil retention, zero artificial fillers, and global export certification.',
      cta: 'View Products',
      image: '/images/powders/ginger-powder.jpg',
      alt: 'Sun-Dried Ginger Powder & Roots',
      badge: 'Pure Ginger Root • 80-100 Mesh',
      tags: ['Non-GMO', 'Steam Sterilized', 'High Gingerol']
    },
    {
      id: 'beetroot-powder',
      eyebrow: 'VIBRANT NATURAL COLORANT',
      titlePrefix: 'Spice Powders, Flakes & Granules – ',
      titleHighlight: 'All in Bulk',
      subtitle: 'Authentic Indian farm harvests, dehydrated under precision low-temperature conditions and delivered in export container loads globally.',
      cta: 'Dehydrated Powders',
      image: '/images/powders/beetroot-powder.jpg',
      alt: 'Vibrant Beetroot Powder',
      badge: 'Vibrant Red • 80-100 Mesh',
      tags: ['Rich in Betanin', 'Clean Label', '100% Soluble']
    },
    {
      id: 'onion-powder',
      eyebrow: 'EXPORT GRADE ALLIUM SPECIALIST',
      titlePrefix: 'Dehydrated Allium Flakes & ',
      titleHighlight: 'Aromatic Powders',
      subtitle: 'Crisp dehydrated white & red onion flakes, minced garlic, and fine powders engineered for seasonings, snack coatings, and culinary food manufacturing.',
      cta: 'Explore Products',
      image: '/images/powders/onion-powder.jpg',
      alt: 'Dehydrated Onion Flakes & Powder',
      badge: 'White & Red Onion • Zero Fillers',
      tags: ['No Caking Agents', 'High Pungency', 'Steam Sterilized']
    }
  ];

  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const currentHero = heroSlides[heroSlide];
  const currentHeroProduct =
    products.find((p) => p.id === currentHero.id) || products[0];

  const nextHeroSlide = () => {
    setHeroSlide((prev) => (prev + 1) % heroSlides.length);
  };
  const prevHeroSlide = () => {
    setHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // --- 6 Trust Pillars ---
  const trustPillars = [
    { title: 'Purely Grown', icon: Sprout },
    { title: 'Naturally Trusted', icon: HeartHandshake },
    { title: 'Rooted in Care', icon: Globe2 },
    { title: 'Sustainably Yours', icon: Leaf },
    { title: 'Ethically Nurtured', icon: Award },
    { title: 'Timeless Quality', icon: Clock }
  ];

  // --- Recent Products Carousel Items (Full HD Photos) ---
  const recentProducts = [
    {
      id: 'onion-powder',
      name: 'Onion Granules & Flakes',
      category: 'Spice Powders',
      format: '16-40 Mesh Granules & Flakes',
      rating: 5,
      image: '/images/powders/onion-powder.jpg',
      fallback: '/images/card_pink_onion_flakes_hd.jpg'
    },
    {
      id: 'garlic-powder',
      name: 'Garlic Minced & Granules',
      category: 'Spice Powders',
      format: 'Minced & Granules',
      rating: 5,
      image: '/images/card_garlic_minced_hd.jpg',
      fallback: '/images/powders/garlic-powder.jpg',
      isGreenText: true
    },
    {
      id: 'ginger-powder',
      name: 'Ginger Powder',
      category: 'Spice Powders',
      format: '80-100 Mesh Sun-Dried',
      rating: 5,
      image: '/images/powders/ginger-powder.jpg',
      fallback: '/images/powders/ginger-powder.jpg'
    },
    {
      id: 'beetroot-powder',
      name: 'Beetroot Powder',
      category: 'Vegetable Powders',
      format: '80-100 Mesh Fine Sifted',
      rating: 5,
      image: '/images/powders/beetroot-powder.jpg',
      fallback: '/images/powders/beetroot-powder.jpg'
    },
    {
      id: 'rose-petal-powder',
      name: 'Rose Petal Powder',
      category: 'Herbal & Botanical',
      format: 'Damask Rose Damascena',
      rating: 5,
      image: '/images/powders/rose-petal-powder.jpg',
      fallback: '/images/powders/rose-petal-powder.jpg'
    },
    {
      id: 'moringa-powder',
      name: 'Moringa Leaf Powder',
      category: 'Herbal & Botanical',
      format: '100-120 Mesh Shade-Dried',
      rating: 5,
      image: '/images/powders/moringa-powder.jpg',
      fallback: '/images/powders/moringa-powder.jpg'
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

  // --- Execution Process Steps ---
  const executionSteps = [
    {
      step: '01',
      title: 'Sourcing with Soul',
      desc: 'From sun-kissed fields to careful hands, we source ethically grown harvests, nurtured with tradition and integrity.',
      icon: Globe2,
      isGreenCard: false
    },
    {
      step: '02',
      title: 'Refining Purity, Preserving Excellence',
      desc: 'Every grain undergoes meticulous grading and sorting, ensuring nature’s best reaches you in its purest form.',
      icon: Sprout,
      isGreenCard: true // Exact deep green card
    },
    {
      step: '03',
      title: 'Precision Dehydration & Milling',
      desc: 'Low-temperature dehydration locks in volatile essential oils, authentic flavors, and vital nutrients.',
      icon: Scale,
      isGreenCard: false
    },
    {
      step: '04',
      title: 'Global Delivery & Export Assurance',
      desc: 'Hermetically packed under stringent international standards, dispatched with verified COAs to 40+ countries.',
      icon: Truck,
      isGreenCard: false
    }
  ];

  // --- Trending Products Spotlight (Full HD Spotlight Image) ---
  const trendingList = [
    {
      id: 'onion-powder',
      title: 'Red Onion Flakes',
      rating: 5,
      description: 'Bursting with flavor, Red Onion Flakes are made from high-quality red onions, carefully dehydrated to retain their natural sweetness and tangy taste. These flakes are perfect for adding depth to gravies, sauces, and spice mixes, delivering the essence of fresh onions with extended shelf life and zero preparation hassle.',
      image: '/images/spotlight_red_onion_flakes_hd.jpg',
      category: 'Spice Powders'
    },
    {
      id: 'beetroot-powder',
      title: 'Pure Beetroot Powder',
      rating: 5,
      description: 'Rich in natural betacyanin pigments and dietary nitrates, our spray-dried and dehydrated beetroot powder provides vivid ruby-red coloration and mild earthy sweetness for smoothies, bakery, and clean-label confectionery.',
      image: '/images/powders/beetroot-powder.jpg',
      category: 'Vegetable Powders'
    },
    {
      id: 'ginger-powder',
      title: 'Ginger Powder & Bits',
      rating: 5,
      description: 'Sun-dried ginger rhizomes milled to an aromatic 80-100 mesh, offering high gingerol potency, warming spice punch, and pure solubility for nutraceutical and culinary formulations.',
      image: '/images/powders/ginger-powder.jpg',
      category: 'Spice Powders'
    },
    {
      id: 'moringa-powder',
      title: 'Moringa Leaf Powder',
      rating: 5,
      description: 'Certified organic shade-dried moringa leaf powder with maximum chlorophyll and antioxidant retention. Ideal for green superfood blends, wellness capsules, and nutritional powders.',
      image: '/images/powders/moringa-powder.jpg',
      category: 'Herbal & Botanical'
    }
  ];
  const [selectedTrending, setSelectedTrending] = useState(0);

  // --- FAQs Accordion State ---
  const faqItems = [
    {
      question: 'What Is The Shelf Life Of Dehydrated Vegetable Powder?',
      answer: 'Our dehydrated vegetable and fruit powders typically have a shelf life of 12 to 24 months when stored in a cool, dry place away from direct sunlight in airtight moisture-barrier packaging.'
    },
    {
      question: 'Do You Supply In Bulk Quantities?',
      answer: 'Yes, we specialize in bulk supply for manufacturers, exporters, traders, and distributors.'
    },
    {
      question: 'Are Your Products Free From Additives?',
      answer: 'Yes, 100% pure with zero artificial colors, zero synthetic preservatives, and zero chemical additives. Non-GMO and allergen-free.'
    },
    {
      question: 'Can I Get Product Samples Before Placing A Bulk Order?',
      answer: 'Absolutely. We provide laboratory sample kits and commercial sample dispatch (100g - 500g) via international express courier within 48 hours.'
    },
    {
      question: 'Do You Export Internationally?',
      answer: 'Yes, we export to over 40 countries across North America, Europe, the Middle East, Southeast Asia, and Africa with complete customs and phytosanitary clearance.'
    },
    {
      question: 'What Is Your Minimum Order Quantity (MOQ)?',
      answer: 'Our standard export MOQ is 500 kg per ingredient, and 50–100 kg for trial domestic or specialized batches.'
    }
  ];
  const [openFaqIndex, setOpenFaqIndex] = useState(1);

  const toggleFaq = (idx) => {
    setOpenFaqIndex((prev) => (prev === idx ? -1 : idx));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-white text-stone-900 font-sans selection:bg-[#FBBF24] selection:text-stone-950 overflow-x-hidden">

      {/* =========================================================================
          HERO SECTION: CLEAN LUXURIOUS WHITE THEME WITH YELLOW/GREEN ACCENTS
          ========================================================================= */}
      <section className="relative w-full bg-gradient-to-b from-stone-50/70 via-white to-white text-stone-900 py-14 sm:py-20 lg:py-24 overflow-hidden border-b border-stone-200/80">
        
        {/* Soft Ambient Radiance Blurs (Zero Dark Green Overlay, Clean Light Atmosphere) */}
        <div className="pointer-events-none absolute left-10 top-10 -z-10 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="pointer-events-none absolute right-16 top-20 -z-10 h-96 w-96 rounded-full bg-amber-400/5 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 bottom-0 -z-10 h-72 w-96 rounded-full bg-emerald-600/5 blur-3xl" />

        {/* Delicate Modern Dot Matrix Accent */}
        <div className="pointer-events-none absolute right-8 top-12 z-0 h-40 w-40 bg-[radial-gradient(#107C41_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-15 hidden lg:block" />

        {/* Floating Green Spice Leaf */}
        <div className="pointer-events-none absolute left-3 sm:left-6 md:left-8 top-[46%] -translate-y-1/2 z-10 w-10 sm:w-14 md:w-16 select-none animate-float">
          <img
            src="/images/leaf-left-exact.png"
            alt=""
            className="w-full h-auto drop-shadow-md opacity-90"
            onError={(e) => {
              e.target.src = '/images/leaf-left-trans.png';
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-center gap-12 lg:gap-14 xl:gap-20">
            
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#0B7337] shadow-2xs">
                  <span className="h-2 w-2 rounded-full bg-[#0B7337] animate-pulse" />
                  {currentHero.eyebrow}
                </span>
                <span className="hidden sm:inline-block text-xs font-semibold text-stone-500">
                  • Direct Factory Bulk Supply
                </span>
              </div>

              {/* Main Headline - Clean, modern Poppins typography */}
              <h1 className="text-[34px] sm:text-[46px] md:text-[52px] lg:text-[56px] xl:text-[60px] font-bold leading-[1.18] tracking-tight text-stone-900 transition-all duration-500">
                {currentHero.titlePrefix}
                <span className="text-[#0B7337] underline decoration-[#FBBF24] decoration-4 underline-offset-8">
                  {currentHero.titleHighlight}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-stone-600 leading-relaxed font-normal max-w-xl transition-all duration-500">
                {currentHero.subtitle}
              </p>

              {/* Key Quality Tags */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {currentHero.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-md bg-stone-100 border border-stone-200/80 px-2.5 py-1 text-xs font-semibold text-stone-700"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0B7337]" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onSelectProduct(null)}
                  className="rounded-full bg-[#FBBF24] hover:bg-[#F59E0B] px-8 sm:px-10 py-3.5 text-sm sm:text-base font-bold text-stone-950 shadow-md shadow-amber-500/15 transition-all duration-300 hover:scale-102 hover:shadow-lg active:scale-95 focus:outline-none"
                >
                  {currentHero.cta}
                </button>
                <button
                  type="button"
                  onClick={() => openQuoteModal(currentHeroProduct)}
                  className="rounded-full border-2 border-[#0B7337] bg-white hover:bg-emerald-50 px-7 py-3.5 text-sm sm:text-base font-bold text-[#0B7337] shadow-2xs hover:shadow transition-all duration-300 hover:scale-102 active:scale-95"
                >
                  Request Bulk Quote
                </button>
              </div>

              {/* Slide Indicators & Navigation Controls */}
              <div className="mt-10 sm:mt-12 flex items-center gap-4">
                <div className="flex items-center gap-2.5">
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
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            isActive
                              ? 'w-14 sm:w-16 bg-[#FBBF24] shadow-xs'
                              : 'w-7 sm:w-8 bg-stone-200 hover:bg-stone-300'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="ml-2 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={prevHeroSlide}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 hover:border-[#0B7337] hover:text-[#0B7337] transition-colors shadow-2xs"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextHeroSlide}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 hover:border-[#0B7337] hover:text-[#0B7337] transition-colors shadow-2xs"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Right Sliding Showcase Card (Full HD Photo in Crisp Framing) */}
            <div className="relative flex justify-center lg:justify-end">
              <div
                onClick={() => onSelectProduct(currentHeroProduct)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-3 shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-2xl hover:border-emerald-300 w-full max-w-[480px] aspect-[4/3.2]"
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-stone-50">
                  <img
                    key={currentHero.image}
                    src={currentHero.image}
                    alt={currentHero.alt}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent flex items-end p-5">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <span className="inline-block rounded-full bg-[#FBBF24] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-950 mb-1">
                          {currentHero.badge}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-white drop-shadow-sm">
                          {currentHero.alt}
                        </h4>
                      </div>
                      <span className="rounded-full bg-white text-stone-950 p-2.5 font-bold shadow-md group-hover:bg-[#FBBF24] group-hover:text-stone-950 transition-colors">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: 6 TRUST PILLARS (Clean White Row)
          ========================================================================= */}
      <section className="border-b border-stone-100 bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {trustPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="group flex flex-col items-center text-center cursor-default transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div className="flex h-16 w-16 sm:h-18 sm:w-18 items-center justify-center rounded-full border border-emerald-600/20 bg-emerald-50/80 text-[#0B7337] transition-all duration-300 group-hover:border-[#0B7337] group-hover:bg-[#0B7337] group-hover:text-white group-hover:scale-110 shadow-xs">
                    <Icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="mt-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-800 group-hover:text-[#0B7337] transition-colors">
                    {pillar.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: ABOUT US (Full HD Agricultural Collage & Call Badge)
          ========================================================================= */}
      <section className="border-b border-stone-100 bg-[#F9F9F8] py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] items-center gap-12 lg:gap-16">
            
            {/* Left: 4-Photo Collage with Yellow Call Us Anytime Badge */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              {/* Green Dot-Matrix Background Accents */}
              <div className="absolute -top-6 -left-6 z-0 h-36 w-36 bg-[radial-gradient(#107C41_2px,transparent_2px)] [background-size:14px_14px] opacity-25" />
              <div className="absolute -bottom-6 -right-6 z-0 h-36 w-36 bg-[radial-gradient(#107C41_2px,transparent_2px)] [background-size:14px_14px] opacity-25" />

              {/* Collage 4-Photo Grid using Full HD Assets */}
              <div className="relative z-10 grid grid-cols-2 gap-3.5 sm:gap-4.5">
                <div className="overflow-hidden rounded-2xl border-2 border-white shadow-md transition duration-500 hover:scale-103 hover:shadow-xl aspect-[1/1.05] bg-stone-100">
                  <img
                    src="/images/farmer_hands_golden_wheat_hd.jpg"
                    alt="Harvested golden wheat crop in farmer hands"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="overflow-hidden rounded-2xl border-2 border-white shadow-md transition duration-500 hover:scale-103 hover:shadow-xl aspect-[1.1/1] bg-stone-100">
                  <img
                    src="/images/indian_farmer_bullock_plowing_hd.jpg"
                    alt="Indian farmer plowing green agricultural fields with white bullocks"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="overflow-hidden rounded-2xl border-2 border-white shadow-md transition duration-500 hover:scale-103 hover:shadow-xl aspect-[1/1.15] bg-stone-100">
                  <img
                    src="/images/rural_woman_spice_harvest_hd.jpg"
                    alt="Rural woman sun-drying red spice chillies"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="overflow-hidden rounded-2xl border-2 border-white shadow-md transition duration-500 hover:scale-103 hover:shadow-xl aspect-[1/1] bg-stone-100">
                  <img
                    src="/images/indian_farmer_portrait_smiling_hd.jpg"
                    alt="Dedicated smiling Indian farmer in organic farm"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Floating "Call Us Anytime" Yellow Card */}
              <div className="absolute -bottom-5 sm:-bottom-7 left-6 sm:left-10 z-20 animate-float">
                <a
                  href="tel:+918888006532"
                  className="flex items-center gap-3.5 rounded-2xl bg-[#FBBF24] px-5 py-3.5 shadow-xl border border-amber-300/80 transition-all duration-300 hover:bg-[#F59E0B] hover:scale-105 group"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0B7337] text-white shadow-sm transition-transform group-hover:rotate-12">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-900/80">
                      Call Us Anytime
                    </span>
                    <span className="block text-base sm:text-lg font-bold text-stone-950 tracking-tight">
                      +91 8888006532
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right: Editorial Typography */}
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0B7337] bg-emerald-50 border border-emerald-200/60 rounded-full px-3 py-1 mb-3">
                <Leaf className="h-3.5 w-3.5" />
                <span>ABOUT US</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-tight leading-[1.25]">
                Leading Dehydrated Vegetable &amp; Fruit Powder Wholesale Supplier in India
              </h2>

              <p className="mt-6 text-sm sm:text-base leading-relaxed text-stone-600">
                Welcome to Nuvaro Agro Global, India’s trusted name in the world of dehydrated vegetable powder, dehydrated fruit powder, spice powders, whole spices, and flakes and granules. Whether you’re sourcing for food production, retail, exports, or your restaurant chain – we’re the go-to wholesale suppliers in India for all things dry, natural, and flavorful.
              </p>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-stone-600">
                We specialize in delivering <strong className="text-stone-900 font-bold">bulk dehydrated powders</strong> and spices that retain the color, taste, and nutritional value of fresh produce – minus the perishability. Our products are ready to use, shelf-stable, and packed under strict hygienic conditions.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onSelectProduct(null)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0B7337] hover:bg-[#085e2c] px-6 py-3.5 text-xs sm:text-sm font-bold text-white transition-all shadow-sm hover:shadow"
                >
                  <span>View Product Range</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => openQuoteModal()}
                  className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white hover:border-[#FBBF24] hover:bg-amber-50/40 px-6 py-3.5 text-xs sm:text-sm font-bold text-stone-800 transition-all shadow-2xs"
                >
                  <span>Request Custom Sourcing</span>
                  <ArrowUpRight className="h-4 w-4 text-[#D5AA37]" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: RECENT PRODUCTS CAROUSEL (Pure White Theme with HD Photography)
          ========================================================================= */}
      <section className="border-b border-stone-100 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12">
          
          {/* Header with Sunburst Rays */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <div className="inline-flex flex-col items-center mb-2">
              <div className="flex items-center gap-1 text-[#0B7337] mb-1">
                <span className="h-2 w-0.5 bg-[#0B7337] rotate-[-25deg]" />
                <span className="h-3 w-0.5 bg-[#0B7337]" />
                <span className="h-2 w-0.5 bg-[#0B7337] rotate-[25deg]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0B7337]">
                DELIGHTFULLY REFRESHING
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
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
                    className="group cursor-pointer rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-xl flex flex-col justify-between relative"
                  >
                    <div>
                      {/* Full HD Product Photo Container */}
                      <div className="relative aspect-[1/1] w-full overflow-hidden rounded-xl bg-stone-50 flex items-center justify-center p-2 mb-4 border border-stone-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-108"
                          onError={(e) => {
                            e.target.src = item.fallback;
                          }}
                        />

                        {/* Yellow Pill Button "View Details" on hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-stone-900/10 backdrop-blur-2xs">
                          <span className="rounded-full bg-[#FBBF24] hover:bg-[#F59E0B] px-5 py-2 text-xs font-bold text-stone-950 shadow-md">
                            View Details
                          </span>
                        </div>
                      </div>

                      {/* Product Name */}
                      <h3 className={`text-base font-semibold ${item.isGreenText ? 'text-[#0B7337]' : 'text-stone-900'} group-hover:text-[#0B7337] transition-colors`}>
                        {item.name}
                      </h3>

                      {/* Specification format */}
                      <p className="mt-1 text-xs text-stone-500 font-medium">
                        {item.format}
                      </p>

                      {/* 5-Star Rating in Gold */}
                      <div className="mt-2.5 flex items-center gap-1 text-[#FBBF24]">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-[#FBBF24]" />
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-700 group-hover:text-[#0B7337]">
                      <span>View Specifications</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#0B7337]" />
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-xs transition hover:border-[#0B7337] hover:text-[#0B7337] hover:bg-emerald-50"
                  aria-label="Previous products"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Slider Indicator Lines */}
                <div className="flex items-center gap-2">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      recentIndex === 0 ? 'w-10 bg-[#0B7337]' : 'w-6 bg-stone-200'
                    }`}
                  />
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      recentIndex > 0 ? 'w-10 bg-[#0B7337]' : 'w-6 bg-stone-200'
                    }`}
                  />
                </div>

                <button
                  type="button"
                  onClick={nextRecent}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-xs transition hover:border-[#0B7337] hover:text-[#0B7337] hover:bg-emerald-50"
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
          SECTION 4: EXECUTION PROCESS (Journey of Trust & Excellence)
          ========================================================================= */}
      <section className="border-b border-stone-100 bg-[#F9F9F8] py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12">
          
          {/* Header with Sunburst Rays */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex flex-col items-center mb-2">
              <div className="flex items-center gap-1 text-[#0B7337] mb-1">
                <span className="h-2 w-0.5 bg-[#0B7337] rotate-[-25deg]" />
                <span className="h-3 w-0.5 bg-[#0B7337]" />
                <span className="h-2 w-0.5 bg-[#0B7337] rotate-[25deg]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0B7337]">
                EXECUTION PROCESS
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
              A Journey of Trust &amp; Excellence
            </h2>
          </div>

          {/* 4 Process Cards matching screenshot layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {executionSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.step}
                  className={`relative rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between overflow-hidden ${
                    step.isGreenCard
                      ? 'bg-[#0B7337] border-[#0B7337] text-white shadow-xl shadow-emerald-900/10' // Highlight Card 2
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

                    <p className={`mt-3 text-xs sm:text-sm leading-relaxed ${step.isGreenCard ? 'text-emerald-50/95' : 'text-stone-600'}`}>
                      {step.desc}
                    </p>
                  </div>

                  {/* Bottom Right Arrow Triangle Cut */}
                  <div className="mt-8 flex justify-end">
                    <div className={`flex items-center justify-center h-10 w-12 rounded-tl-xl transition-transform hover:translate-x-1 ${
                      step.isGreenCard ? 'bg-[#064e26] text-white' : 'bg-stone-100 text-stone-800'
                    }`}>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: TRENDING PRODUCTS / TOP SELLING PRODUCTS (Full HD Spotlight)
          ========================================================================= */}
      <section className="border-b border-stone-100 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0B7337]">
              TRENDING PRODUCTS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mt-1">
              Top Selling Products
            </h2>
          </div>

          {/* Spotlight Showcase Container */}
          <div className="relative mx-auto max-w-5xl rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-10 shadow-sm">
            {/* Green Dot Matrix Background Accent on Left */}
            <div className="absolute top-10 left-6 z-0 h-36 w-24 bg-[radial-gradient(#107C41_2px,transparent_2px)] [background-size:12px_12px] opacity-25 hidden sm:block" />

            {/* Spotlight Content */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-14">
              
              {/* Left: Full HD photo of Red Onion Flakes in glass/ceramic bowl */}
              <div className="flex justify-center">
                <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-2xl bg-stone-50 flex items-center justify-center p-4 border border-stone-100 shadow-inner">
                  <img
                    src={trendingList[selectedTrending].image}
                    alt={trendingList[selectedTrending].title}
                    className="h-full w-full object-contain transition-transform duration-500 hover:scale-106"
                  />
                </div>
              </div>

              {/* Right: Stars, Title, Description, Get Enquiry Button */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1 text-[#FBBF24] mb-2">
                  {[...Array(trendingList[selectedTrending].rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#FBBF24]" />
                  ))}
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
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
                    className="rounded-full bg-[#FBBF24] hover:bg-[#F59E0B] px-10 py-3.5 text-sm sm:text-base font-bold text-stone-950 shadow-md shadow-amber-500/20 transition-all duration-300 hover:scale-102 active:scale-95"
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
                      ? 'bg-[#0B7337] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-emerald-50 hover:text-[#0B7337]'
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
          SECTION 6: FREQUENTLY ASKED QUESTIONS (Full HD Mortar & Pestle Visual)
          ========================================================================= */}
      <section className="border-b border-stone-100 bg-[#F9F9F8] py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-12 lg:gap-16">
            
            {/* Left Column: Accordions */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0B7337]">
                FAQS
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mt-1 mb-8">
                Frequently Asked Questions
              </h2>

              <div className="space-y-3">
                {faqItems.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;

                  return (
                    <div
                      key={faq.question}
                      className={`rounded-xl border bg-white overflow-hidden transition-all duration-300 shadow-xs ${
                        isOpen ? 'border-[#0B7337]/50 shadow-sm' : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full py-4.5 px-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                      >
                        <span className={`text-sm sm:text-base font-bold transition-colors ${
                          isOpen ? 'text-[#0B7337]' : 'text-stone-900'
                        }`}>
                          {faq.question}
                        </span>
                        <span className={`shrink-0 transition-colors ${isOpen ? 'text-[#0B7337]' : 'text-stone-400'}`}>
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

            {/* Right Column: Full HD Mortar & Pestle Spice Collage */}
            <div className="relative flex justify-center">
              {/* Green Dot Grid Background Accent */}
              <div className="absolute -top-8 -right-4 z-0 h-44 w-32 bg-[radial-gradient(#107C41_2px,transparent_2px)] [background-size:12px_12px] opacity-25" />

              {/* Full HD Photo Frame */}
              <div className="relative z-10 w-full max-w-[440px] rounded-3xl overflow-hidden shadow-2xl border-2 border-white bg-white">
                <img
                  src="/images/faq_mortar_pestle_spices_hd.jpg"
                  alt="Artisanal stone mortar pestle with red chillies and spice powders"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: DIRECT BULK QUOTATION STRIP (Clean White Theme Container)
          ========================================================================= */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12">
          <div className="rounded-3xl border-2 border-emerald-600/25 bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/40 p-8 sm:p-12 lg:p-14 shadow-lg shadow-emerald-900/5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-[#0B7337] bg-white border border-emerald-200 shadow-2xs">
                Direct Factory Pricing
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-3 tracking-tight">
                Request a Custom Bulk Sourcing Quotation
              </h2>
              <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
                Receive commercial FOB / CIF pricing schedules for 500kg up to full container loads (FCL), with fast 48-hour dispatch for laboratory testing samples.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
              <button
                type="button"
                onClick={() => openQuoteModal()}
                className="rounded-full bg-[#FBBF24] hover:bg-[#F59E0B] px-8 py-3.5 text-center text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-950 shadow-md shadow-amber-500/15 transition active:scale-95"
              >
                Request Quotation
              </button>
              <button
                type="button"
                onClick={() => openSampleModal()}
                className="rounded-full border-2 border-[#0B7337] bg-white px-8 py-3.5 text-center text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0B7337] hover:bg-emerald-50 transition shadow-2xs"
              >
                Request 100g Sample
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Scroll-to-Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-white border border-stone-200 text-stone-700 shadow-xl hover:border-[#0B7337] hover:text-[#0B7337] hover:bg-emerald-50 transition-all hover:scale-110 active:scale-95"
      >
        <ArrowUp className="h-5 w-5" />
      </button>

    </div>
  );
}
