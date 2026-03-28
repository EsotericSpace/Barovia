import { useState, useRef, useEffect } from 'react'
import { parseTags } from '../lib/parseTags.js'
import { buildSystemPrompt, buildBackstoryPrompt } from '../lib/systemPrompt.js'
import { BACKGROUNDS } from '../data/backgrounds.js'
import { SA, SKILL_MAP, rollWithAdv } from '../lib/dnd.js'
import { createApplyTags } from '../lib/applyTags.js'
import { createTestCommandHandler } from '../lib/testCommands.js'
import PlayMessages from './PlayMessages.jsx'
import PlayInput from './PlayInput.jsx'
import PlaySheet from './PlaySheet.jsx'
import { loadMsgs, writeMsgs } from '../lib/saves.js'

export default function Play({ character, slotIndex, onCharacterUpdate, onExit, settingsSlot }) {
  const saved = loadMsgs(slotIndex ?? 0)
  const [msgs, setMsgs] = useState(saved?.display ?? [])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [victory, setVictory] = useState(false)
  const [backstoryStatus, setBackstoryStatus] = useState(character.backstory ? 'done' : 'loading')
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

  function fetchBackstory(signal) {
    setBackstoryStatus('loading')
    return fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ system: buildBackstoryPrompt(charRef.current), messages: [{ role: 'user', content: 'Write the character concept.' }] }),
      signal,
    }).then(r => r.json()).then(d => {
      if (d.content) {
        onCharacterUpdate(c => ({ ...c, backstory: d.content }))
        setBackstoryStatus('done')
      } else {
        setBackstoryStatus('error')
      }
    }).catch(e => {
      if (e.name !== 'AbortError') setBackstoryStatus('error')
    })
  }

  useEffect(() => {
    const ctrl = new AbortController()

    if (!character.backstory) fetchBackstory(ctrl.signal)

    if (!saved?.display?.length) {
      sysRef.current = buildSystemPrompt(character)
      const init = [{ role: 'user', content: 'Begin.' }]
      setLoading(true)
      callDM(init, ctrl.signal).then(async ({ text, tags }) => {
        await finishResponse(text, tags, init)
        setLoading(false)
      }).catch(() => {})
    }

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

  // After every DM response: apply tags, flush display, then auto-reply for attacks/damage/surges.
  async function finishResponse(text, tags, hist, displayOpts = {}) {
    histRef.current = [...hist, { role: 'assistant', content: text }]
    const buf = [{ role: 'assistant', content: text, id: Date.now() + 'a', ...displayOpts }]
    applyTags(tags, buf)
    setMsgs(p => [...p, ...buf])

    const ctxParts = []

    buf.filter(m => m.role === 'attack').forEach(m => {
      const advNote = m.adv === 'dis' ? ' (disadvantage from condition)' : ''
      ctxParts.push(`[Attack roll: d20(${m.d20})${m.bonus >= 0 ? '+' : ''}${m.bonus} = ${m.total} vs AC ${m.ac}${advNote} — ${m.hit ? 'HIT' : 'MISS'}]`)
    })
    buf.filter(m => m.role === 'damage').forEach(m => {
      ctxParts.push(`[Damage dealt: ${m.total}${m.rollStr} from ${m.expr} — HP now ${m.newHp}/${m.maxHp}]`)
    })
    buf.filter(m => m.role === 'surge').forEach(m => {
      ctxParts.push(`[Wild Magic Surge — rolled ${m.roll}: ${m.text} Tides of Chaos restored.]`)
    })

    if (ctxParts.length === 0) return
    const replyHist = [...histRef.current, { role: 'user', content: ctxParts.join(' ') }]
    sysRef.current = buildSystemPrompt(charRef.current)
    const { text: t2, tags: tags2 } = await callDM(replyHist)
    await finishResponse(t2, tags2, replyHist, displayOpts)
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
      await finishResponse(text, tags, newHist)
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
      await finishResponse(text, tags, newHist, { ooc: isOOC })
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

  const isMobile = () => window.matchMedia('(max-width: 640px)').matches

  return (
    <div className={`play-page${sheetOpen ? ' sheet-open' : ''}`}>

      <div className="play-main">
        <div className="play-header">
          <div className="play-header-left">
            <button className="topbar-exit" onClick={sheetOpen && isMobile() ? () => setSheetOpen(false) : onExit}>
              <span className="material-symbols-outlined">{sheetOpen && isMobile() ? 'close' : 'logout'}</span>
            </button>
          </div>
          <span className="play-header-title">Barovia</span>
          <div className="play-header-right">
            {settingsSlot}
            <button className={`play-sheet-toggle shbtn${sheetOpen ? ' open' : ''}`} onClick={() => setSheetOpen(o => !o)}>
              <span className="material-symbols-outlined">menu_book</span>
            </button>
          </div>
        </div>

        <PlayMessages msgs={msgs} loading={loading} latestRef={latestRef} onRollPrompt={handleRollPrompt} />
        <PlayInput input={input} setInput={setInput} loading={loading} send={send} onKey={onKey} taRef={taRef} sheetOpen={sheetOpen} onToggleSheet={() => setSheetOpen(o => !o)} />
      </div>

      {sheetOpen && isMobile() && <div className="sheet-backdrop" onClick={() => setSheetOpen(false)} />}
      <PlaySheet character={character} bg={bg} setSheetOpen={setSheetOpen} onCharacterUpdate={onCharacterUpdate} backstoryStatus={backstoryStatus} onRetryBackstory={() => fetchBackstory()} />

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
