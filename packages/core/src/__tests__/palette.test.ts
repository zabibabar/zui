import type { LightnessCurve } from '../types'
import { describe, expect, it } from 'vitest'
import {
  anchorShadeIndexFromAnchorLightness,
  generatePalette,
  hexToOklch,
  normalizeHex6,
  oklchToCss,
  oklchToHex,
  oklchToSrgb,
} from '../palette'
import { SHADE_KEYS } from '../types'

const DEFAULT_ANCHOR_L = 0.55

describe('generatePalette', () => {
  const blueSeed = { hue: 230, chroma: 0.15, anchorLightness: DEFAULT_ANCHOR_L }

  it('generates all 11 shades plus anchor metadata', () => {
    const palette = generatePalette(blueSeed)
    expect(SHADE_KEYS.every((s) => palette[s])).toBe(true)
    expect(palette.anchorShadeIndex).toBeGreaterThanOrEqual(0)
    expect(palette.anchorShadeIndex).toBeLessThan(SHADE_KEYS.length)
  })

  it('produces shades with decreasing lightness from 50 to 950', () => {
    const palette = generatePalette(blueSeed)
    const lightnesses = SHADE_KEYS.map((s) => palette[s].oklch.l)

    for (let i = 1; i < lightnesses.length; i++) {
      expect(lightnesses[i]).toBeLessThan(lightnesses[i - 1])
    }
  })

  it('preserves the hue from the seed', () => {
    const palette = generatePalette(blueSeed)
    for (const shade of SHADE_KEYS) {
      expect(palette[shade].oklch.h).toBe(230)
    }
  })

  it('places anchorLightness on the anchor shade after shift', () => {
    const palette = generatePalette({ hue: 230, chroma: 0.15, anchorLightness: 0.72 })
    const anchorShade = SHADE_KEYS[palette.anchorShadeIndex]
    expect(palette[anchorShade].oklch.l).toBeCloseTo(0.72, 5)
  })

  it('clamps chroma to stay within sRGB gamut', () => {
    const highChromaSeed = { hue: 264, chroma: 0.35, anchorLightness: DEFAULT_ANCHOR_L }
    const palette = generatePalette(highChromaSeed)

    for (const shade of SHADE_KEYS) {
      const { oklch } = palette[shade]
      expect(oklch.c).toBeLessThanOrEqual(0.35)

      const [r, g, b] = oklchToSrgb(oklch)
      expect(r).toBeGreaterThanOrEqual(-0.01)
      expect(r).toBeLessThanOrEqual(1.01)
      expect(g).toBeGreaterThanOrEqual(-0.01)
      expect(g).toBeLessThanOrEqual(1.01)
      expect(b).toBeGreaterThanOrEqual(-0.01)
      expect(b).toBeLessThanOrEqual(1.01)
    }
  })

  it('all generated colors fit within sRGB gamut', () => {
    const seeds = [
      { hue: 0, chroma: 0.2, anchorLightness: DEFAULT_ANCHOR_L },
      { hue: 90, chroma: 0.2, anchorLightness: DEFAULT_ANCHOR_L },
      { hue: 180, chroma: 0.2, anchorLightness: DEFAULT_ANCHOR_L },
      { hue: 270, chroma: 0.2, anchorLightness: DEFAULT_ANCHOR_L },
      { hue: 25, chroma: 0.18, anchorLightness: DEFAULT_ANCHOR_L },
      { hue: 145, chroma: 0.14, anchorLightness: DEFAULT_ANCHOR_L },
    ]

    for (const seed of seeds) {
      const palette = generatePalette(seed)
      for (const shade of SHADE_KEYS) {
        const [r, g, b] = oklchToSrgb(palette[shade].oklch)
        expect(r).toBeGreaterThanOrEqual(-0.01)
        expect(r).toBeLessThanOrEqual(1.01)
        expect(g).toBeGreaterThanOrEqual(-0.01)
        expect(g).toBeLessThanOrEqual(1.01)
        expect(b).toBeGreaterThanOrEqual(-0.01)
        expect(b).toBeLessThanOrEqual(1.01)
      }
    }
  })

  it('accepts a custom lightness curve override merged before anchor shift', () => {
    const customCurve: Partial<LightnessCurve> = { '500': 0.6 }
    const palette = generatePalette(blueSeed, customCurve)

    const anchorShade = SHADE_KEYS[palette.anchorShadeIndex]
    expect(palette[anchorShade].oklch.l).toBeCloseTo(DEFAULT_ANCHOR_L, 5)
    expect(palette['50'].oklch.l).toBeLessThanOrEqual(0.99)
  })

  it('handles zero chroma (pure gray)', () => {
    const graySeed = { hue: 0, chroma: 0, anchorLightness: DEFAULT_ANCHOR_L }
    const palette = generatePalette(graySeed)

    for (const shade of SHADE_KEYS) {
      expect(palette[shade].oklch.c).toBe(0)
    }
  })

  it('handles very low chroma (near-gray)', () => {
    const nearGraySeed = { hue: 215, chroma: 0.01, anchorLightness: DEFAULT_ANCHOR_L }
    const palette = generatePalette(nearGraySeed)

    for (const shade of SHADE_KEYS) {
      expect(palette[shade].oklch.c).toBeLessThanOrEqual(0.01)
      expect(palette[shade].oklch.c).toBeGreaterThanOrEqual(0)
    }
  })
})

describe('anchorShadeIndexFromAnchorLightness', () => {
  it('picks the curve step closest to the target L', () => {
    expect(anchorShadeIndexFromAnchorLightness(0.55)).toBe(5)
    expect(anchorShadeIndexFromAnchorLightness(0.97)).toBe(0)
  })
})

describe('oklchToCss', () => {
  it('formats an oklch color as a CSS string', () => {
    const css = oklchToCss({ l: 0.55, c: 0.15, h: 230 })
    expect(css).toBe('oklch(0.55 0.15 230)')
  })

  it('rounds values to avoid excessive precision', () => {
    const css = oklchToCss({ l: 0.554321, c: 0.123456, h: 229.999 })
    expect(css).toBe('oklch(0.5543 0.1235 230)')
  })
})

describe('hex ↔ oklch (sRGB)', () => {
  it('normalizes shorthand and missing hash', () => {
    expect(normalizeHex6('abc')).toBe('#aabbcc')
    expect(normalizeHex6('112233')).toBe('#112233')
    expect(normalizeHex6('#AABBCC')).toBe('#aabbcc')
  })

  it('round-trips an sRGB hex through oklch and back', () => {
    const hex = '#3366cc'
    const o = hexToOklch(hex)
    const hex2 = oklchToHex(o)
    const o2 = hexToOklch(hex2)
    expect(o2.l).toBeCloseTo(o.l, 2)
    expect(o2.c).toBeCloseTo(o.c, 2)
    expect(o2.h).toBeCloseTo(o.h, 0)
    expect(hex2.toLowerCase()).toBe(hex)
  })
})
