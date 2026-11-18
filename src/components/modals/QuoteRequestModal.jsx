import React, { useState, useEffect } from 'react';
import { useLeads } from '../../context/LeadContext';
import { products } from '../../data/products';
import { X, CheckCircle2, ChevronRight, ChevronLeft, Building2, Package, Globe, ShieldCheck, Mail, Phone, User, FileText, Send } from 'lucide-react';

export default function QuoteRequestModal() {
  const { activeLeadModal, selectedProductForQuote, closeModal, addLead } = useLeads();
  const isOpen = activeLeadModal === 'quote' || activeLeadModal === 'sample';
  const isSample = activeLeadModal === 'sample';

  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdLead, setCreatedLead] = useState(null);

  const [formData, setFormData] = useState({
    product: '',
    powderForm: 'Spray dried',
    meshSize: '80 Mesh',
    quantity: '1,000 kg (1 MT)',
    packaging: '25kg Fibre Drum',
    targetDate: 'Within 30 Days',
    fullName: '',
    jobTitle: '',
    company: '',
    email: '',
    phone: '',
    country: 'United States',
    destinationPort: '',
    intendedUse: 'Food & Beverage Manufacturing',
    complianceNeeds: ['COA with Batch', 'ISO 22000 Certified'],
    message: ''
  });

  useEffect(() => {
    if (selectedProductForQuote) {
      setFormData(prev => ({
        ...prev,
        product: selectedProductForQuote.name,
        powderForm: selectedProductForQuote.process,
        meshSize: selectedProductForQuote.meshSize,
        quantity: isSample ? '100g Sample' : `${selectedProductForQuote.moq} (Standard MOQ)`
      }));
    } else if (products.length > 0 && !formData.product) {
      setFormData(prev => ({
        ...prev,
        product: products[0].name,
        powderForm: products[0].process
      }));
    }
  }, [selectedProductForQuote, isSample]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (option) => {
    setFormData(prev => {
      const exists = prev.complianceNeeds.includes(option);
      return {
        ...prev,
        complianceNeeds: exists
          ? prev.complianceNeeds.filter(item => item !== option)
          : [...prev.complianceNeeds, option]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLead = addLead({
      fullName: formData.fullName,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      product: formData.product,
      powderForm: formData.powderForm,
      quantity: isSample ? '100g Free Sample' : formData.quantity,
      packaging: formData.packaging,
      targetDate: formData.targetDate,
      intendedUse: formData.intendedUse,
      type: isSample ? 'Sample Request' : 'Commercial Quote',
      notes: `Application: ${formData.intendedUse}. Dest Port: ${formData.destinationPort || 'N/A'}. Certs: ${formData.complianceNeeds.join(', ')}. Msg: ${formData.message}`
    });

    setCreatedLead(newLead);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setStep(1);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#1F4D36] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#C9972B] text-white">
                {isSample ? 'Free 100g Lab Trial' : 'B2B Wholesale Inquiry'}
              </span>
              <span className="text-xs text-emerald-200">Export Desk Response &lt; 4h</span>
            </div>
            <h3 className="text-xl font-bold font-sans mt-1">
              {isSample ? 'Request a Free Product Sample' : 'Request Official CIF / FOB Quotation'}
            </h3>
            <p className="text-xs text-stone-200">
              Direct from Nuvaro Agro Pvt Ltd manufacturing facility.
            </p>
          </div>
          <button 
            onClick={handleClose}
            className="text-stone-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        {isSubmitted ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-[#1F4D36] rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <span className="text-xs font-mono bg-stone-100 text-stone-600 px-3 py-1 rounded-full border border-stone-200">
                Inquiry ID: {createdLead?.id}
              </span>
              <h4 className="text-2xl font-bold text-stone-900 mt-3">
                {isSample ? 'Sample Request Logged!' : 'Quotation Request Received!'}
              </h4>
              <p className="text-stone-600 text-sm max-w-md mx-auto mt-2 leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong> from <strong>{formData.company}</strong>. Our international export team will review your specifications for <strong>{formData.product}</strong> and email the official documentation to <strong>{formData.email}</strong> shortly.
              </p>
            </div>

            <div className="bg-[#F5F1E6] rounded-xl p-4 text-left border border-amber-200/60 max-w-lg mx-auto text-xs space-y-2 text-stone-700">
              <div className="flex justify-between border-b border-stone-200/70 pb-1.5">
                <span className="text-stone-500">Target Product:</span>
                <span className="font-semibold text-stone-900">{formData.product} ({formData.powderForm})</span>
              </div>
              <div className="flex justify-between border-b border-stone-200/70 pb-1.5">
                <span className="text-stone-500">Quantity / Packing:</span>
                <span className="font-semibold text-stone-900">{isSample ? '100g Vacuum Pouch' : formData.quantity}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200/70 pb-1.5">
                <span className="text-stone-500">Destination:</span>
                <span className="font-semibold text-stone-900">{formData.country} {formData.destinationPort ? `(${formData.destinationPort})` : ''}</span>
              </div>
              <div className="flex justify-between pt-0.5">
                <span className="text-stone-500">Estimated SLA:</span>
                <span className="font-semibold text-[#1F4D36]">Formal Proforma & COA sent within 4 hours</span>
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-lg bg-[#1F4D36] text-white hover:bg-[#163a28] font-medium text-sm transition-colors"
              >
                Close & Return to Browsing
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-6 border-b border-stone-100 pb-4">
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 1 ? 'bg-[#1F4D36] text-white' : 'bg-emerald-100 text-[#1F4D36]'
                }`}>1</span>
                <span className={`text-xs font-medium ${step === 1 ? 'text-[#1F4D36] font-semibold' : 'text-stone-500'}`}>
                  Product & Volume
                </span>
              </div>
              <div className="h-0.5 w-12 bg-stone-200"></div>
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 2 ? 'bg-[#1F4D36] text-white' : step > 2 ? 'bg-emerald-100 text-[#1F4D36]' : 'bg-stone-200 text-stone-600'
                }`}>2</span>
                <span className={`text-xs font-medium ${step === 2 ? 'text-[#1F4D36] font-semibold' : 'text-stone-500'}`}>
                  Company & Delivery
                </span>
              </div>
              <div className="h-0.5 w-12 bg-stone-200"></div>
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 3 ? 'bg-[#1F4D36] text-white' : 'bg-stone-200 text-stone-600'
                }`}>3</span>
                <span className={`text-xs font-medium ${step === 3 ? 'text-[#1F4D36] font-semibold' : 'text-stone-500'}`}>
                  Specs & Message
                </span>
              </div>
            </div>

            {/* STEP 1: Product & Quantity */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Select Powder *
                    </label>
                    <select
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm focus:ring-2 focus:ring-[#1F4D36] focus:border-transparent outline-none"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.name}>
                          {p.name} ({p.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Drying Technology
                    </label>
                    <select
                      name="powderForm"
                      value={formData.powderForm}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm focus:ring-2 focus:ring-[#1F4D36] outline-none"
                    >
                      <option value="Spray dried">Spray Dried (High Solubility)</option>
                      <option value="Air dried">Air Dried (Standard Botanical)</option>
                      <option value="Freeze dried">Freeze Dried (Max Nutrient Retention)</option>
                      <option value="Drum dried">Drum Dried</option>
                      <option value="Custom Blend">Custom Formulation / Blend</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Mesh Size
                    </label>
                    <select
                      name="meshSize"
                      value={formData.meshSize}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm focus:ring-2 focus:ring-[#1F4D36] outline-none"
                    >
                      <option value="60 Mesh">60 Mesh (Granular/Coarse)</option>
                      <option value="80 Mesh">80 Mesh (Standard Powder)</option>
                      <option value="100 Mesh Superfine">100 Mesh (Superfine / Smooth)</option>
                      <option value="Custom Micronized">Custom Micronized (&lt; 150 Mesh)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      {isSample ? 'Sample Request Qty' : 'Estimated Batch Volume *'}
                    </label>
                    {isSample ? (
                      <input
                        type="text"
                        disabled
                        value="100g Free Lab Trial Sample"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 bg-stone-100 text-stone-600 text-sm font-medium"
                      />
                    ) : (
                      <select
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm focus:ring-2 focus:ring-[#1F4D36] outline-none"
                      >
                        <option value="100 - 250 kg">100 - 250 kg (Trial Commercial)</option>
                        <option value="500 kg">500 kg (Half Ton)</option>
                        <option value="1,000 kg (1 MT)">1,000 kg (1 Metric Ton)</option>
                        <option value="5,000 kg (5 MT)">5,000 kg (5 Metric Tons)</option>
                        <option value="10,000 kg (1 FCL / 10 MT)">10,000 kg (Full Container FCL)</option>
                        <option value="Annual Contract (20+ MT)">Annual Supply Contract (20+ MT)</option>
                      </select>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Packaging Type
                    </label>
                    <select
                      name="packaging"
                      value={formData.packaging}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm focus:ring-2 focus:ring-[#1F4D36] outline-none"
                    >
                      <option value="25kg Fibre Drum">25kg Fibre Drum (Export Standard)</option>
                      <option value="25kg Multi-wall Paper Bag">25kg Kraft Paper Bag with PE Liner</option>
                      <option value="10kg Poly-lined Carton">10kg Carton with Inner Liner</option>
                      <option value="5kg Aluminium Foil Bag">5kg Foil Pouch (Moisture-proof)</option>
                      <option value="Private Label Packaging">Private Label Retail Jars / Pouches</option>
                    </select>
                  </div>
                </div>

                <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-3 flex items-start gap-3 text-xs text-stone-700 mt-2">
                  <ShieldCheck className="w-5 h-5 text-[#1F4D36] shrink-0 mt-0.5" />
                  <p>
                    Every commercial shipment from <strong>Nuvaro Agro Pvt Ltd</strong> is shipped with batch-specific Certificate of Analysis (COA), Phytosanitary certificate, and guaranteed heavy metal and microbiological compliance.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 2: Company & Destination */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Michael Harris"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm focus:ring-2 focus:ring-[#1F4D36] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Job Title / Designation
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      placeholder="e.g. Procurement Manager / R&D Director"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm focus:ring-2 focus:ring-[#1F4D36] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Company Name *
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Botanica Foods Ltd"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm focus:ring-2 focus:ring-[#1F4D36] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Business Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="name@company.com"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm focus:ring-2 focus:ring-[#1F4D36] outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Direct / WhatsApp Phone *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+1 (555) 000-0000"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm focus:ring-2 focus:ring-[#1F4D36] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Country of Import *
                    </label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm focus:ring-2 focus:ring-[#1F4D36] outline-none"
                      >
                        <option value="United States">United States</option>
                        <option value="Germany">Germany</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Japan">Japan</option>
                        <option value="South Korea">South Korea</option>
                        <option value="India">India (Domestic Supply)</option>
                        <option value="Other">Other Global Destination</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Destination Sea/Air Port
                    </label>
                    <input
                      type="text"
                      name="destinationPort"
                      value={formData.destinationPort}
                      onChange={handleChange}
                      placeholder="e.g. Rotterdam / Hamburg / Long Beach"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm focus:ring-2 focus:ring-[#1F4D36] outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Technical requirements & compliance */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Intended Product Application
                  </label>
                  <select
                    name="intendedUse"
                    value={formData.intendedUse}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm focus:ring-2 focus:ring-[#1F4D36] outline-none"
                  >
                    <option value="Nutraceuticals & Dietary Supplements">Nutraceuticals & Dietary Supplements (Capsules / Tablets)</option>
                    <option value="Functional Beverages & Instant Drinks">Functional Beverages & Instant Drink Mixes</option>
                    <option value="Bakery, Confectionery & Pastry">Bakery, Confectionery & Pastry Glazes</option>
                    <option value="Snacks, Seasonings & Dry Rubs">Snacks, Seasonings & Dry Rubs</option>
                    <option value="Infant Nutrition & Baby Foods">Infant Nutrition & Baby Foods</option>
                    <option value="Pet Food & Animal Wellness">Pet Food & Animal Wellness</option>
                    <option value="Cosmetics & Natural Skincare">Cosmetics & Natural Skincare</option>
                    <option value="Private Label Repackaging">Private Label Repackaging for Retail</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                    Required Quality Certifications & Documents
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                    {[
                      'COA with Batch',
                      'Technical Data Sheet (TDS)',
                      'Material Safety Data (MSDS)',
                      'ISO 22000 Certified',
                      'HACCP Certificate',
                      'Halal Certified',
                      'Kosher Pareve',
                      'Organic NPOP/NOP',
                      'Heavy Metal / Pesticide Test'
                    ].map((item) => (
                      <label key={item} className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer bg-stone-50 p-2 rounded-lg border border-stone-200 hover:bg-stone-100">
                        <input
                          type="checkbox"
                          checked={formData.complianceNeeds.includes(item)}
                          onChange={() => handleCheckbox(item)}
                          className="rounded text-[#1F4D36] focus:ring-[#1F4D36]"
                        />
                        <span className="truncate">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Custom Specifications / Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={2}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter any specific bulk density requirements, moisture ceilings, target CIF pricing, or sample delivery address..."
                    className="w-full px-3.5 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm focus:ring-2 focus:ring-[#1F4D36] outline-none"
                  ></textarea>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between border-t border-stone-200 mt-6 pt-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (step === 2 && (!formData.fullName || !formData.company || !formData.email || !formData.phone)) {
                      alert('Please complete your name, company, email and phone to proceed.');
                      return;
                    }
                    setStep(step + 1);
                  }}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#1F4D36] hover:bg-[#163a28] transition-colors"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#C9972B] hover:bg-[#b58622] shadow-md hover:shadow-lg transition-all"
                >
                  <Send className="w-4 h-4" />
                  {isSample ? 'Submit Sample Request' : 'Submit Commercial Quote Request'}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
