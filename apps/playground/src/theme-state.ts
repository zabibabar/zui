import type { ChromeConfig, ColorSeed, FontFamilyScale, InkConfig, SurfaceConfig } from '@zui/core'
import { presets } from '@zui/core'
import { DEFAULT_PLAYGROUND_FONTS } from './font-options'

export const REQUIRED_COLOR_INTENTS = [
  'primary',
  'neutral',
  'danger',
  'info',
  'success',
  'warning',
] as const

export const COLOR_INTENTS = [
  'primary',
  'secondary',
  'neutral',
  'danger',
  'info',
  'success',
  'warning',
] as const

export type RequiredColorIntent = (typeof REQUIRED_COLOR_INTENTS)[number]
export type ColorIntent = (typeof COLOR_INTENTS)[number]
export type ThemeSeeds = Record<RequiredColorIntent, ColorSeed> &
  Partial<Record<'secondary', ColorSeed>>

export interface PlaygroundThemeState {
  readonly seeds: ThemeSeeds
  readonly ink: InkConfig
  readonly surfaces: SurfaceConfig
  readonly chrome: ChromeConfig
  readonly density: string
  readonly radius: string
  readonly fonts: FontFamilyScale
  readonly trackingOffsetEm: number
}

/** Partial update applied on top of a full {@link PlaygroundThemeState}. */
export interface PlaygroundThemePatch {
  readonly seeds?: Partial<Record<ColorIntent, ColorSeed>>
  readonly ink?: InkConfig
  readonly surfaces?: SurfaceConfig
  readonly chrome?: ChromeConfig
  readonly density?: string
  readonly radius?: string
  readonly fonts?: Partial<FontFamilyScale>
  readonly trackingOffsetEm?: number
}

/**
 * Baseline playground state. `density` and `radius` defaults must match
 * `:root` in `styles/base.css`.
 */
export function defaultPlaygroundThemeState(): PlaygroundThemeState {
  return {
    seeds: {
      primary: presets.blue,
      neutral: presets.slate,
      danger: presets.red,
      info: presets.cyan,
      success: presets.green,
      warning: presets.amber,
    },
    ink: {},
    surfaces: {},
    chrome: {},
    density: '1',
    radius: '0.625rem',
    fonts: DEFAULT_PLAYGROUND_FONTS,
    trackingOffsetEm: 0,
  }
}

/** Deep-merge preset patch into baseline theme state (playground only). */
export function mergePlaygroundPreset(
  base: PlaygroundThemeState,
  patch: PlaygroundThemePatch,
): PlaygroundThemeState {
  let seeds = base.seeds
  if (patch.seeds) {
    seeds = { ...base.seeds }
    for (const key of COLOR_INTENTS) {
      const p = patch.seeds[key]
      if (p) seeds = { ...seeds, [key]: p }
    }
  }

  const ink = patch.ink !== undefined ? { ...base.ink, ...patch.ink } : base.ink

  const surfaces =
    patch.surfaces !== undefined ? { ...base.surfaces, ...patch.surfaces } : base.surfaces

  const chrome = patch.chrome !== undefined ? { ...base.chrome, ...patch.chrome } : base.chrome

  const fonts = patch.fonts !== undefined ? { ...base.fonts, ...patch.fonts } : base.fonts

  return {
    seeds,
    ink,
    surfaces,
    chrome,
    density: patch.density ?? base.density,
    radius: patch.radius ?? base.radius,
    fonts,
    trackingOffsetEm: patch.trackingOffsetEm ?? base.trackingOffsetEm,
  }
}
