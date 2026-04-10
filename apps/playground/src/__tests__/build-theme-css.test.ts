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
        dark: { l: 0.2, c: 0.02, h: 260 },
        light: { l: 0.96, c: 0.01, h: 260 },
      },
      surfaces: {
        base: { l: 0.97, c: 0.02, h: 85 },
      },
    })
    expect(css).toContain('oklch(0.2 0.02 260)')
    expect(css).toContain('oklch(0.97 0.02 85)')
  })

  it('accepts chrome overrides', () => {
    const css = buildThemeCss({
      ...defaultPlaygroundThemeState(),
      chrome: {
        ring: { l: 0.5, c: 0.18, h: 300 },
      },
    })
    expect(css).toContain('oklch(0.5 0.18 300)')
  })
})
