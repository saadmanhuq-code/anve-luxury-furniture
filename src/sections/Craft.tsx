import { useState } from "react";
import { MATERIALS, PIECES } from "@/data/content";
import { Reveal, SectionHeading, SmartImage } from "@/components/primitives";
import { useAtelier } from "@/hooks/useAtelier";
import { cn } from "@/lib/utils";
import { Sparkles, ChevronDown } from "lucide-react";

export default function Craft() {
  const [selectedMatId, setSelectedMatId] = useState<string | null>(null);
  const { openPieceModal, setInquiryPayload } = useAtelier();

  const toggleMaterial = (id: string) => {
    setSelectedMatId((prev) => (prev === id ? null : id));
  };

  const requestSample = (matName: string) => {
    setInquiryPayload({
      title: `Material Sample Box — ${matName}`,
      subtitle: "Tactile swatch kit curated for your interior project",
      projectType: "Bespoke Furniture",
      messageDefault: `I would like to request an atelier material sample box featuring ${matName} and coordinating finishes for an upcoming project.`,
    });
    const el = document.getElementById("inquire");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="atelier" className="bg-cream px-6 py-28 md:px-14 md:py-40">
      <SectionHeading index="04" label="The Atelier" />

      <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-12 md:gap-10">
        <div className="order-2 md:order-1 md:col-span-5">
          <Reveal delay={140}>
            <SmartImage
              src="/images/craft.jpg"
              alt="A maker fitting the spindles of a chair by hand in the ANVÉ workshop"
              className="aspect-[4/3] w-full"
            />
            <div className="mt-4 flex items-center justify-between">
              <span className="label-luxe text-fawn">Chair fitting, Rue de Turenne workshop</span>
              <span className="label-luxe tnum text-fawn">Fig. 02</span>
            </div>
          </Reveal>
        </div>

        <div className="order-1 md:order-2 md:col-span-7">
          <Reveal>
            <h2 className="font-display text-[clamp(2.1rem,4.6vw,4.2rem)] leading-[1.08] text-ink">
              Slow made, <span className="text-brass">by hand,</span> in four materials
              we know intimately.
            </h2>
          </Reveal>

          <div className="mt-14">
            {MATERIALS.map((m, i) => {
              const isOpen = selectedMatId === m.id;
              const associatedPieces = PIECES.filter((p) =>
                m.featuredPieceIds.includes(p.id),
              );

              return (
                <Reveal key={m.id} delay={i * 90}>
                  <div className="border-t border-ink/10 last:border-b">
                    <button
                      type="button"
                      onClick={() => toggleMaterial(m.id)}
                      className="group flex w-full items-baseline justify-between gap-6 py-6 text-left transition-colors"
                    >
                      <div className="flex items-baseline gap-6">
                        <span className="label-luxe tnum text-brass">0{i + 1}</span>
                        <h3 className="font-display text-[1.6rem] text-ink transition-colors duration-500 group-hover:text-brass md:text-[1.9rem]">
                          {m.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="hidden max-w-[220px] text-right text-sm font-light leading-relaxed tracking-wide text-ink/55 sm:block">
                          {m.note}
                        </p>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 text-fawn transition-transform duration-300",
                            isOpen && "rotate-180 text-brass",
                          )}
                        />
                      </div>
                    </button>

                    {/* Expandable provenance & piece tray */}
                    {isOpen && (
                      <div className="pb-8 pt-2 animate-in fade-in duration-300">
                        <div className="rounded-none border border-ink/10 bg-greige/50 p-6">
                          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-baseline">
                            <div>
                              <span className="label-luxe text-brass">Quarry &amp; Harvest Provenance</span>
                              <p className="mt-1 text-sm font-medium text-ink">{m.origin}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => requestSample(m.name)}
                              className="link-line label-luxe inline-flex items-center gap-1.5 text-brass"
                            >
                              <Sparkles className="h-3 w-3" />
                              Request Swatch Box
                            </button>
                          </div>

                          <p className="mt-4 text-xs font-light leading-relaxed text-ink/75">
                            {m.tactileDescription}
                          </p>

                          {associatedPieces.length > 0 && (
                            <div className="mt-6 border-t border-ink/10 pt-4">
                              <span className="label-luxe text-[10px] text-fawn">
                                Signature Works in {m.name}
                              </span>
                              <div className="mt-3 flex flex-wrap gap-3">
                                {associatedPieces.map((p) => (
                                  <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => openPieceModal(p)}
                                    className="group/p flex items-center gap-2 border border-ink/15 bg-cream px-3 py-1.5 transition-all hover:border-ink"
                                  >
                                    <img
                                      src={p.image}
                                      alt={p.name}
                                      className="h-6 w-6 object-cover"
                                    />
                                    <span className="text-xs font-light text-ink group-hover/p:text-brass">
                                      {p.name}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={200}>
            <p className="mt-10 max-w-lg text-[15px] font-light leading-[1.9] tracking-wide text-ink/70">
              Nothing leaves the atelier until it has been sat in, leaned on, opened
              and closed a hundred times. Our guarantee is not a document — it is the
              weight of the thing itself.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
