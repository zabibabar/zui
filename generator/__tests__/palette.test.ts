import type { LightnessCurve } from '../types'
import { describe, expect, it } from 'vitest'
import { generatePalette, oklchToCss, oklchToSrgb } from '../palette'
import { SHADE_KEYS } from '../types'

describe('generatePalette', () => {
  const blueSeed = { hue: 230, chroma: 0.15 }

  it('generates all 11 shades', () => {
    const palette = generatePalette(blueSeed)
    expect(Object.keys(palette)).toHaveLength(11)
    for (const shade of SHADE_KEYS) {
      expect(palette[shade]).toBeDefined()
      expect(palette[shade].shade).toBe(shade)
    }
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

  it('clamps chroma to stay within sRGB gamut', () => {
    const highChromaSeed = { hue: 264, chroma: 0.35 }
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
      { hue: 0, chroma: 0.2 },
      { hue: 90, chroma: 0.2 },
      { hue: 180, chroma: 0.2 },
      { hue: 270, chroma: 0.2 },
      { hue: 25, chroma: 0.18 },
      { hue: 145, chroma: 0.14 },
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

  it('accepts a custom lightness curve override', () => {
    const customCurve: Partial<LightnessCurve> = { '500': 0.6 }
    const palette = generatePalette(blueSeed, customCurve)

    expect(palette['500'].oklch.l).toBe(0.6)
    expect(palette['50'].oklch.l).toBe(0.97)
  })

  it('handles zero chroma (pure gray)', () => {
    const graySeed = { hue: 0, chroma: 0 }
    const palette = generatePalette(graySeed)

    for (const shade of SHADE_KEYS) {
      expect(palette[shade].oklch.c).toBe(0)
    }
  })

  it('handles very low chroma (near-gray)', () => {
    const nearGraySeed = { hue: 215, chroma: 0.01 }
    const palette = generatePalette(nearGraySeed)

    for (const shade of SHADE_KEYS) {
      expect(palette[shade].oklch.c).toBeLessThanOrEqual(0.01)
      expect(palette[shade].oklch.c).toBeGreaterThanOrEqual(0)
    }
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
