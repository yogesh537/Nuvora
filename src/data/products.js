export const products = [
  {
    id: 'onion-powder',
    name: 'Dehydrated Onion Powder & Flakes',
    botanicalName: 'Allium cepa',
    category: 'Spice Powders',
    forms: ['Fine Powder (80-100 Mesh)', 'Dehydrated Flakes', 'Minced / Granules (16-40 Mesh)', 'Chopped (3-5mm)'],
    meshSize: '80-100 Mesh (Powder) / 8-24 Mesh (Flakes)',
    purity: '100% Pure White & Red Onion, No Caking Agents',
    colorProfile: 'Creamy White / Pale Golden / Pink',
    description: 'Industrial-grade dehydrated onion processed from fresh selected bulbs. Available in fine powder, crispy flakes, chopped and minced granules for savory formulations and seasoning lines.',
    applications: [
      'Snack seasonings, chips coatings & noodle tastemakers',
      'Soups, bouillons, sauces and broth bases',
      'Dry marinades, rubs & meat processing blends',
      'Ready-to-eat meals and instant food formulations'
    ],
    image: '/images/powders/onion-powder.jpg',
    imageAlt: 'Fine cream-colored onion powder, golden dehydrated onion flakes and raw onions',
    featured: true
  },
  {
    id: 'garlic-powder',
    name: 'Dehydrated Garlic Powder & Granules',
    botanicalName: 'Allium sativum',
    category: 'Spice Powders',
    forms: ['Fine Powder (80-100 Mesh)', 'Granules (16-40 Mesh)', 'Minced Garlic', 'Toasted Flakes'],
    meshSize: '80-100 Mesh (Powder) / 16-40 Mesh (Granules)',
    purity: '100% Pure Garlic, High Allicin Potency',
    colorProfile: 'Warm Pale Cream / Light Sand',
    description: 'Pungent, high-potency dehydrated garlic delivering consistent allicin flavor profiles across bulk spice shakers, savory coatings, gourmet dips, and processed foods.',
    applications: [
      'Spice shakers, BBQ rubs & dry table seasonings',
      'Garlic bread coatings, dips, mayonnaise & dressings',
      'Processed meats, sausages and canned foods',
      'Industrial sauce, pasta sauce & culinary premixes'
    ],
    image: '/images/powders/garlic-powder.jpg',
    imageAlt: 'Fine garlic powder and coarse garlic granules with fresh whole garlic bulb',
    featured: true
  },
  {
    id: 'ginger-powder',
    name: 'Ginger Powder & Granules',
    botanicalName: 'Zingiber officinale',
    category: 'Spice Powders',
    forms: ['Fine Powder (80-100 Mesh)', 'Granules / Crushed (20-40 Mesh)'],
    meshSize: '80-100 Mesh',
    purity: '100% Pure Sun-Dried Ginger, High Gingerol',
    colorProfile: 'Pale Golden Sand / Warm Buff',
    description: 'Aromatic, warm, pungent dehydrated ginger powder with high volatile oil and gingerol yield. Perfect for bakery items, beverages, spice teas, chai concentrates and confectioneries.',
    applications: [
      'Chai latte mixes, herbal infusions & beverage syrups',
      'Gingerbread, cookies, bakery & confectionery',
      'Curry blends, savory marinades & Asian sauces',
      'Ayurvedic and digestive health formulations'
    ],
    image: '/images/powders/ginger-powder.jpg',
    imageAlt: 'Fine pale golden ginger powder with fresh knobby ginger root',
    featured: true
  },
  {
    id: 'beetroot-powder',
    name: 'Pure Beetroot Powder',
    botanicalName: 'Beta vulgaris',
    category: 'Vegetable Powders',
    forms: ['Fine Powder (80-100 Mesh)', 'Granules (20-40 Mesh)'],
    meshSize: '80-100 Mesh (Fine Sifted)',
    purity: '100% Pure, Zero Artificial Colorants',
    colorProfile: 'Intense Ruby Magenta / Deep Red',
    description: 'Vibrant, nutrient-dense dehydrated beetroot powder with high natural betanin content for clean-label food coloring, beverages, bakery and functional nutraceutical blends.',
    applications: [
      'Natural food & beverage coloring',
      'Smoothies, drink mixes & hydration sticks',
      'Artisanal bakery, pasta & confectionery',
      'Pre-workout & functional dietary formulations'
    ],
    image: '/images/powders/beetroot-powder.jpg',
    imageAlt: 'Vibrant red beetroot powder conical heap with fresh beetroots and glass spice jar',
    featured: true
  },
  {
    id: 'rose-petal-powder',
    name: 'Rose Petal Powder & Flakes',
    botanicalName: 'Rosa damascena',
    category: 'Herbal & Botanical',
    forms: ['Fine Powder (80-100 Mesh)', 'Crushed Petals (10-20 Mesh)'],
    meshSize: '80-100 Mesh',
    purity: '100% Edible & Cosmetic Grade Damask Rose',
    colorProfile: 'Dusty Crimson / Rose Pink',
    description: 'Fragrant, shade-dried Damask rose petal powder with gentle floral aroma. Formulated for luxury cosmetics, skincare face packs, artisanal desserts, and gourmet herbal teas.',
    applications: [
      'Cosmetic clay masks, ubtan & botanical skincare',
      'Gourmet desserts, floral syrups & baking glazes',
      'Artisanal tea blends and relaxation beverages',
      'Natural body dusting and aromatherapy compounds'
    ],
    image: '/images/powders/rose-petal-powder.jpg',
    imageAlt: 'Dusty pink rose petal powder on dark slate with dried crimson petals',
    featured: true
  },
  {
    id: 'moringa-powder',
    name: 'Moringa Leaf Powder',
    botanicalName: 'Moringa oleifera',
    category: 'Herbal & Botanical',
    forms: ['Micro-Milled Powder (100-120 Mesh)'],
    meshSize: '100-120 Mesh Ultra-Fine',
    purity: '100% Shade-Dried Moringa Oleifera Leaves',
    colorProfile: 'Brilliant Emerald Green',
    description: 'Certified organic shade-dried moringa leaf powder with maximum chlorophyll and antioxidant retention. Ideal for green superfood blends, wellness capsules, and nutritional powders.',
    applications: [
      'Green drink mixes, superfood smoothies & juices',
      'Fortified nutritional snacks, pasta & energy bars',
      'Nutraceutical tablets, dietary capsules & botanicals',
      'Organic teas and herbal wellness infusions'
    ],
    image: '/images/powders/moringa-powder.jpg',
    imageAlt: 'Conical heap of brilliant emerald green moringa powder with fresh sprigs',
    featured: true
  }
];

const productsById = Object.fromEntries(products.map((product) => [product.id, product]));

export const industriesList = [
  {
    name: 'Food & Beverage',
    eyebrow: 'Ingredient applications',
    description: 'Dehydrated vegetable, spice and botanical powders engineered for instant solubility, clear broths, and clean-label natural coloration.',
    powders: ['Onion', 'Garlic', 'Beetroot', 'Ginger'],
    image: productsById['beetroot-powder'].image,
    imageAlt: productsById['beetroot-powder'].imageAlt
  },
  {
    name: 'Seasonings, Rubs & Snacks',
    eyebrow: 'Savory formulations',
    description: 'Free-flowing onion, garlic, and ginger powders and flakes tailored for extruded snacks, chips, coatings and marinades.',
    powders: ['Onion Flakes', 'Garlic Granules', 'Ginger'],
    image: productsById['onion-powder'].image,
    imageAlt: productsById['onion-powder'].imageAlt
  },
  {
    name: 'Bakery & Confectionery',
    eyebrow: 'Product development',
    description: 'Plant-derived colors and functional powders including vibrant beetroot, ginger, and aromatic rose petal powders.',
    powders: ['Beetroot', 'Ginger', 'Rose petal'],
    image: productsById['ginger-powder'].image,
    imageAlt: productsById['ginger-powder'].imageAlt
  },
  {
    name: 'Beverage & Botanical',
    eyebrow: 'Formulation conversations',
    description: 'Micronized botanical and herbal powders for instant tea premixes, smoothie sticks, and functional wellness drinks.',
    powders: ['Ginger', 'Moringa', 'Beetroot', 'Rose petal'],
    image: productsById['moringa-powder'].image,
    imageAlt: productsById['moringa-powder'].imageAlt
  },
  {
    name: 'Personal Care & Cosmetics',
    eyebrow: 'Botanical ingredients',
    description: 'Finely milled floral and herbal botanicals for face masks, bath powders, soaps, and clean-label cosmetic formulations.',
    powders: ['Rose petal', 'Moringa'],
    image: productsById['rose-petal-powder'].image,
    imageAlt: productsById['rose-petal-powder'].imageAlt
  }
];

export const certificationsData = [
  {
    code: 'FSSAI License',
    title: 'Food Safety and Standards Authority of India',
    issuer: 'Food Safety and Standards Authority of India',
    validity: 'License No. 10020021008942',
    scope: 'Food business license for dehydrated powders & spices processing',
    badge: 'FSSAI Licensed Facility'
  },
  {
    code: 'Steam Sterilized',
    title: 'Clean Low-Bioburden Treatment',
    issuer: 'Quality Control Laboratory',
    validity: 'Batch Verified',
    scope: 'Microbiological control without radiation or chemical fumigation',
    badge: 'Zero Chemical Residue'
  },
  {
    code: '100% Traceable',
    title: 'Direct Farm-to-Facility Sourcing',
    issuer: 'Nuvaro Agro Quality Network',
    validity: 'Harvest Audited',
    scope: 'Contract farming with strict pesticide limits and harvest tracking',
    badge: 'Full Traceability'
  }
];

const blogArticles = [
  {
    id: 1,
    productId: 'beetroot-powder',
    title: 'Using pure beetroot powder as a clean-label natural red colorant',
    slug: 'beetroot-powder-natural-colorant',
    category: 'Food formulations',
    readTime: '4 min read',
    author: 'Nuvaro Agro Technical Team',
    excerpt: 'How food manufacturers achieve rich pink to deep crimson shades in bakery, snacks and beverages with stable dehydrated beetroot powder.',
    content: 'Dehydrated beetroot powder is one of the most effective clean-label substitutes for artificial Red 40. Betanin pigments provide intense magenta hues that perform reliably in low-heat applications, frostings, plant-based meats, and instant beverage mixes. When ordering in bulk, confirm mesh size (80 vs 100 mesh) to ensure instant solubility and zero grittiness in liquid applications.'
  },
  {
    id: 2,
    productId: 'onion-powder',
    title: 'Flakes vs Powder: Choosing the right onion cut for industrial food manufacturing',
    slug: 'onion-flakes-vs-powder-guide',
    category: 'Sourcing guide',
    readTime: '5 min read',
    author: 'Nuvaro Agro Sourcing Desk',
    excerpt: 'A comprehensive comparative guide between dehydrated onion flakes, chopped, minced granules, and fine powder for recipe developers.',
    content: 'The format of dehydrated onion directly dictates sensory mouthfeel and release timing. While 80-100 mesh onion powder disperses instantaneously across snack seasonings and bouillons, 8-24 mesh onion flakes reconstitute upon hydration to yield genuine onion texture in soups, ready meals, and canned sauces. Review your production equipment flow to avoid moisture clumping.'
  },
  {
    id: 3,
    productId: 'garlic-powder',
    title: 'Maximizing allicin retention in bulk dehydrated garlic powder and granules',
    slug: 'garlic-powder-allicin-retention',
    category: 'Quality & processing',
    readTime: '4 min read',
    author: 'Nuvaro Agro Lab',
    excerpt: 'Why controlled low-temperature dehydration produces garlic powder with superior pungent aroma and longer shelf stability.',
    content: 'Allicin precursor alliin is highly sensitive to excessive processing heat. Our low-temperature dehydration protocols preserve enzymatically active compounds so that when the garlic powder meets moisture in customer formulations, authentic freshly crushed garlic aroma bursts forth. Storage in nitrogen-flushed multi-wall moisture barrier bags ensures minimum 24-month aroma retention.'
  },
  {
    id: 4,
    productId: 'ginger-powder',
    title: 'Aromatic ginger powder: volatile oils, gingerol assay and export standards',
    slug: 'sourcing-high-gingerol-ginger-powder',
    category: 'Export standards',
    readTime: '4 min read',
    author: 'Nuvaro Agro Sourcing Team',
    excerpt: 'Key parameters to verify when procuring bulk ginger powder: gingerol percentage, steam treatment, and mesh consistency.',
    content: 'Industrial ginger procurement requires testing beyond appearance. We provide comprehensive COA documentation detailing gingerol assay, moisture content below 8%, and strict heavy metal clearance compliant with EU and US FDA import tolerances.'
  },
  {
    id: 5,
    productId: 'moringa-powder',
    title: 'Moringa leaf powder: shade drying versus mechanical hot air drying',
    slug: 'moringa-powder-drying-comparison',
    category: 'Botanical ingredients',
    readTime: '3 min read',
    author: 'Nuvaro Agro Botanical Desk',
    excerpt: 'The critical difference that gentle shade drying makes to moringa chlorophyll intensity and nutritional integrity.',
    content: 'Direct exposure to high heat degrades the vivid chlorophyll pigment and heat-sensitive vitamins in moringa leaves. Our shade-drying facility preserves a bright emerald green hue that dissolves cleanly into green smoothie powders and capsule formulations without bitter burnt undertones.'
  },
  {
    id: 6,
    productId: 'rose-petal-powder',
    title: 'Damask rose petal powder: botanical extraction and purity considerations',
    slug: 'damask-rose-petal-powder-purity',
    category: 'Botanical ingredients',
    readTime: '3 min read',
    author: 'Nuvaro Agro Botanical Desk',
    excerpt: 'How pesticide-free shade-dried Damask rose petals provide natural floral aroma and gentle soothing properties.',
    content: 'Edible and cosmetic grade rose petal powder requires meticulous screening for pesticide residues. Our Damask rose harvests are dried under strict sanitary conditions to protect natural anthocyanins and delicate aromatics for premium skincare, teas, and confectionery glazes.'
  }
];

export const blogPostsData = blogArticles.map((article) => {
  const product = productsById[article.productId] || products[0];
  return {
    ...article,
    image: product.image,
    imageAlt: product.imageAlt
  };
});
