import type { InkColors, OklchColor } from '../../generator/types'
import { describe, expect, it } from 'vitest'
import { assignForegrounds } from '../../generator/contrast'
import { generatePalette } from '../../generator/palette'
import { generateTheme } from '../../generator/semantic'
import { themesToCss, themeToCss } from '../css'

const darkInk: OklchColor = { l: 0.145, c: 0.02, h: 220 }
const lightInk: OklchColor = { l: 0.985, c: 0.005, h: 220 }
const ink: InkColors = { dark: darkInk, light: lightInk }

function makePalette(hue: number, chroma: number) {
  return assignForegrounds(generatePalette({ hue, chroma }), ink)
}

function makeTheme(mode: 'light' | 'dark') {
  const palettes = {
    primary: makePalette(230, 0.15),
    danger: makePalette(25, 0.18),
    neutral: makePalette(215, 0.02),
  }
  return generateTheme(palettes, mode)
}

describe('themeToCss', () => {
  it('scopes variables under [data-theme="light"] by default', () => {
    const css = themeToCss(makeTheme('light'))
    expect(css).toMatch(/^\[data-theme="light"\]\s*\{/)
  })

  it('scopes variables under [data-theme="dark"] for dark theme', () => {
    const css = themeToCss(makeTheme('dark'))
    expect(css).toMatch(/^\[data-theme="dark"\]\s*\{/)
  })

  it('supports custom selector', () => {
    const css = themeToCss(makeTheme('light'), { selector: ':root' })
    expect(css).toMatch(/^:root\s*\{/)
  })

  it('includes primitive palette tokens by default', () => {
    const css = themeToCss(makeTheme('light'))
    expect(css).toContain('--primary-50:')
    expect(css).toContain('--primary-500:')
    expect(css).toContain('--primary-950:')
    expect(css).toContain('--danger-50:')
    expect(css).toContain('--neutral-500:')
  })

  it('can exclude primitive tokens', () => {
    const css = themeToCss(makeTheme('light'), { includePrimitives: false })
    expect(css).not.toContain('--primary-50:')
    expect(css).toContain('--primary:')
  })

  it('includes semantic color intent tokens', () => {
    const css = themeToCss(makeTheme('light'))
    expect(css).toContain('--primary:')
    expect(css).toContain('--primary-foreground:')
    expect(css).toContain('--primary-hover:')
    expect(css).toContain('--primary-active:')
    expect(css).toContain('--primary-subtle:')
    expect(css).toContain('--primary-subtle-foreground:')
    expect(css).toContain('--primary-border:')
  })

  it('includes neutral semantic tokens (shadcn-compatible)', () => {
    const css = themeToCss(makeTheme('light'))
    expect(css).toContain('--background:')
    expect(css).toContain('--foreground:')
    expect(css).toContain('--card:')
    expect(css).toContain('--card-foreground:')
    expect(css).toContain('--popover:')
    expect(css).toContain('--popover-foreground:')
    expect(css).toContain('--muted:')
    expect(css).toContain('--muted-foreground:')
    expect(css).toContain('--border:')
    expect(css).toContain('--input:')
    expect(css).toContain('--ring:')
  })

  it('formats OKLCH values in the output', () => {
    const css = themeToCss(makeTheme('light'))
    expect(css).toMatch(/oklch\(\d+\.\d+ \d+\.\d+ \d+(\.\d+)?\)/)
  })

  it('foreground values are "dark" or "light" strings', () => {
    const css = themeToCss(makeTheme('light'))
    const fgLines = css.split('\n').filter((l) => l.includes('-foreground:'))
    for (const line of fgLines) {
      if (line.includes('oklch(')) continue
      expect(line).toMatch(/(dark|light);/)
    }
  })
})

describe('themesToCss', () => {
  it('concatenates multiple themes', () => {
    const css = themesToCss([makeTheme('light'), makeTheme('dark')])
    expect(css).toContain('[data-theme="light"]')
    expect(css).toContain('[data-theme="dark"]')
  })

  it('produces valid CSS blocks for each theme', () => {
    const css = themesToCss([makeTheme('light'), makeTheme('dark')])
    const openBraces = (css.match(/\{/g) || []).length
    const closeBraces = (css.match(/\}/g) || []).length
    expect(openBraces).toBe(closeBraces)
    expect(openBraces).toBe(2)
  })
})
