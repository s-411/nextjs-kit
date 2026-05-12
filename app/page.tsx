import Link from "next/link";

const sections = [
  { id: "onboarding", title: "Onboarding", subtitle: "Splash · Welcome · Sign In · Create Account", count: 4 },
  { id: "tour", title: "Feature Tour", subtitle: "Daily Reminders states · Track Progress", count: 8 },
  { id: "home", title: "Home", subtitle: "Welcome to 75 Hard", count: 4 },
  { id: "day1", title: "Day 1", subtitle: "Daily checklist", count: 9 },
  { id: "paywall", title: "Paywall", subtitle: "Choose Your Plan · App Store · Success", count: 3 },
  { id: "progress-pic", title: "Progress Picture", subtitle: "Photo picker · Library access · Confirm", count: 6 },
  { id: "share-ig", title: "Share & IG Story", subtitle: "IG story view · Share or edit sheet", count: 2 },
  { id: "settings", title: "Settings", subtitle: "Edit Profile & Settings", count: 5 },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-co-dark text-co-fg">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24">
        <header className="mb-14">
          <p
            className="mb-3 text-sm uppercase tracking-[0.18em] text-co-orange"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Chasing Optimum
          </p>
          <h1
            className="text-5xl uppercase leading-none tracking-[0.02em] sm:text-7xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            75 Hard <span className="text-co-orange">Redesign</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-co-fg/80 sm:text-lg">
            A reskin of the 75 Hard app in the Chasing Optimum design system —
            dark surface, Anton display + Poppins body, orange pill CTAs.
            Forty-one iPhone artboards across eight sections, exported from
            Claude Design.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/75hard/canvas.html"
              className="inline-flex items-center justify-center rounded-full bg-co-orange px-7 py-4 uppercase tracking-[0.04em] text-co-on-orange transition-opacity hover:opacity-90"
              style={{ fontFamily: "var(--font-display)", fontSize: 18 }}
            >
              Open Design Canvas
            </Link>
            <Link
              href="/75hard/index.html"
              className="inline-flex items-center justify-center rounded-full border border-co-fg/70 px-7 py-4 uppercase tracking-[0.04em] text-co-fg transition-colors hover:bg-co-fg/10"
              style={{ fontFamily: "var(--font-display)", fontSize: 18 }}
            >
              Onboarding Router
            </Link>
          </div>
        </header>

        <section>
          <h2
            className="mb-6 text-xs uppercase tracking-[0.2em] text-co-fg/60"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Sections in the canvas
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {sections.map((s) => (
              <li
                key={s.id}
                className="flex items-baseline justify-between rounded-2xl border border-co-divider bg-co-card px-5 py-4"
              >
                <div>
                  <p
                    className="text-lg uppercase tracking-[0.04em]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.title}
                  </p>
                  <p className="mt-1 text-sm text-co-fg/60">{s.subtitle}</p>
                </div>
                <span
                  className="ml-4 shrink-0 rounded-full bg-co-orange/15 px-3 py-1 text-xs uppercase tracking-[0.08em] text-co-orange"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.count} screens
                </span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-16 border-t border-co-divider pt-8 text-sm text-co-fg/55">
          <p>
            Prototype source lives at{" "}
            <code className="rounded bg-co-card px-1.5 py-0.5">public/75hard/</code>.
            The canvas page is a pan/zoom Figma-style surface — drag the
            background to pan, scroll or pinch to zoom, click any artboard
            label to enter focus mode (← / → / Esc).
          </p>
        </footer>
      </div>
    </main>
  );
}
