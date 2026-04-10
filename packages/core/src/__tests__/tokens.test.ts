import { describe, expect, it } from 'vitest'
import {
  defaultEasing,
  defaultFontWeight,
  defaultLeading,
  defaultMotion,
  defaultNonColorTokens,
  defaultRadius,
  defaultShadow,
  defaultSpacing,
  defaultTracking,
  defaultTypography,
  EASING_NAMES,
  FONT_WEIGHT_NAMES,
  LEADING_STEPS,
  MOTION_NAMES,
  RADIUS_STEPS,
  resolveRadius,
  resolveSpacing,
  resolveTypeStep,
  SHADOW_STEPS,
  TRACKING_STEPS,
  TYPE_SCALE_STEPS,
} from '../primitives/non-color'

describe('defaultNonColorTokens', () => {
  it('aggregates all category defaults', () => {
    expect(defaultNonColorTokens.spacing).toBe(defaultSpacing)
    expect(defaultNonColorTokens.radius).toBe(defaultRadius)
    expect(defaultNonColorTokens.typography).toBe(defaultTypography)
    expect(defaultNonColorTokens.fontWeight).toBe(defaultFontWeight)
    expect(defaultNonColorTokens.tracking).toBe(defaultTracking)
    expect(defaultNonColorTokens.leading).toBe(defaultLeading)
    expect(defaultNonColorTokens.shadow).toBe(defaultShadow)
    expect(defaultNonColorTokens.easing).toBe(defaultEasing)
    expect(defaultNonColorTokens.motion).toBe(defaultMotion)
  })
})

describe('spacing', () => {
  it('has a base unit of 0.25rem', () => {
    expect(defaultSpacing.baseUnit).toBe(0.25)
  })
})

describe('radius', () => {
  it('has a base of 0.625rem', () => {
    expect(defaultRadius.baseRem).toBe(0.625)
  })

  it('defines multipliers for all steps', () => {
    for (const step of RADIUS_STEPS) {
      expect(defaultRadius.multipliers[step]).toBeTypeOf('number')
    }
  })

  it('has lg as the identity multiplier (1.0)', () => {
    expect(defaultRadius.multipliers.lg).toBe(1.0)
  })

  it('multipliers increase monotonically', () => {
    const values = RADIUS_STEPS.map((s) => defaultRadius.multipliers[s])
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThan(values[i - 1])
    }
  })
})

describe('typography', () => {
  it('defines all type-scale steps', () => {
    for (const step of TYPE_SCALE_STEPS) {
      const def = defaultTypography.scale[step]
      expect(def.sizeRem).toBeGreaterThan(0)
      expect(def.lineHeightRem).toBeGreaterThan(0)
      expect(def.lineHeightRem).toBeGreaterThanOrEqual(def.sizeRem)
    }
  })

  it('font sizes increase monotonically', () => {
    const sizes = TYPE_SCALE_STEPS.map((s) => defaultTypography.scale[s].sizeRem)
    for (let i = 1; i < sizes.length; i++) {
      expect(sizes[i]).toBeGreaterThan(sizes[i - 1])
    }
  })

  it('has a density dampening factor of 0.5', () => {
    expect(defaultTypography.densityDampening).toBe(0.5)
  })
})

describe('fontWeight', () => {
  it('defines all named weights', () => {
    for (const name of FONT_WEIGHT_NAMES) {
      expect(defaultFontWeight[name]).toBeTypeOf('number')
    }
  })

  it('weights increase from thin (100) to black (900)', () => {
    expect(defaultFontWeight.thin).toBe(100)
    expect(defaultFontWeight.black).toBe(900)
    const values = FONT_WEIGHT_NAMES.map((n) => defaultFontWeight[n])
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThan(values[i - 1])
    }
  })
})

describe('tracking', () => {
  it('defines all steps', () => {
    for (const step of TRACKING_STEPS) {
      expect(defaultTracking[step]).toBeTypeOf('number')
    }
  })

  it('values increase from tighter to widest', () => {
    const values = TRACKING_STEPS.map((s) => defaultTracking[s])
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThan(values[i - 1])
    }
  })

  it('normal tracking is 0', () => {
    expect(defaultTracking.normal).toBe(0)
  })
})

describe('leading', () => {
  it('defines all steps', () => {
    for (const step of LEADING_STEPS) {
      expect(defaultLeading[step]).toBeTypeOf('number')
    }
  })

  it('values increase from tight to loose', () => {
    const values = LEADING_STEPS.map((s) => defaultLeading[s])
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThan(values[i - 1])
    }
  })
})

describe('shadow', () => {
  it('defines all steps with at least one layer each', () => {
    for (const step of SHADOW_STEPS) {
      expect(defaultShadow[step].length).toBeGreaterThanOrEqual(1)
    }
  })

  it('each layer has valid opacity between 0 and 1', () => {
    for (const step of SHADOW_STEPS) {
      for (const layer of defaultShadow[step]) {
        expect(layer.opacity).toBeGreaterThan(0)
        expect(layer.opacity).toBeLessThanOrEqual(1)
      }
    }
  })
})

describe('easing', () => {
  it('defines all named curves', () => {
    for (const name of EASING_NAMES) {
      const curve = defaultEasing[name]
      expect(curve.x1).toBeTypeOf('number')
      expect(curve.y1).toBeTypeOf('number')
      expect(curve.x2).toBeTypeOf('number')
      expect(curve.y2).toBeTypeOf('number')
    }
  })
})

describe('motion', () => {
  it('defines all named animations', () => {
    for (const name of MOTION_NAMES) {
      const def = defaultMotion[name]
      expect(def.durationMs).toBeGreaterThan(0)
      expect(def.iterations).toBe('infinite')
    }
  })
})

describe('resolveSpacing', () => {
  it('returns baseUnit at density 1', () => {
    expect(resolveSpacing(1)).toBe(0.25)
  })

  it('scales linearly with density', () => {
    expect(resolveSpacing(2)).toBe(0.5)
    expect(resolveSpacing(0.5)).toBe(0.125)
  })

  it('accepts a custom config', () => {
    expect(resolveSpacing(1, { baseUnit: 0.5 })).toBe(0.5)
  })
})

describe('resolveRadius', () => {
  it('returns the base radius for the lg step', () => {
    expect(resolveRadius('lg')).toBe(0.625)
  })

  it('scales proportionally for other steps', () => {
    expect(resolveRadius('xs')).toBeCloseTo(0.625 * 0.4)
    expect(resolveRadius('xl')).toBeCloseTo(0.625 * 1.4)
  })

  it('accepts a custom base radius', () => {
    expect(resolveRadius('lg', 1.0)).toBe(1.0)
    expect(resolveRadius('xs', 1.0)).toBeCloseTo(0.4)
  })
})

describe('resolveTypeStep', () => {
  it('returns base size and line-height at density 1', () => {
    const result = resolveTypeStep('base', 1)
    expect(result.sizeRem).toBe(1.0)
    expect(result.lineHeight).toBeCloseTo(1.5)
  })

  it('returns dampened size at non-unit density', () => {
    const result = resolveTypeStep('base', 1.2)
    expect(result.sizeRem).toBeCloseTo(1.0 * (1 + (1.2 - 1) * 0.5))
  })

  it('adjusts line-height ratio to maintain visual proportion', () => {
    const d1 = resolveTypeStep('sm', 1)
    const d2 = resolveTypeStep('sm', 1.5)
    expect(d2.sizeRem).toBeGreaterThan(d1.sizeRem)
    expect(d2.lineHeight).toBeLessThan(d1.lineHeight)
  })

  it('defaults to density 1 when omitted', () => {
    const result = resolveTypeStep('xs')
    expect(result.sizeRem).toBe(0.75)
    expect(result.lineHeight).toBeCloseTo(1 / 0.75)
  })
})
