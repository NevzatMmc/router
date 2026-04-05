# PFT Router v2 - Enhanced Design Spec

## Overview

Enhancement pass on the existing PFT Router site. Replaces current hover effects and adds a full-page overlay system with spotlight animation. All changes stay within monochrome black/white branding.

## What Changes

### 1. Header
- **Remove** the PFT logo image (`<img>` tag)
- Keep only the "PFT" title (Abnes font) + "POISON FINANCIAL TECHNOLOGIES" subtitle
- Keep existing fade-in animation

### 2. Background
- **Add** subtle grid lines over the existing black background
- CSS-only: `background-image` with two `linear-gradient` lines (horizontal + vertical)
- Grid size: ~50px, line color: `rgba(255,255,255,0.025)`
- Keep existing radial gradient overlay on top

### 3. Card Hover - Corner Accent Lines
- **Replace** current spotlight hover with corner accent line effect
- On hover, two thin gradient light lines appear:
  - **Top edge**: `linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)` with subtle `box-shadow` glow
  - **Bottom edge**: Same but dimmer (`0.3` opacity)
- Lines positioned via `::before` / `::after` on a `.card__border` overlay div
- Card needs `overflow: visible` (not hidden) so lines aren't clipped
- Card lifts `translateY(-3px)` on hover with soft box-shadow
- Card border brightens slightly on hover

### 4. Bull Icon - Pulse Ring Burst
- **Idle state**: Bull icon has subtle breathing animation (opacity 0.4-0.7, scale 1.0-1.03, 3s infinite)
- **Hover**: 
  - Bull becomes full opacity, slight scale up (1.1), white drop-shadow glow
  - 3 concentric rings expand outward from the bull with staggered delays:
    - Ring 1: `scale(1.3)`, opacity 1, `border-color: rgba(255,255,255,0.15)`, delay 0s
    - Ring 2: `scale(1.7)`, opacity 0.7, `border-color: rgba(255,255,255,0.08)`, delay 80ms
    - Ring 3: `scale(2.1)`, opacity 0.4, `border-color: rgba(255,255,255,0.04)`, delay 160ms
  - Breathing animation stops on hover (replaced by static full-opacity state)
- Rings are `position: absolute` circles with `border: 1px solid`, CSS transitions
- Bull icon wrapper needs enough space for rings to expand (~50-56px icon)

### 5. Card Text Hover
- Title: subtle `text-shadow` glow on hover
- Description: color brightens slightly (`0.3` → `0.45`)
- CTA ("Panele Git →"): slides right 4px, brightens

### 6. Full-Page Overlay (Click)
- **Trigger**: Click on any card opens overlay
- **Backdrop**: Fixed full-screen, `rgba(0,0,0,0.93)`, fade-in 0.4s
- **Close**: X button top-right + click backdrop + ESC key
- **Scene content** (centered, staggered animations):
  1. **Spotlight cone**: CSS triangle (`border` trick), `rgba(255,255,255,0.02)`, positioned above scene, `scaleY` animation from 0.3→1
  2. **Dashboard title**: Abnes font, `0.75rem`, letter-spacing `0.4em`, uppercase, `rgba(255,255,255,0.4)`
  3. **Bull icon**: 200px, full PFT bull image (not emoji), triple-layer drop-shadow glow (25px + 60px + 100px white), scale-in animation from 0.85→1
  4. **Ground glow**: Elliptical radial gradient, `rgba(255,255,255,0.12)`, `scaleX` from 0.4→1
  5. **Description**: Same text as card, `rgba(255,255,255,0.3)`
  6. **CTA button**: Bordered, Abnes font, "PANELE GIT →", hover brightens border + text + adds box-shadow glow
- **Animation timing**: Each element delays 0.1-0.15s after the previous (cone→label→bull→ground→desc→button)
- **Close animation**: Simple fadeOut (no elaborate exit)

### 7. Overlay Data Flow
- Cards pass their `title`, `description`, and `url` to the overlay component
- Overlay renders dynamically based on which card was clicked
- CTA button links to the card's `url`

## What Stays the Same
- React + Vite + Framer Motion stack
- `src/data/dashboards.js` data structure
- CardGrid responsive layout (3/2/1 columns)
- Footer component
- Global styles (index.css), fonts (Abnes, Coolvetica)
- All existing file structure

## Color Palette
- Black `#000000` - background
- White `#ffffff` - text, glows, borders
- **NO cyan, blue, or any color** - strict monochrome

## File Changes

```
Modified:
  src/components/Header.jsx        — remove logo img
  src/components/Header.css        — remove logo styles
  src/App.css                      — add grid background
  src/components/DashboardCard.jsx  — new hover effects + overlay trigger
  src/components/DashboardCard.css  — corner accents, pulse rings, text hover

New:
  src/components/Overlay.jsx        — full-page overlay component
  src/components/Overlay.css        — overlay styles + animations
```
