import React, { useState } from 'react';
import { useLeads } from '../context/LeadContext';
import { products as initialProducts } from '../data/products';
import { 
  Lock, 
  UserCheck, 
  Kanban, 
  FileSpreadsheet, 
  FileText, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Globe2, 
  Search, 
  Printer, 
  Download, 
  Filter, 
  ChevronRight,
  ShieldCheck,
  Building,
  DollarSign,
  Package
} from 'lucide-react';

export default function AdminPortalPage() {
  const { leads, updateLeadStatus, deleteLead, addLead } = useLeads();
  const [activeTab, setActiveTab] = useState('pipeline'); // 'pipeline' | 'table' | 'quote-builder' | 'products' | 'analytics'
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState(null);
  const [leadSearch, setLeadSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Quotation Builder State
  const [quoteBuilder, setQuoteBuilder] = useState({
    quoteNumber: `NV-QT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    quoteDate: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    buyerName: 'Henrik Van Der Meer',
    buyerCompany: 'Nordic Clean Foods BV',
    buyerEmail: 'h.vandermeer@nordiccleanfoods.nl',
    buyerCountry: 'Rotterdam, Netherlands',
    incoterm: 'CIF Rotterdam Port',
    currency: 'USD',
    paymentTerms: '30% Advance T/T, 70% against Bill of Lading (B/L)',
    lineItems: [
      { product: 'Spinach Powder (Air dried, 80 Mesh)', qty: 5000, unit: 'kg', unitPrice: 4.80 },
      { product: 'Beetroot Powder (Spray dried, 80 Mesh)', qty: 2500, unit: 'kg', unitPrice: 5.40 }
    ],
    notes: 'Packaging: 25kg fibre drums with inner liners. FSSAI facility license available; additional documents are confirmed for each order.'
  });

  const [activeQuotePreview, setActiveQuotePreview] = useState(false);

  // Status Pipeline config
  const pipelineStatuses = [
    { id: 'New', label: 'New Inquiries', color: 'bg-blue-500' },
    { id: 'Contacted', label: 'Contacted / Sample Dispatched', color: 'bg-amber-500' },
    { id: 'Quoted', label: 'Quotation Sent (Proforma)', color: 'bg-purple-500' },
    { id: 'Won', label: 'Won / Contract Executed', color: 'bg-emerald-600' },
    { id: 'Lost', label: 'Lost / Closed', color: 'bg-stone-400' }
  ];

  // Lead filtering
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.fullName.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.company.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.product.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.country.toLowerCase().includes(leadSearch.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Quotation math
  const calculateTotal = () => {
    return quoteBuilder.lineItems.reduce((acc, item) => acc + (item.qty * item.unitPrice), 0);
  };

  const addLineItem = () => {
    setQuoteBuilder(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, { product: 'Moringa Leaf Powder (100 Mesh)', qty: 1000, unit: 'kg', unitPrice: 6.20 }]
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

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Admin Header & Security Banner */}
        <div className="bg-[#1F4D36] text-white rounded-3xl p-6 sm:p-8 shadow-card mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C9972B] text-white flex items-center justify-center shadow-sm">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold font-sans">Nuvaro Agro &bull; B2B Commercial Operations</h1>
                  <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                    Export Desk
                  </span>
                </div>
                <p className="text-xs text-stone-200 mt-0.5">
                  Lead pipeline management, international inquiries, official PDF proforma quotations, and product catalog controls.
                </p>
              </div>
            </div>

            {/* Admin User / Mode Pill */}
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-xs border border-white/10">
              <UserCheck className="w-4 h-4 text-[#C9972B]" />
              <div>
                <span className="text-stone-300 block text-[10px]">Logged in as:</span>
                <span className="font-bold text-white">VP Global Sourcing (Admin)</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Strip inside header */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-800/80">
            <div className="bg-white/10 p-3 rounded-xl">
              <span className="text-stone-300 text-[10px] uppercase font-bold">Total Inquiries</span>
              <div className="text-xl font-extrabold text-white">{leads.length}</div>
            </div>
            <div className="bg-white/10 p-3 rounded-xl">
              <span className="text-stone-300 text-[10px] uppercase font-bold">New & Pending</span>
              <div className="text-xl font-extrabold text-[#C9972B]">
                {leads.filter(l => l.status === 'New').length}
              </div>
            </div>
            <div className="bg-white/10 p-3 rounded-xl">
              <span className="text-stone-300 text-[10px] uppercase font-bold">Contracts Won</span>
              <div className="text-xl font-extrabold text-emerald-300">
                {leads.filter(l => l.status === 'Won').length}
              </div>
            </div>
            <div className="bg-white/10 p-3 rounded-xl">
              <span className="text-stone-300 text-[10px] uppercase font-bold">Quotation Pipeline</span>
              <div className="text-xl font-extrabold text-white">
                ${leads.filter(l => l.status === 'Quoted' || l.status === 'Won').length * 38},500
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto bg-white p-2 rounded-2xl border border-stone-200 shadow-sm mb-8">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'pipeline'
                ? 'bg-[#1F4D36] text-white shadow-sm'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Kanban className="w-4 h-4" />
            <span>Lead Kanban Pipeline</span>
          </button>

          <button
            onClick={() => setActiveTab('table')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'table'
                ? 'bg-[#1F4D36] text-white shadow-sm'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Inquiry Master Table ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('quote-builder')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'quote-builder'
                ? 'bg-[#1F4D36] text-white shadow-sm'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Printer className="w-4 h-4 text-[#C9972B]" />
            <span>PDF Quotation Generator</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'analytics'
                ? 'bg-[#1F4D36] text-white shadow-sm'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Export Analytics</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: KANBAN LEAD PIPELINE */}
        {/* ============================================================== */}
        {activeTab === 'pipeline' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <h2 className="text-lg font-bold text-stone-900">
                International Sourcing Inquiries Pipeline
              </h2>
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  placeholder="Search buyer, company, country..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-stone-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1F4D36]"
                />
              </div>
            </div>

            {/* Kanban Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
              {pipelineStatuses.map((statusObj) => {
                const columnLeads = filteredLeads.filter(l => l.status === statusObj.id);

                return (
                  <div 
                    key={statusObj.id}
                    className="bg-stone-100/80 rounded-2xl p-3 border border-stone-200/90 flex flex-col min-w-[240px]"
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-200">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${statusObj.color}`}></span>
                        <h3 className="font-bold text-xs text-stone-800">{statusObj.id}</h3>
                      </div>
                      <span className="text-[11px] font-mono font-bold bg-white text-stone-600 px-2 py-0.5 rounded-full border border-stone-200">
                        {columnLeads.length}
                      </span>
                    </div>

                    {/* Column Cards */}
                    <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px]">
                      {columnLeads.length === 0 ? (
                        <div className="text-center py-8 text-stone-400 text-xs italic">
                          No leads in {statusObj.id}
                        </div>
                      ) : (
                        columnLeads.map((lead) => (
                          <div
                            key={lead.id}
                            onClick={() => setSelectedLeadForDetail(lead)}
                            className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-2xs hover:shadow-card cursor-pointer transition-all hover:border-[#1F4D36]/50 space-y-2 group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                                {lead.id}
                              </span>
                              <span className="text-[10px] text-stone-400">
                                {new Date(lead.createdAt).toLocaleDateString()}
                              </span>
                            </div>

                            <div>
                              <h4 className="font-bold text-xs text-stone-900 group-hover:text-[#1F4D36] transition-colors">
                                {lead.fullName}
                              </h4>
                              <p className="text-[11px] font-medium text-stone-600 truncate">
                                {lead.company} &bull; {lead.country}
                              </p>
                            </div>

                            <div className="bg-[#F5F1E6]/60 p-2 rounded-lg text-[11px] text-stone-700">
                              <div className="font-semibold text-[#1F4D36] truncate">{lead.product}</div>
                              <div className="text-stone-500 text-[10px]">{lead.quantity} ({lead.powderForm})</div>
                            </div>

                            {/* Quick Status Dropdown */}
                            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px]" onClick={e => e.stopPropagation()}>
                              <span className="text-stone-400 font-medium">Stage:</span>
                              <select
                                value={lead.status}
                                onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                className="font-semibold text-stone-700 bg-stone-50 border border-stone-200 rounded px-1.5 py-0.5 outline-none"
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
        {/* TAB 2: INQUIRY MASTER TABLE */}
        {/* ============================================================== */}
        {activeTab === 'table' && (
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-card space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <h2 className="text-base font-bold text-stone-900">
                All Recorded Commercial Leads & Inquiries
              </h2>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Quoted">Quoted</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>

                <div className="relative flex-1 sm:w-64">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    placeholder="Search leads..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-stone-200 text-xs outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-stone-50 font-semibold text-stone-600 border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-3">Lead Ref</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Buyer & Company</th>
                    <th className="py-3 px-3">Country</th>
                    <th className="py-3 px-3">Product Inquired</th>
                    <th className="py-3 px-3">Volume</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-[#1F4D36]">
                        {lead.id}
                      </td>
                      <td className="py-3 px-3 text-stone-500">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-stone-900">{lead.fullName}</div>
                        <div className="text-[11px] text-stone-500">{lead.company} &bull; {lead.email}</div>
                      </td>
                      <td className="py-3 px-3 font-medium">{lead.country}</td>
                      <td className="py-3 px-3 font-semibold text-stone-800">{lead.product}</td>
                      <td className="py-3 px-3 font-medium">{lead.quantity}</td>
                      <td className="py-3 px-3">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className="px-2 py-1 rounded border border-stone-200 text-[11px] font-semibold bg-white outline-none"
                        >
                          {pipelineStatuses.map(s => (
                            <option key={s.id} value={s.id}>{s.id}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedLeadForDetail(lead)}
                            className="p-1 rounded hover:bg-stone-100 text-stone-600 hover:text-[#1F4D36]"
                            title="View Full Lead Details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete inquiry ${lead.id}?`)) deleteLead(lead.id);
                            }}
                            className="p-1 rounded hover:bg-red-50 text-stone-400 hover:text-red-600"
                            title="Delete Lead"
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
        )}

        {/* ============================================================== */}
        {/* TAB 3: PDF QUOTATION GENERATOR */}
        {/* ============================================================== */}
        {activeTab === 'quote-builder' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-card">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
                <div>
                  <h2 className="text-xl font-bold text-[#1F4D36]">Official B2B Export Quotation Builder</h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Generate and print formal CIF/FOB proforma quotations on Nuvaro Agro Pvt Ltd letterhead.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1F4D36] hover:bg-[#163a28] text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <Printer className="w-4 h-4" /> Print / Save as PDF
                  </button>
                </div>
              </div>

              {/* Quotation Editor Inputs */}
              <div className="py-6 space-y-6 print:hidden">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Quote Ref Number</label>
                    <input
                      type="text"
                      value={quoteBuilder.quoteNumber}
                      onChange={(e) => setQuoteBuilder(prev => ({ ...prev, quoteNumber: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Quote Issue Date</label>
                    <input
                      type="date"
                      value={quoteBuilder.quoteDate}
                      onChange={(e) => setQuoteBuilder(prev => ({ ...prev, quoteDate: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Validity (30 Days)</label>
                    <input
                      type="date"
                      value={quoteBuilder.validUntil}
                      onChange={(e) => setQuoteBuilder(prev => ({ ...prev, validUntil: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Incoterms (Delivery)</label>
                    <input
                      type="text"
                      value={quoteBuilder.incoterm}
                      onChange={(e) => setQuoteBuilder(prev => ({ ...prev, incoterm: e.target.value }))}
                      placeholder="e.g. CIF Rotterdam Port"
                      className="w-full px-3 py-2 rounded-lg border border-stone-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Buyer Contact Person</label>
                    <input
                      type="text"
                      value={quoteBuilder.buyerName}
                      onChange={(e) => setQuoteBuilder(prev => ({ ...prev, buyerName: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Buyer Company</label>
                    <input
                      type="text"
                      value={quoteBuilder.buyerCompany}
                      onChange={(e) => setQuoteBuilder(prev => ({ ...prev, buyerCompany: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Buyer Email</label>
                    <input
                      type="email"
                      value={quoteBuilder.buyerEmail}
                      onChange={(e) => setQuoteBuilder(prev => ({ ...prev, buyerEmail: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Country / Destination</label>
                    <input
                      type="text"
                      value={quoteBuilder.buyerCountry}
                      onChange={(e) => setQuoteBuilder(prev => ({ ...prev, buyerCountry: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300"
                    />
                  </div>
                </div>

                {/* Line Items Table Editor */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider text-stone-800">
                      Product Line Items & FOB/CIF Rates
                    </span>
                    <button
                      onClick={addLineItem}
                      className="flex items-center gap-1 text-xs font-bold text-[#1F4D36] hover:text-[#C9972B]"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Product Line
                    </button>
                  </div>

                  <div className="space-y-2">
                    {quoteBuilder.lineItems.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-xs">
                        <div className="col-span-5">
                          <input
                            type="text"
                            value={item.product}
                            onChange={(e) => updateLineItem(idx, 'product', e.target.value)}
                            placeholder="Powder Name & Mesh"
                            className="w-full px-2.5 py-1.5 rounded border border-stone-300 bg-white"
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="number"
                            value={item.qty}
                            onChange={(e) => updateLineItem(idx, 'qty', e.target.value)}
                            placeholder="Quantity"
                            className="w-full px-2.5 py-1.5 rounded border border-stone-300 bg-white font-mono"
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="text"
                            value={item.unit}
                            onChange={(e) => updateLineItem(idx, 'unit', e.target.value)}
                            placeholder="Unit (kg/MT)"
                            className="w-full px-2.5 py-1.5 rounded border border-stone-300 bg-white"
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="number"
                            step="0.05"
                            value={item.unitPrice}
                            onChange={(e) => updateLineItem(idx, 'unitPrice', e.target.value)}
                            placeholder="Price (USD/kg)"
                            className="w-full px-2.5 py-1.5 rounded border border-stone-300 bg-white font-mono font-semibold"
                          />
                        </div>
                        <div className="col-span-1 text-right">
                          <button
                            onClick={() => removeLineItem(idx)}
                            className="p-1 text-stone-400 hover:text-red-600 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* PRINTABLE OFFICIAL LETTERHEAD DOCUMENT PREVIEW */}
              <div 
                className="bg-white border-2 border-stone-300 rounded-2xl p-8 sm:p-12 shadow-sm space-y-8 text-xs text-stone-800"
                id="printable-quotation"
              >
                {/* Official Letterhead Header */}
                <div className="border-b-2 border-[#1F4D36] pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-[#1F4D36] tracking-tight">
                      NUVARO AGRO PVT LTD
                    </h2>
                    <p className="text-[11px] text-stone-600 font-medium">
                      Manufacturers & Exporters of Dehydrated Vegetable, Fruit & Spice Powders
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Plant: Survey No. 48/2, Agro Food Processing Cluster, Pune-Nashik Agri Belt, Maharashtra 410505, India
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Email: exports@nuvaroagro.com | Web: https://nuvaroagro.com | Phone: +91 98200 12345
                    </p>
                    <p className="text-[10px] text-stone-400">
                      FSSAI Facility License No. 10020021008942
                    </p>
                  </div>

                  <div className="text-right bg-stone-50 p-4 rounded-xl border border-stone-200 min-w-[200px]">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Commercial Proforma</span>
                    <span className="text-base font-bold text-[#1F4D36] font-mono block">{quoteBuilder.quoteNumber}</span>
                    <div className="text-[11px] text-stone-600 mt-1">Date: <strong>{quoteBuilder.quoteDate}</strong></div>
                    <div className="text-[11px] text-stone-600">Valid Until: <strong>{quoteBuilder.validUntil}</strong></div>
                  </div>
                </div>

                {/* Buyer & Incoterms Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#F5F1E6]/40 p-4 rounded-xl border border-amber-200/50">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Consignee / Buyer:</span>
                    <div className="font-bold text-sm text-stone-900">{quoteBuilder.buyerCompany}</div>
                    <div className="text-stone-700">Attn: {quoteBuilder.buyerName}</div>
                    <div className="text-stone-600">{quoteBuilder.buyerEmail}</div>
                    <div className="text-stone-600">{quoteBuilder.buyerCountry}</div>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Commercial Delivery Terms:</span>
                    <div className="font-bold text-sm text-emerald-800">{quoteBuilder.incoterm}</div>
                    <div className="text-stone-700">Currency: <strong>{quoteBuilder.currency}</strong></div>
                    <div className="text-stone-600">Port of Loading: <strong>Nhava Sheva (JNPT) / Mundra</strong></div>
                    <div className="text-stone-600">Payment: {quoteBuilder.paymentTerms}</div>
                  </div>
                </div>

                {/* Line Items Table */}
                <div>
                  <table className="w-full text-left border border-stone-300 rounded-xl overflow-hidden">
                    <thead className="bg-[#1F4D36] text-white text-[11px]">
                      <tr>
                        <th className="py-2.5 px-3">#</th>
                        <th className="py-2.5 px-3">Description of Dehydrated Powder</th>
                        <th className="py-2.5 px-3 text-center">Quantity</th>
                        <th className="py-2.5 px-3 text-right">Unit Rate ({quoteBuilder.currency})</th>
                        <th className="py-2.5 px-3 text-right">Total Amount ({quoteBuilder.currency})</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 font-mono text-xs">
                      {quoteBuilder.lineItems.map((item, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                          <td className="py-2.5 px-3 text-stone-500 font-sans">{idx + 1}</td>
                          <td className="py-2.5 px-3 font-sans font-semibold text-stone-900">{item.product}</td>
                          <td className="py-2.5 px-3 text-center">{item.qty.toLocaleString()} {item.unit}</td>
                          <td className="py-2.5 px-3 text-right">${item.unitPrice.toFixed(2)}</td>
                          <td className="py-2.5 px-3 text-right font-bold text-stone-900">
                            ${(item.qty * item.unitPrice).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-stone-100 font-bold border-t-2 border-stone-300">
                      <tr>
                        <td colSpan={4} className="py-3 px-3 text-right uppercase text-stone-700">
                          Total CIF/FOB Contract Value:
                        </td>
                        <td className="py-3 px-3 text-right text-base text-[#1F4D36] font-mono">
                          ${calculateTotal().toLocaleString(undefined, { minimumFractionDigits: 2 })} {quoteBuilder.currency}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Packaging, Bank & Export Terms */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[11px] border-t border-stone-200 pt-6">
                  <div className="space-y-1.5">
                    <span className="font-bold text-stone-900 uppercase tracking-wider block">Packaging & Quality Guarantee:</span>
                    <p className="text-stone-600 leading-relaxed">{quoteBuilder.notes}</p>
                    <p className="text-emerald-800 font-semibold pt-1">
                      &bull; Free from artificial preservatives, artificial colors & chemical fillers.
                    </p>
                  </div>

                  <div className="space-y-1.5 sm:text-right">
                    <span className="font-bold text-stone-900 uppercase tracking-wider block">Authorized Signatory:</span>
                    <div className="font-bold text-sm text-stone-900 pt-4">R. Singhania</div>
                    <div className="text-stone-500">Director of International Exports</div>
                    <div className="font-bold text-[#1F4D36]">Nuvaro Agro Pvt Ltd</div>
                    <div className="text-[10px] text-stone-400 font-mono">Official Corporate Digital Stamp</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: EXPORT ANALYTICS */}
        {/* ============================================================== */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Top Requested Powders */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-card space-y-4">
                <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#C9972B]" />
                  Top Inquired Powders (Last 30 Days)
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Moringa Leaf Powder', percentage: 28, count: '38 MT' },
                    { name: 'Spinach Powder', percentage: 24, count: '32 MT' },
                    { name: 'Beetroot Powder', percentage: 20, count: '26 MT' },
                    { name: 'Alphonso Mango Powder', percentage: 16, count: '21 MT' },
                    { name: 'Dehydrated Garlic & Onion', percentage: 12, count: '16 MT' }
                  ].map((p, i) => (
                    <div key={i} className="space-y-1 text-xs">
                      <div className="flex justify-between font-medium">
                        <span className="text-stone-800">{p.name}</span>
                        <span className="font-mono text-stone-500">{p.count}</span>
                      </div>
                      <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-[#1F4D36] h-2 rounded-full" style={{ width: `${p.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: Geographic Destination */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-card space-y-4">
                <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-[#1F4D36]" />
                  Buyer Regions Distribution
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-stone-50">
                    <span className="font-medium text-stone-800">European Union (Germany, NL, UK)</span>
                    <span className="font-bold text-emerald-800 font-mono">42%</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-stone-50">
                    <span className="font-medium text-stone-800">North America (USA & Canada)</span>
                    <span className="font-bold text-emerald-800 font-mono">31%</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-stone-50">
                    <span className="font-medium text-stone-800">Middle East (UAE, Saudi Arabia)</span>
                    <span className="font-bold text-emerald-800 font-mono">15%</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-stone-50">
                    <span className="font-medium text-stone-800">Asia-Pacific (Japan, South Korea)</span>
                    <span className="font-bold text-emerald-800 font-mono">12%</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Order-specific quality and delivery details */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-card space-y-4">
                <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Order documentation
                </h3>
                <div className="text-center py-4 space-y-2">
                  <div className="text-4xl font-extrabold text-[#1F4D36]">FSSAI</div>
                  <p className="text-xs text-stone-500">Facility license</p>
                </div>
                <div className="text-xs text-stone-600 space-y-1.5 pt-2 border-t border-stone-100">
                  <div className="flex justify-between">
                    <span>Quality scope:</span>
                    <strong className="text-stone-900">Confirmed per order</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Sample availability:</span>
                    <strong className="text-stone-900">By inquiry</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery schedule:</span>
                    <strong className="text-stone-900">Confirmed with quote</strong>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Lead Detail Modal if a lead card was clicked */}
        {selectedLeadForDetail && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4">
              <div className="flex justify-between items-start border-b border-stone-100 pb-3">
                <div>
                  <span className="text-xs font-mono font-bold text-[#1F4D36] bg-emerald-50 px-2 py-0.5 rounded">
                    {selectedLeadForDetail.id}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 mt-1">{selectedLeadForDetail.company}</h3>
                </div>
                <button
                  onClick={() => setSelectedLeadForDetail(null)}
                  className="text-stone-400 hover:text-stone-600 p-1"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-2 text-xs text-stone-700">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Buyer</span>
                    <strong>{selectedLeadForDetail.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Country</span>
                    <strong>{selectedLeadForDetail.country}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Email</span>
                    <a href={`mailto:${selectedLeadForDetail.email}`} className="text-[#1F4D36] underline">
                      {selectedLeadForDetail.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Phone</span>
                    <strong>{selectedLeadForDetail.phone}</strong>
                  </div>
                </div>

                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 mt-2 space-y-1">
                  <div><strong>Inquired Product:</strong> {selectedLeadForDetail.product} ({selectedLeadForDetail.powderForm})</div>
                  <div><strong>Volume:</strong> {selectedLeadForDetail.quantity}</div>
                  <div><strong>Intended Use:</strong> {selectedLeadForDetail.intendedUse}</div>
                  <div><strong>Notes:</strong> {selectedLeadForDetail.notes}</div>
                </div>

                {/* Status Switcher in Modal */}
                <div className="pt-2">
                  <label className="text-[10px] uppercase font-bold text-stone-500 block mb-1">Update Status Stage:</label>
                  <div className="flex flex-wrap gap-1.5">
                    {pipelineStatuses.map(s => (
                      <button
                        key={s.id}
                        onClick={() => {
                          updateLeadStatus(selectedLeadForDetail.id, s.id);
                          setSelectedLeadForDetail(prev => ({ ...prev, status: s.id }));
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                          selectedLeadForDetail.status === s.id
                            ? 'bg-[#1F4D36] text-white border-[#1F4D36]'
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        {s.id}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex justify-end">
                <button
                  onClick={() => setSelectedLeadForDetail(null)}
                  className="px-4 py-2 rounded-lg bg-stone-100 text-stone-700 font-semibold text-xs hover:bg-stone-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
