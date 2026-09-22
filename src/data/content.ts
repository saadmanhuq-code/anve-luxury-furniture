export type Category = "Seating" | "Tables" | "Lighting" | "Storage" | "Bedroom";

export interface Dimensions {
  metric: string;    // e.g. "88 × 82 × 74 cm (Seat: 42 cm)"
  imperial: string;  // e.g. "34.6 × 32.3 × 29.1 in (Seat: 16.5 in)"
}

export interface FinishOption {
  name: string;
  type: "Fabric" | "Wood" | "Stone" | "Metal";
  tone: string;      // CSS background color representation
}

export interface Piece {
  id: string;
  name: string;
  category: Category;
  material: string;
  price: string;
  numericPrice: number; // approximate base USD value for curation summary
  image: string;
  aspect: string;       // tailwind aspect class
  span: string;         // grid span classes for the editorial layout
  year: string;
  description: string;
  dimensions: Dimensions;
  finishes: FinishOption[];
  leadTime: string;
  customizable: boolean;
  provenance: string;
}

export const CATEGORIES: ("All" | Category)[] = [
  "All",
  "Seating",
  "Tables",
  "Lighting",
  "Storage",
  "Bedroom",
];

export const PIECES: Piece[] = [
  {
    id: "elan",
    name: "Élan Lounge Chair",
    category: "Seating",
    material: "Ivory bouclé · white oak",
    price: "From $4,800",
    numericPrice: 4800,
    image: "/images/chair-elan.jpg",
    aspect: "aspect-[4/5]",
    span: "md:col-span-5",
    year: "2025",
    description:
      "A sculptural envelope of dense virgin-wool bouclé set upon a hand-turned solid European white oak frame. Designed to embrace the occupant with generous lumbar depth and a relaxed reclined pitch.",
    dimensions: {
      metric: "88W × 84D × 76H cm · Seat H 42 cm",
      imperial: "34.6W × 33.1D × 29.9H in · Seat H 16.5 in",
    },
    finishes: [
      { name: "Alabaster Bouclé", type: "Fabric", tone: "#F2EFE9" },
      { name: "Oatmeal Linen", type: "Fabric", tone: "#DDD4C6" },
      { name: "Charcoal Mélange", type: "Fabric", tone: "#383632" },
      { name: "Natural White Oak", type: "Wood", tone: "#C2A882" },
      { name: "Smoked Oak", type: "Wood", tone: "#574838" },
    ],
    leadTime: "8–10 weeks",
    customizable: true,
    provenance: "Turned and upholstered in our Paris 4th arrondissement atelier.",
  },
  {
    id: "meridian",
    name: "Meridian Nesting Tables",
    category: "Tables",
    material: "Portoro marble · brushed brass",
    price: "From $12,400",
    numericPrice: 12400,
    image: "/images/table-meridian.jpg",
    aspect: "aspect-[4/3]",
    span: "md:col-span-7",
    year: "2024",
    description:
      "A dual pair of free-form nesting cocktail tables quarried in the Ligurian gulf. The Portoro marble displays deep gold-veined rivers across obsidian stone, edged in satin hand-waxed brass aprons.",
    dimensions: {
      metric: "Primary: 130L × 82W × 38H cm · Nest: 86L × 58W × 32H cm",
      imperial: "Primary: 51.2L × 32.3W × 15.0H in · Nest: 33.8L × 22.8W × 12.6H in",
    },
    finishes: [
      { name: "Ligurian Portoro", type: "Stone", tone: "#211F1D" },
      { name: "Calacatta Paonazzo", type: "Stone", tone: "#E8E2D6" },
      { name: "Roman Travertine", type: "Stone", tone: "#D1C7B7" },
      { name: "Unlacquered Brass", type: "Metal", tone: "#A98548" },
      { name: "Aged Bronze", type: "Metal", tone: "#4A3E31" },
    ],
    leadTime: "12–14 weeks",
    customizable: true,
    provenance: "Slab selected in Carrara; bronze casting in Milan.",
  },
  {
    id: "alba",
    name: "Alba Table Lamp",
    category: "Lighting",
    material: "Alabaster · gilded brass",
    price: "From $2,150",
    numericPrice: 2150,
    image: "/images/lamp-alba.jpg",
    aspect: "aspect-square",
    span: "md:col-span-4",
    year: "2025",
    description:
      "A monolothic spiral column carved from Spanish alabaster. Emits a warm, diffused luminescence that highlights the crystalline mineral veins of the stone, capped with knurled brass hardware.",
    dimensions: {
      metric: "24 Diameter × 52H cm · Weight 8.4 kg",
      imperial: "9.4 Diameter × 20.5H in · Weight 18.5 lbs",
    },
    finishes: [
      { name: "Spanish Alabaster", type: "Stone", tone: "#EFECE6" },
      { name: "Gilded Satin Brass", type: "Metal", tone: "#B39255" },
      { name: "Burnished Bronze", type: "Metal", tone: "#3D3429" },
    ],
    leadTime: "4–6 weeks",
    customizable: false,
    provenance: "Hand-lathed in Volterra; wired with silk-sheathed cord in Paris.",
  },
  {
    id: "colline",
    name: "Colline Dining Table",
    category: "Tables",
    material: "Solid American walnut",
    price: "From $16,900",
    numericPrice: 16900,
    image: "/images/table-colline.jpg",
    aspect: "aspect-square",
    span: "md:col-span-4",
    year: "2023",
    description:
      "A monumental dining table composed of continuous book-matched solid American black walnut. The organic pill-shaped silhouette rests on sculptural fluted stave pedestals with invisible brass tension rods.",
    dimensions: {
      metric: "260L × 110W × 75H cm · Seats 8–10",
      imperial: "102.4L × 43.3W × 29.5H in · Seats 8–10",
    },
    finishes: [
      { name: "Natural American Walnut", type: "Wood", tone: "#5B4434" },
      { name: "Charred Ebonized Oak", type: "Wood", tone: "#26221E" },
      { name: "Bleached White Ash", type: "Wood", tone: "#D8CCBB" },
    ],
    leadTime: "12–16 weeks",
    customizable: true,
    provenance: "FSC certified old-growth timber, dried 36 months, hand-waxed in Paris.",
  },
  {
    id: "riviere",
    name: "Rivière Curved Sofa",
    category: "Seating",
    material: "Wool-blend bouclé · beech frame",
    price: "From $18,700",
    numericPrice: 18700,
    image: "/images/sofa-riviere.jpg",
    aspect: "aspect-[5/4]",
    span: "md:col-span-4",
    year: "2025",
    description:
      "A gently meandering serpentine modular sofa designed to float in expansive salon environments. Constructed with traditional 8-way hand-tied coil springs on an internal seasoned beech chassis.",
    dimensions: {
      metric: "320L × 140D × 74H cm · Seat H 40 cm",
      imperial: "126.0L × 55.1D × 29.1H in · Seat H 15.7 in",
    },
    finishes: [
      { name: "Créme Bouclé", type: "Fabric", tone: "#F0EBE1" },
      { name: "Sandstone Velvet", type: "Fabric", tone: "#BAAFA1" },
      { name: "Terra Cotta Wool", type: "Fabric", tone: "#A65C45" },
      { name: "Moss Mohair", type: "Fabric", tone: "#505445" },
    ],
    leadTime: "10–14 weeks",
    customizable: true,
    provenance: "Bench-made by master tapissiers in Lyon, France.",
  },
  {
    id: "cascade",
    name: "Cascade Pendants",
    category: "Lighting",
    material: "Carved alabaster · bronze",
    price: "From $3,600 / drop",
    numericPrice: 3600,
    image: "/images/light-cascade.jpg",
    aspect: "aspect-[4/5]",
    span: "md:col-span-5",
    year: "2024",
    description:
      "Cascading suspended pendants sculpted from solid blocks of translucent Italian alabaster. Suspended on braided bronze stems of custom lengths for double-height entries and grand stairwells.",
    dimensions: {
      metric: "Pendant: 16 Diameter × 45H cm · Drop up to 450 cm",
      imperial: "Pendant: 6.3 Diameter × 17.7H in · Drop up to 177 in",
    },
    finishes: [
      { name: "Veined White Alabaster", type: "Stone", tone: "#F3EFE9" },
      { name: "Warm Honey Alabaster", type: "Stone", tone: "#E8D8BF" },
      { name: "Oil-Rubbed Bronze", type: "Metal", tone: "#2E2822" },
      { name: "Brushed Brass", type: "Metal", tone: "#A98548" },
    ],
    leadTime: "6–8 weeks",
    customizable: true,
    provenance: "Individual stone drops lathed in Volterra; suspension fittings engineered in Paris.",
  },
  {
    id: "strata",
    name: "Strata Console",
    category: "Tables",
    material: "Honed Roman travertine",
    price: "From $9,800",
    numericPrice: 9800,
    image: "/images/console-strata.jpg",
    aspect: "aspect-[4/5]",
    span: "md:col-span-7",
    year: "2025",
    description:
      "A gallery-grade architectural console crafted from cross-cut Roman travertine. The stepped monolithic piers anchor an open cantilevered beam, leaving stone fissures exposed to celebrate raw geology.",
    dimensions: {
      metric: "180W × 42D × 82H cm · Weight 142 kg",
      imperial: "70.9W × 16.5D × 32.3H in · Weight 313 lbs",
    },
    finishes: [
      { name: "Honed Classic Travertine", type: "Stone", tone: "#D5C9B8" },
      { name: "Silver Ash Travertine", type: "Stone", tone: "#8E8880" },
      { name: "Noce Walnut Travertine", type: "Stone", tone: "#735F4C" },
    ],
    leadTime: "8–10 weeks",
    customizable: true,
    provenance: "Direct from the historic quarries of Tivoli, Italy.",
  },
  {
    id: "dune",
    name: "Dune Swivel Chair",
    category: "Seating",
    material: "Shearling bouclé · walnut base",
    price: "From $5,400",
    numericPrice: 5400,
    image: "/images/chair-dune.jpg",
    aspect: "aspect-square",
    span: "md:col-span-4",
    year: "2024",
    description:
      "A low-slung pod armchair offering 360-degree silent bearing rotation. Wrapped in plush Icelandic shearling bouclé with a concealed recessed walnut plinth base.",
    dimensions: {
      metric: "92W × 88D × 72H cm · Seat H 39 cm",
      imperial: "36.2W × 34.6D × 28.3H in · Seat H 15.3 in",
    },
    finishes: [
      { name: "Icelandic Shearling", type: "Fabric", tone: "#EBE6DD" },
      { name: "Camel Bouclé", type: "Fabric", tone: "#C5B29B" },
      { name: "Espresso Wool", type: "Fabric", tone: "#362F29" },
      { name: "American Walnut Plinth", type: "Wood", tone: "#5B4434" },
    ],
    leadTime: "6–8 weeks",
    customizable: true,
    provenance: "Upholstered by hand in Paris with German silent ball-bearing mechanism.",
  },
  {
    id: "tambour",
    name: "Tambour Sideboard",
    category: "Storage",
    material: "Fluted oak · soft-close brass",
    price: "From $11,200",
    numericPrice: 11200,
    image: "/images/sideboard-tambour.jpg",
    aspect: "aspect-[5/4]",
    span: "md:col-span-4",
    year: "2023",
    description:
      "A Credenza featuring uninterrupted continuous tambour doors sliding effortlessly along concealed bronze tracks. Fitted internally with solid oak dovetailed drawers and integrated LED illumination.",
    dimensions: {
      metric: "210W × 50D × 78H cm",
      imperial: "82.7W × 19.7D × 30.7H in",
    },
    finishes: [
      { name: "Rift White Oak", type: "Wood", tone: "#C4AFA0" },
      { name: "Smoked European Oak", type: "Wood", tone: "#534338" },
      { name: "Ebonized Black Oak", type: "Wood", tone: "#23201D" },
      { name: "Patinated Brass Accents", type: "Metal", tone: "#A98548" },
    ],
    leadTime: "10–12 weeks",
    customizable: true,
    provenance: "Traditional cabinetmaking joinery in Burgundy, France.",
  },
  {
    id: "flute",
    name: "Flûte Linear Pendant",
    category: "Lighting",
    material: "Alabaster tube · patinated brass",
    price: "From $6,900",
    numericPrice: 6900,
    image: "/images/light-flute.jpg",
    aspect: "aspect-square",
    span: "md:col-span-4",
    year: "2025",
    description:
      "A continuous 1.6m cylindrical tube of seamless honed alabaster suspended by slender rigid brass rods. Warm architectural lighting with 2400K continuous spectrum dim-to-warm LEDs.",
    dimensions: {
      metric: "160L × 10 Diameter cm · Drop 80–200 cm adjustable",
      imperial: "63.0L × 3.9 Diameter in · Drop 31.5–78.7 in adjustable",
    },
    finishes: [
      { name: "Pure White Alabaster", type: "Stone", tone: "#F1EBE3" },
      { name: "Patinated Brass", type: "Metal", tone: "#A98548" },
      { name: "Blackened Steel", type: "Metal", tone: "#252422" },
    ],
    leadTime: "6–8 weeks",
    customizable: true,
    provenance: "Precision-drilled single-core alabaster; custom brass turned in Paris.",
  },
  {
    id: "reve",
    name: "Rêve Bed",
    category: "Bedroom",
    material: "Woven jacquard · oak plinth",
    price: "From $14,600",
    numericPrice: 14600,
    image: "/images/bed-reve.jpg",
    aspect: "aspect-[16/10]",
    span: "md:col-span-8",
    year: "2024",
    description:
      "A serene low platform bed with an extended architectural wingback headboard wrapped in heavy Belgian jacquard. The floating oak plinth features integrated cantilevered nightstand ledges.",
    dimensions: {
      metric: "Headboard: 310W × 115H cm · Fits King / Super King",
      imperial: "Headboard: 122.0W × 45.3H in · Fits King / Super King",
    },
    finishes: [
      { name: "Belgian Jacquard Woven Cream", type: "Fabric", tone: "#E8E2D7" },
      { name: "Saddle Bridle Leather", type: "Fabric", tone: "#8C5E3B" },
      { name: "Natural French Oak", type: "Wood", tone: "#C5AF9B" },
      { name: "Smoked Oak", type: "Wood", tone: "#4B3C31" },
    ],
    leadTime: "12–14 weeks",
    customizable: true,
    provenance: "Upholstery tailored in Paris; solid joinery by Loire Valley artisans.",
  },
  {
    id: "contour",
    name: "Contour Lounge",
    category: "Seating",
    material: "Mélange wool · steel sled",
    price: "From $6,100",
    numericPrice: 6100,
    image: "/images/chair-contour.jpg",
    aspect: "aspect-[3/4]",
    span: "md:col-span-4",
    year: "2023",
    description:
      "A cantilevered silhouette composed of continuous bending curves without visible joints. Padded with multi-density natural latex and upholstered in heavy Swiss mélange wool on a hand-polished bronze sled.",
    dimensions: {
      metric: "78W × 95D × 78H cm · Seat H 38 cm",
      imperial: "30.7W × 37.4D × 30.7H in · Seat H 15.0 in",
    },
    finishes: [
      { name: "Mélange Ecru Wool", type: "Fabric", tone: "#E4DED4" },
      { name: "Olive Drape Wool", type: "Fabric", tone: "#4F5345" },
      { name: "Bronze Sled Base", type: "Metal", tone: "#594B3C" },
      { name: "Polished Nickel Sled", type: "Metal", tone: "#AFAFA8" },
    ],
    leadTime: "8–10 weeks",
    customizable: true,
    provenance: "Chassis formed in Alsace; upholstered in Paris.",
  },
];

export interface Project {
  index: string;
  title: string;
  location: string;
  image: string;
  meta: { label: string; value: string }[];
  story: string;
  featuredPieceIds: string[];
  materialsPalette: string[];
}

export const PROJECTS: Project[] = [
  {
    index: "01",
    title: "Penthouse Rive Gauche",
    location: "Paris, France",
    image: "/images/project-rive.jpg",
    meta: [
      { label: "Area", value: "240 m²" },
      { label: "Scope", value: "Interior Architecture · FF&E" },
      { label: "Type", value: "Private Residence" },
      { label: "Completed", value: "2025" },
    ],
    story:
      "A top-floor duplex facing the Luxembourg Gardens, reimagined with lime-plaster surfaces, wide French oak floorboards, and bespoke bronze portals. The layout prioritizes afternoon light, framing salon furnishings that appear sculpted out of shadow.",
    featuredPieceIds: ["elan", "meridian", "riviere", "strata"],
    materialsPalette: ["French White Oak", "Honed Travertine", "Patinated Bronze", "Bouclé"],
  },
  {
    index: "02",
    title: "Culinary Suite Mayfair",
    location: "London, United Kingdom",
    image: "/images/project-mayfair.jpg",
    meta: [
      { label: "Area", value: "96 m²" },
      { label: "Scope", value: "Bespoke Joinery · Lighting" },
      { label: "Type", value: "Private Residence" },
      { label: "Completed", value: "2024" },
    ],
    story:
      "An intimate chef's kitchen and salon designed for a private collector in Mayfair. The space centers on a carved fluted quartzite island, warm patinated brass joinery, and linear alabaster illumination that softens evening gatherings.",
    featuredPieceIds: ["flute", "colline", "tambour"],
    materialsPalette: ["American Walnut", "Taj Mahal Quartzite", "Unlacquered Brass", "Smoked Glass"],
  },
  {
    index: "03",
    title: "Principal Suite Como",
    location: "Lake Como, Italy",
    image: "/images/project-como.jpg",
    meta: [
      { label: "Area", value: "74 m²" },
      { label: "Scope", value: "Furniture Collection · Styling" },
      { label: "Type", value: "Private Residence" },
      { label: "Completed", value: "2024" },
    ],
    story:
      "Overlooking the quiet waters of Bellagio, this master suite balances historic neoclassical frescoes with contemporary quiet furniture. Rich Belgian jacquards and low oak plinths allow the alpine horizon to remain the protagonist.",
    featuredPieceIds: ["reve", "alba", "dune", "cascade"],
    materialsPalette: ["Ligurian Portoro", "Belgian Jacquard", "Natural Ash", "Spanish Alabaster"],
  },
];

export interface MaterialDetail {
  id: string;
  name: string;
  note: string;
  origin: string;
  tactileDescription: string;
  featuredPieceIds: string[];
}

export const MATERIALS: MaterialDetail[] = [
  {
    id: "wood",
    name: "Walnut & White Oak",
    note: "FSC-certified, hand-matched grain",
    origin: "Sustainable French & American old-growth forests",
    tactileDescription:
      "Timber rested for 36 months to stabilize moisture before joinery. Hand-planed and buffed in cold beeswax to preserve the open natural pores and silky touch of the grain.",
    featuredPieceIds: ["colline", "tambour", "reve", "elan"],
  },
  {
    id: "stone",
    name: "Travertine & Marble",
    note: "Quarried in Tivoli and Carrara",
    origin: "Tivoli and Portoro quarries, Italy",
    tactileDescription:
      "Selected slab-by-slab for dramatic mineral veining. Honed with water-ground diamond abrasives to achieve a soft matte finish that deepens with ambient light.",
    featuredPieceIds: ["strata", "meridian", "alba", "cascade"],
  },
  {
    id: "metal",
    name: "Brass & Bronze",
    note: "Unlacquered, living finishes",
    origin: "Artisan foundries in Paris and Milan",
    tactileDescription:
      "Never coated with artificial varnishes. Our alloys are brushed by hand and patinated using traditional sulphur and heat baths, allowing the metal to develop a personal patina over decades.",
    featuredPieceIds: ["meridian", "flute", "cascade", "contour"],
  },
  {
    id: "fabric",
    name: "Bouclé & Linen",
    note: "Woven by heritage European mills",
    origin: "Historic weavers in Lyon, Flanders, and Biella",
    tactileDescription:
      "Heavyweight natural yarns combining wool, Belgian flax, and raw silk. Dense tactile textures that offer resilient softness and subtle optical depth under natural sunlight.",
    featuredPieceIds: ["elan", "riviere", "dune", "contour"],
  },
];

export const NAV_LINKS = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Collections", href: "#collections" },
  { label: "Interiors", href: "#interiors" },
  { label: "Atelier", href: "#atelier" },
  { label: "Inquire", href: "#inquire" },
];
