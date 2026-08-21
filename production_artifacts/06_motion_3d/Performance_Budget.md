# Performance Budget: ÉTHERIA BOTANICALS

## 1. Quantitative Budgets
- **First Contentful Paint (FCP):** < 1.2s
- **Largest Contentful Paint (LCP):** < 2.2s
- **Interaction to Next Paint (INP):** < 100ms
- **Cumulative Layout Shift (CLS):** < 0.05
- **Total JavaScript Bundle Size:** < 180 KB (gzipped)
- **Total Image Assets per Viewport:** < 1.5 MB initial load

## 2. Animation Performance Controls
- Use `transform: translate3d()` and `opacity` exclusively for GSAP ScrollTrigger tweens.
- Limit max simultaneous `ScrollTrigger` instances active on screen to < 8.
- Capped image resolutions: Hero images max 1920px width, Product cards max 800px width.
- Enforce WebP format with 82% quality compression.
- Enable `prefers-reduced-motion` check before instantiating heavy scrub timelines.
