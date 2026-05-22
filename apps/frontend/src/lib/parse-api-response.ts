/** Parse JSON from an API response; surface plain-text/proxy errors clearly. */
export async function parseApiJson<T extends Record<string, unknown>>(
  res: Response
): Promise<T> {
  const text = await res.text()
  if (!text) {
    throw new Error(res.ok ? 'Empty response from server' : `Request failed (${res.status})`)
  }
  try {
    return JSON.parse(text) as T
  } catch {
    const hint = text.length > 160 ? `${text.slice(0, 160)}…` : text
    throw new Error(
      res.ok
        ? 'Server returned a non-JSON response'
        : hint || `Request failed (${res.status})`
    )
  }
}

export function apiErrorMessage(data: Record<string, unknown>, fallback: string): string {
  if (typeof data.error === 'string') return data.error
  if (typeof data.message === 'string') return data.message
  return fallback
}
