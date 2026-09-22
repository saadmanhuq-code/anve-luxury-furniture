/**
 * Minimal inertial smooth-scroll engine (window-based, so position:sticky keeps
 * working). Hijacks wheel input and lerps window.scrollTo; touch devices keep
 * native scrolling. Programmatic navigation uses an eased animation.
 */
export class SmoothScroll {
  private current = 0;
  private target = 0;
  private raf = 0;
  private running = true;
  private animFrame = 0;
  private lerp: number;
  private mult: number;
  private onWheel = (e: WheelEvent) => {
    if (!this.running) return;
    e.preventDefault();
    const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
    this.target = this.clamp(this.target + delta * this.mult);
  };
  private onNativeScroll = () => {
    // user dragged the scrollbar or a touch scroll happened — resync
    if (Math.abs(window.scrollY - this.current) > 2 && !this.animating) {
      this.current = this.target = window.scrollY;
    }
  };
  private animating = false;

  constructor({ lerp = 0.09, wheelMultiplier = 1 }: { lerp?: number; wheelMultiplier?: number } = {}) {
    this.lerp = lerp;
    this.mult = wheelMultiplier;
    this.current = this.target = window.scrollY;
    window.addEventListener("wheel", this.onWheel, { passive: false });
    window.addEventListener("scroll", this.onNativeScroll, { passive: true });
    const loop = () => {
      const diff = this.target - this.current;
      if (Math.abs(diff) > 0.1) {
        this.current += diff * this.lerp;
        window.scrollTo(0, this.current);
      } else if (this.animating) {
        this.animating = false;
      }
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  private clamp(v: number) {
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    return Math.min(Math.max(0, v), max);
  }

  scrollTo(to: number | HTMLElement, { duration = 1400, offset = 0 }: { duration?: number; offset?: number } = {}) {
    const start = this.current;
    const end =
      typeof to === "number"
        ? this.clamp(to + offset)
        : this.clamp(to.getBoundingClientRect().top + window.scrollY + offset);
    const t0 = performance.now();
    this.animating = true;
    cancelAnimationFrame(this.animFrame);
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const e = p < 0.5 ? 16 * p ** 5 : 1 - (-2 * p + 2) ** 5 / 2; // easeInOutQuint
      this.current = this.target = start + (end - start) * e;
      window.scrollTo(0, this.current);
      if (p < 1) this.animFrame = requestAnimationFrame(step);
      else this.animating = false;
    };
    this.animFrame = requestAnimationFrame(step);
  }

  stop() {
    this.running = false;
  }

  start() {
    this.running = true;
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    cancelAnimationFrame(this.animFrame);
    window.removeEventListener("wheel", this.onWheel);
    window.removeEventListener("scroll", this.onNativeScroll);
  }
}
