import type { InkColors, OklchColor, Palette, Shade, ShadeEntry } from './types'
import { oklchToSrgb } from './palette'
import { SHADE_KEYS } from './types'

/**
 * Compute the relative luminance of an sRGB color.
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
function relativeLuminance(r: number, g: number, b: number): number {
  const linearize = (c: number): number => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)
}

/**
 * Compute the WCAG 2.1 contrast ratio between two colors.
 * Returns a value between 1 and 21.
 */
export function contrastRatio(color1: OklchColor, color2: OklchColor): number {
  const [r1, g1, b1] = oklchToSrgb(color1)
  const [r2, g2, b2] = oklchToSrgb(color2)

  const lum1 = relativeLuminance(r1, g1, b1)
  const lum2 = relativeLuminance(r2, g2, b2)

  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)

  return (lighter + 0.05) / (darker + 0.05)
}

const OKLCH_RE = /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/

/**
 * Parse an OKLCH CSS string into an OklchColor object.
 * Accepts format: "oklch(L C H)"
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

/**
 * Determine whether dark or light ink should be used on top of a given background color.
 * Chooses whichever ink color provides better contrast, with a preference for AA (4.5:1).
 */
export function pickForeground(background: OklchColor, ink: InkColors): 'dark' | 'light' {
  const darkContrast = contrastRatio(background, ink.dark)
  const lightContrast = contrastRatio(background, ink.light)

  return darkContrast >= lightContrast ? 'dark' : 'light'
}

/**
 * Assign foreground (dark/light) to every shade in a palette based on contrast against ink colors.
 * Returns a new palette with foreground assignments.
 */
export function assignForegrounds(palette: Palette, ink: InkColors): Palette {
  const entries = SHADE_KEYS.map((shade): [string, ShadeEntry] => {
    const entry = palette[shade]
    const foreground = pickForeground(entry.oklch, ink)
    return [shade, { ...entry, foreground }]
  })

  return {
    ...(Object.fromEntries(entries) as { readonly [K in Shade]: ShadeEntry }),
    anchorShadeIndex: palette.anchorShadeIndex,
  }
}
