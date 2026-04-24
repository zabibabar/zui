import type { PlaygroundThemeState } from './theme-state'
import {
  assignForegrounds,
  defaultTracking,
  generatePalette,
  generateTheme,
  resolveInk,
  TRACKING_STEPS,
} from '@zui/core'
import { themesToCss } from '@zui/web'
import { COLOR_INTENTS } from './theme-state'

export type PlaygroundAppearance = 'light' | 'dark'

function hasDefinedValues(obj: object): boolean {
  return Object.values(obj).some((v) => v !== undefined)
}

function em(value: number): string {
  const rounded = Number(value.toFixed(4))
  return `${Object.is(rounded, -0) ? 0 : rounded}em`
}

function buildTypographyOverridesCss(state: PlaygroundThemeState): string {
  const lines = [
    ':root {',
    `  --zui-font-sans: ${state.fonts.sans};`,
    `  --zui-font-serif: ${state.fonts.serif};`,
    `  --zui-font-mono: ${state.fonts.mono};`,
  ]

  for (const step of TRACKING_STEPS) {
    lines.push(`  --zui-tracking-${step}: ${em(defaultTracking[step] + state.trackingOffsetEm)};`)
  }

  lines.push('}')
  return lines.join('\n')
}

/**
 * Builds CSS for `light` and `dark` `[data-theme="..."]` blocks from full playground state.
 */
export function buildThemeCss(state: PlaygroundThemeState): string {
  const ink = hasDefinedValues(state.ink) ? state.ink : undefined
  const inkColors = resolveInk(ink)
  const opts = {
    ink,
    surfaces: hasDefinedValues(state.surfaces) ? state.surfaces : undefined,
    chrome: hasDefinedValues(state.chrome) ? state.chrome : undefined,
  }

  const palettes: Record<string, ReturnType<typeof assignForegrounds>> = {}
  for (const name of COLOR_INTENTS) {
    const seed = state.seeds[name]
    if (seed) palettes[name] = assignForegrounds(generatePalette(seed), inkColors)
  }

  const light = generateTheme(palettes, 'light', opts)
  const dark = generateTheme(palettes, 'dark', opts)
  return `${buildTypographyOverridesCss(state)}\n\n${themesToCss([light, dark])}`
}
