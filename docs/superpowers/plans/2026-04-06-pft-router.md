# PFT Router Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a React hub site with animated cards that link to PFT's various dashboards, styled with PFT branding.

**Architecture:** Single-page React app with Vite. Static card data drives a responsive grid. Framer Motion handles entry and hover animations. Plain CSS for all styling with custom PFT branding (black/white monochrome, Abnes + Coolvetica fonts).

**Tech Stack:** React 18, Vite, Framer Motion, Plain CSS

---

### Task 1: Project Scaffolding & Assets

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`
- Create: `public/assets/logo-full.png`, `public/assets/bull-icon.png`
- Create: `src/index.css`

- [ ] **Step 1: Initialize Vite React project**

```bash
cd /home/matebook14s/projects/router
npm create vite@latest . -- --template react
```

Select defaults if prompted. This generates `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/App.css`, etc.

- [ ] **Step 2: Install Framer Motion**

```bash
cd /home/matebook14s/projects/router
npm install framer-motion
```

Expected: `framer-motion` added to `package.json` dependencies.

- [ ] **Step 3: Copy logo assets**

```bash
mkdir -p /home/matebook14s/projects/router/public/assets
cp "/home/matebook14s/projects/poisionm/package_highres_68muo8e3/black/full/white_logo_transparent_background.png" /home/matebook14s/projects/router/public/assets/logo-full.png
cp "/home/matebook14s/projects/poisionm/package_highres_68muo8e3/black/icon/white_icon_transparent_background.png" /home/matebook14s/projects/router/public/assets/bull-icon.png
```

- [ ] **Step 4: Download Abnes and Coolvetica fonts**

Download the font files and place them in `public/fonts/`. These are free fonts available online.

```bash
mkdir -p /home/matebook14s/projects/router/public/fonts
```

Search for and download:
- `Abnes` font (.woff2 or .ttf)
- `Coolvetica` font (.woff2 or .ttf)

Place them in `public/fonts/`.

- [ ] **Step 5: Write global styles with font faces and reset**

Write `src/index.css`:

```css
@font-face {
  font-family: 'Abnes';
  src: url('/fonts/abnes.woff2') format('woff2'),
       url('/fonts/abnes.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Coolvetica';
  src: url('/fonts/coolvetica.woff2') format('woff2'),
       url('/fonts/coolvetica.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  height: 100%;
  width: 100%;
}

body {
  font-family: 'Coolvetica', 'Segoe UI', sans-serif;
  background: #000000;
  color: #ffffff;
  overflow-x: hidden;
}

a {
  text-decoration: none;
  color: inherit;
}
```

- [ ] **Step 6: Clean up Vite defaults**

Remove default Vite generated files that we don't need:
- Delete `src/App.css` (will recreate)
- Delete `src/assets/react.svg`
- Clear `src/App.jsx` content (will rewrite in Task 5)

- [ ] **Step 7: Write minimal main.jsx**

Write `src/main.jsx`:

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 8: Update index.html title**

Update `index.html` — change `<title>` to:

```html
<title>PFT - Poison Financial Technologies</title>
```

Also add a favicon link pointing to the bull icon:

```html
<link rel="icon" type="image/png" href="/assets/bull-icon.png" />
```

- [ ] **Step 9: Verify app runs**

```bash
cd /home/matebook14s/projects/router
npm run dev
```

Expected: Dev server starts at `http://localhost:5173` with no errors. Page shows blank (since App.jsx is cleared).

- [ ] **Step 10: Commit**

```bash
cd /home/matebook14s/projects/router
git init
git add .
git commit -m "feat: scaffold Vite React project with PFT assets and fonts"
```

---

### Task 2: Dashboard Data

**Files:**
- Create: `src/data/dashboards.js`

- [ ] **Step 1: Create dashboard data file**

Write `src/data/dashboards.js`:

```js
export const dashboards = [
  {
    id: 1,
    title: 'Portfolio Tracker',
    description: 'Portfoy performansini gercek zamanli takip edin',
    url: '#',
  },
  {
    id: 2,
    title: 'Risk Analytics',
    description: 'Risk metriklerini analiz edin',
    url: '#',
  },
  {
    id: 3,
    title: 'Market Scanner',
    description: 'Piyasa firsatlarini tarayin',
    url: '#',
  },
  {
    id: 4,
    title: 'Trade Terminal',
    description: 'Hizli ve guvenli islem yapin',
    url: '#',
  },
  {
    id: 5,
    title: 'Reports',
    description: 'Detayli finansal raporlar',
    url: '#',
  },
  {
    id: 6,
    title: 'Settings',
    description: 'Sistem ayarlari ve yapilandirma',
    url: '#',
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/dashboards.js
git commit -m "feat: add placeholder dashboard data"
```

---

### Task 3: Header Component

**Files:**
- Create: `src/components/Header.jsx`
- Create: `src/components/Header.css`

- [ ] **Step 1: Write Header component**

Write `src/components/Header.jsx`:

```jsx
import { motion } from 'framer-motion';
import './Header.css';

export default function Header() {
  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <img
        src="/assets/logo-full.png"
        alt="PFT Logo"
        className="header__logo"
      />
      <h1 className="header__title">PFT</h1>
      <p className="header__subtitle">POISON FINANCIAL TECHNOLOGIES</p>
    </motion.header>
  );
}
```

- [ ] **Step 2: Write Header styles**

Write `src/components/Header.css`:

```css
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem 2rem;
}

.header__logo {
  width: 280px;
  max-width: 80vw;
  height: auto;
  margin-bottom: 1rem;
}

.header__title {
  font-family: 'Abnes', sans-serif;
  font-size: 3rem;
  letter-spacing: 0.5em;
  margin-bottom: 0.25rem;
}

.header__subtitle {
  font-family: 'Abnes', sans-serif;
  font-size: 0.85rem;
  letter-spacing: 0.3em;
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 768px) {
  .header__logo {
    width: 200px;
  }

  .header__title {
    font-size: 2rem;
  }

  .header__subtitle {
    font-size: 0.7rem;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.jsx src/components/Header.css
git commit -m "feat: add Header component with logo and entry animation"
```

---

### Task 4: DashboardCard Component

**Files:**
- Create: `src/components/DashboardCard.jsx`
- Create: `src/components/DashboardCard.css`

- [ ] **Step 1: Write DashboardCard component**

Write `src/components/DashboardCard.jsx`:

```jsx
import { motion } from 'framer-motion';
import './DashboardCard.css';

export default function DashboardCard({ title, description, url, index }) {
  return (
    <motion.a
      href={url}
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.2 + index * 0.1,
        ease: 'easeOut',
      }}
      whileHover="hover"
    >
      <div className="card__spotlight" />

      <div className="card__content">
        <motion.img
          src="/assets/bull-icon.png"
          alt=""
          className="card__icon"
          variants={{
            hover: {
              scale: 1.2,
              y: -4,
              transition: { duration: 0.3, ease: 'easeOut' },
            },
          }}
        />

        <h2 className="card__title">{title}</h2>
        <p className="card__description">{description}</p>

        <span className="card__link">
          Panele Git →
        </span>
      </div>
    </motion.a>
  );
}
```

- [ ] **Step 2: Write DashboardCard styles**

Write `src/components/DashboardCard.css`:

```css
.card {
  position: relative;
  display: block;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.card:hover {
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(255, 255, 255, 0.06);
}

.card__spotlight {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(255, 255, 255, 0.06) 0%,
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.card:hover .card__spotlight {
  opacity: 1;
}

.card__content {
  position: relative;
  z-index: 1;
}

.card__icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
  margin-bottom: 1rem;
  filter: brightness(0.8);
  transition: filter 0.3s ease;
}

.card:hover .card__icon {
  filter: brightness(1) drop-shadow(0 0 12px rgba(255, 255, 255, 0.3));
}

.card__title {
  font-family: 'Coolvetica', sans-serif;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: #ffffff;
}

.card__description {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.5;
  margin-bottom: 1.25rem;
}

.card__link {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.05em;
  transition: color 0.3s ease;
}

.card:hover .card__link {
  color: rgba(255, 255, 255, 0.7);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/DashboardCard.jsx src/components/DashboardCard.css
git commit -m "feat: add DashboardCard with hover spotlight and bull animation"
```

---

### Task 5: CardGrid Component

**Files:**
- Create: `src/components/CardGrid.jsx`
- Create: `src/components/CardGrid.css`

- [ ] **Step 1: Write CardGrid component**

Write `src/components/CardGrid.jsx`:

```jsx
import DashboardCard from './DashboardCard';
import './CardGrid.css';

export default function CardGrid({ dashboards }) {
  return (
    <section className="grid">
      {dashboards.map((dashboard, index) => (
        <DashboardCard
          key={dashboard.id}
          title={dashboard.title}
          description={dashboard.description}
          url={dashboard.url}
          index={index}
        />
      ))}
    </section>
  );
}
```

- [ ] **Step 2: Write CardGrid styles**

Write `src/components/CardGrid.css`:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 1rem 2rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/CardGrid.jsx src/components/CardGrid.css
git commit -m "feat: add responsive CardGrid layout"
```

---

### Task 6: Footer Component

**Files:**
- Create: `src/components/Footer.jsx`
- Create: `src/components/Footer.css`

- [ ] **Step 1: Write Footer component**

Write `src/components/Footer.jsx`:

```jsx
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2026 Poison Financial Technologies</p>
    </footer>
  );
}
```

- [ ] **Step 2: Write Footer styles**

Write `src/components/Footer.css`:

```css
.footer {
  text-align: center;
  padding: 2rem 1rem;
  color: rgba(255, 255, 255, 0.25);
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.jsx src/components/Footer.css
git commit -m "feat: add Footer component"
```

---

### Task 7: App Assembly & Background

**Files:**
- Create: `src/App.jsx`
- Create: `src/App.css`

- [ ] **Step 1: Write App component**

Write `src/App.jsx`:

```jsx
import Header from './components/Header';
import CardGrid from './components/CardGrid';
import Footer from './components/Footer';
import { dashboards } from './data/dashboards';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <div className="app__gradient" />
      <Header />
      <CardGrid dashboards={dashboards} />
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Write App styles**

Write `src/App.css`:

```css
.app {
  position: relative;
  min-height: 100vh;
  background: #000000;
}

.app__gradient {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at 50% 30%,
    rgba(255, 255, 255, 0.03) 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
}

.app > *:not(.app__gradient) {
  position: relative;
  z-index: 1;
}
```

- [ ] **Step 3: Verify full app runs**

```bash
cd /home/matebook14s/projects/router
npm run dev
```

Expected: Full page renders — PFT logo fades in at top, 6 cards appear with staggered animation in 3-column grid. Hovering on a card shows spotlight glow, bull icon scales up, border brightens. Footer at bottom.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx src/App.css
git commit -m "feat: assemble App with gradient background"
```

---

### Task 8: Final Polish & Font Fallback

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/Header.css`

If the custom fonts (Abnes, Coolvetica) are not available or fail to load, the site should still look acceptable.

- [ ] **Step 1: Add font fallback styles**

Ensure `src/index.css` already has system font fallbacks in the `font-family` declarations (they do from Task 1). Verify by reading the file.

- [ ] **Step 2: Add smooth scroll and selection styles**

Append to `src/index.css`:

```css
html {
  scroll-behavior: smooth;
}

::selection {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}
```

- [ ] **Step 3: Verify responsive behavior**

Open the dev server and test:
- Desktop (1200px+): 3 columns
- Tablet (768-1024px): 2 columns
- Mobile (<640px): 1 column
- All animations work at each breakpoint

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: final polish with smooth scroll and selection styles"
```
