import React from 'react';
import DirectionalMenu from '@/components/ui/directional-menu';
import { useLeads } from '../context/LeadContext';
import {
  ArrowRight,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const linkClassName =
  "rounded-lg outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none";

export default function Navbar({ currentView, setCurrentView, onSelectCategory }) {
  const { openQuoteModal } = useLeads();

  const go = (view) => {
    window.dispatchEvent(new Event('closeDirectionalMenu'));
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (category) => {
    window.dispatchEvent(new Event('closeDirectionalMenu'));
    if (onSelectCategory) {
      onSelectCategory(category);
    } else {
      setCurrentView('products');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- 1. Products Mega-Menu Panel (Exact Hyperiux Vault layout pattern) ---
  function ProductsPanel() {
    const PRODUCT_CATEGORIES = [
      {
        label: "Dehydrated Allium & Spice Powders",
        desc: "Onion, Garlic, and Ginger powders, flakes, and minced granules.",
        cat: "Spice Powders",
      },
      {
        label: "Pure Vegetable Powders",
        desc: "Pure Beetroot powder (80-100 mesh) with high natural betanin content.",
        cat: "Vegetable Powders",
      },
      {
        label: "Herbal & Botanical Powders",
        desc: "Shade-dried Moringa Oleifera leaf powder and Damask Rose Petal powder.",
        cat: "Herbal & Botanical",
      },
    ];

    const SPOTLIGHT_PREVIEWS = [
      {
        alt: "Beetroot Powder Preview",
        src: "/images/powders/beetroot-powder.jpg",
        fallback: "/images/powders/beetroot-powder.jpg",
        title: "Beetroot Powder",
        badge: "Vibrant Red • 80-100 Mesh",
      },
      {
        alt: "Dehydrated Onion Flakes Preview",
        src: "/images/powders/onion-powder.jpg",
        fallback: "/images/powders/onion-powder.jpg",
        title: "Dehydrated Onion",
        badge: "Flakes & Fine Powder",
      },
    ];

    return (
      <div className="flex flex-col gap-6 @4xl:flex-row @4xl:justify-between @4xl:gap-8 text-left">
        <div className="flex flex-col gap-5 @4xl:w-[65%]">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B58A27]">
              Product Catalog
            </p>
            <h3 className="text-xl font-semibold text-foreground @3xl:text-2xl">
              Explore Our Bulk Dehydrated Powders
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-3 @2xl:grid-cols-2 @4xl:grid-cols-2 @4xl:gap-4">
            {PRODUCT_CATEGORIES.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleCategoryClick(item.cat)}
                className={`${linkClassName} flex flex-col gap-1 border border-border p-4 hover:bg-accent text-left group`}
              >
                <span className="text-base font-medium text-foreground @3xl:text-lg group-hover:text-[#B58A27] transition-colors flex items-center justify-between">
                  <span>{item.label}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-[#B58A27] transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="text-sm text-muted-foreground line-clamp-2">
                  {item.desc}
                </span>
              </button>
            ))}
          </div>

          <div className="pt-1 flex items-center justify-between border-t border-border/60">
            <span className="text-xs text-muted-foreground">
              Moisture &lt; 5.0% • 60–100 Mesh • Free Flowing
            </span>
            <button
              type="button"
              onClick={() => go('products')}
              className="text-xs font-semibold text-[#B58A27] hover:text-[#8f6a15] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>View All 10+ Powders & Specs</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="hidden flex-col justify-between gap-3 @4xl:flex @4xl:w-[32%]">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Featured Powders
          </p>
          <div className="flex flex-col gap-3">
            {SPOTLIGHT_PREVIEWS.map((image) => (
              <div
                key={image.title}
                onClick={() => go('products')}
                className="cursor-pointer group flex items-center gap-3 border border-border rounded-xl p-2.5 hover:bg-accent transition-all"
              >
                <div className="h-16 w-20 overflow-hidden rounded-lg border border-border shrink-0 bg-stone-100">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = image.fallback;
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-[#B58A27] uppercase tracking-wider">
                    {image.badge}
                  </span>
                  <span className="text-sm font-semibold text-foreground group-hover:text-[#B58A27] transition-colors">
                    {image.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Available in bulk 25kg HDPE drums
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => openQuoteModal()}
            className="w-full py-2 px-3 rounded-lg bg-[#D5AA37]/15 border border-[#D5AA37]/30 text-[#8f6a15] text-xs font-semibold hover:bg-[#D5AA37]/25 transition-colors text-center"
          >
            Order Free Sample Kit
          </button>
        </div>
      </div>
    );
  }

  // --- 2. Official FSSAI Central Food Safety License Panel ---
  function CertificatesPanel() {
    return (
      <div className="flex flex-col gap-6 text-left max-w-4xl">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#0B7337]">
              <span className="h-2 w-2 rounded-full bg-[#0B7337] animate-pulse" />
              Statutory Food Safety Certification
            </span>
            <span className="text-xs font-semibold text-stone-500">
              • Ministry of Health &amp; Family Welfare, Govt. of India
            </span>
          </div>
          <h3 className="text-xl font-bold text-foreground @3xl:text-2xl">
            FSSAI Central Food License Certification
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            Nuvaro Agro Global operates under the statutory certification of the Food Safety and Standards Authority of India (FSSAI). Every batch of dehydrated powder and flakes adheres strictly to national food safety standards and laboratory testing parameters.
          </p>
        </div>

        {/* FSSAI Showcase Cards */}
        <div className="grid grid-cols-1 @2xl:grid-cols-[1.2fr_0.8fr] gap-5">
          {/* Main FSSAI Certificate Card */}
          <div className="flex flex-col justify-between border border-emerald-300/80 rounded-2xl p-6 bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/40 shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0B7337] text-white shadow-xs">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B7337] block">
                      Official License
                    </span>
                    <span className="text-sm font-bold text-stone-900 block">
                      FSSAI Central Authority
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 border border-emerald-300 text-[#0B7337] text-[11px] font-bold px-2.5 py-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0B7337]" />
                  Active &amp; Compliant
                </span>
              </div>

              <div className="rounded-xl border border-emerald-200/60 bg-white/90 p-3.5 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                  Registration &amp; Central License Number
                </span>
                <span className="text-base sm:text-lg font-mono font-bold text-stone-900 tracking-wider">
                  10020021008942
                </span>
              </div>

              <div className="space-y-2 text-xs text-stone-700">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0B7337] shrink-0 mt-0.5" />
                  <span>
                    <strong>Certified Activity:</strong> Direct Manufacturer &amp; Bulk Exporter of Dehydrated Vegetable, Fruit &amp; Spice Powders.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0B7337] shrink-0 mt-0.5" />
                  <span>
                    <strong>Quality Protocol:</strong> Low-temperature drying, steam sterilization, and hygienic cleanroom packaging.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0B7337] shrink-0 mt-0.5" />
                  <span>
                    <strong>Batch Verification:</strong> Complete physical, chemical &amp; microbiological COA testing for every export lot.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-100/80 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => go('certificates')}
                className="text-xs font-bold text-[#0B7337] hover:text-[#085e2c] inline-flex items-center gap-1.5 transition-colors group"
              >
                <span>Open Official FSSAI Certificate Page</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => openQuoteModal()}
                className="rounded-full bg-[#FBBF24] hover:bg-[#F59E0B] px-5 py-2 text-xs font-bold text-stone-950 shadow-xs transition-all hover:scale-102"
              >
                Request Certificate Copy
              </button>
            </div>
          </div>

          {/* Standards & COA Specifications Box */}
          <div className="flex flex-col justify-between border border-border/80 rounded-2xl p-5 bg-stone-50/70 shadow-xs">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
                Statutory FSSAI Testing Parameters
              </h4>
              <div className="space-y-2.5">
                <div className="rounded-xl border border-stone-200/80 bg-white p-3">
                  <span className="text-xs font-bold text-stone-900 block">
                    Moisture Content &lt; 5.0%
                  </span>
                  <span className="text-[11px] text-stone-500 leading-snug block mt-0.5">
                    Ensuring extended 12–24 month shelf-stability and free-flowing consistency.
                  </span>
                </div>

                <div className="rounded-xl border border-stone-200/80 bg-white p-3">
                  <span className="text-xs font-bold text-stone-900 block">
                    Zero Synthetic Additives &amp; Non-GMO
                  </span>
                  <span className="text-[11px] text-stone-500 leading-snug block mt-0.5">
                    100% natural dehydrated farm produce, zero anti-caking chemicals or artificial colors.
                  </span>
                </div>

                <div className="rounded-xl border border-stone-200/80 bg-white p-3">
                  <span className="text-xs font-bold text-stone-900 block">
                    Full Export Documentation Dossier
                  </span>
                  <span className="text-[11px] text-stone-500 leading-snug block mt-0.5">
                    Official Certificate of Analysis (COA) dispatched with every invoice and shipping consignment.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200/60">
              <span className="text-[11px] text-stone-500">
                Registered Processing Facilities in Gujarat &amp; Maharashtra, India.
              </span>
            </div>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/60">
          <span className="text-xs text-muted-foreground">
            Official FSSAI statutory compliance documentation is attached to all commercial shipments.
          </span>
          <button
            type="button"
            onClick={() => go('certificates')}
            className="text-xs font-bold text-[#0B7337] hover:text-[#085e2c] inline-flex items-center gap-1.5 transition-colors shrink-0"
          >
            <span>Go to Official FSSAI Page</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // --- 4. Menu Items Array ---
  const menuItems = [
    {
      label: "Home",
      onClick: () => go('home'),
    },
    {
      label: "About",
      onClick: () => go('about'),
    },
    {
      label: "Products",
      customContent: <ProductsPanel />,
    },
    {
      label: "Certificates",
      onClick: () => go('certificates'),
      customContent: <CertificatesPanel />,
    },
    {
      label: "Blogs",
      onClick: () => go('blog'),
    },
    {
      label: "Contact",
      onClick: () => openQuoteModal(),
    },
  ];

  // --- 5. Brand Logo Component ---
  const brandLogo = (
    <button
      type="button"
      onClick={() => go('home')}
      className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-ring text-left group"
      aria-label="Nuvaro Agro Global Home"
    >
      <div className="flex flex-col items-start justify-center">
        <img
          src="/images/nuvaro-logo-black.png"
          alt="Nuvaro"
          className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
        />
        <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.22em] text-[#0B7337] leading-tight pl-0.5">
          Agro Global
        </span>
      </div>
    </button>
  );

  // --- 6. Actions Buttons Component ---
  const actionButtons = (
    <div className="flex items-center gap-2.5">
      <button
        type="button"
        onClick={() => openQuoteModal()}
        className="hidden rounded-full px-3.5 py-1.5 text-xs font-semibold text-stone-700 hover:text-[#0B7337] transition-colors focus-visible:ring-2 focus-visible:ring-ring @4xl:inline-block"
      >
        Catalog Specs
      </button>
      <button
        type="button"
        onClick={() => openQuoteModal()}
        className="rounded-full bg-[#EAB308] hover:bg-[#F59E0B] px-5 py-2 text-xs font-bold text-stone-950 shadow-sm transition-all hover:scale-105 active:scale-95"
      >
        Request Quote
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-xs border-b border-stone-200/80 transition-colors duration-300">
      <DirectionalMenu
        items={menuItems}
        logo={brandLogo}
        actions={actionButtons}
        panelGap={14}
        closeDelay={120}
        duration={0.35}
        distance={100}
        activeColor="#0B7337"
        inactiveColor="#1c1917"
        className="border-b border-stone-200/80 bg-white/95 backdrop-blur-md text-stone-900 shadow-xs"
      />
    </header>
  );
}