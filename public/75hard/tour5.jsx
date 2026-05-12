/* tour5.jsx — Screens 38–41 (DARK MODE):
   Edit End-of-Day Time, Settings (continued · System theme),
   Settings (continued · Dark theme), Delete Account confirm. */

const TT5 = window.CO_TOKENS;
const D_BG = '#1D1D1D';
const D_HR = '#2a2a2a';
const D_TEXT = '#ffffff';
const D_MUTED = 'rgba(255,255,255,0.62)';

/* ---------- shared dark-mode primitives ---------- */
const DarkBackArrow = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={D_TEXT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="20" y1="12" x2="4" y2="12" /><polyline points="10 6 4 12 10 18" />
  </svg>
);

const DarkChevron = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={D_TEXT} strokeWidth="2" strokeLinecap="round">
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

const DarkPill = ({ children, primary = true, full = true }) => (
  <div style={{
    height: 52, borderRadius: 9999,
    background: primary ? TT5.brand : 'transparent',
    border: primary ? 'none' : `1px solid ${D_TEXT}`,
    color: primary ? '#000' : D_TEXT,
    fontFamily: TT5.display, fontSize: 18, letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 500,
    display: 'grid', placeItems: 'center',
    width: full ? '100%' : 'auto',
  }}>{children}</div>
);

const DarkSettingsRow = ({ label, value, chevron = true }) => (
  <div style={{ padding: '16px 20px', borderBottom: `1px solid ${D_HR}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontFamily: TT5.body, fontSize: 13, color: D_MUTED, marginBottom: 2 }}>{label}</div>
      {value !== undefined && <div style={{ fontFamily: TT5.body, fontSize: 16, color: D_TEXT, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</div>}
    </div>
    {chevron && <DarkChevron />}
  </div>
);

const DarkInlineRow = ({ label, value, chevron = true }) => (
  <div style={{ padding: '16px 20px', borderBottom: `1px solid ${D_HR}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
    <div style={{ fontFamily: TT5.body, fontSize: 16, color: D_TEXT }}>{label}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {value && <div style={{ fontFamily: TT5.body, fontSize: 15, color: D_MUTED }}>{value}</div>}
      {chevron && <DarkChevron />}
    </div>
  </div>
);

const DarkToggleRow = ({ label, on = true }) => (
  <div style={{ padding: '16px 20px', borderBottom: `1px solid ${D_HR}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <div style={{ fontFamily: TT5.body, fontSize: 16, color: D_TEXT }}>{label}</div>
    <div style={{ width: 52, height: 32, borderRadius: 9999, background: on ? '#34c759' : '#39393d', position: 'relative', flex: '0 0 52px' }}>
      <div style={{ position: 'absolute', top: 2, left: on ? 22 : 2, width: 28, height: 28, borderRadius: 9999, background: '#fff' }} />
    </div>
  </div>
);

/* =========================================================
   38 — Edit Your End-of-Day Time (DARK)
   ========================================================= */
const EditDayEndTimeScreen = () => (
  <div style={{ minHeight: '100%', width: '100%', background: D_BG, display: 'flex', flexDirection: 'column' }}>
    <div style={{ padding: '14px 18px 0' }}>
      <DarkBackArrow />
    </div>

    <div style={{ padding: '120px 28px 0', flex: 1 }}>
      <div style={{ fontFamily: TT5.display, fontSize: 30, letterSpacing: '0.03em', color: D_TEXT, textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.1, fontWeight: 500 }}>
        Edit Your End-of-Day Time
      </div>

      <div style={{ fontFamily: TT5.body, fontSize: 15, color: D_TEXT, opacity: 0.85, marginTop: 24, lineHeight: 1.5 }}>
        Each day will end at the time you select. At that time, you will be considered to be on the next day. Please make changes carefully.
      </div>

      <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: TT5.body, fontSize: 16, color: D_TEXT }}>Day End Time</div>
        <div style={{
          padding: '8px 16px', borderRadius: 9999, background: '#2a2a2a',
          fontFamily: TT5.body, fontSize: 16, color: D_TEXT, fontWeight: 500,
        }}>11:00 PM</div>
      </div>
    </div>

    <div style={{ padding: '0 22px 40px' }}>
      <DarkPill primary>Update Day End Time</DarkPill>
    </div>
  </div>
);

/* =========================================================
   Settings continued (rows from "Day End Time" downward),
   with primary action buttons stacked below.
   Used by 39 (System theme) and 40 (Dark theme).
   ========================================================= */
const SettingsContinuedBody = ({ themeLabel }) => (
  <div style={{ minHeight: '100%', width: '100%', background: D_BG, display: 'flex', flexDirection: 'column' }}>
    {/* hairline at the very top mimicking a row above */}
    <div style={{ borderTop: `1px solid ${D_HR}` }} />

    <DarkSettingsRow label="Day End Time" value="3:00 am" />
    <DarkToggleRow label='"1 hour left" notification' on />
    <DarkToggleRow label="Save progress pics to phone" on />
    <DarkInlineRow label="Theme" value={themeLabel} chevron={false} />
    <DarkSettingsRow label="Sync Now" value="Last Sync: 03/25/2026 10:07 AM" />
    <DarkInlineRow label="Start New Attempt" />
    <DarkInlineRow label="75 Hard Program Overview" />
    <DarkInlineRow label="Sign Out" />

    <div style={{ background: '#141414', padding: '18px 18px 22px', display: 'flex', flexDirection: 'column', gap: 14, marginTop: 14 }}>
      <DarkPill primary>Get Help/Report a Problem</DarkPill>
      <DarkPill primary>Share 75 Hard with a Friend</DarkPill>
      <DarkPill primary={false}>Delete Account</DarkPill>
    </div>
  </div>
);

/* =========================================================
   39 — Settings continued (System theme, DARK)
   ========================================================= */
const SettingsExtendedScreen = () => <SettingsContinuedBody themeLabel="System" />;

/* =========================================================
   40 — Settings continued (Dark theme, DARK)
   ========================================================= */
const SettingsDarkScreen = () => <SettingsContinuedBody themeLabel="Dark" />;

/* =========================================================
   41 — Delete Account confirmation modal (DARK)
   ========================================================= */
const DeleteAccountConfirmModal = () => (
  <div style={{ minHeight: '100%', width: '100%', background: D_BG, display: 'flex', flexDirection: 'column', position: 'relative' }}>
    {/* dim/blurred background hint of settings rows */}
    <div style={{ flex: 1, padding: '60px 22px 22px', display: 'flex', flexDirection: 'column', gap: 14, opacity: 0.32, filter: 'blur(4px)' }}>
      <div style={{ height: 50, background: '#2a2a2a' }} />
      <div style={{ height: 50, background: '#2a2a2a' }} />
      <div style={{ height: 50, background: '#2a2a2a' }} />
      <div style={{ flex: 1 }} />
      <div style={{ height: 52, background: '#0a0a0a', marginTop: 'auto' }} />
      <div style={{ height: 52, background: '#0a0a0a' }} />
    </div>

    <div style={{
      position: 'absolute', left: 26, right: 26, top: '50%', transform: 'translateY(-50%)',
      background: '#1f1f1f', border: `1px solid ${D_HR}`,
      padding: '28px 24px 24px', display: 'flex', flexDirection: 'column', gap: 18,
    }}>
      <div style={{ fontFamily: TT5.display, fontSize: 32, letterSpacing: '0.03em', color: D_TEXT, textTransform: 'uppercase', textAlign: 'center', fontWeight: 500 }}>
        Are You Sure?
      </div>

      <div style={{ fontFamily: TT5.body, fontSize: 14.5, color: D_TEXT, textAlign: 'center', lineHeight: 1.5 }}>
        All your account data will be permanently deleted. There is no undo.
        <br />Type DELETE to confirm
      </div>

      <input
        readOnly
        style={{
          width: '100%', height: 64, background: '#1D1D1D',
          border: `1px solid ${D_HR}`, outline: 'none',
          fontFamily: TT5.body, fontSize: 16, color: D_TEXT,
          padding: '0 12px',
        }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 4 }}>
        <div style={{
          height: 56, borderRadius: 9999, border: `1px solid ${D_TEXT}`,
          display: 'grid', placeItems: 'center',
          fontFamily: TT5.display, fontSize: 18, letterSpacing: '0.06em', color: D_TEXT, textTransform: 'uppercase',
        }}>No</div>
        <div style={{
          height: 56, borderRadius: 9999, background: TT5.brand,
          display: 'grid', placeItems: 'center',
          fontFamily: TT5.display, fontSize: 18, letterSpacing: '0.06em', color: '#000', textTransform: 'uppercase',
        }}>Yes, Delete</div>
      </div>
    </div>
  </div>
);

Object.assign(window, {
  EditDayEndTimeScreen,
  SettingsExtendedScreen,
  SettingsDarkScreen,
  DeleteAccountConfirmModal,
});
