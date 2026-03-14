import { C, TY, SP } from '../lib/tokens.js'

export default function PlayInput({ input, setInput, loading, send, onKey, taRef }) {
  const isOOC = input.startsWith('(')
  return (
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: SP.sm, padding: `.8rem ${SP.section}`, flexShrink: 0, borderTop: `1px solid ${C.border}` }}>
<textarea
          ref={taRef}
          value={input}
          onChange={e => {
            setInput(e.target.value)
            e.target.style.height = 'auto'
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
          }}
          onKeyDown={onKey}
          placeholder="What do you do..."
          disabled={loading}
          autoFocus
          rows={1}
          style={{
            flex: 1, background: 'transparent', border: 'none',
            color: isOOC ? C.ooc : C.textPrimary, ...TY.action, fontSize: '.88rem', fontStyle: 'normal',
            resize: 'none', outline: 'none', padding: '.25rem 0',
            minHeight: '1.9rem', overflow: 'hidden',
          }}
        />
        <button
          className="ebtn"
          onClick={send}
          disabled={loading || !input.trim()}
          style={{
            background: 'rgba(6,6,8,.25)', border: `1px solid ${C.crimson}`,
            color: input.trim() && !loading ? C.gold : C.textDim,
            ...TY.label, fontSize: '.52rem', letterSpacing: '.14em',
            padding: '.38rem .8rem', cursor: input.trim() && !loading ? 'pointer' : 'default',
            transition: 'all .25s', alignSelf: 'flex-end', marginBottom: '.2rem',
          }}
        >{loading ? '···' : 'Send'}</button>
      </div>
  )
}
