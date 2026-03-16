// Design token references — values live in index.css :root

export const C = {
  bg:              'var(--color-bg)',
  surface:         'var(--color-surface)',
  border:          'var(--color-border)',
  crimson:         'var(--color-crimson)',
  gold:            'var(--color-gold)',
  textPrimary:     'var(--color-text-primary)',
  textMuted:       'var(--color-text-muted)',
  textDim:         'var(--color-text-dim)',
  textGhost:       'var(--color-text-ghost)',
  ooc:             'var(--color-ooc)',
  oocBorder:       'var(--color-ooc-border)',
  icBorder:        'var(--color-ic-border)',
  rollSuccess:     'var(--color-roll-success)',
  rollSuccessClose:'var(--color-roll-success-close)',
  rollFailClose:   'var(--color-roll-fail-close)',
  rollFail:        'var(--color-roll-fail)',
  rollNat20:       'var(--color-roll-nat20)',
  rollNat1:        'var(--color-roll-nat1)',
}

export const SP = {
  xs:        'var(--sp-xs)',
  sm:        'var(--sp-sm)',
  md:        'var(--sp-md)',
  lg:        'var(--sp-lg)',
  xl:        'var(--sp-xl)',
  component: '.35rem .65rem',
  section:   '1.1rem',
  page:      '1.75rem 1.5rem',
}

export const Z = {
  panel:   100,
  overlay: 200,
  tooltip: 300,
}

export const ANIM = {
  fadeUp:  'fadeUp 0.4s ease forwards',
  slideIn: 'slideIn 0.25s ease forwards',
  rollPop: 'rollPop 0.25s ease forwards',
  blink:   'blink 1.2s ease-in-out infinite',
}

// TY — used by play components not yet migrated to CSS classes.
// Chargen components use className instead (see index.css).
export const TY = {
  display:   { fontFamily: "'Cinzel', serif", fontSize: 'clamp(3rem,12vw,6rem)',       fontWeight: 700, letterSpacing: '.25em',  textTransform: 'uppercase', color: C.gold },
  heading:   { fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.2rem,4vw,1.75rem)',   fontWeight: 600, letterSpacing: '.12em',  textTransform: 'uppercase', color: C.gold },
  subheader: { fontFamily: "'Cinzel', serif", fontSize: 'clamp(.65rem,1.8vw,.8rem)',                    letterSpacing: '.14em',  textTransform: 'uppercase', color: C.textMuted },
  label:     { fontFamily: "'Cinzel', serif", fontSize: 'clamp(.5rem,1.3vw,.62rem)',                    letterSpacing: '.18em',  textTransform: 'uppercase', color: C.textMuted },
  micro:     { fontFamily: "'Cinzel', serif", fontSize: 'clamp(.5rem,1.3vw,.62rem)',                    letterSpacing: '.12em',  textTransform: 'uppercase', color: C.textDim },
  body:      { fontFamily: "'Crimson Text', serif", fontSize: 'clamp(.9rem,2.2vw,1.05rem)',  lineHeight: '1.9',  color: C.textPrimary },
  action:    { fontFamily: "'Crimson Text', serif", fontSize: 'clamp(.9rem,2.2vw,1.05rem)',  lineHeight: '1.9',  fontStyle: 'italic', color: C.textGhost },
  ooc:       { fontFamily: "'Crimson Text', serif", fontSize: 'clamp(.9rem,2.2vw,1.05rem)',  lineHeight: '1.9',  fontStyle: 'italic', color: C.ooc },
  helper:    { fontFamily: "'Crimson Text', serif", fontSize: 'clamp(.72rem,1.8vw,.82rem)',  lineHeight: '1.5',  color: C.textPrimary },
  caption:   { fontFamily: "'Crimson Text', serif", fontSize: 'clamp(.65rem,1.5vw,.75rem)',  lineHeight: '1.45', color: C.textGhost },
}

// Borders
// default:  `1px solid ${C.border}`
// active:   `1px solid ${C.crimson}`
// ooc:      `2px solid #1a2a3a`
// Sharp corners everywhere — border-radius: 0 is the default.
