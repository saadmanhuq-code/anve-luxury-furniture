import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/data/content";
import { Reveal, SectionHeading, Diamond } from "@/components/primitives";
import { useAtelier } from "@/hooks/useAtelier";
import { cn } from "@/lib/utils";
import { Sparkles, Eye } from "lucide-react";

export default function Projects() {
  const [active, setActive] = useState(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { openProjectModal, startProjectInquiry } = useAtelier();

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const mid = window.innerHeight * 0.5;
      let idx = 0;
      blockRefs.current.forEach((el, i) => {
        if (!el) return;
        if (el.getBoundingClientRect().top <= mid) idx = i;
      });
      setActive(idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="interiors" className="bg-ink px-6 py-28 text-cream md:px-14 md:py-40">
      <SectionHeading index="03" label="Selected Interiors" light />

      <div className="mt-14 flex items-end justify-between md:mt-20">
        <Reveal>
          <h2 className="max-w-[18ch] font-display text-[clamp(2.1rem,4.6vw,4.2rem)] leading-[1.05]">
            Rooms that hold <span className="text-brass">their silence.</span>
          </h2>
        </Reveal>
        <Reveal delay={120} className="hidden md:block">
          <div className="tnum font-display text-2xl text-cream/60">
            <span className="text-brass">{PROJECTS[active].index}</span>
            <span className="mx-2 text-cream/30">/</span>
            {String(PROJECTS.length).padStart(2, "0")}
          </div>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-2 md:gap-12">
        {/* sticky crossfading image stage (desktop) */}
        <div className="relative hidden md:block">
          <div
            onClick={() => openProjectModal(PROJECTS[active])}
            className="group sticky top-28 aspect-[4/3] cursor-pointer overflow-hidden bg-espresso/40"
          >
            {PROJECTS.map((p, i) => (
              <img
                key={p.index}
                src={p.image}
                alt={p.title}
                loading="lazy"
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-all duration-[1100ms] ease-expo group-hover:scale-105",
                  i === active ? "scale-100 opacity-100" : "scale-[1.05] opacity-0",
                )}
              />
            ))}
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_68%,rgba(28,26,23,.55))]" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Diamond />
                <span className="label-luxe text-cream/85">{PROJECTS[active].location}</span>
              </div>
              <span className="label-luxe flex items-center gap-1.5 text-cream/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Eye className="h-3.5 w-3.5 text-brass" />
                Explore Case Study →
              </span>
            </div>
          </div>
        </div>

        {/* scrolling project panels */}
        <div className="flex flex-col">
          {PROJECTS.map((p, i) => (
            <div
              key={p.index}
              data-idx={i}
              ref={(el) => {
                blockRefs.current[i] = el;
              }}
              className="flex min-h-[70vh] flex-col justify-center border-t border-cream/10 py-14 first:border-t-0 md:min-h-[82vh]"
            >
              {/* mobile image */}
              <div
                onClick={() => openProjectModal(p)}
                className="relative mb-8 aspect-[4/3] cursor-pointer overflow-hidden md:hidden"
              >
                <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute bottom-3 right-3 bg-ink/75 px-3 py-1 text-[10px] label-luxe text-cream backdrop-blur-sm">
                  View Case Study →
                </div>
              </div>

              <Reveal>
                <div className="flex items-baseline gap-5">
                  <span className="tnum font-display text-lg text-brass">{p.index}</span>
                  <button
                    type="button"
                    onClick={() => openProjectModal(p)}
                    className="text-left font-display text-[clamp(1.9rem,3.4vw,3rem)] leading-tight hover:text-brass transition-colors"
                  >
                    {p.title}
                  </button>
                </div>
                <p className="label-luxe mt-3 text-cream/50 md:hidden">{p.location}</p>
              </Reveal>

              <Reveal delay={120}>
                <dl className="mt-10 grid grid-cols-2 gap-x-8">
                  {p.meta.map((m) => (
                    <div key={m.label} className="border-t border-cream/10 py-4">
                      <dt className="label-luxe text-cream/45">{m.label}</dt>
                      <dd className="tnum mt-2 text-[15px] font-light tracking-wide text-cream/90">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={200}>
                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <button
                    type="button"
                    onClick={() => openProjectModal(p)}
                    className="link-line label-luxe -mx-3 -my-3.5 inline-flex items-center gap-2 px-3 py-3.5 text-cream/80 hover:text-cream"
                  >
                    <Eye className="h-3.5 w-3.5 text-brass" />
                    Read Case Study
                  </button>

                  <button
                    type="button"
                    onClick={() => startProjectInquiry(p)}
                    className="link-line label-luxe -mx-3 -my-3.5 inline-flex items-center gap-2 px-3 py-3.5 text-brass"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Commission a similar interior
                  </button>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
