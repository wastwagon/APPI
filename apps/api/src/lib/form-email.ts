export function formatFormEmailHtml(formType: string, payload: Record<string, unknown>): string {
  const rows = Object.entries(payload)
    .map(([key, val]) => {
      const text = typeof val === 'string' ? val : JSON.stringify(val)
      return `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;">${escapeHtml(key)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(text)}</td></tr>`
    })
    .join('')

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;color:#1a1a1a;">
<h2 style="color:#1e3a5f;">New APPI form: ${escapeHtml(formType)}</h2>
<table style="border-collapse:collapse;width:100%;max-width:560px;">${rows}</table>
<p style="font-size:12px;color:#666;margin-top:24px;">Sent from the APPI website.</p>
</body></html>`
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
