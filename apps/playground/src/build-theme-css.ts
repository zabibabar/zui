import type { PlaygroundThemeState } from './theme-state'
import { assignForegrounds, generatePalette, generateTheme, resolveInk } from '@zui/core'
import { themesToCss } from '@zui/web'
import { COLOR_INTENTS } from './theme-state'

export type PlaygroundAppearance = 'light' | 'dark'

function hasDefinedValues(obj: object): boolean {
  return Object.values(obj).some((v) => v !== undefined)
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
    palettes[name] = assignForegrounds(generatePalette(state.seeds[name]), inkColors)
  }

  const light = generateTheme(palettes, 'light', opts)
  const dark = generateTheme(palettes, 'dark', opts)
  return themesToCss([light, dark])
}
