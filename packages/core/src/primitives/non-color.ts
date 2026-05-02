// ── Spacing ──

export interface SpacingConfig {
  /** Base spacing unit in rem. Multiply by density at runtime. */
  readonly baseUnit: number
}

// ── Radius ──

export type RadiusStep = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'

export const RADIUS_STEPS: readonly RadiusStep[] = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
] as const

export type RadiusMultipliers = Readonly<Record<RadiusStep, number>>

export interface RadiusConfig {
  /** Default base radius in rem (overridable per-theme via `--radius`). */
  readonly baseRem: number
  /** Scale multipliers relative to the base radius. `lg` is 1.0 (the base). */
  readonly multipliers: RadiusMultipliers
}

// ── Typography ──

export type TypeScaleStep = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'

export const TYPE_SCALE_STEPS: readonly TypeScaleStep[] = [
  'xs',
  'sm',
  'base',
  'lg',
  'xl',
  '2xl',
  '3xl',
] as const

export interface TypeStepDefinition {
  /** Font size in rem at density 1. */
  readonly sizeRem: number
  /** Target line height in rem at density 1. */
  readonly lineHeightRem: number
}

export type TypeScale = Readonly<Record<TypeScaleStep, TypeStepDefinition>>

export interface TypographyConfig {
  readonly scale: TypeScale
  /**
   * How much density affects font sizes (0–1).
   * 0 = font sizes ignore density, 1 = font sizes scale linearly with density.
   */
  readonly densityDampening: number
}

// ── Font Weights ──

export type FontWeightName =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black'

export const FONT_WEIGHT_NAMES: readonly FontWeightName[] = [
  'thin',
  'extralight',
  'light',
  'normal',
  'medium',
  'semibold',
  'bold',
  'extrabold',
  'black',
] as const

export type FontWeightScale = Readonly<Record<FontWeightName, number>>

// ── Font Families ──

export type FontFamilyName = 'sans' | 'serif' | 'mono'

export const FONT_FAMILY_NAMES: readonly FontFamilyName[] = ['sans', 'serif', 'mono'] as const

/** Complete CSS font-family stacks. */
export type FontFamilyScale = Readonly<Record<FontFamilyName, string>>

// ── Letter Spacing (tracking) ──

export type TrackingStep = 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest'

export const TRACKING_STEPS: readonly TrackingStep[] = [
  'tighter',
  'tight',
  'normal',
  'wide',
  'wider',
  'widest',
] as const

/** Values in em. */
export type TrackingScale = Readonly<Record<TrackingStep, number>>

// ── Line Height (leading) ──

export type LeadingStep = 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose'

export const LEADING_STEPS: readonly LeadingStep[] = [
  'tight',
  'snug',
  'normal',
  'relaxed',
  'loose',
] as const

/** Unitless line-height values. */
export type LeadingScale = Readonly<Record<LeadingStep, number>>

// ── Shadows ──

export interface ShadowLayer {
  readonly offsetX: number
  readonly offsetY: number
  /** Blur radius in px. */
  readonly blur: number
  /** Spread radius in px. */
  readonly spread: number
  /** Black-channel opacity (0–1). */
  readonly opacity: number
}

export type ShadowStep = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export const SHADOW_STEPS: readonly ShadowStep[] = [
  '2xs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
] as const

export type ShadowScale = Readonly<Record<ShadowStep, readonly ShadowLayer[]>>

// ── Easing ──

export interface CubicBezier {
  readonly x1: number
  readonly y1: number
  readonly x2: number
  readonly y2: number
}

export type EasingName = 'in' | 'out' | 'inOut'

export const EASING_NAMES: readonly EasingName[] = ['in', 'out', 'inOut'] as const

export type EasingScale = Readonly<Record<EasingName, CubicBezier>>

// ── Motion ──

export interface MotionDefinition {
  readonly durationMs: number
  readonly easing: CubicBezier | 'linear'
  readonly iterations: 'infinite' | number
}

export type MotionName = 'spin' | 'ping' | 'pulse' | 'bounce'

export const MOTION_NAMES: readonly MotionName[] = ['spin', 'ping', 'pulse', 'bounce'] as const

export type MotionScale = Readonly<Record<MotionName, MotionDefinition>>

// ── Aggregate ──

export interface NonColorTokens {
  readonly spacing: SpacingConfig
  readonly radius: RadiusConfig
  readonly typography: TypographyConfig
  readonly fontFamily?: FontFamilyScale
  readonly fontWeight: FontWeightScale
  readonly fontFamily: FontFamilyScale
  readonly tracking: TrackingScale
  readonly trackingOffsetEm?: number
  readonly leading: LeadingScale
  readonly shadow: ShadowScale
  readonly easing: EasingScale
  readonly motion: MotionScale
}

// ═══════════════════════════════════════════════════════════════════════════════
// Default Values
// ═══════════════════════════════════════════════════════════════════════════════

export const defaultSpacing: SpacingConfig = {
  baseUnit: 0.25,
}

export const defaultRadius: RadiusConfig = {
  baseRem: 0.625,
  multipliers: {
    xs: 0.4,
    sm: 0.6,
    md: 0.8,
    lg: 1.0,
    xl: 1.4,
    '2xl': 1.8,
    '3xl': 2.2,
    '4xl': 2.6,
  },
}

export const defaultTypography: TypographyConfig = {
  scale: {
    xs: { sizeRem: 0.75, lineHeightRem: 1.0 },
    sm: { sizeRem: 0.875, lineHeightRem: 1.25 },
    base: { sizeRem: 1.0, lineHeightRem: 1.5 },
    lg: { sizeRem: 1.125, lineHeightRem: 1.75 },
    xl: { sizeRem: 1.25, lineHeightRem: 1.75 },
    '2xl': { sizeRem: 1.5, lineHeightRem: 2.0 },
    '3xl': { sizeRem: 1.875, lineHeightRem: 2.25 },
  },
  densityDampening: 0.5,
}

export const defaultFontWeight: FontWeightScale = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
}

export const defaultFontFamily: FontFamilyScale = {
  sans: 'ui-sans-serif, system-ui, sans-serif',
  serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
}

export const defaultTracking: TrackingScale = {
  tighter: -0.05,
  tight: -0.025,
  normal: 0,
  wide: 0.025,
  wider: 0.05,
  widest: 0.1,
}

export const defaultLeading: LeadingScale = {
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
}

export const defaultShadow: ShadowScale = {
  '2xs': [{ offsetX: 0, offsetY: 1, blur: 0, spread: 0, opacity: 0.05 }],
  xs: [{ offsetX: 0, offsetY: 1, blur: 2, spread: 0, opacity: 0.05 }],
  sm: [
    { offsetX: 0, offsetY: 1, blur: 3, spread: 0, opacity: 0.1 },
    { offsetX: 0, offsetY: 1, blur: 2, spread: -1, opacity: 0.1 },
  ],
  md: [
    { offsetX: 0, offsetY: 4, blur: 6, spread: -1, opacity: 0.1 },
    { offsetX: 0, offsetY: 2, blur: 4, spread: -2, opacity: 0.1 },
  ],
  lg: [
    { offsetX: 0, offsetY: 10, blur: 15, spread: -3, opacity: 0.1 },
    { offsetX: 0, offsetY: 4, blur: 6, spread: -4, opacity: 0.1 },
  ],
  xl: [
    { offsetX: 0, offsetY: 20, blur: 25, spread: -5, opacity: 0.1 },
    { offsetX: 0, offsetY: 8, blur: 10, spread: -6, opacity: 0.1 },
  ],
  '2xl': [{ offsetX: 0, offsetY: 25, blur: 50, spread: -12, opacity: 0.25 }],
}

export const defaultEasing: EasingScale = {
  in: { x1: 0.4, y1: 0, x2: 1, y2: 1 },
  out: { x1: 0, y1: 0, x2: 0.2, y2: 1 },
  inOut: { x1: 0.4, y1: 0, x2: 0.2, y2: 1 },
}

export const defaultMotion: MotionScale = {
  spin: { durationMs: 1000, easing: 'linear', iterations: 'infinite' },
  ping: { durationMs: 1000, easing: { x1: 0, y1: 0, x2: 0.2, y2: 1 }, iterations: 'infinite' },
  pulse: {
    durationMs: 2000,
    easing: { x1: 0.4, y1: 0, x2: 0.6, y2: 1 },
    iterations: 'infinite',
  },
  bounce: {
    durationMs: 1000,
    easing: { x1: 0.25, y1: 0.1, x2: 0.25, y2: 1 },
    iterations: 'infinite',
  },
}

/** Canonical ZUI non-color primitive token defaults. */
export const defaultNonColorTokens: NonColorTokens = {
  spacing: defaultSpacing,
  radius: defaultRadius,
  typography: defaultTypography,
  fontFamily: defaultFontFamily,
  fontWeight: defaultFontWeight,
  fontFamily: defaultFontFamily,
  tracking: defaultTracking,
  trackingOffsetEm: 0,
  leading: defaultLeading,
  shadow: defaultShadow,
  easing: defaultEasing,
  motion: defaultMotion,
}

// ═══════════════════════════════════════════════════════════════════════════════
// Resolution Functions
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Compute the spacing unit (in rem) for a given density.
 *
 * Native platforms call this to get the actual value instead of using
 * `calc(0.25rem * var(--density))`.
 */
export function resolveSpacing(density: number, config: SpacingConfig = defaultSpacing): number {
  return config.baseUnit * density
}

/**
 * Compute a radius value (in rem) for a scale step at a given base radius.
 */
export function resolveRadius(
  step: RadiusStep,
  baseRem: number = defaultRadius.baseRem,
  config: RadiusConfig = defaultRadius,
): number {
  return baseRem * config.multipliers[step]
}

export interface ResolvedTypeStep {
  readonly sizeRem: number
  /** Unitless line-height ratio (suitable for CSS `line-height`). */
  readonly lineHeight: number
}

/**
 * Compute font size and line-height for a type-scale step at a given density.
 *
 * The density dampening means typography scales at a fraction of the density
 * change: `size = baseSizeRem * (1 + (density - 1) * dampening)`.
 */
export function resolveTypeStep(
  step: TypeScaleStep,
  density: number = 1,
  config: TypographyConfig = defaultTypography,
): ResolvedTypeStep {
  const def = config.scale[step]
  const densityFactor = 1 + (density - 1) * config.densityDampening
  const sizeRem = def.sizeRem * densityFactor
  return {
    sizeRem,
    lineHeight: def.lineHeightRem / sizeRem,
  }
}
