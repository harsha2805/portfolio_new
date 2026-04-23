import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ACCENT = '#6c2ff2';
const ACCENT2 = '#22c55e';
const PAPER = '#f5f3ee';
const INK = '#0a0a0a';
const RULE = 'rgba(10,10,10,0.16)';
const GHOST = 'rgba(10,10,10,0.42)';

const APPS_DATA = {
  smartawake: {
    n: '001',
    name: 'SmartAwake',
    year: '2026',
    tag: 'Windows',
    c: ACCENT2,
    version: 'v1.0.0',
    status: 'Shipped',
    tagline: 'Keeps your PC awake while downloads run. Sleeps when they stop.',
    description: 'The set-it-and-forget-it power manager for Windows — it watches the network so you don\'t have to.',
    downloads: [
      { label: 'Installer', file: 'SmartAwake_Setup_1.0.0.exe', size: '51 MB', primary: true },
      { label: 'Portable', file: 'SmartAwake.exe', size: '182 MB', primary: false },
    ],
    stats: [
      { k: 'Stars', v: '124' },
      { k: 'Installs', v: '1.4k' },
      { k: 'Size', v: '51 MB' },
    ],
    features: [
      { n: '01', t: 'Smart Mode', d: 'Auto-detects downloads and holds sleep. Configurable threshold, polling interval, idle timeout, cooldown.' },
      { n: '02', t: 'Manual Override', d: 'Force awake indefinitely — or "keep awake for 2 hours" and forget about it.' },
      { n: '03', t: 'Display Control', d: 'Screen on, off, or let it sleep without locking. Saves power during long downloads.' },
      { n: '04', t: 'Wake Scheduler', d: 'Wake from sleep at a specific time using Windows waitable timers.' },
      { n: '05', t: 'Power Scheduler', d: 'Sleep, hibernate, or shutdown after a delay — or on the hour.' },
      { n: '06', t: 'Mouse Simulator', d: 'Subtle random movement to dodge idle detection by chatty apps and remote sessions.' },
      { n: '07', t: 'System Tray', d: 'Colour-coded status icons. Close the window and it keeps watching.' },
      { n: '08', t: 'Zero Dependencies', d: 'A single self-contained EXE. No .NET runtime, no third-party packages, no drama.' },
    ],
    stack: ['WPF', '.NET 10', 'Win32 P/Invoke', 'MVVM'],
    github: 'github.com/harsha-bixware/SmartAwake',
    screens: [
      { n: '01', t: 'Dashboard', d: 'Status, active sessions, network feed.' },
      { n: '02', t: 'Schedules', d: 'Sleep, wake, hibernate — one panel.' },
      { n: '03', t: 'Tray menu', d: 'Everything the window has, smaller.' },
    ],
    howItWorks: [
      { n: '01', t: 'Watch', d: 'IP helper counters, polled every 2s. Cheap, kernel-side.' },
      { n: '02', t: 'Judge', d: 'Threshold + hysteresis. A cooldown window prevents flapping.' },
      { n: '03', t: 'Act', d: 'SetThreadExecutionState with ES_CONTINUOUS. Yielded when idle.' },
      { n: '04', t: 'Rest', d: 'When the deed is done, release the flag. The OS resumes normal sleep.' },
    ],
    changelog: [
      { v: 'v1.0.0', d: '26 Apr 2026', notes: 'Initial public release. Installer + portable. Mouse simulator added.' },
      { v: 'v0.9.4', d: '03 Apr 2026', notes: 'Rewrote network watcher on Win32 P/Invoke. 8× less CPU.' },
      { v: 'v0.9.0', d: '22 Mar 2026', notes: 'Wake scheduler ships. Hibernate handling no longer gaslights you.' },
      { v: 'v0.5.0', d: '14 Feb 2026', notes: 'First private build. Did the thing it was supposed to.' },
    ],
    faq: [
      { q: 'Does it need the .NET runtime?', a: "No. Single self-contained EXE. You can carry it on a USB stick like it's 2008." },
      { q: 'Will it stop my laptop from overheating?', a: "It won't make fans any quieter, but Display Control lets the screen sleep while the download runs — that helps." },
      { q: 'Is it safe on corporate laptops?', a: "It uses documented Win32 calls. No drivers, no services, no registry edits. IT should be fine with it — but ask them first if you like your job." },
      { q: 'Can I contribute?', a: "Yes. Issues and PRs welcome on GitHub. Please don't add a dark mode toggle; it already has one." },
    ],
  },
};

const FALLBACK = {
  n: '—',
  name: 'App',
  year: '2025',
  tag: 'Unknown',
  c: ACCENT,
  version: '—',
  status: '—',
  tagline: '',
  description: '',
  downloads: [],
  stats: [],
  features: [],
  stack: [],
  github: '',
  screens: [],
  howItWorks: [],
  changelog: [],
  faq: [],
};

function StripePattern({ id, color }) {
  return (
    <svg width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="8" height="16" fill={color} opacity="0.35" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export default function AppDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const app = APPS_DATA[id] ?? { ...FALLBACK, name: id ?? 'App' };
  const c = app.c;

  const [feat, setFeat] = useState(null);
  const [hover, setHover] = useState(null);

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
        padding: '24px 48px',
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
        <div style={{ gridColumn: 'span 3', display: 'flex', alignItems: 'center' }}>
          <button onClick={() => navigate('/apps')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: GHOST, fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit', padding: 0 }}>
            ← Apps
          </button>
        </div>
        <div style={{ gridColumn: 'span 6', textAlign: 'center', display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
          <div style={{ width: 8, height: 8, background: INK, transform: 'rotate(45deg)', flexShrink: 0 }} />
          <span style={{ fontWeight: 600 }}>HoloStack</span>
          <span style={{ color: GHOST }}>— Apps / {app.name}</span>
        </div>
        <div style={{ gridColumn: 'span 3', textAlign: 'right', color: GHOST, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          № {app.n} / {app.year}
        </div>
      </div>

      {/* MASTHEAD */}
      <div style={{
        padding: '40px 48px 32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        borderBottom: `1px solid ${RULE}`,
      }}>
        <div style={{ gridColumn: 'span 7', paddingRight: 40 }}>
          <div style={{
            fontSize: 10,
            fontFamily: "'JetBrains Mono', monospace",
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            color: GHOST,
            marginBottom: 16,
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap',
          }}>
            <span style={{ padding: '3px 7px', border: `1px solid ${c}`, color: c, borderRadius: 2 }}>{app.tag}</span>
            <span style={{ padding: '3px 7px', border: `1px solid ${RULE}`, color: GHOST, borderRadius: 2 }}>{app.version}</span>
            <span style={{ padding: '3px 7px', border: `1px solid ${RULE}`, color: GHOST, borderRadius: 2 }}>{app.status}</span>
          </div>
          <h1 style={{ margin: 0, fontSize: 'clamp(56px, 7.5vw, 108px)', fontWeight: 500, letterSpacing: '-0.05em', lineHeight: 0.88 }}>
            {app.name.slice(0, Math.ceil(app.name.length / 2))}
            <span style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 300 }}>
              {app.name.slice(Math.ceil(app.name.length / 2))}
            </span>
            <span style={{ color: c }}>.</span>
          </h1>
          <p style={{ margin: '22px 0 0', fontSize: 16, lineHeight: 1.6, color: 'rgba(10,10,10,0.78)', maxWidth: 560 }}>
            {app.tagline} <em style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}>{app.description}</em>
          </p>
        </div>

        {/* Download sidebar */}
        <div style={{ gridColumn: 'span 5', paddingLeft: 40, borderLeft: `1px solid ${RULE}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {app.downloads.length > 0 ? (
            <>
              <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.16em', color: GHOST, marginBottom: 6 }}>
                Download
              </div>
              {app.downloads.map((d) => (
                <a key={d.file} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  alignItems: 'center',
                  padding: '18px 18px',
                  border: `1px solid ${d.primary ? c : RULE}`,
                  background: d.primary ? `${c}0d` : 'transparent',
                  textDecoration: 'none',
                  color: INK,
                  cursor: 'pointer',
                  transition: 'background 200ms',
                  borderRadius: 2,
                }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>{d.label}</div>
                    <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: GHOST, marginTop: 4, letterSpacing: '0.1em' }}>
                      {d.file}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: GHOST, letterSpacing: '0.1em' }}>{d.size}</div>
                    <div style={{ fontSize: 20, color: d.primary ? c : INK, marginTop: 2 }}>↓</div>
                  </div>
                </a>
              ))}
              {app.stats.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginTop: 10, borderTop: `1px solid ${RULE}`, paddingTop: 14 }}>
                  {app.stats.map((s, i) => (
                    <div key={s.k} style={{ paddingLeft: i ? 14 : 0, borderLeft: i ? `1px solid ${RULE}` : 'none' }}>
                      <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em' }}>{s.v}</div>
                      <div style={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace", color: GHOST, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 2 }}>{s.k}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div style={{ color: GHOST, fontSize: 13, fontFamily: "'JetBrains Mono', monospace", paddingTop: 20 }}>
              Coming soon.
            </div>
          )}
        </div>
      </div>

      {/* FEATURES + SIDEBAR */}
      {app.features.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', borderBottom: `1px solid ${RULE}` }}>
          <div style={{ padding: '28px 48px 32px' }}>
            <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.16em', color: GHOST, marginBottom: 16 }}>
              § 01 — Features <span style={{ marginLeft: 14 }}>Eight, to be exact.</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: `1px solid ${RULE}`, borderLeft: `1px solid ${RULE}` }}>
              {app.features.map((f, i) => (
                <div
                  key={f.n}
                  onMouseEnter={() => setFeat(i)}
                  onMouseLeave={() => setFeat(null)}
                  style={{
                    padding: '22px 22px',
                    borderBottom: `1px solid ${RULE}`,
                    borderRight: `1px solid ${RULE}`,
                    cursor: 'pointer',
                    background: feat === i ? `${c}0d` : 'transparent',
                    transition: 'background 200ms',
                    minHeight: 130,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: GHOST, letterSpacing: '0.14em' }}>{f.n}</div>
                    <div style={{ fontSize: 10, color: feat === i ? c : 'transparent', transition: 'color 200ms' }}>+</div>
                  </div>
                  <h3 style={{ margin: '10px 0 6px', fontSize: 22, fontWeight: 500, letterSpacing: '-0.025em' }}>{f.t}</h3>
                  <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: 'rgba(10,10,10,0.68)' }}>{f.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stack sidebar */}
          <div style={{ borderLeft: `1px solid ${RULE}`, padding: '28px 28px', background: 'rgba(10,10,10,0.015)' }}>
            <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.16em', color: GHOST, marginBottom: 14 }}>
              § 02 — Stack
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 26 }}>
              {app.stack.map(t => (
                <span key={t} style={{
                  fontSize: 10,
                  fontFamily: "'JetBrains Mono', monospace",
                  padding: '5px 9px',
                  border: `1px solid ${RULE}`,
                  borderRadius: 3,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}>
                  {t}
                </span>
              ))}
            </div>

            <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.16em', color: GHOST, marginBottom: 14 }}>
              § 03 — Get started
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 26 }}>
              {[
                { n: '01', t: 'Installer', d: 'Setup wizard, auto-updates.' },
                { n: '02', t: 'Portable', d: 'No install, zero registry.' },
                { n: '03', t: 'Configure', d: 'Thresholds live in settings.json.' },
              ].map(s => (
                <div key={s.n} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: 10, alignItems: 'start' }}>
                  <div style={{
                    width: 26,
                    height: 26,
                    border: `1px solid ${RULE}`,
                    borderRadius: '50%',
                    fontSize: 10,
                    fontFamily: "'JetBrains Mono', monospace",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: c,
                    flexShrink: 0,
                  }}>
                    {s.n}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{s.t}</div>
                    <div style={{ fontSize: 11, color: GHOST, marginTop: 2, lineHeight: 1.4 }}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>

            {app.github && (
              <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: 16 }}>
                <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.16em', color: GHOST, marginBottom: 10 }}>
                  § 04 — Source
                </div>
                <a style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  border: `1px solid ${RULE}`,
                  borderRadius: 3,
                  textDecoration: 'none',
                  color: INK,
                  cursor: 'pointer',
                  fontSize: 11,
                }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.04em' }}>{app.github}</span>
                  <span>↗</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PAGE 2 — SCREENS */}
      {app.screens.length > 0 && (
        <section style={{ padding: '36px 48px 32px', borderBottom: `1px solid ${RULE}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', marginBottom: 24 }}>
            <div style={{ gridColumn: 'span 4', fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.16em', color: GHOST, paddingTop: 8 }}>
              § 05 — Screens
            </div>
            <div style={{ gridColumn: 'span 8' }}>
              <h2 style={{ margin: 0, fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 0.95 }}>
                What it <span style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 300 }}>looks like</span>.
              </h2>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {app.screens.map((s, i) => (
              <figure
                key={s.n}
                onMouseEnter={() => setHover(`s${i}`)}
                onMouseLeave={() => setHover(null)}
                style={{ margin: 0, cursor: 'pointer' }}
              >
                <div style={{
                  aspectRatio: '4/3',
                  border: `1px solid ${RULE}`,
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${c}0a 0%, ${c}16 100%)`,
                  position: 'relative',
                  overflow: 'hidden',
                  transform: hover === `s${i}` ? 'translateY(-3px)' : 'translateY(0)',
                  transition: 'transform 300ms cubic-bezier(0.16,1,0.3,1)',
                }}>
                  <StripePattern id={`scr${i}`} color={c} />
                  <div style={{ position: 'absolute', top: 12, left: 12, fontSize: 9, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.18em', textTransform: 'uppercase', color: GHOST }}>
                    FIG. {s.n}
                  </div>
                </div>
                <figcaption style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'baseline', marginTop: 12 }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>{s.t}</div>
                    <div style={{ fontSize: 12, color: GHOST, marginTop: 3 }}>{s.d}</div>
                  </div>
                  <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: GHOST, letterSpacing: '0.14em' }}>↗</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      {app.howItWorks.length > 0 && (
        <section style={{ padding: '36px 48px 32px', borderBottom: `1px solid ${RULE}`, display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)' }}>
          <div style={{ gridColumn: 'span 4', paddingRight: 24 }}>
            <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.16em', color: GHOST, marginBottom: 14 }}>
              § 06 — How it works
            </div>
            <h2 style={{ margin: 0, fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 0.96 }}>
              One loop.<br />
              <span style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 300 }}>That's the trick.</span>
            </h2>
            <p style={{ margin: '18px 0 0', fontSize: 14, lineHeight: 1.6, color: 'rgba(10,10,10,0.7)', maxWidth: 360 }}>
              Sample the network every N seconds. If throughput crosses your threshold, request an execution state. If it doesn't, release. Repeat until the downloads are done and you remembered to hydrate.
            </p>
          </div>
          <div style={{ gridColumn: 'span 8', borderLeft: `1px solid ${RULE}`, paddingLeft: 40 }}>
            {app.howItWorks.map((step, i) => (
              <div
                key={step.n}
                onMouseEnter={() => setHover(`h${i}`)}
                onMouseLeave={() => setHover(null)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 180px 1fr auto',
                  alignItems: 'center',
                  padding: '20px 0',
                  borderBottom: i < app.howItWorks.length - 1 ? `1px solid ${RULE}` : 'none',
                  background: hover === `h${i}` ? `${c}0a` : 'transparent',
                  transition: 'background 200ms',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: GHOST, letterSpacing: '0.14em' }}>{step.n}</div>
                <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.025em' }}>{step.t}</div>
                <div style={{ fontSize: 13, color: 'rgba(10,10,10,0.7)', paddingLeft: 20 }}>{step.d}</div>
                <div style={{ fontSize: 14, color: hover === `h${i}` ? c : GHOST, transition: 'color 200ms' }}>→</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CHANGELOG + FAQ */}
      {(app.changelog.length > 0 || app.faq.length > 0) && (
        <section style={{ padding: '36px 48px 32px', borderBottom: `1px solid ${RULE}`, display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)' }}>
          {app.changelog.length > 0 && (
            <div style={{ gridColumn: 'span 6', paddingRight: 36 }}>
              <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.16em', color: GHOST, marginBottom: 14 }}>
                § 07 — Changelog
              </div>
              <h2 style={{ margin: '0 0 20px', fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: 500, letterSpacing: '-0.03em' }}>
                A <span style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 300 }}>short</span> history.
              </h2>
              {app.changelog.map((e, i) => (
                <div key={e.v} style={{ display: 'grid', gridTemplateColumns: '90px 90px 1fr', gap: 14, padding: '14px 0', borderTop: `1px solid ${RULE}`, alignItems: 'baseline' }}>
                  <div style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, color: i === 0 ? c : INK }}>{e.v}</div>
                  <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: GHOST, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{e.d}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(10,10,10,0.75)' }}>{e.notes}</div>
                </div>
              ))}
            </div>
          )}
          {app.faq.length > 0 && (
            <div style={{ gridColumn: 'span 6', paddingLeft: 36, borderLeft: `1px solid ${RULE}` }}>
              <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.16em', color: GHOST, marginBottom: 14 }}>
                § 08 — Questions
              </div>
              <h2 style={{ margin: '0 0 20px', fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: 500, letterSpacing: '-0.03em' }}>
                Answers, <span style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 300 }}>mostly honest</span>.
              </h2>
              {app.faq.map((f, i) => (
                <div key={i} style={{ padding: '14px 0', borderTop: `1px solid ${RULE}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 14 }}>
                    <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.01em' }}>{f.q}</div>
                    <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: GHOST, letterSpacing: '0.14em', flexShrink: 0 }}>0{i + 1}</div>
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.55, color: 'rgba(10,10,10,0.7)', marginTop: 6 }}>{f.a}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: '48px 48px 56px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', alignItems: 'center' }}>
        <div style={{ gridColumn: 'span 7' }}>
          <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.16em', color: GHOST, marginBottom: 12 }}>
            § 09 — Take it home
          </div>
          <h2 style={{ margin: 0, fontSize: 'clamp(48px, 5vw, 72px)', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 0.92 }}>
            Go,<br />download<br />
            <span style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 300 }}>peacefully</span>
            <span style={{ color: c }}>.</span>
          </h2>
        </div>
        <div style={{ gridColumn: 'span 5', paddingLeft: 40, borderLeft: `1px solid ${RULE}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {app.downloads[0] && (
            <a style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              alignItems: 'center',
              padding: '22px 22px',
              border: `1px solid ${c}`,
              background: c,
              color: PAPER,
              cursor: 'pointer',
              textDecoration: 'none',
              borderRadius: 2,
            }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.02em' }}>Download Installer</div>
                <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", opacity: 0.7, marginTop: 4, letterSpacing: '0.1em' }}>
                  {app.downloads[0].file} · {app.downloads[0].size}
                </div>
              </div>
              <div style={{ fontSize: 24 }}>↓</div>
            </a>
          )}
          {app.github && (
            <a style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              alignItems: 'center',
              padding: '16px 22px',
              border: `1px solid ${RULE}`,
              background: 'transparent',
              color: INK,
              cursor: 'pointer',
              textDecoration: 'none',
              borderRadius: 2,
            }}>
              <div style={{ fontSize: 14 }}>View source on GitHub</div>
              <div>↗</div>
            </a>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        padding: '16px 48px',
        borderTop: `1px solid ${RULE}`,
        fontSize: 10,
        fontFamily: "'JetBrains Mono', monospace",
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        color: GHOST,
      }}>
        <div style={{ gridColumn: 'span 4' }}>© HoloStack MMXXVI</div>
        <div style={{ gridColumn: 'span 4', textAlign: 'center', display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: c, display: 'inline-block' }} />
          Shipped — keep an eye on releases
        </div>
        <div style={{ gridColumn: 'span 4', textAlign: 'right' }}>End of document</div>
      </div>
    </div>
  );
}
