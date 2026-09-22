import { useCallback, useEffect, useRef, useState } from "react";
import { SmoothScroll } from "@/lib/smoothScroll";
import { PIECES } from "@/data/content";
import { AtelierProvider } from "@/hooks/useAtelier";
import Preloader from "@/sections/Preloader";
import Header from "@/sections/Header";
import Hero from "@/sections/Hero";
import Philosophy from "@/sections/Philosophy";
import Collections from "@/sections/Collections";
import Projects from "@/sections/Projects";
import Craft from "@/sections/Craft";
import Quote from "@/sections/Quote";
import Inquiry from "@/sections/Inquiry";
import Footer from "@/sections/Footer";
import { PieceDetailModal } from "@/components/PieceDetailModal";
import { CurationDrawer } from "@/components/CurationDrawer";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";

export default function Home() {
  const [intro, setIntro] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenisRef = useRef<SmoothScroll | null>(null);

  useEffect(() => {
    const lenis = new SmoothScroll({ lerp: 0.09, wheelMultiplier: 0.95 });
    lenisRef.current = lenis;
    return () => lenis.destroy();
  }, []);

  // lock scroll while the menu is open
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (menuOpen) lenis.stop();
    else lenis.start();
  }, [menuOpen]);

  const onNavigate = useCallback((href: string) => {
    setMenuOpen(false);
    const lenis = lenisRef.current;
    if (href === "#top") {
      lenis?.scrollTo(0, { duration: 1600 });
      return;
    }
    const el = document.querySelector(href);
    if (el) lenis?.scrollTo(el as HTMLElement, { duration: 1500, offset: -70 });
  }, []);

  const handleIntroDone = useCallback(() => setIntro(true), []);

  return (
    <AtelierProvider allPieces={PIECES}>
      <div className="min-h-screen bg-cream text-ink">
        <Preloader onDone={handleIntroDone} />
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} onNavigate={onNavigate} />
        <main>
          <Hero intro={intro} />
          <Philosophy />
          <Collections />
          <Projects />
          <Craft />
          <Quote />
          <Inquiry />
        </main>
        <Footer onNavigate={onNavigate} />

        {/* Atelier Interactive Overlays */}
        <PieceDetailModal />
        <CurationDrawer />
        <ProjectDetailModal />
      </div>
    </AtelierProvider>
  );
}
