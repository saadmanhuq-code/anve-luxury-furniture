# ANVÉ Designs — Luxury Furniture & Interior Atelier

> *Beautiful Spaces. Thoughtfully Yours.*

ANVÉ Designs is an ultra-luxury furniture and interior architecture atelier composing residences of quiet permanence — piece by piece, room by room. Founded in a Paris courtyard workshop with salons in Paris, London, and New York, ANVÉ designs and builds furniture slowly by hand in European oak, honed Italian travertine, unlacquered bronze, and heritage bouclé.

---

## Features & Capabilities

* **Curated Collection Catalog**: Twelve signature works spanning Seating, Tables, Lighting, Storage, and Bedroom, with real-time category filtering and material search.
* **Architectural Piece Detail Modal**:
  * High-resolution photography and provenance narrative.
  * Architectural dimension switcher (**Metric cm** vs. **Imperial in**).
  * Tactile material swatches with visual tone indicators (Fabric, Wood, Stone, Metal).
  * Atelier lead times and bespoke customization (COM/COL) eligibility.
  * Direct *"Inquire About This Piece"* context trigger and *"Add to Curation"*.
  * Keyboard navigation (`Escape` closes, `ArrowLeft` / `ArrowRight` cycles through pieces).
* **Designer Curation Drawer ("Atelier Selection")**:
  * Persistent slide-over drawer for private clients and interior architects to curate project selections.
  * Real-time estimated investment tally.
  * One-click *"Inquire with Curated Selection"* auto-generating an itemized specification request.
  * Print-ready tear sheet preview.
* **Residential Case Studies & Gallery Overlays**:
  * Architectural concepts for private commissions (Paris Penthouse Rive Gauche, London Culinary Suite Mayfair, Lake Como Principal Suite).
  * Material palettes and direct links to pieces placed within each interior.
* **Tactile Materials Explorer**:
  * Expandable trays revealing harvest and quarry provenance (Tivoli Travertine, Ligurian Portoro, FSC French Oak, European Bouclé).
  * Direct swatch box sample request flow.
* **Contextual Commission Inquiries**:
  * Dynamic form recognizing targeted pieces, residences, or multi-piece curations.
  * Preferred studio consultation selection (Paris, London, New York, or Virtual Private Viewing).
  * Offline-resilient submission handler generating studio reference codes (`ANVÉ-XXXX`).

---

## Tech Stack

* **Framework**: [React 19](https://react.dev/) + [Vite 7](https://vite.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict typing)
* **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) + Shadcn/Radix UI Primitives
* **State Management**: React Context (`useAtelier`) with `localStorage` persistence
* **Testing**: [Vitest](https://vitest.dev/) (Comprehensive unit test suite for data integrity, financial calculation, and form validation)
* **API / Backend**: [Hono](https://hono.dev/) + [tRPC](https://trpc.io/) + [Drizzle ORM](https://orm.drizzle.team/)

---

## Getting Started

### Prerequisites
* Node.js 20+
* npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/saadmanhuq-code/anve-luxury-furniture.git
cd anve-luxury-furniture

# Install dependencies
npm install
```

### Running Locally

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Verification & Testing

```bash
# Run strict TypeScript typecheck
npm run check

# Run automated Vitest test suite
npm test

# Build for production
npm run build
```

---

## Project Structure

```
├── api/                  # Hono + tRPC backend routers
├── contracts/            # Type definitions and API contracts
├── db/                   # Drizzle ORM schema and migrations
├── docs/                 # Brand identity concepts and assets
├── public/               # Public assets and high-res imagery
└── src/
    ├── components/       # Radix UI and bespoke modal components
    │   ├── PieceDetailModal.tsx
    │   ├── CurationDrawer.tsx
    │   ├── ProjectDetailModal.tsx
    │   └── primitives.tsx
    ├── data/             # Architectural specifications and test suites
    │   ├── content.ts
    │   ├── content.test.ts
    │   ├── curation.test.ts
    │   └── inquiryValidation.test.ts
    ├── hooks/            # Custom hooks and atelier state engine
    │   └── useAtelier.tsx
    ├── pages/            # Page layouts
    │   └── Home.tsx
    └── sections/         # Visual sections
        ├── Header.tsx
        ├── Hero.tsx
        ├── Philosophy.tsx
        ├── Collections.tsx
        ├── Projects.tsx
        ├── Craft.tsx
        ├── Quote.tsx
        ├── Inquiry.tsx
        └── Footer.tsx
```

---

## License

Private commission. All rights reserved © MMXXVI ANVÉ Designs.
