/* tour2.jsx — Onboarding tour screens 4–6 + Home.
   Continues from tour.jsx. Dark CO system, orange pill CTAs, Anton headings. */

const TT2 = window.CO_TOKENS;

/* ---------- shared (mirrors tour.jsx) ---------- */
const Dots2 = ({ count = 6, active = 0 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} style={{
        width: i === active ? 22 : 8, height: 8, borderRadius: 9999,
        background: i === active ? TT2.brand : '#4A4A4A',
      }} />
    ))}
  </div>
);
const SpadeMark2 = ({ size = 56 }) => (
  <div style={{ position: 'relative', width: size, height: size, flex: '0 0 auto' }}>
    <svg viewBox="0 0 64 72" width={size} height={size}>
      <path d="M32 2 C32 2 8 22 8 40 C8 52 16 60 24 60 C28 60 30 58 30 58 L26 70 L38 70 L34 58 C34 58 36 60 40 60 C48 60 56 52 56 40 C56 22 32 2 32 2 Z" fill={TT2.fg} />
    </svg>
    <div style={{
      position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
      paddingBottom: 10, fontFamily: TT2.body, fontWeight: 700,
      fontSize: size * 0.32, color: TT2.bg,
    }}>75</div>
  </div>
);

/* CO brand mark — animated Chasing 30 sun GIF. Use on Home + Day 1. */
const BrandMark = ({ size = 56 }) => (
  <img src="assets/brand-mark-animated.gif" alt="Chasing Optimum"
    style={{ width: size, height: size, objectFit: 'contain', display: 'block', flex: '0 0 auto' }} />
);
const HeadingBlock2 = ({ title, body }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <SpadeMark2 />
      <h2 style={{
        margin: 0, fontFamily: TT2.display, fontSize: 38, fontWeight: 500,
        letterSpacing: '0.02em', lineHeight: 1,
        color: TT2.fg, textTransform: 'uppercase',
      }}>{title}</h2>
    </div>
    <p style={{ margin: 0, fontFamily: TT2.body, fontSize: 16, lineHeight: 1.45, color: TT2.fg }}>{body}</p>
  </div>
);
const TourFooter2 = ({ active, onNext, showNext = true }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 18 }}>
    <Dots2 count={6} active={active} />
    {showNext && (
      <button onClick={onNext} style={{
        background: 'transparent', border: 0, cursor: 'pointer',
        fontFamily: TT2.body, fontSize: 17, fontWeight: 500, color: TT2.fg, padding: 0,
      }}>Next</button>
    )}
  </div>
);

/* =========================================================
   10 — Daily Rules
   ========================================================= */
const RuleIcon = ({ kind }) => {
  const c = TT2.fg;
  const s = { width: 32, height: 32, color: c, flex: '0 0 32px' };
  switch (kind) {
    case 'dumbbell': return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="9" width="3" height="6" rx="1" /><rect x="19" y="9" width="3" height="6" rx="1" />
        <rect x="5" y="7" width="2" height="10" rx="0.5" /><rect x="17" y="7" width="2" height="10" rx="0.5" />
        <line x1="7" y1="12" x2="17" y2="12" />
      </svg>
    );
    case 'cloud': return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 14 a4 4 0 0 1 0.5 -7.95 a5 5 0 0 1 9.6 1.4 a3.5 3.5 0 0 1 -0.6 6.95 Z" />
        <line x1="8" y1="17" x2="7" y2="20" /><line x1="12" y1="17" x2="11" y2="20" /><line x1="16" y1="17" x2="15" y2="20" />
      </svg>
    );
    case 'diet': return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3 h8 l3 3 v15 h-11 z" /><line x1="7" y1="9" x2="12" y2="9" /><line x1="7" y1="12" x2="12" y2="12" />
        <circle cx="17" cy="14" r="2.5" /><path d="M17 11.5 c0 -1 1 -1.5 1.5 -1.5" />
      </svg>
    );
    case 'bottle': return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 3 h4 v3 l1.5 2 v11 a2 2 0 0 1 -2 2 h-3 a2 2 0 0 1 -2 -2 V8 L10 6 z" />
      </svg>
    );
    case 'water': return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3 C9 3 5 9 5 13 a4 4 0 0 0 8 0 C13 9 9 3 9 3 z" />
        <path d="M16 9 C16 9 13 13 13 16 a3 3 0 0 0 6 0 C19 13 16 9 16 9 z" />
      </svg>
    );
    case 'book': return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 5 h7 a2 2 0 0 1 2 2 v13 a2 2 0 0 0 -2 -2 H3 z" />
        <path d="M21 5 h-7 a2 2 0 0 0 -2 2 v13 a2 2 0 0 1 2 -2 h7 z" />
      </svg>
    );
    case 'photo': return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="14" height="14" rx="1.5" /><rect x="7" y="3" width="14" height="14" rx="1.5" />
        <circle cx="14" cy="8" r="2" />
      </svg>
    );
    default: return null;
  }
};

const DailyRulesScreen = ({ onNext = () => {} }) => {
  const rules = [
    { k: 'dumbbell', t: 'Two 45 minute workouts, 3 hours apart.' },
    { k: 'cloud', t: 'One workout must be outdoors.' },
    { k: 'diet', t: 'Follow a diet.' },
    { k: 'bottle', t: 'No alcohol or cheat meals.' },
    { k: 'water', t: 'Drink 1 gallon of water.' },
    { k: 'book', t: 'Read 10 pages, nonfiction. Audiobooks do not count.' },
    { k: 'photo', t: 'Take a progress pic' },
  ];
  return (
    <div style={{
      minHeight: '100%', width: '100%', background: TT2.bg, position: 'relative',
      display: 'flex', flexDirection: 'column', padding: '40px 24px 22px',
      overflowY: 'auto',
    }}>
      <p style={{
        margin: '0 0 18px 0', textAlign: 'center',
        fontFamily: TT2.body, fontSize: 15, lineHeight: 1.4, color: TT2.fg,
      }}>
        Follow this program every day exactly as it's stated for 75 days and become a new, better you.
      </p>

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {rules.map((r, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <RuleIcon kind={r.k} />
            <span style={{ fontFamily: TT2.body, fontSize: 14, lineHeight: 1.35, color: TT2.fg, paddingTop: 6 }}>{r.t}</span>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 'auto', marginBottom: 12 }}>
        <HeadingBlock2 title="Daily Rules" body="Zero Compromises, Zero Substitutions." />
      </div>
      <TourFooter2 active={3} onNext={onNext} />
    </div>
  );
};

/* =========================================================
   11 — Easy Sharing
   ========================================================= */
const EasySharingScreen = ({ onNext = () => {} }) => (
  <div style={{
    minHeight: '100%', width: '100%', background: TT2.bg,
    display: 'flex', flexDirection: 'column', padding: '40px 24px 22px',
  }}>
    <p style={{
      margin: '0 0 20px 0', textAlign: 'center',
      fontFamily: TT2.body, fontSize: 15, lineHeight: 1.4, color: TT2.fg,
    }}>
      Share your completed days to your Instagram Story right from the app.
    </p>

    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
      {/* Instagram glyph */}
      <svg width="86" height="86" viewBox="0 0 24 24" fill="none" stroke={TT2.fg} strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.2" fill={TT2.fg} />
      </svg>
      {/* up arrow */}
      <svg width="22" height="46" viewBox="0 0 22 46" fill="none" stroke={TT2.fg} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="11" y1="44" x2="11" y2="6" />
        <polyline points="3 14 11 4 19 14" />
      </svg>
      {/* App icon */}
      <div style={{
        width: 86, height: 86, borderRadius: 20, background: TT2.fg,
        display: 'grid', placeItems: 'center',
      }}>
        <div style={{ transform: 'scale(0.9)' }}>
          <svg viewBox="0 0 64 72" width={60} height={60}>
            <path d="M32 2 C32 2 8 22 8 40 C8 52 16 60 24 60 C28 60 30 58 30 58 L26 70 L38 70 L34 58 C34 58 36 60 40 60 C48 60 56 52 56 40 C56 22 32 2 32 2 Z" fill={TT2.bg} />
          </svg>
        </div>
      </div>
    </div>

    <div style={{ marginBottom: 12 }}>
      <HeadingBlock2 title="Easy Sharing" body="Effortlessly post your completed days." />
    </div>
    <TourFooter2 active={4} onNext={onNext} />
  </div>
);

/* =========================================================
   12 — Progress Check (final)
   ========================================================= */
const ProgressCheckScreen = ({ onFresh = () => {}, onContinue = () => {} }) => (
  <div style={{
    minHeight: '100%', width: '100%', background: TT2.bg,
    display: 'flex', flexDirection: 'column', padding: '40px 24px 22px',
  }}>
    <p style={{
      margin: '24px 0 22px 0', textAlign: 'center',
      fontFamily: TT2.body, fontSize: 16, lineHeight: 1.4, color: TT2.fg,
    }}>
      Have you already started 75 hard?
    </p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <button onClick={onFresh} style={{
        width: '100%', padding: '18px 24px',
        background: TT2.brand, color: '#000',
        border: 0, borderRadius: 9999, cursor: 'pointer',
        fontFamily: TT2.display, fontSize: 20, fontWeight: 500,
        letterSpacing: '0.04em', textTransform: 'uppercase',
      }}>I'm Starting Fresh</button>
      <button onClick={onContinue} style={{
        width: '100%', padding: '18px 24px',
        background: 'transparent', color: TT2.fg,
        border: `1px solid ${TT2.fg}`, borderRadius: 9999, cursor: 'pointer',
        fontFamily: TT2.display, fontSize: 20, fontWeight: 500,
        letterSpacing: '0.04em', textTransform: 'uppercase',
      }}>I Already Started</button>
    </div>

    <div style={{ flex: 1 }} />

    <div style={{ marginBottom: 12 }}>
      <HeadingBlock2 title="Progress Check" body="Already started 75 Hard? Keep going!" />
    </div>
    <TourFooter2 active={5} showNext={false} />
  </div>
);

/* =========================================================
   13 — Home (Welcome to 75 Hard)
   ========================================================= */
const HomeScreen = ({ onStart = () => {} }) => (
  <div style={{
    minHeight: '100%', width: '100%', background: TT2.bg,
    display: 'flex', flexDirection: 'column', overflowY: 'auto',
  }}>
    {/* Hero with portrait placeholder */}
    <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1.05', background: '#111' }}>
      {/* Settings */}
      <button style={{
        position: 'absolute', top: 18, right: 18,
        background: 'transparent', border: 0, color: TT2.fg, cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 8,
        fontFamily: TT2.body, fontSize: 15, fontWeight: 500,
      }}>
        Settings
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15 a1.65 1.65 0 0 0 .33 1.82 l.06.06 a2 2 0 0 1 -2.83 2.83 l-.06-.06 a1.65 1.65 0 0 0 -1.82 -.33 1.65 1.65 0 0 0 -1 1.51 V21 a2 2 0 0 1 -4 0 v-.09 a1.65 1.65 0 0 0 -1 -1.51 1.65 1.65 0 0 0 -1.82 .33 l-.06.06 a2 2 0 0 1 -2.83 -2.83 l.06-.06 a1.65 1.65 0 0 0 .33 -1.82 1.65 1.65 0 0 0 -1.51 -1 H3 a2 2 0 0 1 0 -4 h.09 a1.65 1.65 0 0 0 1.51 -1 1.65 1.65 0 0 0 -.33 -1.82 l-.06-.06 a2 2 0 0 1 2.83 -2.83 l.06.06 a1.65 1.65 0 0 0 1.82 .33 H9 a1.65 1.65 0 0 0 1 -1.51 V3 a2 2 0 0 1 4 0 v.09 a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82 -.33 l.06-.06 a2 2 0 0 1 2.83 2.83 l-.06.06 a1.65 1.65 0 0 0 -.33 1.82 V9 a1.65 1.65 0 0 0 1.51 1 H21 a2 2 0 0 1 0 4 h-.09 a1.65 1.65 0 0 0 -1.51 1 z" />
        </svg>
      </button>
      {/* placeholder gradient portrait */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 35%, #3a2a22 0%, #1a1410 55%, #000 100%)',
      }} />
      <div style={{
        position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center',
        fontFamily: TT2.display, fontSize: 34, fontWeight: 500, letterSpacing: '0.03em',
        color: TT2.fg, textTransform: 'uppercase',
      }}>
        Welcome to 75 Hard
      </div>
    </div>

    {/* Podcast card */}
    <div style={{ position: 'relative', width: '100%', aspectRatio: '1.6 / 1', background: '#0d0d0d', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%), radial-gradient(circle at 60% 40%, #4a2a1a 0%, #0d0d0d 70%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: 9999, border: `2px solid ${TT2.fg}`,
          display: 'grid', placeItems: 'center',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill={TT2.fg}>
            <polygon points="6 4 20 12 6 20" />
          </svg>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 16, bottom: 14, color: TT2.fg }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <BrandMark size={26} />
          <span style={{ fontFamily: TT2.body, fontSize: 14, fontWeight: 500 }}>Podcast</span>
        </div>
        <div style={{ fontFamily: TT2.display, fontSize: 24, fontWeight: 500, letterSpacing: '0.02em' }}>All About 75 Hard</div>
      </div>
    </div>

    {/* Book card — white surface */}
    <div style={{ background: '#fff', padding: 16, display: 'flex', gap: 14, alignItems: 'center' }}>
      <div style={{
        width: 110, height: 150, background: '#1a1208',
        border: '2px solid #a07a3a', borderRadius: 4,
        display: 'grid', placeItems: 'center', flex: '0 0 110px',
        color: '#d4af6f', textAlign: 'center', padding: 8,
        fontFamily: 'Georgia, serif', fontSize: 10, lineHeight: 1.3,
      }}>
        <div>
          <div style={{ fontSize: 8, marginBottom: 6 }}>THE BOOK ON</div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>MENTAL<br/>TOUGHNESS</div>
          <div style={{ fontSize: 7, marginTop: 12 }}>ANDY FRISELLA</div>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: TT2.display, fontSize: 20, fontWeight: 500,
          letterSpacing: '0.02em', color: '#1D1D1D', textTransform: 'uppercase', lineHeight: 1.1,
          marginBottom: 10,
        }}>The Book on<br/>Mental Toughness</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: TT2.brand, fontFamily: TT2.body, fontWeight: 600, fontSize: 13 }}>
          GET IT NOW
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20" /></svg>
        </div>
      </div>
    </div>

    {/* Gear card — white surface */}
    <div style={{ background: '#f6f4ef', padding: 16, display: 'flex', gap: 14, alignItems: 'center' }}>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: TT2.display, fontSize: 20, fontWeight: 500,
          letterSpacing: '0.02em', color: '#1D1D1D', textTransform: 'uppercase', marginBottom: 8,
        }}>Get 75 Hard Gear</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 10px 0', fontFamily: TT2.body, fontSize: 14, color: '#1D1D1D', lineHeight: 1.5 }}>
          <li>Shirts</li><li>Patches</li><li>Pins</li><li>Challenge Coins</li>
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: TT2.brand, fontFamily: TT2.body, fontWeight: 600, fontSize: 13 }}>
          SHOP NOW
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20" /></svg>
        </div>
      </div>
      <div style={{
        width: 110, height: 140, background: '#2a2a2a', borderRadius: 4,
        display: 'grid', placeItems: 'center', color: TT2.fg,
        fontFamily: TT2.body, fontWeight: 700, fontSize: 12,
      }}>#75HARD</div>
    </div>

    {/* Ready CTA bar */}
    <div style={{ background: TT2.bg, padding: '22px 20px 24px' }}>
      <div style={{
        fontFamily: TT2.display, fontSize: 24, fontWeight: 500, letterSpacing: '0.02em',
        color: TT2.fg, textTransform: 'uppercase', textAlign: 'center', marginBottom: 14,
      }}>Ready to get started?</div>
      <button onClick={onStart} style={{
        width: '100%', padding: '16px 20px',
        background: TT2.brand, color: '#000',
        border: 0, borderRadius: 9999, cursor: 'pointer',
        fontFamily: TT2.display, fontSize: 18, fontWeight: 500,
        letterSpacing: '0.04em', textTransform: 'uppercase',
      }}>Start Day 1 Now</button>
      <div style={{ textAlign: 'center', marginTop: 14 }}>
        <a href="#" style={{
          fontFamily: TT2.body, fontSize: 14, color: TT2.fg,
          textDecoration: 'underline',
        }}>I've already started</a>
      </div>
    </div>
  </div>
);

/* =========================================================
   14 — Podcast Source bottom sheet (over Home)
   ========================================================= */
const PodcastSourceSheet = ({ onPick = () => {}, onCancel = () => {} }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, opacity: 0.35 }}>
      <HomeScreen />
    </div>
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      background: '#f5f3ee', borderTopLeftRadius: 16, borderTopRightRadius: 16,
      padding: '14px 20px 28px',
      display: 'flex', flexDirection: 'column', gap: 18,
    }}>
      <div style={{ width: 44, height: 5, borderRadius: 9999, background: '#bdbdbd', margin: '0 auto 6px' }} />
      <div style={{
        fontFamily: TT2.body, fontSize: 17, fontWeight: 500, color: '#1D1D1D', textAlign: 'left',
        paddingBottom: 14, borderBottom: '1px solid #e5e1d6',
      }}>Select Podcast Source</div>
      {['Apple Podcasts', 'Spotify'].map((label) => (
        <button key={label} onClick={() => onPick(label)} style={{
          width: '100%', padding: '16px 20px',
          background: TT2.brand, color: '#000',
          border: 0, borderRadius: 9999, cursor: 'pointer',
          fontFamily: TT2.display, fontSize: 18, fontWeight: 500,
          letterSpacing: '0.04em', textTransform: 'uppercase',
        }}>{label}</button>
      ))}
      <button onClick={onCancel} style={{
        background: 'transparent', border: 0, cursor: 'pointer',
        fontFamily: TT2.body, fontSize: 16, fontWeight: 400, color: '#1D1D1D',
        padding: '10px 0 0',
      }}>Cancel</button>
    </div>
  </div>
);

/* =========================================================
   15 — Start Day 1 confirm modal (over Home)
   ========================================================= */
const StartDay1Modal = ({ onStart = () => {}, onCancel = () => {} }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
      <HomeScreen />
    </div>
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
    <div style={{
      position: 'absolute', top: '50%', left: 20, right: 20,
      transform: 'translateY(-50%)',
      background: '#f5f3ee', borderRadius: 4,
      padding: '26px 24px 24px',
      display: 'flex', flexDirection: 'column', gap: 16,
    }}>
      <div style={{
        fontFamily: TT2.display, fontSize: 22, fontWeight: 500, letterSpacing: '0.02em',
        color: '#1D1D1D', textTransform: 'uppercase',
      }}>Ready to Start Day 1?</div>
      <p style={{ margin: 0, fontFamily: TT2.body, fontSize: 14.5, lineHeight: 1.55, color: '#1D1D1D' }}>
        If you continue, day 1 will begin now.
      </p>
      <p style={{ margin: 0, fontFamily: TT2.body, fontSize: 14.5, lineHeight: 1.55, color: '#1D1D1D' }}>
        If you're looking to learn more, check out the podcast above or visit 75hard.com.
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 14, marginTop: 6 }}>
        <button onClick={onCancel} style={{
          background: 'transparent', border: 0, cursor: 'pointer',
          fontFamily: TT2.body, fontSize: 14, color: '#1D1D1D', padding: '12px 8px',
        }}>Not Ready Yet</button>
        <button onClick={onStart} style={{
          background: TT2.brand, color: '#000', border: 0, borderRadius: 9999,
          padding: '12px 26px', cursor: 'pointer',
          fontFamily: TT2.display, fontSize: 16, fontWeight: 500,
          letterSpacing: '0.04em', textTransform: 'uppercase',
        }}>Start Now</button>
      </div>
    </div>
  </div>
);

/* =========================================================
   16 — Day 1 (checklist, light surface)
   ========================================================= */
const BrandMarkStacked = ({ size = 48 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
    <img src="assets/brand-mark-animated.gif" alt="Chasing Optimum"
      style={{ width: size, height: size, objectFit: 'contain', display: 'block' }} />
    <div style={{ fontFamily: TT2.display, fontSize: 13, letterSpacing: '0.08em', color: '#1D1D1D' }}>HARD</div>
  </div>
);

const ChecklistRow = ({ label, hasCamera, last }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 14,
    padding: '18px 0', borderBottom: last ? 'none' : '1px solid #d9d6cf',
  }}>
    <div style={{
      width: 28, height: 28, borderRadius: 9999,
      border: '1.5px solid #1D1D1D', flex: '0 0 28px',
    }} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontFamily: TT2.body, fontSize: 17, color: '#1D1D1D', fontWeight: 400, marginBottom: 4 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#1D1D1D' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="13" r="8" />
          <rect x="11.4" y="8" width="1.2" height="5.5" fill="#f5f3ee" />
          <rect x="11.4" y="12.4" width="4" height="1.2" fill="#f5f3ee" />
          <path d="M3 6 L7 3 L8 4 L4 7 z" />
          <path d="M21 6 L17 3 L16 4 L20 7 z" />
          <circle cx="17" cy="6" r="2.2" fill="#f5f3ee" />
          <text x="17" y="7.6" fontSize="3" fontWeight="700" textAnchor="middle" fill="#1D1D1D">+</text>
        </svg>
        <span style={{ fontFamily: TT2.body, fontSize: 13.5 }}>Add Reminder</span>
      </div>
    </div>
    {hasCamera && (
      <div style={{ flex: '0 0 36px', display: 'grid', placeItems: 'center' }}>
        <svg width="32" height="28" viewBox="0 0 32 28" fill="#1D1D1D">
          <path d="M9 5 L12 2 L20 2 L23 5 L29 5 L29 26 L3 26 L3 5 z" />
          <circle cx="16" cy="15" r="6" fill="#f5f3ee" />
          <text x="26" y="9" fontSize="6" fontWeight="700" fill="#1D1D1D">+</text>
        </svg>
      </div>
    )}
  </div>
);

const Day1Screen = ({ onOpenReminder = () => {} }) => {
  const items = [
    { label: '45 Minute Workout' },
    { label: '45 Minute Outdoor Workout' },
    { label: 'Take Progress Picture', hasCamera: true },
    { label: '10 Pages of Reading' },
    { label: 'Drink 1 Gallon of Water' },
    { label: 'Follow a Diet' },
    { label: 'No Cheat Meals or Alcohol' },
  ];
  return (
    <div style={{
      minHeight: '100%', width: '100%', background: '#f5f3ee',
      display: 'flex', flexDirection: 'column', overflowY: 'auto',
    }}>
      {/* Header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center',
        padding: '18px 20px 14px', gap: 12,
      }}>
        <BrandMarkStacked size={48} />
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: TT2.display, fontSize: 36, fontWeight: 500, letterSpacing: '0.04em',
            color: '#1D1D1D', textTransform: 'uppercase', lineHeight: 1,
          }}>Day 1</div>
          <div style={{ fontFamily: TT2.body, fontSize: 13, color: '#1D1D1D', marginTop: 6 }}>Mar 25, 2026</div>
        </div>
        <div style={{ justifySelf: 'end' }}>
          <svg width="34" height="30" viewBox="0 0 34 30" fill="none" stroke="#1D1D1D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="30" height="24" rx="2" />
            <line x1="2" y1="10" x2="32" y2="10" />
            <polyline points="6 15 8 17 12 13" />
            <polyline points="14 15 16 17 20 13" />
            <polyline points="22 15 24 17 28 13" />
            <rect x="6" y="20" width="4" height="4" />
            <rect x="14" y="20" width="4" height="4" />
            <rect x="22" y="20" width="4" height="4" />
          </svg>
        </div>
      </div>

      {/* Checklist */}
      <div style={{ padding: '0 20px', borderTop: '1px solid #d9d6cf' }} onClick={onOpenReminder}>
        {items.map((it, i) => (
          <ChecklistRow key={i} label={it.label} hasCamera={it.hasCamera} last={i === items.length - 1} />
        ))}
      </div>

      {/* Notes section */}
      <div style={{ background: '#fff', padding: '20px 20px 28px', marginTop: 14, borderTop: '1px solid #d9d6cf' }}>
        <div style={{
          fontFamily: TT2.display, fontSize: 18, fontWeight: 500, letterSpacing: '0.04em',
          color: '#1D1D1D', textTransform: 'uppercase', marginBottom: 10,
        }}>Notes:</div>
        <div style={{ height: 1, background: '#1D1D1D', marginBottom: 12 }} />
        <p style={{
          margin: 0, fontFamily: TT2.body, fontSize: 14, lineHeight: 1.45, color: '#1D1D1D',
        }}>Make notes of any challenges, insights, or breakthroughs you achieve.</p>
      </div>
    </div>
  );
};

/* =========================================================
   17 — Reminder bottom sheet (over Day 1)
   ========================================================= */
const Day1ReminderSheet = ({ onSave = () => {} }) => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.45 }}>
        <Day1Screen />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: '#fff', borderTopLeftRadius: 18, borderTopRightRadius: 18,
        padding: '18px 20px 22px',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          fontFamily: TT2.body, fontSize: 17, fontWeight: 500, color: '#1D1D1D',
          paddingBottom: 16, borderBottom: '1px solid #d9d6cf',
        }}>Reminder: 45 Minute Workout</div>

        {/* Every Day toggle */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 0', borderBottom: '1px solid #d9d6cf',
        }}>
          <span style={{ fontFamily: TT2.body, fontSize: 16, color: '#1D1D1D' }}>Every Day</span>
          <div style={{
            width: 52, height: 32, borderRadius: 9999, background: '#34C759',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: 2, right: 2,
              width: 28, height: 28, borderRadius: 9999, background: '#fff',
              boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
            }} />
          </div>
        </div>

        {/* Day picker */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6,
          padding: '16px 0', borderBottom: '1px solid #d9d6cf',
        }}>
          {days.map((d, i) => (
            <div key={i} style={{
              aspectRatio: '1 / 1', display: 'grid', placeItems: 'center',
              background: TT2.brand, color: '#000',
              fontFamily: TT2.display, fontSize: 18, fontWeight: 500,
              letterSpacing: '0.04em',
              borderRadius: 9999,
            }}>{d}</div>
          ))}
        </div>

        {/* Time */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 0', borderBottom: '1px solid #d9d6cf',
        }}>
          <span style={{ fontFamily: TT2.body, fontSize: 16, color: '#1D1D1D' }}>Time</span>
          <span style={{
            padding: '6px 12px', borderRadius: 6, background: '#ececec',
            fontFamily: TT2.body, fontSize: 16, color: '#1D1D1D',
          }}>10:08 AM</span>
        </div>

        {/* Save */}
        <button onClick={onSave} style={{
          marginTop: 18, width: '100%', padding: '16px 20px',
          background: TT2.brand, color: '#000', border: 0, borderRadius: 9999,
          fontFamily: TT2.display, fontSize: 18, fontWeight: 500,
          letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer',
        }}>Save</button>
      </div>
    </div>
  );
};

Object.assign(window, {
  DailyRulesScreen, EasySharingScreen, ProgressCheckScreen, HomeScreen,
  PodcastSourceSheet, StartDay1Modal, Day1Screen, Day1ReminderSheet,
});
