import type { FullTheme } from '@zui/core'
import {
  buildFullTheme,
  defaultComponentTokens,
  defaultNonColorTokens,
  generatePalette,
  generateTheme,
} from '@zui/core'
import { describe, expect, it } from 'vitest'

function makePalette(hue: number, chroma: number) {
  return generatePalette({ hue, chroma, anchorLightness: 0.55 })
}

const palettes = {
  primary: makePalette(230, 0.15),
  neutral: makePalette(215, 0.02),
}
const light = generateTheme(palettes, 'light')

describe('buildFullTheme', () => {
  it('returns a FullTheme object with all three fields', () => {
    const theme = buildFullTheme(light)
    expect(theme.colors).toBe(light)
    expect(theme.tokens).toBe(defaultNonColorTokens)
    expect(theme.components).toBe(defaultComponentTokens)
  })

  it('uses provided overrides for tokens and components', () => {
    const customTokens = { ...defaultNonColorTokens, spacing: { baseUnit: 0.5 } }
    const customComponents = { ...defaultComponentTokens }
    const theme = buildFullTheme(light, customTokens, customComponents)
    expect(theme.tokens.spacing.baseUnit).toBe(0.5)
    expect(theme.components).toBe(customComponents)
  })

  it('satisfies the FullTheme interface', () => {
    const theme: FullTheme = buildFullTheme(light)
    expect(theme.colors.mode).toBe('light')
    expect(theme.tokens.spacing.baseUnit).toBe(0.25)
    expect(theme.components.button.gap).toBe(2)
  })
})
