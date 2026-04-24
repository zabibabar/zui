import type {
  ChromeConfig,
  ChromeTokens,
  ColorSeed,
  GeneratedTheme,
  InkColors,
  InkConfig,
  MutedTokens,
  OklchColor,
  Palette,
  SemanticColorTokens,
  Shade,
  SurfaceConfig,
  SurfaceTokens,
  ThemeMode,
} from '../types/theme'
import { presets } from '../primitives/presets'
import { SHADE_KEYS } from '../types/theme'
import { assignForegrounds } from '../utils/contrast'
import { generatePalette } from '../utils/palette'
import colorMappingJson from './color-mapping.json'

interface ColorIntentOffsetMapping {
  readonly light: number
  readonly dark: number
}

interface ColorMappingConfig {
  readonly colorIntents: {
    readonly base: ColorIntentOffsetMapping
    readonly hover: ColorIntentOffsetMapping
    readonly active: ColorIntentOffsetMapping
    readonly subtle: ColorIntentOffsetMapping
    readonly border: ColorIntentOffsetMapping
    readonly [key: string]: ColorIntentOffsetMapping | { readonly description: string }
  }
}

const colorMapping = colorMappingJson as unknown as ColorMappingConfig

function resolveShadeFromAnchor(anchorShadeIndex: number, offset: number): Shade {
  const idx = Math.min(SHADE_KEYS.length - 1, Math.max(0, anchorShadeIndex + offset))
  return SHADE_KEYS[idx]
}

const DEFAULT_INK: InkColors = {
  dark: { l: 0.145, c: 0, h: 0 },
  light: { l: 0.985, c: 0, h: 0 },
}

const DEFAULT_SURFACES: Record<ThemeMode, SurfaceTokens> = {
  light: {
    base: { l: 0.985, c: 0, h: 0 },
    raised: { l: 1, c: 0, h: 0 },
    overlay: { l: 1, c: 0, h: 0 },
  },
  dark: {
    base: { l: 0.13, c: 0, h: 0 },
    raised: { l: 0.17, c: 0, h: 0 },
    overlay: { l: 0.17, c: 0, h: 0 },
  },
}

/** Linear OKLCH mix; hue takes shortest arc around the circle. */
export function mixOklch(a: OklchColor, b: OklchColor, t: number): OklchColor {
  const clampT = Math.min(1, Math.max(0, t))
  let dh = b.h - a.h
  if (dh > 180) dh -= 360
  if (dh < -180) dh += 360
  let h = a.h + dh * clampT
  if (h < 0) h += 360
  if (h >= 360) h -= 360
  return {
    l: a.l + (b.l - a.l) * clampT,
    c: a.c + (b.c - a.c) * clampT,
    h,
  }
}

/**
 * Muted surface fill: slightly off the app background, using surface chroma/hue.
 */
export function deriveMutedBackground(surfaces: SurfaceTokens, mode: ThemeMode): OklchColor {
  const { base, raised } = surfaces
  if (mode === 'light') {
    return {
      l: Math.min(1, Math.max(0, base.l - 0.055)),
      c: base.c,
      h: base.h,
    }
  }
  return {
    l: Math.min(0.5, Math.max(0, raised.l + 0.2)),
    c: raised.c,
    h: raised.h,
  }
}

/**
 * Secondary text: blend body ink toward the app background so it tracks readability
 * without using the neutral ramp.
 */
export function deriveMutedForeground(
  ink: InkColors,
  surfaces: SurfaceTokens,
  mode: ThemeMode,
): OklchColor {
  const bodyInk = mode === 'light' ? ink.dark : ink.light
  const t = mode === 'light' ? 0.42 : 0.35
  return mixOklch(bodyInk, surfaces.base, t)
}

function defaultChromeBorderInput(surfaces: SurfaceTokens, mode: ThemeMode): OklchColor {
  const { base, raised } = surfaces
  if (mode === 'light') {
    return {
      l: Math.min(1, Math.max(0, base.l - 0.115)),
      c: base.c,
      h: base.h,
    }
  }
  return {
    l: Math.min(0.55, Math.max(0, raised.l + 0.2)),
    c: raised.c,
    h: raised.h,
  }
}

/** Primary ramp stop used as default focus ring (`--ring`) when `chrome.ring` is omitted. */
const DEFAULT_RING_PRIMARY_SHADE: Shade = '300'

function defaultRingFromPrimary(palette: Palette, _mode: ThemeMode): OklchColor {
  return palette[DEFAULT_RING_PRIMARY_SHADE].oklch
}

/**
 * Resolve border, input, and ring from surfaces + primary palette, with optional overrides.
 * Default ring is the primary primitive `300` stop (lighter tint on the brand ramp).
 * When only `border` is overridden, `input` matches the resolved border if not set.
 */
export function resolveChrome(
  surfaces: SurfaceTokens,
  mode: ThemeMode,
  primaryPalette: Palette,
  config?: ChromeConfig,
): ChromeTokens {
  const borderDefault = defaultChromeBorderInput(surfaces, mode)
  const border = config?.border ?? borderDefault
  const input = config?.input ?? border
  const ringDefault = defaultRingFromPrimary(primaryPalette, mode)
  const ring = config?.ring ?? ringDefault
  return { border, input, ring }
}

/**
 * Map a generated palette to semantic color tokens for a specific theme mode.
 */
export function mapSemanticColors(palette: Palette, mode: ThemeMode): SemanticColorTokens {
  const intents = colorMapping.colorIntents
  const anchor = palette.anchorShadeIndex

  const baseShade = resolveShadeFromAnchor(anchor, (intents.base as ColorIntentOffsetMapping)[mode])
  const hoverShade = resolveShadeFromAnchor(
    anchor,
    (intents.hover as ColorIntentOffsetMapping)[mode],
  )
  const activeShade = resolveShadeFromAnchor(
    anchor,
    (intents.active as ColorIntentOffsetMapping)[mode],
  )
  const subtleShade = resolveShadeFromAnchor(
    anchor,
    (intents.subtle as ColorIntentOffsetMapping)[mode],
  )
  const borderShade = resolveShadeFromAnchor(
    anchor,
    (intents.border as ColorIntentOffsetMapping)[mode],
  )

  return {
    base: palette[baseShade].oklch,
    foreground: palette[baseShade].foreground,
    hover: palette[hoverShade].oklch,
    active: palette[activeShade].oklch,
    subtle: palette[subtleShade].oklch,
    subtleForeground: palette[subtleShade].foreground,
    border: palette[borderShade].oklch,
  }
}

/**
 * Resolve ink colors from an optional consumer config, falling back to defaults.
 */
export function resolveInk(config?: InkConfig): InkColors {
  return {
    dark: config?.dark ?? DEFAULT_INK.dark,
    light: config?.light ?? DEFAULT_INK.light,
  }
}

/**
 * Resolve surface colors from an optional consumer config, with cascading defaults.
 *
 * Cascade: base → raised (derived from base) → overlay (same as raised)
 */
export function resolveSurfaces(mode: ThemeMode, config?: SurfaceConfig): SurfaceTokens {
  const defaults = DEFAULT_SURFACES[mode]

  const base = config?.base ?? defaults.base

  const raisedDefault = deriveSurfaceRaised(base, mode)
  const raised = config?.raised ?? raisedDefault

  const overlay = config?.overlay ?? raised

  return { base, raised, overlay }
}

function deriveSurfaceRaised(base: OklchColor, mode: ThemeMode): OklchColor {
  const offset = mode === 'light' ? 0.015 : 0.04
  return {
    l: Math.min(1, Math.max(0, base.l + offset)),
    c: base.c,
    h: base.h,
  }
}

/** Default seeds when danger / info / success / warning palettes are omitted. */
const DEFAULT_OPTIONAL_INTENT_SEEDS: Record<'danger' | 'info' | 'success' | 'warning', ColorSeed> =
  {
    danger: presets.red,
    info: presets.cyan,
    success: presets.green,
    warning: presets.amber,
  }

/**
 * Fill missing optional intent palettes using curated presets and the resolved ink pair.
 */
function mergeOptionalIntentPalettes(
  palettes: Record<string, Palette>,
  ink: InkColors,
): Record<string, Palette> {
  const merged: Record<string, Palette> = {
    ...palettes,
    secondary: palettes.secondary ?? palettes.primary,
  }
  for (const [name, seed] of Object.entries(DEFAULT_OPTIONAL_INTENT_SEEDS) as [
    keyof typeof DEFAULT_OPTIONAL_INTENT_SEEDS,
    ColorSeed,
  ][]) {
    if (merged[name] === undefined) {
      merged[name] = assignForegrounds(generatePalette(seed), ink)
    }
  }
  return merged
}

export interface GenerateThemeOptions {
  readonly surfaces?: SurfaceConfig
  readonly ink?: InkConfig
  readonly chrome?: ChromeConfig
}

/**
 * Generate a complete themed token set from palettes, mode, and optional surface/ink/chrome config.
 */
export function generateTheme(
  palettes: Record<string, Palette>,
  mode: ThemeMode,
  options?: GenerateThemeOptions,
): GeneratedTheme {
  if (!palettes.primary) {
    throw new Error('A "primary" palette is required.')
  }

  const neutralPalette = palettes.neutral
  if (!neutralPalette) {
    throw new Error(
      'A "neutral" palette is required for neutral primitives and semantic neutral intent.',
    )
  }

  const ink = resolveInk(options?.ink)
  const mergedPalettes = mergeOptionalIntentPalettes(palettes, ink)

  const semantic: Record<string, SemanticColorTokens> = {}

  for (const [name, palette] of Object.entries(mergedPalettes)) {
    semantic[name] = mapSemanticColors(palette, mode)
  }

  const surfaces = resolveSurfaces(mode, options?.surfaces)
  const muted: MutedTokens = {
    background: deriveMutedBackground(surfaces, mode),
    foreground: deriveMutedForeground(ink, surfaces, mode),
  }
  const chrome = resolveChrome(surfaces, mode, mergedPalettes.primary, options?.chrome)

  return {
    mode,
    primitives: mergedPalettes,
    semantic,
    chrome,
    muted,
    surfaces,
    ink,
  }
}
