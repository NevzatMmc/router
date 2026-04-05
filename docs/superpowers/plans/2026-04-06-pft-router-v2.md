# PFT Router v2 - Enhanced UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance PFT Router with corner accent hover lines, pulse ring bull animation, grid background, and a full-page spotlight overlay.

**Architecture:** Modify existing components (Header, DashboardCard, App) and add a new Overlay component. App manages overlay state, passes it down. All animations use Framer Motion + CSS transitions. Strict monochrome palette.

**Tech Stack:** React 18, Vite, Framer Motion, Plain CSS

---

### Task 1: Header - Remove Logo Image

**Files:**
- Modify: `src/components/Header.jsx`
- Modify: `src/components/Header.css`

- [ ] **Step 1: Remove logo from Header.jsx**

Replace `src/components/Header.jsx` with:

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
      <h1 className="header__title">PFT</h1>
      <p className="header__subtitle">POISON FINANCIAL TECHNOLOGIES</p>
    </motion.header>
  );
}
```

- [ ] **Step 2: Remove logo styles from Header.css**

Replace `src/components/Header.css` with:

```css
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3.5rem 1rem 2.5rem;
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
  color: rgba(255, 255, 255, 0.45);
}

@media (max-width: 768px) {
  .header__title {
    font-size: 2rem;
  }

  .header__subtitle {
    font-size: 0.7rem;
  }
}
```

- [ ] **Step 3: Verify and commit**

```bash
cd /home/matebook14s/projects/router
npm run build
git add src/components/Header.jsx src/components/Header.css
git commit -m "feat: remove logo image from header, keep text only"
```

---

### Task 2: Grid Background

**Files:**
- Modify: `src/App.css`

- [ ] **Step 1: Add grid lines to App.css**

Replace `src/App.css` with:

```css
.app {
  position: relative;
  min-height: 100vh;
  background: #000000;
  overflow-x: hidden;
}

.app__gradient {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 0;
}

.app__gradient::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% 30%,
    rgba(255, 255, 255, 0.04) 0%,
    transparent 70%
  );
}

.app > *:not(.app__gradient) {
  position: relative;
  z-index: 1;
}
```

- [ ] **Step 2: Verify and commit**

```bash
cd /home/matebook14s/projects/router
npm run build
git add src/App.css
git commit -m "feat: add subtle grid background"
```

---

### Task 3: DashboardCard - Corner Accents + Pulse Rings + Text Hover

**Files:**
- Modify: `src/components/DashboardCard.jsx`
- Modify: `src/components/DashboardCard.css`

- [ ] **Step 1: Rewrite DashboardCard.jsx**

Replace `src/components/DashboardCard.jsx` with:

```jsx
import { motion } from 'framer-motion';
import './DashboardCard.css';

export default function DashboardCard({ title, description, url, index, onCardClick }) {
  function handleClick(e) {
    e.preventDefault();
    onCardClick({ title, description, url });
  }

  return (
    <motion.a
      href={url}
      className="card"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.2 + index * 0.1,
        ease: 'easeOut',
      }}
    >
      <div className="card__border" />

      <div className="card__content">
        <div className="card__icon-wrapper">
          <img
            src="/assets/bull-icon.png"
            alt=""
            className="card__icon"
          />
          <div className="card__rings">
            <div className="card__ring" />
            <div className="card__ring" />
            <div className="card__ring" />
          </div>
        </div>

        <h2 className="card__title">{title}</h2>
        <p className="card__description">{description}</p>
        <span className="card__link">Panele Git →</span>
      </div>
    </motion.a>
  );
}
```

- [ ] **Step 2: Rewrite DashboardCard.css**

Replace `src/components/DashboardCard.css` with:

```css
.card {
  position: relative;
  display: block;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  padding: 1.75rem;
  cursor: pointer;
  overflow: visible;
  transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 40px rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.12);
}

/* ===== CORNER ACCENT LINES ===== */
.card__border {
  position: absolute;
  inset: -1px;
  border-radius: 15px;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 3;
}

.card__border::before {
  content: '';
  position: absolute;
  top: 0;
  left: 15%;
  right: 15%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.15), 0 0 20px rgba(255, 255, 255, 0.05);
}

.card__border::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 15%;
  right: 15%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.1);
}

.card:hover .card__border {
  opacity: 1;
}

/* ===== BULL ICON + PULSE RINGS ===== */
.card__content {
  position: relative;
  z-index: 1;
}

.card__icon-wrapper {
  position: relative;
  width: 50px;
  height: 50px;
  margin-bottom: 1rem;
}

.card__icon {
  position: relative;
  z-index: 2;
  width: 50px;
  height: 50px;
  object-fit: contain;
  opacity: 0.4;
  transition: all 0.4s ease;
  animation: breathe 3s ease-in-out infinite;
}

@keyframes breathe {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.03); }
}

.card:hover .card__icon {
  opacity: 1;
  transform: scale(1.1);
  filter: drop-shadow(0 0 18px rgba(255, 255, 255, 0.3));
  animation: none;
}

.card__rings {
  position: absolute;
  inset: -5px;
  pointer-events: none;
}

.card__ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  opacity: 0;
  transition: all 0.5s ease;
  transform: scale(0.8);
}

.card:hover .card__ring:nth-child(1) {
  opacity: 1;
  transform: scale(1.3);
  border-color: rgba(255, 255, 255, 0.15);
  transition-delay: 0s;
}

.card:hover .card__ring:nth-child(2) {
  opacity: 0.7;
  transform: scale(1.7);
  border-color: rgba(255, 255, 255, 0.08);
  transition-delay: 0.08s;
}

.card:hover .card__ring:nth-child(3) {
  opacity: 0.4;
  transform: scale(2.1);
  border-color: rgba(255, 255, 255, 0.04);
  transition-delay: 0.16s;
}

/* ===== TEXT ===== */
.card__title {
  font-family: 'Coolvetica', sans-serif;
  font-size: 1.3rem;
  margin-bottom: 0.35rem;
  color: rgba(255, 255, 255, 0.9);
  transition: text-shadow 0.3s ease;
}

.card:hover .card__title {
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
}

.card__description {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.3);
  line-height: 1.5;
  margin-bottom: 1.25rem;
  transition: color 0.3s ease;
}

.card:hover .card__description {
  color: rgba(255, 255, 255, 0.45);
}

.card__link {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.15);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: color 0.3s ease, transform 0.3s ease;
  display: inline-block;
}

.card:hover .card__link {
  color: rgba(255, 255, 255, 0.5);
  transform: translateX(4px);
}
```

- [ ] **Step 3: Verify and commit**

```bash
cd /home/matebook14s/projects/router
npm run build
git add src/components/DashboardCard.jsx src/components/DashboardCard.css
git commit -m "feat: add corner accent lines, pulse ring burst, text hover effects"
```

---

### Task 4: Overlay Component

**Files:**
- Create: `src/components/Overlay.jsx`
- Create: `src/components/Overlay.css`

- [ ] **Step 1: Create Overlay.jsx**

Write `src/components/Overlay.jsx`:

```jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import './Overlay.css';

export default function Overlay({ isOpen, onClose, dashboard }) {
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!dashboard) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="overlay__backdrop" onClick={onClose} />

          <button className="overlay__close" onClick={onClose}>
            ✕
          </button>

          <div className="overlay__scene">
            <motion.div
              className="overlay__cone"
              initial={{ opacity: 0, scaleY: 0.3 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            />

            <motion.h2
              className="overlay__label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {dashboard.title.toUpperCase()}
            </motion.h2>

            <motion.img
              src="/assets/bull-icon.png"
              alt="PFT Bull"
              className="overlay__bull"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />

            <motion.div
              className="overlay__ground"
              initial={{ opacity: 0, scaleX: 0.4 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            />

            <motion.p
              className="overlay__desc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              {dashboard.description}
            </motion.p>

            <motion.a
              href={dashboard.url}
              className="overlay__btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              PANELE GIT →
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Create Overlay.css**

Write `src/components/Overlay.css`:

```css
.overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.overlay__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.93);
}

.overlay__close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.25);
  cursor: pointer;
  z-index: 102;
  transition: color 0.2s;
  background: none;
  border: none;
  font-family: inherit;
}

.overlay__close:hover {
  color: rgba(255, 255, 255, 0.7);
}

.overlay__scene {
  position: relative;
  z-index: 101;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.overlay__cone {
  width: 0;
  height: 0;
  border-left: 110px solid transparent;
  border-right: 110px solid transparent;
  border-top: 190px solid rgba(255, 255, 255, 0.02);
  position: absolute;
  top: -170px;
  transform-origin: top center;
}

.overlay__label {
  font-family: 'Abnes', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.4em;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 2.5rem;
  text-transform: uppercase;
}

.overlay__bull {
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin-bottom: 0.5rem;
  filter:
    drop-shadow(0 0 25px rgba(255, 255, 255, 0.2))
    drop-shadow(0 0 60px rgba(255, 255, 255, 0.08))
    drop-shadow(0 0 100px rgba(255, 255, 255, 0.04));
}

.overlay__ground {
  width: 220px;
  height: 25px;
  border-radius: 50%;
  background: radial-gradient(
    ellipse,
    rgba(255, 255, 255, 0.12) 0%,
    transparent 70%
  );
  margin-bottom: 2rem;
}

.overlay__desc {
  font-family: 'Coolvetica', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 2rem;
}

.overlay__btn {
  display: inline-block;
  padding: 0.75rem 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: transparent;
  color: rgba(255, 255, 255, 0.45);
  font-family: 'Abnes', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.overlay__btn:hover {
  border-color: rgba(255, 255, 255, 0.35);
  color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.06);
}

@media (max-width: 768px) {
  .overlay__bull {
    width: 150px;
    height: 150px;
  }

  .overlay__cone {
    border-left-width: 80px;
    border-right-width: 80px;
    border-top-width: 140px;
    top: -120px;
  }

  .overlay__label {
    font-size: 0.65rem;
  }
}
```

- [ ] **Step 3: Verify and commit**

```bash
cd /home/matebook14s/projects/router
npm run build
git add src/components/Overlay.jsx src/components/Overlay.css
git commit -m "feat: add full-page spotlight overlay component"
```

---

### Task 5: Wire Overlay Into App

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/CardGrid.jsx`

- [ ] **Step 1: Add overlay state to App.jsx**

Replace `src/App.jsx` with:

```jsx
import { useState, useCallback } from 'react';
import Header from './components/Header';
import CardGrid from './components/CardGrid';
import Footer from './components/Footer';
import Overlay from './components/Overlay';
import { dashboards } from './data/dashboards';
import './App.css';

export default function App() {
  const [overlayData, setOverlayData] = useState(null);

  const handleCardClick = useCallback((dashboard) => {
    setOverlayData(dashboard);
  }, []);

  const handleClose = useCallback(() => {
    setOverlayData(null);
  }, []);

  return (
    <div className="app">
      <div className="app__gradient" />
      <Header />
      <CardGrid dashboards={dashboards} onCardClick={handleCardClick} />
      <Footer />
      <Overlay
        isOpen={overlayData !== null}
        onClose={handleClose}
        dashboard={overlayData}
      />
    </div>
  );
}
```

- [ ] **Step 2: Pass onCardClick through CardGrid**

Replace `src/components/CardGrid.jsx` with:

```jsx
import DashboardCard from './DashboardCard';
import './CardGrid.css';

export default function CardGrid({ dashboards, onCardClick }) {
  return (
    <section className="grid">
      {dashboards.map((dashboard, index) => (
        <DashboardCard
          key={dashboard.id}
          title={dashboard.title}
          description={dashboard.description}
          url={dashboard.url}
          index={index}
          onCardClick={onCardClick}
        />
      ))}
    </section>
  );
}
```

- [ ] **Step 3: Verify full flow and commit**

```bash
cd /home/matebook14s/projects/router
npm run build
git add src/App.jsx src/components/CardGrid.jsx
git commit -m "feat: wire overlay into app with card click handler"
```

---

### Task 6: Final Verification

**Files:** None (verification only)

- [ ] **Step 1: Start dev server and test**

```bash
cd /home/matebook14s/projects/router
npm run dev -- --port 3000 --host 0.0.0.0
```

Verify:
1. Grid background visible behind cards
2. Header shows only "PFT" + subtitle (no logo image)
3. Bull icons breathe (subtle pulse animation)
4. Card hover: corner accent lines appear (top + bottom), bull scales up with pulse rings, text brightens, CTA slides right
5. Card click: overlay opens with spotlight cone, bull image with glow, ground light, title, description, CTA button
6. Overlay closes with X, ESC, or backdrop click
7. Responsive: 3 cols desktop, 2 tablet, 1 mobile

- [ ] **Step 2: Build check**

```bash
npm run build
```

Expected: Zero errors, zero warnings.
