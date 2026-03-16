export default function PlayInput({ input, setInput, loading, send, onKey, taRef }) {
  const isOOC = input.startsWith('(')
  const ready = input.trim() && !loading
  return (
    <div className="play-input-wrap">
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
        className={`play-textarea${isOOC ? ' ooc' : ''}`}
      />
      <button
        className={`play-send-btn ebtn${ready ? ' ready' : ''}`}
        onClick={send}
        disabled={!ready}
      >{loading ? '···' : 'Send'}</button>
    </div>
  )
}
