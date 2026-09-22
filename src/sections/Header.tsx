import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/data/content";
import { Diamond } from "@/components/primitives";
import { useAtelier } from "@/hooks/useAtelier";
import { cn } from "@/lib/utils";
import { Bookmark } from "lucide-react";

interface Props {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  onNavigate: (href: string) => void;
}

export default function Header({ menuOpen, setMenuOpen, onNavigate }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { curation, setIsCurationOpen } = useAtelier();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 48);
      if (y > 640 && y > last + 4) setHidden(true);
      else if (y < last - 4 || y < 640) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = scrolled && !menuOpen; // ink text state

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-transform duration-700 ease-expo",
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
        )}
      >
        {/* cream layer slides in on scroll */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 border-b border-ink/10 bg-cream transition-transform duration-[900ms] ease-expo",
            dark ? "translate-y-0" : "-translate-y-full",
          )}
        />
        <div className="relative flex h-20 items-center justify-between px-6 md:h-24 md:px-10">
          {/* menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={cn(
              "group -m-3 flex w-24 items-center gap-3 p-3 transition-colors duration-500 sm:w-28",
              dark ? "text-ink" : "text-cream",
            )}
          >
            <span className="relative flex h-3 w-6 flex-col items-center justify-center">
              <span
                className={cn(
                  "absolute h-px w-6 bg-current transition-all duration-500 ease-expo",
                  menuOpen ? "rotate-[22.5deg]" : "-translate-y-[4px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-6 bg-current transition-all duration-500 ease-expo",
                  menuOpen ? "-rotate-[22.5deg]" : "translate-y-[4px]",
                )}
              />
            </span>
            <span className="label-luxe relative hidden h-4 overflow-hidden sm:block">
              <span
                className={cn(
                  "block transition-transform duration-500 ease-expo",
                  menuOpen ? "-translate-y-4" : "translate-y-0",
                )}
              >
                Menu
              </span>
              <span
                className={cn(
                  "block transition-transform duration-500 ease-expo",
                  menuOpen ? "-translate-y-4" : "translate-y-0",
                )}
              >
                Close
              </span>
            </span>
          </button>

          {/* wordmark — crossfades cream/ink with scroll state */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("#top");
            }}
            className="absolute left-1/2 top-1/2 -m-3 block -translate-x-1/2 -translate-y-1/2 p-3"
            aria-label="ANVÉ Designs — home"
          >
            <span className="relative block h-7 w-[104px] md:h-8 md:w-[120px]">
              <img
                src="/images/wordmark-cream.png"
                alt="ANVÉ"
                className={cn(
                  "absolute inset-0 h-full w-full object-contain transition-opacity duration-700",
                  dark ? "opacity-0" : "opacity-100",
                )}
              />
              <img
                src="/images/wordmark-ink.png"
                alt=""
                aria-hidden
                className={cn(
                  "absolute inset-0 h-full w-full object-contain transition-opacity duration-700",
                  dark ? "opacity-100" : "opacity-0",
                )}
              />
            </span>
          </a>

          {/* right actions: curation drawer & inquire CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsCurationOpen(true)}
              aria-label={`Open atelier curation (${curation.length} items)`}
              className={cn(
                "label-luxe group flex items-center gap-1.5 rounded-full border px-3 py-2 transition-all duration-500 sm:px-4 sm:py-2.5",
                dark
                  ? "border-ink/20 text-ink hover:border-ink hover:bg-ink/5"
                  : "border-cream/30 text-cream hover:border-cream hover:bg-cream/10",
                curation.length > 0 && "border-brass text-brass",
              )}
            >
              <Bookmark className={cn("h-3.5 w-3.5", curation.length > 0 && "fill-brass text-brass")} />
              <span className="hidden sm:inline">Curation</span>
              <span className="tnum text-[11px] font-medium text-brass">
                ({curation.length})
              </span>
            </button>

            {/* inquire CTA */}
            <button
              onClick={() => onNavigate("#inquire")}
              className={cn(
                "label-luxe group relative hidden overflow-hidden rounded-full border px-6 py-2.5 transition-colors duration-500 sm:block",
                dark ? "border-ink/40 text-ink" : "border-cream/50 text-cream",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute inset-0 translate-y-full transition-transform duration-700 ease-luxe group-hover:translate-y-0",
                  dark ? "bg-ink" : "bg-cream",
                )}
              />
              <span
                className={cn(
                  "relative z-10 transition-colors duration-500",
                  dark ? "group-hover:text-cream" : "group-hover:text-ink",
                )}
              >
                Inquire
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ——— full-screen menu ——— */}
      <div
        aria-hidden={!menuOpen}
        className={cn(
          "fixed inset-0 z-[70] flex flex-col justify-between bg-ink pb-10 pt-36 transition-[clip-path] duration-[950ms] ease-luxe",
          menuOpen
            ? "pointer-events-auto [clip-path:inset(0_0_0%_0)]"
            : "pointer-events-none [clip-path:inset(0_0_100%_0)]",
        )}
      >
        <nav className="px-8 md:px-16">
          <ul className="flex flex-col">
            {NAV_LINKS.map((l, i) => (
              <li key={l.href} className="overflow-hidden border-b border-cream/10">
                <a
                  href={l.href}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    onNavigate(l.href);
                  }}
                  className={cn(
                    "group flex items-baseline gap-6 py-4 transition-all duration-[900ms] ease-expo md:py-5",
                    menuOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
                  )}
                  style={{ transitionDelay: menuOpen ? `${250 + i * 80}ms` : "0ms" }}
                >
                  <span className="label-luxe tnum text-brass">0{i + 1}</span>
                  <span className="font-display text-[clamp(2.2rem,7vw,4.6rem)] leading-none text-cream transition-colors duration-500 group-hover:text-brass">
                    {l.label}
                  </span>
                  <span className="ml-auto translate-x-3 text-cream/0 transition-all duration-500 group-hover:translate-x-0 group-hover:text-brass">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div
          className={cn(
            "flex flex-col gap-6 px-8 transition-opacity delay-500 duration-700 md:flex-row md:items-end md:justify-between md:px-16",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
        >
          <div className="flex items-center gap-3">
            <Diamond />
            <span className="label-luxe text-cream/50">Beautiful Spaces · Thoughtfully Yours</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setIsCurationOpen(true);
              }}
              className="label-luxe flex items-center gap-2 text-brass hover:underline"
            >
              <Bookmark className="h-3.5 w-3.5 fill-brass" />
              <span>View Curation ({curation.length})</span>
            </button>
            <div className="label-luxe flex gap-8 text-cream/50">
              <span>Paris</span>
              <span>London</span>
              <span>New York</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
