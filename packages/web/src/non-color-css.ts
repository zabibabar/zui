import type {
  ComponentTokens,
  CubicBezier,
  EasingName,
  MotionDefinition,
  MotionName,
  NonColorTokens,
  ShadowLayer,
} from '@zui/core'
import {
  defaultComponentTokens,
  defaultNonColorTokens,
  EASING_NAMES,
  FONT_WEIGHT_NAMES,
  LEADING_STEPS,
  MOTION_NAMES,
  RADIUS_STEPS,
  SHADOW_STEPS,
  TRACKING_STEPS,
  TYPE_SCALE_STEPS,
} from '@zui/core'
import { renderComponentTokensCss } from './component-css'

function px(value: number): string {
  return value === 0 ? '0' : `${value}px`
}

function cubicBezierCss(b: CubicBezier): string {
  return `cubic-bezier(${b.x1}, ${b.y1}, ${b.x2}, ${b.y2})`
}

function easingCssName(name: EasingName): string {
  switch (name) {
    case 'in':
      return 'ease-in'
    case 'out':
      return 'ease-out'
    case 'inOut':
      return 'ease-in-out'
  }
}

function motionEasingCss(easing: MotionDefinition['easing']): string {
  return easing === 'linear' ? 'linear' : cubicBezierCss(easing)
}

function durationCss(ms: number): string {
  return `${ms / 1000}s`
}

function shadowLayerCss(layer: ShadowLayer): string {
  const parts = [px(layer.offsetX), px(layer.offsetY)]
  if (layer.blur !== 0 || layer.spread !== 0) {
    parts.push(px(layer.blur), px(layer.spread))
  }
  parts.push(`rgb(0 0 0 / ${layer.opacity})`)
  return parts.join(' ')
}

// ─────────────────────────────────────────────────────────────────────────────
// Section renderers
// ─────────────────────────────────────────────────────────────────────────────

function renderSpacing(tokens: NonColorTokens): string[] {
  const { baseUnit } = tokens.spacing
  return ['/* ── Spacing ── */', `--spacing: calc(${baseUnit}rem * var(--density, 1));`]
}

function renderRadius(tokens: NonColorTokens): string[] {
  const { baseRem, multipliers } = tokens.radius
  const lines: string[] = ['/* ── Radius scale (derived from base --radius) ── */']
  for (const step of RADIUS_STEPS) {
    const m = multipliers[step]
    if (m === 1) {
      lines.push(`--radius-${step}: var(--radius, ${baseRem}rem);`)
    } else {
      lines.push(`--radius-${step}: calc(var(--radius, ${baseRem}rem) * ${m});`)
    }
  }
  return lines
}

function renderTypography(tokens: NonColorTokens): string[] {
  const { scale, densityDampening } = tokens.typography
  const pct = Math.round(densityDampening * 100)
  const lines: string[] = [`/* ── Typography scale (density-dampened at ${pct}% rate) ── */`]
  for (const step of TYPE_SCALE_STEPS) {
    const { sizeRem, lineHeightRem } = scale[step]
    lines.push(
      `--text-${step}: calc(${sizeRem}rem * (1 + (var(--density, 1) - 1) * ${densityDampening}));`,
    )
    lines.push(`--text-${step}--line-height: calc(${lineHeightRem} / ${sizeRem});`)
  }
  return lines
}

function renderFontWeights(tokens: NonColorTokens): string[] {
  const lines: string[] = ['/* ── Font weights ── */']
  for (const name of FONT_WEIGHT_NAMES) {
    lines.push(`--font-weight-${name}: ${tokens.fontWeight[name]};`)
  }
  return lines
}

function renderTracking(tokens: NonColorTokens): string[] {
  const lines: string[] = ['/* ── Letter spacing ── */']
  for (const step of TRACKING_STEPS) {
    lines.push(`--tracking-${step}: ${tokens.tracking[step]}em;`)
  }
  return lines
}

function renderLeading(tokens: NonColorTokens): string[] {
  const lines: string[] = ['/* ── Line height ── */']
  for (const step of LEADING_STEPS) {
    lines.push(`--leading-${step}: ${tokens.leading[step]};`)
  }
  return lines
}

function renderShadows(tokens: NonColorTokens): string[] {
  const lines: string[] = ['/* ── Shadows ── */']
  for (const step of SHADOW_STEPS) {
    const layers = tokens.shadow[step]
    const value = layers.map(shadowLayerCss).join(', ')
    lines.push(`--shadow-${step}: ${value};`)
  }
  return lines
}

function renderEasing(tokens: NonColorTokens): string[] {
  const lines: string[] = ['/* ── Easing ── */']
  for (const name of EASING_NAMES) {
    lines.push(`--${easingCssName(name)}: ${cubicBezierCss(tokens.easing[name])};`)
  }
  return lines
}

function renderMotion(tokens: NonColorTokens): string[] {
  const lines: string[] = ['/* ── Animations ── */']
  for (const name of MOTION_NAMES) {
    const def = tokens.motion[name]
    const iter = def.iterations === 'infinite' ? 'infinite' : String(def.iterations)
    lines.push(
      `--animate-${name}: ${name} ${durationCss(def.durationMs)} ${motionEasingCss(def.easing)} ${iter};`,
    )
  }
  return lines
}

// ─────────────────────────────────────────────────────────────────────────────
// Keyframe CSS (platform-specific visual behaviour, not derived from core)
// ─────────────────────────────────────────────────────────────────────────────

const KEYFRAMES: Record<MotionName, string> = {
  spin: `@keyframes spin {
  to { transform: rotate(360deg); }
}`,
  ping: `@keyframes ping {
  75%, 100% { transform: scale(2); opacity: 0; }
}`,
  pulse: `@keyframes pulse {
  50% { opacity: 0.5; }
}`,
  bounce: `@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}`,
}

function renderKeyframes(): string[] {
  return MOTION_NAMES.map((name) => KEYFRAMES[name])
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Render CSS custom property declarations for all non-color tokens.
 *
 * Returns bare declarations (no wrapping selector or `@theme` directive).
 * Place the output inside a `@theme inline { … }` block for Tailwind v4,
 * or inside any CSS rule block for plain CSS usage.
 *
 * Keyframe `@keyframes` blocks are appended after the declarations.
 */
export function renderNonColorTokensCss(tokens: NonColorTokens = defaultNonColorTokens): string {
  const sections = [
    renderSpacing(tokens),
    renderRadius(tokens),
    renderTypography(tokens),
    renderFontWeights(tokens),
    renderTracking(tokens),
    renderLeading(tokens),
    renderShadows(tokens),
    renderEasing(tokens),
    renderMotion(tokens),
    renderKeyframes(),
  ]

  return `${sections.map((s) => s.join('\n')).join('\n\n')}\n`
}

// ─────────────────────────────────────────────────────────────────────────────
// Tailwind theme CSS generation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Color bridges are static Tailwind `--color-*` mappings that forward runtime
 * theme CSS variables into Tailwind utility classes. They don't carry token
 * values from core — they just wire `bg-primary` → `var(--primary)`, etc.
 */
const COLOR_BRIDGES = `\
  /*
   * Bridge theme CSS variables (under [data-theme], etc.) into Tailwind color
   * utilities: bg-background, bg-primary, text-muted-foreground, border-border, …
   */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-neutral: var(--neutral);
  --color-neutral-foreground: var(--neutral-foreground);
  --color-neutral-hover: var(--neutral-hover);
  --color-neutral-active: var(--neutral-active);
  --color-neutral-subtle: var(--neutral-subtle);
  --color-neutral-subtle-foreground: var(--neutral-subtle-foreground);
  --color-neutral-border: var(--neutral-border);
  --color-ink-dark: var(--ink-dark);
  --color-ink-light: var(--ink-light);

  /* Intent colors (semantic tokens from theme CSS) */
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary-hover: var(--primary-hover);
  --color-primary-active: var(--primary-active);
  --color-primary-subtle: var(--primary-subtle);
  --color-primary-subtle-foreground: var(--primary-subtle-foreground);
  --color-primary-border: var(--primary-border);
  --color-danger: var(--danger);
  --color-danger-foreground: var(--danger-foreground);
  --color-danger-hover: var(--danger-hover);
  --color-danger-active: var(--danger-active);
  --color-danger-subtle: var(--danger-subtle);
  --color-danger-subtle-foreground: var(--danger-subtle-foreground);
  --color-danger-border: var(--danger-border);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
  --color-info-hover: var(--info-hover);
  --color-info-active: var(--info-active);
  --color-info-subtle: var(--info-subtle);
  --color-info-subtle-foreground: var(--info-subtle-foreground);
  --color-info-border: var(--info-border);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-success-hover: var(--success-hover);
  --color-success-active: var(--success-active);
  --color-success-subtle: var(--success-subtle);
  --color-success-subtle-foreground: var(--success-subtle-foreground);
  --color-success-border: var(--success-border);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-warning-hover: var(--warning-hover);
  --color-warning-active: var(--warning-active);
  --color-warning-subtle: var(--warning-subtle);
  --color-warning-subtle-foreground: var(--warning-subtle-foreground);
  --color-warning-border: var(--warning-border);`

function indent(text: string, spaces: number = 2): string {
  const pad = ' '.repeat(spaces)
  return text
    .split('\n')
    .map((line) => (line.trim() === '' ? '' : `${pad}${line}`))
    .join('\n')
}

/**
 * Generate the complete `tailwind-theme.css` content.
 *
 * Combines the Tailwind v4 preamble, color bridges, non-color token
 * declarations, and component token declarations (all derived from
 * `@zui/core` structured data) into a single ready-to-use CSS file.
 */
export function generateTailwindThemeCss(
  tokens: NonColorTokens = defaultNonColorTokens,
  components: ComponentTokens = defaultComponentTokens,
): string {
  const nonColor = renderNonColorTokensCss(tokens)
  const componentCss = renderComponentTokensCss(components)
  const indentedNonColor = indent(nonColor)
  const indentedComponentCss = indent(componentCss)

  return `\
@import 'tailwindcss';

/*
 * ZUI Design System — Tailwind Theme Bridge
 *
 * Defaults on :root (override on :root or any ancestor):
 *   --density: 1  (try 0.85 compact / 1.15 relaxed)
 *   --radius:    base corner radius (e.g. 0.625rem)
 *
 * Theme layer must supply semantic colors, including the ink pair (text on
 * surfaces): --ink-dark, --ink-light (see generated or example theme CSS).
 *
 * Everything below derives from those knobs plus theme colors.
 */
@custom-variant dark (&:where([data-theme="dark"] *));

@theme inline {
${COLOR_BRIDGES}

${indentedNonColor}
${indentedComponentCss}\
}
`
}
