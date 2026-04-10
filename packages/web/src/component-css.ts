import type { ComponentTokens } from '@zui/core'
import { COMPONENT_NAMES, defaultComponentTokens } from '@zui/core'

// ─────────────────────────────────────────────────────────────────────────────
// Naming
// ─────────────────────────────────────────────────────────────────────────────

function toKebabCase(s: string): string {
  return s.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase()
}

const CSS_NAME_OVERRIDES: Readonly<Record<string, string>> = {
  button: 'btn',
  input: 'input-field',
}

function cssComponentName(key: string): string {
  return CSS_NAME_OVERRIDES[key] ?? toKebabCase(key)
}

const SUB_PART_ABBR: Readonly<Record<string, string>> = {
  description: 'desc',
}

function subPartName(key: string): string {
  return SUB_PART_ABBR[key] ?? toKebabCase(key)
}

// ─────────────────────────────────────────────────────────────────────────────
// Property → CSS variable mapping
// ─────────────────────────────────────────────────────────────────────────────

/** Spacing property → suffix appended after the component/part CSS name. */
const SPACING_SUFFIX: Readonly<Record<string, string>> = {
  height: '',
  minHeight: '',
  padding: '',
  paddingX: '-x',
  paddingY: '-y',
  paddingBottom: '-b',
  paddingLeft: '-pl',
  paddingRight: '-pr',
  gap: '-gap',
  size: '',
  width: '-w',
  minWidth: '-min-w',
  thickness: '',
  marginTop: '-mt',
  iconSize: '-icon',
  separatorIconSize: '-sep-icon',
  groupGap: '-gap',
  offsetOff: '-off',
  offsetOn: '-on',
}

/** Scale reference property → [CSS namespace, var() prefix]. */
const SCALE_REF: Readonly<Record<string, readonly [ns: string, pfx: string]>> = {
  fontSize: ['font-size', 'text'],
  responsiveFontSize: ['font-size', 'text'],
  radius: ['radius', 'radius'],
  shadow: ['shadow', 'shadow'],
  fontWeight: ['font-weight', 'font-weight'],
  tracking: ['tracking', 'tracking'],
}

/** Extra suffix for scale-ref properties that need disambiguation. */
const SCALE_SUFFIX: Readonly<Record<string, string>> = {
  responsiveFontSize: '-resp',
}

/** Rem-valued property → CSS namespace. */
const REM_NS: Readonly<Record<string, string>> = {
  maxWidthRem: 'max-width',
  minWidthRem: 'min-width',
  maxHeightRem: 'max-height',
}

const SKIP = new Set(['transitionMs', 'animationMs', 'textTransform', 'leadingNone'])

/** Object keys that contain size-variant / named-variant sub-objects. */
const SIZE_KEYS = new Set(['sizes', 'variants'])

// ─────────────────────────────────────────────────────────────────────────────
// Emission
// ─────────────────────────────────────────────────────────────────────────────

function spacingVal(n: number): string {
  return `calc(var(--spacing) * ${n})`
}

const COMPOUND_RE = /^(heading)([A-Z].*)$/

const DIMENSION_KEYS = new Set(['height', 'minHeight', 'size'])

function spacingSuffix(prop: string, siblings: ReadonlySet<string>): string | undefined {
  if (!(prop in SPACING_SUFFIX)) return undefined

  if (prop === 'padding' && hasDimension(siblings)) return '-p'

  return SPACING_SUFFIX[prop]
}

function hasDimension(keys: ReadonlySet<string>): boolean {
  for (const k of DIMENSION_KEYS) {
    if (keys.has(k)) return true
  }
  return false
}

function emitLeaf(
  prefix: string,
  prop: string,
  value: unknown,
  siblings: ReadonlySet<string>,
  out: string[],
): void {
  if (SKIP.has(prop)) return

  const compound = COMPOUND_RE.exec(prop)
  if (compound) {
    const inner = compound[2][0].toLowerCase() + compound[2].slice(1)
    emitLeaf(`${prefix}-${compound[1]}`, inner, value, siblings, out)
    return
  }

  const sSuf = spacingSuffix(prop, siblings)
  if (sSuf != null) {
    out.push(`--spacing-${prefix}${sSuf}: ${spacingVal(value as number)};`)
    return
  }

  if (prop in SCALE_REF) {
    const [ns, pfx] = SCALE_REF[prop]
    const suf = SCALE_SUFFIX[prop] ?? ''
    out.push(`--${ns}-${prefix}${suf}: var(--${pfx}-${value});`)
    return
  }

  if (prop in REM_NS) out.push(`--${REM_NS[prop]}-${prefix}: ${value}rem;`)
}

function walk(prefix: string, obj: Record<string, unknown>, out: string[]): void {
  const siblings = new Set(Object.keys(obj))
  for (const [key, val] of Object.entries(obj)) {
    if (val == null) continue

    if (SIZE_KEYS.has(key) && typeof val === 'object') {
      for (const [size, tokens] of Object.entries(val as Record<string, unknown>)) {
        if (typeof tokens === 'object' && tokens !== null) {
          walk(`${prefix}-${size}`, tokens as Record<string, unknown>, out)
        }
      }
    } else if (typeof val === 'object' && !Array.isArray(val)) {
      walk(`${prefix}-${subPartName(key)}`, val as Record<string, unknown>, out)
    } else {
      emitLeaf(prefix, key, val, siblings, out)
    }
  }
}

function componentTitle(key: string): string {
  return toKebabCase(key)
    .split('-')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ')
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Render CSS custom property declarations for component design tokens.
 *
 * Returns bare declarations grouped by component with section comments.
 * Place the output inside a `@theme inline { … }` block alongside the
 * non-color token CSS.
 */
export function renderComponentTokensCss(
  components: ComponentTokens = defaultComponentTokens,
): string {
  const sections: string[] = []

  for (const key of COMPONENT_NAMES) {
    const tokens = components[key]
    const name = cssComponentName(key)
    const lines: string[] = []

    walk(name, tokens as unknown as Record<string, unknown>, lines)

    if (lines.length > 0) {
      sections.push(`/* ── ${componentTitle(key)} ── */\n${lines.join('\n')}`)
    }
  }

  return `${sections.join('\n\n')}\n`
}
