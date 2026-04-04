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

export type Palette = Record<Shade, ShadeEntry>

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

export interface NeutralSemanticTokens {
  readonly background: OklchColor
  readonly foreground: OklchColor
  readonly card: OklchColor
  readonly cardForeground: OklchColor
  readonly popover: OklchColor
  readonly popoverForeground: OklchColor
  readonly muted: OklchColor
  readonly mutedForeground: OklchColor
  readonly border: OklchColor
  readonly input: OklchColor
  readonly ring: OklchColor
}

export interface GeneratedTheme {
  readonly mode: ThemeMode
  readonly primitives: Record<string, Palette>
  readonly semantic: Record<string, SemanticColorTokens>
  readonly neutral: NeutralSemanticTokens
}

export interface ThemeConfig {
  readonly name: string
  readonly mode: ThemeMode
  readonly colors: Record<string, ColorSeed>
  readonly ink: {
    readonly dark: string
    readonly light: string
  }
  readonly lightnessCurve?: Partial<LightnessCurve>
}
