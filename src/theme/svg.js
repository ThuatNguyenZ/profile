// CSS colour strings for SVG `style` props; they follow the active theme.
export const C = {
  canvas: 'rgb(var(--c-canvas))',
  s1: 'rgb(var(--c-s1))',
  s2: 'rgb(var(--c-s2))',
  line: 'rgb(var(--c-line))',
  cy: 'rgb(var(--c-cy))',
  vi: 'rgb(var(--c-vi))',
  em: 'rgb(var(--c-em))',
  tx: 'rgb(var(--c-tx))',
  mu: 'rgb(var(--c-mu))',
  dim: 'rgb(var(--c-dim))',
  viSoft: 'rgb(var(--c-vi-soft))',
}
export const alpha = (name, a) => `rgb(var(--c-${name}) / ${a})`
