import { useState, useRef, useEffect } from 'react'
import { parseTags } from '../lib/parseTags.js'
import { buildSystemPrompt } from '../lib/systemPrompt.js'
import { BACKGROUNDS } from '../data/backgrounds.js'
import { HD_AVG, profBonus, SLOT_TABLE, SHORT_REST_CASTERS } from '../data/levelup.js'
import { C, TY, SP, Z } from '../lib/tokens.js'
import { mod } from '../lib/dnd.js'
import PlayMessages from './PlayMessages.jsx'
import PlayInput from './PlayInput.jsx'
import PlaySheet from './PlaySheet.jsx'
import { CONDITIONS } from '../data/conditions.js'

const MSGS_KEY = 'barovia_msgs'

function loadMsgs() {
  try {
    const raw = localStorage.getItem(MSGS_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

const SKILL_MAP = {
  athletics: 'strength',
  acrobatics: 'dexterity', sleight_of_hand: 'dexterity', stealth: 'dexterity',
  arcana: 'intelligence', history: 'intelligence', investigation: 'intelligence', nature: 'intelligence', religion: 'intelligence',
  animal_handling: 'wisdom', insight: 'wisdom', medicine: 'wisdom', perception: 'wisdom', survival: 'wisdom',
  deception: 'charisma', intimidation: 'charisma', performance: 'charisma', persuasion: 'charisma',
  strength: 'strength', dexterity: 'dexterity', constitution: 'constitution',
  intelligence: 'intelligence', wisdom: 'wisdom', charisma: 'charisma', attack: 'strength',
}

function rollD20() { return Math.floor(Math.random() * 20) + 1 }

export default function Play({ character, onCharacterUpdate, onExit }) {
  const saved = loadMsgs()
  const [msgs, setMsgs] = useState(saved?.display ?? [])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const histRef   = useRef(saved?.history ?? [])
  const sysRef    = useRef('')
  const bottomRef = useRef(null)
  const taRef     = useRef(null)
  const charRef   = useRef(character)

  useEffect(() => { charRef.current = character }, [character])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, loading])
  useEffect(() => {
    if (msgs.length > 0) {
      localStorage.setItem(MSGS_KEY, JSON.stringify({ display: msgs, history: histRef.current }))
    }
  }, [msgs])

  useEffect(() => {
    if (saved?.display?.length) return // resume from save, skip init
    sysRef.current = buildSystemPrompt(character)
    const init = [{ role: 'user', content: 'Begin.' }]
    callDM(init).then(({ text, tags }) => {
      histRef.current = [...init, { role: 'assistant', content: text }]
      const buf = [{ role: 'assistant', content: text, id: 'open' }]
      applyTags(tags, buf)
      setMsgs(buf)
      setLoading(false)
    })
    setLoading(true)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function callDM(history) {
    const r = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ system: sysRef.current, messages: history }),
    })
    const d = await r.json()
    if (d.error) throw new Error(d.error)
    return parseTags(d.content)
  }

  function applyTags(tags, buf) {
    const SA = { strength: 'STR', dexterity: 'DEX', constitution: 'CON', intelligence: 'INT', wisdom: 'WIS', charisma: 'CHA' }
    tags.forEach(t => {
      if (t.type === 'monster') {
        fetch(`https://www.dnd5eapi.co/api/monsters/${t.slug}`)
          .then(r => r.ok ? r.json() : null)
          .then(d => { if (d) onCharacterUpdate(c => ({ ...c, activeMonster: d })) })
          .catch(() => {})
      }
      if (t.type === 'item') {
        const add = t.val.startsWith('+')
        const item = t.val.slice(1)
        onCharacterUpdate(c => ({
          ...c, inventory: add ? [...c.inventory, item] : c.inventory.filter(i => i !== item),
        }))
      }
      if (t.type === 'hp') onCharacterUpdate(c => {
        const wasAtZero = c.hp === 0
        const next = { ...c, hp: t.val }
        if (wasAtZero && t.val > 0) next.deathSaves = { successes: 0, failures: 0 }
        return next
      })
      if (t.type === 'spellslot') onCharacterUpdate(c => {
        if (!Array.isArray(c.spellSlots)) return c
        const tierIdx = c.spellSlots.findIndex(s => s.used < s.total)
        if (tierIdx === -1) return c
        const slots = c.spellSlots.map((s, i) => i === tierIdx ? { ...s, used: s.used + 1 } : s)
        return { ...c, spellSlots: slots }
      })
      if (t.type === 'levelup') {
        const newLevel = (charRef.current.level ?? 1) + 1
        onCharacterUpdate(c => {
          const hdAvg = HD_AVG[c.class] ?? 5
          const hpIncrease = hdAvg + mod(c.stats.constitution)
          const newMaxHp = c.maxHp + hpIncrease
          const tierDefs = SLOT_TABLE[c.class]?.[newLevel - 1]
          const newSpellSlots = tierDefs
            ? tierDefs.map(def => {
                const existing = Array.isArray(c.spellSlots) ? c.spellSlots.find(s => s.level === def.level) : null
                return { ...def, used: existing?.used ?? 0 }
              })
            : c.spellSlots
          return {
            ...c,
            level: newLevel,
            maxHp: newMaxHp,
            hp: Math.min(c.hp + hpIncrease, newMaxHp),
            profBonus: profBonus(newLevel),
            spellSlots: newSpellSlots,
          }
        })
        buf.push({ role: 'levelup', id: 'lu-' + Date.now(), level: newLevel })
      }
      if (t.type === 'shortrest') {
        const c = charRef.current
        const hdAvg = HD_AVG[c.class] ?? 5
        const hpGain = hdAvg + mod(c.stats.constitution)
        const newHp = Math.min(c.hp + Math.max(1, hpGain), c.maxHp)
        const isWarlock = SHORT_REST_CASTERS.has(c.class)
        onCharacterUpdate(ch => ({
          ...ch,
          hp: newHp,
          spellSlots: isWarlock && Array.isArray(ch.spellSlots)
            ? ch.spellSlots.map(s => ({ ...s, used: 0 }))
            : ch.spellSlots,
        }))
        buf.push({ role: 'rest', id: 'sr-' + Date.now(), short: true, hpGain: newHp - c.hp })
      }
      if (t.type === 'longrest') {
        onCharacterUpdate(c => ({
          ...c,
          hp: c.maxHp,
          spellSlots: Array.isArray(c.spellSlots) ? c.spellSlots.map(s => ({ ...s, used: 0 })) : c.spellSlots,
        }))
        buf.push({ role: 'rest', id: 'lr-' + Date.now(), short: false })
      }
      if (t.type === 'deathsave') onCharacterUpdate(c => {
        const ds = c.deathSaves ?? { successes: 0, failures: 0 }
        return t.success
          ? { ...c, deathSaves: { ...ds, successes: ds.successes + 1 } }
          : { ...c, deathSaves: { ...ds, failures: ds.failures + 1 } }
      })
      if (t.type === 'dead') setGameOver(true)
      if (t.type === 'condition') {
        const add = t.val.startsWith('+')
        const key = t.val.slice(1).toLowerCase()
        onCharacterUpdate(c => ({
          ...c,
          conditions: add
            ? [...new Set([...(c.conditions ?? []), key])]
            : (c.conditions ?? []).filter(k => k !== key),
        }))
      }
      if (t.type === 'roll') {
        const ability = SKILL_MAP[t.skill] || 'strength'
        const modifier = mod(charRef.current.stats[ability] || 10)
        const d20 = rollD20()
        const total = d20 + modifier
        buf.unshift({
          role: 'roll', id: 'roll-' + Date.now() + Math.random(),
          d20, modifier, total, dc: t.dc,
          skill: t.skill.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          ability: SA[ability] || ability.toUpperCase(),
          success: total >= t.dc,
        })
      }
    })
  }

  async function send() {
    if (!input.trim() || loading) return
    const lastMsg = msgs[msgs.length - 1]
    const rollCtx = lastMsg?.role === 'roll'
      ? `[Roll result: ${lastMsg.skill} DC${lastMsg.dc} — rolled ${lastMsg.total} (d20:${lastMsg.d20}${lastMsg.modifier >= 0 ? '+' : ''}${lastMsg.modifier}) — ${lastMsg.success ? 'SUCCESS' : 'FAILURE'}] `
      : ''
    const display = input.trim()
    const isOOC = display.startsWith('(')
    setMsgs(p => [...p, { role: 'user', content: display, id: Date.now() + 'u', ooc: isOOC }])
    setInput('')
    setLoading(true)
    sysRef.current = buildSystemPrompt(charRef.current)
    try {
      const newHist = [...histRef.current, { role: 'user', content: rollCtx + display }]
      const { text, tags } = await callDM(newHist)
      histRef.current = [...newHist, { role: 'assistant', content: text }]
      const buf = [{ role: 'assistant', content: text, id: Date.now() + 'a', ooc: isOOC }]
      applyTags(tags, buf)
      setMsgs(p => [...p, ...buf])
    } catch {
      setMsgs(p => [...p, { role: 'assistant', content: '(Connection failed.)', id: 'e' + Date.now() }])
    }
    setLoading(false)
    taRef.current?.focus()
  }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const isDying = character.hp === 0
  const hpPct = character.hp / (character.maxHp || 1)
  const hpState = isDying ? 'dying' : hpPct <= 0.25 ? 'danger' : hpPct <= 0.5 ? 'hurt' : 'healthy'
  const hpNumColor = hpState === 'dying' ? C.crimson : hpState === 'danger' ? C.crimson : hpState === 'hurt' ? '#a07050' : '#c8bba0'
  const hpBarColor = hpState === 'danger' ? '#3a1010' : hpState === 'hurt' ? '#6a1a1a' : C.crimson
  const deathSaves = character.deathSaves ?? { successes: 0, failures: 0 }
  const showDeathSaves = isDying && (character.level ?? 1) >= 3
  const bg = BACKGROUNDS[character.background]

  return (
    <div style={{ height: '100vh', background: C.bg, display: 'flex', flexDirection: 'column', ...TY.body, color: C.textPrimary, position: 'relative' }}>

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `.55rem ${SP.section}`, borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <button
          onClick={onExit}
          style={{
            background: 'none', border: 'none', color: C.textGhost,
            ...TY.micro, cursor: 'pointer', padding: 0, letterSpacing: '.08em',
          }}
        >✦  Barovia</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: SP.lg }}>
          {/* HP — concept D */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
              <span className={hpState === 'danger' || hpState === 'dying' ? 'hpdanger' : ''} style={{ ...TY.heading, fontSize: '.7rem', fontWeight: 600, color: hpNumColor, lineHeight: 1 }}>{character.hp}</span>
              <span style={{ ...TY.micro, color: C.gold }}>/</span>
              <span style={{ ...TY.heading, fontSize: '.7rem', fontWeight: 600, color: C.textMuted, lineHeight: 1 }}>{character.maxHp}</span>
              <span style={{ ...TY.micro, color: C.textMuted, letterSpacing: '.08em', marginLeft: '2px' }}>HP</span>
            </div>
            {showDeathSaves ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ width: '8px', height: '8px', border: `1px solid ${C.gold}`, background: i < deathSaves.successes ? C.gold : 'transparent' }} />
                  ))}
                </div>
                <div style={{ ...TY.micro, color: C.textGhost, lineHeight: 1 }}>·</div>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ width: '8px', height: '8px', border: `1px solid ${C.crimson}`, background: i < deathSaves.failures ? C.crimson : 'transparent' }} />
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ width: '240px', height: '4px', background: '#1a1018', position: 'relative' }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, height: '100%',
                  width: `${Math.max(0, hpPct * 100)}%`,
                  background: hpBarColor, transition: 'width .4s ease',
                }}>
                  {hpPct > 0 && <div style={{ position: 'absolute', right: '-1px', top: '-2px', bottom: '-2px', width: '2px', background: C.gold, opacity: 0.6 }} />}
                </div>
              </div>
            )}
          </div>
          {/* Condition */}
          {(character.conditions ?? []).length === 0
            ? <span style={{ ...TY.micro, color: C.textMuted, letterSpacing: '.06em', border: `1px solid ${C.border}`, padding: '1px 5px' }}>Fine</span>
            : (character.conditions ?? []).map(key => (
              <button
                key={key}
                onClick={() => onCharacterUpdate(c => ({ ...c, conditions: c.conditions.filter(k => k !== key) }))}
                title={`${CONDITIONS[key]?.desc} · Click to remove`}
                style={{
                  ...TY.micro, letterSpacing: '.06em',
                  background: 'rgba(160,40,40,.15)', border: `1px solid ${C.crimson}`,
                  color: C.crimson, padding: '1px 5px', cursor: 'pointer',
                }}
              >{CONDITIONS[key]?.label ?? key}</button>
            ))
          }
        </div>
        <button
          className="shbtn"
          onClick={() => setSheetOpen(o => !o)}
          style={{
            background: sheetOpen ? `rgba(160,40,40,.15)` : 'transparent',
            border: `1px solid ${sheetOpen ? C.crimson : C.border}`,
            color: sheetOpen ? C.gold : C.textDim,
            ...TY.micro, fontSize: '.52rem', letterSpacing: '.1em',
            padding: '.22rem .65rem', cursor: 'pointer', transition: 'all .2s',
          }}
        >Character Sheet</button>
      </div>

      <PlayMessages msgs={msgs} loading={loading} bottomRef={bottomRef} />
      <PlayInput input={input} setInput={setInput} loading={loading} send={send} onKey={onKey} taRef={taRef} />
      {sheetOpen && <>
        <div onClick={() => setSheetOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: Z.panel - 1 }} />
        <PlaySheet character={character} bg={bg} setSheetOpen={setSheetOpen} onCharacterUpdate={onCharacterUpdate} />
      </>}

      {gameOver && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,.9)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          zIndex: Z.panel + 10,
        }}>
          <div style={{ ...TY.heading, fontSize: '1.6rem', color: C.crimson, letterSpacing: '.08em' }}>You have died.</div>
          <div style={{ ...TY.action, color: C.textGhost, marginTop: SP.md, fontStyle: 'italic' }}>Barovia claims another soul.</div>
          <button
            onClick={onExit}
            style={{
              marginTop: SP.lg, ...TY.micro, letterSpacing: '.12em',
              border: `1px solid ${C.border}`, color: C.textMuted,
              background: 'none', padding: `${SP.sm} ${SP.lg}`, cursor: 'pointer',
            }}
          >Return to Barovia</button>
        </div>
      )}

    </div>
  )
}
