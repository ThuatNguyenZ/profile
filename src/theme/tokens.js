const v = (name) => `rgb(var(--c-${name}) / <alpha-value>)`

export const colors = {
  canvas: v('canvas'),
  s1: v('s1'),
  s2: v('s2'),
  line: v('line'),
  cy: v('cy'),
  vi: v('vi'),
  em: v('em'),
  am: v('am'),
  tx: v('tx'),
  mu: v('mu'),
  dim: v('dim'),
  code: v('code'),
  codetx: v('codetx'),
  'cy-soft': v('cy-soft'),
  'vi-soft': v('vi-soft'),
  'em-soft': v('em-soft'),
}

export const fonts = {
  display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['"JetBrains Mono"', 'ui-monospace', 'Consolas', 'monospace'],
}
