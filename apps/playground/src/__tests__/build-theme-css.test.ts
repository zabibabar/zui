import { describe, expect, it } from 'vitest'
import { buildThemeCss } from '../build-theme-css'
import { defaultPlaygroundThemeState } from '../theme-state'

describe('buildThemeCss', () => {
  it('returns non-empty CSS for default playground state', () => {
    const css = buildThemeCss(defaultPlaygroundThemeState())
    expect(css.length).toBeGreaterThan(100)
    expect(css).toContain('[data-theme="light"]')
    expect(css).toContain('[data-theme="dark"]')
  })

  it('accepts ink and surface overrides', () => {
    const css = buildThemeCss({
      ...defaultPlaygroundThemeState(),
      ink: {
        dark: 'oklch(0.2 0.02 260)',
        light: 'oklch(0.96 0.01 260)',
      },
      surfaces: {
        base: 'oklch(0.97 0.02 85)',
      },
    })
    expect(css).toContain('oklch(0.2 0.02 260)')
    expect(css).toContain('oklch(0.97 0.02 85)')
  })

  it('accepts chrome overrides', () => {
    const css = buildThemeCss({
      ...defaultPlaygroundThemeState(),
      chrome: {
        ring: 'oklch(0.5 0.18 300)',
      },
    })
    expect(css).toContain('oklch(0.5 0.18 300)')
  })
})
