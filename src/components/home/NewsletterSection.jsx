import React, { useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { CheckCircle2 } from 'lucide-react';

export default function NewsletterSection() {
  const { addLead } = useLeads();
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    addLead({ name: email.split('@')[0], email, company: 'Newsletter', phone: '', product: 'Newsletter', quantity: '', stage: 'New', notes: 'Newsletter subscriber' });
    setDone(true);
  };

  return (
    <div className="bg-[#1a3d2b] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="text-white text-center sm:text-left">
          <div className="font-bold text-base">Join Our Newsletter</div>
          <div className="text-emerald-300 text-xs">Get powder updates, batch arrivals, blog tips, long long.</div>
        </div>
        {done ? (
          <div className="flex items-center gap-2 text-emerald-300 text-sm font-semibold">
            <CheckCircle2 className="w-4 h-4"/> Subscribed! Welcome aboard.
          </div>
        ) : (
          <form onSubmit={submit} className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 sm:w-72 bg-white/10 border border-emerald-500/40 text-white placeholder-emerald-300/60 text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
            <button type="submit"
              className="bg-[#c8922b] hover:bg-[#f0c060] hover:text-stone-900 text-white font-bold text-sm px-6 py-2.5 rounded-lg transition-colors shrink-0">
              Shop Now
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
