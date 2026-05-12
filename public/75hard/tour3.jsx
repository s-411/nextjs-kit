/* tour3.jsx — Screens 18–27: Reminder time-picker, Paywall + states,
   Reminder all-days, Add Progress Pic flow, Day 1 saved state. */

const TT3 = window.CO_TOKENS;

/* =========================================================
   18 — Reminder sheet with iOS time-picker spinner overlay
   ========================================================= */
const Day1ReminderTimePickerSheet = () => {
  const days = ['S', 'M', 'T'];
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
      }}>
        <div style={{
          fontFamily: TT3.body, fontSize: 16, fontWeight: 500, color: '#1D1D1D',
          paddingBottom: 16, borderBottom: '1px solid #d9d6cf',
        }}>Reminder: 45 Minute Workout</div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 0', borderBottom: '1px solid #d9d6cf',
        }}>
          <span style={{ fontFamily: TT3.body, fontSize: 15, color: '#1D1D1D' }}>Every Day</span>
          <div style={{ width: 50, height: 30, borderRadius: 9999, background: '#34C759', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 2, right: 2, width: 26, height: 26, borderRadius: 9999, background: '#fff' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, padding: '14px 0', borderBottom: '1px solid #d9d6cf' }}>
          {['S','M','T','W','T','F','S'].map((d, i) => (
            <div key={i} style={{
              aspectRatio: '1 / 1', display: 'grid', placeItems: 'center',
              background: i < 3 ? '#1D1D1D' : 'transparent',
              color: i < 3 ? '#fff' : 'transparent',
              fontFamily: TT3.display, fontSize: 17, letterSpacing: '0.04em',
            }}>{d}</div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '40px 0 18px' }}>
          <span style={{ fontFamily: TT3.body, fontSize: 15, color: '#1D1D1D' }}>Time</span>
          <span style={{ padding: '6px 12px', borderRadius: 6, background: '#ececec', fontFamily: TT3.body, fontSize: 15, color: TT3.brand }}>10:08 AM</span>
        </div>

        <button style={{
          width: '100%', padding: '16px 20px',
          background: '#1D1D1D', color: '#fff', border: 0, borderRadius: 9999,
          fontFamily: TT3.body, fontSize: 17, fontWeight: 500, cursor: 'pointer',
        }}>Save</button>

        {/* iOS time-picker spinner overlay */}
        <div style={{
          position: 'absolute', left: '50%', top: '38%',
          transform: 'translate(-50%, -50%)',
          width: 240, height: 180, borderRadius: 14,
          background: 'rgba(255,255,255,0.96)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          alignItems: 'center', overflow: 'hidden',
          fontFamily: TT3.body, color: '#1D1D1D',
        }}>
          <div style={{ position: 'absolute', left: 12, right: 12, top: 72, height: 36, background: '#e8e8ea', borderRadius: 8 }} />
          {[['8','9','10','11','12'], ['06','07','08','09','10'], ['AM','PM','','','']].map((col, ci) => (
            <div key={ci} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '22px 0' }}>
              {col.map((v, i) => (
                <div key={i} style={{
                  fontSize: i === 2 ? 22 : 16,
                  fontWeight: i === 2 ? 600 : 400,
                  color: i === 2 ? '#1D1D1D' : 'rgba(0,0,0,0.35)',
                  height: 24, lineHeight: '24px',
                }}>{v}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   Paywall background (Choose Your Plan) shared
   ========================================================= */
const PaywallBase = ({ overlay = null, modal = null, hideContinue = false, annualSelected = true, dimmed = false }) => (
  <div style={{ position: 'relative', width: '100%', minHeight: '100%', background: '#f5f3ee', display: 'flex', flexDirection: 'column' }}>
    {/* Top hero with spade */}
    <div style={{ position: 'relative', height: 280, background: '#d9d6cf', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(135deg, #cfccc4 0, #cfccc4 28px, #d9d6cf 28px, #d9d6cf 56px)',
        opacity: 0.6,
      }} />
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
        <BrandMark size={170} />
      </div>
    </div>

    <div style={{ padding: '24px 22px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h2 style={{
        margin: '0 0 18px 0',
        fontFamily: TT3.display, fontSize: 36, fontWeight: 500,
        letterSpacing: '0.02em', color: '#1D1D1D', textTransform: 'uppercase', lineHeight: 1,
      }}>Choose Your Plan</h2>

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px 0', display: 'flex', flexDirection: 'column', gap: 12, fontFamily: TT3.body, fontSize: 14, color: '#1D1D1D' }}>
        {[
          ['check', 'Never Miss a Task'],
          ['bell', 'Set Custom Task Reminders'],
          ['cal', 'Conveniently Track Your Progress'],
          ['pencil', 'Save Daily Notes as You Go'],
        ].map(([k, t]) => (
          <li key={t} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 22, height: 22, color: TT3.brand, display: 'grid', placeItems: 'center' }}>
              {k === 'check' && (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 12 10 18 20 6" /></svg>)}
              {k === 'bell' && (<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 a6 6 0 0 0 -6 6 v5 L4 16 h16 l-2 -3 V8 a6 6 0 0 0 -6 -6 z M10 19 a2 2 0 0 0 4 0 z" /></svg>)}
              {k === 'cal' && (<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="5" width="18" height="16" rx="2" /><rect x="3" y="5" width="18" height="4" /><rect x="7" y="2" width="2" height="4" rx="1" /><rect x="15" y="2" width="2" height="4" rx="1" /></svg>)}
              {k === 'pencil' && (<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 21 L7 20 L20 7 L17 4 L4 17 z" /></svg>)}
            </span>
            {t}
          </li>
        ))}
      </ul>

      {/* Monthly */}
      <div style={{
        border: `1.5px solid ${annualSelected ? '#d9d6cf' : TT3.brand}`,
        borderRadius: 14, padding: '14px 16px', marginBottom: 12,
        display: 'flex', alignItems: 'center', gap: 12, background: '#fff',
        opacity: dimmed ? 0.55 : 1,
      }}>
        <div style={{
          width: 22, height: 22, borderRadius: 9999,
          border: `1.5px solid ${annualSelected ? '#bdbdbd' : TT3.brand}`,
          background: annualSelected ? 'transparent' : TT3.brand,
          display: 'grid', placeItems: 'center',
        }}>
          {!annualSelected && (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3"><polyline points="5 12 10 17 19 7" /></svg>)}
        </div>
        <div>
          <div style={{ fontFamily: TT3.body, fontSize: 16, fontWeight: 600, color: '#1D1D1D' }}>Monthly</div>
          <div style={{ fontFamily: TT3.body, fontSize: 13.5, color: '#1D1D1D' }}>Free for 3 days, then $4.99/mo</div>
        </div>
      </div>

      {/* Annual */}
      <div style={{
        position: 'relative',
        border: `1.5px solid ${annualSelected ? TT3.brand : '#d9d6cf'}`,
        borderRadius: 14, padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 12, background: '#fff',
        opacity: dimmed ? 0.55 : 1,
      }}>
        <div style={{
          width: 22, height: 22, borderRadius: 9999,
          background: annualSelected ? TT3.brand : 'transparent',
          border: annualSelected ? 'none' : '1.5px solid #bdbdbd',
          display: 'grid', placeItems: 'center', color: '#000',
        }}>
          {annualSelected && (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3"><polyline points="5 12 10 17 19 7" /></svg>)}
        </div>
        <div>
          <div style={{ fontFamily: TT3.body, fontSize: 16, fontWeight: 600, color: '#1D1D1D' }}>Annual</div>
          <div style={{ fontFamily: TT3.body, fontSize: 13.5, color: '#1D1D1D' }}>Full access for just $39.99/yr</div>
        </div>
        <div style={{
          position: 'absolute', top: -10, right: 14,
          padding: '3px 10px', borderRadius: 9999,
          background: TT3.brand, color: '#000',
          fontFamily: TT3.display, fontSize: 12, letterSpacing: '0.06em',
        }}>33% OFF</div>
      </div>

      <div style={{ marginTop: 22 }}>
        <button style={{
          width: '100%', padding: '16px 20px',
          background: '#1D1D1D', color: '#fff', border: 0, borderRadius: 9999,
          fontFamily: TT3.display, fontSize: 18, fontWeight: 500,
          letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer',
        }}>
          {hideContinue
            ? (<span style={{ display: 'inline-block', width: 18, height: 18, borderRadius: 9999, border: '2px solid #fff', borderTopColor: 'transparent' }} />)
            : 'Continue'}
        </button>
      </div>

      <div style={{ marginTop: 12, textAlign: 'center', fontFamily: TT3.body, fontSize: 12, color: '#6a6a6a', opacity: dimmed ? 0.6 : 1 }}>
        Restore purchases &nbsp;•&nbsp; Terms and conditions &nbsp;•&nbsp; Privacy policy
      </div>
    </div>

    {overlay}
    {modal}
  </div>
);

/* =========================================================
   19 — Paywall (Choose Your Plan)
   ========================================================= */
const PaywallScreen = () => <PaywallBase />;

/* =========================================================
   20 — Paywall + App Store sheet
   ========================================================= */
const PaywallAppStoreSheet = () => (
  <PaywallBase dimmed overlay={
    <>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
      <div style={{ position: 'absolute', right: 24, top: 240, color: '#fff', fontFamily: TT3.body, fontSize: 15, lineHeight: 1.3, textAlign: 'right', fontWeight: 500 }}>
        Double Click<br/>to Subscribe
      </div>
      <div style={{
        position: 'absolute', left: 12, right: 12, bottom: 0,
        background: '#f5f3ee', borderTopLeftRadius: 16, borderTopRightRadius: 16,
        padding: '16px 18px 22px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontFamily: TT3.body, fontSize: 18, fontWeight: 600, color: '#1D1D1D' }}>App Store</div>
          <div style={{ width: 28, height: 28, borderRadius: 9999, background: '#d9d6cf', display: 'grid', placeItems: 'center', color: '#1D1D1D', fontSize: 16 }}>×</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 14, marginBottom: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 52, height: 52, borderRadius: 10, background: TT3.brand, display: 'grid', placeItems: 'center', flex: '0 0 52px' }}>
            <BrandMark size={40} />
          </div>
          <div>
            <div style={{ fontFamily: TT3.body, fontSize: 15, fontWeight: 600, color: '#1D1D1D' }}>Monthly Access</div>
            <div style={{ fontFamily: TT3.body, fontSize: 13, color: '#6a6a6a' }}>75 Hard <span style={{ border: '1px solid #bdbdbd', padding: '0 4px', borderRadius: 4, fontSize: 11 }}>13+</span></div>
            <div style={{ fontFamily: TT3.body, fontSize: 13, color: '#6a6a6a' }}>Subscription</div>
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 14 }}>
          <div style={{ paddingBottom: 10, borderBottom: '1px solid #ececec', marginBottom: 10 }}>
            <div style={{ fontFamily: TT3.body, fontSize: 14, fontWeight: 600, color: '#1D1D1D' }}>3-day free trial</div>
            <div style={{ fontFamily: TT3.body, fontSize: 12, color: '#6a6a6a' }}>Starting today</div>
            <div style={{ fontFamily: TT3.body, fontSize: 14, fontWeight: 600, color: '#1D1D1D', marginTop: 8 }}>$4.99 per month</div>
            <div style={{ fontFamily: TT3.body, fontSize: 12, color: '#6a6a6a' }}>Starting Mar 27, 2026</div>
          </div>
          <div style={{ fontFamily: TT3.body, fontSize: 11.5, color: '#6a6a6a', lineHeight: 1.5 }}>
            No commitment. Cancel anytime in Settings. Plan automatically renews until canceled.
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 12, color: '#1D1D1D', fontFamily: TT3.body, fontSize: 12 }}>
          <span style={{ display: 'inline-block', width: 26, height: 26, borderRadius: 9999, border: `2px solid ${TT3.brand}`, marginBottom: 4 }} />
          <div>Confirm with Side Button</div>
        </div>
      </div>
    </>
  } />
);

/* =========================================================
   21 — Paywall + "You're all set" success
   ========================================================= */
const PaywallSuccessModal = () => (
  <PaywallBase hideContinue dimmed annualSelected={false} modal={
    <>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />
      <div style={{
        position: 'absolute', top: '42%', left: 20, right: 20, transform: 'translateY(-50%)',
        background: '#fff', borderRadius: 18, padding: '22px 22px 20px',
      }}>
        <div style={{ fontFamily: TT3.body, fontSize: 18, fontWeight: 700, color: '#1D1D1D', marginBottom: 4 }}>You're all set.</div>
        <div style={{ fontFamily: TT3.body, fontSize: 14, color: '#1D1D1D', marginBottom: 18 }}>Your purchase was successful.</div>
        <button style={{
          width: '100%', padding: '14px 20px',
          background: TT3.brand, color: '#000', border: 0, borderRadius: 9999,
          fontFamily: TT3.display, fontSize: 18, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer',
        }}>OK</button>
      </div>
    </>
  } />
);

/* =========================================================
   22 — Reminder sheet (Outdoor Workout, all 7 days active)
   ========================================================= */
const Day1ReminderAllDaysSheet = () => {
  // Day 1 with first item completed (variant)
  const days = ['S','M','T','W','T','F','S'];
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
      }}>
        <div style={{
          fontFamily: TT3.body, fontSize: 16, fontWeight: 500, color: '#1D1D1D',
          paddingBottom: 16, borderBottom: '1px solid #d9d6cf',
        }}>Reminder: 45 Minute Outdoor Workout</div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 0', borderBottom: '1px solid #d9d6cf',
        }}>
          <span style={{ fontFamily: TT3.body, fontSize: 15, color: '#1D1D1D' }}>Every Day</span>
          <div style={{ width: 50, height: 30, borderRadius: 9999, background: '#34C759', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 2, right: 2, width: 26, height: 26, borderRadius: 9999, background: '#fff' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, padding: '14px 0', borderBottom: '1px solid #d9d6cf' }}>
          {days.map((d, i) => (
            <div key={i} style={{
              aspectRatio: '1 / 1', display: 'grid', placeItems: 'center',
              background: '#1D1D1D', color: '#fff',
              fontFamily: TT3.display, fontSize: 17, letterSpacing: '0.04em',
            }}>{d}</div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #d9d6cf' }}>
          <span style={{ fontFamily: TT3.body, fontSize: 15, color: '#1D1D1D' }}>Time</span>
          <span style={{ padding: '6px 12px', borderRadius: 6, background: '#ececec', fontFamily: TT3.body, fontSize: 15, color: TT3.brand }}>10:09 AM</span>
        </div>

        <button style={{
          marginTop: 18, width: '100%', padding: '16px 20px',
          background: '#1D1D1D', color: '#fff', border: 0, borderRadius: 9999,
          fontFamily: TT3.display, fontSize: 18, fontWeight: 500,
          letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer',
        }}>Save</button>
      </div>
    </div>
  );
};

/* =========================================================
   23 — Day 1 + "Add a Progress Pic" action sheet
   ========================================================= */
const AddProgressPicSheet = () => (
  <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, opacity: 0.45 }}>
      <Day1Screen />
    </div>
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      background: '#fff', borderTopLeftRadius: 18, borderTopRightRadius: 18,
      padding: '18px 20px 22px',
    }}>
      <div style={{
        fontFamily: TT3.body, fontSize: 16, fontWeight: 500, color: '#1D1D1D',
        paddingBottom: 16, borderBottom: '1px solid #d9d6cf', marginBottom: 18,
      }}>Add a Progress Pic</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {['Take Photo', 'Choose from Phone'].map((l) => (
          <button key={l} style={{
            width: '100%', padding: '16px 20px',
            background: '#1D1D1D', color: '#fff', border: 0, borderRadius: 9999,
            fontFamily: TT3.display, fontSize: 17, fontWeight: 500,
            letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer',
          }}>{l}</button>
        ))}
        <button style={{
          width: '100%', padding: '14px 20px',
          background: 'transparent', color: '#1D1D1D',
          border: '1px solid #1D1D1D', borderRadius: 9999,
          fontFamily: TT3.display, fontSize: 16, fontWeight: 500,
          letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer',
        }}>Cancel</button>
      </div>
    </div>
  </div>
);

/* =========================================================
   24 — Photo picker grid
   ========================================================= */
const PhotoPickerScreen = () => {
  const swatches = [
    '#7a3a2a', '#1a1a1a', '#c45a2c',
    '#7a6a4a', '#a06b3a', '#2a2a2a',
    '#3a2a1a', '#5a4a3a', '#cfb085',
    '#8a5a3a', '#5a8a4a', '#7a8a4a',
  ];
  return (
    <div style={{ minHeight: '100%', width: '100%', background: '#f5f3ee', display: 'flex', flexDirection: 'column' }}>
      {/* Tab bar */}
      <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr 44px', alignItems: 'center', padding: '14px 14px 10px', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 9999, background: '#fff', display: 'grid', placeItems: 'center', color: '#1D1D1D', fontSize: 18 }}>×</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
          <div style={{
            padding: '8px 18px', borderRadius: 9999, background: '#1D1D1D', color: '#fff',
            fontFamily: TT3.display, fontSize: 14, letterSpacing: '0.04em',
          }}>PHOTOS</div>
          <div style={{
            padding: '8px 18px', borderRadius: 9999, background: 'transparent', color: '#1D1D1D',
            fontFamily: TT3.display, fontSize: 14, letterSpacing: '0.04em',
          }}>COLLECTIONS</div>
        </div>
        <div />
      </div>

      {/* Private access banner */}
      <div style={{
        margin: '10px 14px 14px', background: '#fff', borderRadius: 12,
        padding: 14, display: 'flex', gap: 12, alignItems: 'flex-start',
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8, flex: '0 0 36px',
          background: 'conic-gradient(from 0deg, #f5a623, #f55a23, #d62a8a, #6a3ac4, #2a8ac4, #2ac470, #f5d423, #f5a623)',
        }} />
        <div style={{ flex: 1, fontFamily: TT3.body, fontSize: 13, color: '#1D1D1D', lineHeight: 1.45 }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Private Access to Photos</div>
          Your photo library is shown here, but "75 Hard" can only access the items you select.
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid #ececec', color: TT3.brand, fontWeight: 500 }}>Learn More...</div>
        </div>
        <div style={{ color: '#6a6a6a', fontSize: 16 }}>×</div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, padding: '0 0 8px' }}>
        {swatches.map((c, i) => (
          <div key={i} style={{ aspectRatio: '1 / 1', background: c }} />
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {/* Bottom bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px 18px',
      }}>
        <div style={{ width: 36, height: 36, borderRadius: 9999, background: '#fff', display: 'grid', placeItems: 'center', color: '#1D1D1D', fontSize: 14 }}>•••</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: TT3.body, fontSize: 13.5, color: '#1D1D1D' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 11 L21 3 L13 21 L11 13 z" /></svg>
          Location Is Included
        </div>
        <div style={{ width: 36, height: 36, borderRadius: 9999, background: '#fff', display: 'grid', placeItems: 'center', color: '#1D1D1D' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><line x1="16" y1="16" x2="21" y2="21" strokeLinecap="round" /></svg>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   25 — Full Photo Library access prompt
   ========================================================= */
const PhotoLibraryPromptScreen = () => (
  <div style={{ position: 'relative', minHeight: '100%', width: '100%', background: TT3.bg, display: 'flex', flexDirection: 'column' }}>
    <div style={{ padding: '18px 20px' }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </div>
    {/* faint silhouette bg suggestion */}
    <div style={{ flex: 1, background: 'radial-gradient(ellipse at 50% 50%, #c45a2c 0%, #2a1a10 70%, #1D1D1D 100%)', position: 'relative' }}>
      <div style={{ position: 'absolute', left: 14, right: 14, top: 14, bottom: 14, background: 'rgba(196,90,44,0.6)', borderRadius: 22, padding: '22px 22px 18px', backdropFilter: 'blur(20px)' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 50, height: 50, borderRadius: 12, background: 'conic-gradient(from 0deg, #f5a623, #f55a23, #d62a8a, #6a3ac4, #2a8ac4, #2ac470, #f5d423, #f5a623)' }} />
          <div style={{ width: 24, height: 24, borderRadius: 6, background: '#2a8ac4', alignSelf: 'flex-end', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 12 }}>✋</div>
        </div>
        <div style={{ fontFamily: TT3.body, fontSize: 17, fontWeight: 700, color: '#1D1D1D', lineHeight: 1.25, marginBottom: 10 }}>
          "75 Hard" would like full access to your Photo Library.
        </div>
        <div style={{ fontFamily: TT3.body, fontSize: 13, color: '#1D1D1D', marginBottom: 14 }}>
          Enable access to upload progress pictures from your photo library.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, marginBottom: 12 }}>
          {['#a06040','#1a1a1a','#9aa590','#d8924a','#7aa8c4','#bcb0a0','#3a5a3a','#3a5a3a'].map((c, i) => (
            <div key={i} style={{ aspectRatio: '1 / 1', background: c }} />
          ))}
        </div>
        <div style={{ fontFamily: TT3.body, fontSize: 12.5, fontWeight: 600, color: '#1D1D1D', marginBottom: 4 }}>217 Photos, 24 Videos</div>
        <div style={{ fontFamily: TT3.body, fontSize: 11.5, color: '#1D1D1D', marginBottom: 14, lineHeight: 1.4 }}>
          Photos may contain data associated with location, depth information, captions, and audio.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['Limit Access...', 'Allow Full Access', "Don't Allow"].map((l) => (
            <button key={l} style={{
              width: '100%', padding: '12px 16px',
              background: 'rgba(255,255,255,0.55)', color: '#1D1D1D',
              border: 0, borderRadius: 9999,
              fontFamily: TT3.body, fontSize: 14, fontWeight: 500, cursor: 'pointer',
            }}>{l}</button>
          ))}
        </div>
      </div>
    </div>
    <div style={{ padding: '14px 16px 22px', background: TT3.bg }}>
      <button style={{
        width: '100%', padding: '14px 20px', background: '#fff', color: '#1D1D1D',
        border: 0, borderRadius: 4, fontFamily: TT3.body, fontSize: 16, fontWeight: 500, cursor: 'pointer',
      }}>Use this Image</button>
    </div>
  </div>
);

/* =========================================================
   26 — Single photo confirm
   ========================================================= */
const PhotoConfirmScreen = () => (
  <div style={{ minHeight: '100%', width: '100%', background: TT3.bg, display: 'flex', flexDirection: 'column' }}>
    <div style={{ padding: '18px 20px' }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </div>
    <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(180deg, #d4451a 0%, #c43a14 50%, #4a1a0a 100%)' }}>
      <div style={{
        position: 'absolute', left: '50%', top: '35%', transform: 'translate(-50%, 0)',
        width: 90, height: 90, borderRadius: 9999, background: '#f5d423',
        boxShadow: '0 0 60px rgba(255,200,80,0.6)',
      }} />
      <div style={{
        position: 'absolute', left: '40%', top: '40%', width: 90, height: 280,
        background: 'linear-gradient(180deg, #1a0a05 0%, #2a1108 100%)',
        clipPath: 'polygon(45% 0, 60% 45%, 70% 80%, 60% 100%, 40% 100%, 30% 80%, 38% 45%)',
      }} />
    </div>
    <div style={{ padding: '18px 16px 22px', background: TT3.bg }}>
      <button style={{
        width: '100%', padding: '14px 20px',
        background: '#fff', color: '#1D1D1D', border: 0, borderRadius: 9999,
        fontFamily: TT3.display, fontSize: 18, fontWeight: 500,
        letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer',
      }}>Use this Image</button>
    </div>
  </div>
);

/* =========================================================
   27 — Day 1 saved state (toast)
   ========================================================= */
const Day1SavedToastScreen = () => {
  const items = [
    { label: '45 Minute Workout', time: '4:08 PM', done: true },
    { label: '45 Minute Outdoor Workout', time: '10:09 AM', done: true },
    { label: 'Take Progress Picture', done: true, hasCamera: true },
    { label: '10 Pages of Reading' },
    { label: 'Drink 1 Gallon of Water' },
    { label: 'Follow a Diet' },
    { label: 'No Cheat Meals or Alcohol' },
  ];
  return (
    <div style={{ minHeight: '100%', width: '100%', background: '#f5f3ee', display: 'flex', flexDirection: 'column', position: 'relative', overflowY: 'auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '18px 20px 14px', gap: 12 }}>
        <BrandMarkStacked size={48} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: TT3.display, fontSize: 36, fontWeight: 500, letterSpacing: '0.04em', color: '#1D1D1D', textTransform: 'uppercase', lineHeight: 1 }}>Day 1</div>
          <div style={{ fontFamily: TT3.body, fontSize: 13, color: '#1D1D1D', marginTop: 6 }}>Mar 25, 2026</div>
        </div>
        <div style={{ justifySelf: 'end' }}>
          <svg width="30" height="26" viewBox="0 0 34 30" fill="none" stroke="#1D1D1D" strokeWidth="1.5"><rect x="2" y="4" width="30" height="24" rx="2" /><line x1="2" y1="10" x2="32" y2="10" /></svg>
        </div>
      </div>

      <div style={{ padding: '0 20px', borderTop: '1px solid #d9d6cf' }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 0', borderBottom: i === items.length - 1 ? 'none' : '1px solid #d9d6cf' }}>
            <div style={{
              width: 28, height: 28, borderRadius: 9999, flex: '0 0 28px',
              border: it.done ? 'none' : '1.5px solid #1D1D1D',
              background: it.done ? TT3.brand : 'transparent',
              display: 'grid', placeItems: 'center',
            }}>
              {it.done && (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3"><polyline points="5 12 10 17 19 7" /></svg>)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: TT3.body, fontSize: 17, color: '#1D1D1D',
                textDecoration: it.done ? 'line-through' : 'none',
                opacity: it.done ? 0.55 : 1, marginBottom: 4,
              }}>{it.label}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#1D1D1D', opacity: it.done && it.time ? 0.55 : 1 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="13" r="8" /></svg>
                <span style={{ fontFamily: TT3.body, fontSize: 13 }}>{it.time || 'Add Reminder'}</span>
              </div>
            </div>
            {it.hasCamera && (
              <svg width="28" height="24" viewBox="0 0 32 28" fill="#1D1D1D" style={{ opacity: it.done ? 0.55 : 1 }}>
                <path d="M9 5 L12 2 L20 2 L23 5 L29 5 L29 26 L3 26 L3 5 z" />
                <circle cx="16" cy="15" r="6" fill="#f5f3ee" />
              </svg>
            )}
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', padding: '20px 20px 28px', marginTop: 14, borderTop: '1px solid #d9d6cf' }}>
        <div style={{ fontFamily: TT3.display, fontSize: 18, fontWeight: 500, letterSpacing: '0.04em', color: '#1D1D1D', textTransform: 'uppercase', marginBottom: 10 }}>Notes:</div>
        <div style={{ height: 1, background: '#1D1D1D', marginBottom: 12 }} />
        <p style={{ margin: 0, fontFamily: TT3.body, fontSize: 14, lineHeight: 1.45, color: '#1D1D1D' }}>
          Make notes of any challenges, insights, or breakthroughs you achieve.
        </p>
      </div>

      {/* Toast */}
      <div style={{
        position: 'absolute', top: 14, left: 16, right: 16,
        background: '#fff', borderRadius: 9999, padding: '10px 16px',
        display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
      }}>
        <div style={{ width: 24, height: 24, borderRadius: 9999, background: TT3.brand, display: 'grid', placeItems: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3"><polyline points="5 12 10 17 19 7" /></svg>
        </div>
        <span style={{ fontFamily: TT3.body, fontSize: 14, fontWeight: 500, color: '#1D1D1D' }}>Image saved successfully</span>
      </div>
    </div>
  );
};

Object.assign(window, {
  Day1ReminderTimePickerSheet, PaywallScreen, PaywallAppStoreSheet, PaywallSuccessModal,
  Day1ReminderAllDaysSheet, AddProgressPicSheet, PhotoPickerScreen,
  PhotoLibraryPromptScreen, PhotoConfirmScreen, Day1SavedToastScreen,
});
