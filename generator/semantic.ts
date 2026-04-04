import type {
  GeneratedTheme,
  NeutralSemanticTokens,
  OklchColor,
  Palette,
  SemanticColorTokens,
  Shade,
  ThemeMode,
} from './types'
import colorMappingJson from '../tokens/semantic/color-mapping.json'

interface ColorIntentMapping {
  readonly light: Shade
  readonly dark: Shade
}

interface ColorMappingConfig {
  readonly colorIntents: {
    readonly base: ColorIntentMapping
    readonly hover: ColorIntentMapping
    readonly active: ColorIntentMapping
    readonly subtle: ColorIntentMapping
    readonly border: ColorIntentMapping
    readonly [key: string]: ColorIntentMapping | { readonly description: string }
  }
  readonly neutralMapping: {
    readonly light: Record<string, Shade>
    readonly dark: Record<string, Shade>
  }
}

const colorMapping = colorMappingJson as unknown as ColorMappingConfig

function getShade(mapping: ColorIntentMapping, mode: ThemeMode): Shade {
  return mapping[mode]
}

/**
 * Map a generated palette to semantic color tokens for a specific theme mode.
 */
export function mapSemanticColors(palette: Palette, mode: ThemeMode): SemanticColorTokens {
  const intents = colorMapping.colorIntents

  const baseShade = getShade(intents.base as ColorIntentMapping, mode)
  const hoverShade = getShade(intents.hover as ColorIntentMapping, mode)
  const activeShade = getShade(intents.active as ColorIntentMapping, mode)
  const subtleShade = getShade(intents.subtle as ColorIntentMapping, mode)
  const borderShade = getShade(intents.border as ColorIntentMapping, mode)

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
 * Map the neutral palette to page-level semantic tokens (background, foreground, border, etc.).
 */
export function mapNeutralSemantics(
  neutralPalette: Palette,
  mode: ThemeMode,
): NeutralSemanticTokens {
  const mapping = colorMapping.neutralMapping[mode]

  const get = (key: string): OklchColor => neutralPalette[mapping[key] as Shade].oklch

  return {
    background: get('background'),
    foreground: get('foreground'),
    card: get('card'),
    cardForeground: get('cardForeground'),
    popover: get('popover'),
    popoverForeground: get('popoverForeground'),
    muted: get('muted'),
    mutedForeground: get('mutedForeground'),
    border: get('border'),
    input: get('input'),
    ring: get('ring'),
  }
}

/**
 * Generate a complete themed token set from palettes and a theme mode.
 *
 * @param palettes - Record of intent name → palette (e.g. { primary: Palette, danger: Palette, neutral: Palette })
 * @param mode - 'light' or 'dark'
 * @returns A GeneratedTheme with primitives, semantic color tokens, and neutral semantic tokens
 */
export function generateTheme(palettes: Record<string, Palette>, mode: ThemeMode): GeneratedTheme {
  const neutralPalette = palettes.neutral
  if (!neutralPalette) {
    throw new Error('A "neutral" palette is required for page-level semantic tokens.')
  }

  const semantic: Record<string, SemanticColorTokens> = {}

  for (const [name, palette] of Object.entries(palettes)) {
    if (name === 'neutral') continue
    semantic[name] = mapSemanticColors(palette, mode)
  }

  const neutral = mapNeutralSemantics(neutralPalette, mode)

  return {
    mode,
    primitives: palettes,
    semantic,
    neutral,
  }
}
