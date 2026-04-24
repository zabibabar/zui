import type { InkColors, OklchColor } from '../types/theme'
import { describe, expect, it } from 'vitest'
import {
  deriveMutedBackground,
  deriveMutedForeground,
  generateTheme,
  mapSemanticColors,
  mixOklch,
  resolveChrome,
  resolveInk,
  resolveSurfaces,
} from '../semantic/theme'
import { SHADE_KEYS } from '../types/theme'
import { assignForegrounds } from '../utils/contrast'
import { generatePalette } from '../utils/palette'

const darkInk: OklchColor = { l: 0.145, c: 0.02, h: 220 }
const lightInk: OklchColor = { l: 0.985, c: 0.005, h: 220 }
const ink: InkColors = { dark: darkInk, light: lightInk }

const ANCHOR_L = 0.55

function makePalette(hue: number, chroma: number, anchorLightness = ANCHOR_L) {
  return assignForegrounds(generatePalette({ hue, chroma, anchorLightness }), ink)
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

  it('uses anchor shade for base in light mode', () => {
    const tokens = mapSemanticColors(palette, 'light')
    const baseShade = SHADE_KEYS[palette.anchorShadeIndex]
    expect(tokens.base.l).toBe(palette[baseShade].oklch.l)
  })

  it('uses anchor minus one step for base in dark mode', () => {
    const tokens = mapSemanticColors(palette, 'dark')
    const baseShade = SHADE_KEYS[Math.max(0, palette.anchorShadeIndex - 1)]
    expect(tokens.base.l).toBe(palette[baseShade].oklch.l)
  })

  it('light mode hover is darker than base', () => {
    const tokens = mapSemanticColors(palette, 'light')
    expect(tokens.hover.l).toBeLessThan(tokens.base.l)
  })

  it('dark mode hover is lighter than base', () => {
    const tokens = mapSemanticColors(palette, 'dark')
    expect(tokens.hover.l).toBeGreaterThan(tokens.base.l)
  })

  it('subtle is very light in light mode', () => {
    const tokens = mapSemanticColors(palette, 'light')
    expect(tokens.subtle.l).toBeGreaterThan(0.9)
  })

  it('subtle is very dark in dark mode', () => {
    const tokens = mapSemanticColors(palette, 'dark')
    expect(tokens.subtle.l).toBeLessThan(0.2)
  })
})

describe('mixOklch', () => {
  it('interpolates at t=0 and t=1', () => {
    const a = { l: 0.5, c: 0.1, h: 100 }
    const b = { l: 0.8, c: 0.2, h: 200 }
    expect(mixOklch(a, b, 0)).toEqual(a)
    expect(mixOklch(a, b, 1)).toEqual(b)
  })
})

describe('deriveMutedBackground', () => {
  const lightSurfaces = resolveSurfaces('light')
  const darkSurfaces = resolveSurfaces('dark')

  it('light muted is darker than surface base', () => {
    const m = deriveMutedBackground(lightSurfaces, 'light')
    expect(m.l).toBeLessThan(lightSurfaces.base.l)
    expect(m.c).toBe(lightSurfaces.base.c)
  })

  it('dark muted is lighter than surface raised', () => {
    const m = deriveMutedBackground(darkSurfaces, 'dark')
    expect(m.l).toBeGreaterThan(darkSurfaces.raised.l)
  })
})

describe('deriveMutedForeground', () => {
  const ink = resolveInk()
  const lightSurfaces = resolveSurfaces('light')
  const darkSurfaces = resolveSurfaces('dark')

  it('light secondary text sits between ink and base in lightness', () => {
    const m = deriveMutedForeground(ink, lightSurfaces, 'light')
    expect(m.l).toBeGreaterThan(ink.dark.l)
    expect(m.l).toBeLessThan(lightSurfaces.base.l)
  })

  it('dark secondary text is dimmer than full light ink', () => {
    const m = deriveMutedForeground(ink, darkSurfaces, 'dark')
    expect(m.l).toBeLessThan(ink.light.l)
  })
})

describe('resolveChrome', () => {
  const lightS = resolveSurfaces('light')
  const primaryPal = makePalette(250, 0.15)

  it('defaults border and input to the same color', () => {
    const c = resolveChrome(lightS, 'light', primaryPal)
    expect(c.input).toEqual(c.border)
  })

  it('defaults ring to primary palette 300 stop', () => {
    const c = resolveChrome(lightS, 'light', primaryPal)
    expect(c.ring).toEqual(primaryPal['300'].oklch)
  })

  it('applies partial overrides: custom border keeps default input matching border', () => {
    const c = resolveChrome(lightS, 'light', primaryPal, {
      border: { l: 0.75, c: 0.05, h: 90 },
    })
    expect(c.border.l).toBeCloseTo(0.75, 5)
    expect(c.input).toEqual(c.border)
  })

  it('applies full overrides', () => {
    const c = resolveChrome(lightS, 'light', primaryPal, {
      border: { l: 0.7, c: 0.02, h: 0 },
      input: { l: 0.65, c: 0.02, h: 0 },
      ring: { l: 0.6, c: 0.2, h: 300 },
    })
    expect(c.border.l).toBe(0.7)
    expect(c.input.l).toBe(0.65)
    expect(c.ring.h).toBe(300)
  })
})

describe('resolveInk', () => {
  it('returns default ink when no config is provided', () => {
    const result = resolveInk()
    expect(result.dark.l).toBe(0.145)
    expect(result.dark.c).toBe(0)
    expect(result.light.l).toBe(0.985)
    expect(result.light.c).toBe(0)
  })

  it('returns default ink when empty config is provided', () => {
    const result = resolveInk({})
    expect(result.dark.l).toBe(0.145)
    expect(result.light.l).toBe(0.985)
  })

  it('overrides dark ink when provided', () => {
    const result = resolveInk({ dark: { l: 0.1, c: 0.02, h: 220 } })
    expect(result.dark.l).toBe(0.1)
    expect(result.dark.c).toBe(0.02)
    expect(result.light.l).toBe(0.985)
  })

  it('overrides light ink when provided', () => {
    const result = resolveInk({ light: { l: 0.95, c: 0.01, h: 220 } })
    expect(result.dark.l).toBe(0.145)
    expect(result.light.l).toBe(0.95)
    expect(result.light.c).toBe(0.01)
  })

  it('overrides both ink colors when both are provided', () => {
    const result = resolveInk({
      dark: { l: 0.1, c: 0.02, h: 220 },
      light: { l: 0.95, c: 0.01, h: 220 },
    })
    expect(result.dark.l).toBe(0.1)
    expect(result.light.l).toBe(0.95)
  })
})

describe('resolveSurfaces', () => {
  it('returns light defaults when no config is provided', () => {
    const surfaces = resolveSurfaces('light')
    expect(surfaces.base.l).toBe(0.985)
    expect(surfaces.raised.l).toBe(1)
    expect(surfaces.overlay.l).toBe(1)
  })

  it('returns dark defaults when no config is provided', () => {
    const surfaces = resolveSurfaces('dark')
    expect(surfaces.base.l).toBe(0.13)
    expect(surfaces.raised.l).toBe(0.17)
    expect(surfaces.overlay.l).toBe(0.17)
  })

  it('derives raised from base when only base is provided (light)', () => {
    const surfaces = resolveSurfaces('light', { base: { l: 0.96, c: 0, h: 0 } })
    expect(surfaces.base.l).toBe(0.96)
    expect(surfaces.raised.l).toBeCloseTo(0.975, 3)
    expect(surfaces.overlay.l).toBeCloseTo(0.975, 3)
  })

  it('derives raised from base when only base is provided (dark)', () => {
    const surfaces = resolveSurfaces('dark', { base: { l: 0.1, c: 0, h: 0 } })
    expect(surfaces.base.l).toBe(0.1)
    expect(surfaces.raised.l).toBeCloseTo(0.14, 3)
    expect(surfaces.overlay.l).toBeCloseTo(0.14, 3)
  })

  it('overlay defaults to raised when only raised is provided', () => {
    const surfaces = resolveSurfaces('light', {
      base: { l: 0.98, c: 0, h: 0 },
      raised: { l: 0.99, c: 0, h: 0 },
    })
    expect(surfaces.overlay.l).toBe(0.99)
  })

  it('allows full override of all surfaces', () => {
    const surfaces = resolveSurfaces('light', {
      base: { l: 0.95, c: 0.01, h: 200 },
      raised: { l: 0.97, c: 0.01, h: 200 },
      overlay: { l: 0.99, c: 0.01, h: 200 },
    })
    expect(surfaces.base.l).toBe(0.95)
    expect(surfaces.raised.l).toBe(0.97)
    expect(surfaces.overlay.l).toBe(0.99)
  })

  it('clamps raised lightness to 1 maximum', () => {
    const surfaces = resolveSurfaces('light', { base: { l: 0.995, c: 0, h: 0 } })
    expect(surfaces.raised.l).toBeLessThanOrEqual(1)
  })
})

describe('generateTheme', () => {
  const palettes = {
    primary: makePalette(230, 0.15),
    danger: makePalette(25, 0.18),
    neutral: makePalette(215, 0.02),
  }

  it('generates a complete light theme with surfaces and ink', () => {
    const theme = generateTheme(palettes, 'light')

    expect(theme.mode).toBe('light')
    expect(theme.primitives).toBeDefined()
    expect(theme.semantic.primary).toBeDefined()
    expect(theme.semantic.danger).toBeDefined()
    expect(theme.chrome).toBeDefined()
    expect(theme.muted).toBeDefined()
    expect(theme.surfaces).toBeDefined()
    expect(theme.ink).toBeDefined()
    expect(theme.semantic.neutral).toBeDefined()
  })

  it('generates a complete dark theme with surfaces and ink', () => {
    const theme = generateTheme(palettes, 'dark')

    expect(theme.mode).toBe('dark')
    expect(theme.semantic.primary).toBeDefined()
    expect(theme.semantic.danger).toBeDefined()
    expect(theme.chrome).toBeDefined()
    expect(theme.muted).toBeDefined()
    expect(theme.surfaces).toBeDefined()
    expect(theme.ink).toBeDefined()
  })

  it('throws when neutral palette is missing', () => {
    const { neutral: _, ...withoutNeutral } = palettes
    expect(() => generateTheme(withoutNeutral, 'light')).toThrow('neutral')
  })

  it('uses default surfaces and ink when no options are provided', () => {
    const theme = generateTheme(palettes, 'light')
    expect(theme.surfaces.base.l).toBe(0.985)
    expect(theme.ink.dark.l).toBe(0.145)
    expect(theme.ink.light.l).toBe(0.985)
  })

  it('accepts custom surfaces via options', () => {
    const theme = generateTheme(palettes, 'light', {
      surfaces: { base: { l: 0.96, c: 0.01, h: 200 } },
    })
    expect(theme.surfaces.base.l).toBe(0.96)
    expect(theme.surfaces.base.c).toBe(0.01)
  })

  it('accepts custom ink via options', () => {
    const theme = generateTheme(palettes, 'light', {
      ink: { dark: { l: 0.1, c: 0.02, h: 220 } },
    })
    expect(theme.ink.dark.l).toBe(0.1)
    expect(theme.ink.dark.c).toBe(0.02)
    expect(theme.ink.light.l).toBe(0.985)
  })

  it('exposes chrome and muted for shadcn-compatible CSS', () => {
    const theme = generateTheme(palettes, 'light')
    expect(theme.chrome.border).toBeDefined()
    expect(theme.chrome.input).toBeDefined()
    expect(theme.chrome.ring).toBeDefined()
    expect(theme.muted.background).toBeDefined()
    expect(theme.muted.foreground).toBeDefined()
  })

  it('accepts custom chrome via options', () => {
    const theme = generateTheme(palettes, 'light', {
      chrome: { ring: { l: 0.5, c: 0.2, h: 280 } },
    })
    expect(theme.chrome.ring.h).toBe(280)
  })

  it('throws when primary palette is missing', () => {
    const { primary: _, ...withoutPrimary } = palettes
    expect(() => generateTheme(withoutPrimary, 'light')).toThrow('primary')
  })

  it('fills optional intent palettes from presets when omitted', () => {
    const minimal = {
      primary: makePalette(230, 0.15),
      neutral: makePalette(215, 0.02),
    }
    const theme = generateTheme(minimal, 'light')

    expect(theme.semantic.danger).toBeDefined()
    expect(theme.semantic.info).toBeDefined()
    expect(theme.semantic.success).toBeDefined()
    expect(theme.semantic.warning).toBeDefined()
    expect(theme.primitives.info['500'].oklch.h).toBe(195)
    expect(theme.primitives.danger['500'].oklch.h).toBe(25)
  })

  it('defaults secondary to the primary palette when omitted', () => {
    const minimal = {
      primary: makePalette(230, 0.15),
      neutral: makePalette(215, 0.02),
    }
    const theme = generateTheme(minimal, 'light')

    expect(theme.primitives.secondary).toBe(theme.primitives.primary)
    expect(theme.semantic.secondary).toEqual(theme.semantic.primary)
  })

  it('does not replace an explicit secondary palette', () => {
    const secondary = makePalette(280, 0.16)
    const theme = generateTheme(
      {
        primary: makePalette(230, 0.15),
        secondary,
        neutral: makePalette(215, 0.02),
      },
      'light',
    )

    expect(theme.primitives.secondary).toBe(secondary)
    expect(theme.semantic.secondary.base.h).toBe(280)
  })

  it('does not replace explicit optional intent palettes', () => {
    const customDanger = makePalette(100, 0.12)
    const theme = generateTheme(
      {
        primary: makePalette(230, 0.15),
        neutral: makePalette(215, 0.02),
        danger: customDanger,
      },
      'light',
    )
    const d = theme.primitives.danger
    expect(d[SHADE_KEYS[d.anchorShadeIndex]].oklch.h).toBe(100)
  })
})
