import React, { useState, useEffect } from 'react';
import { useLeads } from '../context/LeadContext';
import { useProducts } from '../context/ProductContext';
import { 
  Gauge, 
  Kanban, 
  FileSpreadsheet, 
  Package, 
  Printer, 
  TrendingUp, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Search, 
  Plus, 
  Trash2, 
  Upload, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Filter, 
  Check, 
  DollarSign, 
  Globe2, 
  Image as ImageIcon, 
  UserCheck, 
  FileText, 
  Mail, 
  Building, 
  Database, 
  Cloud, 
  Sparkles, 
  ChevronRight,
  RefreshCw,
  Bell,
  ArrowUpRight,
  ArrowLeft,
  ChevronDown,
  Layers,
  HelpCircle,
  CheckSquare,
  SlidersHorizontal,
  Home
} from 'lucide-react';

export default function AdminPortalPage({ onLogout, onBackToSite }) {
  const { leads, updateLeadStatus, deleteLead, addLead } = useLeads();
  const { products, addProduct, updateProduct, deleteProduct, uploadProductImage } = useProducts();
  
  // Navigation State - Matches the exact dark sidebar layout requested
  // 'dashboard' | 'pipeline' | 'table' | 'products' | 'quote-builder' | 'analytics' | 'messages' | 'settings'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Leads & Pipeline State
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState(null);
  const [leadSearch, setLeadSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Product Manager State
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [systemHealth, setSystemHealth] = useState(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Get active authenticated user details dynamically
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('nuvaro_admin_user');
      return stored ? JSON.parse(stored) : { email: 'admin', role: 'Super Admin', name: 'Admin Desk' };
    } catch {
      return { email: 'admin', role: 'Super Admin', name: 'Admin Desk' };
    }
  });

  // Load system backend health & engines
  const fetchHealth = () => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setSystemHealth(data))
      .catch(() => {});
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const initialProductForm = {
    name: '',
    botanicalName: '',
    category: 'Spice Powders',
    meshSize: '80-100 Mesh Ultra-Fine',
    forms: 'Fine Powder (80-100 Mesh), Granules (16-40 Mesh)',
    purity: '100% Pure, Zero Artificial Additives',
    colorProfile: '',
    description: '',
    applications: 'Commercial food formulations, Seasonings, Snack coatings',
    image: '',
    featured: false
  };
  const [productForm, setProductForm] = useState(initialProductForm);
  const [imagePreview, setImagePreview] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Currency Formatters for Quotation & Finance (Defaults to Indian Rupees ₹)
  const getCurrencySymbol = (curr = 'INR') => {
    switch ((curr || 'INR').toUpperCase()) {
      case 'INR':
        return '₹';
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      case 'USD':
      default:
        return '$';
    }
  };

  const formatCurrency = (val, curr = 'INR') => {
    const symbol = getCurrencySymbol(curr);
    const num = Number(val || 0);
    if ((curr || 'INR').toUpperCase() === 'INR') {
      return `${symbol} ${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `${symbol} ${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Quotation Builder State - Defaults to Indian Rupees (₹ INR)
  const [quoteBuilder, setQuoteBuilder] = useState({
    quoteNumber: `NV-QT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    quoteDate: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    buyerName: 'Henrik Van Der Meer',
    buyerCompany: 'Nordic Clean Foods BV',
    buyerEmail: 'h.vandermeer@nordiccleanfoods.nl',
    buyerCountry: 'Rotterdam, Netherlands',
    incoterm: 'CIF Rotterdam Port',
    currency: 'INR',
    paymentTerms: '30% Advance T/T, 70% against Bill of Lading (B/L)',
    lineItems: [
      { product: 'Spinach Powder (Air dried, 80 Mesh)', qty: 5000, unit: 'kg', unitPrice: 380.00 },
      { product: 'Beetroot Powder (Spray dried, 80 Mesh)', qty: 2500, unit: 'kg', unitPrice: 420.00 }
    ],
    notes: 'Packaging: 25kg HDPE fibre drums with food-grade inner liners. FSSAI facility license No. 10020021008942; phytosanitary inspection and laboratory COA confirmed with shipment.'
  });

  const [savedQuotes, setSavedQuotes] = useState([]);
  const [isSavingQuote, setIsSavingQuote] = useState(false);

  // Sync quotes dynamically from backend
  const fetchQuotes = () => {
    fetch('/api/quotes')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setSavedQuotes(data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleSaveQuoteToBackend = async () => {
    try {
      setIsSavingQuote(true);
      const subtotal = quoteBuilder.lineItems.reduce((acc, item) => acc + (Number(item.qty || 0) * Number(item.unitPrice || 0)), 0);
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...quoteBuilder, subtotal })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.quote) {
          setSavedQuotes(prev => [data.quote, ...prev.filter(q => q.id !== data.quote.id)]);
          showNotification(`Proforma Quotation ${data.quote.quoteNumber} saved to backend!`);
        }
      }
    } catch {
      showNotification('Failed to save quotation to backend.');
    } finally {
      setIsSavingQuote(false);
    }
  };

  const handleDeleteSavedQuote = async (id, num) => {
    if (!window.confirm(`Delete quotation ${num}?`)) return;
    try {
      await fetch(`/api/quotes/${id}`, { method: 'DELETE' });
      setSavedQuotes(prev => prev.filter(q => q.id !== id && q.quoteNumber !== id));
      showNotification(`Quotation ${num} deleted.`);
    } catch {
      showNotification('Failed to delete quotation.');
    }
  };

  const handleLoadSavedQuote = (quote) => {
    setQuoteBuilder({
      quoteNumber: quote.quoteNumber,
      quoteDate: quote.quoteDate,
      validUntil: quote.validUntil,
      buyerName: quote.buyerName,
      buyerCompany: quote.buyerCompany,
      buyerEmail: quote.buyerEmail,
      buyerCountry: quote.buyerCountry,
      incoterm: quote.incoterm,
      currency: quote.currency,
      paymentTerms: quote.paymentTerms,
      lineItems: quote.lineItems || [],
      notes: quote.notes || ''
    });
    setActiveTab('quote-builder');
    showNotification(`Loaded quotation ${quote.quoteNumber}`);
  };

  // Status Pipeline config
  const pipelineStatuses = [
    { id: 'New', label: 'New Inquiries', color: 'bg-blue-500', pill: 'bg-blue-50 text-blue-700 border-blue-200' },
    { id: 'Contacted', label: 'Contacted / Sample', color: 'bg-amber-500', pill: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 'Quoted', label: 'Quotation Sent', color: 'bg-purple-500', pill: 'bg-purple-50 text-purple-700 border-purple-200' },
    { id: 'Won', label: 'Contract Won', color: 'bg-emerald-500', pill: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'Lost', label: 'Closed / Lost', color: 'bg-slate-400', pill: 'bg-slate-50 text-slate-600 border-slate-200' }
  ];

  // Lead filtering
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      (lead.fullName && lead.fullName.toLowerCase().includes(leadSearch.toLowerCase())) ||
      (lead.company && lead.company.toLowerCase().includes(leadSearch.toLowerCase())) ||
      (lead.product && lead.product.toLowerCase().includes(leadSearch.toLowerCase())) ||
      (lead.country && lead.country.toLowerCase().includes(leadSearch.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Quotation math
  const calculateTotal = () => {
    return quoteBuilder.lineItems.reduce((acc, item) => acc + (item.qty * item.unitPrice), 0);
  };

  const addLineItem = () => {
    const isRupees = (quoteBuilder.currency || 'INR') === 'INR';
    setQuoteBuilder(prev => ({
      ...prev,
      lineItems: [
        ...prev.lineItems,
        {
          product: 'Moringa Leaf Powder (100 Mesh)',
          qty: 1000,
          unit: 'kg',
          unitPrice: isRupees ? 480.00 : 6.20
        }
      ]
    }));
  };

  const removeLineItem = (index) => {
    setQuoteBuilder(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter((_, i) => i !== index)
    }));
  };

  const updateLineItem = (index, field, value) => {
    setQuoteBuilder(prev => {
      const updated = [...prev.lineItems];
      updated[index][field] = field === 'qty' || field === 'unitPrice' ? parseFloat(value) || 0 : value;
      return { ...prev, lineItems: updated };
    });
  };

  // Product filtering
  const filteredProductsList = products.filter(p => {
    const q = productSearch.toLowerCase();
    const matchesSearch = 
      p.name.toLowerCase().includes(q) ||
      (p.botanicalName && p.botanicalName.toLowerCase().includes(q)) ||
      (p.meshSize && p.meshSize.toLowerCase().includes(q));
    const matchesCategory = productCategoryFilter === 'All' || p.category === productCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleImageFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadedUrl = await uploadProductImage(file);
      if (uploadedUrl) {
        setImagePreview(uploadedUrl);
        setProductForm(prev => ({ ...prev, image: uploadedUrl }));
        showNotification(
          systemHealth?.cloudinary?.configured
            ? 'Product image optimized and uploaded to Cloudinary CDN!'
            : 'Product image uploaded to local storage successfully!'
        );
      }
    } catch (err) {
      console.error('Image upload failed', err);
      showNotification('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateProductSubmit = async (e) => {
    e.preventDefault();
    if (!productForm.name.trim()) {
      alert('Please enter a product name');
      return;
    }

    const formsArray = typeof productForm.forms === 'string'
      ? productForm.forms.split(',').map(s => s.trim()).filter(Boolean)
      : productForm.forms;

    const appsArray = typeof productForm.applications === 'string'
      ? productForm.applications.split(',').map(s => s.trim()).filter(Boolean)
      : productForm.applications;

    const newProd = await addProduct({
      ...productForm,
      forms: formsArray,
      applications: appsArray,
      image: productForm.image || '/images/powders/onion-powder.jpg'
    });

    setIsAddProductModalOpen(false);
    setProductForm(initialProductForm);
    setImagePreview(null);
    showNotification(`Product "${newProd.name}" published live to /products!`);
  };

  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the live catalog?`)) {
      await deleteProduct(id);
      showNotification(`Product "${name}" removed from catalog.`);
    }
  };

  const handleConvertLeadToQuote = (lead) => {
    setQuoteBuilder(prev => ({
      ...prev,
      buyerName: lead.fullName || prev.buyerName,
      buyerCompany: lead.company || prev.buyerCompany,
      buyerEmail: lead.email || prev.buyerEmail,
      buyerCountry: lead.country || prev.buyerCountry,
      currency: 'INR',
      lineItems: [
        {
          product: `${lead.product} (${lead.powderForm || 'Fine Powder 80-100 Mesh'})`,
          qty: parseInt(lead.quantity) || 5000,
          unit: 'kg',
          unitPrice: 380.00
        }
      ]
    }));
    setActiveTab('quote-builder');
    setSelectedLeadForDetail(null);
    showNotification(`Converted ${lead.company}'s inquiry into official Quotation Builder in Rupees (₹)!`);
  };

  // Export to CSV helper
  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Full Name', 'Company', 'Email', 'Phone', 'Country', 'Product', 'Quantity', 'Status', 'Type'];
    const rows = leads.map(l => [
      l.id,
      l.createdAt?.split('T')[0] || '',
      `"${l.fullName || ''}"`,
      `"${l.company || ''}"`,
      l.email || '',
      l.phone || '',
      `"${l.country || ''}"`,
      `"${l.product || ''}"`,
      `"${l.quantity || ''}"`,
      l.status || 'New',
      l.type || 'Commercial Quote'
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nuvaro_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Sidebar Menu Items Definition (Enlisting all working features)
  const navMenuItems = [
    {
      id: 'dashboard',
      displayLabel: 'Dashboard',
      icon: Gauge,
      badge: null
    },
    {
      id: 'pipeline',
      displayLabel: 'Leads Pipeline',
      icon: Kanban,
      badge: leads.filter(l => l.status === 'New').length || null
    },
    {
      id: 'table',
      displayLabel: 'Inquiries Table',
      icon: FileSpreadsheet,
      badge: leads.length
    },
    {
      id: 'products',
      displayLabel: 'Products Catalog',
      icon: Package,
      badge: products.length
    },
    {
      id: 'quote-builder',
      displayLabel: 'Export Quotations',
      icon: Printer,
      badge: savedQuotes.length || null
    },
    {
      id: 'analytics',
      displayLabel: 'Analytics & Reports',
      icon: TrendingUp,
      badge: null
    },
    {
      id: 'messages',
      displayLabel: 'Customer Messages',
      icon: Users,
      badge: leads.filter(l => l.type === 'Contact Form' || l.type === 'Catalogue Download').length || null
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans antialiased text-slate-800 selection:bg-[#1D61F2] selection:text-white">
      {/* Toast Notification Alert */}
      {notification && (
        <div className="fixed top-5 right-5 z-[9999] flex items-center gap-3 bg-[#0A1629] border border-blue-500/40 text-white px-5 py-3.5 rounded-xl shadow-2xl animate-text-in text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* ============================================================== */}
      {/* SHADCN-STYLE DARK MIDNIGHT SIDEBAR (#0A1629 Layout)              */}
      {/* ============================================================== */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#0A1629] text-white flex flex-col justify-between border-r border-[#162544] transition-transform duration-300 ease-in-out
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top: Brand Logo & Title */}
        <div>
          <div className="h-20 px-6 flex items-center justify-between border-b border-[#162544]">
            <div className="flex items-center gap-3.5">
              {/* Premium 3D Ribbon Emblem matching reference */}
              <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-md">
                  <defs>
                    <linearGradient id="ribbonOrange" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF6B35" />
                      <stop offset="100%" stopColor="#EA580C" />
                    </linearGradient>
                    <linearGradient id="ribbonBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38BDF8" />
                      <stop offset="40%" stopColor="#1D61F2" />
                      <stop offset="100%" stopColor="#0B3C9B" />
                    </linearGradient>
                  </defs>
                  {/* Upper Ribbon Wing (Warm / Amber / Red) */}
                  <path
                    d="M7 11C7 7.5 10 5 14 5H21C26.5 5 29 9 26.5 13.5L20 22C18.5 24 16 24 14 22L7 11Z"
                    fill="url(#ribbonOrange)"
                  />
                  {/* Lower Ribbon Fold (Electric Blue / Azure) */}
                  <path
                    d="M29 25C29 28.5 26 31 22 31H15C9.5 31 7 27 9.5 22.5L16 14C17.5 12 20 12 22 14L29 25Z"
                    fill="url(#ribbonBlue)"
                  />
                </svg>
              </div>

              <div>
                <h1 className="text-base font-bold text-white tracking-tight leading-tight font-sans">
                  Nuvaro Agro
                </h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                    Global Export Portal
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    B2B
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3.5 space-y-2">
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm transition-all duration-150 text-left cursor-pointer group
                    ${isActive 
                      ? 'bg-[#1D61F2] text-white font-semibold shadow-[0_4px_16px_rgba(29,97,242,0.4)]' 
                      : 'text-slate-300 font-normal hover:text-white hover:bg-white/[0.06]'
                    }
                  `}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`} />
                    <span className="tracking-normal font-sans">{item.displayLabel}</span>
                  </div>

                  {item.badge !== null && item.badge !== undefined && (
                    <span className={`
                      text-[10px] font-bold px-2 py-0.5 rounded-full
                      ${isActive ? 'bg-white/20 text-white' : 'bg-[#162544] text-slate-300'}
                    `}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Settings, Sign out, and User Profile Card */}
        <div className="p-3.5 border-t border-[#162544] space-y-1.5">
          <button
            type="button"
            onClick={() => {
              setActiveTab('settings');
              setIsMobileSidebarOpen(false);
            }}
            className={`
              w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm transition-all duration-150 text-left cursor-pointer
              ${activeTab === 'settings' 
                ? 'bg-[#1D61F2] text-white font-semibold' 
                : 'text-slate-300 font-normal hover:text-white hover:bg-white/[0.06]'
              }
            `}
          >
            <Settings className="w-5 h-5 text-slate-300" />
            <span>Settings</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-normal text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-150 text-left cursor-pointer"
          >
            <LogOut className="w-5 h-5 text-slate-300" />
            <span>Sign out</span>
          </button>

          {/* User Profile Card */}
          <div className="mt-2 pt-2 border-t border-[#162544] px-2 py-1.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">
              {(currentUser.email || 'A').slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-slate-200 block truncate leading-tight font-sans" title={currentUser.email}>
                {currentUser.email}
              </span>
              <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> {currentUser.role || 'Super Admin'}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Backdrop overlay for mobile sidebar */}
      {isMobileSidebarOpen && (
        <div 
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* ============================================================== */}
      {/* MAIN CONTENT AREA WITH SHADCN TOPBAR & DEDICATED ADMIN FOOTER   */}
      {/* ============================================================== */}
      <main className="flex-1 lg:pl-72 flex flex-col min-w-0 min-h-screen">
        
        {/* SHADCN TOPBAR HEADER */}
        <header className="h-16 sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1 text-slate-400">
                <Home className="w-3.5 h-3.5" />
                <span>Admin</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-bold text-slate-900 capitalize font-sans">
                {activeTab === 'dashboard' && 'Dashboard Overview'}
                {activeTab === 'pipeline' && 'Leads Pipeline'}
                {activeTab === 'table' && 'Inquiries Table'}
                {activeTab === 'products' && 'Products Catalog'}
                {activeTab === 'quote-builder' && 'Export Quotations'}
                {activeTab === 'analytics' && 'Analytics & Markets'}
                {activeTab === 'messages' && 'Customer Messages'}
                {activeTab === 'settings' && 'Settings'}
              </span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* MongoDB status badge */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-[11px] font-medium text-slate-700">
              <span className={`w-2 h-2 rounded-full ${systemHealth?.database?.connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span>{systemHealth?.database?.connected ? 'MongoDB Cluster Online' : 'Local JSON Database'}</span>
            </div>

            {/* Cloudinary status badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-[11px] font-medium text-slate-700">
              <span className={`w-2 h-2 rounded-full ${systemHealth?.cloudinary?.configured ? 'bg-sky-500' : 'bg-amber-500'}`} />
              <span>{systemHealth?.cloudinary?.configured ? 'Cloudinary CDN Active' : 'Local File Storage'}</span>
            </div>

            {/* Back to Public Storefront Link Button */}
            {onBackToSite ? (
              <button
                type="button"
                onClick={onBackToSite}
                className="hidden sm:inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-all shadow-xs"
              >
                <span>Storefront</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </button>
            ) : (
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-all shadow-xs"
              >
                <span>Storefront</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}

            {/* Refresh Sync Button */}
            <button
              type="button"
              onClick={() => {
                fetchHealth();
                fetchQuotes();
                showNotification('Synced with backend database & CDN.');
              }}
              title="Refresh sync"
              className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* ============================================================== */}
        {/* VIEW 1: DASHBOARD OVERVIEW (SHADCN CARD PATTERN)                */}
        {/* ============================================================== */}
        {activeTab === 'dashboard' && (
          <div className="p-6 sm:p-8 space-y-6 flex-1">
            {/* Top Stat KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {/* Card 1: Total Leads */}
              <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Total Inquiries</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-bold tracking-tight text-slate-900">{leads.length}</div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>+14.8% from last month</span>
                  </div>
                </div>
              </div>

              {/* Card 2: New Inquiries */}
              <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">New &amp; Pending RFQs</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-bold tracking-tight text-amber-600">
                    {leads.filter(l => l.status === 'New').length}
                  </div>
                  <div className="text-[11px] text-amber-600 font-medium mt-1">
                    Awaiting commercial review
                  </div>
                </div>
              </div>

              {/* Card 3: Contracts Won */}
              <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Export Contracts Won</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-bold tracking-tight text-emerald-600">
                    {leads.filter(l => l.status === 'Won').length}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1">
                    92.4% order fulfillment
                  </div>
                </div>
              </div>

              {/* Card 4: Quotation Pipeline */}
              <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Quotation Pipeline</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm font-sans">
                    ₹
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
                    ₹ {((leads.filter(l => l.status === 'Quoted' || l.status === 'Won').length * 2850000) || 5700000).toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1">
                    Active commercial RFQ value
                  </div>
                </div>
              </div>
            </div>

            {/* Shadcn Quick Actions Toolbar */}
            <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Commercial Operations Hub</h3>
                  <p className="text-[11px] text-slate-500">Quick-trigger export actions, catalog addition, and proformas.</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('quote-builder')}
                  className="h-8 px-3 rounded-lg bg-[#1D61F2] hover:bg-blue-600 text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Create Proforma</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setProductForm(initialProductForm);
                    setImagePreview(null);
                    setIsAddProductModalOpen(true);
                  }}
                  className="h-8 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Commodity</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="h-8 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Leads</span>
                </button>
              </div>
            </div>

            {/* Two-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column (2 Cols): Recent Commercial Inquiries */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Recent Incoming Inquiries</h3>
                    <p className="text-xs text-slate-500">Live requests from global food, beverage &amp; seasoning brands.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('table')}
                    className="text-xs font-semibold text-[#1D61F2] hover:underline"
                  >
                    View All ({leads.length}) &rarr;
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {leads.slice(0, 5).map((lead) => (
                    <div key={lead.id} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50/70 rounded-lg px-2 transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-xs sm:text-sm">{lead.company}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                            {lead.country}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          {lead.product} &bull; <strong className="text-slate-700 font-semibold">{lead.quantity}</strong> &bull; Buyer: {lead.fullName}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          lead.status === 'New' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          lead.status === 'Won' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          lead.status === 'Quoted' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                          'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {lead.status}
                        </span>

                        <button
                          type="button"
                          onClick={() => setSelectedLeadForDetail(lead)}
                          className="h-7 px-2.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Engine Status & Top Commodities */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-600" />
                    <span>System Infrastructure</span>
                  </h3>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-700">MongoDB Database:</span>
                        <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${systemHealth?.database?.connected ? 'text-emerald-700' : 'text-amber-700'}`}>
                          <span className={`w-2 h-2 rounded-full ${systemHealth?.database?.connected ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          {systemHealth?.database?.connected ? 'MongoDB Atlas' : 'Local JSON DB'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Products ({products.length}) &bull; Leads ({leads.length}) &bull; Quotes ({savedQuotes.length})
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-700">Cloudinary Media CDN:</span>
                        <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${systemHealth?.cloudinary?.configured ? 'text-sky-700' : 'text-amber-700'}`}>
                          <span className={`w-2 h-2 rounded-full ${systemHealth?.cloudinary?.configured ? 'bg-sky-500' : 'bg-amber-500'}`} />
                          {systemHealth?.cloudinary?.configured ? 'CDN Active' : 'Local Storage'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Automatic WebP &amp; JPG CDN transformations
                      </p>
                    </div>
                  </div>
                </div>

                {/* Top Export Commodities */}
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 space-y-3">
                  <h3 className="text-sm font-bold text-slate-900">In-Demand Commodity Share</h3>
                  <div className="space-y-2.5 text-xs">
                    {[
                      { name: 'Moringa Leaf Powder (100 Mesh)', share: '32%', color: 'bg-emerald-500' },
                      { name: 'Pure Beetroot Powder (80 Mesh)', share: '24%', color: 'bg-rose-500' },
                      { name: 'Dehydrated Garlic Granules', share: '22%', color: 'bg-amber-500' },
                      { name: 'Spinach Superfine Powder', share: '14%', color: 'bg-teal-500' }
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between font-medium text-slate-700">
                          <span>{item.name}</span>
                          <span className="font-bold text-slate-900">{item.share}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div className={`${item.color} h-1.5 rounded-full`} style={{ width: item.share }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: LEADS PIPELINE (KANBAN BOARD)                           */}
        {/* ============================================================== */}
        {activeTab === 'pipeline' && (
          <div className="p-6 sm:p-8 space-y-6 flex-1">
            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search leads by company, buyer or product..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#1D61F2]"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {['All', 'New', 'Contacted', 'Quoted', 'Won', 'Lost'].map(st => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`h-8 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      statusFilter === st
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Kanban Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 overflow-x-auto pb-6">
              {pipelineStatuses.map(status => {
                const columnLeads = filteredLeads.filter(l => l.status === status.id);

                return (
                  <div key={status.id} className="bg-slate-100/70 rounded-xl p-3.5 border border-slate-200/70 flex flex-col min-h-[500px]">
                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${status.color}`} />
                        <h4 className="font-bold text-xs text-slate-900">{status.label}</h4>
                      </div>
                      <span className="text-[10px] font-bold bg-white text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
                        {columnLeads.length}
                      </span>
                    </div>

                    <div className="space-y-2.5 flex-1 overflow-y-auto">
                      {columnLeads.length === 0 ? (
                        <div className="text-center py-10 text-slate-400 text-xs italic">
                          No inquiries
                        </div>
                      ) : (
                        columnLeads.map(lead => (
                          <div
                            key={lead.id}
                            className="bg-white rounded-lg p-3.5 border border-slate-200 shadow-2xs hover:shadow-sm transition-shadow cursor-pointer space-y-2 group"
                            onClick={() => setSelectedLeadForDetail(lead)}
                          >
                            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                              <span>{lead.id}</span>
                              <span className="text-slate-600 font-bold">{lead.country}</span>
                            </div>

                            <h5 className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                              {lead.company}
                            </h5>
                            <p className="text-[11px] text-slate-600">
                              Product: <strong className="text-slate-800">{lead.product}</strong>
                            </p>
                            <div className="text-[10px] text-slate-500">
                              Volume: <span className="font-semibold text-slate-700">{lead.quantity}</span>
                            </div>

                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                              <span className="text-slate-400">Stage:</span>
                              <select
                                value={lead.status}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                className="bg-slate-50 border border-slate-200 text-slate-700 rounded px-1.5 py-0.5 font-semibold text-[10px]"
                              >
                                {pipelineStatuses.map(s => (
                                  <option key={s.id} value={s.id}>{s.id}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 3: INQUIRIES SPREADSHEET TABLE                             */}
        {/* ============================================================== */}
        {activeTab === 'table' && (
          <div className="p-6 sm:p-8 space-y-6 flex-1">
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter inquiries..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#1D61F2]"
                />
              </div>

              <button
                type="button"
                onClick={handleExportCSV}
                className="h-8 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Ref #</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Company &amp; Buyer</th>
                      <th className="py-3 px-4">Country</th>
                      <th className="py-3 px-4">Commodity</th>
                      <th className="py-3 px-4">Volume</th>
                      <th className="py-3 px-4">Stage</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.map(lead => (
                      <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-blue-600">{lead.id}</td>
                        <td className="py-3 px-4 text-slate-500">{lead.createdAt?.split('T')[0]}</td>
                        <td className="py-3 px-4">
                          <strong className="text-slate-900 block">{lead.company}</strong>
                          <span className="text-slate-500 text-[11px]">{lead.fullName} &bull; {lead.email}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-700">{lead.country}</td>
                        <td className="py-3 px-4 font-semibold text-slate-800">{lead.product}</td>
                        <td className="py-3 px-4">{lead.quantity}</td>
                        <td className="py-3 px-4">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            className="bg-slate-100 text-slate-800 border border-slate-200 rounded px-2 py-1 text-xs font-semibold focus:outline-none"
                          >
                            {pipelineStatuses.map(s => (
                              <option key={s.id} value={s.id}>{s.id}</option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedLeadForDetail(lead)}
                              className="h-7 px-2.5 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-[11px]"
                            >
                              View
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteLead(lead.id)}
                              className="h-7 w-7 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center"
                              title="Delete inquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 4: PRODUCTS CATALOG MANAGEMENT                             */}
        {/* ============================================================== */}
        {activeTab === 'products' && (
          <div className="p-6 sm:p-8 space-y-6 flex-1">
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                  MongoDB &amp; Cloudinary CDN Synced
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  Product Master Catalog ({products.length})
                </h3>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search commodities..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#1D61F2]"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setProductForm(initialProductForm);
                    setImagePreview(null);
                    setIsAddProductModalOpen(true);
                  }}
                  className="h-8 px-3 rounded-lg bg-[#1D61F2] hover:bg-blue-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors shrink-0 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Commodity</span>
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {['All', 'Spice Powders', 'Vegetable Powders', 'Herbal & Botanical', 'Exotic Fruit'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setProductCategoryFilter(cat)}
                  className={`h-8 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    productCategoryFilter === cat
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProductsList.map(product => (
                <div key={product.id} className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-sm transition-shadow group">
                  <div>
                    <div className="relative h-44 bg-slate-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => { e.target.src = '/images/powders/onion-powder.jpg'; }}
                      />
                      <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-800 shadow-2xs">
                        {product.category}
                      </div>
                      {product.featured && (
                        <div className="absolute top-2.5 right-2.5 bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider shadow-2xs">
                          Featured
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-1.5">
                      <span className="text-[11px] italic font-serif text-slate-500 block">
                        {product.botanicalName || 'Commercial Agro Harvest'}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug">{product.name}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="pt-2 border-t border-slate-100 text-[11px] space-y-1 text-slate-600">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Mesh Cut:</span>
                          <strong className="text-slate-800">{product.meshSize}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Purity:</span>
                          <span className="text-emerald-700 font-semibold truncate max-w-[180px]">{product.purity}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                    <span className="text-[10px] font-mono text-slate-400">ID: {product.id}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(product.id, product.name)}
                      className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete commodity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 5: EXPORT PROFORMA QUOTATION BUILDER                       */}
        {/* ============================================================== */}
        {activeTab === 'quote-builder' && (
          <div className="p-6 sm:p-8 space-y-6 flex-1">
            <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Official B2B Export Quotation Generator</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Generate and download international CIF/FOB proforma quotations on Nuvaro Agro letterhead.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveQuoteToBackend}
                    disabled={isSavingQuote}
                    className="h-8 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />
                    <span>{isSavingQuote ? 'Saving...' : 'Save to Backend'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="h-8 px-3 rounded-lg bg-[#1D61F2] hover:bg-blue-600 text-white text-xs font-semibold transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / PDF</span>
                  </button>
                </div>
              </div>

              {/* Quotation Editor Inputs */}
              <div className="space-y-3 text-xs print:hidden font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Quote Reference #</label>
                    <input
                      type="text"
                      value={quoteBuilder.quoteNumber}
                      onChange={(e) => setQuoteBuilder(prev => ({ ...prev, quoteNumber: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 font-sans font-medium text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Date</label>
                    <input
                      type="date"
                      value={quoteBuilder.quoteDate}
                      onChange={(e) => setQuoteBuilder(prev => ({ ...prev, quoteDate: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 font-sans"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Valid Until</label>
                    <input
                      type="date"
                      value={quoteBuilder.validUntil}
                      onChange={(e) => setQuoteBuilder(prev => ({ ...prev, validUntil: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 font-sans"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Quotation Currency</label>
                    <select
                      value={quoteBuilder.currency || 'INR'}
                      onChange={(e) => setQuoteBuilder(prev => ({ ...prev, currency: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 font-sans font-semibold text-slate-900 bg-white"
                    >
                      <option value="INR">INR (₹) - Indian Rupees</option>
                      <option value="USD">USD ($) - US Dollars</option>
                      <option value="EUR">EUR (€) - Euros</option>
                      <option value="GBP">GBP (£) - British Pounds</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Dispatch / Incoterm</label>
                    <input
                      type="text"
                      value={quoteBuilder.incoterm}
                      onChange={(e) => setQuoteBuilder(prev => ({ ...prev, incoterm: e.target.value }))}
                      placeholder="e.g. Ex-Factory / CIF Rotterdam / FOB Nhava Sheva"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 font-sans"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Buyer Representative</label>
                    <input
                      type="text"
                      value={quoteBuilder.buyerName}
                      onChange={(e) => setQuoteBuilder(prev => ({ ...prev, buyerName: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 font-sans"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Buyer Company</label>
                    <input
                      type="text"
                      value={quoteBuilder.buyerCompany}
                      onChange={(e) => setQuoteBuilder(prev => ({ ...prev, buyerCompany: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 font-sans"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Destination / Delivery City</label>
                    <input
                      type="text"
                      value={quoteBuilder.buyerCountry}
                      onChange={(e) => setQuoteBuilder(prev => ({ ...prev, buyerCountry: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Printable Proforma Preview Card */}
              <div 
                id="printable-quotation"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                className="border border-slate-300 rounded-2xl p-6 sm:p-8 bg-white space-y-5 shadow-2xs font-sans text-slate-900"
              >
                {/* Formal Letterhead */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-slate-900 pb-4">
                  <div>
                    <div className="text-xl font-bold text-slate-900 tracking-tight font-sans">NUVARO AGRO PVT LTD</div>
                    <p className="text-xs text-slate-600 mt-0.5 font-sans">Export Division &bull; Dehydrated Agro Commodities</p>
                    <p className="text-[11px] text-slate-500 font-sans">FSSAI Central License No. 10020021008942 &bull; IEC Certified</p>
                  </div>
                  <div className="text-right text-xs space-y-0.5 font-sans">
                    <span className="font-bold text-xs text-[#1D61F2] block font-sans uppercase tracking-wider">
                      PROFORMA INVOICE / QUOTE
                    </span>
                    <div>Ref: <strong className="font-semibold">{quoteBuilder.quoteNumber}</strong></div>
                    <div>Date: {quoteBuilder.quoteDate}</div>
                    <div>Incoterms: <strong className="font-semibold">{quoteBuilder.incoterm}</strong></div>
                  </div>
                </div>

                {/* Line Items Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-sans border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="bg-[#0A1629] text-white font-sans">
                      <tr>
                        <th className="py-2.5 px-3.5 font-semibold">#</th>
                        <th className="py-2.5 px-3.5 font-semibold">Commodity Description</th>
                        <th className="py-2.5 px-3.5 text-center font-semibold">Quantity</th>
                        <th className="py-2.5 px-3.5 text-right font-semibold">
                          Unit Rate ({quoteBuilder.currency === 'INR' ? '₹ INR' : quoteBuilder.currency})
                        </th>
                        <th className="py-2.5 px-3.5 text-right font-semibold">
                          Total ({quoteBuilder.currency === 'INR' ? '₹ INR' : quoteBuilder.currency})
                        </th>
                        <th className="py-2.5 px-3.5 text-center print:hidden font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-sans">
                      {quoteBuilder.lineItems.map((item, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                          <td className="py-2.5 px-3.5 font-medium text-slate-500">{idx + 1}</td>
                          <td className="py-2.5 px-3.5 font-semibold text-slate-900">
                            <input
                              type="text"
                              value={item.product}
                              onChange={(e) => updateLineItem(idx, 'product', e.target.value)}
                              className="w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#1D61F2] focus:outline-none font-semibold text-slate-900 py-0.5 print:border-none"
                            />
                          </td>
                          <td className="py-2.5 px-3.5 text-center font-medium">
                            <div className="inline-flex items-center justify-center gap-1">
                              <input
                                type="number"
                                min="1"
                                value={item.qty}
                                onChange={(e) => updateLineItem(idx, 'qty', e.target.value)}
                                className="w-20 px-2 py-1 text-center rounded border border-slate-200 text-xs font-sans font-semibold text-slate-800 bg-white print:border-none print:w-auto print:p-0"
                              />
                              <span className="text-slate-600 font-medium">{item.unit}</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3.5 text-right font-medium text-slate-800">
                            <div className="inline-flex items-center justify-end gap-1">
                              <span className="text-slate-600 font-bold">{getCurrencySymbol(quoteBuilder.currency)}</span>
                              <input
                                type="number"
                                step="0.01"
                                value={item.unitPrice}
                                onChange={(e) => updateLineItem(idx, 'unitPrice', e.target.value)}
                                className="w-24 px-2 py-1 text-right rounded border border-slate-200 text-xs font-sans font-semibold text-slate-800 bg-white print:border-none print:w-auto print:p-0"
                              />
                            </div>
                          </td>
                          <td className="py-2.5 px-3.5 text-right font-bold text-slate-900 font-sans">
                            {formatCurrency(item.qty * item.unitPrice, quoteBuilder.currency)}
                          </td>
                          <td className="py-2.5 px-3.5 text-center print:hidden">
                            <button
                              type="button"
                              onClick={() => removeLineItem(idx)}
                              className="text-slate-400 hover:text-red-600 p-1 text-base font-bold transition-colors"
                              title="Remove item"
                            >
                              &times;
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-100/90 font-bold border-t-2 border-slate-300 font-sans">
                      <tr>
                        <td colSpan={4} className="py-3 px-3.5 text-right uppercase text-slate-700 tracking-wider text-xs">
                          TOTAL CONTRACT VALUE:
                        </td>
                        <td className="py-3 px-3.5 text-right text-base text-[#1D61F2] font-bold font-sans">
                          {formatCurrency(calculateTotal(), quoteBuilder.currency)} {quoteBuilder.currency}
                        </td>
                        <td className="print:hidden"></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <button
                  type="button"
                  onClick={addLineItem}
                  className="h-8 px-3 rounded-lg border border-dashed border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold print:hidden flex items-center gap-1 cursor-pointer font-sans"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Commodity Row
                </button>
              </div>

              {/* Saved Quotations Backend Table */}
              <div className="pt-4 border-t border-slate-200 print:hidden space-y-3 font-sans">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-sans">
                  Saved Proforma Quotations in Backend ({savedQuotes.length})
                </h4>

                {savedQuotes.length === 0 ? (
                  <div className="text-center py-6 bg-slate-50 rounded-lg text-slate-400 text-xs font-sans">
                    No quotations saved yet. Click "Save to Backend" to store quotes in MongoDB / database.
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-lg border border-slate-200">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-3">Quote #</th>
                          <th className="py-2.5 px-3">Date</th>
                          <th className="py-2.5 px-3">Buyer Company</th>
                          <th className="py-2.5 px-3">Incoterm</th>
                          <th className="py-2.5 px-3 text-right">Amount</th>
                          <th className="py-2.5 px-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-sans">
                        {savedQuotes.map(q => {
                          const val = q.subtotal || (q.lineItems || []).reduce((acc, it) => acc + (it.qty * it.unitPrice), 0);
                          return (
                            <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                              <td className="py-2.5 px-3 font-bold text-blue-600 font-sans">{q.quoteNumber}</td>
                              <td className="py-2.5 px-3 text-slate-500 font-sans">{q.quoteDate}</td>
                              <td className="py-2.5 px-3 font-semibold text-slate-800 font-sans">{q.buyerCompany || q.buyerName}</td>
                              <td className="py-2.5 px-3 text-slate-600 font-sans">{q.incoterm}</td>
                              <td className="py-2.5 px-3 text-right font-bold text-slate-900 font-sans">
                                {formatCurrency(val, q.currency || 'INR')}
                              </td>
                              <td className="py-2.5 px-3 text-right">
                                <div className="inline-flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => handleLoadSavedQuote(q)}
                                    className="h-6 px-2.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[10px] cursor-pointer"
                                  >
                                    Load
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteSavedQuote(q.id, q.quoteNumber)}
                                    className="h-6 w-6 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center cursor-pointer"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 6: ANALYTICS & REPORTS                                    */}
        {/* ============================================================== */}
        {activeTab === 'analytics' && (
          <div className="p-6 sm:p-8 space-y-6 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs space-y-3">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span>Top Inquired Powders</span>
                </h3>
                <div className="space-y-2.5">
                  {[
                    { name: 'Moringa Leaf Powder', percentage: 28, count: '38 MT' },
                    { name: 'Spinach Powder', percentage: 24, count: '32 MT' },
                    { name: 'Beetroot Powder', percentage: 20, count: '26 MT' },
                    { name: 'Dehydrated Garlic & Onion', percentage: 16, count: '21 MT' },
                    { name: 'Pure Turmeric Powder', percentage: 12, count: '16 MT' }
                  ].map((p, i) => (
                    <div key={i} className="space-y-1 text-xs">
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-800">{p.name}</span>
                        <span className="font-mono text-slate-500">{p.count}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-[#1D61F2] h-1.5 rounded-full" style={{ width: `${p.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs space-y-3">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-blue-600" />
                  <span>Buyer Regional Distribution</span>
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                    <span className="font-medium text-slate-800">European Union (Germany, NL, UK)</span>
                    <span className="font-bold text-emerald-700 font-mono">42%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                    <span className="font-medium text-slate-800">North America (USA &amp; Canada)</span>
                    <span className="font-bold text-emerald-700 font-mono">31%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                    <span className="font-medium text-slate-800">Middle East (UAE, Saudi Arabia)</span>
                    <span className="font-bold text-emerald-700 font-mono">15%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                    <span className="font-medium text-slate-800">Asia-Pacific (Japan, South Korea)</span>
                    <span className="font-bold text-emerald-700 font-mono">12%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs space-y-3">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Compliance Standards</span>
                </h3>
                <div className="text-center py-2 space-y-1">
                  <div className="text-3xl font-extrabold text-[#1D61F2]">FSSAI</div>
                  <p className="text-[11px] text-slate-500">Central Food Safety License 10020021008942</p>
                </div>
                <div className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="flex justify-between">
                    <span>Quality Scope:</span>
                    <strong className="text-slate-900">Agreed per order</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Sterilization:</span>
                    <strong className="text-slate-900">Clean Low-Bioburden</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>COA Certificate:</span>
                    <strong className="text-slate-900">Standard for batch</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 7: CUSTOMER MESSAGES                                       */}
        {/* ============================================================== */}
        {activeTab === 'messages' && (
          <div className="p-6 sm:p-8 space-y-6 flex-1">
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">Direct Customer Inquiries &amp; Catalogue Requests</h3>
              <div className="divide-y divide-slate-100">
                {leads.filter(l => l.type === 'Contact Form' || l.type === 'Catalogue Download').length === 0 ? (
                  <div className="text-center py-10 text-slate-400 text-xs">
                    No customer contact messages yet.
                  </div>
                ) : (
                  leads.filter(l => l.type === 'Contact Form' || l.type === 'Catalogue Download').map(msg => (
                    <div key={msg.id} className="py-3.5 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">{msg.fullName} ({msg.company})</span>
                        <span className="text-[10px] text-slate-400 font-mono">{msg.createdAt?.split('T')[0]}</span>
                      </div>
                      <p className="text-xs text-blue-600 font-mono">{msg.email} &bull; {msg.phone}</p>
                      <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200/60 mt-1">{msg.notes}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 8: SETTINGS & SYSTEM CONFIGURATION                         */}
        {/* ============================================================== */}
        {activeTab === 'settings' && (
          <div className="p-6 sm:p-8 space-y-6 flex-1">
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 space-y-5">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="font-bold text-slate-900 text-base">Backend Infrastructure &amp; Environment Settings</h3>
                <p className="text-xs text-slate-500">Configure MongoDB cluster connectivity and Cloudinary CDN credentials.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* MongoDB Panel */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <Database className="w-4 h-4 text-blue-600" />
                      MongoDB Database
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${systemHealth?.database?.connected ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {systemHealth?.database?.connected ? 'Connected' : 'Fallback Active'}
                    </span>
                  </div>

                  <div className="space-y-1 text-slate-600">
                    <div>Engine: <strong>{systemHealth?.database?.engine || 'Local Database Engine'}</strong></div>
                    <div>Database: <strong>{systemHealth?.database?.dbName || 'nuvaro_agro'}</strong></div>
                    <p className="text-[11px] text-slate-500 pt-1">
                      To connect MongoDB Atlas, edit <code className="bg-slate-200 px-1 py-0.5 rounded">.env</code> in project root and enter your <code className="bg-slate-200 px-1 py-0.5 rounded">MONGODB_URI</code>.
                    </p>
                  </div>
                </div>

                {/* Cloudinary Panel */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <Cloud className="w-4 h-4 text-sky-600" />
                      Cloudinary Media CDN
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${systemHealth?.cloudinary?.configured ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'}`}>
                      {systemHealth?.cloudinary?.configured ? 'Active' : 'Local Storage'}
                    </span>
                  </div>

                  <div className="space-y-1 text-slate-600">
                    <div>Cloud Name: <strong>{systemHealth?.cloudinary?.cloudName || 'Not configured'}</strong></div>
                    <div>Folder: <strong>nuvaro_agro/products</strong></div>
                    <p className="text-[11px] text-slate-500 pt-1">
                      To activate Cloudinary CDN uploads, set <code className="bg-slate-200 px-1 py-0.5 rounded">CLOUDINARY_CLOUD_NAME</code>, <code className="bg-slate-200 px-1 py-0.5 rounded">CLOUDINARY_API_KEY</code>, and <code className="bg-slate-200 px-1 py-0.5 rounded">CLOUDINARY_API_SECRET</code> in <code className="bg-slate-200 px-1 py-0.5 rounded">.env</code>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Admin Information */}
              <div className="pt-3 border-t border-slate-200 text-xs space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Active Session:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Role</span>
                    <strong className="text-slate-800">Super Administrator</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Email</span>
                    <strong className="text-slate-800">{currentUser.email}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Desk</span>
                    <strong className="text-emerald-700">Commercial Global Exports</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* DEDICATED PROFESSIONAL ADMIN FOOTER                             */}
        {/* ============================================================== */}
        <footer className="h-14 border-t border-slate-200/80 bg-white px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            <span>&copy; {new Date().getFullYear()} Nuvaro Agro Pvt Ltd. All rights reserved. &bull; Enterprise Export Operations Desk</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
            <span>API v1.4.0</span>
            <span>&bull;</span>
            <span className="text-emerald-600 font-semibold">256-Bit SSL Protected</span>
          </div>
        </footer>

        {/* ============================================================== */}
        {/* MODAL: ADD NEW PRODUCT (SHADCN DIALOG)                          */}
        {/* ============================================================== */}
        {isAddProductModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 my-8 animate-text-in">
              <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-sans">Publish Commodity to Catalog</h3>
                  <p className="text-xs text-slate-500">Commodity will be saved to database and displayed live across storefront.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateProductSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Product Title *</label>
                    <input
                      type="text"
                      required
                      value={productForm.name}
                      onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Pure Turmeric Powder"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#1D61F2]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Botanical Latin Name</label>
                    <input
                      type="text"
                      value={productForm.botanicalName}
                      onChange={(e) => setProductForm(prev => ({ ...prev, botanicalName: e.target.value }))}
                      placeholder="e.g. Curcuma longa"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#1D61F2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Category Group</label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#1D61F2] bg-white"
                    >
                      <option value="Spice Powders">Spice Powders</option>
                      <option value="Vegetable Powders">Vegetable Powders</option>
                      <option value="Herbal & Botanical">Herbal &amp; Botanical</option>
                      <option value="Exotic Fruit">Exotic Fruit</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Mesh Specification</label>
                    <input
                      type="text"
                      value={productForm.meshSize}
                      onChange={(e) => setProductForm(prev => ({ ...prev, meshSize: e.target.value }))}
                      placeholder="e.g. 80-100 Mesh Ultra-Fine"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#1D61F2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={productForm.description}
                    onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Short description of processing, aroma, and export standard."
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#1D61F2]"
                  />
                </div>

                {/* Image Upload with Cloudinary Support */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="font-semibold text-slate-800 block mb-1.5 flex items-center justify-between">
                    <span>Commodity Image *</span>
                    {isUploading && (
                      <span className="text-blue-600 font-semibold animate-pulse flex items-center gap-1 text-[11px]">
                        <Upload className="w-3 h-3" /> Uploading to CDN...
                      </span>
                    )}
                  </label>

                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <div className="h-24 w-32 rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 relative">
                      {imagePreview || productForm.image ? (
                        <img
                          src={imagePreview || productForm.image}
                          alt="Product preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-2 text-slate-400">
                          <ImageIcon className="w-5 h-5 mx-auto mb-1 text-slate-300" />
                          <span className="text-[9px] block">No image</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 w-full space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <label className="cursor-pointer inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors border border-slate-200 shadow-2xs">
                          <Upload className="w-3 h-3 text-[#1D61F2]" />
                          <span>Choose File</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileChange}
                            className="hidden"
                          />
                        </label>

                        <span className="text-[10px] text-slate-400">
                          {systemHealth?.cloudinary?.configured ? (
                            <span className="text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                              Cloudinary CDN Auto-Optimizer
                            </span>
                          ) : (
                            <span className="text-slate-500">Local Media Storage</span>
                          )}
                        </span>
                      </div>

                      {/* Quick Presets */}
                      <div>
                        <span className="text-[10px] text-slate-500 block mb-1">Or choose library preset:</span>
                        <div className="flex flex-wrap gap-1">
                          {[
                            { name: 'Turmeric', path: '/images/powders/turmeric-powder.jpg' },
                            { name: 'Spinach', path: '/images/powders/spinach-powder.jpg' },
                            { name: 'Green Chilli', path: '/images/powders/green-chilli-powder.jpg' },
                            { name: 'Jackfruit', path: '/images/powders/jackfruit-powder.jpg' },
                            { name: 'Garlic', path: '/images/powders/garlic-powder.jpg' },
                            { name: 'Beetroot', path: '/images/powders/beetroot-powder.jpg' }
                          ].map(preset => (
                            <button
                              key={preset.name}
                              type="button"
                              onClick={() => {
                                setProductForm(prev => ({ ...prev, image: preset.path }));
                                setImagePreview(preset.path);
                              }}
                              className={`text-[9px] px-2 py-0.5 rounded border font-medium ${
                                productForm.image === preset.path
                                  ? 'bg-[#1D61F2] text-white border-[#1D61F2]'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {preset.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddProductModalOpen(false)}
                    className="h-8 px-3 rounded-lg border border-slate-200 text-slate-700 font-medium text-xs hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-8 px-4 rounded-lg bg-[#1D61F2] hover:bg-blue-600 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    Save &amp; Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* MODAL: INQUIRY DETAILS (SHADCN DIALOG)                          */}
        {/* ============================================================== */}
        {selectedLeadForDetail && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 font-sans animate-text-in">
              <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                    {selectedLeadForDetail.id}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{selectedLeadForDetail.company}</h3>
                </div>
                <button
                  onClick={() => setSelectedLeadForDetail(null)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Buyer</span>
                    <strong>{selectedLeadForDetail.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Destination</span>
                    <strong>{selectedLeadForDetail.country}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Email</span>
                    <a href={`mailto:${selectedLeadForDetail.email}`} className="text-blue-600 underline">
                      {selectedLeadForDetail.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Phone</span>
                    <strong>{selectedLeadForDetail.phone}</strong>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                  <div><strong>Commodity:</strong> {selectedLeadForDetail.product} ({selectedLeadForDetail.powderForm})</div>
                  <div><strong>Volume:</strong> {selectedLeadForDetail.quantity}</div>
                  <div><strong>Application:</strong> {selectedLeadForDetail.intendedUse}</div>
                  <div><strong>Notes:</strong> {selectedLeadForDetail.notes}</div>
                </div>

                <div className="pt-2">
                  <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Update Status:</label>
                  <div className="flex flex-wrap gap-1">
                    {pipelineStatuses.map(s => (
                      <button
                        key={s.id}
                        onClick={() => {
                          updateLeadStatus(selectedLeadForDetail.id, s.id);
                          setSelectedLeadForDetail(prev => ({ ...prev, status: s.id }));
                        }}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-all ${
                          selectedLeadForDetail.status === s.id
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {s.id}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleConvertLeadToQuote(selectedLeadForDetail)}
                  className="h-8 px-3 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-2xs transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Generate Official Quote</span>
                </button>

                <button
                  onClick={() => setSelectedLeadForDetail(null)}
                  className="h-8 px-3 rounded-lg bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
