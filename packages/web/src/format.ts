import type { OklchColor } from '@zui/core'

/**
 * Convert an OKLCH color to a CSS Color Level 4 `oklch()` string.
 */
export function oklchToCss(color: OklchColor): string {
  const l = Math.round(color.l * 10000) / 10000
  const c = Math.round(color.c * 10000) / 10000
  const h = Math.round(color.h * 100) / 100
  return `oklch(${l} ${c} ${h})`
}

const OKLCH_RE = /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/

/**
 * Parse a CSS `oklch(L C H)` string into an `OklchColor` object.
 */
export function parseOklchString(css: string): OklchColor {
  const match = css.match(OKLCH_RE)
  if (!match) {
    throw new Error(`Invalid oklch string: "${css}"`)
  }
  return {
    l: Number.parseFloat(match[1]),
    c: Number.parseFloat(match[2]),
    h: Number.parseFloat(match[3]),
  }
}
