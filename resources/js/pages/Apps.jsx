import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ACCENT = '#6c2ff2';
const ACCENT2 = '#22c55e';
const PAPER = '#f5f3ee';
const INK = '#0a0a0a';
const RULE = 'rgba(10,10,10,0.16)';
const GHOST = 'rgba(10,10,10,0.42)';

const APPS = [
  { id: 'smartawake', n: '01', name: 'SmartAwake', year: '2026', tag: 'Windows', c: ACCENT2, tagline: 'Keeps your PC awake while downloads run. Sleeps when they stop.', status: 'Shipped', version: 'v1.0.0' },
  { id: 'grainient', n: '02', name: 'Grainient', year: '2025', tag: 'Web tool', c: ACCENT, tagline: 'Mesh gradients with noise, blur, and just enough chaos.', status: 'Beta', version: 'v0.4.1' },
  { id: 'orbital', n: '03', name: 'Orbital', year: '2025', tag: 'Experiment', c: INK, tagline: 'A planetarium that fits in a tab. WebGL, one comet.', status: 'Playing', version: 'β' },
  { id: 'verified', n: '04', name: 'Verified', year: '2025', tag: 'SaaS', c: ACCENT2, tagline: 'Testimonials without the theatre. Magic-links, zero fakes.', status: 'Soon', version: '—' },
  { id: 'kerning', n: '05', name: 'Kerning', year: '2024', tag: 'Play', c: ACCENT, tagline: 'A game for typography sickos. Wrong answers only.', status: 'Shipped', version: 'v1.2' },
  { id: 'dome', n: '06', name: 'Dome', year: '2024', tag: 'Component', c: ACCENT, tagline: 'Spherical image gallery you can actually afford.', status: 'OSS', version: 'v0.1' },
];

function StripePattern({ id, color }) {
  return (
    <svg width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <pattern id={id} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="7" height="14" fill={color} opacity="0.32" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export default function Apps() {
  const [hover, setHover] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();

  const filters = ['All', 'Shipped', 'Beta', 'Play', 'OSS'];
  const filtered = activeFilter === 'All' ? APPS : APPS.filter(a => a.status === activeFilter || a.tag === activeFilter);

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: PAPER,
      color: INK,
      fontFamily: "'Inter Tight', sans-serif",
    }}>
      {/* TOP BAR */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        padding: '28px 48px',
        borderBottom: `1px solid ${RULE}`,
        fontSize: 11,
        fontFamily: "'JetBrains Mono', monospace",
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        position: 'sticky',
        top: 0,
        background: PAPER,
        zIndex: 10,
      }}>
        <div style={{ gridColumn: 'span 3', color: GHOST, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: GHOST, fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit', padding: 0 }}>
            ← Index
          </button>
        </div>
        <div style={{ gridColumn: 'span 6', textAlign: 'center', display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
          <div style={{ width: 8, height: 8, background: INK, transform: 'rotate(45deg)', flexShrink: 0 }} />
          <span style={{ fontWeight: 600 }}>HoloStack</span>
          <span style={{ color: GHOST }}>— Apps</span>
        </div>
        <div style={{ gridColumn: 'span 3', textAlign: 'right', color: GHOST, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          {APPS.length} shown
        </div>
      </div>

      {/* PAGE HEADER */}
      <div style={{ padding: '40px 48px 28px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)' }}>
        <div style={{ gridColumn: 'span 7' }}>
          <div style={{
            fontSize: 10,
            fontFamily: "'JetBrains Mono', monospace",
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            color: GHOST,
            marginBottom: 14,
          }}>
            Shelf № 002
          </div>
          <h1 style={{ margin: 0, fontSize: 'clamp(52px, 6vw, 84px)', fontWeight: 500, letterSpacing: '-0.045em', lineHeight: 0.92 }}>
            Apps <span style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 300 }}>&amp; bits</span>
          </h1>
        </div>
        <div style={{ gridColumn: 'span 5', paddingLeft: 40, paddingTop: 28, display: 'flex', alignItems: 'flex-end' }}>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'rgba(10,10,10,0.7)', maxWidth: 380 }}>
            Small programs I built to scratch specific itches.
            Some went to production, some are still arguing with the compiler.
          </p>
        </div>
      </div>

      {/* FILTER STRIP */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 48px 16px',
        fontSize: 10,
        fontFamily: "'JetBrains Mono', monospace",
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
      }}>
        <div style={{ display: 'flex', gap: 18 }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                letterSpacing: 'inherit',
                textTransform: 'inherit',
                padding: '0 0 2px',
                color: activeFilter === f ? INK : GHOST,
                borderBottom: activeFilter === f ? `1px solid ${INK}` : '1px solid transparent',
                transition: 'color 200ms, border-color 200ms',
              }}
            >
              {f}
            </button>
          ))}
        </div>
        <div style={{ color: GHOST }}>Sort — Recent ↓</div>
      </div>

      {/* APP GRID */}
      <div style={{
        padding: '0 48px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        borderTop: `1px solid ${RULE}`,
      }}>
        {filtered.map((a, i) => {
          const col = i % 3;
          return (
            <article
              key={a.id}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onClick={() => navigate(`/apps/${a.id}`)}
              style={{
                padding: '28px 28px 24px',
                borderRight: col < 2 ? `1px solid ${RULE}` : 'none',
                borderBottom: `1px solid ${RULE}`,
                position: 'relative',
                cursor: 'pointer',
                background: hover === i ? `${a.c}08` : 'transparent',
                transition: 'background 250ms',
              }}
            >
              {/* top meta */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 10,
                fontFamily: "'JetBrains Mono', monospace",
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: GHOST,
              }}>
                <span>№ {a.n}</span>
                <span>{a.year}</span>
              </div>

              {/* visual placeholder */}
              <div style={{
                marginTop: 16,
                height: 170,
                position: 'relative',
                border: `1px solid ${RULE}`,
                borderRadius: 2,
                overflow: 'hidden',
                background: `linear-gradient(135deg, ${a.c}0a 0%, ${a.c}16 100%)`,
              }}>
                <StripePattern id={`pg-${a.id}`} color={a.c} />
                <div style={{
                  position: 'absolute',
                  bottom: 10,
                  left: 10,
                  right: 10,
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 9,
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: GHOST,
                }}>
                  <span>product shot</span>
                  <span>{a.version}</span>
                </div>
              </div>

              {/* name + tag */}
              <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: 0, fontSize: 26, fontWeight: 500, letterSpacing: '-0.025em' }}>{a.name}</h3>
                <span style={{
                  fontSize: 9,
                  fontFamily: "'JetBrains Mono', monospace",
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  padding: '3px 7px',
                  border: `1px solid ${a.c}`,
                  color: a.c,
                  borderRadius: 2,
                }}>
                  {a.tag}
                </span>
              </div>
              <p style={{ margin: '8px 0 0', fontSize: 13, lineHeight: 1.5, color: 'rgba(10,10,10,0.72)' }}>
                {a.tagline}
              </p>

              {/* footer */}
              <div style={{
                marginTop: 18,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 10,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: GHOST }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: a.c, display: 'inline-block' }} />
                  {a.status}
                </span>
                <span style={{
                  color: hover === i ? a.c : GHOST,
                  transform: hover === i ? 'translateX(4px)' : 'translateX(0)',
                  transition: 'all 300ms',
                }}>
                  View →
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {/* BOTTOM BAR */}
      <div style={{
        padding: '18px 48px',
        borderTop: `1px solid ${RULE}`,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 10,
        fontFamily: "'JetBrains Mono', monospace",
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        color: GHOST,
        marginTop: 8,
      }}>
        <span>© HoloStack MMXXVI</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: INK }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT2, display: 'inline-block' }} />
          More cooking
        </span>
      </div>
    </div>
  );
}
