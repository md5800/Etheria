# Risk Register: ÉTHERIA BOTANICALS

| Risk ID | Description | Impact | Likelihood | Mitigation Strategy | Owner |
|---------|-------------|--------|------------|---------------------|-------|
| RISK-01 | Heavy GSAP animation causing scroll stutter / FPS drops on mobile devices | HIGH | MEDIUM | Implement lightweight mobile scroll triggers, disable multi-layer depth on viewports < 768px, enforce `will-change` optimization. | @parallax / @frontend |
| RISK-02 | Animation state interfering with cart add/remove state or checkout flow | HIGH | LOW | Maintain clear decoupled architecture: Commerce state managed in a pure JS module, UI triggers state updates via custom events. | @commerce |
| RISK-03 | Unoptimized large image assets slowing initial page render (LCP) | HIGH | MEDIUM | Pre-compress generated imagery to WebP/JPEG, set explicit width/height, lazy-load non-hero sections. | @imagegen / @frontend |
| RISK-04 | Accessibility failure due to scroll-pinned content obscuring screen readers or keyboard navigation | MEDIUM | LOW | Ensure all pinned containers maintain native DOM tab index order, provide skip links, and honor `prefers-reduced-motion`. | @qa / @frontend |
| RISK-05 | Visual clutter from background SVG lines overlapping product typography | MEDIUM | LOW | Calibrate stroke opacity (0.15 - 0.25), use subtle muted gold/cream hues, position SVG paths z-index behind text cards. | @ui / @brand |
