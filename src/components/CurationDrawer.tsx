import { useAtelier } from "@/hooks/useAtelier";
import { Diamond, LuxeButton } from "@/components/primitives";
import { X, Trash2, Sparkles, FolderArchive } from "lucide-react";

export function CurationDrawer() {
  const {
    curation,
    isCurationOpen,
    setIsCurationOpen,
    removeFromCuration,
    clearCuration,
    startCurationInquiry,
    openPieceModal,
  } = useAtelier();

  if (!isCurationOpen) return null;

  const totalEstimated = curation.reduce((acc, p) => acc + p.numericPrice, 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="curation-title"
      className="fixed inset-0 z-[110] flex justify-end"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCurationOpen(false)}
        className="fixed inset-0 bg-ink/65 backdrop-blur-sm transition-opacity duration-500 animate-in fade-in"
      />

      {/* Slide-in panel */}
      <aside className="relative z-10 flex h-full w-full max-w-lg flex-col justify-between border-l border-ink/15 bg-cream text-ink shadow-2xl animate-in slide-in-from-right duration-500">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5 md:px-8">
          <div className="flex items-center gap-3">
            <Diamond />
            <div>
              <h2 id="curation-title" className="label-luxe text-ink">
                Atelier Curation
              </h2>
              <p className="text-xs font-light text-fawn">
                {curation.length} {curation.length === 1 ? "work" : "works"} selected
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCurationOpen(false)}
            aria-label="Close curation"
            className="flex h-9 w-9 items-center justify-center border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* List of items */}
        <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8">
          {curation.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <FolderArchive className="h-10 w-10 text-fawn/40" />
              <p className="mt-4 font-display text-xl text-ink">No pieces curated yet</p>
              <p className="mt-2 max-w-xs text-xs font-light leading-relaxed text-ink/60">
                Select pieces from the collection book to compile your project tear sheet and request a bespoke quotation.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsCurationOpen(false);
                  const el = document.getElementById("collections");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-6 border-b border-ink/40 pb-1 label-luxe text-ink transition-colors hover:border-ink hover:text-brass"
              >
                Explore Collections →
              </button>
            </div>
          ) : (
            <div className="divide-y divide-ink/10">
              {curation.map((piece) => (
                <div key={piece.id} className="flex gap-4 py-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCurationOpen(false);
                      openPieceModal(piece);
                    }}
                    className="relative aspect-square w-20 shrink-0 overflow-hidden bg-greige transition-transform hover:scale-105"
                  >
                    <img
                      src={piece.image}
                      alt={piece.name}
                      className="h-full w-full object-cover"
                    />
                  </button>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsCurationOpen(false);
                            openPieceModal(piece);
                          }}
                          className="text-left font-display text-base leading-snug text-ink transition-colors hover:text-brass"
                        >
                          {piece.name}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCuration(piece.id)}
                          aria-label={`Remove ${piece.name} from curation`}
                          className="text-fawn/60 transition-colors hover:text-terra"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="label-luxe text-[10px] text-fawn">{piece.category}</p>
                      <p className="mt-1 text-xs text-ink/70">{piece.material}</p>
                    </div>

                    <div className="flex items-baseline justify-between border-t border-ink/5 pt-2">
                      <span className="tnum text-xs font-light tracking-wide text-ink">
                        {piece.price}
                      </span>
                      <span className="text-[10px] text-fawn">{piece.leadTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer summary & actions */}
        {curation.length > 0 && (
          <div className="border-t border-ink/10 bg-greige/40 p-6 md:p-8">
            <div className="flex items-baseline justify-between">
              <span className="label-luxe text-fawn">Estimated Investment</span>
              <span className="tnum font-display text-xl text-ink">
                From ${totalEstimated.toLocaleString()}
              </span>
            </div>
            <p className="mt-1 text-[11px] font-light text-fawn">
              Final quotation provided upon review of finishes and destination logistics.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <LuxeButton
                variant="dark"
                onClick={startCurationInquiry}
                className="w-full"
              >
                <Sparkles className="mr-2 h-3.5 w-3.5 text-brass" />
                Inquire with Curated Selection
              </LuxeButton>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={clearCuration}
                  className="text-xs text-fawn transition-colors hover:text-terra"
                >
                  Clear Selection
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="label-luxe text-xs text-ink/70 hover:text-ink"
                >
                  Print Tear Sheet
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
