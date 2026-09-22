import { useEffect, useRef, useState } from "react";
import { SplitWords } from "@/components/primitives";
import { cn } from "@/lib/utils";

export default function Hero({ intro }: { intro: boolean }) {
  const [imgReady, setImgReady] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // cover the already-cached case where onLoad never fires
  useEffect(() => {
    if (imgRef.current?.complete) setImgReady(true);
    const t = setTimeout(() => setImgReady(true), 1600);
    return () => clearTimeout(t);
  }, []);

  const on = intro && imgReady;

  // slow cinematic drift on the hero image
  const [drift, setDrift] = useState(0);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setDrift(window.scrollY);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="top" className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink">
      {/* image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src="/images/hero.jpg"
          alt="A serene, light-filled living room composed by ANVÉ Designs"
          onLoad={() => setImgReady(true)}
          className={cn(
            "h-[112%] w-full object-cover transition-all duration-[2200ms] ease-expo",
            intro ? "scale-100 opacity-100" : "scale-[1.12] opacity-0",
          )}
          style={{ transform: `translateY(${drift * 0.18}px) scale(${on ? 1 : 1.12})` }}
        />
      </div>
      {/* depth gradients */}
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,26,23,.52),transparent_42%)]" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_52%,rgba(28,26,23,.78))]" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,26,23,.42),transparent_58%)]" />

      {/* brass hairline frame — draws in after the curtain lifts */}
      <div aria-hidden className="pointer-events-none absolute inset-4 md:inset-6">
        <span className={cn("absolute left-0 top-0 h-px bg-cream/45 transition-all duration-[1400ms] ease-expo", on ? "w-full" : "w-0")} style={{ transitionDelay: "500ms" }} />
        <span className={cn("absolute bottom-0 right-0 h-px bg-cream/45 transition-all duration-[1400ms] ease-expo", on ? "w-full" : "w-0")} style={{ transitionDelay: "650ms" }} />
        <span className={cn("absolute right-0 top-0 w-px bg-cream/45 transition-all duration-[1400ms] ease-expo", on ? "h-full" : "h-0")} style={{ transitionDelay: "500ms" }} />
        <span className={cn("absolute bottom-0 left-0 w-px bg-cream/45 transition-all duration-[1400ms] ease-expo", on ? "h-full" : "h-0")} style={{ transitionDelay: "650ms" }} />
      </div>

      {/* content */}
      <div className="relative flex h-full flex-col justify-between px-8 pb-14 pt-28 md:px-14 md:pb-16">
        <div
          className={cn(
            "label-luxe flex items-center gap-4 text-cream/80 transition-all duration-1000 ease-expo",
            on ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
          style={{ transitionDelay: "700ms" }}
        >
          <span className="h-px w-10 bg-brass" />
          Furniture &amp; Interior Atelier
        </div>

        <div>
          <h1 className="font-display leading-[1.04] text-cream [font-size:clamp(2.3rem,9.6vw,8.25rem)]">
            <SplitWords text="Beautiful Spaces." active={on} delay={820} className="block whitespace-nowrap" />
            <SplitWords
              text="Thoughtfully Yours."
              active={on}
              delay={1120}
              className="block whitespace-nowrap text-cream/90"
            />
          </h1>
          <p
            className={cn(
              "mt-8 max-w-md text-[15px] font-light leading-[1.85] tracking-wide text-cream/80 transition-all duration-1000 ease-expo",
              on ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
            style={{ transitionDelay: "1500ms" }}
          >
            ANVÉ is a luxury furniture and interior atelier composing residences of
            quiet permanence — piece by piece, room by room.
          </p>
        </div>

        <div
          className={cn(
            "flex items-end justify-between transition-all duration-1000 ease-expo",
            on ? "opacity-100" : "opacity-0",
          )}
          style={{ transitionDelay: "1750ms" }}
        >
          <span className="label-luxe text-cream/60 max-sm:text-[9px] max-sm:tracking-[0.22em]">Est. MMXII — Paris · London · NY</span>
          <div className="flex flex-col items-center gap-3">
            <span className="label-luxe hidden text-cream/60 sm:block">Scroll</span>
            <span className="block h-14 w-px overflow-hidden">
              <span className="block h-full w-px animate-scroll-hint bg-cream/70" />
            </span>
          </div>
          <span className="label-luxe hidden text-cream/60 md:block">N 48°51′ · E 2°21′</span>
        </div>
      </div>
    </section>
  );
}
