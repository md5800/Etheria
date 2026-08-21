# Motion & Parallax Specification

## 1. Reference Video Motion Language Analysis
- **Source:** `ref-video/reference-video.mp4`
- **Key Characteristics:**
  1. **Continuous Floating Background Lines:** Organic vector SVG line paths that scale/morph gently as scroll advances.
  2. **Multi-Velocity Parallax Cards:** Foreground product images scroll faster (`y: -80px`), midground image cards scroll at standard speed (`y: 0`), and background text cards move slower (`y: +40px`).
  3. **Pinned Texture Storytelling:** As user scrolls into the ingredient texture section, the section pins in viewport while left-hand text items fade/slide into active focus.
  4. **Smooth Text Reveals:** Serif headers clip-path slide up or fade up with subtle `y: 30` shift.
  5. **Rotating Badge Elements:** Circular badges rotate 360 degrees over 20s or directly linked to scroll progress.

## 2. Animation Registry & Implementation Mapping

### A. Background Organic Line Art Animation
- **Trigger:** Global scroll position or continuous GSAP loop.
- **Desktop Behavior:** SVG `<path>` stroke-dashoffset draw + subtle path morphing / parallax translation (`yPercent: -15`).
- **Mobile Fallback:** Static SVG stroke with subtle opacity pulse.
- **Reduced Motion:** Fully static SVG stroke with no scroll translation.

### B. Hero Intro Sequence
- **Trigger:** On page load.
- **Timeline:**
  1. Nav bar slide down (`y: -20` -> `0`, `opacity: 0` -> `1`, duration `0.8s`)
  2. Hero title letter reveal / clip reveal (`y: 40` -> `0`, `opacity: 0` -> `1`, duration `1.2s`, ease `power3.out`)
  3. Floating image card scale up (`scale: 0.9` -> `1`, `opacity: 0` -> `1`, duration `1.4s`)
  4. Badge rotation spin start (`rotation: 360`, duration `24s`, repeat `-1`, ease `none`)

### C. Staggered Parallax Cards (Brand & Product Reveal)
- **Trigger:** `ScrollTrigger` with `scrub: 1` or `scrub: 1.5`.
- **Desktop Behavior:** Cards float asynchronously along Y-axis based on `data-speed` attribute.
- **Mobile Fallback:** Standard fade-up animation (`scrub: false`, `toggleActions: "play none none reverse"`).

### D. Pinned Ingredient Texture Section
- **Trigger:** `ScrollTrigger` pinned container (`pin: true`, `end: "+=200%"`).
- **Behavior:** Step through 3 ingredient cards (Bio-Retinol, Alpine Rose, Copper Peptides) as scroll advances, updating active texture photo and description.
- **Mobile Fallback:** Unpinned standard vertical scroll cards.

## 3. Performance Budget & Optimizations
- **FPS Target:** Steady 60 FPS on desktop and modern mobile browsers.
- **GSAP Tweaks:** Use `force3D: true`, `will-change: transform`, avoid animating layout properties (`width`, `height`, `margin`, `top`, `left`).
- **ScrollTrigger Refresh:** Debounce window resize handlers to prevent layout recalculation churn.
