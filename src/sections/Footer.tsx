import { NAV_LINKS } from "@/data/content";
import { Diamond, Reveal } from "@/components/primitives";

export default function Footer({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <footer className="bg-ink px-6 pb-10 pt-24 text-cream md:px-14 md:pt-32">
      <Reveal className="flex justify-center">
        <img src="/images/logo-cream.png" alt="ANVÉ Designs" className="w-[min(300px,58vw)]" />
      </Reveal>

      <Reveal delay={100} className="mt-16 flex items-center justify-center gap-4">
        <Diamond />
        <Diamond />
        <Diamond />
      </Reveal>

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-10 border-t border-cream/10 pt-12 md:grid-cols-4">
        <div>
          <p className="label-luxe text-cream/40">Explore</p>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(l.href);
                  }}
                  className="link-line -my-2 inline-block py-2 text-sm font-light tracking-wide text-cream/80"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label-luxe text-cream/40">Ateliers</p>
          <ul className="mt-5 space-y-3 text-sm font-light tracking-wide text-cream/80">
            <li>Paris — 14 Rue de Turenne</li>
            <li>London — 9 Motcomb Street</li>
            <li>New York — 21 Bond Street</li>
          </ul>
        </div>
        <div>
          <p className="label-luxe text-cream/40">Contact</p>
          <ul className="mt-5 space-y-3 text-sm font-light tracking-wide text-cream/80">
            <li>
              <a href="mailto:atelier@anve-designs.com" className="link-line -my-2 inline-block py-2">
                atelier@anve-designs.com
              </a>
            </li>
            <li className="tnum">+33 1 42 77 09 18</li>
            <li>By appointment only</li>
          </ul>
        </div>
        <div>
          <p className="label-luxe text-cream/40">Follow</p>
          <ul className="mt-5 space-y-3">
            {["Instagram", "Pinterest", "Architectural Digest"].map((s) => (
              <li key={s}>
                <a href="#top" onClick={(e) => e.preventDefault()} className="link-line -my-2 inline-block py-2 text-sm font-light tracking-wide text-cream/80">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-5xl flex-col items-center justify-between gap-6 border-t border-cream/10 pt-8 sm:flex-row">
        <p className="label-luxe text-cream/35">© MMXXVI ANVÉ Designs — All rights reserved</p>
        <p className="label-luxe hidden text-cream/35 md:block">Beautiful Spaces · Thoughtfully Yours</p>
        <button
          onClick={() => onNavigate("#top")}
          className="group relative -m-3 overflow-hidden p-3 text-cream/70 transition-colors hover:text-cream"
        >
          <span className="label-luxe block transition-transform duration-300 ease-expo group-hover:translate-y-[3px]">
            Back to top ↑
          </span>
        </button>
      </div>
    </footer>
  );
}
