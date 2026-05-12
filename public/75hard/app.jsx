const { useState } = React;

/* ---------- Tokens ---------- */
const T = {
  bg: '#1D1D1D',          // dark surface
  fg: '#FFFFFF',          // white text (inverted)
  fgMuted: '#A0A4AA',
  brand: '#FE6F3D',       // primary orange
  dark: '#1D1D1D',
  divider: '#2E2E2E',
  success: '#2BA84A',
  display: "'Anton', system-ui, sans-serif",
  body: "'Poppins', system-ui, sans-serif",
};

/* ---------- Shared bits ---------- */
const BrandMark = ({ size = 168, animated = true }) => (
  <img
    src={`assets/brand-mark${animated ? '-animated.gif' : '.png'}`}
    alt="Chasing Optimum"
    width={size}
    height={size}
    style={{ width: size, height: size, objectFit: 'contain', display: 'block' }}
  />
);

const BackArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Back"
    style={{
      position: 'absolute', top: 14, left: 18,
      width: 44, height: 44, borderRadius: 9999,
      background: 'transparent', border: 0, cursor: 'pointer',
      display: 'grid', placeItems: 'center', color: T.fg,
    }}
  >
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  </button>
);

const PrimaryButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: '100%',
      padding: '20px 24px',
      background: T.brand, color: '#000',
      border: 0, borderRadius: 9999, cursor: 'pointer',
      fontFamily: T.display, fontSize: 20, letterSpacing: '0.04em',
      textTransform: 'uppercase',
    }}
  >
    {children}
  </button>
);

const TextLink = ({ children, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: '100%', padding: '14px 0',
      background: 'transparent', border: 0, cursor: 'pointer',
      fontFamily: T.body, fontSize: 16, fontWeight: 500, color: T.fg,
    }}
  >
    {children}
  </button>
);

const Field = ({ value, placeholder, type = 'text', icon, onChange }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 12,
    background: '#262626', borderRadius: 9999,
    padding: '18px 20px',
    border: `1px solid ${T.divider}`,
  }}>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange && onChange(e.target.value)}
      style={{
        flex: 1, border: 0, outline: 'none', background: 'transparent',
        fontFamily: T.body, fontSize: 17, color: T.fg, minWidth: 0,
      }}
    />
    <span style={{ color: T.fg, display: 'grid', placeItems: 'center', flex: '0 0 24px' }}>
      {icon}
    </span>
  </div>
);

/* ---------- Icons ---------- */
const MailIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="1.5"></rect>
    <polyline points="3 7 12 13 21 7"></polyline>
  </svg>
);
const UsersIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);
const EyeIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);
const Check = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

/* =========================================================
   SCREEN 1 — Splash
   ========================================================= */
const SplashScreen = ({ onTap }) => (
  <div
    onClick={onTap}
    style={{
      minHeight: '100%', width: '100%', background: T.bg,
      display: 'grid', placeItems: 'center',
      cursor: 'pointer',
    }}
  >
    <BrandMark size={196} animated={true} />
  </div>
);

/* =========================================================
   SCREEN 2 — Welcome
   ========================================================= */
const WelcomeScreen = ({ onCreate, onLogin }) => (
  <div style={{
    minHeight: '100%', width: '100%', background: T.bg,
    display: 'flex', flexDirection: 'column',
    padding: '64px 28px 24px',
  }}>
    <div style={{ display: 'grid', placeItems: 'center', marginTop: 28, marginBottom: 36 }}>
      <BrandMark size={210} animated={true} />
    </div>

    <div style={{ marginBottom: 24 }}>
      <div style={{
        fontFamily: T.display, fontSize: 32, fontWeight: 500, letterSpacing: '0.02em',
        color: T.fg, lineHeight: 1, marginBottom: 6,
        textTransform: 'uppercase',
      }}>
        Welcome to
      </div>
      <div style={{
        fontFamily: T.display, fontSize: 56, fontWeight: 500, letterSpacing: '0.02em',
        color: T.brand, lineHeight: 1,
        textTransform: 'uppercase',
      }}>
        75 Hard
      </div>
    </div>

    <p style={{
      fontFamily: T.body, fontSize: 17, lineHeight: 1.5,
      color: T.fg, margin: '0 0 28px 0',
    }}>
      Over the next 75 days, you will develop the grit, self&#8209;confidence, and fortitude you need to dominate in every area of your life. It's not going to be easy, but it will be worth it.
    </p>

    <div style={{ marginTop: 'auto' }}>
      <PrimaryButton onClick={onCreate}>Create a New Profile</PrimaryButton>
      <TextLink onClick={onLogin}>Login to Existing Profile</TextLink>
    </div>
  </div>
);

/* =========================================================
   SCREEN 3 — Sign In With Email
   ========================================================= */
const SignInScreen = ({ onBack, onContinue }) => {
  const [email, setEmail] = useState('Screensdesigntest@gmail.com');
  return (
    <div style={{
      minHeight: '100%', width: '100%', background: T.bg, position: 'relative',
      display: 'flex', flexDirection: 'column',
      padding: '64px 28px 32px',
    }}>
      <BackArrow onClick={onBack} />

      <div style={{ display: 'grid', placeItems: 'center', marginTop: 36, marginBottom: 28 }}>
        <BrandMark size={170} animated={false} />
      </div>

      <h1 style={{
        fontFamily: T.display, fontSize: 38, fontWeight: 500, letterSpacing: '0.02em',
        color: T.fg, lineHeight: 1, margin: '0 0 28px 0',
        textTransform: 'uppercase', textAlign: 'center',
      }}>
        Sign In With Email
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Field value={email} onChange={setEmail} placeholder="Email" icon={MailIcon} />
        <PrimaryButton onClick={onContinue}>Continue</PrimaryButton>
      </div>
    </div>
  );
};

/* =========================================================
   SCREEN 4 — Create An Account
   ========================================================= */
const CreateAccountScreen = ({ onBack, onContinue }) => {
  const [first, setFirst] = useState('Julia');
  const [last, setLast] = useState('Screens');
  const [email, setEmail] = useState('Screensdesigntest@gmail.com');
  const [pw, setPw] = useState('');

  const rules = [
    '8–20 characters',
    'At least one uppercase letter',
    'At least one lowercase letter',
    'At least one number',
    'At least one symbol',
    'No spaces',
  ];

  return (
    <div style={{
      minHeight: '100%', width: '100%', background: T.bg, position: 'relative',
      display: 'flex', flexDirection: 'column',
      padding: '60px 28px 24px',
      overflowY: 'auto',
    }}>
      <BackArrow onClick={onBack} />

      <div style={{ display: 'grid', placeItems: 'center', marginTop: 18, marginBottom: 18 }}>
        <BrandMark size={140} animated={false} />
      </div>

      <h1 style={{
        fontFamily: T.display, fontSize: 36, fontWeight: 500, letterSpacing: '0.02em',
        color: T.fg, lineHeight: 1, margin: '0 0 22px 0',
        textTransform: 'uppercase', textAlign: 'center',
      }}>
        Create an Account
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
        <Field value={first} onChange={setFirst} placeholder="First name" icon={UsersIcon} />
        <Field value={last}  onChange={setLast}  placeholder="Last name"  icon={UsersIcon} />
        <Field value={email} onChange={setEmail} placeholder="Email"      icon={MailIcon} />
        <Field value={pw}    onChange={setPw}    placeholder="Password"   type="password" icon={EyeIcon} />
      </div>

      <div style={{ marginBottom: 18 }}>
        <div style={{
          fontFamily: T.body, fontSize: 14, fontWeight: 600,
          color: T.fg, marginBottom: 8,
        }}>
          Passwords must include:
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {rules.map((r) => (
            <li key={r} style={{
              display: 'grid', gridTemplateColumns: '22px 1fr', alignItems: 'center', gap: 8,
              fontFamily: T.body, fontSize: 14, color: T.fg,
            }}>
              <span style={{ color: T.success, display: 'grid', placeItems: 'center' }}>{Check}</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <PrimaryButton onClick={onContinue}>Continue</PrimaryButton>
      </div>
    </div>
  );
};

/* =========================================================
   Router
   ========================================================= */
const App = () => {
  const [screen, setScreen] = useState('splash');

  let content;
  switch (screen) {
    case 'welcome':
      content = <WelcomeScreen onCreate={() => setScreen('create')} onLogin={() => setScreen('signin')} />;
      break;
    case 'signin':
      content = <SignInScreen onBack={() => setScreen('welcome')} onContinue={() => setScreen('splash')} />;
      break;
    case 'create':
      content = <CreateAccountScreen onBack={() => setScreen('welcome')} onContinue={() => setScreen('splash')} />;
      break;
    case 'splash':
    default:
      content = <SplashScreen onTap={() => setScreen('welcome')} />;
  }

  const labels = { splash: '01 Splash', welcome: '02 Welcome', signin: '03 Sign In', create: '04 Create Account' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: '32px 16px 80px' }}>
      {/* Screen picker */}
      <div style={{
        display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center',
        fontFamily: T.body, fontSize: 13,
      }}>
        {Object.entries(labels).map(([k, v]) => (
          <button
            key={k}
            onClick={() => setScreen(k)}
            style={{
              padding: '8px 14px', borderRadius: 9999,
              border: `1px solid ${screen === k ? T.fg : T.divider}`,
              background: screen === k ? T.fg : '#fff',
              color: screen === k ? '#fff' : T.fg,
              fontFamily: T.body, fontWeight: 500, cursor: 'pointer',
            }}
          >
            {v}
          </button>
        ))}
      </div>

      <div data-screen-label={labels[screen]}>
        <IOSDevice width={402} height={874} dark={false}>
          {content}
        </IOSDevice>
      </div>
    </div>
  );
};

// Expose components for reuse on other pages (e.g. the canvas)
Object.assign(window, {
  SplashScreen, WelcomeScreen, SignInScreen, CreateAccountScreen,
  BrandMark, PrimaryButton, TextLink, Field, BackArrow,
  CO_TOKENS: T,
});

// Only auto-mount when the router root opts in via data-mount="router".
const __root = document.getElementById('root');
if (__root && __root.dataset.mount === 'router') ReactDOM.createRoot(__root).render(<App />);
