# Sudhanshu Baberwal — Portfolio

A minimal, high-performance personal portfolio built for **Sudhanshu Baberwal**, a Backend Software Engineer & B.Tech CSE student at IIIT Dharwad.

## Tech Stack

- **Framework**: React 19 + Vite 7
- **Styling**: Pure modern CSS with responsive variables, glassmorphism, and fluid `clamp()` sizing
- **Typography**: Inter Tight (400, 500) via Google Fonts (`display=swap`)
- **Icons & Graphics**: Custom lightweight SVGs & optimized WebP assets
- **Email Service**: [@emailjs/browser](https://www.emailjs.com/)
- **Motion & Accessibility**: Native browser IntersectionObserver, CSS hardware-accelerated transforms, and comprehensive `prefers-reduced-motion` compliance

---

## Getting Started

### Prerequisites

- Node.js 18+ (tested on Node v20/v24)
- npm 9+

### Installation

```bash
git clone https://github.com/SudhanshuBaberwal/Portfolio.git
cd Portfolio/AnimatedPortfolio
npm install
```

### Development

Run the local development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`. In development mode, form submissions simulate sending without needing valid EmailJS credentials.

### Production Build

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Environment Variables

For contact form delivery via EmailJS in production, copy `.env.example` to `.env.local` or set these in your hosting provider (e.g. Vercel):

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> **Note**: `.env.local` is ignored by Git. Never commit real keys.

---

## Deployment on Vercel

1. Import the repository into [Vercel](https://vercel.com).
2. Set **Root Directory** to `AnimatedPortfolio`.
3. Framework Preset: **Vite**.
4. In **Project Settings → Environment Variables**, add:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
5. Click **Deploy**.
6. Replace `https://YOUR-DOMAIN/` in `index.html`, `public/robots.txt`, and `public/sitemap.xml` with your actual live domain.

---

## Sections

- **Hero (`#top`)**: Full-bleed portrait with gradient overlay, 4-column intro, fluid headline, and cursor parallax.
- **Work (`#work`)**: Interactive projects list with smooth CSS grid accordions and cursor-following preview.
- **About (`#about`)**: 12-column editorial layout with word-by-word scroll reveal, background facts, and education timeline.
- **Stack (`#stack`)**: Editorial index of tools and languages with hover focus-dimming and clickable pinned notes.
- **Contact (`#contact`)**: Validated contact form with honeypot spam protection, 30-second submission throttling, and direct mailto fallback.
- **Footer**: Top-of-page quick navigation and oversized signature typography.
