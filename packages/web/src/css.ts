import type { GeneratedTheme, OklchColor } from '@zui/core'
import { SHADE_KEYS } from '@zui/core'
import { oklchToCss } from './format'

function cssVar(name: string, value: string): string {
  return `--${name}: ${value};`
}

function formatColor(color: OklchColor): string {
  return oklchToCss(color)
}

/** Map palette foreground role to ink CSS variables (valid `<color>` values). */
function foregroundRef(role: 'dark' | 'light'): string {
  return role === 'dark' ? 'var(--ink-dark)' : 'var(--ink-light)'
}

function renderPrimitives(theme: GeneratedTheme): string[] {
  const lines: string[] = []

  for (const [name, palette] of Object.entries(theme.primitives)) {
    for (const shade of SHADE_KEYS) {
      const entry = palette[shade]
      lines.push(cssVar(`${name}-${shade}`, formatColor(entry.oklch)))
      lines.push(cssVar(`${name}-${shade}-foreground`, foregroundRef(entry.foreground)))
    }
  }

  return lines
}

function renderSemanticColors(theme: GeneratedTheme): string[] {
  const lines: string[] = []

  for (const [name, tokens] of Object.entries(theme.semantic)) {
    lines.push(cssVar(name, formatColor(tokens.base)))
    lines.push(cssVar(`${name}-foreground`, foregroundRef(tokens.foreground)))
    lines.push(cssVar(`${name}-hover`, formatColor(tokens.hover)))
    lines.push(cssVar(`${name}-active`, formatColor(tokens.active)))
    lines.push(cssVar(`${name}-subtle`, formatColor(tokens.subtle)))
    lines.push(cssVar(`${name}-subtle-foreground`, foregroundRef(tokens.subtleForeground)))
    lines.push(cssVar(`${name}-border`, formatColor(tokens.border)))
  }

  return lines
}

function renderInk(theme: GeneratedTheme): string[] {
  return [
    cssVar('ink-dark', formatColor(theme.ink.dark)),
    cssVar('ink-light', formatColor(theme.ink.light)),
  ]
}

function renderSurfaces(theme: GeneratedTheme): string[] {
  return [
    cssVar('surface-base', formatColor(theme.surfaces.base)),
    cssVar('surface-raised', formatColor(theme.surfaces.raised)),
    cssVar('surface-overlay', formatColor(theme.surfaces.overlay)),
  ]
}

function renderShadcnAliases(theme: GeneratedTheme): string[] {
  const fg = theme.mode === 'light' ? 'ink-dark' : 'ink-light'
  return [
    cssVar('background', 'var(--surface-base)'),
    cssVar('foreground', `var(--${fg})`),
    cssVar('card', 'var(--surface-raised)'),
    cssVar('card-foreground', `var(--${fg})`),
    cssVar('popover', 'var(--surface-overlay)'),
    cssVar('popover-foreground', `var(--${fg})`),
  ]
}

function renderMuted(theme: GeneratedTheme): string[] {
  const m = theme.muted
  return [
    cssVar('muted', formatColor(m.background)),
    cssVar('muted-foreground', formatColor(m.foreground)),
  ]
}

function renderChrome(theme: GeneratedTheme): string[] {
  const c = theme.chrome
  return [
    cssVar('border', formatColor(c.border)),
    cssVar('input', formatColor(c.input)),
    cssVar('ring', formatColor(c.ring)),
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

  lines.push(...renderInk(theme))
  lines.push('')

  if (includePrimitives) {
    lines.push(...renderPrimitives(theme))
    lines.push('')
  }

  lines.push(...renderSemanticColors(theme))
  lines.push('')
  lines.push(...renderSurfaces(theme))
  lines.push('')
  lines.push(...renderShadcnAliases(theme))
  lines.push('')
  lines.push(...renderMuted(theme))
  lines.push('')
  lines.push(...renderChrome(theme))

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
