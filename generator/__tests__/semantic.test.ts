import type { InkColors, OklchColor } from '../types'
import { describe, expect, it } from 'vitest'
import { assignForegrounds } from '../contrast'
import { generatePalette } from '../palette'
import { generateTheme, mapNeutralSemantics, mapSemanticColors } from '../semantic'

const darkInk: OklchColor = { l: 0.145, c: 0.02, h: 220 }
const lightInk: OklchColor = { l: 0.985, c: 0.005, h: 220 }
const ink: InkColors = { dark: darkInk, light: lightInk }

function makePalette(hue: number, chroma: number) {
  return assignForegrounds(generatePalette({ hue, chroma }), ink)
}

describe('mapSemanticColors', () => {
  const palette = makePalette(230, 0.15)

  it('produces all required semantic tokens in light mode', () => {
    const tokens = mapSemanticColors(palette, 'light')
    expect(tokens.base).toBeDefined()
    expect(tokens.foreground).toBeDefined()
    expect(tokens.hover).toBeDefined()
    expect(tokens.active).toBeDefined()
    expect(tokens.subtle).toBeDefined()
    expect(tokens.subtleForeground).toBeDefined()
    expect(tokens.border).toBeDefined()
  })

  it('produces all required semantic tokens in dark mode', () => {
    const tokens = mapSemanticColors(palette, 'dark')
    expect(tokens.base).toBeDefined()
    expect(tokens.foreground).toBeDefined()
    expect(tokens.hover).toBeDefined()
    expect(tokens.active).toBeDefined()
    expect(tokens.subtle).toBeDefined()
    expect(tokens.subtleForeground).toBeDefined()
    expect(tokens.border).toBeDefined()
  })

  it('uses shade 500 for base in light mode', () => {
    const tokens = mapSemanticColors(palette, 'light')
    expect(tokens.base.l).toBe(palette['500'].oklch.l)
  })

  it('uses shade 400 for base in dark mode', () => {
    const tokens = mapSemanticColors(palette, 'dark')
    expect(tokens.base.l).toBe(palette['400'].oklch.l)
  })

  it('light mode hover is darker than base (shade 600 vs 500)', () => {
    const tokens = mapSemanticColors(palette, 'light')
    expect(tokens.hover.l).toBeLessThan(tokens.base.l)
  })

  it('dark mode hover is lighter than base (shade 300 vs 400)', () => {
    const tokens = mapSemanticColors(palette, 'dark')
    expect(tokens.hover.l).toBeGreaterThan(tokens.base.l)
  })

  it('subtle is very light in light mode (shade 50)', () => {
    const tokens = mapSemanticColors(palette, 'light')
    expect(tokens.subtle.l).toBeGreaterThan(0.9)
  })

  it('subtle is very dark in dark mode (shade 950)', () => {
    const tokens = mapSemanticColors(palette, 'dark')
    expect(tokens.subtle.l).toBeLessThan(0.2)
  })
})

describe('mapNeutralSemantics', () => {
  const neutralPalette = makePalette(215, 0.02)

  it('produces all required neutral tokens in light mode', () => {
    const tokens = mapNeutralSemantics(neutralPalette, 'light')
    const keys = [
      'background',
      'foreground',
      'card',
      'cardForeground',
      'popover',
      'popoverForeground',
      'muted',
      'mutedForeground',
      'border',
      'input',
      'ring',
    ] as const

    for (const key of keys) {
      expect(tokens[key]).toBeDefined()
      expect(tokens[key].l).toBeGreaterThanOrEqual(0)
      expect(tokens[key].l).toBeLessThanOrEqual(1)
    }
  })

  it('light mode background is lighter than foreground', () => {
    const tokens = mapNeutralSemantics(neutralPalette, 'light')
    expect(tokens.background.l).toBeGreaterThan(tokens.foreground.l)
  })

  it('dark mode background is darker than foreground', () => {
    const tokens = mapNeutralSemantics(neutralPalette, 'dark')
    expect(tokens.background.l).toBeLessThan(tokens.foreground.l)
  })
})

describe('generateTheme', () => {
  const palettes = {
    primary: makePalette(230, 0.15),
    danger: makePalette(25, 0.18),
    neutral: makePalette(215, 0.02),
  }

  it('generates a complete light theme', () => {
    const theme = generateTheme(palettes, 'light')

    expect(theme.mode).toBe('light')
    expect(theme.primitives).toBeDefined()
    expect(theme.semantic.primary).toBeDefined()
    expect(theme.semantic.danger).toBeDefined()
    expect(theme.neutral).toBeDefined()
    expect(theme.semantic.neutral).toBeUndefined()
  })

  it('generates a complete dark theme', () => {
    const theme = generateTheme(palettes, 'dark')

    expect(theme.mode).toBe('dark')
    expect(theme.semantic.primary).toBeDefined()
    expect(theme.semantic.danger).toBeDefined()
    expect(theme.neutral).toBeDefined()
  })

  it('throws when neutral palette is missing', () => {
    const { neutral: _, ...withoutNeutral } = palettes
    expect(() => generateTheme(withoutNeutral, 'light')).toThrow('neutral')
  })
})
