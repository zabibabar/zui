export const SHADE_KEYS = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
] as const

export type Shade = (typeof SHADE_KEYS)[number]

export interface ColorSeed {
  readonly hue: number
  readonly chroma: number
  /** OKLCH lightness (0–1) at the anchor shade after curve shift (brand “main” stop). */
  readonly anchorLightness: number
}

export interface OklchColor {
  readonly l: number
  readonly c: number
  readonly h: number
}

export interface ShadeEntry {
  readonly shade: Shade
  readonly oklch: OklchColor
  readonly foreground: 'dark' | 'light'
}

export type LightnessCurve = Record<Shade, number>

export type Palette = { readonly [K in Shade]: ShadeEntry } & {
  readonly anchorShadeIndex: number
}

export interface InkColors {
  readonly dark: OklchColor
  readonly light: OklchColor
}

export type ThemeMode = 'light' | 'dark'

export interface SemanticColorTokens {
  readonly base: OklchColor
  readonly foreground: 'dark' | 'light'
  readonly hover: OklchColor
  readonly active: OklchColor
  readonly subtle: OklchColor
  readonly subtleForeground: 'dark' | 'light'
  readonly border: OklchColor
}

export interface SurfaceTokens {
  readonly base: OklchColor
  readonly raised: OklchColor
  readonly overlay: OklchColor
}

/** Resolved chrome tokens (hairlines, controls, focus ring). */
export interface ChromeTokens {
  readonly border: OklchColor
  readonly input: OklchColor
  readonly ring: OklchColor
}

/** Muted surface fill and secondary text (shadcn `--muted` / `--muted-foreground`). */
export interface MutedTokens {
  readonly background: OklchColor
  readonly foreground: OklchColor
}

export interface GeneratedTheme {
  readonly mode: ThemeMode
  readonly primitives: Record<string, Palette>
  readonly semantic: Record<string, SemanticColorTokens>
  readonly chrome: ChromeTokens
  readonly muted: MutedTokens
  readonly surfaces: SurfaceTokens
  readonly ink: InkColors
}

export interface SurfaceConfig {
  readonly base?: OklchColor
  readonly raised?: OklchColor
  readonly overlay?: OklchColor
}

export interface InkConfig {
  readonly dark?: OklchColor
  readonly light?: OklchColor
}

export interface ChromeConfig {
  readonly border?: OklchColor
  readonly input?: OklchColor
  readonly ring?: OklchColor
}

export interface ThemeConfig {
  readonly name: string
  readonly mode: ThemeMode
  readonly colors: Record<string, ColorSeed>
  readonly ink?: InkConfig
  readonly surfaces?: SurfaceConfig
  readonly chrome?: ChromeConfig
  readonly lightnessCurve?: Partial<LightnessCurve>
}
