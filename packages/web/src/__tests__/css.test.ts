import type { InkColors, OklchColor } from '@zui/core'
import { assignForegrounds, generatePalette, generateTheme } from '@zui/core'
import { describe, expect, it } from 'vitest'
import { themesToCss, themeToCss } from '../css'

const darkInk: OklchColor = { l: 0.145, c: 0.02, h: 220 }
const lightInk: OklchColor = { l: 0.985, c: 0.005, h: 220 }
const ink: InkColors = { dark: darkInk, light: lightInk }

function makePalette(hue: number, chroma: number) {
  return assignForegrounds(generatePalette({ hue, chroma, anchorLightness: 0.55 }), ink)
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
    expect(css).toContain('--neutral:')
    expect(css).toContain('--neutral-hover:')
    expect(css).toContain('--neutral-foreground:')
  })

  it('includes ink tokens', () => {
    const css = themeToCss(makeTheme('light'))
    expect(css).toContain('--ink-dark:')
    expect(css).toContain('--ink-light:')
  })

  it('includes surface tokens', () => {
    const css = themeToCss(makeTheme('light'))
    expect(css).toContain('--surface-base:')
    expect(css).toContain('--surface-raised:')
    expect(css).toContain('--surface-overlay:')
  })

  it('includes shadcn aliases using var() references', () => {
    const css = themeToCss(makeTheme('light'))
    expect(css).toContain('--background: var(--surface-base)')
    expect(css).toContain('--foreground: var(--ink-dark)')
    expect(css).toContain('--card: var(--surface-raised)')
    expect(css).toContain('--card-foreground: var(--ink-dark)')
    expect(css).toContain('--popover: var(--surface-overlay)')
    expect(css).toContain('--popover-foreground: var(--ink-dark)')
  })

  it('uses ink-light for foreground aliases in dark mode', () => {
    const css = themeToCss(makeTheme('dark'))
    expect(css).toContain('--foreground: var(--ink-light)')
    expect(css).toContain('--card-foreground: var(--ink-light)')
    expect(css).toContain('--popover-foreground: var(--ink-light)')
  })

  it('includes muted and chrome tokens (shadcn-compatible)', () => {
    const css = themeToCss(makeTheme('light'))
    expect(css).toContain('--muted:')
    expect(css).toContain('--muted-foreground:')
    expect(css).toContain('--border:')
    expect(css).toContain('--input:')
    expect(css).toContain('--ring:')
  })

  it('does not include old surface-from-neutral tokens', () => {
    const css = themeToCss(makeTheme('light'))
    const lines = css.split('\n')
    const bgLines = lines.filter((l) => l.match(/--background:\s*oklch/))
    expect(bgLines).toHaveLength(0)
    const fgLines = lines.filter((l) => l.match(/--foreground:\s*oklch/))
    expect(fgLines).toHaveLength(0)
  })

  it('formats OKLCH values in the output', () => {
    const css = themeToCss(makeTheme('light'))
    expect(css).toMatch(/oklch\(\d+\.\d+ \d+\.\d+ \d+(\.\d+)?\)/)
  })

  it('resolves semantic and primitive *-foreground to ink var() references', () => {
    const css = themeToCss(makeTheme('light'))
    expect(css).toMatch(/--primary-foreground: var\(--ink-(dark|light)\)/)
    expect(css).toMatch(/--primary-subtle-foreground: var\(--ink-(dark|light)\)/)
    expect(css).toMatch(/--primary-500-foreground: var\(--ink-(dark|light)\)/)
    const fgLines = css.split('\n').filter((l) => l.includes('-foreground:'))
    for (const line of fgLines) {
      if (line.includes('oklch(')) continue
      expect(line).toMatch(/var\(--ink-(dark|light)\)/)
    }
  })

  it('emits ink tokens before foreground references', () => {
    const css = themeToCss(makeTheme('light'))
    const inkDark = css.indexOf('--ink-dark:')
    const primaryFg = css.indexOf('--primary-foreground:')
    expect(inkDark).toBeGreaterThan(-1)
    expect(primaryFg).toBeGreaterThan(-1)
    expect(inkDark).toBeLessThan(primaryFg)
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
