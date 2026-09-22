import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"enter" | "exit" | "gone">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 1900);
    const t2 = setTimeout(() => {
      setPhase("gone");
      onDone();
    }, 1900 + 1100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink transition-transform duration-[1050ms] ease-luxe",
        phase === "exit" ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <img
        src="/images/logo-cream.png"
        alt=""
        className={cn(
          "w-[min(320px,64vw)] transition-all duration-[1100ms] ease-expo",
          phase === "exit" ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100",
        )}
      />
      <span
        className={cn(
          "mt-10 block h-px bg-brass transition-all duration-[1300ms] ease-expo",
          phase === "exit" ? "w-0 opacity-0" : "w-24 opacity-100",
        )}
        style={{ transitionDelay: "500ms" }}
      />
    </div>
  );
}
