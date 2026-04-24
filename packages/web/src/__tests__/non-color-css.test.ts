import type { NonColorTokens } from '@zui/core'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defaultFontFamily, defaultNonColorTokens } from '@zui/core'
import { describe, expect, it } from 'vitest'
import { generateTailwindThemeCss, renderNonColorTokensCss } from '../non-color-css'

function lines(css: string): string[] {
  return css.split('\n').filter((l) => l.trim() !== '')
}

function declarations(css: string): string[] {
  return lines(css).filter((l) => l.startsWith('--'))
}

describe('renderNonColorTokensCss', () => {
  const css = renderNonColorTokensCss()

  it('returns a non-empty string', () => {
    expect(css.length).toBeGreaterThan(0)
  })

  it('uses default tokens when called with no arguments', () => {
    expect(renderNonColorTokensCss()).toBe(renderNonColorTokensCss(defaultNonColorTokens))
  })

  // ── Spacing ──

  it('emits spacing with density calc', () => {
    expect(css).toContain('--spacing: calc(0.25rem * var(--density, 1));')
  })

  // ── Radius ──

  it('emits all radius steps', () => {
    expect(css).toContain('--radius-xs:')
    expect(css).toContain('--radius-sm:')
    expect(css).toContain('--radius-md:')
    expect(css).toContain('--radius-lg:')
    expect(css).toContain('--radius-xl:')
    expect(css).toContain('--radius-2xl:')
    expect(css).toContain('--radius-3xl:')
    expect(css).toContain('--radius-4xl:')
  })

  it('uses calc with multiplier for non-identity radius steps', () => {
    expect(css).toContain('--radius-xs: calc(var(--radius, 0.625rem) * 0.4);')
    expect(css).toContain('--radius-xl: calc(var(--radius, 0.625rem) * 1.4);')
  })

  it('uses bare var() for the lg (identity) radius step', () => {
    expect(css).toContain('--radius-lg: var(--radius, 0.625rem);')
    expect(css).not.toContain('--radius-lg: calc')
  })

  // ── Typography ──

  it('emits font size and line-height for all type-scale steps', () => {
    const steps = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl']
    for (const step of steps) {
      expect(css).toContain(`--text-${step}:`)
      expect(css).toContain(`--text-${step}--line-height:`)
    }
  })

  it('uses density-dampened calc for font sizes', () => {
    expect(css).toContain('--text-xs: calc(0.75rem * (1 + (var(--density, 1) - 1) * 0.5));')
    expect(css).toContain('--text-base: calc(1rem * (1 + (var(--density, 1) - 1) * 0.5));')
  })

  it('uses ratio calc for line-heights', () => {
    expect(css).toContain('--text-xs--line-height: calc(1 / 0.75);')
    expect(css).toContain('--text-sm--line-height: calc(1.25 / 0.875);')
    expect(css).toContain('--text-base--line-height: calc(1.5 / 1);')
  })

  // ── Font families ──

  it('emits font family stacks and Tailwind font bridges', () => {
    expect(css).toContain('--zui-font-sans: ui-sans-serif, system-ui, sans-serif;')
    expect(css).toContain('--font-sans: var(--zui-font-sans);')
    expect(css).toContain(
      '--zui-font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;',
    )
    expect(css).toContain('--font-serif: var(--zui-font-serif);')
    expect(css).toContain('--zui-font-mono:')
    expect(css).toContain('--font-mono: var(--zui-font-mono);')
  })

  // ── Font weights ──

  it('emits all font weight values', () => {
    expect(css).toContain('--font-weight-thin: 100;')
    expect(css).toContain('--font-weight-normal: 400;')
    expect(css).toContain('--font-weight-bold: 700;')
    expect(css).toContain('--font-weight-black: 900;')
  })

  // ── Letter spacing ──

  it('emits tracking values in em', () => {
    expect(css).toContain('--zui-tracking-tighter: -0.05em;')
    expect(css).toContain('--tracking-tighter: var(--zui-tracking-tighter);')
    expect(css).toContain('--zui-tracking-normal: 0em;')
    expect(css).toContain('--tracking-normal: var(--zui-tracking-normal);')
    expect(css).toContain('--zui-tracking-widest: 0.1em;')
    expect(css).toContain('--tracking-widest: var(--zui-tracking-widest);')
  })

  // ── Line height ──

  it('emits leading values as unitless numbers', () => {
    expect(css).toContain('--leading-tight: 1.25;')
    expect(css).toContain('--leading-normal: 1.5;')
    expect(css).toContain('--leading-loose: 2;')
  })

  // ── Shadows ──

  it('emits all shadow steps', () => {
    expect(css).toContain('--shadow-2xs:')
    expect(css).toContain('--shadow-xs:')
    expect(css).toContain('--shadow-sm:')
    expect(css).toContain('--shadow-md:')
    expect(css).toContain('--shadow-lg:')
    expect(css).toContain('--shadow-xl:')
    expect(css).toContain('--shadow-2xl:')
  })

  it('formats single-layer shadows correctly', () => {
    expect(css).toContain('--shadow-2xs: 0 1px rgb(0 0 0 / 0.05);')
  })

  it('formats multi-layer shadows with commas', () => {
    expect(css).toContain(
      '--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);',
    )
  })

  // ── Easing ──

  it('emits easing curves as cubic-bezier', () => {
    expect(css).toContain('--ease-in: cubic-bezier(0.4, 0, 1, 1);')
    expect(css).toContain('--ease-out: cubic-bezier(0, 0, 0.2, 1);')
    expect(css).toContain('--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);')
  })

  // ── Animations ──

  it('emits animation shorthand values', () => {
    expect(css).toContain('--animate-spin: spin 1s linear infinite;')
    expect(css).toContain('--animate-ping: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;')
    expect(css).toContain('--animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;')
    expect(css).toContain('--animate-bounce: bounce 1s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;')
  })

  // ── Keyframes ──

  it('includes @keyframes blocks', () => {
    expect(css).toContain('@keyframes spin')
    expect(css).toContain('@keyframes ping')
    expect(css).toContain('@keyframes pulse')
    expect(css).toContain('@keyframes bounce')
  })

  it('includes transform/opacity in keyframes', () => {
    expect(css).toContain('rotate(360deg)')
    expect(css).toContain('scale(2)')
    expect(css).toContain('translateY(-25%)')
  })

  // ── Section comments ──

  it('includes section header comments', () => {
    expect(css).toContain('/* ── Spacing ── */')
    expect(css).toContain('/* ── Radius scale')
    expect(css).toContain('/* ── Typography scale')
    expect(css).toContain('/* ── Font families ── */')
    expect(css).toContain('/* ── Font weights ── */')
    expect(css).toContain('/* ── Letter spacing ── */')
    expect(css).toContain('/* ── Line height ── */')
    expect(css).toContain('/* ── Shadows ── */')
    expect(css).toContain('/* ── Easing ── */')
    expect(css).toContain('/* ── Animations ── */')
  })
})

describe('renderNonColorTokensCss with custom tokens', () => {
  it('respects a custom spacing base unit', () => {
    const custom: NonColorTokens = {
      ...defaultNonColorTokens,
      spacing: { baseUnit: 0.5 },
    }
    const css = renderNonColorTokensCss(custom)
    expect(css).toContain('--spacing: calc(0.5rem * var(--density, 1));')
  })

  it('respects a custom radius base and multiplier', () => {
    const custom: NonColorTokens = {
      ...defaultNonColorTokens,
      radius: {
        baseRem: 1,
        multipliers: { ...defaultNonColorTokens.radius.multipliers, xs: 0.25 },
      },
    }
    const css = renderNonColorTokensCss(custom)
    expect(css).toContain('--radius-xs: calc(var(--radius, 1rem) * 0.25);')
  })

  it('respects custom density dampening', () => {
    const custom: NonColorTokens = {
      ...defaultNonColorTokens,
      typography: { ...defaultNonColorTokens.typography, densityDampening: 0.75 },
    }
    const css = renderNonColorTokensCss(custom)
    expect(css).toContain('density-dampened at 75% rate')
    expect(css).toContain('* 0.75)')
  })

  it('respects custom font family stacks', () => {
    const custom: NonColorTokens = {
      ...defaultNonColorTokens,
      fontFamily: {
        ...defaultFontFamily,
        sans: 'Inter, ui-sans-serif, system-ui, sans-serif',
      },
    }
    const css = renderNonColorTokensCss(custom)
    expect(css).toContain('--zui-font-sans: Inter, ui-sans-serif, system-ui, sans-serif;')
  })

  it('applies a custom tracking offset to the tracking scale', () => {
    const custom: NonColorTokens = {
      ...defaultNonColorTokens,
      trackingOffsetEm: 0.01,
    }
    const css = renderNonColorTokensCss(custom)
    expect(css).toContain('--zui-tracking-tight: -0.015em;')
    expect(css).toContain('--zui-tracking-normal: 0.01em;')
  })
})

describe('equivalence with tailwind-theme.css', () => {
  const css = renderNonColorTokensCss()
  const decls = declarations(css)

  it('emits the expected number of CSS custom property declarations', () => {
    const expectedCount =
      1 + // spacing
      8 + // radius
      7 * 2 + // typography (size + line-height)
      3 * 2 + // font families (backing vars + Tailwind bridges)
      9 + // font weights
      6 * 2 + // tracking (backing vars + Tailwind bridges)
      5 + // leading
      7 + // shadows
      3 + // easing
      4 // animations
    expect(decls).toHaveLength(expectedCount)
  })

  it('all declarations end with semicolons', () => {
    for (const decl of decls) {
      expect(decl).toMatch(/;\s*$/)
    }
  })
})

describe('generateTailwindThemeCss', () => {
  const css = generateTailwindThemeCss()

  it('starts with the Tailwind import', () => {
    expect(css).toMatch(/^@import 'tailwindcss';/)
  })

  it('includes the @custom-variant dark directive', () => {
    expect(css).toContain('@custom-variant dark')
  })

  it('wraps content in @theme inline block', () => {
    expect(css).toContain('@theme inline {')
    expect(css.trim()).toMatch(/\}$/)
  })

  it('includes color bridge mappings', () => {
    expect(css).toContain('--color-background: var(--background);')
    expect(css).toContain('--color-primary: var(--primary);')
    expect(css).toContain('--color-secondary: var(--secondary);')
    expect(css).toContain('--color-secondary-foreground: var(--secondary-foreground);')
    expect(css).toContain('--color-danger-foreground: var(--danger-foreground);')
    expect(css).toContain('--color-warning-border: var(--warning-border);')
  })

  it('includes non-color tokens (indented inside @theme)', () => {
    expect(css).toContain('  --spacing: calc(0.25rem')
    expect(css).toContain('  --radius-xs:')
    expect(css).toContain('  --text-xs:')
    expect(css).toContain('  --font-sans: var(--zui-font-sans);')
    expect(css).toContain('  --font-weight-bold: 700;')
    expect(css).toContain('  --shadow-md:')
    expect(css).toContain('  --ease-in:')
    expect(css).toContain('  --animate-spin:')
  })

  it('includes indented @keyframes blocks', () => {
    expect(css).toContain('  @keyframes spin')
    expect(css).toContain('  @keyframes bounce')
  })
})

describe('tailwind-theme.css stays in sync with generator', () => {
  it('static file matches generateTailwindThemeCss() output', () => {
    const thisDir = fileURLToPath(new URL('.', import.meta.url))
    const staticPath = resolve(thisDir, '..', '..', 'styles', 'tailwind-theme.css')
    const staticContent = readFileSync(staticPath, 'utf-8')
    const generated = generateTailwindThemeCss()
    expect(staticContent).toBe(generated)
  })
})
