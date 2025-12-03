# Design Guidelines: Digital Soluctions Agency - Immersive Cosmic Luxury

## Design Approach
**System**: Custom glassmorphism with luxury cosmic aesthetic
**References**: Premium space/tech brands (Apple cosmic imagery, luxury watch sites, high-end tech agencies)
**Core Principle**: Depth through layering - cosmic backgrounds, parallax effects, frosted glass UI creating immersive experience

## Color Palette
- **Primary Accent**: Gold/Amber `#FFB84D`, `#D4AF37`
- **Backgrounds**: Deep space black `#0a0a0a`, midnight blue `#0d1117`, `#151922`
- **Glass Elements**: White/blue rgba with 0.08-0.15 opacity
- **Borders**: Gold with 0.2-0.3 opacity for glass cards
- **Text**: White primary, gold accents for CTAs/highlights
- **Glow Effects**: Soft golden halos on interactive elements

## Typography
**Font Family**: Poppins (Google Fonts)
- Hero Title: Bold 64-80px desktop / 36-44px mobile, subtle golden text-shadow
- Section Titles: Semibold 40-52px desktop / 30-36px mobile
- Subtitles: Regular 20-24px with letter-spacing
- Body: Regular 16-18px, line-height 1.7
- Accent Text: Medium weight with golden color

## Spacing System
Tailwind units: `2, 4, 6, 8, 12, 16, 20, 24, 32`
- Section padding: `py-20` to `py-32` desktop, `py-16` mobile
- Card gaps: `gap-8`
- Container max-width: `1440px`

## Background System

### Cosmic Layer Stack (bottom to top):
1. **Base**: Deep gradient (midnight blue to black)
2. **Stars Field**: Animated parallax stars (3 layers - small/medium/large at different speeds)
3. **Bokeh Particles**: Floating golden orbs with blur, gentle drift animation
4. **Noise Texture**: Subtle grain overlay (5-8% opacity) for depth
5. **Lens Flares**: Strategic golden flares on hero and key sections
6. **Content Layer**: Glassmorphism UI components

## Hero Section
- Full viewport height (100vh)
- **Background Image**: High-resolution cosmic nebula/galaxy imagery (deep blues, purples, blacks with scattered stars)
- Layered effects: stars parallax, bokeh particles, subtle bloom on bright star clusters
- Centered content layout with max-width container
- Large hero headline with golden highlighted word
- Subtitle with premium positioning statement
- Dual CTAs with blurred glass backgrounds (no hover states - buttons handle their own)
- Statistics row: 4 glass cards with golden borders, floating animation
- Scroll indicator with golden accent

## Layout Sections

### Services Grid (11 services)
- 3 columns desktop, 2 tablet, 1 mobile
- Glass cards: frosted background, golden border (0.2 opacity), 16px radius
- Font Awesome icons (golden color, 28px)
- Shine sweep animation on hover (diagonal gradient sweep)
- Floating motion: subtle up/down oscillation on idle

### Soluções Completas
- 2-column asymmetric layout (40/60 split)
- Left: Abstract geometric illustration or cosmic imagery
- Right: Glass container with checklist items (golden checkmarks)
- Scale-in animation on viewport entry

### Benefits Section (Por que escolher)
- 3-column grid with glass benefit cards
- Each card: golden icon, title, description
- Staggered entrance animations (cascade effect)
- Subtle bloom glow on card hover

### Processo de Trabalho
- Horizontal timeline with connecting golden lines (desktop)
- 7 steps in glass containers with numbered badges
- Parallax effect: steps move at different speeds on scroll
- Active step highlighted with stronger golden glow

### Contact Section
- Centered glass card with golden border glow
- WhatsApp button (green `#25D366`) + Email (golden)
- Both with blurred backgrounds for placement on cosmic background
- Contact details in grid below

### Footer
- Dark cosmic background continuation
- 3-column layout: Brand/About | Quick Links | Social
- Social icons with golden hover glow
- Subtle stars animation continues

## Glass Components

### Card Specifications
```
Background: rgba(255, 255, 255, 0.08)
Backdrop-filter: blur(16px) saturate(180%)
Border: 1px solid rgba(212, 175, 55, 0.25)
Border-radius: 16-20px
Padding: 28-36px
Box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4)
```

### Buttons
- **Primary**: Golden fill with white text, soft glow shadow
- **Secondary**: Glass background with golden border/text
- **On Images**: Add backdrop-blur(12px) to button background
- Shine sweep on hover (diagonal golden gradient pass)
- Subtle scale transform (1.02)

## Animations & Effects

### Parallax Implementation
- Stars: 3 layers moving at 0.3x, 0.5x, 0.7x scroll speed
- Section backgrounds: Slight movement opposite to scroll
- Cards: Transform-3D perspective on scroll

### Floating Animations
- Bokeh particles: Random drift paths, 8-15s duration
- Service cards: Gentle vertical oscillation (±8px), 4-6s loops
- Statistics: Continuous subtle float with different timing

### Entrance Animations
- Fade-up with scale (0.95 → 1.0) over 600ms
- Stagger delay: 150ms between elements
- Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)

### Shine Sweep
- Diagonal gradient overlay (-45deg)
- Duration: 800ms, triggered on hover
- Golden to transparent gradient
- Applied to cards and buttons

## Images

### Hero Background
Large cosmic imagery (3000x2000px recommended): Deep space scene with nebula, scattered stars, galaxy elements. Dark blues, purples, blacks dominate with hints of golden starlight. Should feel premium and vast.

### Section Accents
Optional abstract tech/geometric illustrations for "Soluções Completas" - metallic/golden tones on dark backgrounds.

## Technical Effects
- **Bloom**: Gaussian blur on golden elements, overlay blend
- **Lens Flares**: SVG or CSS-based golden star bursts (4-6 points)
- **Noise Texture**: CSS grain filter or PNG overlay at 6% opacity
- **Parallax**: Transform3D with smooth transitions
- All animations use GPU acceleration (transform/opacity only)

## Responsive Behavior
- Mobile: Reduce parallax intensity, disable some particle effects for performance
- Tablet: Maintain core effects, simplify bokeh count
- Desktop: Full visual treatment with all layers

## Accessibility
- Sufficient contrast: golden text on dark backgrounds meets WCAG AA
- Focus states: golden outline with blur shadow
- Reduced motion media query: disable parallax/floating for users preferring reduced motion
- Semantic structure maintained despite visual complexity