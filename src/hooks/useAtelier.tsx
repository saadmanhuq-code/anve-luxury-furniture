import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type Piece, type Project } from "@/data/content";

export interface InquiryContextPayload {
  title: string;
  subtitle?: string;
  projectType?: string;
  messageDefault?: string;
  pieceIds?: string[];
}

interface AtelierContextType {
  // Curation
  curation: Piece[];
  isCurated: (id: string) => boolean;
  toggleCuration: (piece: Piece) => void;
  removeFromCuration: (id: string) => void;
  clearCuration: () => void;
  isCurationOpen: boolean;
  setIsCurationOpen: (open: boolean) => void;

  // Piece Detail Modal
  activePiece: Piece | null;
  openPieceModal: (piece: Piece) => void;
  closePieceModal: () => void;
  nextPiece: () => void;
  prevPiece: () => void;

  // Project Detail Modal
  activeProject: Project | null;
  openProjectModal: (project: Project) => void;
  closeProjectModal: () => void;

  // Inquiry Focus Context
  inquiryPayload: InquiryContextPayload | null;
  setInquiryPayload: (payload: InquiryContextPayload | null) => void;
  startPieceInquiry: (piece: Piece) => void;
  startProjectInquiry: (project: Project) => void;
  startCurationInquiry: () => void;
}

const STORAGE_KEY = "anve_curation_v1";

const AtelierContext = createContext<AtelierContextType | null>(null);

export function AtelierProvider({
  children,
  allPieces = [],
}: {
  children: ReactNode;
  allPieces?: Piece[];
}) {
  const [curation, setCuration] = useState<Piece[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCurationOpen, setIsCurationOpen] = useState(false);
  const [activePiece, setActivePiece] = useState<Piece | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [inquiryPayload, setInquiryPayload] = useState<InquiryContextPayload | null>(null);

  // Sync curation to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(curation));
    } catch {
      // ignore storage quota errors
    }
  }, [curation]);

  const isCurated = (id: string) => curation.some((p) => p.id === id);

  const toggleCuration = (piece: Piece) => {
    setCuration((prev) => {
      const exists = prev.some((p) => p.id === piece.id);
      if (exists) {
        return prev.filter((p) => p.id !== piece.id);
      }
      return [...prev, piece];
    });
  };

  const removeFromCuration = (id: string) => {
    setCuration((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCuration = () => {
    setCuration([]);
  };

  const openPieceModal = (piece: Piece) => {
    setActivePiece(piece);
  };

  const closePieceModal = () => {
    setActivePiece(null);
  };

  const nextPiece = () => {
    if (!activePiece || allPieces.length === 0) return;
    const currIdx = allPieces.findIndex((p) => p.id === activePiece.id);
    const nextIdx = (currIdx + 1) % allPieces.length;
    setActivePiece(allPieces[nextIdx]);
  };

  const prevPiece = () => {
    if (!activePiece || allPieces.length === 0) return;
    const currIdx = allPieces.findIndex((p) => p.id === activePiece.id);
    const prevIdx = (currIdx - 1 + allPieces.length) % allPieces.length;
    setActivePiece(allPieces[prevIdx]);
  };

  const openProjectModal = (project: Project) => {
    setActiveProject(project);
  };

  const closeProjectModal = () => {
    setActiveProject(null);
  };

  const startPieceInquiry = (piece: Piece) => {
    setActivePiece(null);
    setInquiryPayload({
      title: piece.name,
      subtitle: `${piece.category} · ${piece.material} (${piece.price})`,
      projectType: "Bespoke Furniture",
      messageDefault: `I am interested in commissioning the ${piece.name} in ${piece.finishes[0]?.name || piece.material}. Could you share detailed lead times and finish samples for this piece?`,
      pieceIds: [piece.id],
    });

    // Smooth scroll down to inquiry section
    const el = document.getElementById("inquire");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const startProjectInquiry = (project: Project) => {
    setActiveProject(null);
    setInquiryPayload({
      title: project.title,
      subtitle: `${project.location} · ${project.meta.find((m) => m.label === "Scope")?.value || "Interior Design"}`,
      projectType: "Full Residence",
      messageDefault: `I would like to inquire about commissioning an interior with an aesthetic and scope similar to ${project.title} in ${project.location}.`,
      pieceIds: project.featuredPieceIds,
    });

    const el = document.getElementById("inquire");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const startCurationInquiry = () => {
    setIsCurationOpen(false);
    const names = curation.map((p) => p.name).join(", ");
    setInquiryPayload({
      title: `Curated Selection (${curation.length} pieces)`,
      subtitle: names,
      projectType: curation.length > 2 ? "Full Residence" : "Bespoke Furniture",
      messageDefault: `I would like to request an atelier tear sheet and specification quote for my curated selection:\n\n${curation
        .map((p, i) => `${i + 1}. ${p.name} (${p.category}) — ${p.price}`)
        .join("\n")}`,
      pieceIds: curation.map((p) => p.id),
    });

    const el = document.getElementById("inquire");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AtelierContext.Provider
      value={{
        curation,
        isCurated,
        toggleCuration,
        removeFromCuration,
        clearCuration,
        isCurationOpen,
        setIsCurationOpen,
        activePiece,
        openPieceModal,
        closePieceModal,
        nextPiece,
        prevPiece,
        activeProject,
        openProjectModal,
        closeProjectModal,
        inquiryPayload,
        setInquiryPayload,
        startPieceInquiry,
        startProjectInquiry,
        startCurationInquiry,
      }}
    >
      {children}
    </AtelierContext.Provider>
  );
}

export function useAtelier() {
  const ctx = useContext(AtelierContext);
  if (!ctx) {
    throw new Error("useAtelier must be used within an AtelierProvider");
  }
  return ctx;
}
