import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export default function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={`mailto:${email}`}
        className="border border-line px-3 py-2.5 font-mono text-[12.5px] text-tx sweep [--sweep-bg:rgb(var(--c-cy)/0.08)] hover:border-cy"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-live="polite"
        className="inline-flex items-center gap-2 border border-cy bg-cy px-3 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-canvas sweep [--sweep-bg:rgb(var(--c-canvas))] hover:text-cy hover:shadow-glow"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
