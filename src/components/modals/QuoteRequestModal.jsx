import React, { useEffect, useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { useProducts } from '../../context/ProductContext';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  FileText,
  Mail,
  MapPin,
  Package,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  User,
  X
} from 'lucide-react';

const CUSTOM_PRODUCT = 'Custom blend or another ingredient';
const steps = [
  { id: 1, name: 'Product Brief', desc: 'Ingredient & Volume' },
  { id: 2, name: 'Use & Destination', desc: 'Application & Port' },
  { id: 3, name: 'Your Details', desc: 'Contact & Company' }
];

const labelClass = 'block text-xs font-semibold text-stone-800 tracking-normal mb-1.5 font-["Poppins"]';
const inputClass =
  'w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-900 placeholder:text-stone-400 shadow-2xs transition-all duration-200 hover:border-stone-300 focus:border-[#0B3B24] focus:outline-none focus:ring-3 focus:ring-[#0B3B24]/10 font-["Poppins"]';

const initialFormData = {
  product: '',
  customProduct: '',
  quantity: 'Not decided',
  packaging: 'Need guidance',
  intendedUse: '',
  country: '',
  destinationPort: '',
  complianceNeeds: [],
  message: '',
  fullName: '',
  jobTitle: '',
  company: '',
  email: '',
  phone: ''
};

export default function QuoteRequestModal() {
  const { activeLeadModal, selectedProductForQuote, closeModal, addLead, openQuoteModal } = useLeads();
  const { products } = useProducts();
  const isOpen = activeLeadModal === 'quote' || activeLeadModal === 'sample';
  const isSample = activeLeadModal === 'sample';
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdLead, setCreatedLead] = useState(null);
  const [validationMessage, setValidationMessage] = useState('');
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const handleOpenQuote = (event) => openQuoteModal(event.detail || null);
    document.addEventListener('openQuoteModal', handleOpenQuote);
    return () => document.removeEventListener('openQuoteModal', handleOpenQuote);
  }, [openQuoteModal]);

  useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setIsSubmitted(false);
    setCreatedLead(null);
    setValidationMessage('');
    setFormData({
      ...initialFormData,
      product: selectedProductForQuote?.name || ''
    });
  }, [activeLeadModal, isOpen, selectedProductForQuote]);

  if (!isOpen) return null;

  const chosenProduct = products.find((product) => product.name === formData.product);
  const productName =
    formData.product === CUSTOM_PRODUCT
      ? formData.customProduct.trim() || CUSTOM_PRODUCT
      : formData.product;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
      ...(name === 'product' && value === CUSTOM_PRODUCT ? { customProduct: '' } : {})
    }));
    setValidationMessage('');
  };

  const handleCheckbox = (option) => {
    setValidationMessage('');
    setFormData((previous) => {
      const exists = previous.complianceNeeds.includes(option);
      return {
        ...previous,
        complianceNeeds: exists
          ? previous.complianceNeeds.filter((item) => item !== option)
          : [...previous.complianceNeeds, option]
      };
    });
  };

  const handleContinue = () => {
    if (step === 1 && (!formData.product || (formData.product === CUSTOM_PRODUCT && !formData.customProduct.trim()))) {
      setValidationMessage('Please select an ingredient or describe your custom product idea.');
      return;
    }
    if (step === 2 && !formData.country) {
      setValidationMessage('Please select the destination country or choose Other.');
      return;
    }
    setValidationMessage('');
    setStep((currentStep) => currentStep + 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newLead = await addLead({
      fullName: formData.fullName,
      jobTitle: formData.jobTitle,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      product: productName,
      powderForm: 'To be discussed',
      quantity: isSample ? 'Sample availability and quantity to be confirmed' : formData.quantity,
      packaging: formData.packaging,
      targetDate: 'To be discussed',
      intendedUse: formData.intendedUse || 'To be discussed',
      type: isSample ? 'Sample Request' : 'Commercial Quote',
      notes: [
        `Destination details: ${formData.destinationPort || 'Not provided'}.`,
        `Quality documents or tests to discuss: ${formData.complianceNeeds.join(', ') || 'None specified'}.`,
        `Additional message: ${formData.message || 'None'}.`
      ].join(' ')
    });
    setCreatedLead(newLead);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setStep(1);
    setIsSubmitted(false);
    setCreatedLead(null);
    setValidationMessage('');
    setFormData(initialFormData);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-stone-950/75 p-3 sm:p-6 backdrop-blur-md font-['Poppins']">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-stone-200/80 bg-white shadow-2xl transition-all"
        onClick={(event) => event.stopPropagation()}
      >
        {/* ======================================================== */}
        {/* MODAL HEADER: Deep Forest Green & Refined Gold Accents  */}
        {/* ======================================================== */}
        <header className="flex items-start justify-between gap-4 bg-gradient-to-r from-[#0B3B24] via-[#0E442B] to-[#124E32] px-6 py-6 sm:px-8 sm:py-7 text-white">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#D5AA37]/20 border border-[#D5AA37]/40 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#F2D788]">
              <Sparkles className="h-3 w-3 text-[#F2D788]" />
              <span>{isSample ? 'Product Sample Request' : 'Commercial Product Inquiry'}</span>
            </div>
            <h2 id="inquiry-title" className="mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {isSample ? 'Request Laboratory & Commercial Samples' : 'Tell Us What You Want To Make'}
            </h2>
            <p className="mt-1.5 max-w-2xl text-xs sm:text-sm leading-relaxed text-emerald-100/80 font-normal">
              Share what you know. Our food technologists and export desk will review your technical specifications, COA requirements, and FOB/CIF schedules.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close inquiry form"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/20 bg-white/5 text-white/80 transition-colors hover:bg-white/20 hover:text-white cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* ======================================================== */}
        {/* SUBMITTED CONFIRMATION STATE                            */}
        {/* ======================================================== */}
        {isSubmitted ? (
          <div role="status" className="overflow-y-auto p-6 text-center sm:p-12">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-[#0B3B24] ring-8 ring-emerald-50/50">
              <CheckCircle2 className="h-9 w-9 text-[#0B3B24]" />
            </div>
            <span className="mt-5 inline-block text-[11px] font-bold uppercase tracking-wider text-[#B58A27]">
              Inquiry Logged Successfully
            </span>
            <h3 className="mt-1 text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Thank you, {formData.fullName}!
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-stone-600">
              Your inquiry for <strong className="font-semibold text-stone-900">{productName}</strong> has been assigned tracking reference <strong className="font-semibold text-[#0B3B24]">#{createdLead?.id || 'NV-INQ'}</strong>. Our export desk will respond within 24 business hours.
            </p>

            <div className="mx-auto mt-8 max-w-lg rounded-2xl border border-stone-200 bg-[#FAF9F5] p-5 text-left text-xs">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-3">Inquiry Summary</h4>
              {[
                ['Selected Ingredient', productName],
                ['Volume Requirement', isSample ? 'Lab Evaluation Sample' : formData.quantity],
                ['Destination', `${formData.country}${formData.destinationPort ? ` · ${formData.destinationPort}` : ''}`],
                ['Company', formData.company || 'Not specified'],
                ['Contact Email', formData.email]
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 border-b border-stone-200/80 py-2.5 last:border-0">
                  <span className="text-stone-500 font-medium">{label}</span>
                  <span className="text-right font-semibold text-stone-900">{value}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#0B3B24] px-8 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#144d32] cursor-pointer"
            >
              Done &amp; Return to Storefront
            </button>
          </div>
        ) : (
          /* ======================================================== */
          /* ACTIVE MULTI-STEP INQUIRY FORM                          */
          /* ======================================================== */
          <form onSubmit={handleSubmit} className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1fr_310px]">
            <div className="min-w-0 p-5 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Modern Step Progress Indicator */}
                <nav aria-label="Inquiry steps" className="mb-8 border-b border-stone-200 pb-5">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    {steps.map((s) => {
                      const isCurrent = step === s.id;
                      const isComplete = step > s.id;
                      return (
                        <div
                          key={s.id}
                          className={`flex items-center gap-3 p-2 rounded-xl transition-all ${
                            isCurrent
                              ? 'bg-stone-50 border border-stone-200'
                              : 'border border-transparent'
                          }`}
                        >
                          <span
                            className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-bold transition-all ${
                              isCurrent
                                ? 'bg-[#0B3B24] text-white shadow-xs'
                                : isComplete
                                ? 'bg-[#D5AA37] text-stone-950 font-bold'
                                : 'bg-stone-100 text-stone-400 border border-stone-200'
                            }`}
                          >
                            {isComplete ? <Check className="h-4 w-4 stroke-[3]" /> : `0${s.id}`}
                          </span>
                          <div className="hidden sm:block min-w-0">
                            <span
                              className={`block text-[11px] font-bold uppercase tracking-wider truncate ${
                                isCurrent ? 'text-stone-900' : isComplete ? 'text-stone-700' : 'text-stone-400'
                              }`}
                            >
                              {s.name}
                            </span>
                            <span className="block text-[10px] text-stone-500 truncate font-normal">
                              {s.desc}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </nav>

                {/* ---------------------------------------------------- */}
                {/* STEP 1: PRODUCT BRIEF                                */}
                {/* ---------------------------------------------------- */}
                {step === 1 && (
                  <section aria-labelledby="brief-step-title" className="space-y-6 animate-fadeIn">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#B58A27]">
                        Step 01 / Product Brief
                      </span>
                      <h3 id="brief-step-title" className="mt-1 text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                        What ingredient are you looking for?
                      </h3>
                      <p className="mt-1 text-xs text-stone-500">
                        Select from our commercial catalog or specify a proprietary custom dehydrated formulation.
                      </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="sm:col-span-2 block">
                        <span className={labelClass}>Ingredient or Concept *</span>
                        <select
                          name="product"
                          value={formData.product}
                          onChange={handleChange}
                          required
                          className={`${inputClass} cursor-pointer`}
                        >
                          <option value="">Choose an ingredient from our catalog</option>
                          {products.map((product) => (
                            <option key={product.id} value={product.name}>
                              {product.name} — {product.category}
                            </option>
                          ))}
                          <option value={CUSTOM_PRODUCT}>+ Custom blend or proprietary ingredient</option>
                        </select>
                      </label>

                      {formData.product === CUSTOM_PRODUCT && (
                        <label className="sm:col-span-2 block animate-fadeIn">
                          <span className={labelClass}>Describe Your Product Concept *</span>
                          <input
                            name="customProduct"
                            type="text"
                            required
                            value={formData.customProduct}
                            onChange={handleChange}
                            placeholder="e.g. 70 Mesh Dehydrated Tomato Powder with Low Moisture"
                            className={inputClass}
                          />
                        </label>
                      )}

                      <label className="block">
                        <span className={labelClass}>Estimated Order Volume</span>
                        <select
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          className={`${inputClass} cursor-pointer`}
                        >
                          <option>Not decided</option>
                          <option>Under 250 kg (Trial Batch)</option>
                          <option>250–500 kg (Commercial Pilot)</option>
                          <option>500 kg–1 MT (Full Batch)</option>
                          <option>1–5 MT (Multi-Pallet Supply)</option>
                          <option>Over 5 MT (FCL Container)</option>
                        </select>
                      </label>

                      <label className="block">
                        <span className={labelClass}>Packaging Preference</span>
                        <select
                          name="packaging"
                          value={formData.packaging}
                          onChange={handleChange}
                          className={`${inputClass} cursor-pointer`}
                        >
                          <option>Need guidance</option>
                          <option>Bulk Packaging (20-25 kg Multi-wall Kraft + Poly Liner)</option>
                          <option>Private Label / Retail Pouches (100g - 1kg)</option>
                          <option>Aseptic Drums / Custom Liners</option>
                          <option>Other / Discuss with export desk</option>
                        </select>
                      </label>
                    </div>

                    {/* Guidance Card */}
                    <div className="flex items-start gap-3 rounded-xl border border-amber-200/80 bg-amber-50/70 p-4 text-xs leading-relaxed text-amber-900">
                      <Sparkles className="h-4 w-4 shrink-0 text-[#B58A27] mt-0.5" />
                      <div>
                        <strong className="font-semibold block text-amber-950">Technical Flexibility</strong>
                        No need to finalize mesh size, moisture cutoff or packaging specifications yet. Our technical desk will match your formulation requirements with our processing capabilities.
                      </div>
                    </div>
                  </section>
                )}

                {/* ---------------------------------------------------- */}
                {/* STEP 2: USE & DESTINATION                            */}
                {/* ---------------------------------------------------- */}
                {step === 2 && (
                  <section aria-labelledby="use-step-title" className="space-y-6 animate-fadeIn">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#B58A27]">
                        Step 02 / Application &amp; Destination
                      </span>
                      <h3 id="use-step-title" className="mt-1 text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                        Where and how will it be used?
                      </h3>
                      <p className="mt-1 text-xs text-stone-500">
                        Helps us verify destination import regulations, shelf-life, and transit packaging.
                      </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="sm:col-span-2 block">
                        <span className={labelClass}>Intended Application &amp; End Use</span>
                        <textarea
                          name="intendedUse"
                          rows={3}
                          value={formData.intendedUse}
                          onChange={handleChange}
                          placeholder="e.g. Extruded snack seasoning, functional instant soup mix, herbal tea blend, or nutraceutical capsule"
                          className={`${inputClass} resize-y`}
                        />
                      </label>

                      <label className="block">
                        <span className={labelClass}>Destination Country *</span>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className={`${inputClass} cursor-pointer`}
                        >
                          <option value="">Select destination country</option>
                          <option>India</option>
                          <option>United States</option>
                          <option>Germany</option>
                          <option>United Kingdom</option>
                          <option>United Arab Emirates</option>
                          <option>Canada</option>
                          <option>Australia</option>
                          <option>Netherlands</option>
                          <option>Japan</option>
                          <option>South Korea</option>
                          <option>Singapore</option>
                          <option>France</option>
                          <option>Other</option>
                        </select>
                      </label>

                      <label className="block">
                        <span className={labelClass}>City or Seaport / Airport (Optional)</span>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                          <input
                            name="destinationPort"
                            type="text"
                            value={formData.destinationPort}
                            onChange={handleChange}
                            placeholder="e.g. Rotterdam, Hamburg, Jebel Ali, Nhava Sheva"
                            className={`${inputClass} pl-10`}
                          />
                        </div>
                      </label>
                    </div>

                    {/* Requirements Checkbox Grid */}
                    <div>
                      <span className={labelClass}>Quality &amp; Compliance Documents to Include (Optional)</span>
                      <div className="grid gap-2.5 sm:grid-cols-2 mt-2">
                        {[
                          'Batch Certificate of Analysis (COA)',
                          'Microbiological & Heavy Metals Lab Report',
                          'Steam Sterilization Certificate',
                          'Country of Origin & Export Phytosanitary'
                        ].map((item) => {
                          const isChecked = formData.complianceNeeds.includes(item);
                          return (
                            <label
                              key={item}
                              onClick={() => handleCheckbox(item)}
                              className={`flex items-center gap-3 rounded-xl border p-3.5 transition-all cursor-pointer ${
                                isChecked
                                  ? 'border-[#0B3B24] bg-emerald-50/70 text-[#0B3B24] font-semibold shadow-2xs'
                                  : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50/50'
                              }`}
                            >
                              <div
                                className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-all ${
                                  isChecked
                                    ? 'border-[#0B3B24] bg-[#0B3B24] text-white'
                                    : 'border-stone-300 bg-white'
                                }`}
                              >
                                {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                              </div>
                              <span className="text-xs">{item}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                )}

                {/* ---------------------------------------------------- */}
                {/* STEP 3: YOUR DETAILS                                 */}
                {/* ---------------------------------------------------- */}
                {step === 3 && (
                  <section aria-labelledby="contact-step-title" className="space-y-6 animate-fadeIn">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#B58A27]">
                        Step 03 / Contact &amp; Company
                      </span>
                      <h3 id="contact-step-title" className="mt-1 text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                        Who should our export team follow up with?
                      </h3>
                      <p className="mt-1 text-xs text-stone-500">
                        We will prepare a formal proforma specification and quote addressed to your team.
                      </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className={labelClass}>Your Full Name *</span>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                          <input
                            name="fullName"
                            type="text"
                            autoComplete="name"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="e.g. Henrik Van Der Meer"
                            className={`${inputClass} pl-10`}
                          />
                        </div>
                      </label>

                      <label className="block">
                        <span className={labelClass}>Company or Brand Name *</span>
                        <div className="relative">
                          <Building2 className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                          <input
                            name="company"
                            type="text"
                            autoComplete="organization"
                            required
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="e.g. Nordic Clean Foods BV"
                            className={`${inputClass} pl-10`}
                          />
                        </div>
                      </label>

                      <label className="block">
                        <span className={labelClass}>Corporate Business Email *</span>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                          <input
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="e.g. procurement@company.com"
                            className={`${inputClass} pl-10`}
                          />
                        </div>
                      </label>

                      <label className="block">
                        <span className={labelClass}>Mobile or WhatsApp Number *</span>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                          <input
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Include country code, e.g. +91 / +31"
                            className={`${inputClass} pl-10`}
                          />
                        </div>
                      </label>

                      <label className="sm:col-span-2 block">
                        <span className={labelClass}>Additional Notes or Target Specifications (Optional)</span>
                        <textarea
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Target particle size, bulk density, shelf life requirement, or delivery schedule..."
                          className={`${inputClass} resize-y`}
                        />
                      </label>
                    </div>
                  </section>
                )}

                {/* Validation Banner */}
                {validationMessage && (
                  <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-800 animate-fadeIn">
                    {validationMessage}
                  </div>
                )}
              </div>

              {/* Action Buttons Footer */}
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-stone-200 pt-5">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setValidationMessage('');
                      setStep((currentStep) => currentStep - 1);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-xs font-semibold text-stone-700 transition hover:bg-stone-50 cursor-pointer shadow-2xs"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                ) : (
                  <span />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleContinue}
                    className="inline-flex items-center gap-2.5 rounded-xl bg-[#0B3B24] px-6 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-[#144d32] hover:shadow-md cursor-pointer"
                  >
                    <span>Continue to Step 0{step + 1}</span>
                    <ArrowRight className="h-4 w-4 text-[#D5AA37]" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2.5 rounded-xl bg-[#D5AA37] px-7 py-3 text-xs font-bold text-stone-950 shadow-xs transition hover:bg-[#c29c3a] hover:shadow-md cursor-pointer"
                  >
                    <span>{isSample ? 'Submit Sample Request' : 'Submit Commercial Inquiry'}</span>
                    <Send className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* ======================================================== */}
            {/* RIGHT SIDEBAR: INQUIRY SUMMARY & TRUST CREDENTIALS       */}
            {/* ======================================================== */}
            <aside className="hidden border-l border-stone-200 bg-[#FAF8F5] p-6 lg:flex lg:flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B58A27]">
                  Your Inquiry Summary
                </span>

                {chosenProduct ? (
                  <div className="mt-4 rounded-xl border border-stone-200 bg-white p-3.5 shadow-2xs">
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-stone-100">
                      <img
                        src={chosenProduct.image}
                        alt={chosenProduct.imageAlt || chosenProduct.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="mt-3 inline-block rounded-full bg-stone-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-stone-600">
                      {chosenProduct.category}
                    </span>
                    <h4 className="mt-1 text-sm font-bold text-stone-900 leading-tight">
                      {chosenProduct.name}
                    </h4>
                    <p className="mt-0.5 text-[11px] text-stone-500 italic">
                      {chosenProduct.botanicalName}
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 flex min-h-36 flex-col items-center justify-center rounded-xl border-2 border-dashed border-stone-200 bg-white/70 p-5 text-center">
                    <Package className="h-8 w-8 text-stone-300 mb-2" />
                    <p className="text-xs font-medium text-stone-600">
                      {formData.customProduct.trim() || 'No ingredient selected yet'}
                    </p>
                    <span className="mt-1 text-[10px] text-stone-400">
                      Your chosen item and specs will appear here.
                    </span>
                  </div>
                )}

                {/* What Happens Next Steps */}
                <div className="mt-6 border-t border-stone-200 pt-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-700">
                    What Happens Next
                  </span>
                  <ol className="mt-3 space-y-3.5">
                    {[
                      { num: '01', title: 'Technical Review', text: 'Review ingredient application & mesh size' },
                      { num: '02', title: 'Commercial Proposal', text: 'Confirm volume, packing & FOB/CIF pricing' },
                      { num: '03', title: 'Documentation & COA', text: 'Dispatch lab test reports and dispatch schedule' }
                    ].map((item) => (
                      <li key={item.num} className="flex gap-3 text-xs leading-relaxed text-stone-600">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#0B3B24]/10 text-[10px] font-bold text-[#0B3B24]">
                          {item.num}
                        </span>
                        <div>
                          <strong className="block font-semibold text-stone-800 text-[11px]">{item.title}</strong>
                          <span className="text-[11px] text-stone-500 font-normal">{item.text}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Bottom Credential Badge */}
              <div className="mt-6 rounded-xl border border-stone-200 bg-white p-3.5 shadow-2xs">
                <div className="flex items-start gap-2.5 text-[11px] leading-relaxed text-stone-600">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#0B3B24]" />
                  <div>
                    <strong className="font-semibold text-stone-900 block">Export Ready Facility</strong>
                    FSSAI Central License, steam sterilized &amp; batch traceable with NABL lab COA.
                  </div>
                </div>
              </div>
            </aside>
          </form>
        )}
      </section>
    </div>
  );
}
