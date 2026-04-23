import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ACCENT = '#6c2ff2';
const ACCENT2 = '#22c55e';
const PAPER = '#f5f3ee';
const INK = '#0a0a0a';
const RULE = 'rgba(10,10,10,0.14)';
const GHOST = 'rgba(10,10,10,0.38)';

const navBtn = {
  color: INK,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 11,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  padding: 0,
};

/* Headline lines with metadata for staggered animation */
const LINES = [
  { text: 'Small',      serif: false, delay: '0.05s' },
  { text: 'software,',  serif: false, delay: '0.22s' },
  { text: 'precisely',  serif: true,  delay: '0.42s' },
];

export default function Landing() {
  const [hovered, setHovered] = useState(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const ref = useRef();
  const navigate = useNavigate();

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      style={{
        width: '100%',
        minHeight: '100vh',
        background: PAPER,
        color: INK,
        fontFamily: "'Inter Tight', sans-serif",
        position: 'relative',
        letterSpacing: '-0.01em',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `linear-gradient(to right, ${RULE} 1px, transparent 1px)`,
        backgroundSize: 'calc(100% / 12) 100%',
      }}
    >
      {/* Animation keyframes */}
      <style>{`
        @keyframes hs-line-in {
          from {
            opacity: 0;
            transform: translateY(36px) skewY(1.5deg);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0) skewY(0deg);
            filter: blur(0px);
          }
        }
        @keyframes hs-dot-in {
          0%   { opacity: 0; transform: scale(0.4); }
          60%  { opacity: 1; transform: scale(1.18); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes hs-sub-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hs-line {
          display: block;
          overflow: hidden;
          animation: hs-line-in 0.72s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .hs-dot {
          display: inline-block;
          animation: hs-dot-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .hs-sub {
          animation: hs-sub-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>

      {/* cursor glow */}
      <div style={{
        position: 'fixed',
        pointerEvents: 'none',
        left: `${mouse.x * 100}%`,
        top: `${mouse.y * 100}%`,
        width: 560,
        height: 560,
        transform: 'translate(-50%,-50%)',
        background: `radial-gradient(circle, ${hovered === 'apps' ? ACCENT2 : ACCENT}22 0%, transparent 60%)`,
        filter: 'blur(60px)',
        transition: 'background 400ms',
        zIndex: 0,
      }} />

      {/* TOP BAR */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: PAPER,
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        padding: '28px 48px',
        borderBottom: `1px solid ${RULE}`,
        fontSize: 11,
        fontFamily: "'JetBrains Mono', monospace",
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
      }}>
        <div style={{ gridColumn: 'span 6', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 10, height: 10, background: INK, transform: 'rotate(45deg)', flexShrink: 0 }} />
          <span style={{ fontWeight: 600 }}>HoloStack</span>
          <span style={{ color: GHOST }}>®</span>
        </div>
        <div style={{ gridColumn: 'span 6', display: 'flex', gap: 20, justifyContent: 'flex-end', alignItems: 'center' }}>
          <button onClick={() => navigate('/apps')} style={navBtn}>Work</button>
          <button onClick={() => navigate('/apps')} style={navBtn}>Apps</button>
          <a href="mailto:harshapeace123@gmail.com" style={{ ...navBtn, textDecoration: 'none' }}>Contact</a>
        </div>
      </div>

      {/* MAIN — full width headline, no left sidebar */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridTemplateRows: '1fr auto',
        padding: '0 48px',
        zIndex: 1,
      }}>
        {/* Headline — full 12 cols */}
        <div style={{
          gridColumn: 'span 12',
          paddingTop: 64,
          paddingBottom: 48,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <h1 style={{
            margin: 0,
            fontWeight: 500,
            fontSize: 'clamp(72px, 11.5vw, 168px)',
            lineHeight: 0.9,
            letterSpacing: '-0.05em',
            fontFamily: "'Inter Tight', sans-serif",
          }}>
            {LINES.map((ln) => (
              <span
                key={ln.text}
                className="hs-line"
                style={{ animationDelay: ln.delay }}
              >
                {ln.serif
                  ? <span style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 300 }}>{ln.text}</span>
                  : ln.text
                }
              </span>
            ))}
            {/* Period animates in last */}
            <span
              className="hs-line"
              style={{ animationDelay: '0.62s', display: 'inline-block' }}
            >
              <span className="hs-dot" style={{ color: ACCENT, animationDelay: '0.68s' }}>.</span>
            </span>
          </h1>

          <div
            className="hs-sub"
            style={{
              marginTop: 36,
              fontSize: 14,
              maxWidth: 560,
              lineHeight: 1.65,
              color: 'rgba(10,10,10,0.65)',
              animationDelay: '0.82s',
            }}
          >
            Harshavardhan builds the useful kind — tools you install and forget,
            interfaces that stay out of the way, motion that earns its frame rate.
          </div>
        </div>

        {/* Bottom gateways */}
        <div style={{
          gridColumn: 'span 12',
          borderTop: `1px solid ${RULE}`,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}>
          {[
            { id: 'portfolio', n: '01', k: 'Portfolio', s: '9 case studies · 2024→26', c: ACCENT, path: '/apps' },
            { id: 'apps',      n: '02', k: 'Apps',      s: '1 shipped · 3 cooking',   c: ACCENT2, path: '/apps' },
          ].map((g, i) => (
            <div
              key={g.id}
              onMouseEnter={() => setHovered(g.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate(g.path)}
              style={{
                padding: '24px 32px',
                borderLeft: i === 1 ? `1px solid ${RULE}` : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                background: hovered === g.id ? `${g.c}08` : 'transparent',
                transition: 'background 300ms',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: GHOST, letterSpacing: '0.1em' }}>{g.n}</span>
                <span style={{ fontSize: 40, fontWeight: 500, letterSpacing: '-0.03em' }}>{g.k}</span>
                <span style={{ fontSize: 12, color: GHOST, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.12em' }}>{g.s}</span>
              </div>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: `1px solid ${g.c}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transform: hovered === g.id ? 'translateX(6px)' : 'translateX(0)',
                transition: 'transform 300ms cubic-bezier(0.16,1,0.3,1), background 300ms, color 300ms',
                background: hovered === g.id ? g.c : 'transparent',
                color: hovered === g.id ? PAPER : g.c,
                fontSize: 18,
              }}>
                →
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM BAR — copyright + availability only */}
      <div style={{
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        padding: '18px 48px',
        borderTop: `1px solid ${RULE}`,
        fontSize: 10,
        fontFamily: "'JetBrains Mono', monospace",
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        color: GHOST,
      }}>
        <div style={{ gridColumn: 'span 6', display: 'flex', alignItems: 'center' }}>
          © HoloStack MMXXVI
        </div>
        <div style={{ gridColumn: 'span 6', textAlign: 'right', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT2, display: 'inline-block' }} />
          Available — Q3 openings
        </div>
      </div>
    </div>
  );
}
