import { useMemo, useRef, useState } from "react";
import { CATEGORIES, PIECES, type Category } from "@/data/content";
import { Reveal, SectionHeading, SmartImage } from "@/components/primitives";
import { useAtelier } from "@/hooks/useAtelier";
import { cn } from "@/lib/utils";
import { Bookmark, Check, Search, Sparkles } from "lucide-react";

export default function Collections() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [applied, setApplied] = useState<"All" | Category>("All");
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [searchQuery, setSearchQuery] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { openPieceModal, isCurated, toggleCuration } = useAtelier();

  const pieces = useMemo(() => {
    let list = applied === "All" ? PIECES : PIECES.filter((p) => p.category === applied);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }
    return list;
  }, [applied, searchQuery]);

  const choose = (c: "All" | Category) => {
    if (c === filter) return;
    setFilter(c);
    setPhase("out");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setApplied(c);
      setPhase("in");
    }, 420);
  };

  return (
    <section id="collections" className="bg-greige px-6 py-28 md:px-14 md:py-40">
      <SectionHeading index="02" label="The Collections" />

      <div className="mt-14 flex flex-col gap-10 md:mt-20 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <h2 className="max-w-[16ch] font-display text-[clamp(2.1rem,4.6vw,4.2rem)] leading-[1.05] text-ink">
            Pieces made to be kept, <span className="text-brass">not replaced.</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="max-w-xs text-sm font-light leading-relaxed tracking-wide text-ink/60">
            Twelve signature works from the current atelier book. Each is built to
            order and finished by a single pair of hands.
          </p>
        </Reveal>
      </div>

      {/* filter & search rail */}
      <Reveal delay={160} className="mt-14 border-y border-ink/10">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-5">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => choose(c)}
                data-active={filter === c}
                className={cn(
                  "link-line label-luxe transition-colors duration-500",
                  "max-md:flex max-md:min-h-[40px] max-md:items-center max-md:py-3 max-md:[&::after]:bottom-[7px] md:pb-1",
                  filter === c ? "text-ink" : "text-fawn hover:text-ink",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Quick search input */}
            <div className="relative flex items-center">
              <Search className="absolute left-2.5 h-3.5 w-3.5 text-fawn pointer-events-none" />
              <input
                type="text"
                placeholder="Search pieces or materials…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-36 rounded-none border-b border-ink/20 bg-transparent py-1.5 pl-8 pr-2 text-xs font-light tracking-wide text-ink placeholder:text-fawn/60 focus:w-48 focus:border-brass focus:outline-none transition-all sm:w-44"
              />
            </div>

            <span className="label-luxe tnum text-fawn">
              {String(pieces.length).padStart(2, "0")} / {PIECES.length}
            </span>
          </div>
        </div>
      </Reveal>

      {/* editorial grid */}
      <div
        className={cn(
          "mt-14 grid grid-cols-1 gap-x-8 gap-y-16 transition-opacity duration-[420ms] ease-expo sm:grid-cols-2 md:grid-cols-12",
          phase === "in" ? "opacity-100" : "opacity-0",
        )}
      >
        {pieces.length === 0 ? (
          <div className="col-span-full py-16 text-center">
            <p className="font-display text-2xl text-ink">No pieces match your search</p>
            <p className="mt-2 text-xs font-light text-fawn">
              Try adjusting your filter or search keywords.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilter("All");
                setApplied("All");
                setSearchQuery("");
              }}
              className="mt-4 border-b border-ink/30 pb-0.5 text-xs text-ink hover:text-brass"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          pieces.map((p, i) => {
            const curated = isCurated(p.id);

            return (
              <article
                key={p.id}
                onClick={() => openPieceModal(p)}
                className={cn(
                  "group col-span-1 cursor-pointer sm:col-span-1",
                  p.span,
                  "transition-all duration-[900ms] ease-expo",
                  phase === "in" ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                )}
                style={{ transitionDelay: phase === "in" ? `${i * 70}ms` : "0ms" }}
              >
                <div className="relative">
                  <SmartImage
                    src={p.image}
                    alt={p.name}
                    className={cn("w-full transition-transform duration-700 ease-expo group-hover:scale-[1.015]", p.aspect)}
                    eager={i < 2}
                  />

                  {/* Figure Index */}
                  <span className="label-luxe tnum absolute left-4 top-4 z-20 text-cream/90 mix-blend-difference">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Curation Quick Toggle Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCuration(p);
                    }}
                    aria-label={curated ? `Remove ${p.name} from curation` : `Add ${p.name} to curation`}
                    className={cn(
                      "absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-none transition-all duration-300",
                      curated
                        ? "bg-brass text-cream shadow-md"
                        : "bg-ink/40 text-cream backdrop-blur-sm opacity-90 hover:bg-ink hover:text-brass sm:opacity-0 sm:group-hover:opacity-100",
                    )}
                  >
                    {curated ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                  </button>

                  {/* View Piece Prompt */}
                  <span className="label-luxe absolute bottom-4 right-4 z-20 flex items-center gap-1.5 translate-y-2 text-cream opacity-0 transition-all duration-700 ease-expo group-hover:translate-y-0 group-hover:opacity-100">
                    <Sparkles className="h-3 w-3 text-brass" />
                    View Piece →
                  </span>

                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-10 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/15"
                  />
                </div>

                <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-ink/10 pb-5">
                  <div>
                    <h3 className="font-display text-[1.55rem] leading-tight text-ink transition-colors duration-500 group-hover:text-brass">
                      {p.name}
                    </h3>
                    <p className="label-luxe mt-2 text-fawn">
                      {p.category} · {p.material}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="tnum text-sm tracking-wide text-ink/80">{p.price}</p>
                    <p className="label-luxe tnum mt-2 text-fawn">{p.year}</p>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      <Reveal className="mt-20 flex flex-col items-center justify-center gap-2">
        <p className="label-luxe text-fawn">Click any piece to inspect dimensions &amp; atelier finishes</p>
        <p className="text-xs font-light text-fawn/70">Full catalogue available upon inquiry</p>
      </Reveal>
    </section>
  );
}
