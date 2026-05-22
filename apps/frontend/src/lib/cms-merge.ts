export function deepMergeMessages(
  target: Record<string, unknown>,
  source: Record<string, unknown>
): Record<string, unknown> {
  const out = { ...target }
  for (const [key, value] of Object.entries(source)) {
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      typeof out[key] === 'object' &&
      out[key] !== null &&
      !Array.isArray(out[key])
    ) {
      out[key] = deepMergeMessages(
        out[key] as Record<string, unknown>,
        value as Record<string, unknown>
      )
    } else {
      out[key] = value
    }
  }
  return out
}

export function applyCmsBundle(
  messages: Record<string, unknown>,
  bundle: Record<string, Record<string, unknown>>
): Record<string, unknown> {
  const out = { ...messages }
  for (const [slug, fields] of Object.entries(bundle)) {
    const parts = slug.split('.')
    let cursor: Record<string, unknown> = out
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i]
      if (!cursor[part] || typeof cursor[part] !== 'object' || Array.isArray(cursor[part])) {
        cursor[part] = {}
      }
      cursor = cursor[part] as Record<string, unknown>
    }
    const leaf = parts[parts.length - 1]
    const existing =
      cursor[leaf] && typeof cursor[leaf] === 'object' && !Array.isArray(cursor[leaf])
        ? (cursor[leaf] as Record<string, unknown>)
        : {}
    cursor[leaf] = deepMergeMessages(existing, fields)
  }
  return out
}
