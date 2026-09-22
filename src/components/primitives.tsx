import { type ReactNode, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

/* ————————————————— Scroll reveal wrapper ————————————————— */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "span" | "p" | "h2" | "h3" | "figure";
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      className={cn(
        "transition-all duration-[1100ms] ease-expo will-change-transform",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ————————————————— Image with curtain reveal + smooth load ————————————————— */
export function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  delay = 0,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
  eager?: boolean;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.12);
  const [loaded, setLoaded] = useState(false);

  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-greige", className)}>
      {/* curtain that sweeps away on scroll-in */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 z-10 bg-greige transition-transform duration-[1200ms] ease-luxe",
          visible ? "-translate-y-full" : "translate-y-0",
        )}
        style={{ transitionDelay: `${delay}ms` }}
      />
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-all duration-[1400ms] ease-expo",
          visible && loaded ? "scale-100 opacity-100" : "scale-[1.07] opacity-0",
          imgClassName,
        )}
        style={{ transitionDelay: `${delay + 100}ms` }}
      />
    </div>
  );
}

/* ————————————————— Brass diamond — the brand's signature mark ————————————————— */
export function Diamond({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block h-[7px] w-[7px] rotate-45 bg-brass", className)}
    />
  );
}

export function DiamondRow({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("flex items-center gap-3", className)}>
      <Diamond />
      <span className="h-px w-16 bg-brass/60" />
      <Diamond />
    </span>
  );
}

/* ————————————————— Section header: index + label + hairline ————————————————— */
export function SectionHeading({
  index,
  label,
  light = false,
  className,
}: {
  index: string;
  label: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn("flex items-center gap-5", className)}>
      <span className={cn("label-luxe tnum", light ? "text-brass" : "text-brass")}>
        {index}
      </span>
      <span className={cn("h-px flex-1", light ? "bg-cream/15" : "bg-ink/15")} />
      <span className={cn("label-luxe", light ? "text-cream/60" : "text-fawn")}>
        {label}
      </span>
    </Reveal>
  );
}

/* ————————————————— Pill button with clip-path hover fill ————————————————— */
export function LuxeButton({
  children,
  href,
  onClick,
  variant = "dark",
  className,
  type,
  disabled,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "dark" | "light" | "outline";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const base =
    "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full border px-8 py-3.5 label-luxe transition-colors duration-500 disabled:cursor-not-allowed disabled:opacity-50";
  const skin =
    variant === "dark"
      ? "border-ink/40 bg-transparent text-ink"
      : variant === "light"
        ? "border-cream/40 bg-transparent text-cream"
        : "border-ink/20 text-ink";
  const fill = variant === "light" ? "bg-cream" : "bg-ink";
  const fillText = variant === "light" ? "group-hover:text-ink" : "group-hover:text-cream";

  const inner = (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 translate-y-full rounded-full transition-transform duration-700 ease-luxe group-hover:translate-y-0",
          fill,
        )}
        style={{ clipPath: "inset(0 round 999px)" }}
      />
      <span className={cn("relative z-10 transition-colors duration-500", fillText)}>
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className={cn(base, skin, className)}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={cn(base, skin, className)}>
      {inner}
    </button>
  );
}

/* ————————————————— Word-by-word masked text reveal ————————————————— */
export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 90,
  active = true,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  active?: boolean;
}) {
  const words = text.split(" ");
  return (
    <span className={cn("inline", className)} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
          <span
            className={cn(
              "inline-block transition-transform duration-[1100ms] ease-expo will-change-transform",
              active ? "translate-y-0" : "translate-y-[110%]",
              wordClassName,
            )}
            style={{ transitionDelay: `${delay + i * stagger}ms` }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
