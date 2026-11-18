import React, { createContext, useContext, useState, useEffect } from 'react';

const LeadContext = createContext();

const initialLeads = [
  {
    id: "NVQ-2026-8941",
    createdAt: "2026-11-17T14:32:00Z",
    fullName: "Henrik Van Der Meer",
    company: "Nordic Clean Foods BV",
    email: "h.vandermeer@nordiccleanfoods.nl",
    phone: "+31 20 892 4110",
    country: "Netherlands",
    product: "Spinach Powder",
    powderForm: "Air dried",
    quantity: "5,000 kg (5 MT)",
    packaging: "25kg Fibre Drum",
    targetDate: "Within 30 Days",
    intendedUse: "Organic Green Pasta & Clean-Label Colorant",
    type: "Commercial Quote",
    status: "New",
    notes: "Discuss destination-market testing and documentation requirements."
  },
  {
    id: "NVS-2026-8938",
    createdAt: "2026-11-16T11:15:00Z",
    fullName: "Elena Rostova",
    company: "AuraNutra Botanicals",
    email: "elena@auranutra.co.uk",
    phone: "+44 20 7946 0912",
    country: "United Kingdom",
    product: "Beetroot Powder",
    powderForm: "Spray dried",
    quantity: "100g Sample for Lab Trial",
    packaging: "Sample Sealed Pouch",
    targetDate: "Immediate Trial",
    intendedUse: "Pre-Workout Formulation & Effervescent Tablets",
    type: "Sample Request",
    status: "Contacted",
    notes: "DHL sample tracking dispatched (AWB: 89401923). Follow-up scheduled for next Tuesday."
  },
  {
    id: "NVQ-2026-8925",
    createdAt: "2026-11-15T09:45:00Z",
    fullName: "David Chen",
    company: "Pacific Rim Flavors Inc",
    email: "dchen@pacificrimflavors.com",
    phone: "+1 (415) 882-9014",
    country: "United States",
    product: "Dehydrated Garlic Powder",
    powderForm: "Air dried (80 Mesh)",
    quantity: "12,000 kg (12 MT)",
    packaging: "25kg Food-Grade Paper Bag with PE Liner",
    targetDate: "Within 60 Days",
    intendedUse: "Industrial BBQ Rubs and Potato Chip Seasonings",
    type: "Commercial Quote",
    status: "Quoted",
    notes: "FOB Nhava Sheva quoted at $3.85/kg. CIF Long Beach shipping estimate provided."
  },
  {
    id: "NVQ-2026-8890",
    createdAt: "2026-11-12T16:20:00Z",
    fullName: "Dr. Klaus Weber",
    company: "VitaNova Pharma GmbH",
    email: "klaus.weber@vitanovapharma.de",
    phone: "+49 69 9021 3410",
    country: "Germany",
    product: "Moringa Leaf Powder",
    powderForm: "Air dried superfine 100 mesh",
    quantity: "20,000 kg (20 MT Contract)",
    packaging: "20kg Fibre Drum",
    targetDate: "Annual Contract",
    intendedUse: "Botanical dietary supplement capsules",
    type: "Commercial Quote",
    status: "Won",
    notes: "Annual master purchase agreement executed. First 10 MT batch shipped."
  },
  {
    id: "NVQ-2026-8840",
    createdAt: "2026-11-08T10:10:00Z",
    fullName: "Carlos Silva",
    company: "Rio Delights Confeitaria",
    email: "carlos@riodelights.com.br",
    phone: "+55 11 98124 5519",
    country: "Brazil",
    product: "Alphonso Mango Powder",
    powderForm: "Spray dried",
    quantity: "2,000 kg",
    packaging: "5kg Foil Pouches in Box",
    targetDate: "Within 45 Days",
    intendedUse: "Ice Cream and Pastry Fillings",
    type: "Commercial Quote",
    status: "Lost",
    notes: "Client opted for domestic frozen mango puree due to import duty constraints in Brazil."
  }
];

export function LeadProvider({ children }) {
  const [leads, setLeads] = useState(() => {
    try {
      const saved = localStorage.getItem('nuvaro_leads');
      return saved ? JSON.parse(saved) : initialLeads;
    } catch {
      return initialLeads;
    }
  });

  const [activeLeadModal, setActiveLeadModal] = useState(null); // 'quote' | 'sample' | 'catalogue' | null
  const [selectedProductForQuote, setSelectedProductForQuote] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('nuvaro_leads', JSON.stringify(leads));
    } catch (e) {
      console.error("Failed to save leads to localStorage", e);
    }
  }, [leads]);

  const addLead = (leadData) => {
    const isSample = leadData.type === 'Sample Request';
    const prefix = isSample ? 'NVS' : 'NVQ';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `${prefix}-2026-${randomNum}`;

    const newLead = {
      id: newId,
      createdAt: new Date().toISOString(),
      status: "New",
      notes: "Auto-logged from website inquiry portal.",
      ...leadData
    };

    setLeads(prev => [newLead, ...prev]);
    return newLead;
  };

  const updateLeadStatus = (leadId, newStatus, newNotes) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        return {
          ...lead,
          status: newStatus || lead.status,
          notes: newNotes !== undefined ? newNotes : lead.notes
        };
      }
      return lead;
    }));
  };

  const deleteLead = (leadId) => {
    setLeads(prev => prev.filter(l => l.id !== leadId));
  };

  const openQuoteModal = (product = null) => {
    setSelectedProductForQuote(product);
    setActiveLeadModal('quote');
  };

  const openSampleModal = (product = null) => {
    setSelectedProductForQuote(product);
    setActiveLeadModal('sample');
  };

  const openCatalogueModal = () => {
    setActiveLeadModal('catalogue');
  };

  const closeModal = () => {
    setActiveLeadModal(null);
    setSelectedProductForQuote(null);
  };

  return (
    <LeadContext.Provider value={{
      leads,
      addLead,
      updateLeadStatus,
      deleteLead,
      activeLeadModal,
      selectedProductForQuote,
      openQuoteModal,
      openSampleModal,
      openCatalogueModal,
      closeModal
    }}>
      {children}
    </LeadContext.Provider>
  );
}

export function useLeads() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
}
