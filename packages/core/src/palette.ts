import type { ColorSeed, LightnessCurve, OklchColor, Palette, Shade, ShadeEntry } from './types'
import defaultCurveJson from './tokens/primitives/default-lightness-curve.json'
import { SHADE_KEYS } from './types'

const DEFAULT_LIGHTNESS_CURVE = defaultCurveJson as LightnessCurve

const L_CLAMP_MIN = 0.03
const L_CLAMP_MAX = 0.99

/**
 * Index into {@link SHADE_KEYS} whose default curve lightness is closest to `anchorLightness`.
 */
export function anchorShadeIndexFromAnchorLightness(
  anchorLightness: number,
  baseCurve: LightnessCurve = DEFAULT_LIGHTNESS_CURVE,
): number {
  let best = 0
  let bestDist = Number.POSITIVE_INFINITY
  for (let i = 0; i < SHADE_KEYS.length; i++) {
    const shade = SHADE_KEYS[i]
    const d = Math.abs(baseCurve[shade] - anchorLightness)
    if (d < bestDist) {
      bestDist = d
      best = i
    }
  }
  return best
}

function buildAnchoredLightnessCurve(
  seed: ColorSeed,
  partialOverride?: Partial<LightnessCurve>,
): { curve: LightnessCurve; anchorShadeIndex: number } {
  const base: LightnessCurve = { ...DEFAULT_LIGHTNESS_CURVE, ...partialOverride }
  const anchorShadeIndex = anchorShadeIndexFromAnchorLightness(seed.anchorLightness, base)
  const anchorShade = SHADE_KEYS[anchorShadeIndex]
  const delta = seed.anchorLightness - base[anchorShade]

  const curve = {} as LightnessCurve
  for (const shade of SHADE_KEYS) {
    const next = base[shade] + delta
    curve[shade] = Math.min(L_CLAMP_MAX, Math.max(L_CLAMP_MIN, next))
  }

  return { curve, anchorShadeIndex }
}

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
 * Generate a full 11-shade palette from a color seed.
 *
 * The default lightness curve is shifted so the anchor shade (closest default L to
 * `seed.anchorLightness`) matches `seed.anchorLightness`, then clamped to [0.03, 0.99].
 * Optional `lightnessCurve` partial merges into the default **before** the shift.
 * Chroma is clamped per shade to stay within the sRGB gamut.
 */
export function generatePalette(
  seed: ColorSeed,
  lightnessCurve?: Partial<LightnessCurve>,
): Palette {
  const { curve, anchorShadeIndex } = buildAnchoredLightnessCurve(seed, lightnessCurve)

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

  return {
    ...(Object.fromEntries(entries) as { readonly [K in Shade]: ShadeEntry }),
    anchorShadeIndex,
  }
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

/**
 * sRGB channel in [0, 1] (gamma-encoded) → linear light [0, 1].
 */
export function srgbChannelToLinear(s: number): number {
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

/**
 * Linear sRGB [0, 1] → OKLab (L, a, b). Based on Björn Ottosson’s OKLab derivation.
 */
export function linearSrgbToOklab(r: number, g: number, b: number): [number, number, number] {
  const l = 0.412_221_470_8 * r + 0.536_332_536_3 * g + 0.051_445_992_9 * b
  const m = 0.211_903_498_2 * r + 0.680_699_545_1 * g + 0.107_396_956_6 * b
  const s = 0.088_302_461_9 * r + 0.281_718_837_6 * g + 0.629_978_700_5 * b
  const l_ = Math.cbrt(l)
  const m_ = Math.cbrt(m)
  const s_ = Math.cbrt(s)
  const L = 0.210_454_255_3 * l_ + 0.793_617_785 * m_ - 0.004_072_046_8 * s_
  const a = 1.977_998_495_1 * l_ - 2.428_592_205 * m_ + 0.450_593_709_9 * s_
  const b2 = 0.025_904_037_1 * l_ + 0.782_771_766_2 * m_ - 0.808_675_766 * s_
  return [L, a, b2]
}

/** OKLab → OKLCH (hue in degrees 0–360). */
export function oklabToOklch(L: number, a: number, b: number): OklchColor {
  const c = Math.sqrt(a * a + b * b)
  let h = (Math.atan2(b, a) * 180) / Math.PI
  if (h < 0) h += 360
  if (c < 1e-10) h = 0
  return { l: L, c, h }
}

/** Linear sRGB [0, 1] → OKLCH. */
export function linearSrgbToOklch(r: number, g: number, b: number): OklchColor {
  const [L, a, b2] = linearSrgbToOklab(r, g, b)
  return oklabToOklch(L, a, b2)
}

/** Gamma sRGB [0, 1] per channel → OKLCH. */
export function srgbToOklch(r: number, g: number, b: number): OklchColor {
  return linearSrgbToOklch(srgbChannelToLinear(r), srgbChannelToLinear(g), srgbChannelToLinear(b))
}

const HEX6_RE = /^#[\da-f]{6}$/i
const HEX3_SHORT_RE = /^#[\da-f]{3}$/i

/** Normalize user hex to `#rrggbb` or throw. */
export function normalizeHex6(hex: string): string {
  let h = hex.trim()
  if (!h.startsWith('#')) h = `#${h}`
  if (h.length === 4 && HEX3_SHORT_RE.test(h)) {
    h = `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}`
  }
  if (!HEX6_RE.test(h)) throw new Error(`Expected #RRGGBB hex, got "${hex}"`)
  return h.toLowerCase()
}

/** Parse `#RRGGBB` → OKLCH (sRGB space). */
export function hexToOklch(hex: string): OklchColor {
  const h = normalizeHex6(hex)
  const r = Number.parseInt(h.slice(1, 3), 16) / 255
  const g = Number.parseInt(h.slice(3, 5), 16) / 255
  const b = Number.parseInt(h.slice(5, 7), 16) / 255
  return srgbToOklch(r, g, b)
}

/** OKLCH → `#rrggbb` (clips sRGB to gamut). */
export function oklchToHex(color: OklchColor): string {
  const [r, g, b] = oklchToSrgb(color)
  const byte = (x: number) =>
    Math.max(0, Math.min(255, Math.round(Math.max(0, Math.min(1, x)) * 255)))
  const R = byte(r).toString(16).padStart(2, '0')
  const G = byte(g).toString(16).padStart(2, '0')
  const B = byte(b).toString(16).padStart(2, '0')
  return `#${R}${G}${B}`
}
