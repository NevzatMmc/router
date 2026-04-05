# PFT Router - Dashboard Hub Design Spec

## Overview

A central hub/router site for Poison Financial Technologies (PFT) that aggregates all dashboards and panels in one place. Users click on cards to navigate to their respective dashboard URLs.

## Branding

- **Brand**: PFT - Poison Financial Technologies
- **Logo**: Tribal/ornamental bull mascot + "PFT" text
- **Colors**: Black (#000000) primary, White (#FFFFFF) text/logos - monochrome premium fintech aesthetic
- **Fonts**: Abnes (headings - futuristic/geometric), Coolvetica (body - clean sans-serif)
- **Logo assets**: Located at `/home/matebook14s/projects/poisionm/` - will copy relevant assets into project

## Layout

### General Structure
- Full-page black (#000000) background with subtle radial gradient (center dark gray to black) for depth
- **Header**: PFT bull logo + "PFT" text centered, "POISON FINANCIAL TECHNOLOGIES" subtitle below. Abnes font.
- **Main**: Responsive card grid - 3 columns desktop, 2 tablet, 1 mobile
- **Footer**: Minimal - "© 2026 Poison Financial Technologies"

### Card Design
- **Background**: Semi-transparent dark (`rgba(255,255,255,0.03-0.05)`), thin white/gray border (`rgba(255,255,255,0.1)`)
- **Content** (top to bottom):
  - Bull icon (small)
  - Card title (Coolvetica font, white)
  - Short description (light gray, small size)
  - URL/link indicator (dim white)
- **Corners**: `border-radius: 12-16px`
- **Effect**: Subtle blur backdrop-filter for glass effect

### Hover Animations
- **Bull icon**: `scale(1.15-1.2)` + `translateY(-4px)` (~300ms ease-out)
- **Spotlight**: Radial gradient glow behind card, concentrated around bull icon
- **Card border**: `rgba(255,255,255,0.1)` → `rgba(255,255,255,0.3)` brightness increase
- **Card lift**: Subtle `translateY(-2px)` + box-shadow
- **Transitions**: `transition: all 0.3s ease`

### Page Entry Animations
- **Logo**: Fade-in + scale-up (0 → 1, ~600ms)
- **Cards**: Staggered fade-in - each card 100ms delay, slide up from `translateY(20px) → 0`

## Tech Stack

- **React + Vite** - fast, lightweight
- **Plain CSS** - custom styles matching PFT branding (no Tailwind)
- **Framer Motion** - animations
- **CSS Grid + media queries** - responsive layout

## Placeholder Cards (6)

1. **Portfolio Tracker** - "Portfoy performansini gercek zamanli takip edin" - `#`
2. **Risk Analytics** - "Risk metriklerini analiz edin" - `#`
3. **Market Scanner** - "Piyasa firsatlarini tarayin" - `#`
4. **Trade Terminal** - "Hizli ve guvenli islem yapin" - `#`
5. **Reports** - "Detayli finansal raporlar" - `#`
6. **Settings** - "Sistem ayarlari ve yapilandirma" - `#`

URLs are placeholders (`#`) - to be replaced with real URLs later.

## File Structure

```
router/
├── public/
│   └── assets/
│       ├── logo-full.png          (white logo on transparent bg)
│       └── bull-icon.png          (bull icon on transparent bg)
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   ├── index.css                  (global styles, fonts, reset)
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── DashboardCard.jsx
│   │   ├── DashboardCard.css
│   │   ├── CardGrid.jsx
│   │   ├── CardGrid.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   └── data/
│       └── dashboards.js          (card data array - easy to edit)
├── index.html
├── package.json
└── vite.config.js
```

## Data Structure

```js
// src/data/dashboards.js
export const dashboards = [
  {
    id: 1,
    title: "Portfolio Tracker",
    description: "Portfoy performansini gercek zamanli takip edin",
    url: "#",
  },
  // ...
];
```

Easy to update - just edit this single file to add/remove/modify cards.
