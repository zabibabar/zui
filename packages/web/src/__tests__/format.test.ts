import { describe, expect, it } from 'vitest'
import { oklchToCss, parseOklchString } from '../format'

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

  it('round-trips with oklchToCss', () => {
    const original = { l: 0.7, c: 0.12, h: 180 }
    const css = oklchToCss(original)
    const parsed = parseOklchString(css)
    expect(parsed.l).toBeCloseTo(original.l, 4)
    expect(parsed.c).toBeCloseTo(original.c, 4)
    expect(parsed.h).toBeCloseTo(original.h, 2)
  })
})
