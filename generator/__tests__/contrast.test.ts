import type { InkColors, OklchColor } from '../types'
import { describe, expect, it } from 'vitest'
import { assignForegrounds, contrastRatio, parseOklchString, pickForeground } from '../contrast'
import { generatePalette } from '../palette'
import { SHADE_KEYS } from '../types'

const darkInk: OklchColor = { l: 0.145, c: 0.02, h: 220 }
const lightInk: OklchColor = { l: 0.985, c: 0.005, h: 220 }

const ink: InkColors = { dark: darkInk, light: lightInk }

describe('contrastRatio', () => {
  it('returns 21 for black vs white', () => {
    const black: OklchColor = { l: 0, c: 0, h: 0 }
    const white: OklchColor = { l: 1, c: 0, h: 0 }
    const ratio = contrastRatio(black, white)
    expect(ratio).toBeCloseTo(21, 0)
  })

  it('returns 1 for identical colors', () => {
    const color: OklchColor = { l: 0.5, c: 0.1, h: 230 }
    const ratio = contrastRatio(color, color)
    expect(ratio).toBeCloseTo(1, 1)
  })

  it('is symmetric', () => {
    const c1: OklchColor = { l: 0.3, c: 0.1, h: 230 }
    const c2: OklchColor = { l: 0.8, c: 0.05, h: 230 }
    expect(contrastRatio(c1, c2)).toBeCloseTo(contrastRatio(c2, c1), 5)
  })
})

describe('pickForeground', () => {
  it('picks dark foreground for very light backgrounds', () => {
    const lightBg: OklchColor = { l: 0.95, c: 0.01, h: 230 }
    expect(pickForeground(lightBg, ink)).toBe('dark')
  })

  it('picks light foreground for very dark backgrounds', () => {
    const darkBg: OklchColor = { l: 0.2, c: 0.01, h: 230 }
    expect(pickForeground(darkBg, ink)).toBe('light')
  })

  it('picks the ink with better contrast for mid-tone backgrounds', () => {
    const midBg: OklchColor = { l: 0.55, c: 0.1, h: 230 }
    const fg = pickForeground(midBg, ink)

    const darkContrast = contrastRatio(midBg, ink.dark)
    const lightContrast = contrastRatio(midBg, ink.light)

    if (darkContrast >= lightContrast) {
      expect(fg).toBe('dark')
    } else {
      expect(fg).toBe('light')
    }
  })
})

describe('assignForegrounds', () => {
  it('assigns foreground to all shades in a palette', () => {
    const palette = generatePalette({ hue: 230, chroma: 0.15 })
    const withFg = assignForegrounds(palette, ink)

    for (const shade of SHADE_KEYS) {
      expect(['dark', 'light']).toContain(withFg[shade].foreground)
    }
  })

  it('assigns dark foreground to light shades and light foreground to dark shades', () => {
    const palette = generatePalette({ hue: 230, chroma: 0.15 })
    const withFg = assignForegrounds(palette, ink)

    expect(withFg['50'].foreground).toBe('dark')
    expect(withFg['100'].foreground).toBe('dark')
    expect(withFg['900'].foreground).toBe('light')
    expect(withFg['950'].foreground).toBe('light')
  })

  it('ensures chosen foreground provides at least 3:1 contrast for all shades', () => {
    const seeds = [
      { hue: 230, chroma: 0.15 },
      { hue: 25, chroma: 0.18 },
      { hue: 145, chroma: 0.14 },
      { hue: 75, chroma: 0.15 },
    ]

    for (const seed of seeds) {
      const palette = generatePalette(seed)
      const withFg = assignForegrounds(palette, ink)

      for (const shade of SHADE_KEYS) {
        const entry = withFg[shade]
        const fgColor = entry.foreground === 'dark' ? ink.dark : ink.light
        const ratio = contrastRatio(entry.oklch, fgColor)
        expect(ratio).toBeGreaterThanOrEqual(3)
      }
    }
  })
})

describe('parseOklchString', () => {
  it('parses a valid oklch CSS string', () => {
    const color = parseOklchString('oklch(0.55 0.15 230)')
    expect(color.l).toBe(0.55)
    expect(color.c).toBe(0.15)
    expect(color.h).toBe(230)
  })

  it('throws on invalid format', () => {
    expect(() => parseOklchString('rgb(255, 0, 0)')).toThrow()
    expect(() => parseOklchString('not a color')).toThrow()
  })
})
