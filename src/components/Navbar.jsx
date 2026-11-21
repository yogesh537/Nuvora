import React from 'react';
import DirectionalMenu from '@/components/ui/directional-menu';
import { useLeads } from '../context/LeadContext';
import {
  ArrowRight,
  ChevronRight,
  ExternalLink
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
        label: "Dehydrated Vegetable Powders",
        desc: "Beetroot, Spinach, Tomato, Carrot, and Cabbage powders & flakes.",
        cat: "Vegetable Powders",
      },
      {
        label: "Pure Spice & Allium Powders",
        desc: "Turmeric (high curcumin), Ginger, Garlic, Red & Pink Onion powders.",
        cat: "Spice Powders",
      },
      {
        label: "Herbal & Botanical Powders",
        desc: "Moringa Oleifera, Rose Petal, Neem, and pure botanical extracts.",
        cat: "Herbal & Botanical",
      },
      {
        label: "Exotic Flours & Granules",
        desc: "Low-GI Green Jackfruit Flour, Onion Granules & Minced Flakes.",
        cat: "Specialty Powders",
      },
    ];

    const SPOTLIGHT_PREVIEWS = [
      {
        alt: "Beetroot Powder Preview",
        src: "/images/powders/beetroot-powder.jpg",
        fallback: "/images/card-red-onion.jpg",
        title: "Beetroot Powder",
        badge: "Vibrant Red • 80-100 Mesh",
      },
      {
        alt: "Green Jackfruit Flour Preview",
        src: "/images/powders/green-jackfruit-flour.jpg",
        fallback: "/images/card-ginger.jpg",
        title: "Green Jackfruit Flour",
        badge: "Low GI • 100% Raw Fruit",
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

  // --- 2. About Mega-Menu Panel (Exact Hyperiux Vault SolutionsPanel pattern) ---
  function AboutPanel() {
    const SOLUTION_BLOCKS = [
      {
        title: "Farm-Direct Sourcing",
        description:
          "Direct contract farming with vetted cultivators across India. Pesticide-free, single-origin produce harvested at peak freshness.",
        action: () => go('about'),
      },
      {
        title: "Global Export Logistics",
        description:
          "Regular container & air shipments to 40+ countries with complete phytosanitary clearance, palletized shipping, and port documentation.",
        action: () => go('about'),
      },
      {
        title: "Private Label & OEM Blends",
        description:
          "Custom mesh sizes (60 to 120 mesh), proprietary recipe blending, pouching, and bulk food-service drum packaging for worldwide brands.",
        action: () => go('privatelabel'),
      },
    ];

    return (
      <div className="flex flex-col gap-6 text-left">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B58A27]">
            Who We Are
          </p>
          <h3 className="text-xl font-semibold text-foreground @3xl:text-2xl">
            India's Trusted Name in Dehydrated Agro Commodities
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-3 @2xl:grid-cols-3 @2xl:gap-6">
          {SOLUTION_BLOCKS.map((block) => (
            <button
              key={block.title}
              type="button"
              onClick={block.action}
              className={`${linkClassName} flex flex-col gap-2 border border-border p-4 hover:bg-accent @2xl:gap-3 @2xl:p-6 text-left group`}
            >
              <h4 className="text-base font-semibold text-foreground @3xl:text-lg group-hover:text-[#B58A27] transition-colors flex items-center justify-between">
                <span>{block.title}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-[#B58A27] transition-transform group-hover:translate-x-0.5" />
              </h4>
              <p className="text-sm leading-6 text-muted-foreground">{block.description}</p>
            </button>
          ))}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/60">
          <span className="text-xs text-muted-foreground">
            ISO 22000:2018 Certified • FSSAI Registered • APEDA Recognized Exporter
          </span>
          <button
            type="button"
            onClick={() => go('about')}
            className="text-xs font-semibold text-[#B58A27] hover:text-[#8f6a15] inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Learn More About Our Company Heritage</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // --- 3. Certificates & Standards Panel (Exact Hyperiux Vault DevelopersPanel pattern) ---
  function CertificatesPanel() {
    const CERTIFICATE_GROUPS = [
      {
        heading: "Food Safety Standards",
        links: [
          { label: "ISO 22000:2018 Certified", action: () => go('quality') },
          { label: "HACCP Safety Verification", action: () => go('quality') },
          { label: "GMP Compliant Cleanrooms", action: () => go('quality') },
          { label: "FSSAI Central Food License", action: () => go('quality') },
        ],
      },
      {
        heading: "Testing & Laboratory",
        links: [
          { label: "Moisture < 5.0% Guaranteed", action: () => go('quality') },
          { label: "Heavy Metal Residue Testing", action: () => go('quality') },
          { label: "Microbial Safety (TPC, Yeast)", action: () => go('quality') },
          { label: "Batch Certificate of Analysis (COA)", action: () => go('quality') },
        ],
      },
      {
        heading: "Trade & Global Compliance",
        links: [
          { label: "APEDA Export Council Member", action: () => go('quality') },
          { label: "Halal Ready Facility", action: () => go('quality') },
          { label: "Kosher Compliant Cleanroom", action: () => go('quality') },
          { label: "US FDA Registered Facility", action: () => go('quality') },
        ],
      },
    ];

    return (
      <div className="flex flex-col gap-6 text-left">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B58A27]">
            Quality Assurance & Export Approvals
          </p>
          <h3 className="text-xl font-semibold text-foreground @3xl:text-2xl">
            International Standards & Rigorous Quality Control
          </h3>
        </div>

        <div className="grid grid-cols-1 @2xl:grid-cols-3 gap-6 @3xl:gap-10">
          {CERTIFICATE_GROUPS.map((group) => (
            <div key={group.heading} className="flex flex-col gap-4 border border-border/50 rounded-xl p-4 bg-accent/20">
              <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-foreground @3xl:text-sm">
                {group.heading}
              </h4>

              <div className="flex flex-col gap-2.5">
                {group.links.map((linkItem) => (
                  <button
                    key={linkItem.label}
                    type="button"
                    onClick={linkItem.action}
                    className={`${linkClassName} text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:translate-x-0.5 transition-transform flex items-center justify-between py-1`}
                  >
                    <span>{linkItem.label}</span>
                    <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-border/60">
          <span className="text-xs text-muted-foreground">
            Complete compliance dossier provided with every commercial invoice.
          </span>
          <button
            type="button"
            onClick={() => go('quality')}
            className="text-xs font-semibold text-[#B58A27] hover:text-[#8f6a15] inline-flex items-center gap-1.5 transition-colors"
          >
            <span>View All Official Certificates</span>
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
      customContent: <AboutPanel />,
    },
    {
      label: "Products",
      customContent: <ProductsPanel />,
    },
    {
      label: "Certificates",
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
          src="/images/nuvaro-logo-white.png"
          alt="Nuvaro"
          className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
        />
        <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.22em] text-[#FBBF24] leading-tight pl-0.5">
          Agro Global
        </span>
      </div>
    </button>
  );

  // --- 6. Actions Buttons Component ---
  const actionButtons = (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => openQuoteModal()}
        className="hidden rounded-full px-3.5 py-1.5 text-xs font-semibold text-emerald-100 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-ring @4xl:inline-block"
      >
        Catalog Specs
      </button>
      <button
        type="button"
        onClick={() => openQuoteModal()}
        className="rounded-full bg-[#EAB308] hover:bg-[#F59E0B] px-5 py-2 text-xs font-bold text-stone-950 shadow-md transition-all hover:scale-105 active:scale-95"
      >
        Request Quote
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0E281A] shadow-md">
      <DirectionalMenu
        items={menuItems}
        logo={brandLogo}
        actions={actionButtons}
        panelGap={14}
        closeDelay={120}
        duration={0.35}
        distance={100}
        activeColor="#FBBF24"
        inactiveColor="#FFFFFF"
        className="border-b border-emerald-950/60 bg-[#0E281A] text-white"
      />
    </header>
  );
}