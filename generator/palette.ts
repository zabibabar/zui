import type { ColorSeed, LightnessCurve, OklchColor, Palette, Shade, ShadeEntry } from './types'
import defaultCurveJson from '../tokens/primitives/default-lightness-curve.json'
import { SHADE_KEYS } from './types'

const DEFAULT_LIGHTNESS_CURVE = defaultCurveJson as LightnessCurve

/**
 * Clamp chroma so the resulting oklch color fits within the sRGB gamut.
 *
 * Uses binary search: starts at the requested chroma and halves downward
 * until the resulting sRGB components are all in [0, 1].
 */
function clampChromaToGamut(l: number, c: number, h: number): number {
  let lo = 0
  let hi = c

  for (let i = 0; i < 32; i++) {
    const mid = (lo + hi) / 2
    if (isInSrgbGamut(l, mid, h)) {
      lo = mid
    } else {
      hi = mid
    }
  }

  return lo
}

/**
 * Check whether an OKLCH color is within the sRGB gamut by converting
 * OKLCH → OKLab → linear sRGB → sRGB and verifying components are in [0, 1].
 */
function isInSrgbGamut(l: number, c: number, h: number): boolean {
  const [r, g, b] = oklchToLinearSrgb(l, c, h)
  const threshold = 0.001
  return (
    r >= -threshold &&
    r <= 1 + threshold &&
    g >= -threshold &&
    g <= 1 + threshold &&
    b >= -threshold &&
    b <= 1 + threshold
  )
}

/**
 * Convert OKLCH to linear sRGB via OKLab.
 */
function oklchToLinearSrgb(l: number, c: number, h: number): [number, number, number] {
  const hRad = (h * Math.PI) / 180
  const a = c * Math.cos(hRad)
  const b = c * Math.sin(hRad)
  return oklabToLinearSrgb(l, a, b)
}

/**
 * Convert OKLab to linear sRGB.
 * Reference: https://bottosson.github.io/posts/oklab/
 */
function oklabToLinearSrgb(L: number, a: number, b: number): [number, number, number] {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b

  const l = l_ * l_ * l_
  const m = m_ * m_ * m_
  const s = s_ * s_ * s_

  const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  const bOut = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s

  return [r, g, bOut]
}

/**
 * Convert an OKLCH color to a CSS-compatible oklch() string.
 */
export function oklchToCss(color: OklchColor): string {
  const l = Math.round(color.l * 10000) / 10000
  const c = Math.round(color.c * 10000) / 10000
  const h = Math.round(color.h * 100) / 100
  return `oklch(${l} ${c} ${h})`
}

/**
 * Generate a full 11-shade palette from a color seed (hue + chroma).
 *
 * Lightness is distributed using the provided curve (or the built-in default).
 * Chroma is clamped per shade to stay within the sRGB gamut.
 */
export function generatePalette(
  seed: ColorSeed,
  lightnessCurve?: Partial<LightnessCurve>,
): Palette {
  const curve: LightnessCurve = lightnessCurve
    ? { ...DEFAULT_LIGHTNESS_CURVE, ...lightnessCurve }
    : DEFAULT_LIGHTNESS_CURVE

  const entries = SHADE_KEYS.map((shade): [Shade, ShadeEntry] => {
    const lightness = curve[shade]
    const clampedChroma = clampChromaToGamut(lightness, seed.chroma, seed.hue)

    const oklch: OklchColor = {
      l: lightness,
      c: clampedChroma,
      h: seed.hue,
    }

    return [
      shade,
      {
        shade,
        oklch,
        foreground: 'dark' as const,
      },
    ]
  })

  return Object.fromEntries(entries) as Palette
}

/**
 * Get the linear sRGB components from an OKLCH color.
 * Exported for use by the contrast calculator.
 */
export function oklchToSrgb(color: OklchColor): [number, number, number] {
  const [rLin, gLin, bLin] = oklchToLinearSrgb(color.l, color.c, color.h)

  const toSrgb = (c: number): number => {
    const clamped = Math.max(0, Math.min(1, c))
    return clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * clamped ** (1 / 2.4) - 0.055
  }

  return [toSrgb(rLin), toSrgb(gLin), toSrgb(bLin)]
}
