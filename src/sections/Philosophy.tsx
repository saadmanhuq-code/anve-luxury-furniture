import { Reveal, SectionHeading, SmartImage, DiamondRow } from "@/components/primitives";

const STATS = [
  { value: "17", label: "Years of practice" },
  { value: "340", label: "Residences composed" },
  { value: "12", label: "Master ateliers" },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative bg-cream px-6 py-28 md:px-14 md:py-40">
      <SectionHeading index="01" label="Philosophy" />

      <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <Reveal>
            <h2 className="font-display text-[clamp(2.1rem,4.6vw,4.2rem)] leading-[1.08] text-ink">
              We believe a room is not decorated —{" "}
              <span className="text-brass">it is composed.</span> Every proportion,
              every shadow, every grain of walnut has a voice.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-10 max-w-xl text-[15px] font-light leading-[1.9] tracking-wide text-ink/70">
              Founded in a Paris courtyard workshop, ANVÉ designs and builds furniture
              the slow way: drawings by hand, timber rested for seasons, finishes
              rubbed in wax and time. Our interiors are quiet on purpose — spaces that
              hold their inhabitants rather than impress their visitors.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-6 max-w-xl text-[15px] font-light leading-[1.9] tracking-wide text-ink/70">
              Each commission is limited, numbered, and made to outlive its brief.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-ink/10 pt-10 md:mt-20">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 110}>
                <div className="tnum font-display text-[clamp(2.2rem,4.5vw,3.6rem)] leading-none text-ink">
                  {s.value}
                </div>
                <div className="label-luxe mt-3 text-fawn">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="relative md:col-span-5">
          <Reveal delay={180} className="md:sticky md:top-32">
            <SmartImage
              src="/images/philosophy.jpg"
              alt="Travertine console beneath an abstract canvas in a quiet hallway"
              className="aspect-[3/4] w-full"
            />
            <div className="mt-4 flex items-center justify-between">
              <span className="label-luxe text-fawn">Hallway, Private Commission</span>
              <span className="label-luxe tnum text-fawn">Fig. 01</span>
            </div>
          </Reveal>
          <DiamondRow className="absolute -bottom-14 right-0 hidden md:flex" />
        </div>
      </div>
    </section>
  );
}
