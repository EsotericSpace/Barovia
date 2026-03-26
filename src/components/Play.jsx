import { useState, useRef, useEffect } from 'react'
import { parseTags } from '../lib/parseTags.js'
import { buildSystemPrompt } from '../lib/systemPrompt.js'
import { BACKGROUNDS } from '../data/backgrounds.js'
import { SA, SKILL_MAP, rollWithAdv } from '../lib/dnd.js'
import { createApplyTags } from '../lib/applyTags.js'
import { createTestCommandHandler } from '../lib/testCommands.js'
import PlayMessages from './PlayMessages.jsx'
import PlayInput from './PlayInput.jsx'
import PlaySheet from './PlaySheet.jsx'
import { loadMsgs, writeMsgs } from '../lib/saves.js'

export default function Play({ character, slotIndex, onCharacterUpdate, onExit }) {
  const saved = loadMsgs(slotIndex ?? 0)
  const [msgs, setMsgs] = useState(saved?.display ?? [])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [victory, setVictory] = useState(false)
  const histRef   = useRef(saved?.history ?? [])
  const sysRef    = useRef('')
  const latestRef = useRef(null)
  const taRef     = useRef(null)
  const charRef   = useRef(character)
  const msgsRef   = useRef(msgs)
  const slotRef   = useRef(slotIndex)

  useEffect(() => { charRef.current = character }, [character])
  useEffect(() => { msgsRef.current = msgs }, [msgs])
  useEffect(() => { slotRef.current = slotIndex }, [slotIndex])
  useEffect(() => { latestRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, [msgs, loading])
  useEffect(() => {
    if (msgs.length > 0) writeMsgs(slotIndex, msgs, histRef.current)
  }, [msgs]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    function handleBeforeUnload() {
      if (msgsRef.current.length > 0) writeMsgs(slotRef.current, msgsRef.current, histRef.current)
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  const applyTags = createApplyTags({ charRef, onCharacterUpdate, setGameOver, setVictory })
  const handleTestCommand = createTestCommandHandler({ charRef, onCharacterUpdate, setMsgs, setLoading, applyTags })

  useEffect(() => {
    if (saved?.display?.length) return
    sysRef.current = buildSystemPrompt(character)
    const init = [{ role: 'user', content: 'Begin.' }]
    const ctrl = new AbortController()
    setLoading(true)
    callDM(init, ctrl.signal).then(({ text, tags }) => {
      histRef.current = [...init, { role: 'assistant', content: text }]
      const buf = [{ role: 'assistant', content: text, id: 'open' }]
      applyTags(tags, buf)
      setMsgs(buf)
      setLoading(false)
    }).catch(() => {})
    return () => ctrl.abort()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function callDM(history, signal) {
    const r = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ system: sysRef.current, messages: history }),
      signal,
    })
    const d = await r.json()
    if (d.error) throw new Error(d.error)
    return parseTags(d.content)
  }

  async function handleRollPrompt(msg) {
    if (loading) return
    const { kept, dropped } = rollWithAdv(msg.adv)
    const total = kept + msg.modifier
    const rollMsg = {
      role: 'roll', id: 'roll-' + Date.now(),
      d20: kept, dropped, adv: msg.adv,
      modifier: msg.modifier, total, dc: null, skill: msg.skill,
      ability: msg.ability, success: null,
      proficient: msg.proficient, expert: msg.expert,
    }
    setMsgs(p => p.map(m => m.id === msg.id ? rollMsg : m))
    setLoading(true)
    sysRef.current = buildSystemPrompt(charRef.current)
    const advLabel = msg.adv === 'adv' ? ' (advantage)' : msg.adv === 'dis' ? ' (disadvantage)' : ''
    const diceStr = dropped != null ? `d20(${kept}, dropped:${dropped})` : `d20(${kept})`
    const resultText = `[Player roll: ${msg.skill} — ${diceStr}${msg.modifier >= 0 ? '+' : ''}${msg.modifier} = ${total}${advLabel}]`
    const newHist = [...histRef.current, { role: 'user', content: resultText }]
    try {
      const { text, tags } = await callDM(newHist)
      histRef.current = [...newHist, { role: 'assistant', content: text }]
      const buf = [{ role: 'assistant', content: text, id: Date.now() + 'a' }]
      applyTags(tags, buf)
      setMsgs(p => [...p, ...buf])
    } catch {
      setMsgs(p => [...p, { role: 'assistant', content: '(Connection failed.)', id: 'e' + Date.now() }])
    }
    setLoading(false)
  }

  async function send() {
    if (!input.trim() || loading) return
    if (input.trim().startsWith('/test')) {
      const cmd = input.trim()
      setInput('')
      await handleTestCommand(cmd)
      return
    }
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

  const bg = BACKGROUNDS[character.background]

  return (
    <div className="play-page">

      <button className="topbar-exit" onClick={sheetOpen && window.matchMedia('(max-width: 640px)').matches ? () => setSheetOpen(false) : onExit}>
        <span className="material-symbols-outlined">{sheetOpen && window.matchMedia('(max-width: 640px)').matches ? 'close' : 'logout'}</span>
      </button>

      <div className="play-header">
        <span className="play-header-title">Barovia</span>
      </div>

      <PlayMessages msgs={msgs} loading={loading} latestRef={latestRef} onRollPrompt={handleRollPrompt} />
      <PlayInput input={input} setInput={setInput} loading={loading} send={send} onKey={onKey} taRef={taRef} sheetOpen={sheetOpen} onToggleSheet={() => setSheetOpen(o => !o)} />

      {sheetOpen && <>
        <div className="sheet-backdrop" onClick={() => setSheetOpen(false)} />
        <PlaySheet character={character} bg={bg} setSheetOpen={setSheetOpen} onCharacterUpdate={onCharacterUpdate} />
      </>}

      {gameOver && (
        <div className="game-over-overlay">
          <div className="game-over-title">You have died.</div>
          <div className="game-over-body">Barovia claims another soul.</div>
          <button className="game-over-return ebtn" onClick={onExit}>Return to Barovia</button>
        </div>
      )}

      {victory && (
        <div className="game-over-overlay victory">
          <div className="game-over-label">Campaign Complete</div>
          <div className="game-over-title">The Mists Part.</div>
          <div className="game-over-body">
            Sunlight touches Barovia for the first time in four centuries. The Barovians who carry souls gather in the streets and weep without knowing why — only that something ancient and terrible has finally let go.
          </div>
          <div className="game-over-body">
            Count Strahd von Zarovich is gone. The Dark Powers are patient. The cycle will begin again, somewhere, eventually. That is their nature. But not here, and not today. For this moment, Barovia breathes.
          </div>
          <button className="game-over-return ebtn" onClick={onExit}>Begin a New Journey</button>
        </div>
      )}

    </div>
  )
}
