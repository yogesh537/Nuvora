import React from 'react';
import DirectionalMenu from '@/components/ui/directional-menu';
import { useLeads } from '../context/LeadContext';
import {
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Mail,
  Phone,
  Globe2,
  ChevronDown
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
      className="flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring text-left"
      aria-label="Nuvaro Agro Global Home"
    >
      <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 p-0.5 shadow-sm transition-transform duration-300 hover:scale-105">
        <img
          src="/images/logo-exact.png"
          alt="Nuvaro Agro Logo"
          className="h-full w-full object-contain"
          onError={(e) => {
            e.target.src = '/images/logo-trans.png';
          }}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-base font-extrabold tracking-tight text-white transition-colors hover:text-[#FBBF24] leading-none">
          NUVARO
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-widest text-[#FBBF24] leading-tight">
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
      {/* Top Utility Bar (Exact Match to Screenshot Image 7) */}
      <div className="w-full bg-[#091E13] text-stone-200 text-xs py-2 px-4 sm:px-8 border-b border-white/10 hidden md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-[#FBBF24]" />
            <span className="text-stone-300">Email Support</span>
            <a
              href="mailto:bulkinglobal@gmail.com"
              className="font-semibold text-white hover:text-[#FBBF24] transition-colors underline-offset-2 hover:underline"
            >
              bulkinglobal@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-2">
            {/* Social circular icons */}
            <a
              href="#"
              aria-label="Facebook"
              className="h-6 w-6 rounded-full border border-white/20 flex items-center justify-center hover:border-[#FBBF24] hover:text-[#FBBF24] transition-colors"
            >
              <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="h-6 w-6 rounded-full border border-white/20 flex items-center justify-center hover:border-[#FBBF24] hover:text-[#FBBF24] transition-colors"
            >
              <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="h-6 w-6 rounded-full border border-white/20 flex items-center justify-center hover:border-[#FBBF24] hover:text-[#FBBF24] transition-colors"
            >
              <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="h-6 w-6 rounded-full border border-white/20 flex items-center justify-center hover:border-[#FBBF24] hover:text-[#FBBF24] transition-colors"
            >
              <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="h-6 w-6 rounded-full border border-white/20 flex items-center justify-center hover:border-[#FBBF24] hover:text-[#FBBF24] transition-colors"
            >
              <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+918888006532"
              className="flex items-center gap-1.5 font-bold hover:text-[#FBBF24] transition-colors text-white"
            >
              <Phone className="h-3.5 w-3.5 text-[#FBBF24]" />
              <span>+91 8888006532</span>
            </a>
            {/* Exact Yellow Select Language Pill Button from Screenshot Image 7 */}
            <div className="flex items-center gap-1.5 text-xs font-bold rounded-md px-3 py-1 bg-[#FBBF24] text-stone-950 hover:bg-[#F59E0B] transition-colors cursor-pointer shadow-xs">
              <Globe2 className="h-3.5 w-3.5 text-stone-950" />
              <span>Select Language</span>
              <ChevronDown className="h-3 w-3 text-stone-950" />
            </div>
          </div>
        </div>
      </div>

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