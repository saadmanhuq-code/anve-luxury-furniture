import { Reveal, DiamondRow } from "@/components/primitives";

export default function Quote() {
  return (
    <section className="bg-greige px-6 py-28 md:px-14 md:py-36">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <Reveal>
          <DiamondRow />
        </Reveal>
        <Reveal delay={120}>
          <blockquote className="mt-10 font-display text-[clamp(1.8rem,4vw,3.4rem)] leading-[1.25] text-ink">
            “ANVÉ did not furnish our house — they{" "}
            <span className="text-terra">listened</span> to it. Every room now feels
            as though it had always been waiting for these pieces.”
          </blockquote>
        </Reveal>
        <Reveal delay={220}>
          <p className="label-luxe mt-10 text-fawn">
            Private Client · Penthouse Rive Gauche, Paris
          </p>
        </Reveal>
      </div>
    </section>
  );
}
