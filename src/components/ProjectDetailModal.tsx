import { useEffect } from "react";
import { useAtelier } from "@/hooks/useAtelier";
import { PIECES } from "@/data/content";
import { Diamond, LuxeButton } from "@/components/primitives";
import { X, Sparkles } from "lucide-react";

export function ProjectDetailModal() {
  const {
    activeProject,
    closeProjectModal,
    startProjectInquiry,
    openPieceModal,
  } = useAtelier();

  // Escape key closes modal
  useEffect(() => {
    if (!activeProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProjectModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProject, closeProjectModal]);

  if (!activeProject) return null;

  const featuredPieces = PIECES.filter((p) =>
    activeProject.featuredPieceIds.includes(p.id),
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 md:p-10"
    >
      {/* Backdrop */}
      <div
        onClick={closeProjectModal}
        className="fixed inset-0 bg-ink/80 backdrop-blur-sm transition-opacity duration-500 animate-in fade-in"
      />

      {/* Surface */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-none border border-cream/15 bg-ink text-cream shadow-2xl animate-in zoom-in-95 duration-500">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-cream/10 px-6 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <Diamond />
            <span className="label-luxe text-brass">
              Interior Archive · Case Study {activeProject.index}
            </span>
          </div>

          <button
            type="button"
            onClick={closeProjectModal}
            aria-label="Close project view"
            className="flex h-9 w-9 items-center justify-center border border-cream/20 text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-6 md:p-8">
          {/* Main hero presentation */}
          <div className="grid gap-8 md:grid-cols-12 md:gap-12">
            <div className="overflow-hidden md:col-span-7">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-espresso">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-4 left-4 rounded-none bg-ink/80 px-3 py-1.5 backdrop-blur-sm">
                  <span className="label-luxe text-[10px] text-cream">
                    {activeProject.location}
                  </span>
                </div>
              </div>

              {/* Architectural materials palette */}
              <div className="mt-6">
                <span className="label-luxe text-cream/45">Architectural Palette</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeProject.materialsPalette.map((mat) => (
                    <span
                      key={mat}
                      className="border border-cream/15 px-3 py-1 text-xs font-light text-cream/80"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between md:col-span-5">
              <div>
                <span className="label-luxe tnum text-brass">
                  Project {activeProject.index}
                </span>
                <h2
                  id="project-title"
                  className="mt-2 font-display text-3xl leading-tight text-cream md:text-4xl"
                >
                  {activeProject.title}
                </h2>
                <p className="label-luxe mt-2 text-cream/50">{activeProject.location}</p>

                <p className="mt-6 text-[15px] font-light leading-relaxed tracking-wide text-cream/80">
                  {activeProject.story}
                </p>

                {/* Meta details list */}
                <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-cream/10 pt-5">
                  {activeProject.meta.map((m) => (
                    <div key={m.label}>
                      <dt className="label-luxe text-cream/40">{m.label}</dt>
                      <dd className="tnum mt-1 text-sm font-light text-cream/90">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-8 border-t border-cream/10 pt-6">
                <LuxeButton
                  variant="light"
                  onClick={() => startProjectInquiry(activeProject)}
                  className="w-full"
                >
                  <Sparkles className="mr-2 h-3.5 w-3.5 text-brass" />
                  Commission Similar Interior
                </LuxeButton>
              </div>
            </div>
          </div>

          {/* Featured Works in this interior */}
          {featuredPieces.length > 0 && (
            <div className="mt-12 border-t border-cream/10 pt-10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-2xl text-cream">
                    Works Featured in this Residence
                  </h3>
                  <p className="mt-1 text-xs font-light text-cream/50">
                    Bespoke and collection furniture created for this commission.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6">
                {featuredPieces.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      closeProjectModal();
                      openPieceModal(p);
                    }}
                    className="group flex flex-col text-left transition-opacity hover:opacity-90"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-espresso">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-105"
                      />
                      <span className="label-luxe absolute bottom-2 right-2 rounded-none bg-ink/70 px-2 py-0.5 text-[9px] text-cream opacity-0 transition-opacity group-hover:opacity-100">
                        View Piece →
                      </span>
                    </div>
                    <h4 className="mt-3 font-display text-base text-cream group-hover:text-brass">
                      {p.name}
                    </h4>
                    <p className="label-luxe text-[10px] text-cream/50">
                      {p.category} · {p.price}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
