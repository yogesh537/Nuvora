import React, { useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { useProducts } from '../../context/ProductContext';
import { X, Download, FileText, CheckCircle2, ShieldCheck, Mail, Building, User } from 'lucide-react';

export default function CatalogueDownloadModal() {
  const { activeLeadModal, closeModal, addLead } = useLeads();
  const { products } = useProducts();
  const isOpen = activeLeadModal === 'catalogue';

  const [downloaded, setDownloaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    industry: 'Food & Beverage'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addLead({
      fullName: formData.name,
      company: formData.company,
      email: formData.email,
      phone: 'Via Catalogue Form',
      country: 'Global Inquiry',
      product: 'Product Overview',
      powderForm: 'All Technologies',
      quantity: 'Catalog Download',
      packaging: 'PDF',
      targetDate: 'Immediate',
      intendedUse: formData.industry,
      type: 'Catalogue Download',
      notes: `Requested Nuvaro Agro product overview. Industry: ${formData.industry}`
    });

    setDownloaded(true);
  };

  const handleDownloadOverview = () => {
    const catalogContent = [
      'NUVARO AGRO — PRODUCT OVERVIEW',
      'FSSAI Facility License No. 10020021008942',
      '',
      'Product-specific details below are indicative. Confirm specifications, test scope and order documents with Nuvaro Agro.',
      '',
      ...products.map((product) => [
        product.name,
        `Botanical name: ${product.botanicalName}`,
        `Category: ${product.category}`,
        `Color: ${product.color}`,
        `Packaging options: ${product.packaging.join(', ')}`,
        ''
      ].join('\n')),
      'Contact: yogesh@nuvaroagro.com | +91 80874 05952'
    ].join('\n');
    const blob = new Blob([catalogContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Nuvaro_Agro_Product_Overview.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#1F4D36] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#C9972B]">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Product Overview</h3>
              <p className="text-xs text-stone-200">Product range and inquiry details (.txt)</p>
            </div>
          </div>
          <button 
            onClick={closeModal}
            className="text-stone-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {downloaded ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-[#1F4D36] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-stone-900">Your overview is ready</h4>
            <p className="text-stone-600 text-sm">
              Download the current product overview. Order-specific specifications and testing documents are confirmed separately.
            </p>
            <div className="pt-2">
              <button
                onClick={handleDownloadOverview}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#C9972B] hover:bg-[#b58622] text-white font-semibold text-sm shadow-md transition-all"
              >
                <Download className="w-4 h-4" /> Download product overview (.txt)
              </button>
            </div>
            <p className="text-xs text-stone-400">
              Your inquiry details have been saved for follow-up.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-xs text-stone-600 leading-relaxed">
              Share your contact details to download the product overview. Specifications and testing scope can be confirmed for each order.
            </p>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Your Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Robert Meyer"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm focus:ring-2 focus:ring-[#1F4D36] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Company Name *
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="e.g. Apex Nutritional Labs"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm focus:ring-2 focus:ring-[#1F4D36] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Work Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="name@company.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm focus:ring-2 focus:ring-[#1F4D36] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Industry Segment
              </label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm focus:ring-2 focus:ring-[#1F4D36] outline-none"
              >
                <option value="Food & Beverage">Food & Beverage Manufacturing</option>
                <option value="Nutraceuticals">Nutraceuticals & Dietary Supplements</option>
                <option value="Bakery & Confectionery">Bakery & Confectionery</option>
                <option value="Baby Food">Baby Food & Infant Nutrition</option>
                <option value="Snacks & Seasonings">Snacks & Seasonings</option>
                <option value="Importer / Distributor">Importer / Bulk Distributor</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1F4D36] hover:bg-[#163a28] text-white font-semibold text-sm shadow-md transition-all"
              >
                <Download className="w-4 h-4" /> Get product overview
              </button>
            </div>

            <div className="flex items-center gap-2 justify-center text-[11px] text-stone-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Contact details are used to follow up on your inquiry.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
