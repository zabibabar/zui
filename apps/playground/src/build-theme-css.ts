import type { PlaygroundThemeState } from './theme-state'
import { assignForegrounds, generatePalette, generateTheme, resolveInk } from '@zui/core'
import { themesToCss } from '@zui/web'
import { COLOR_INTENTS } from './theme-state'

export type PlaygroundAppearance = 'light' | 'dark'

function pruneInk(ink: PlaygroundThemeState['ink']) {
  const out: Record<string, string> = {}
  if (ink.dark?.trim()) out.dark = ink.dark.trim()
  if (ink.light?.trim()) out.light = ink.light.trim()
  return Object.keys(out).length ? (out as { dark?: string; light?: string }) : undefined
}

function pruneSurfaces(s: PlaygroundThemeState['surfaces']) {
  const out: Record<string, string> = {}
  if (s.base?.trim()) out.base = s.base.trim()
  if (s.raised?.trim()) out.raised = s.raised.trim()
  if (s.overlay?.trim()) out.overlay = s.overlay.trim()
  return Object.keys(out).length
    ? (out as { base?: string; raised?: string; overlay?: string })
    : undefined
}

function pruneChrome(c: PlaygroundThemeState['chrome']) {
  const out: Record<string, string> = {}
  if (c.border?.trim()) out.border = c.border.trim()
  if (c.input?.trim()) out.input = c.input.trim()
  if (c.ring?.trim()) out.ring = c.ring.trim()
  return Object.keys(out).length
    ? (out as { border?: string; input?: string; ring?: string })
    : undefined
}

/**
 * Builds CSS for `light` and `dark` `[data-theme="..."]` blocks from full playground state.
 */
export function buildThemeCss(state: PlaygroundThemeState): string {
  const inkColors = resolveInk(pruneInk(state.ink))
  const opts = {
    ink: pruneInk(state.ink),
    surfaces: pruneSurfaces(state.surfaces),
    chrome: pruneChrome(state.chrome),
  }

  const palettes: Record<string, ReturnType<typeof assignForegrounds>> = {}
  for (const name of COLOR_INTENTS) {
    palettes[name] = assignForegrounds(generatePalette(state.seeds[name]), inkColors)
  }

  const light = generateTheme(palettes, 'light', opts)
  const dark = generateTheme(palettes, 'dark', opts)
  return themesToCss([light, dark])
}
