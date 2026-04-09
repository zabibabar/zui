import type { ColorSeed } from '@zui/core'
import { generatePalette, hexToOklch, oklchToHex, SHADE_KEYS } from '@zui/core'

const MAX_CHROMA = 0.4

/** Representative sRGB hex at the palette anchor shade (matches brand anchor L). */
export function colorSeedToHex(seed: ColorSeed): string {
  const p = generatePalette(seed)
  const shade = SHADE_KEYS[p.anchorShadeIndex]
  return oklchToHex(p[shade].oklch)
}

/** Map a picked #RRGGBB to a generator color seed (hue, chroma, anchor lightness). */
export function colorSeedFromHex(hex: string): ColorSeed {
  const { h, c, l } = hexToOklch(hex)
  return {
    hue: h,
    chroma: Math.min(MAX_CHROMA, Math.max(0, c)),
    anchorLightness: Math.min(1, Math.max(0, l)),
  }
}
