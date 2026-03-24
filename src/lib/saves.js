const ACTIVE_KEY = 'barovia_active_slot'

export const saveKey = slot => `barovia_save_${slot}`
export const msgsKey = slot => `barovia_msgs_${slot}`

export function getActiveSlot() {
  try {
    const v = parseInt(localStorage.getItem(ACTIVE_KEY))
    return isNaN(v) ? 0 : v
  } catch { return 0 }
}

export function persistActiveSlot(slot) {
  try { localStorage.setItem(ACTIVE_KEY, String(slot)) } catch {}
}

export function loadSlot(slot) {
  try {
    const raw = localStorage.getItem(saveKey(slot))
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function writeSlot(slot, phase, character) {
  try { localStorage.setItem(saveKey(slot), JSON.stringify({ phase, character, savedAt: Date.now() })) } catch {}
}

export function clearSlot(slot) {
  try {
    localStorage.removeItem(saveKey(slot))
    localStorage.removeItem(msgsKey(slot))
  } catch {}
}

export function loadAllSlots() {
  return [0, 1, 2].map(i => loadSlot(i))
}

export function loadMsgs(slot) {
  try {
    const raw = localStorage.getItem(msgsKey(slot))
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function writeMsgs(slot, display, history) {
  try { localStorage.setItem(msgsKey(slot), JSON.stringify({ display, history })) } catch {}
}

// Migrate from pre-slot single-save format
export function migrate() {
  if (localStorage.getItem(saveKey(0))) return
  try {
    const oldSave = localStorage.getItem('barovia_save')
    const oldMsgs = localStorage.getItem('barovia_msgs')
    if (oldSave) { localStorage.setItem(saveKey(0), oldSave); localStorage.removeItem('barovia_save') }
    if (oldMsgs) { localStorage.setItem(msgsKey(0), oldMsgs); localStorage.removeItem('barovia_msgs') }
  } catch {}
}
