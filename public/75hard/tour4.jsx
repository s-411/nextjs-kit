/* tour4.jsx — Screens 28–37: Day 1 share card + share sheet,
   Notes editor with keyboard, Home (completed Day 1),
   IG Story view, Share/Edit sheet, Settings, Photo album list,
   Recents grid, Photo crop circle. */

const TT4 = window.CO_TOKENS;

/* ---------- shared bits ---------- */
const Day1RuleRow = ({ icon, label }) => (
  <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: TT4.body, fontSize: 13.5, color: '#1D1D1D' }}>
    <span style={{ width: 22, height: 22, display: 'grid', placeItems: 'center', color: '#1D1D1D' }}>{icon}</span>
    {label}
  </li>
);
const IconDumbbell = (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="2" y="9" width="3" height="6" rx="0.5" /><rect x="6" y="7" width="3" height="10" rx="0.5" /><line x1="9" y1="12" x2="15" y2="12" /><rect x="15" y="7" width="3" height="10" rx="0.5" /><rect x="19" y="9" width="3" height="6" rx="0.5" /></svg>);
const IconRainCloud = (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13 a4 4 0 1 1 1 -7.9 a5 5 0 0 1 9.7 1.4 A3.5 3.5 0 0 1 17 13 z" /><line x1="8" y1="17" x2="7" y2="19" /><line x1="12" y1="17" x2="11" y2="20" /><line x1="16" y1="17" x2="15" y2="19" /></svg>);
const IconDiet = (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><rect x="5" y="3" width="13" height="18" rx="1" /><line x1="8" y1="8" x2="14" y2="8" /><line x1="8" y1="12" x2="14" y2="12" /><line x1="8" y1="16" x2="12" y2="16" /><circle cx="17.5" cy="6" r="2" /></svg>);
const IconCamera = (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M8 6 L10 4 L16 4 L18 6 L21 6 L21 19 L3 19 L3 6 z" /><circle cx="12" cy="12.5" r="3.5" /></svg>);
const IconWater = (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><path d="M12 3 C 8 9 6 12 6 15 a6 6 0 0 0 12 0 c0 -3 -2 -6 -6 -12 z" /></svg>);
const IconBottle = (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><path d="M10 3 L14 3 L14 6 L15 8 L15 20 a1 1 0 0 1 -1 1 L10 21 a1 1 0 0 1 -1 -1 L9 8 L10 6 z" /></svg>);
const IconBook = (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><path d="M4 5 L11 7 L11 20 L4 18 z" /><path d="M20 5 L13 7 L13 20 L20 18 z" /></svg>);

/* shared: full 75-day calendar grid, with day 1 highlighted */
const SharedCalendarGrid = ({ activeDay = 1, fontSize = 18, gap = 8 }) => {
  const days = Array.from({ length: 75 }, (_, i) => i + 1);
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
      gap: `10px ${gap}px`, justifyItems: 'center',
    }}>
      {days.map((n) => (
        <div key={n} style={{
          fontFamily: TT4.display, fontSize, letterSpacing: '0.02em',
          color: n === activeDay ? TT4.brand : 'rgba(29,29,29,0.55)',
          lineHeight: 1,
        }}>{n}</div>
      ))}
    </div>
  );
};

/* shared: COMPLETED stamp */
const CompletedStamp = ({ rotate = -8 }) => (
  <div style={{
    transform: `rotate(${rotate}deg)`,
    border: `2px solid ${TT4.brand}`,
    color: TT4.brand,
    fontFamily: TT4.display, fontSize: 18, letterSpacing: '0.08em',
    padding: '4px 14px', textTransform: 'uppercase', fontWeight: 500,
    background: 'rgba(254,111,61,0.06)',
    display: 'inline-block',
  }}>Completed</div>
);

/* shared: spade-style square app-icon-sized brand mark for share sheet */
const AppIconBrand = ({ size = 56 }) => (
  <div style={{
    width: size, height: size, borderRadius: 12,
    background: '#1D1D1D', display: 'grid', placeItems: 'center', flex: `0 0 ${size}px`,
  }}>
    <img src="assets/brand-mark-animated.gif" alt="" style={{ width: size * 0.78, height: size * 0.78, objectFit: 'contain' }} />
  </div>
);

/* =========================================================
   28 — Day 1 COMPLETED share card
   ========================================================= */
const Day1ShareCardScreen = () => (
  <div style={{ minHeight: '100%', width: '100%', background: '#f5f3ee', display: 'flex', flexDirection: 'column' }}>
    <div style={{ padding: '14px 18px 0' }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D1D1D" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
    </div>

    <div style={{ padding: '6px 22px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, position: 'relative' }}>
      <img src="assets/brand-mark-animated.gif" alt="" style={{ width: 56, height: 56, objectFit: 'contain' }} />
      <div style={{ fontFamily: TT4.display, fontSize: 58, fontWeight: 500, letterSpacing: '0.02em', color: '#1D1D1D', lineHeight: 1 }}>DAY 1</div>
      <div style={{ position: 'absolute', top: -4, left: '50%', transform: 'translateX(-30%)' }}>
        <CompletedStamp rotate={-6} />
      </div>
    </div>

    <div style={{ padding: '20px 22px 0' }}>
      <SharedCalendarGrid activeDay={1} fontSize={20} gap={10} />
    </div>

    <div style={{ padding: '20px 22px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 14, rowGap: 12 }}>
      <Day1RuleRow icon={IconDumbbell} label="Two 45 min workouts" />
      <Day1RuleRow icon={IconRainCloud} label="One workout must be outdoors" />
      <Day1RuleRow icon={IconDiet} label="Follow a diet" />
      <Day1RuleRow icon={IconCamera} label="Take a progress pic" />
      <Day1RuleRow icon={IconWater} label="1 gallon of water" />
      <Day1RuleRow icon={IconBottle} label="No alcohol or cheat meals" />
      <Day1RuleRow icon={IconBook} label="Read 10 pages" />
    </div>

    <div style={{ textAlign: 'center', padding: '6px 0 14px', fontFamily: TT4.display, fontSize: 20, color: TT4.brand, letterSpacing: '0.04em' }}>
      75HARD.COM
    </div>

    <div style={{ flex: 1 }} />

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 14px 18px' }}>
      <button style={{
        padding: '16px', background: '#1D1D1D', color: '#fff', border: 0, borderRadius: 9999,
        fontFamily: TT4.display, fontSize: 17, letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      }}>
        Share
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 16 L12 4" /><polyline points="7 9 12 4 17 9" /><path d="M5 14 L5 20 L19 20 L19 14" /></svg>
      </button>
      <button style={{
        padding: '16px', background: '#1D1D1D', color: '#fff', border: 0, borderRadius: 9999,
        fontFamily: TT4.display, fontSize: 17, letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      }}>
        IG Story
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" /></svg>
      </button>
    </div>
  </div>
);

/* =========================================================
   29 — Share card + iOS Share sheet
   ========================================================= */
const Day1ShareCardShareSheet = () => (
  <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, filter: 'blur(3px)', opacity: 0.85 }}>
      <Day1ShareCardScreen />
    </div>
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.18)' }} />
    <div style={{
      position: 'absolute', left: 8, right: 8, bottom: 12,
      background: 'rgba(245,243,238,0.96)', borderRadius: 14,
      padding: '14px 12px 16px', backdropFilter: 'blur(20px)',
    }}>
      {/* app icon row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 6px 12px' }}>
        <AppIconBrand size={52} />
      </div>
      <div style={{ height: 1, background: '#d9d6cf', margin: '0 0 12px' }} />

      {/* destinations row */}
      <div style={{ display: 'flex', gap: 16, padding: '0 6px 14px', overflow: 'hidden' }}>
        {[
          { name: 'AirDrop', bg: 'radial-gradient(circle at 50% 50%, #fff 18%, #4a9ff5 19%, #4a9ff5 60%, #2a6fd5 100%)' },
          { name: 'Messages', bg: 'linear-gradient(180deg, #6ee36e 0%, #2ac470 100%)' },
          { name: 'Mail', bg: 'linear-gradient(180deg, #6ec4ff 0%, #2a8ac4 100%)' },
          { name: 'Notes', bg: 'linear-gradient(180deg, #f5d423 0%, #d4a823 100%)' },
        ].map((d, i) => (
          <div key={i} style={{ width: 64, flex: '0 0 64px', textAlign: 'center' }}>
            <div style={{ width: 60, height: 60, borderRadius: 14, background: d.bg, marginBottom: 6 }} />
            <div style={{ fontFamily: TT4.body, fontSize: 11, color: '#1D1D1D' }}>{d.name}</div>
          </div>
        ))}
      </div>
      <div style={{ height: 1, background: '#d9d6cf', margin: '0 0 12px' }} />

      {/* action row */}
      <div style={{ display: 'flex', gap: 12, padding: '0 6px 4px' }}>
        {[
          { name: 'Copy', icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D1D1D" strokeWidth="1.6"><rect x="6" y="3" width="13" height="16" rx="2" /><rect x="3" y="7" width="13" height="14" rx="2" /></svg>) },
          { name: 'Save Image', icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D1D1D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 L12 16" /><polyline points="7 11 12 16 17 11" /><path d="M5 18 L5 21 L19 21 L19 18" /></svg>) },
          { name: 'Assign to Contact', icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="#1D1D1D"><circle cx="12" cy="8" r="4" /><path d="M4 21 a8 8 0 0 1 16 0 z" /></svg>) },
          { name: 'More', icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="#1D1D1D"><circle cx="6" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="18" cy="12" r="1.8" /></svg>) },
        ].map((a, i) => (
          <div key={i} style={{ width: 66, flex: '0 0 66px', textAlign: 'center' }}>
            <div style={{
              width: 52, height: 52, borderRadius: 9999,
              background: 'rgba(220,217,210,0.9)',
              display: 'grid', placeItems: 'center', margin: '0 auto 6px',
            }}>{a.icon}</div>
            <div style={{ fontFamily: TT4.body, fontSize: 11, color: '#1D1D1D', lineHeight: 1.15 }}>{a.name}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* =========================================================
   30 — Day 1 Notes editor with keyboard
   ========================================================= */
const Day1NotesEditorScreen = () => (
  <div style={{ minHeight: '100%', width: '100%', background: '#f5f3ee', display: 'flex', flexDirection: 'column' }}>
    {/* Header */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '14px 20px 14px', gap: 12, borderBottom: '1px solid #d9d6cf', background: '#f5f3ee' }}>
      <BrandMarkStacked size={44} />
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: TT4.display, fontSize: 32, fontWeight: 500, letterSpacing: '0.04em', color: '#1D1D1D', textTransform: 'uppercase', lineHeight: 1 }}>Day 1</div>
        <div style={{ fontFamily: TT4.body, fontSize: 12.5, color: '#1D1D1D', marginTop: 6 }}>Mar 25, 2026</div>
      </div>
      <div style={{ justifySelf: 'end' }}>
        <svg width="28" height="24" viewBox="0 0 34 30" fill="none" stroke="#1D1D1D" strokeWidth="1.5"><rect x="2" y="4" width="30" height="24" rx="2" /><line x1="2" y1="10" x2="32" y2="10" /></svg>
      </div>
    </div>

    {/* Notes body */}
    <div style={{ background: '#fff', padding: '18px 22px 20px', borderBottom: '1px solid #d9d6cf' }}>
      <div style={{ fontFamily: TT4.display, fontSize: 22, fontWeight: 500, letterSpacing: '0.04em', color: '#1D1D1D', textTransform: 'uppercase', marginBottom: 10 }}>Notes:</div>
      <div style={{ height: 1, background: '#1D1D1D', marginBottom: 14 }} />
      <div style={{ fontFamily: TT4.body, fontSize: 15, color: '#1D1D1D', display: 'inline-flex', alignItems: 'center', gap: 1 }}>
        Love this!<span style={{ display: 'inline-block', width: 2, height: 18, background: TT4.brand, marginLeft: 2 }} />
      </div>
    </div>

    <div style={{ flex: 1, background: '#fff' }} />

    {/* Done bar */}
    <div style={{ padding: '10px 18px', background: '#f5f3ee', display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid #d9d6cf' }}>
      <button style={{
        background: 'transparent', border: 0, color: TT4.brand,
        fontFamily: TT4.display, fontSize: 16, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer',
      }}>Done</button>
    </div>

    {/* Keyboard (numbers / symbols layout) */}
    <div style={{ background: '#d2d3da', padding: '8px 4px 12px' }}>
      <KeyboardRow keys={['1','2','3','4','5','6','7','8','9','0']} />
      <KeyboardRow keys={['-','/',':',';','(',')','₱','&','@','"']} />
      <KeyboardRow keys={[{ label: '#+=', wide: true }, '.', ',', '?', '!', "'", { icon: 'back' }]} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 5fr 1fr', gap: 6, padding: '4px 6px 0' }}>
        <KKey>ABC</KKey>
        <KKey wide></KKey>
        <KKey><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D1D1D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 10 4 15 9 20" /><path d="M20 4 L20 12 L4 12" /></svg></KKey>
      </div>
      <div style={{ padding: '8px 6px 0', display: 'flex' }}>
        <div style={{ width: 28, height: 28, borderRadius: 9999, border: '1px solid #1D1D1D', display: 'grid', placeItems: 'center', color: '#1D1D1D', fontSize: 13 }}>:)</div>
      </div>
    </div>
  </div>
);

const KKey = ({ children, wide = false }) => (
  <div style={{
    minHeight: 38, padding: '0 8px', background: '#fff', borderRadius: 6,
    display: 'grid', placeItems: 'center',
    fontFamily: TT4.body, fontSize: 14, color: '#1D1D1D',
    boxShadow: '0 1px 0 rgba(0,0,0,0.25)',
  }}>{children}</div>
);

const KeyboardRow = ({ keys }) => (
  <div style={{ display: 'flex', gap: 5, padding: '4px 6px 0' }}>
    {keys.map((k, i) => {
      const isObj = typeof k === 'object';
      const label = isObj ? (k.label || '') : k;
      const wide = isObj && k.wide;
      const icon = isObj && k.icon;
      return (
        <div key={i} style={{ flex: wide ? 1.4 : 1 }}>
          <KKey>
            {icon === 'back'
              ? (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D1D1D" strokeWidth="1.6" strokeLinejoin="round"><path d="M21 6 L9 6 L3 12 L9 18 L21 18 z" /><line x1="13" y1="10" x2="18" y2="15" /><line x1="18" y1="10" x2="13" y2="15" /></svg>)
              : label}
          </KKey>
        </div>
      );
    })}
  </div>
);

/* =========================================================
   31 — Home with completed Day 1 card
   ========================================================= */
const HomeCompletedScreen = () => (
  <div style={{ minHeight: '100%', width: '100%', background: '#f5f3ee', display: 'flex', flexDirection: 'column' }}>
    {/* Top */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 6px' }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D1D1D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: TT4.display, fontSize: 16, letterSpacing: '0.04em', color: '#1D1D1D', textTransform: 'uppercase' }}>
        Settings
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#1D1D1D"><path d="M12 8.5 a3.5 3.5 0 1 0 0 7 a3.5 3.5 0 0 0 0 -7 z M19.4 13 l1.6 -1.5 -1.6 -2.8 -2.1 .5 a7.5 7.5 0 0 0 -1.7 -1 L15 6 h-3.2 l-.6 2.1 a7.5 7.5 0 0 0 -1.7 1 l-2.1 -.5 -1.6 2.8 L7.4 13 l-1.6 1.5 1.6 2.8 2.1 -.5 a7.5 7.5 0 0 0 1.7 1 L11.8 20 H15 l.6 -2.1 a7.5 7.5 0 0 0 1.7 -1 l2.1 .5 1.6 -2.8 z" /></svg>
      </div>
    </div>

    {/* Profile row */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 22px 16px' }}>
      <div style={{ width: 54, height: 54, borderRadius: 9999, background: '#1D1D1D', display: 'grid', placeItems: 'center', color: '#f5f3ee' }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4" /><path d="M4 21 a8 8 0 0 1 16 0 z" /></svg>
      </div>
      <div>
        <div style={{ fontFamily: TT4.display, fontSize: 22, letterSpacing: '0.02em', color: '#1D1D1D', textTransform: 'uppercase', lineHeight: 1.1 }}>Julia Screens</div>
        <div style={{ fontFamily: TT4.body, fontSize: 13.5, color: '#1D1D1D', marginTop: 2 }}>Day Ends: 11:00 pm</div>
      </div>
    </div>

    {/* Completed Day card */}
    <div style={{ padding: '0 18px 14px' }}>
      <div style={{
        position: 'relative', height: 250, borderRadius: 4, overflow: 'hidden',
        border: `2px solid ${TT4.brand}`,
        background: 'linear-gradient(180deg, #f7a042 0%, #e96a1f 35%, #a23a0a 75%, #2a1108 100%)',
      }}>
        {/* sun */}
        <div style={{ position: 'absolute', right: 38, top: 50, width: 60, height: 60, borderRadius: 9999, background: '#fff7d6', boxShadow: '0 0 40px rgba(255,220,150,0.6)' }} />
        {/* silhouette */}
        <div style={{
          position: 'absolute', left: '46%', bottom: 0, width: 90, height: 190,
          background: 'linear-gradient(180deg, #1a0a05 0%, #0a0503 100%)',
          clipPath: 'polygon(45% 0, 60% 25%, 70% 70%, 60% 100%, 40% 100%, 30% 70%, 38% 25%)',
        }} />
        {/* calendar icon */}
        <div style={{ position: 'absolute', right: 14, top: 14, width: 30, height: 30, borderRadius: 6, background: '#f5f3ee', display: 'grid', placeItems: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D1D1D" strokeWidth="1.6"><rect x="3" y="5" width="18" height="16" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="13" x2="11" y2="13" /><line x1="9" y1="17" x2="11" y2="17" /><line x1="13" y1="13" x2="15" y2="13" /></svg>
        </div>
        <div style={{ position: 'absolute', left: 16, bottom: 14, color: '#fff' }}>
          <div style={{ fontFamily: TT4.display, fontSize: 22, letterSpacing: '0.04em' }}>75 HARD</div>
          <div style={{ fontFamily: TT4.body, fontSize: 12, letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: 4 }}>Day 1: Mar 25, 2026</div>
          <div style={{ fontFamily: TT4.body, fontSize: 12 }}>Completed 1 Day</div>
        </div>
      </div>
    </div>

    {/* Calendar grid */}
    <div style={{ padding: '0 22px 18px' }}>
      <SharedCalendarGrid activeDay={1} fontSize={22} gap={6} />
    </div>
  </div>
);

/* =========================================================
   32 — IG Story view (full-bleed photo)
   ========================================================= */
const IGStoryScreen = () => (
  <div style={{ position: 'relative', width: '100%', minHeight: '100%', background: 'linear-gradient(180deg, #f7a042 0%, #e96a1f 35%, #a23a0a 75%, #2a1108 100%)', overflow: 'hidden' }}>
    {/* sun */}
    <div style={{ position: 'absolute', right: 60, top: 130, width: 110, height: 110, borderRadius: 9999, background: '#fff7d6', boxShadow: '0 0 60px rgba(255,220,150,0.7)' }} />
    {/* silhouette */}
    <div style={{
      position: 'absolute', left: '40%', bottom: 0, width: 160, height: 470,
      background: '#0a0503',
      clipPath: 'polygon(45% 0, 60% 22%, 70% 65%, 64% 100%, 36% 100%, 30% 65%, 40% 22%)',
    }} />

    {/* top controls */}
    <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: 36, height: 36, borderRadius: 9999, background: 'rgba(0,0,0,0.55)', display: 'grid', placeItems: 'center', color: '#fff' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
      </div>
      <div style={{ width: 36, height: 36, borderRadius: 9999, background: 'rgba(0,0,0,0.55)', display: 'grid', placeItems: 'center', color: '#fff' }}>
        <svg width="4" height="16" viewBox="0 0 4 16" fill="currentColor"><circle cx="2" cy="2" r="1.8" /><circle cx="2" cy="8" r="1.8" /><circle cx="2" cy="14" r="1.8" /></svg>
      </div>
    </div>

    {/* bottom caption */}
    <div style={{ position: 'absolute', left: 22, bottom: 26, color: '#fff' }}>
      <div style={{ fontFamily: TT4.display, fontSize: 36, letterSpacing: '0.04em', lineHeight: 1, textShadow: '0 2px 6px rgba(0,0,0,0.4)' }}>DAY 1</div>
      <div style={{ fontFamily: TT4.body, fontSize: 17, marginTop: 8, textShadow: '0 2px 6px rgba(0,0,0,0.4)' }}>Love this!</div>
    </div>
  </div>
);

/* =========================================================
   33 — Share or Edit Day 1 sheet
   ========================================================= */
const ShareOrEditDay1Sheet = () => (
  <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, filter: 'brightness(0.45)' }}>
      <IGStoryScreen />
    </div>

    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      background: '#fff', borderTopLeftRadius: 18, borderTopRightRadius: 18,
      padding: '18px 18px 18px',
    }}>
      <div style={{
        textAlign: 'center', fontFamily: TT4.display, fontSize: 22, letterSpacing: '0.04em',
        color: '#1D1D1D', textTransform: 'uppercase', paddingBottom: 14, borderBottom: '1px solid #d9d6cf', marginBottom: 16,
      }}>Share or Edit Day 1</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SheetBtn primary><span>Share</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 16 L12 4" /><polyline points="7 9 12 4 17 9" /><path d="M5 14 L5 20 L19 20 L19 14" /></svg></SheetBtn>
        <SheetBtn><span>Share to IG Story</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" /></svg></SheetBtn>
        <SheetBtn>Change Progress Pic</SheetBtn>
        <SheetBtn>Edit Notes</SheetBtn>
        <button style={{
          marginTop: 4, width: '100%', padding: '14px',
          background: '#ececec', color: '#1D1D1D', border: 0, borderRadius: 9999,
          fontFamily: TT4.display, fontSize: 16, letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer',
        }}>Cancel</button>
      </div>
    </div>
  </div>
);

const SheetBtn = ({ children, primary = false }) => (
  <button style={{
    width: '100%', padding: '16px',
    background: primary ? TT4.brand : '#1D1D1D',
    color: primary ? '#000' : '#fff',
    border: 0, borderRadius: 9999,
    fontFamily: TT4.display, fontSize: 17, letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
  }}>{children}</button>
);

/* =========================================================
   34 — Edit Profile & Settings
   ========================================================= */
const SettingsRow = ({ label, value, chevron = true, children }) => (
  <div style={{ padding: '14px 20px', borderBottom: '1px solid #d9d6cf', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontFamily: TT4.body, fontSize: 12.5, color: '#1D1D1D', opacity: 0.7, marginBottom: 2 }}>{label}</div>
      {value !== undefined && (
        <div style={{ fontFamily: TT4.body, fontSize: 16, color: '#1D1D1D', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</div>
      )}
      {children}
    </div>
    {chevron && (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D1D1D" strokeWidth="2" strokeLinecap="round"><polyline points="9 6 15 12 9 18" /></svg>
    )}
  </div>
);
const ToggleRow = ({ label, on = true }) => (
  <div style={{ padding: '14px 20px', borderBottom: '1px solid #d9d6cf', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <div style={{ fontFamily: TT4.body, fontSize: 15, color: '#1D1D1D' }}>{label}</div>
    <div style={{ width: 50, height: 30, borderRadius: 9999, background: on ? '#34C759' : '#d9d6cf', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 2, [on ? 'right' : 'left']: 2, width: 26, height: 26, borderRadius: 9999, background: '#fff' }} />
    </div>
  </div>
);

const SettingsScreen = () => (
  <div style={{ minHeight: '100%', width: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
    <div style={{ padding: '14px 20px 18px', background: '#f5f3ee', borderBottom: '1px solid #d9d6cf' }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D1D1D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
      <div style={{ fontFamily: TT4.display, fontSize: 22, letterSpacing: '0.04em', color: '#1D1D1D', textTransform: 'uppercase', marginTop: 18 }}>Edit Profile &amp; Settings</div>

      <div style={{ position: 'relative', width: 96, height: 96, borderRadius: 9999, background: '#1D1D1D', display: 'grid', placeItems: 'center', color: '#f5f3ee', marginTop: 22 }}>
        <svg width="56" height="56" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4" /><path d="M4 21 a8 8 0 0 1 16 0 z" /></svg>
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: 9999, background: TT4.brand, display: 'grid', placeItems: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#000"><path d="M3 21 L7 20 L20 7 L17 4 L4 17 z" /></svg>
        </div>
      </div>
    </div>

    <SettingsRow label="First Name" value="Julia" />
    <SettingsRow label="Last Name" value="Screens" />
    <SettingsRow label="E-Mail" value="screensdesigntest@gmail.com" />
    <SettingsRow label="Password" value="•••••••••" />
    <SettingsRow label="Day End Time" value="11:00 pm" />
    <ToggleRow label='"1 hour left" notification' on />
    <ToggleRow label="Save progress pics to phone" on />
    <div style={{ padding: '14px 20px', borderBottom: '1px solid #d9d6cf', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontFamily: TT4.body, fontSize: 15, color: '#1D1D1D' }}>Theme</div>
      <div style={{ fontFamily: TT4.body, fontSize: 15, color: '#1D1D1D', opacity: 0.7 }}>System</div>
    </div>
    <SettingsRow label="Sync Now" value="Last Sync: 03/25/2026 10:07 AM" />
  </div>
);

/* =========================================================
   35 — Photos album list
   ========================================================= */
const PhotosAlbumListScreen = () => {
  const albums = [
    { name: 'Recents', count: '218', cover: 'calendar' },
    { name: 'Panoramas', count: '0' },
    { name: 'Videos', count: '0' },
    { name: 'Bursts', count: '0' },
    { name: 'Templify', count: '0' },
  ];
  return (
    <div style={{ minHeight: '100%', width: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr 44px', alignItems: 'center', padding: '14px 14px 18px' }}>
        <div style={{ width: 32, height: 32, borderRadius: 9999, background: '#f5f3ee', display: 'grid', placeItems: 'center', color: '#1D1D1D' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
        </div>
        <div style={{ textAlign: 'center', fontFamily: TT4.display, fontSize: 22, letterSpacing: '0.04em', color: '#1D1D1D', textTransform: 'uppercase' }}>Photos</div>
        <div />
      </div>

      {albums.map((a, i) => (
        <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 16px', borderBottom: '1px solid #d9d6cf' }}>
          <div style={{
            width: 96, height: 96, background: '#ececec', flex: '0 0 96px',
            display: 'grid', placeItems: 'center', position: 'relative', overflow: 'hidden',
          }}>
            {a.cover === 'calendar' ? (
              <div style={{ transform: 'scale(0.6)', transformOrigin: 'center' }}>
                <SharedCalendarGrid activeDay={-1} fontSize={9} gap={2} />
              </div>
            ) : (
              <svg width="38" height="32" viewBox="0 0 38 32" fill="none" stroke="#9a9a9a" strokeWidth="1.4">
                <rect x="6" y="4" width="22" height="18" />
                <rect x="10" y="8" width="22" height="18" />
              </svg>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: TT4.body, fontSize: 18, color: '#1D1D1D' }}>{a.name}</div>
            <div style={{ fontFamily: TT4.body, fontSize: 14, color: '#1D1D1D', opacity: 0.6, marginTop: 2 }}>{a.count}</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D1D1D" strokeWidth="2" strokeLinecap="round"><polyline points="9 6 15 12 9 18" /></svg>
        </div>
      ))}
      <div style={{ flex: 1 }} />
    </div>
  );
};

/* =========================================================
   36 — Recents grid
   ========================================================= */
const RecentsGridScreen = () => {
  // 8 cols visual rhythm using color swatches; mimic a photo grid
  const swatches = [
    '#d4b88a', '#e6b86e', '#8a5a3a', '#5a4a3a',
    '#7a6a4a', '#a39080', '#3a3a3a', '#6a5a4a',
    '#3a2a1a', '#8a7a6a', '#d8a47a', '#5a3a2a',
    '#1a1a1a', '#7a3a2a', '#4a3a2a', '#a06b3a',
    '#cfb085', '#8a5a3a', '#5a8a4a', '#7a8a4a',
    '#d8924a', '#7aa8c4', '#bcb0a0', '#3a5a3a',
    '#a06040', '#9aa590', '#5a5a3a', '#3a5a3a',
    '#1a1a1a', '#c45a2c', '#7a3a2a', '#5a3a2a',
  ];
  return (
    <div style={{ minHeight: '100%', width: '100%', background: '#fff', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative' }}>
        {/* grid background */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
          {swatches.map((c, i) => (
            <div key={i} style={{ aspectRatio: '1 / 1', background: c, opacity: i < 4 ? 0.6 : 1 }} />
          ))}
        </div>

        {/* top overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '14px 16px', display: 'grid', gridTemplateColumns: '44px 1fr 44px', alignItems: 'center' }}>
          <div style={{ width: 36, height: 36, borderRadius: 9999, background: TT4.brand, display: 'grid', placeItems: 'center', color: '#000' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 6 9 12 15 18" /></svg>
          </div>
          <div style={{ textAlign: 'center', fontFamily: TT4.display, fontSize: 18, letterSpacing: '0.04em', color: '#fff', textTransform: 'uppercase', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Recents</div>
          <div />
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   37 — Photo crop circle
   ========================================================= */
const PhotoCropScreen = () => (
  <div style={{ minHeight: '100%', width: '100%', background: '#1D1D1D', position: 'relative', display: 'flex', flexDirection: 'column' }}>
    <div style={{ flex: 1, position: 'relative', display: 'grid', placeItems: 'center' }}>
      <div style={{
        position: 'relative', width: 320, height: 320, borderRadius: 9999,
        overflow: 'hidden',
        background: 'radial-gradient(circle at 60% 35%, #d8a86a 0%, #a06040 35%, #5a3025 65%, #2a1810 100%)',
        boxShadow: '0 0 0 9999px rgba(29,29,29,0.85)',
      }}>
        {/* faked face/figure shapes */}
        <div style={{ position: 'absolute', top: 90, left: 100, width: 130, height: 150, borderRadius: '50% 50% 45% 45%', background: 'radial-gradient(circle at 50% 30%, #c89070 0%, #8a5a3a 80%)' }} />
        <div style={{ position: 'absolute', top: 200, left: 60, right: 60, height: 160, background: 'linear-gradient(180deg, #6a89b4 0%, #4a6a9a 100%)', borderRadius: 12, opacity: 0.85 }} />
        <div style={{ position: 'absolute', top: 240, left: 90, right: 90, height: 30, background: 'rgba(255,255,255,0.25)' }} />
      </div>
    </div>

    <div style={{ padding: '0 22px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <button style={{
        background: 'transparent', border: 0, color: '#fff',
        fontFamily: TT4.display, fontSize: 16, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer', padding: 0,
      }}>Cancel</button>

      <div style={{ display: 'flex', gap: 18, color: '#fff' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12 a9 9 0 1 1 3 6.7" /><polyline points="3 22 3 17 8 17" /></svg>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12 a9 9 0 1 0 -3 6.7" /><polyline points="21 22 21 17 16 17" /></svg>
      </div>

      <button style={{
        background: 'transparent', border: 0, color: TT4.brand,
        fontFamily: TT4.display, fontSize: 16, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer', padding: 0,
      }}>Choose</button>
    </div>
  </div>
);

Object.assign(window, {
  Day1ShareCardScreen,
  Day1ShareCardShareSheet,
  Day1NotesEditorScreen,
  HomeCompletedScreen,
  IGStoryScreen,
  ShareOrEditDay1Sheet,
  SettingsScreen,
  PhotosAlbumListScreen,
  RecentsGridScreen,
  PhotoCropScreen,
});
