import React, { useState } from 'react';
import { useLeads } from '../context/LeadContext';
import { 
  Sparkles, 
  FlaskConical, 
  CheckCircle2, 
  ArrowRight, 
  Package, 
  Layers, 
  ShieldCheck, 
  Send 
} from 'lucide-react';

export default function PrivateLabelPage() {
  const { addLead } = useLeads();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    targetProduct: 'Superfood Greens Blend',
    carrierPreference: 'Carrier-Free (Pure Solids)',
    meshRequirement: '100 Mesh Superfine',
    estimatedBatch: '500 kg - 1 MT',
    packagingType: 'Retail Stand-up Pouches (Doypack)',
    specNotes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addLead({
      fullName: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      country: 'Private Label Form',
      product: `Custom Formulation: ${formData.targetProduct}`,
      powderForm: formData.carrierPreference,
      quantity: formData.estimatedBatch,
      packaging: formData.packagingType,
      targetDate: 'Custom Development',
      intendedUse: 'Private Label Brand Development',
      type: 'Commercial Quote',
      notes: `Custom formulation inquiry. Mesh: ${formData.meshRequirement}. Packaging: ${formData.packagingType}. Notes: ${formData.specNotes}`
    });
    setSubmitted(true);
  };

  const steps = [
    {
      num: "01",
      title: "Recipe Consultation & Active Targets",
      desc: "We discuss your target flavor, color, functional active levels (e.g. 5% curcumin, 25% protein), and regulatory compliance (EU / US FDA)."
    },
    {
      num: "02",
      title: "Benchtop Lab Trial (100g - 2kg)",
      desc: "Our food scientists formulate pilot test batches for your sensory panel, verifying solubility, rehydration speed, and bulk density."
    },
    {
      num: "03",
      title: "Stability & Microbiological Testing",
      desc: "Accelerated shelf-life and moisture-barrier testing ensures your blend remains free-flowing and color-stable for 24 months."
    },
    {
      num: "04",
      title: "Commercial Manufacturing",
      desc: "Precision blending in our pharmaceutical-grade ribbon and paddle blenders with automated magnetic separation and inline sieving."
    },
    {
      num: "05",
      title: "Turnkey Packaging & Export",
      desc: "From nitrogen-flushed retail stand-up pouches, HDPE jars, and stick packs, to 25kg export drums with your custom brand labels."
    }
  ];

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-[#C9972B] text-xs font-bold uppercase tracking-wider mb-2 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5" /> Turnkey Contract Blending
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1F4D36] tracking-tight">
            Private Label & Custom Formulations
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            From single-powder carrier-free drying to complex 12-botanical supergreen formulas. We handle R&D, pilot blending, QA testing, and export packaging.
          </p>
        </div>

        {/* Workflow Timeline */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#1F4D36] text-center mb-10">
            Our 5-Stage Formulation Workflow
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((s, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-extrabold text-[#C9972B] bg-[#C9972B]/10 px-2 py-0.5 rounded block w-fit mb-3">
                    STAGE {s.num}
                  </span>
                  <h3 className="font-bold text-stone-900 text-sm mb-2">{s.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Formulation Inquiry Form */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-stone-200 shadow-card max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#1F4D36]">Submit Custom Formulation Brief</h3>
            <p className="text-xs text-stone-500 mt-1">
              Our food technology R&D team will review your specifications and reply with a formulation proposal within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#1F4D36] mx-auto" />
              <h4 className="text-xl font-bold text-stone-900">Formulation Request Received!</h4>
              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you, {formData.name}. Our R&D desk has received your brief for <strong>{formData.targetProduct}</strong>. An application specialist will reach out to <strong>{formData.email}</strong> with pilot trial feasibility.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Jessica Taylor"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1F4D36]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Company / Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="e.g. WildEarth Wellness"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1F4D36]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Business Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1F4D36]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Direct Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1F4D36]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Target Product Concept</label>
                  <input
                    type="text"
                    value={formData.targetProduct}
                    onChange={(e) => setFormData(prev => ({ ...prev, targetProduct: e.target.value }))}
                    placeholder="e.g. Daily Greens & Antioxidant Berry Mix"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1F4D36]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Carrier Preference</label>
                  <select
                    value={formData.carrierPreference}
                    onChange={(e) => setFormData(prev => ({ ...prev, carrierPreference: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1F4D36]"
                  >
                    <option value="Carrier-Free (Pure Solids)">100% Pure Fruit / Botanical Solids (Carrier-Free)</option>
                    <option value="Organic Tapioca Starch">Organic Tapioca Starch / Inulin Carrier</option>
                    <option value="Non-GMO Maltodextrin">Non-GMO Maltodextrin (Standard Solubility)</option>
                    <option value="Gum Arabic / Acacia">Acacia / Gum Arabic</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Finished Packaging Format</label>
                  <select
                    value={formData.packagingType}
                    onChange={(e) => setFormData(prev => ({ ...prev, packagingType: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1F4D36]"
                  >
                    <option value="Retail Stand-up Pouches">Printed Stand-Up Pouches (100g - 1kg)</option>
                    <option value="HDPE / Amber Jars">HDPE / Amber Jars with Induction Seal</option>
                    <option value="Single-Serve Sachets">Single-Serve Sachet Sticks (5g - 15g)</option>
                    <option value="Bulk 25kg Drums">Bulk 25kg Drums with Brand Labels</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Target Pilot / Commercial Batch</label>
                  <select
                    value={formData.estimatedBatch}
                    onChange={(e) => setFormData(prev => ({ ...prev, estimatedBatch: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1F4D36]"
                  >
                    <option value="Pilot Trial (100 - 250 kg)">Pilot Trial (100 - 250 kg)</option>
                    <option value="500 kg - 1 MT">500 kg - 1 Metric Ton</option>
                    <option value="3 - 5 MT Contract">3 - 5 Metric Tons Commercial Run</option>
                    <option value="10+ MT Annual">10+ MT Annual Supply Agreement</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Recipe / Technical Details (Optional)</label>
                <textarea
                  rows={3}
                  value={formData.specNotes}
                  onChange={(e) => setFormData(prev => ({ ...prev, specNotes: e.target.value }))}
                  placeholder="Specify list of botanical ingredients, target mesh size, or target countries of sale..."
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1F4D36]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#C9972B] hover:bg-[#b58622] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Private Label Request</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
