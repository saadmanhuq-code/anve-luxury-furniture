import { useEffect, useState } from "react";
import { useAtelier } from "@/hooks/useAtelier";
import { Diamond, LuxeButton } from "@/components/primitives";
import { cn } from "@/lib/utils";
import { X, ArrowLeft, ArrowRight, Check, Bookmark, Sparkles } from "lucide-react";

export function PieceDetailModal() {
  const {
    activePiece,
    closePieceModal,
    nextPiece,
    prevPiece,
    isCurated,
    toggleCuration,
    startPieceInquiry,
  } = useAtelier();

  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [selectedFinish, setSelectedFinish] = useState<string | null>(null);

  // Reset finish when piece changes
  useEffect(() => {
    if (activePiece && activePiece.finishes.length > 0) {
      setSelectedFinish(activePiece.finishes[0].name);
    }
  }, [activePiece]);

  // Keyboard navigation: Escape closes, Arrows navigate
  useEffect(() => {
    if (!activePiece) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePieceModal();
      } else if (e.key === "ArrowRight") {
        nextPiece();
      } else if (e.key === "ArrowLeft") {
        prevPiece();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePiece, closePieceModal, nextPiece, prevPiece]);

  if (!activePiece) return null;

  const curated = isCurated(activePiece.id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="piece-title"
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 md:p-10"
    >
      {/* Backdrop */}
      <div
        onClick={closePieceModal}
        className="fixed inset-0 bg-ink/75 backdrop-blur-sm transition-opacity duration-500 animate-in fade-in"
      />

      {/* Modal Surface */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-none border border-ink/15 bg-cream text-ink shadow-2xl animate-in zoom-in-95 duration-500">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <Diamond />
            <span className="label-luxe text-brass">
              Atelier Book · {activePiece.category}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-1 sm:flex">
              <button
                type="button"
                onClick={prevPiece}
                aria-label="Previous piece"
                className="flex h-8 w-8 items-center justify-center border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={nextPiece}
                aria-label="Next piece"
                className="flex h-8 w-8 items-center justify-center border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={closePieceModal}
              aria-label="Close dialog"
              className="flex h-9 w-9 items-center justify-center border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content body */}
        <div className="overflow-y-auto p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-12 md:gap-12">
            {/* Left: Photography */}
            <div className="relative overflow-hidden bg-greige md:col-span-6">
              <img
                src={activePiece.image}
                alt={activePiece.name}
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-ink/70 px-4 py-2 text-cream backdrop-blur-md">
                <span className="label-luxe text-[10px] text-cream/70">
                  {activePiece.year} Edition
                </span>
                <span className="label-luxe text-[10px] text-brass">
                  {selectedFinish ? `Selected: ${selectedFinish}` : activePiece.material}
                </span>
              </div>
            </div>

            {/* Right: Specifications & Inquiries */}
            <div className="flex flex-col justify-between md:col-span-6">
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <h2
                    id="piece-title"
                    className="font-display text-3xl leading-tight text-ink md:text-4xl"
                  >
                    {activePiece.name}
                  </h2>
                </div>

                <div className="mt-2 flex items-center justify-between border-b border-ink/10 pb-4">
                  <p className="label-luxe text-fawn">{activePiece.material}</p>
                  <p className="tnum font-display text-xl text-brass">
                    {activePiece.price}
                  </p>
                </div>

                <p className="mt-6 text-[15px] font-light leading-relaxed tracking-wide text-ink/75">
                  {activePiece.description}
                </p>

                {/* Dimensions section */}
                <div className="mt-6 border-t border-ink/10 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="label-luxe text-fawn">Architectural Dimensions</span>
                    <div className="flex items-center border border-ink/20 p-0.5">
                      <button
                        type="button"
                        onClick={() => setUnit("metric")}
                        className={cn(
                          "label-luxe px-2.5 py-1 text-[9px] transition-colors",
                          unit === "metric"
                            ? "bg-ink text-cream"
                            : "text-fawn hover:text-ink",
                        )}
                      >
                        CM
                      </button>
                      <button
                        type="button"
                        onClick={() => setUnit("imperial")}
                        className={cn(
                          "label-luxe px-2.5 py-1 text-[9px] transition-colors",
                          unit === "imperial"
                            ? "bg-ink text-cream"
                            : "text-fawn hover:text-ink",
                        )}
                      >
                        IN
                      </button>
                    </div>
                  </div>

                  <p className="tnum mt-2 text-sm font-light tracking-wide text-ink">
                    {unit === "metric"
                      ? activePiece.dimensions.metric
                      : activePiece.dimensions.imperial}
                  </p>
                </div>

                {/* Finishes section */}
                {activePiece.finishes && activePiece.finishes.length > 0 && (
                  <div className="mt-6 border-t border-ink/10 pt-5">
                    <span className="label-luxe text-fawn">Atelier Finishes &amp; Materials</span>
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      {activePiece.finishes.map((f) => (
                        <button
                          key={f.name}
                          type="button"
                          onClick={() => setSelectedFinish(f.name)}
                          className={cn(
                            "flex items-center gap-2 border px-3 py-1.5 text-xs transition-all",
                            selectedFinish === f.name
                              ? "border-ink bg-greige text-ink font-medium shadow-sm"
                              : "border-ink/15 text-ink/70 hover:border-ink/40",
                          )}
                        >
                          <span
                            className="h-3 w-3 rounded-full border border-ink/20 shadow-inner"
                            style={{ backgroundColor: f.tone }}
                          />
                          <span>{f.name}</span>
                          <span className="text-[10px] text-fawn">({f.type})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Craft details */}
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-ink/10 pt-5 text-xs">
                  <div>
                    <span className="label-luxe block text-fawn">Lead Time</span>
                    <p className="mt-1 font-light tracking-wide text-ink">
                      {activePiece.leadTime}
                    </p>
                  </div>
                  <div>
                    <span className="label-luxe block text-fawn">Customization</span>
                    <p className="mt-1 font-light tracking-wide text-ink">
                      {activePiece.customizable ? "Custom sizes & COM available" : "Standard atelier dimensions"}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <span className="label-luxe block text-fawn">Provenance</span>
                    <p className="mt-1 font-light tracking-wide text-ink/70">
                      {activePiece.provenance}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 border-t border-ink/10 pt-6 sm:flex-row sm:items-center">
                <LuxeButton
                  variant="dark"
                  onClick={() => startPieceInquiry(activePiece)}
                  className="w-full sm:flex-1"
                >
                  <Sparkles className="mr-2 h-3.5 w-3.5 text-brass" />
                  Inquire About This Piece
                </LuxeButton>

                <button
                  type="button"
                  onClick={() => toggleCuration(activePiece)}
                  className={cn(
                    "flex items-center justify-center gap-2 border px-5 py-3 label-luxe transition-all duration-500",
                    curated
                      ? "border-brass bg-brass/10 text-brass hover:bg-brass/20"
                      : "border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-cream",
                  )}
                >
                  {curated ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      In Curation
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-3.5 w-3.5" />
                      Add to Curation
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
