import React, { useEffect, useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { useProducts } from '../../context/ProductContext';
import { ArrowLeft, ArrowRight, BadgeCheck, Building2, CheckCircle2, Mail, MapPin, Package, Phone, Send, User, X } from 'lucide-react';

const CUSTOM_PRODUCT = 'Custom blend or another ingredient';
const steps = ['Product brief', 'Use & destination', 'Your details'];
const labelClass = 'block text-[9px] font-black uppercase tracking-[0.13em] text-[#657067]';
const inputClass = 'mt-2 w-full border border-[#183126]/20 bg-white px-3.5 py-3 text-sm text-[#183126] outline-none placeholder:text-[#96978f] focus:border-[#9b7a32]';

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
  const productName = formData.product === CUSTOM_PRODUCT
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
      setValidationMessage('Choose an ingredient or describe your product idea to continue.');
      return;
    }
    if (step === 2 && !formData.country) {
      setValidationMessage('Choose the destination country or select Other.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#10231a]/75 p-2 backdrop-blur-md sm:p-5">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
        className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden border border-[#d6d3c8] bg-[#f4f1e8] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-5 bg-[#183126] px-5 py-5 text-white sm:px-8 sm:py-6">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#d4ad49]">
              {isSample ? 'Product sample inquiry' : 'Commercial product inquiry'}
            </p>
            <h2 id="inquiry-title" className="mt-2 text-2xl font-black tracking-[-0.03em] sm:text-3xl">
              {isSample ? 'Tell us about your sample idea.' : 'Tell us what you want to make.'}
            </h2>
            <p className="mt-2 max-w-2xl text-xs leading-5 text-white/60">
              Share what you know. We can review the application, product details and next steps with you.
            </p>
          </div>
          <button type="button" onClick={handleClose} aria-label="Close inquiry form" className="grid h-10 w-10 shrink-0 place-items-center border border-white/20 text-white/70 hover:bg-white/10 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </header>

        {isSubmitted ? (
          <div role="status" className="overflow-y-auto p-6 text-center sm:p-10">
            <div className="mx-auto grid h-14 w-14 place-items-center bg-[#183126] text-[#d4ad49]">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <p className="mt-5 text-[9px] font-black uppercase tracking-[0.18em] text-[#9b7a32]">Inquiry received</p>
            <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#183126] sm:text-3xl">
              Thank you, {formData.fullName}.
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#657067]">
              Your request for <strong className="text-[#183126]">{productName}</strong> has been recorded with reference <strong className="text-[#183126]">{createdLead?.id}</strong>.
            </p>
            <div className="mx-auto mt-7 max-w-xl border-y border-[#183126]/15 text-left text-xs">
              {[
                ['Product', productName],
                ['Order volume', isSample ? 'Sample request' : formData.quantity],
                ['Destination', `${formData.country}${formData.destinationPort ? ` · ${formData.destinationPort}` : ''}`]
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-5 border-b border-[#183126]/10 py-3 last:border-0">
                  <span className="text-[#657067]">{label}</span>
                  <span className="text-right font-semibold text-[#183126]">{value}</span>
                </div>
              ))}
            </div>
            <button type="button" onClick={handleClose} className="mt-7 bg-[#183126] px-6 py-3 text-[9px] font-black uppercase tracking-[0.12em] text-white hover:bg-[#2b4939]">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1fr_280px]">
            <div className="min-w-0 p-4 sm:p-7">
              <nav aria-label="Inquiry steps" className="mb-6 grid grid-cols-3 border-b border-[#183126]/15 pb-5">
                {steps.map((label, index) => {
                  const stepNumber = index + 1;
                  const isCurrent = step === stepNumber;
                  const isComplete = step > stepNumber;
                  return (
                    <div key={label} className={`flex items-center gap-2 ${index === 1 ? 'justify-center' : index === 2 ? 'justify-end' : ''}`}>
                      <span className={`grid h-8 w-8 shrink-0 place-items-center text-[10px] font-black ${isCurrent ? 'bg-[#183126] text-white' : isComplete ? 'bg-[#d4ad49] text-[#183126]' : 'bg-white text-[#657067]'}`}>
                        {isComplete ? <CheckCircle2 className="h-4 w-4" /> : `0${stepNumber}`}
                      </span>
                      <span className={`hidden text-[9px] font-black uppercase tracking-[0.1em] sm:block ${isCurrent ? 'text-[#183126]' : 'text-[#657067]'}`}>{label}</span>
                    </div>
                  );
                })}
              </nav>

              {step === 1 && (
                <section aria-labelledby="brief-step-title" className="space-y-5">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-[#9b7a32]">01 / Product brief</p>
                    <h3 id="brief-step-title" className="mt-1 text-xl font-black tracking-[-0.03em]">What ingredient are you looking for?</h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className={`${labelClass} sm:col-span-2`}>
                      Ingredient or concept *
                      <select name="product" value={formData.product} onChange={handleChange} required className={inputClass}>
                        <option value="">Choose an ingredient</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.name}>{product.name} · {product.category}</option>
                        ))}
                        <option value={CUSTOM_PRODUCT}>Custom blend or another ingredient</option>
                      </select>
                    </label>
                    {formData.product === CUSTOM_PRODUCT && (
                      <label className={`${labelClass} sm:col-span-2`}>
                        Describe your product idea *
                        <input
                          name="customProduct"
                          type="text"
                          required
                          value={formData.customProduct}
                          onChange={handleChange}
                          placeholder="Ingredient, blend or product concept"
                          className={inputClass}
                        />
                      </label>
                    )}
                    <label className={labelClass}>
                      Estimated order volume
                      <select name="quantity" value={formData.quantity} onChange={handleChange} className={inputClass}>
                        <option>Not decided</option>
                        <option>Under 250 kg</option>
                        <option>250–500 kg</option>
                        <option>500 kg–1 MT</option>
                        <option>1–5 MT</option>
                        <option>Over 5 MT</option>
                      </select>
                    </label>
                    <label className={labelClass}>
                      Packaging preference
                      <select name="packaging" value={formData.packaging} onChange={handleChange} className={inputClass}>
                        <option>Need guidance</option>
                        <option>Bulk packaging</option>
                        <option>Private label / retail pack</option>
                        <option>Other / discuss</option>
                      </select>
                    </label>
                  </div>
                  <p className="border-l-2 border-[#d4ad49] bg-white/70 px-4 py-3 text-xs leading-5 text-[#657067]">
                    No need to decide technical specifications yet. We will discuss those against the ingredient and intended use.
                  </p>
                </section>
              )}

              {step === 2 && (
                <section aria-labelledby="use-step-title" className="space-y-5">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-[#9b7a32]">02 / Application & destination</p>
                    <h3 id="use-step-title" className="mt-1 text-xl font-black tracking-[-0.03em]">Where will it be used?</h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className={`${labelClass} sm:col-span-2`}>
                      Intended application
                      <textarea
                        name="intendedUse"
                        rows={3}
                        value={formData.intendedUse}
                        onChange={handleChange}
                        placeholder="For example: seasoning blend, beverage, bakery or personal-care formulation"
                        className={`${inputClass} resize-y`}
                      />
                    </label>
                    <label className={labelClass}>
                      Destination country *
                      <select name="country" value={formData.country} onChange={handleChange} required className={inputClass}>
                        <option value="">Choose a destination</option>
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
                        <option>Other</option>
                      </select>
                    </label>
                    <label className={labelClass}>
                      City or port (optional)
                      <span className="relative mt-2 block">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9b7a32]" />
                        <input name="destinationPort" type="text" value={formData.destinationPort} onChange={handleChange} placeholder="City, seaport or airport" className={`${inputClass} mt-0 pl-9`} />
                      </span>
                    </label>
                  </div>
                  <fieldset>
                    <legend className={`${labelClass} mb-2`}>Requirements to discuss (optional)</legend>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {[
                        'Batch quality summary',
                        'Microbiological or contaminant testing',
                        'Destination-market documents',
                        'Other quality requirement'
                      ].map((item) => (
                        <label key={item} className="flex cursor-pointer items-start gap-2 border border-[#183126]/10 bg-white/70 p-3 text-xs leading-5 text-[#536056] hover:border-[#9b7a32]/50">
                          <input
                            type="checkbox"
                            checked={formData.complianceNeeds.includes(item)}
                            onChange={() => handleCheckbox(item)}
                            className="mt-0.5 accent-[#183126]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </section>
              )}

              {step === 3 && (
                <section aria-labelledby="contact-step-title" className="space-y-5">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-[#9b7a32]">03 / Your details</p>
                    <h3 id="contact-step-title" className="mt-1 text-xl font-black tracking-[-0.03em]">Who should we follow up with?</h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className={labelClass}>
                      Your name *
                      <span className="relative mt-2 block">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9b7a32]" />
                        <input name="fullName" type="text" autoComplete="name" required value={formData.fullName} onChange={handleChange} placeholder="Full name" className={`${inputClass} mt-0 pl-9`} />
                      </span>
                    </label>
                    <label className={labelClass}>
                      Company or brand *
                      <span className="relative mt-2 block">
                        <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9b7a32]" />
                        <input name="company" type="text" autoComplete="organization" required value={formData.company} onChange={handleChange} placeholder="Company name" className={`${inputClass} mt-0 pl-9`} />
                      </span>
                    </label>
                    <label className={labelClass}>
                      Business email *
                      <span className="relative mt-2 block">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9b7a32]" />
                        <input name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} placeholder="name@company.com" className={`${inputClass} mt-0 pl-9`} />
                      </span>
                    </label>
                    <label className={labelClass}>
                      Phone or WhatsApp *
                      <span className="relative mt-2 block">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9b7a32]" />
                        <input name="phone" type="tel" autoComplete="tel" required value={formData.phone} onChange={handleChange} placeholder="Include country code" className={`${inputClass} mt-0 pl-9`} />
                      </span>
                    </label>
                    <label className={`${labelClass} sm:col-span-2`}>
                      Anything else we should know? (optional)
                      <textarea
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Share a target specification, timing or other context"
                        className={`${inputClass} resize-y`}
                      />
                    </label>
                  </div>
                </section>
              )}

              {validationMessage && (
                <p role="alert" className="mt-5 border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-800">{validationMessage}</p>
              )}

              <div className="mt-7 flex items-center justify-between gap-4 border-t border-[#183126]/15 pt-5">
                {step > 1 ? (
                  <button type="button" onClick={() => { setValidationMessage(''); setStep((currentStep) => currentStep - 1); }} className="inline-flex items-center gap-2 px-2 py-2 text-[9px] font-black uppercase tracking-[0.12em] text-[#657067] hover:text-[#183126]">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                ) : <span />}
                {step < 3 ? (
                  <button type="button" onClick={handleContinue} className="inline-flex items-center gap-3 bg-[#183126] px-5 py-3 text-[9px] font-black uppercase tracking-[0.12em] text-white hover:bg-[#2b4939]">
                    Continue <ArrowRight className="h-4 w-4 text-[#d4ad49]" />
                  </button>
                ) : (
                  <button type="submit" className="inline-flex items-center gap-3 bg-[#d4ad49] px-5 py-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#183126] hover:bg-[#e2c36d]">
                    {isSample ? 'Send sample inquiry' : 'Send product brief'} <Send className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <aside className="hidden border-l border-[#183126]/15 bg-[#ebe7db] p-6 lg:flex lg:flex-col">
              <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#9b7a32]">Your inquiry</p>
              {chosenProduct ? (
                <div className="mt-4">
                  <img src={chosenProduct.image} alt={chosenProduct.imageAlt || chosenProduct.name} className="h-36 w-full object-cover" />
                  {chosenProduct.imageCredit && (
                    <a href={chosenProduct.imageCreditUrl} target="_blank" rel="noreferrer" className="mt-2 block text-[8px] text-[#657067] underline underline-offset-2">
                      Photo: {chosenProduct.imageCredit}
                    </a>
                  )}
                  <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.12em] text-[#7d6c53]">{chosenProduct.category}</p>
                  <p className="mt-1 text-sm font-black leading-5">{chosenProduct.name}</p>
                </div>
              ) : (
                <div className="mt-4 flex min-h-36 items-center justify-center border border-dashed border-[#183126]/25 px-4 text-center text-xs leading-5 text-[#657067]">
                  Your selected ingredient or product idea will appear here.
                </div>
              )}
              <div className="mt-6 border-t border-[#183126]/15 pt-5">
                <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#7d6c53]">What happens next</p>
                <ol className="mt-3 space-y-3">
                  {[
                    'Review the ingredient and application',
                    'Confirm specifications, volume and pack',
                    'Agree any order-specific checks and documents'
                  ].map((item, index) => (
                    <li key={item} className="flex gap-3 text-xs leading-5 text-[#536056]">
                      <span className="font-mono text-[9px] font-bold text-[#9b7a32]">0{index + 1}</span>{item}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-auto flex items-start gap-2 border-t border-[#183126]/15 pt-5 text-[10px] leading-5 text-[#657067]">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#9b7a32]" />
                <p>Facility credential: FSSAI license. Additional tests and supporting documents are confirmed per order.</p>
              </div>
            </aside>
          </form>
        )}
      </section>
    </div>
  );
}
