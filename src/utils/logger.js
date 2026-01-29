const timers = new Set()

function timestamp() {
  return new Date().toISOString()
}

export function log(level, message, extra = {}) {
  console.log(`[${timestamp()}] [${level.toUpperCase()}] ${message}`, extra)
}

export function logTime(level, message, extra = {}) {
  const label = `[${level.toUpperCase()}] ${message}`
  if (timers.has(label)) return
  timers.add(label)
  console.time(label, extra)
}

export function logTimeEnd(level, message, extra = {}) {
  const label = `[${level.toUpperCase()}] ${message}`
  if (!timers.has(label)) return
  console.timeEnd(label)
  timers.delete(label)
}

// Usage
// log('info', `Fetching data for agent ${agentId}`, { body: requestBody })
// log('error', 'Request failed', { agentId, error: err.message })
