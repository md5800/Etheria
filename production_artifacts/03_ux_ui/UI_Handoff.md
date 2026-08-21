# UI Handoff Specification

## 1. Design System Tokens

### Color Matrix
```css
:root {
  --bg-primary: #FBF9F5;
  --bg-secondary: #161B18;
  --bg-card: #FFFFFF;
  --text-primary: #19221C;
  --text-muted: #78746D;
  --text-light: #FBF9F5;
  --accent-gold: #C5A059;
  --accent-gold-hover: #A8833E;
  --border-light: rgba(25, 34, 28, 0.08);
  --border-gold: rgba(197, 160, 89, 0.3);
  --glass-bg: rgba(251, 249, 245, 0.82);
  --glass-border: rgba(255, 255, 255, 0.5);
  --shadow-soft: 0 20px 40px -15px rgba(25, 34, 28, 0.07);
  --shadow-hover: 0 30px 60px -20px rgba(25, 34, 28, 0.15);
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;
  --font-serif: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
}
```

## 2. Layout Structure & Grid
- **Container Max-Width:** 1360px with 5% horizontal padding on desktop, 20px on mobile.
- **Header:** Sticky transparent glass navigation (height 80px) with logo, navigation links, routine quiz trigger, search, cart toggle.
- **Section Spacing:** 120px padding top/bottom on desktop, 64px on mobile.

## 3. Core Component Designs

### A. Editorial Hero
- Left column: High-impact typography with serif title, subtitle, CTA button group ("EXPLORE COLLECTION", "TAKE SKIN DIAGNOSTIC").
- Right column: Staggered image container with floating background SVG organic curves, layered primary bottle shot, and rotating circular text badge ("ÉTHERIA BOTANICALS • CELLULAR SCIENCE").

### B. Parallax Brand Grid
- 2-column asymmetric layout where images on the left scroll at `speed: 0.8` and right cards scroll at `speed: 1.2`.
- Floating text captions with clean serif headings ("BOTANICAL PURITY", "CELLULAR RENEWAL").

### C. Ingredient Texture Pinning
- Pinned container with left-hand texture selector tab (Bio-Retinol, Alpine Rose, Copper Peptides, Snow Mushroom).
- Right-hand image cross-fade and formula breakdown cards.

### D. Interactive Product Grid & Cards
- 3 to 4 column responsive grid.
- Product card components:
  - Image frame with subtle zoom effect on hover
  - Category pill badge
  - Product Name in serif
  - Short benefit subtitle
  - Price & Size (e.g. `$145 / 50ml`)
  - Variant pills (30ml, 50ml)
  - Quick View Button (triggers modal) & Add to Cart Button (instant state update)

### E. Slide-over Cart Drawer
- Fixed right drawer (width 450px desktop, 100% mobile).
- Header with item counter & close button.
- Cart item list with thumbnail, title, selected size, quantity modifier (`-` / `+`), remove button.
- Free shipping progress bar (e.g., "$150 for Free Shipping").
- Order summary with subtotal, tax estimate, shipping estimate, total.
- Interactive Promo Code input field.
- Checkout button simulating secure checkout modal.

### F. Skincare Routine Builder Drawer
- Step 1: Skin Concern (Hydration, Anti-Aging, Radiance, Barrier Repair).
- Step 2: Preferred Texture (Light Serum, Rich Cream, Luxurious Oil).
- Step 3: Curated 3-Step Routine Bundle with 15% discount and "Add Entire Routine to Cart" CTA.
