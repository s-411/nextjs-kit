/* tour.jsx — Onboarding tour screens (post sign-in carousel).
   Replicates the 5 supplied screens (Daily Reminders states + Track Progress)
   using the Chasing Optimum dark-mode system: #1D1D1D bg, white text,
   orange #FE6F3D pill CTAs with black labels, Anton display headings.
   Layout matches the source 1:1 — only the visual system has been swapped.
*/

const TT = window.CO_TOKENS; // shared tokens from app.jsx

/* ---------- shared bits ---------- */

const Dots = ({ count = 6, active = 0 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    {Array.from({ length: count }).map((_, i) => (
      <span
        key={i}
        style={{
          width: i === active ? 22 : 8,
          height: 8,
          borderRadius: 9999,
          background: i === active ? TT.brand : '#4A4A4A',
          transition: 'all .2s ease',
        }}
      />
    ))}
  </div>
);

const NextLink = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: 'transparent', border: 0, cursor: 'pointer',
      fontFamily: TT.body, fontSize: 17, fontWeight: 500, color: TT.fg,
      padding: 0,
    }}
  >
    Next
  </button>
);

const SpadeMark = ({ num = '75', size = 56 }) => (
  <div style={{ position: 'relative', width: size, height: size, flex: '0 0 auto' }}>
    <svg viewBox="0 0 64 72" width={size} height={size} aria-hidden="true">
      <path
        d="M32 2 C32 2 8 22 8 40 C8 52 16 60 24 60 C28 60 30 58 30 58 L26 70 L38 70 L34 58 C34 58 36 60 40 60 C48 60 56 52 56 40 C56 22 32 2 32 2 Z"
        fill={TT.fg}
      />
    </svg>
    <div style={{
      position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
      paddingBottom: 10,
      fontFamily: TT.body, fontWeight: 700, fontSize: size * 0.32,
      color: TT.bg,
    }}>{num}</div>
  </div>
);

const HeadingBlock = ({ title, body }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <SpadeMark />
      <h2 style={{
        margin: 0,
        fontFamily: TT.display, fontSize: 38, fontWeight: 500,
        letterSpacing: '0.02em', lineHeight: 1,
        color: TT.fg, textTransform: 'uppercase',
      }}>{title}</h2>
    </div>
    <p style={{
      margin: 0, fontFamily: TT.body, fontSize: 16, lineHeight: 1.45,
      color: TT.fg,
    }}>{body}</p>
  </div>
);

const TourFooter = ({ active, onNext }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    paddingTop: 18,
  }}>
    <Dots count={6} active={active} />
    <NextLink onClick={onNext} />
  </div>
);

/* ---------- phone-with-bell illustration ---------- */
const PhoneIllustration = ({ dim = false }) => {
  const stroke = dim ? '#3A3A3A' : '#6B6B6B';
  const bell = dim ? '#7A2222' : TT.brand;
  return (
    <svg viewBox="0 0 280 360" width="100%" style={{ maxWidth: 260, display: 'block' }} aria-hidden="true">
      {/* phone outline */}
      <rect x="60" y="20" width="180" height="320" rx="28" fill="none" stroke={stroke} strokeWidth="3" />
      {/* notch */}
      <rect x="118" y="20" width="64" height="14" rx="7" fill={stroke} />
      {/* home indicator */}
      <rect x="120" y="320" width="60" height="3" rx="1.5" fill={stroke} />
      {/* notification pill */}
      <rect x="14" y="98" width="220" height="58" rx="12" fill="none" stroke={bell} strokeWidth="3" />
      {/* bell */}
      <g transform="translate(38 116)" stroke={bell} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 2 C7 2 4 5 4 9 v6 c0 2 -1 4 -3 4 h20 c-2 0 -3 -2 -3 -4 V9 c0 -4 -3 -7 -7 -7 z" />
        <path d="M9 22 c0 2 2 3 4 3 s4 -1 4 -3" />
      </g>
      {/* notification text bars */}
      <rect x="86" y="116" width="130" height="6" rx="3" fill={bell} />
      <rect x="86" y="130" width="100" height="6" rx="3" fill={bell} />
    </svg>
  );
};

/* ---------- check illustration ---------- */
const CheckIllustration = () => (
  <div style={{
    width: 188, height: 188, borderRadius: 9999, background: TT.brand,
    display: 'grid', placeItems: 'center',
  }}>
    <svg width="110" height="110" viewBox="0 0 24 24" fill="none"
      stroke={TT.bg} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </div>
);

/* ---------- shared shell for tour screens ---------- */
const TourShell = ({ children, footerActive, onNext, dim = false }) => (
  <div style={{
    minHeight: '100%', width: '100%', background: TT.bg, position: 'relative',
    display: 'flex', flexDirection: 'column',
    padding: '54px 24px 28px',
    filter: dim ? 'brightness(0.55)' : 'none',
  }}>
    {children}
    <TourFooter active={footerActive} onNext={onNext} />
  </div>
);

/* =========================================================
   05 — Daily Reminders (base)
   ========================================================= */
const DailyRemindersScreen = ({ onNext = () => {}, ctaLabel = 'Allow Notifications', ctaDisabled = false, onCta = () => {} }) => (
  <TourShell footerActive={1} onNext={onNext}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
      <PhoneIllustration />
      <button
        onClick={onCta}
        disabled={ctaDisabled}
        style={{
          width: '100%',
          padding: '18px 24px',
          background: ctaDisabled ? '#3A3A3A' : TT.brand,
          color: ctaDisabled ? '#7A7A7A' : '#000',
          border: 0, borderRadius: 9999,
          cursor: ctaDisabled ? 'default' : 'pointer',
          fontFamily: TT.display, fontSize: 20, fontWeight: 500,
          letterSpacing: '0.04em', textTransform: 'uppercase',
        }}
      >
        {ctaLabel}
      </button>
    </div>

    <div style={{ marginTop: 24, marginBottom: 24 }}>
      <HeadingBlock
        title="Daily Reminders"
        body="Stay on track with custom daily reminders."
      />
    </div>
  </TourShell>
);

/* =========================================================
   06 — Daily Reminders + iOS native permission dialog
   ========================================================= */
const DailyRemindersIOSPromptScreen = ({ onNext = () => {} }) => (
  <div style={{ position: 'relative', minHeight: '100%', width: '100%', background: TT.bg }}>
    <DailyRemindersScreen onNext={onNext} />
    {/* dim overlay */}
    <div style={{
      position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)',
      display: 'grid', placeItems: 'center',
    }}>
      {/* iOS-style native alert */}
      <div style={{
        width: 280,
        background: 'rgba(60,60,60,0.92)', backdropFilter: 'blur(20px)',
        borderRadius: 14, overflow: 'hidden',
        color: '#fff', fontFamily: '-apple-system, system-ui, sans-serif',
      }}>
        <div style={{ padding: '20px 16px 16px', textAlign: 'center' }}>
          <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>
            "75 Hard" Would Like to Send You Notifications
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.35, color: '#E6E6E6' }}>
            Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', borderTop: '1px solid rgba(255,255,255,0.18)' }}>
          <button style={iosBtn}>Don't Allow</button>
          <div style={{ background: 'rgba(255,255,255,0.18)' }} />
          <button style={{ ...iosBtn, fontWeight: 600 }}>Allow</button>
        </div>
      </div>
    </div>
  </div>
);
const iosBtn = {
  background: 'transparent', border: 0, color: '#0A84FF',
  padding: '14px 0', fontSize: 17, cursor: 'pointer',
};

/* =========================================================
   07 — Daily Reminders + custom in-app modal
   ========================================================= */
const DailyRemindersModalScreen = ({ onNext = () => {} }) => (
  <div style={{ position: 'relative', minHeight: '100%', width: '100%', background: TT.bg }}>
    <DailyRemindersScreen onNext={onNext} />
    {/* dim overlay */}
    <div style={{
      position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 16,
    }}>
      <div style={{
        width: '100%',
        background: '#1D1D1D', border: '1px solid #2E2E2E',
        borderRadius: 20, padding: '22px 22px 26px',
        position: 'relative', color: TT.fg,
      }}>
        <button aria-label="Close" style={{
          position: 'absolute', top: 14, right: 14,
          width: 30, height: 30, borderRadius: 9999,
          background: 'transparent', border: 0, color: TT.fg, cursor: 'pointer',
          fontSize: 20, lineHeight: 1,
        }}>×</button>

        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <h3 style={{
            margin: 0, fontFamily: TT.display, fontSize: 26, fontWeight: 500,
            letterSpacing: '0.02em', textTransform: 'uppercase',
          }}>Enable Notifications</h3>
        </div>
        <p style={{
          margin: '0 0 18px 0', textAlign: 'center',
          fontFamily: TT.body, fontSize: 15, lineHeight: 1.45, color: TT.fg,
        }}>
          Enable notifications to get alerts and reminders.
        </p>

        <div style={{ display: 'grid', placeItems: 'center', margin: '6px 0 20px' }}>
          <PhoneIllustration />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button style={{
            width: '100%', padding: '16px 20px',
            background: TT.brand, color: '#000',
            border: 0, borderRadius: 9999, cursor: 'pointer',
            fontFamily: TT.display, fontSize: 18, fontWeight: 500,
            letterSpacing: '0.04em', textTransform: 'uppercase',
          }}>Allow</button>
          <button style={{
            width: '100%', padding: '16px 20px',
            background: 'transparent', color: TT.fg,
            border: `1px solid ${TT.fg}`, borderRadius: 9999, cursor: 'pointer',
            fontFamily: TT.display, fontSize: 18, fontWeight: 500,
            letterSpacing: '0.04em', textTransform: 'uppercase',
          }}>Maybe Later</button>
        </div>
      </div>
    </div>
  </div>
);

/* =========================================================
   08 — Daily Reminders enabled (disabled CTA state)
   ========================================================= */
const DailyRemindersEnabledScreen = ({ onNext = () => {} }) => (
  <DailyRemindersScreen
    onNext={onNext}
    ctaLabel="Notifications Enabled!"
    ctaDisabled={true}
  />
);

/* =========================================================
   09 — Track Progress
   ========================================================= */
const TrackProgressScreen = ({ onNext = () => {} }) => (
  <TourShell footerActive={2} onNext={onNext}>
    <p style={{
      margin: '6px 0 0 0', textAlign: 'center',
      fontFamily: TT.body, fontSize: 16, lineHeight: 1.45, color: TT.fg,
    }}>
      Complete the required actions every day.<br />
      Fail any of them and start over at Day 1.
    </p>

    <div style={{ flex: 1, display: 'grid', placeItems: 'center' }}>
      <CheckIllustration />
    </div>

    <div style={{ marginBottom: 24 }}>
      <HeadingBlock
        title="Track Progress"
        body="Check off your tasks and stay committed."
      />
    </div>
  </TourShell>
);

/* ---------- expose ---------- */
Object.assign(window, {
  DailyRemindersScreen,
  DailyRemindersIOSPromptScreen,
  DailyRemindersModalScreen,
  DailyRemindersEnabledScreen,
  TrackProgressScreen,
});
