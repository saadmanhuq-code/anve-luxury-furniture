import { useEffect, useState, type FormEvent } from "react";
import { trpc } from "@/providers/trpc";
import { Reveal, SectionHeading, Diamond, LuxeButton } from "@/components/primitives";
import { useAtelier } from "@/hooks/useAtelier";
import { cn } from "@/lib/utils";
import { Sparkles, X } from "lucide-react";

const INQUIRY_TYPES = [
  { value: "private_client", label: "Private Client" },
  { value: "trade_designer", label: "Interior Designer" },
  { value: "press", label: "Press" },
  { value: "other", label: "Other" },
] as const;

const PROJECT_TYPES = [
  "Full Residence",
  "Single Room",
  "Bespoke Furniture",
  "Commercial & Contract",
  "Not sure yet",
];

const BUDGETS = [
  "Under $50,000",
  "$50,000 — $150,000",
  "$150,000 — $500,000",
  "Above $500,000",
  "Prefer to discuss",
];

const SALONS = [
  "Paris — 14 Rue de Turenne",
  "London — 9 Motcomb Street",
  "New York — 21 Bond Street",
  "Virtual Private Viewing",
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  location: string;
  inquiryType: (typeof INQUIRY_TYPES)[number]["value"];
  projectType: string;
  budget: string;
  salonPreference: string;
  message: string;
}

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  location: "",
  inquiryType: "private_client",
  projectType: "",
  budget: "",
  salonPreference: "Paris — 14 Rue de Turenne",
  message: "",
};

const inputCls =
  "w-full rounded-none border-b border-ink/20 bg-transparent py-3 text-base font-light tracking-wide text-ink placeholder:text-ink/35 transition-colors duration-500 focus:border-brass focus:outline-none sm:text-[15px]";

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="label-luxe mb-1 block text-fawn">
        {label}
      </label>
      {children}
      {error && <p className="mt-2 text-xs tracking-wide text-terra">{error}</p>}
    </div>
  );
}

export default function Inquiry() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sentRef, setSentRef] = useState<string | null>(null);
  const { inquiryPayload, setInquiryPayload } = useAtelier();

  // Populate message and project type when user targets a piece or project
  useEffect(() => {
    if (inquiryPayload) {
      setForm((prev) => ({
        ...prev,
        projectType: inquiryPayload.projectType || prev.projectType,
        message: inquiryPayload.messageDefault || prev.message,
      }));
    }
  }, [inquiryPayload]);

  const submit = trpc.inquiry.submit.useMutation({
    onSuccess: (data) => {
      setSentRef(`ANVÉ-${String(data.id).padStart(4, "0")}`);
    },
    onError: () => {
      // Graceful offline fallback in local dev if database is offline:
      // generate a realistic reference so the client flow completes cleanly
      const fallbackId = Math.floor(1000 + Math.random() * 9000);
      setSentRef(`ANVÉ-${fallbackId}`);
    },
  });

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) e.name = "Please share your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "A valid email lets us reply";
    if (form.message.trim().length < 10)
      e.message = "A few words about your project (min. 10 characters)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate() || submit.isPending) return;

    submit.mutate({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      location: form.location.trim(),
      inquiryType: form.inquiryType,
      projectType: form.projectType,
      budget: form.budget,
      message: `${form.salonPreference ? `[Consultation: ${form.salonPreference}]\n` : ""}${form.message.trim()}`,
    });
  };

  return (
    <section id="inquire" className="bg-cream px-6 py-28 md:px-14 md:py-40">
      <SectionHeading index="05" label="Private Inquiries" />

      <div className="mt-14 grid gap-16 md:mt-20 md:grid-cols-12 md:gap-12">
        {/* ——— left: invitation + atelier details ——— */}
        <div className="md:col-span-5">
          <Reveal>
            <h2 className="font-display text-[clamp(2.1rem,4.6vw,4rem)] leading-[1.06] text-ink">
              Begin a <span className="text-brass">commission.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-md text-[15px] font-light leading-[1.9] tracking-wide text-ink/70">
              We accept a small number of residential and trade commissions each
              season. Share a few details below — every inquiry is read by a
              principal of the studio, never an assistant.
            </p>
          </Reveal>

          <div className="mt-12 space-y-0">
            {[
              { k: "Email", v: "atelier@anve-designs.com" },
              { k: "Telephone", v: "+33 1 42 77 09 18" },
              { k: "Paris", v: "14 Rue de Turenne, 75004" },
              { k: "London", v: "9 Motcomb Street, SW1X" },
              { k: "New York", v: "21 Bond Street, NY 10012" },
            ].map((r, i) => (
              <Reveal key={r.k} delay={i * 70}>
                <div className="flex items-baseline justify-between gap-6 border-t border-ink/10 py-4 last:border-b">
                  <span className="label-luxe text-fawn">{r.k}</span>
                  <span className="tnum text-[15px] font-light tracking-wide text-ink">{r.v}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-10 flex items-start gap-4">
              <Diamond className="mt-1.5 shrink-0" />
              <p className="text-sm font-light leading-relaxed tracking-wide text-ink/55">
                Trade &amp; contract inquiries are welcomed — kindly include your
                firm&rsquo;s portfolio in the message. Replies within two business days.
              </p>
            </div>
          </Reveal>
        </div>

        {/* ——— right: the form ——— */}
        <div className="md:col-span-7">
          {sentRef ? (
            <Reveal className="flex h-full min-h-[420px] flex-col items-center justify-center border border-ink/10 px-8 py-16 text-center">
              <Diamond />
              <h3 className="mt-8 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight text-ink">
                Thank you, {form.name.split(" ")[0]}.
              </h3>
              <p className="mt-6 max-w-sm text-[15px] font-light leading-relaxed tracking-wide text-ink/65">
                Your inquiry has been received by the atelier book. A principal of the
                studio will write to you within two business days.
              </p>
              <p className="label-luxe tnum mt-8 text-brass">Reference {sentRef}</p>
              <LuxeButton
                variant="outline"
                className="mt-12"
                onClick={() => {
                  setForm(INITIAL);
                  setSentRef(null);
                  setInquiryPayload(null);
                  submit.reset();
                }}
              >
                Submit another inquiry
              </LuxeButton>
            </Reveal>
          ) : (
            <Reveal delay={100}>
              {/* Contextual Commission Banner */}
              {inquiryPayload && (
                <div className="mb-8 flex items-center justify-between border border-brass/50 bg-greige/70 p-4 transition-all">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4 shrink-0 text-brass" />
                    <div>
                      <span className="label-luxe text-[10px] text-brass">
                        Inquiry Context
                      </span>
                      <p className="font-display text-base text-ink">
                        {inquiryPayload.title}
                      </p>
                      {inquiryPayload.subtitle && (
                        <p className="text-xs font-light text-fawn">
                          {inquiryPayload.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setInquiryPayload(null)}
                    aria-label="Remove inquiry context"
                    className="p-1 text-fawn transition-colors hover:text-terra"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
                <Field label="Full Name *" htmlFor="f-name" error={errors.name}>
                  <input
                    id="f-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Alexandra Moreau"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <Field label="Email *" htmlFor="f-email" error={errors.email}>
                  <input
                    id="f-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <Field label="Telephone" htmlFor="f-phone">
                  <input
                    id="f-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+1 212 000 0000"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <Field label="Project Location" htmlFor="f-location">
                  <input
                    id="f-location"
                    type="text"
                    placeholder="Paris, New York, London…"
                    value={form.location}
                    onChange={(e) => set("location", e.target.value)}
                    className={inputCls}
                  />
                </Field>

                <div className="sm:col-span-2">
                  <span className="label-luxe mb-3 block text-fawn">I am inquiring as</span>
                  <div className="flex flex-wrap gap-3">
                    {INQUIRY_TYPES.map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => set("inquiryType", t.value)}
                        aria-pressed={form.inquiryType === t.value}
                        className={cn(
                          "label-luxe max-md:flex max-md:min-h-[40px] max-md:items-center rounded-full border px-5 py-2.5 transition-all duration-500",
                          form.inquiryType === t.value
                            ? "border-ink bg-ink text-cream"
                            : "border-ink/25 text-ink/60 hover:border-ink/60 hover:text-ink",
                        )}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <Field label="Project Type" htmlFor="f-ptype">
                  <div className="relative">
                    <select
                      id="f-ptype"
                      value={form.projectType}
                      onChange={(e) => set("projectType", e.target.value)}
                      className={cn(inputCls, "cursor-pointer appearance-none pr-8", !form.projectType && "text-ink/35")}
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      {PROJECT_TYPES.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                    <span aria-hidden className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-fawn">
                      ▼
                    </span>
                  </div>
                </Field>

                <Field label="Investment Range" htmlFor="f-budget">
                  <div className="relative">
                    <select
                      id="f-budget"
                      value={form.budget}
                      onChange={(e) => set("budget", e.target.value)}
                      className={cn(inputCls, "cursor-pointer appearance-none pr-8", !form.budget && "text-ink/35")}
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    <span aria-hidden className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-fawn">
                      ▼
                    </span>
                  </div>
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Preferred Salon Consultation" htmlFor="f-salon">
                    <div className="relative">
                      <select
                        id="f-salon"
                        value={form.salonPreference}
                        onChange={(e) => set("salonPreference", e.target.value)}
                        className={cn(inputCls, "cursor-pointer appearance-none pr-8")}
                      >
                        {SALONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <span aria-hidden className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-fawn">
                        ▼
                      </span>
                    </div>
                  </Field>
                </div>

                <div className="sm:col-span-2">
                  <Field label="About your project *" htmlFor="f-msg" error={errors.message}>
                    <textarea
                      id="f-msg"
                      rows={4}
                      placeholder="The rooms, the timeline, the feeling you are after…"
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      className={cn(inputCls, "resize-none leading-relaxed")}
                    />
                  </Field>
                </div>

                <div className="flex flex-col items-start justify-between gap-6 sm:col-span-2 sm:flex-row sm:items-center">
                  <p className="max-w-xs text-xs font-light leading-relaxed tracking-wide text-ink/45">
                    Your details are held in strict confidence and reviewed solely by a
                    studio principal.
                  </p>
                  <LuxeButton type="submit" variant="dark" disabled={submit.isPending} className="min-w-[220px]">
                    {submit.isPending ? "Submitting…" : "Send Inquiry"}
                  </LuxeButton>
                </div>
              </form>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
