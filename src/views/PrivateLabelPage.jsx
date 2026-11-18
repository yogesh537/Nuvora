import React, { useState } from 'react';
import { ArrowRight, BadgeCheck, Check, ClipboardList, PackageCheck, SearchCheck } from 'lucide-react';
import { useLeads } from '../context/LeadContext';
import { products } from '../data/products';

const stages = [
  { title: 'Share the concept', detail: 'Product idea, target use and market.', icon: ClipboardList },
  { title: 'Review feasibility', detail: 'Ingredient fit and product specification.', icon: SearchCheck },
  { title: 'Agree quality scope', detail: 'Samples, checks and documents by order.', icon: BadgeCheck },
  { title: 'Confirm the pack', detail: 'Quantity, format and label requirements.', icon: PackageCheck }
];

const labelClass = 'block text-[9px] font-black uppercase tracking-[0.13em] text-[#657067]';
const inputClass = 'mt-2 w-full border border-[#183126]/20 bg-white px-3.5 py-3 text-sm text-[#183126] outline-none placeholder:text-[#96978f] focus:border-[#9b7a32]';

export default function PrivateLabelPage() {
  const { addLead } = useLeads();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    targetProduct: '',
    estimatedBatch: 'Not decided',
    packagingType: 'Not decided',
    specNotes: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addLead({
      fullName: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      country: 'Private Label Inquiry',
      product: formData.targetProduct.trim() || 'Private label product concept',
      powderForm: 'To be discussed',
      quantity: formData.estimatedBatch,
      packaging: formData.packagingType,
      targetDate: 'To be discussed',
      intendedUse: 'Private label inquiry',
      type: 'Commercial Quote',
      notes: `Private label brief. Preferred pack: ${formData.packagingType}. Product and quality notes: ${formData.specNotes}`
    });
    setSubmitted(true);
  };

  const exampleProduct = products.find((product) => product.id === 'beetroot-powder') || products[0];

  return (
    <div className="min-h-screen bg-[#f4f1e8] text-[#183126]">
      <section className="bg-[#183126] text-[#f4f1e8]">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-center px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4ad49]">Private label / Product inquiry</p>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              From your
              <br />
              <span className="font-serif font-medium italic text-[#d4ad49]">concept to pack.</span>
            </h1>
            <p className="mt-7 max-w-xl text-sm leading-7 text-white/70">
              Tell us what you are developing. We will review the ingredient, specification and packaging requirements with you before confirming the scope.
            </p>
            <a href="#private-label-brief" className="mt-8 inline-flex w-fit items-center gap-3 border-b border-white/35 pb-2 text-[10px] font-black uppercase tracking-[0.14em] text-white">
              Start a project brief <ArrowRight className="h-4 w-4 text-[#d4ad49]" />
            </a>
            <div className="mt-10 flex items-center gap-3 border-t border-white/15 pt-5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/70">
              <BadgeCheck className="h-4 w-4 text-[#d4ad49]" /> FSSAI facility license
            </div>
          </div>

          <div className="relative min-h-[280px] overflow-hidden bg-[#756e5b] sm:min-h-[380px] lg:min-h-[590px]">
            <img src={exampleProduct.image} alt={exampleProduct.name} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10231a]/80 via-transparent to-[#10231a]/10" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 sm:p-8">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-white/60">Illustrative ingredient</p>
                <p className="mt-1 text-xl font-black text-white">{exampleProduct.name}</p>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-white/60">{exampleProduct.category}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="flex flex-col gap-4 border-b border-[#183126]/20 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#9b7a32]">Project path</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Four decisions, made together.</h2>
          </div>
          <p className="max-w-md text-xs leading-5 text-[#657067]">Samples, timing, testing and packaging options depend on the product and agreed order requirements.</p>
        </div>
        <div className="grid border-l border-t border-[#183126]/20 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map(({ title, detail, icon: Icon }, index) => (
            <article key={title} className={`border-b border-r border-[#183126]/20 p-5 sm:p-6 ${index === 0 ? 'bg-[#ebe7db]' : ''}`}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#9b7a32]">0{index + 1}</span>
                <Icon className="h-5 w-5 text-[#183126]" />
              </div>
              <h3 className="mt-8 text-base font-black">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-[#657067]">{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="private-label-brief" className="border-y border-[#183126]/20 bg-white">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="flex flex-col justify-between bg-[#ebe7db] px-5 py-9 sm:px-8 lg:px-12 lg:py-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#9b7a32]">Project brief</p>
              <h2 className="mt-4 max-w-sm text-3xl font-black leading-[0.98] tracking-[-0.04em]">Start with what you know.</h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-[#657067]">
                A few details help us understand the product concept and the next questions to review.
              </p>
            </div>
            <div className="mt-8 border-t border-[#183126]/20 pt-5">
              <p className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.14em] text-[#657067]">
                <BadgeCheck className="h-4 w-4 text-[#9b7a32]" /> Facility credential
              </p>
              <p className="mt-2 text-sm font-black">FSSAI licensed</p>
              <p className="mt-1 font-mono text-[10px] text-[#657067]">License no. 10020021008942</p>
              <p className="mt-3 text-[10px] leading-5 text-[#657067]">Additional tests and supporting documents are discussed and confirmed per order.</p>
            </div>
          </aside>

          <div className="px-5 py-9 sm:px-8 lg:px-12 lg:py-12">
            {submitted ? (
              <div role="status" className="flex min-h-[430px] flex-col justify-center">
                <div className="grid h-12 w-12 place-items-center bg-[#183126] text-[#d4ad49]"><Check className="h-6 w-6" /></div>
                <p className="mt-7 text-[10px] font-black uppercase tracking-[0.18em] text-[#9b7a32]">Inquiry received</p>
                <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">Thank you, {formData.name}.</h3>
                <p className="mt-3 max-w-lg text-sm leading-6 text-[#657067]">
                  Your project brief has been recorded. The information will help the team follow up about feasibility, product details and next steps.
                </p>
                <button type="button" onClick={() => setSubmitted(false)} className="mt-7 inline-flex w-fit items-center gap-2 border-b border-[#183126] pb-1 text-[9px] font-black uppercase tracking-[0.12em]">
                  Send another brief <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <div className="mb-7 border-b border-[#183126]/20 pb-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#9b7a32]">Contact and product details</p>
                  <h3 className="mt-2 text-2xl font-black tracking-[-0.03em]">Tell us about your project</h3>
                </div>
                <form onSubmit={handleSubmit} className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
                  <label className={labelClass}>
                    Your name *
                    <input name="name" type="text" autoComplete="name" required value={formData.name} onChange={handleChange} placeholder="Name" className={inputClass} />
                  </label>
                  <label className={labelClass}>
                    Company / brand *
                    <input name="company" type="text" autoComplete="organization" required value={formData.company} onChange={handleChange} placeholder="Company name" className={inputClass} />
                  </label>
                  <label className={labelClass}>
                    Business email *
                    <input name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} placeholder="name@company.com" className={inputClass} />
                  </label>
                  <label className={labelClass}>
                    Phone / WhatsApp *
                    <input name="phone" type="tel" autoComplete="tel" required value={formData.phone} onChange={handleChange} placeholder="+91 ..." className={inputClass} />
                  </label>
                  <label className={`${labelClass} sm:col-span-2`}>
                    Product or blend concept
                    <input name="targetProduct" type="text" value={formData.targetProduct} onChange={handleChange} placeholder="Ingredient, blend or product idea" className={inputClass} />
                  </label>
                  <label className={labelClass}>
                    Estimated order volume
                    <select name="estimatedBatch" value={formData.estimatedBatch} onChange={handleChange} className={inputClass}>
                      <option>Not decided</option>
                      <option>Under 250 kg</option>
                      <option>250–500 kg</option>
                      <option>500 kg–1 MT</option>
                      <option>1–5 MT</option>
                      <option>Over 5 MT</option>
                    </select>
                  </label>
                  <label className={labelClass}>
                    Preferred pack format
                    <select name="packagingType" value={formData.packagingType} onChange={handleChange} className={inputClass}>
                      <option>Not decided</option>
                      <option>Bulk pack</option>
                      <option>Retail pouch</option>
                      <option>Jar</option>
                      <option>Sachet</option>
                      <option>Other / discuss</option>
                    </select>
                  </label>
                  <label className={`${labelClass} sm:col-span-2`}>
                    Intended use, market or other requirements
                    <textarea
                      name="specNotes"
                      rows={4}
                      value={formData.specNotes}
                      onChange={handleChange}
                      placeholder="Share your intended application, target market, label or quality requirements..."
                      className={`${inputClass} resize-y`}
                    />
                  </label>
                  <div className="flex flex-col gap-4 border-t border-[#183126]/20 pt-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-md text-[10px] leading-5 text-[#657067]">Feasibility, specifications, timing and pack options are confirmed with you before an order is agreed.</p>
                    <button type="submit" className="inline-flex items-center justify-center gap-3 bg-[#183126] px-6 py-3.5 text-[10px] font-black uppercase tracking-[0.12em] text-white hover:bg-[#2b4939]">
                      Send project brief <ArrowRight className="h-4 w-4 text-[#d4ad49]" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
