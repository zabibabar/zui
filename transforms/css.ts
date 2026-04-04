import type { GeneratedTheme, OklchColor } from '../generator/types'
import { oklchToCss } from '../generator/palette'
import { SHADE_KEYS } from '../generator/types'

function cssVar(name: string, value: string): string {
  return `  --${name}: ${value};`
}

function formatColor(color: OklchColor): string {
  return oklchToCss(color)
}

/**
 * Render primitive color palette tokens as CSS custom properties.
 * Outputs: --{name}-{shade}: oklch(...)
 */
function renderPrimitives(theme: GeneratedTheme): string[] {
  const lines: string[] = []

  for (const [name, palette] of Object.entries(theme.primitives)) {
    for (const shade of SHADE_KEYS) {
      const entry = palette[shade]
      lines.push(cssVar(`${name}-${shade}`, formatColor(entry.oklch)))
      lines.push(cssVar(`${name}-${shade}-foreground`, entry.foreground))
    }
  }

  return lines
}

/**
 * Render semantic color intent tokens as CSS custom properties.
 * Outputs shadcn-compatible names: --primary, --primary-foreground, --primary-hover, etc.
 */
function renderSemanticColors(theme: GeneratedTheme): string[] {
  const lines: string[] = []

  for (const [name, tokens] of Object.entries(theme.semantic)) {
    lines.push(cssVar(name, formatColor(tokens.base)))
    lines.push(cssVar(`${name}-foreground`, tokens.foreground))
    lines.push(cssVar(`${name}-hover`, formatColor(tokens.hover)))
    lines.push(cssVar(`${name}-active`, formatColor(tokens.active)))
    lines.push(cssVar(`${name}-subtle`, formatColor(tokens.subtle)))
    lines.push(cssVar(`${name}-subtle-foreground`, tokens.subtleForeground))
    lines.push(cssVar(`${name}-border`, formatColor(tokens.border)))
  }

  return lines
}

/**
 * Render neutral/page-level semantic tokens as CSS custom properties.
 * These map directly to shadcn's expected variable names.
 */
function renderNeutralSemantics(theme: GeneratedTheme): string[] {
  const n = theme.neutral
  return [
    cssVar('background', formatColor(n.background)),
    cssVar('foreground', formatColor(n.foreground)),
    cssVar('card', formatColor(n.card)),
    cssVar('card-foreground', formatColor(n.cardForeground)),
    cssVar('popover', formatColor(n.popover)),
    cssVar('popover-foreground', formatColor(n.popoverForeground)),
    cssVar('muted', formatColor(n.muted)),
    cssVar('muted-foreground', formatColor(n.mutedForeground)),
    cssVar('border', formatColor(n.border)),
    cssVar('input', formatColor(n.input)),
    cssVar('ring', formatColor(n.ring)),
  ]
}

export interface CssTransformOptions {
  /**
   * CSS selector to scope the variables under.
   * @default `[data-theme="${theme.mode}"]`
   */
  readonly selector?: string

  /** Whether to include primitive palette tokens in the output. */
  readonly includePrimitives?: boolean
}

/**
 * Transform a GeneratedTheme into a CSS string with custom properties.
 *
 * Output is scoped under a `[data-theme="..."]` selector by default,
 * making it compatible with shadcn's theming approach.
 */
export function themeToCss(theme: GeneratedTheme, options?: CssTransformOptions): string {
  const selector = options?.selector ?? `[data-theme="${theme.mode}"]`
  const includePrimitives = options?.includePrimitives ?? true

  const lines: string[] = []

  if (includePrimitives) {
    lines.push(...renderPrimitives(theme))
    lines.push('')
  }

  lines.push(...renderSemanticColors(theme))
  lines.push('')
  lines.push(...renderNeutralSemantics(theme))

  const body = lines.map((line) => (line === '' ? '' : `  ${line}`)).join('\n')

  return `${selector} {\n${body}\n}\n`
}

/**
 * Generate CSS for multiple themes (e.g. light + dark) and concatenate them.
 */
export function themesToCss(
  themes: GeneratedTheme[],
  options?: Omit<CssTransformOptions, 'selector'>,
): string {
  return themes.map((theme) => themeToCss(theme, options)).join('\n')
}
