// Single source of truth — import across all components

export const C = {
  bg:              '#060608',
  surface:         '#0d0a0f',
  border:          '#2e1e28',
  crimson:         '#a02828',
  gold:            '#c4a35a',
  textPrimary:     '#d4c9b0',
  textMuted:       '#a89880',
  textDim:         '#7a6555',
  textGhost:       '#5a4a40',
  ooc:             '#4a5a6a',
  oocBorder:       '#1a2a3a',
  icBorder:        '#3a1a1a',
  rollSuccess:     '#4a9a5a',
  rollSuccessClose:'#6aaa7a',
  rollFailClose:   '#8a4a4a',
  rollFail:        '#9a2a2a',
  rollNat20:       '#d4af37',
  rollNat1:        '#7a1a1a',
}

export const SP = {
  xs:        '4px',
  sm:        '8px',
  md:        '12px',
  lg:        '24px',
  xl:        '48px',
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

// Typography — use as spread: style={{ ...TY.body, color: C.textPrimary }}
export const TY = {
  display: { fontFamily: "'Cinzel', serif", fontSize: 'clamp(2.8rem,10vw,5.5rem)', fontWeight: 700, letterSpacing: '.25em' },
  heading: { fontFamily: "'Cinzel', serif", fontSize: '1.1rem', fontWeight: 600, letterSpacing: '.12em' },
  label:   { fontFamily: "'Cinzel', serif", fontSize: '.55rem', letterSpacing: '.2em',  textTransform: 'uppercase' },
  micro:   { fontFamily: "'Cinzel', serif", fontSize: '.45rem', letterSpacing: '.06em', textTransform: 'uppercase' },
  body:    { fontFamily: "'Crimson Text', serif", fontSize: '1.05rem', lineHeight: '1.85' },
  action:  { fontFamily: "'Crimson Text', serif", fontSize: '.95rem',  lineHeight: '1.65', fontStyle: 'italic' },
  ooc:     { fontFamily: "'Crimson Text', serif", fontSize: '.88rem',  lineHeight: '1.65', fontStyle: 'italic' },
  helper:  { fontFamily: "'Crimson Text', serif", fontSize: '.75rem',  lineHeight: '1.45' },
  caption: { fontFamily: "'Crimson Text', serif", fontSize: '.65rem',  lineHeight: '1.5'  },
}

// Borders
// default:  `1px solid ${C.border}`
// active:   `1px solid ${C.crimson}`
// ooc:      `2px solid #1a2a3a`
// Sharp corners everywhere — border-radius: 0 is the default.
