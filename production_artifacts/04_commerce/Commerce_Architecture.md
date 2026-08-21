# Commerce Architecture Specification

## 1. Principles & Separation of Concerns
- **Rule:** Animation timelines must NEVER touch or mutate business/commerce data states directly.
- **Data Flow:** All store operations (adding items to cart, modifying quantities, switching categories, opening drawers, applying promo codes) are handled by a single pure JavaScript store module (`src/store/cartStore.js` & `src/store/productCatalog.js`).
- **Events:** UI components subscribe to store change events (e.g. `cart:updated`, `catalog:filtered`, `routine:selected`) to update the DOM reactively without interrupting active GSAP triggers.

## 2. Product Catalog Data Schema

```javascript
export const PRODUCTS = [
  {
    id: "prod-01",
    name: "Aura Cellular Renewal Serum",
    category: "serums",
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
    secondaryImage: "/assets/products/product_serum_texture.jpg",
    ingredients: ["Bio-Retinol (1.5%)", "Alpine Rose Stem Cells", "Snow Mushroom Hyaluronic", "Copper Tripeptide-1"],
    benefits: [
      "Accelerates cellular turnover by 42%",
      "Visibly plumps fine lines in 14 days",
      "Restores moisture barrier resilience"
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: "prod-02",
    name: "Nectar Bio-Active Radiance Oil",
    category: "elixirs",
    tagline: "Cold-Pressed Marula, Sea Buckthorn & Bakuchiol",
    description: "A silky, fast-absorbing botanical oil infused with rare cold-pressed antioxidants to illuminate dull skin and seal in deep cellular moisture.",
    price: 125,
    rating: 4.8,
    reviewsCount: 94,
    sizes: [
      { label: "30ml", price: 125 }
    ],
    heroImage: "/assets/products/product_oil_hero.jpg",
    secondaryImage: "/assets/products/product_oil_texture.jpg",
    ingredients: ["Cold-Pressed Marula Oil", "Sea Buckthorn Berry", "Synergistic Bakuchiol", "Rosehip Seed Oil"],
    benefits: [
      "Provides deep antioxidant defense",
      "Imparts radiant, golden morning glow",
      "Non-comedogenic barrier seal"
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: "prod-03",
    name: "Velvet Cloud Barrier Cream",
    category: "moisturizers",
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
    secondaryImage: "/assets/products/product_cream_texture.jpg",
    ingredients: ["Ceramide Complex NP/AP/EOP", "Olive Squalane (5%)", "Centella Asiatica", "Colloidal Oatmeal"],
    benefits: [
      "Instantly calms irritation and tightness",
      "Reinforces lipid matrix for 72-hour moisture",
      "Dermatologist tested on sensitive skin"
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: "prod-04",
    name: "Pure Botanical Essence Cleanser",
    category: "cleansers",
    tagline: "Green Tea Extract, Niacinamide & Papaya Enzymes",
    description: "A gentle gel-to-milk cleanser that lifts impurities, makeup, and urban pollutants while keeping the delicate microflora balanced.",
    price: 75,
    rating: 4.7,
    reviewsCount: 82,
    sizes: [
      { label: "150ml", price: 75 }
    ],
    heroImage: "/assets/products/product_cleanser_hero.jpg",
    secondaryImage: "/assets/products/product_cleanser_texture.jpg",
    ingredients: ["Niacinamide (2%)", "Organic Green Tea Hydrosol", "Papaya Enzyme", "Chamomile"],
    benefits: [
      "Deeply purifies pores without stripping moisture",
      "Soothes sensitive skin barrier",
      "pH balanced at 5.5"
    ],
    inStock: true,
    isFeatured: false
  }
];
```

## 3. Cart State Management Model
- **Cart Item Object:** `{ productId, sizeLabel, unitPrice, quantity }`
- **Subtotal Calculation:** `sum(unitPrice * quantity)`
- **Free Shipping Threshold:** `$150.00`
- **Promo Code Engine:**
  - `ÉTHERIA10` -> 10% off entire order
  - `ROUTINE15` -> 15% off routine bundle
- **Local Persistence:** Syncs cart state with `localStorage` so items persist across page refreshes.
