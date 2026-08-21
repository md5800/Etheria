// Product Catalog Store: ÉTHERIA BOTANICALS

export const PRODUCTS = [
  {
    id: "prod-01",
    name: "Aura Cellular Renewal Serum",
    category: "serums",
    categoryLabel: "Cellular Serum",
    tagline: "Bio-Retinol & Alpine Rose Stem Cell Concentrate",
    description: "An ultra-concentrated cellular serum engineered to visibly smooth fine lines, accelerate epidermal turnover, and restore collagen elasticity without irritation.",
    price: 145,
    rating: 4.9,
    reviewsCount: 128,
    sizes: [
      { label: "30ml", price: 145 },
      { label: "50ml", price: 195 }
    ],
    heroImage: "/assets/products/product_serum_hero.jpg",
    secondaryImage: "/assets/textures/texture_serum_droplet.jpg",
    ingredients: ["Bio-Retinol (1.5%)", "Alpine Rose Stem Cells", "Snow Mushroom Hyaluronic", "Copper Tripeptide-1"],
    benefits: [
      "EVIDENCE: Accelerates cellular turnover by 42%",
      "EVIDENCE: Visibly plumps fine lines in 14 days",
      "INFERENCE: Restores moisture barrier resilience"
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: "prod-02",
    name: "Nectar Bio-Active Radiance Oil",
    category: "elixirs",
    categoryLabel: "Botanical Elixir",
    tagline: "Cold-Pressed Marula, Sea Buckthorn & Bakuchiol",
    description: "A silky, fast-absorbing botanical oil infused with rare cold-pressed antioxidants to illuminate dull skin and seal in deep cellular moisture.",
    price: 125,
    rating: 4.8,
    reviewsCount: 94,
    sizes: [
      { label: "30ml", price: 125 }
    ],
    heroImage: "/assets/products/product_oil_hero.jpg",
    secondaryImage: "/assets/textures/texture_golden_oil.jpg",
    ingredients: ["Cold-Pressed Marula Oil", "Sea Buckthorn Berry", "Synergistic Bakuchiol", "Rosehip Seed Oil"],
    benefits: [
      "EVIDENCE: Provides deep antioxidant defense",
      "INFERENCE: Imparts radiant, golden morning glow",
      "EVIDENCE: Non-comedogenic barrier seal"
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: "prod-03",
    name: "Velvet Cloud Barrier Cream",
    category: "moisturizers",
    categoryLabel: "Restorative Cream",
    tagline: "Ceramide NP, Squalane & Centella Asiatica",
    description: "A rich yet weightless restorative cream that cushions compromised skin, replenishing essential lipid barriers and soothing redness.",
    price: 110,
    rating: 4.9,
    reviewsCount: 156,
    sizes: [
      { label: "50ml", price: 110 },
      { label: "100ml", price: 165 }
    ],
    heroImage: "/assets/products/product_cream_hero.jpg",
    secondaryImage: "/assets/textures/texture_velvet_cream.jpg",
    ingredients: ["Ceramide Complex NP/AP/EOP", "Olive Squalane (5%)", "Centella Asiatica", "Colloidal Oatmeal"],
    benefits: [
      "EVIDENCE: Instantly calms irritation and tightness",
      "EVIDENCE: Reinforces lipid matrix for 72-hour moisture",
      "EVIDENCE: Dermatologist tested on sensitive skin"
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: "prod-04",
    name: "Pure Botanical Essence Cleanser",
    category: "cleansers",
    categoryLabel: "Gentle Cleanser",
    tagline: "Green Tea Extract, Niacinamide & Papaya Enzymes",
    description: "A gentle gel-to-milk cleanser that lifts impurities, makeup, and urban pollutants while keeping the delicate microflora balanced.",
    price: 75,
    rating: 4.7,
    reviewsCount: 82,
    sizes: [
      { label: "150ml", price: 75 }
    ],
    heroImage: "/assets/products/product_cleanser_hero.jpg",
    secondaryImage: "/assets/ethos/ethos_botanicals_harvest.jpg",
    ingredients: ["Niacinamide (2%)", "Organic Green Tea Hydrosol", "Papaya Enzyme", "Chamomile"],
    benefits: [
      "EVIDENCE: Deeply purifies pores without stripping moisture",
      "EVIDENCE: Soothes sensitive skin barrier",
      "EVIDENCE: pH balanced at 5.5"
    ],
    inStock: true,
    isFeatured: true
  }
];

export function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

export function filterProducts(category) {
  if (!category || category === "all") return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}
