# Softgoway Website — Complete Audit & Enhancement Plan

> Generated: Phase 2 — Architectural analysis, gap identification, and prioritized remediation plan.
> No code changes made. This document is the sole deliverable.

---

## Table of Contents

1. [Current Architecture](#1-current-architecture)
2. [Missing Elements Inventory](#2-missing-elements-inventory)
3. [Enhancement Plans](#3-enhancement-plans)
   - [P0 — Critical Fixes](#p0--critical-fixes)
   - [P1 — High-Impact Improvements](#p1--high-impact-improvements)
   - [P2 — Design System Hardening](#p2--design-system-hardening)
   - [P3 — Future-Phase Additions](#p3--future-phase-additions)
4. [Implementation Ordering](#4-implementation-ordering)

---

## 1. Current Architecture

### 1.1 Tech Stack

| Layer | Current Choice | Notes |
|-------|---------------|-------|
| Framework | React 19 + Vite 8 | Hash-based SPA routing (custom `useState` + `window.location.hash`) |
| Styling | Tailwind v4 + Custom CSS | Three CSS entry points: `styles/theme.css`, `styles/globals.css`, `src/styles/globals.css` |
| Animation | Framer Motion 12 + GSAP 3 + Lenis | Three concurrent animation systems with overlapping responsibilities |
| 3D | Three.js + @react-three/fiber + @react-three/drei | 6 `<Canvas>` instances — one per section (Hero, About, Services, Process, Technologies, Footer) |
| Icons | lucide-react + custom SVG components | Inconsistent source; WorkSection uses emoji characters (🔍🎨⚙️🚀🛡️) |
| Forms | react-hook-form + zod | Only implemented on Hire page. Contact form uses `setTimeout` placeholder |
| Routing | `useState<'home' | 'services' | 'service-detail' | 'careers'>` | No React Router. No history API. No 404 handling |
| State | React Context (theme), local state (routing, forms) | No global state library |

### 1.2 File Structure

```
sgw-website/
└── SGW-Website/
    ├── index.html                  # Entry point. Theme script. Google Fonts.
    ├── package.json                # 65+ dependencies, 40+ unused Radix UI packages
    ├── vite.config.ts
    ├── tsconfig.json / tsconfig.node.json
    ├── postcss.config.mjs
    ├── styles/
    │   ├── theme.css               # Central theme tokens (204 lines)
    │   └── globals.css             # Tailwind import + theme mapping (125 lines)
    ├── src/
    │   ├── main.tsx                # React root
    │   ├── App.tsx                 # Routing + layout + CursorGlow + SectionDivider
    │   ├── styles/
    │   │   ├── globals.css         # DUPLICATE — imports theme.css again, adds glass/gradient/animations (903 lines)
    │   │   └── hero.css            # Standalone CSS utilities, mostly unused (543 lines)
    │   ├── pages/
    │   │   ├── ServicesPage.tsx     # Searchable service list (198 lines)
    │   │   ├── ServiceDetailPage.tsx # Features/benefits/tech/CTA (319 lines)
    │   │   └── HirePage.tsx         # Job listings + apply modal (739 lines)
    │   ├── sections/
    │   │   ├── Hero.tsx             # Full-screen hero with stats (251 lines)
    │   │   ├── About.tsx            # Mission/Vision/Values (512 lines)
    │   │   ├── Services.tsx         # Home page service grid (161 lines)
    │   │   ├── Process.tsx          # Timeline with 6 steps (329 lines)
    │   │   ├── Technologies.tsx     # Filterable tech grid (236 lines)
    │   │   ├── Portfolio.tsx        # Horizontal scroll projects (464 lines)
    │   │   ├── Testimonials.tsx     # Carousel with 5 entries (292 lines)
    │   │   ├── Worksection.tsx      # Process + Why Us (520 lines)
    │   │   ├── Contact.tsx          # Form + contact info (418 lines)
    │   │   └── Footer.tsx           # Multi-column footer (327 lines)
    │   ├── components/
    │   │   ├── Navbar.tsx           # Fixed nav + mobile drawer (329 lines)
    │   │   ├── GlowButton.tsx       # Magnetic button with 3 variants (236 lines)
    │   │   ├── AnimatedSection.tsx  # Scroll-triggered reveal wrapper (166 lines)
    │   │   ├── TextReveal.tsx       # Word/char/line animation (355 lines)
    │   │   ├── TiltCard.tsx         # 3D tilt + glow card (206 lines)
    │   │   ├── Scene3D.tsx          # Hero 3D background (362 lines)
    │   │   ├── Section3D.tsx        # Per-section 3D backgrounds (570 lines)
    │   │   ├── ScrollProgress.tsx   # Top bar + side indicator (245 lines)
    │   │   └── LoadingScreen.tsx    # Full-screen loader (347 lines)
    │   ├── hooks/
    │   │   ├── useTheme.tsx         # Theme context (289 lines)
    │   │   ├── useLenis.tsx         # Smooth scroll singleton (47 lines)
    │   │   ├── useScrollProgress.tsx # Scroll % hook (67 lines)
    │   │   └── useCounter.ts        # Number animation (58 lines)
    │   ├── data/
    │   │   ├── services.ts          # 12 services (333 lines)
    │   │   └── hire.ts              # 12 job positions (266 lines)
    │   └── lib/
    │       └── utils.ts             # cn() helper (6 lines)
    └── public/
        ├── favicon.svg
        ├── logo_dark.png
        └── logo_light.png
```

### 1.3 Routing Map

```
#home           → App (Hero → About → Services → Process → Technologies →
                   Portfolio → Testimonials → WorkSection → Contact + Footer)
#services       → ServicesPage (search/filter + list)
#service/:id    → ServiceDetailPage (features/benefits/tech/CTA)
#careers        → HirePage (job list + apply modal)
```

### 1.4 Section Dependencies

```
App
├── ThemeProvider (useTheme)
│   └── AppContent
│       ├── LoadingScreen
│       ├── CursorGlow
│       ├── ScrollProgress
│       ├── Navbar
│       └── main (AnimatePresence routing)
│           ├── home → Hero, About (Section3D), Services (Section3D), Process (Section3D),
│           │          Technologies (Section3D), Portfolio, Testimonials, WorkSection, Contact
│           ├── services → ServicesPage
│           ├── service-detail → ServiceDetailPage
│           └── careers → HirePage
│       └── Footer (home only)
```

### 1.5 Current Visual Patterns (per section)

| Section | Pattern | Notes |
|---------|---------|-------|
| All | Section badge: `px-5 py-2 text-sm rounded-full bg-primary/10 border border-primary/20` | Identical pattern, copy-pasted 10+ times |
| All | Ambient blobs: `position: absolute; width: 600px; height: 600px; border-radius: full; blur: 150px; opacity: 0.05` | Each section has 2-3 of these |
| All | Entry animations: `initial={{opacity:0, y:30}} animate={isInView ? {opacity:1, y:0} : {}}` | Standardized but verbose |
| All | Section3D: per-section `<Canvas>` with unique geometry | 6 canvases, each with `frameloop="always"` |
| Services (home) | Gradient block cards, 4-column grid | `from-{color}-600 to-{color}-600` — hardcoded |
| Process | Alternating timeline with GSAP scrub line | Desktop-only, mobile falls to single column |
| Portfolio | GSAP horizontal scroll with pinning | Complex, zero mobile UX, Unsplash images |
| Testimonials | Spring carousel with auto-advance | Hardcoded height container, initials-only avatars |
| Technologies | Filterable grid with first-letter avatars | Generic, found on every agency site |
| WorkSection | Emoji icons + interactive flow diagram | Emojis feel unprofessional |
| Contact | Form + contact info in 2-column layout | Form has no real API (setTimeout placeholder) |
| Footer | 4-column + newsletter signup | Only shown on home page |

---

## 2. Missing Elements Inventory

### 2.1 Enterprise-Level Sections (not present)

| Element | Impact | Priority |
|---------|--------|----------|
| **Client Logos / Social Proof Bar** | Trust signal for enterprise buyers | P1 |
| **Case Studies (real, with metrics)** | Conversion driver, replaces placeholder portfolio | P1 |
| **Pricing / Engagement Models** | Reduces friction, qualifies leads | P1 |
| **Team Page (engineer profiles)** | Humanizes the brand, developer credibility | P1 |
| **FAQ Section** | Addresses objections, SEO value | P1 |
| **Partner Certifications (AWS, Azure, etc.)** | Credibility for infrastructure work | P2 |
| **Company Timeline / History** | Establishes longevity and experience | P2 |
| **Blog / Resources** | SEO, thought leadership, developer branding | P2 |
| **Comparison vs. Competitors / Alternatives** | Helps decision-makers evaluate | P3 |
| **Open Source Contributions** | Developer community credibility | P3 |

### 2.2 Trust & Credibility Gaps

- **No client logos** — only 5 textual names in testimonials
- **No photo avatars** — testimonials use initials (`SJ`, `MC`, `ER`, `DP`, `LT`)
- **No real case studies** — portfolio uses Unsplash stock photos with dead links (`#`)
- **No company registration details** — no GST/TIN, no incorporation number, no physical address
- **No team credentials** — no LinkedIn profiles, GitHub profiles, or engineer bios
- **No social proof widgets** — no Clutch/GoodFirms badges, no G2 reviews
- **No media mentions** — no "As featured in" logos
- **No privacy policy or terms of service pages** — links exist in footer but go nowhere

### 2.3 Conversion Path Gaps

| Gap | Current State |
|-----|---------------|
| Contact form submission | `// TODO: replace with real API call` — non-functional |
| Demo / discovery call booking | No scheduling link (Calendly, etc.) |
| Project brief submission | No structured intake form |
| Pricing transparency | No pricing page or range indicators |
| Live chat | Not present |
| Post-submission nurture | No auto-reply, no confirmation, no follow-up sequence |
| Multi-step CTAs | All CTAs go to `#contact` — no funnel |
| Secondary conversions | Newsletter signup in footer has no backend |

### 2.4 Developer Branding Gaps

- No technical blog or engineering content
- No GitHub organization profile linked
- No npm packages or open source projects referenced
- No Stack Overflow / dev community presence
- No conference talks or meetup appearances
- No tech stack justification — "Tools we ship with" lists names without expertise depth
- No code samples or architecture diagrams in service descriptions
- No mention of engineering culture, code reviews, testing practices

### 2.5 Hiring / Employer Branding Gaps

- No salary ranges on any position
- No benefits or perks list
- No remote work policy details
- No team photos or office tour
- No employee testimonials or day-in-the-life content
- No diversity, equity, inclusion statement
- No career progression framework
- "Work With The Best Developers" hero — aspirational but unsupported

### 2.6 Technical Debt Inventory

| Issue | Location | Detail |
|-------|----------|--------|
| Duplicate `globals.css` | `styles/globals.css` + `src/styles/globals.css` | Both import `theme.css`, conflicting variable definitions |
| Broken CSS variable | `hero.css:19` | `rgba(var(--color-primary-rgb), 0.4)` — `--color-primary-rgb` never defined |
| Undefined CSS variable | `theme.css:167` | `--gradient-primary-secondary` used but not defined |
| Undefined CSS variable | `theme.css:141-142` | `--brand-green-bright` and `--brand-blue-bright` used in `.dark` but never defined in `:root` |
| Circular CSS variable | `src/styles/globals.css:25` | `--color-primary: var(--color-primary)` |
| Dead CSS file | `src/styles/hero.css` | 543 lines, most classes unused in components |
| Contact form non-functional | `Contact.tsx:76-77` | `await new Promise((resolve) => setTimeout(resolve, 1500))` — placeholder |
| Dead portfolio links | `Portfolio.tsx:21-78` | All `liveUrl: '#'` and `repoUrl: '#'` |
| Unused dependencies | `package.json` | 40+ Radix UI packages, `next`, `next-themes`, `cmdk`, `vaul`, `recharts`, `date-fns`, `input-otp`, `sonner`, `embla-carousel-react`, `react-day-picker`, `react-resizable-panels` — none directly imported |
| Missing footer on sub-pages | `App.tsx:214` | Footer conditionally rendered: `{currentPage === 'home' && <Footer />}` |
| Emoji icons in professional context | `Worksection.tsx:49-78` | `🔍🎨⚙️🚀🛡️` — emoji characters used as step icons |
| GSAP + Framer Motion overlap | Multiple sections | Both libraries animate opacity/position on same elements |
| 6 Three.js canvases | All sections | Each `<Section3D>` mounts a full `<Canvas>` with `frameloop="always"` |
| No prefers-reduced-motion | JS components | Only CSS has `@media (prefers-reduced-motion: reduce)` — components don't check |
| CSS variable naming inconsistency | `ServicesPage.tsx` | Uses `text-text-secondary`, `text-text-muted`, `bg-surface` — these don't match `theme.css` tokens (`--text-secondary`, `--text-muted`, `--surface`) |
| Hash routing is fragile | `App.tsx:83-104` | No URL param parsing, no 404, no history state |

---

## 3. Enhancement Plans

### P0 — Critical Fixes (Must fix before any redesign work)

#### P0.1 — Contact Form API Integration

**Current:** `Contact.tsx:76-77` — placeholder `setTimeout`, no actual API call.

**Plan:**
1. Create `src/lib/api.ts` with a `submitContactForm(data)` function
2. Implement serverless function or route handler (Vercel function, Web3Forms, Formspree, or custom API)
3. Add Zod schema for form validation matching `react-hook-form`
4. Add reCAPTCHA v3 or Turnstile integration
5. Add error state handling, retry logic, and success confirmation
6. Add auto-reply email trigger (via Resend, SendGrid, or similar)

**Files affected:** `Contact.tsx`, new `src/lib/api.ts`

---

#### P0.2 — Fix Dead Portfolio Links

**Current:** All 6 projects have `liveUrl: '#'` and `repoUrl: '#'` — clickable buttons that go nowhere.

**Plan:**
1. Either provide real URLs, or
2. Remove the ExternalLink/GitHub overlay buttons entirely, or
3. Replace with real case study content (see P1.6)

**Files affected:** `Portfolio.tsx` and the `projects` data array within it.

---

#### P0.3 — Define Missing CSS Variable `--color-primary-rgb`

**Current:** `hero.css` and `globals.css` reference `rgba(var(--color-primary-rgb), ...)` but the variable is never defined.

**Plan:**
1. In `styles/theme.css`, add:
   ```css
   --color-primary-rgb: 31 174 59;   /* #1FAE3B decomposed */
   --color-accent-rgb: 21 101 216;   /* #1565D8 decomposed */
   --color-background-rgb: 248 250 252;
   --color-foreground-rgb: 15 23 42;
   ```
2. Dark mode overrides for the same variables
3. Alternatively, rewrite all `rgba(var(--color-X-rgb), N)` to use `color-mix(in oklab, var(--color-X) N%, transparent)`

**Files affected:** `styles/theme.css`, optionally `hero.css` and `globals.css`

---

#### P0.4 — Fix Circular CSS Variable

**Current:** `src/styles/globals.css:25`: `--color-primary: var(--color-primary)` (points to itself).

**Plan:**
1. Change to reference the theme token correctly: `--color-primary: var(--primary)` (from `theme.css`)
   Or simply `@apply` the Tailwind `@theme inline` mapping correctly.
2. Audit all `--color-*` variables in the file for similar issues

**Files affected:** `src/styles/globals.css`

---

#### P0.5 — Footer on All Pages

**Current:** `App.tsx:214` — `{currentPage === 'home' && <Footer />}` hides footer on services, service-detail, and careers pages.

**Plan:**
1. Remove the conditional and always render Footer
2. Optionally, add a `minimal` prop to Footer for sub-pages that hides the top CTA strip

**Files affected:** `App.tsx`, optionally `Footer.tsx`

---

### P1 — High-Impact Improvements

#### P1.1 — Client Logos / Social Proof Bar

**Current:** No recognizable client names or logos anywhere on the site.

**Plan:**
Create a new reusable `<ClientLogos />` component:
- Position: After Hero or before Services on home page
- Layout: Row of grayscale logos, color on hover
- Content: 6-12 client logos (NDA-safe or public)
- Animation: Framer Motion fade-in with staggered delay
- Design: `py-16` section with subtle top/bottom border, centered heading "Trusted by teams building at scale"
- Mobile: 3-column grid, logos centered

**New file:** `src/sections/ClientLogos.tsx`

---

#### P1.2 — Real Case Studies (replace placeholder portfolio)

**Current:** 6 projects with Unsplash images and `#` links.

**Plan:**
Replace `Portfolio.tsx` with a proper case study section:
- 3-4 real projects with:
  - Client name + logo
  - Problem statement (2-3 sentences)
  - Solution architecture (simplified diagram or technical bullets)
  - Results with metrics (e.g., "40% faster load time", "99.9% uptime")
  - Technologies used (with brand-colored tags)
  - Live link + case study link
- Layout: Vertical card stack (not horizontal scroll) for mobile compatibility
- Remove GSAP horizontal scroll — use Framer Motion stagger instead
- Each card opens a modal or navigates to a full case study page

**Files affected:** `Portfolio.tsx`, new `src/pages/CaseStudyPage.tsx`

---

#### P1.3 — Consistent Brand Color Usage

**Current:** Services use hardcoded Tailwind gradient classes (`from-blue-600 to-indigo-600`). Button variants hardcode green/blue. Theme.css brand colors (`--brand-green-primary: #1FAE3B`, `--brand-blue-primary: #1565D8`) are largely unused.

**Plan:**
1. Map brand colors to Tailwind v4 `@theme`:
   ```css
   @theme {
     --color-brand-green: #1FAE3B;
     --color-brand-green-light: #67E06F;
     --color-brand-blue: #1565D8;
     --color-brand-blue-light: #22A6F2;
     --color-brand-yellow: #F6C62F;
     --color-brand-red: #E53935;
   }
   ```
2. Replace hardcoded gradient classes with semantic gradient utilities (e.g., `bg-gradient-brand`)
3. Standardize service card gradients to use brand spectrum, not random Tailwind colors
4. Update `GlowButton.tsx` variants to reference brand variables

**Files affected:** `styles/theme.css`, `src/styles/globals.css`, `data/services.ts`, `GlowButton.tsx`

---

#### P1.4 — Remove Emoji Icons from WorkSection

**Current:** `Worksection.tsx:49-78` uses emoji characters `🔍🎨⚙️🚀🛡️` as step icons.

**Plan:**
Replace with lucide-react icons or custom SVG icons:
- `🔍` → `Search`
- `🎨` → `Palette`
- `⚙️` → `Settings2`
- `🚀` → `Rocket`
- `🛡️` → `Shield`

**Files affected:** `Worksection.tsx`

---

#### P1.5 — Reduce 3D Canvas Count (Lazy Loading)

**Current:** 6 `<Canvas>` instances mount simultaneously — all with `frameloop="always"` — causing significant GPU load.

**Plan:**
1. Implement `VisibilityBasedRenderer` wrapper around each `<Section3D>`:
   - Use `IntersectionObserver` (already partially done via `ScenePauser`)
   - Only render `<Canvas>` when section enters viewport
   - Destroy/dispose when section leaves viewport
2. Reduce particle counts on section-specific scenes:
   - `AboutParticles`: 300 → 150
   - `TechGrid`: 36 boxes → 20
3. Use lower DPR on all scenes (currently 1.5 max → 1.25)
4. Consider consolidating to a single shared canvas if all scenes never overlap

**Files affected:** `Section3D.tsx`, `Scene3D.tsx`

---

#### P1.6 — Add Pricing / Engagement Models

**Current:** No pricing information anywhere. Visitors cannot evaluate cost fit without contacting.

**Plan:**
Create a new `<Pricing />` section or page:
- 3-4 engagement tiers (e.g., "Team Extension", "Project-Based", "Managed Product", "Advisory Retainer")
- Each tier shows:
  - What's included (team composition, delivery cadence)
  - Starting price range (e.g., "From $XXk/month")
  - Typical timeline
  - Best for (use case match)
- CTA per tier: "Book a discovery call"
- Design: 3-column card layout with highlighted "Most popular" middle card

**New file:** `src/sections/Pricing.tsx` or `src/pages/PricingPage.tsx`

---

#### P1.7 — Team Page with Engineer Profiles

**Current:** No team page. No engineer credibility.

**Plan:**
Create `<Team />` section or dedicated page:
- Grid of team members with:
  - Photo
  - Name + role
  - 2-3 sentence bio with expertise areas
  - LinkedIn / GitHub / Twitter links
  - Key technologies (tag pills)
- Animated entrance per card
- "We're growing" CTA linking to careers

**New file:** `src/sections/Team.tsx`

---

#### P1.8 — Add Scheduling Integration

**Current:** No direct booking path. All CTAs go to `#contact`.

**Plan:**
1. Integrate Calendly (or equivalent) embed
2. Add "Book a free consultation" CTA with inline calendar widget
3. In Contact form, add "Prefer a quick call?" option that opens scheduling
4. Place scheduling widget strategically:
   - After portfolio section
   - In pricing section
   - In footer

**Files affected:** `Contact.tsx`, new scheduling integration component

---

#### P1.9 — Fix Testimonial Presentation

**Current:** 5 entries, initials-only avatars, hardcoded height, no company logos.

**Plan:**
1. Replace initials with actual photo avatars (or gradient placeholder circles with brand colors)
2. Add company name + company logo per testimonial
3. Remove hardcoded container height — use min-height with auto-expansion
4. Add rating stars (already present) but make them interactive-feeling
5. Add "Read more" link for longer testimonials
6. Add LinkedIn recommendation embed or attribution link

**Files affected:** `Testimonials.tsx`

---

#### P1.10 — Add FAQ Section

**Current:** No FAQ. Common objections are not addressed.

**Plan:**
Create `<FAQ />` section using accordion pattern:
- 8-12 questions covering:
  - Engagement model questions (how do we start, minimum commitment)
  - Technical questions (how do you ensure quality, what stacks)
  - Business questions (IP ownership, NDAs, pricing)
  - Logistics (time zones, communication, tools)
- Design: centered, max-w-3xl, smooth open/close animation
- Schema.org FAQ structured data for SEO

**New file:** `src/sections/FAQ.tsx`

---

### P2 — Design System Hardening

#### P2.1 — Consolidate to Single `globals.css`

**Current:** Two `globals.css` files with overlapping definitions.

**Plan:**
1. Delete `src/styles/globals.css` (903 lines)
2. Move all necessary definitions into `styles/globals.css`
3. Move glass, gradient-text, glow classes from `src/styles/hero.css` into `styles/globals.css` if used by components
4. Delete `src/styles/hero.css` (543 lines) — or merge used utilities

**Files affected:** `styles/globals.css`, `src/styles/globals.css` (deleted), `src/styles/hero.css` (deleted/merged)

---

#### P2.2 — Standardize Section Spacing

**Current:** Sections use arbitrary spacing: `py-24`, `py-28`, `py-32`, `py-24 lg:py-32`, `py-28 lg:py-40`.

**Plan:**
Create a spacing scale in `@theme`:
```css
@theme {
  --section-py-sm: 4rem;     /* py-16 */
  --section-py-md: 6rem;     /* py-24 */
  --section-py-lg: 8rem;     /* py-32 */
}
```
Apply consistently:
- Home sections: `py-section-lg` (8rem desktop, 6rem mobile)
- Sub-page sections: `py-section-md`
- Tight sections (FAQ, CTAs): `py-section-sm`

**Files affected:** All section files, `styles/globals.css`

---

#### P2.3 — Create Component Library from Repeated Patterns

**Current patterns repeated 10+ times:**
- Section badge: `px-5 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full mb-6 border border-primary/20`
- Section heading: `text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-heading)] mb-6 text-balance`
- Ambient blobs: absolute positioned blur containers

**Plan:**
Create reusable components:
- `<SectionHeader label="..." title="..." subtitle="..." />` — wraps badge + h2 + p
- `<SectionWrapper id="..." className="...">` — standard section padding + background + Section3D
- `<AmbientBlobs count={2} />` — standardized blur blobs

**New files:** `src/components/Section.tsx`, `src/components/SectionHeader.tsx`

---

#### P2.4 — Remove Unused Dependencies

**Current:** 65+ npm packages. ~40 are unused shadcn/ui Radix packages.

**Plan:**
Remove from `package.json`:
- All `@radix-ui/*` packages not directly imported (keep only `@radix-ui/react-slot` and `@radix-ui/react-accordion` if used)
- `next`, `next-themes` (Vite project)
- `cmdk`, `vaul`, `recharts`, `date-fns`, `input-otp`, `sonner`, `embla-carousel-react`, `react-day-picker`, `react-resizable-panels`, `autoprefixer`

**Files affected:** `package.json`

---

#### P2.5 — Document Typography Scale

**Current:** Inline heading sizes per section. No fluid type system.

**Plan:**
Define in `@theme`:
```css
@theme {
  --text-display: 4.5rem;     /* 72px — hero headings */
  --text-display-md: 3.5rem;  /* 56px — section headings */
  --text-title: 2.25rem;      /* 36px — card headings */
  --text-body: 1.125rem;      /* 18px — body text */
  --text-caption: 0.875rem;   /* 14px — labels */
  --text-micro: 0.75rem;      /* 12px — badges */
}
```
Apply as utility classes or Tailwind theme extensions.

**Files affected:** `styles/globals.css`

---

#### P2.6 — Fix CSS Variable Naming Inconsistency in Pages

**Current:** `ServicesPage.tsx` and `HirePage.tsx` use classes like `text-text-secondary`, `text-text-muted`, `bg-surface` — these do not match the CSS variable names defined in `theme.css` (`--text-secondary`, `--text-muted`, `--surface`).

**Plan:**
1. Either add the missing Token CSS classes to `theme.css`, or
2. Replace all `text-text-secondary` with Tailwind's `text-muted-foreground` (already available from `@theme inline`)
3. Replace `bg-surface` with `bg-card` or `bg-secondary`

**Files affected:** `ServicesPage.tsx`, `HirePage.tsx`, `ServiceDetailPage.tsx`

---

### P3 — Future-Phase Additions

#### P3.1 — Blog / Resources Section

Add technical blog with:
- Engineering posts (case studies, architecture deep-dives, tutorials)
- Company posts (hiring, culture, product updates)
- RSS feed, search, categories

#### P3.2 — Open Source / GitHub Integration

- Show GitHub organization stats (public repos, stars, contributors)
- Embed contribution activity graph
- Link to open source projects built by the team

#### P3.3 — Interactive Product Demos

- Replace static service descriptions with interactive product tours
- Embed video walkthroughs or Lottie animations showing real platforms

#### P3.4 — Comparison / Alternatives Page

- "Softgoway vs. In-house" — cost/risk comparison
- "Softgoway vs. Agency" — quality/continuity comparison
- "Softgoway vs. Freelancers" — reliability/scalability comparison

#### P3.5 — Multi-language Support

- Japanese market (based on current SGW positioning)
- i18n infrastructure with react-i18next or similar

#### P3.6 — A/B Testing Infrastructure

- Add ability to swap hero sections, CTAs, and pricing display
- Analytics integration to measure conversion improvements

---

## 4. Implementation Ordering

### Phase A — Stabilize (Week 1)

| Order | Item | Effort | Impact |
|-------|------|--------|--------|
| 1 | P0.5 — Footer on all pages | 30 min | High (UX completeness) |
| 2 | P0.2 — Fix/remove dead links | 1 hr | High (credibility) |
| 3 | P0.3 — Define missing CSS variables | 1 hr | High (fixes broken glass/glow effects) |
| 4 | P0.4 — Fix circular CSS variable | 30 min | Medium (prevents theme bugs) |
| 5 | P2.4 — Remove unused dependencies | 30 min | Medium (cleanup) |
| 6 | P2.6 — Fix CSS class names in pages | 1 hr | Medium (page theming) |

### Phase B — Core Improvements (Week 2-3)

| Order | Item | Effort | Impact |
|-------|------|--------|--------|
| 7 | P0.1 — Contact form API | 4-8 hr | Critical (conversion) |
| 8 | P2.1 — Consolidate globals.css | 4 hr | High (maintainability) |
| 9 | P1.3 — Consistent brand colors | 6 hr | High (visual quality) |
| 10 | P1.4 — Remove emoji icons | 1 hr | Medium (professionalism) |
| 11 | P1.5 — Lazy-load 3D scenes | 8 hr | High (performance) |
| 12 | P2.2 — Standardize section spacing | 3 hr | Medium (consistency) |

### Phase C — Content & Trust (Week 3-4)

| Order | Item | Effort | Impact |
|-------|------|--------|--------|
| 13 | P1.1 — Client logos bar | 4 hr | High (trust) |
| 14 | P1.2 — Real case studies | 16+ hr | Very High (conversion) |
| 15 | P1.9 — Testimonial improvements | 4 hr | Medium (trust) |
| 16 | P1.10 — FAQ section | 8 hr | Medium (SEO + conversion) |

### Phase D — Conversion & Revenue (Week 4-5)

| Order | Item | Effort | Impact |
|-------|------|--------|--------|
| 17 | P1.6 — Pricing / engagement models | 12 hr | Very High (conversion) |
| 18 | P1.8 — Scheduling integration | 4 hr | High (conversion) |
| 19 | P1.7 — Team page | 8 hr | Medium (trust + hiring) |

### Phase E — Long-term (Week 5+)

| Order | Item | Effort |
|-------|------|--------|
| 20 | P2.3 — Component library extraction | 16 hr |
| 21 | P2.5 — Typography scale | 4 hr |
| 22 | P3.1 — Blog | 24+ hr |
| 23 | P3.2 — Open source integration | 8 hr |
| 24 | P3.3 — Product demos | 16+ hr |
| 25 | P3.4 — Comparison page | 8 hr |
| 26 | P3.5 — i18n | 40+ hr |

---

## Appendix A: Current Design Anti-Patterns (visual reference)

```
ANTI-PATTERN 1:     ANTI-PATTERN 2:        ANTI-PATTERN 3:
Every section       Hardcoded gradients    GSAP + FM overlap
badge:              per service card:       on same elements:
┌────────────────┐  ┌────────────────────┐  ┌─────────────────────┐
│  px-5 py-2     │  │  from-blue-600     │  │  gsap.to(el, {y})  │
│  text-sm       │  │  to-indigo-600     │  │  motion(el, {y})  │
│  font-medium   │  │                    │  │  Both fight for    │
│  rounded-full  │  │  (Not brand green  │  │  control of same   │
│  bg-primary/10 │  │   or brand blue)   │  │  transform origin  │
│  border ...    │  └────────────────────┘  └─────────────────────┘
└────────────────┘
```

## Appendix B: Performance Budget

| Metric | Current | Target |
|--------|---------|--------|
| Three.js canvases | 6 (always rendering) | 1-2 (lazy, viewport-only) |
| CSS file size | ~1,775 lines (3 files) | ~800 lines (1 file) |
| npm dependencies | 65 packages | ~25 packages |
| Section re-renders | All animate on scroll | Only in-view sections |
| Animation libraries | 3 (FM + GSAP + CSS) | 1 primary (FM) + CSS |
| Lighthouse Performance | Unknown (estimated 55-70) | Target 85+ |

---

*End of audit. No code changes were made.*
