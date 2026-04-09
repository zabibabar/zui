import type { ColorSeed } from '@zui/core'
/**
 * Script to generate example theme CSS files from presets.
 * Run with: npx tsx scripts/generate-example-themes.ts
 */
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { assignForegrounds, generatePalette, generateTheme, presets, resolveInk } from '@zui/core'
import { themesToCss } from '../src/css'

const ink = resolveInk()

function buildPalettes(config: Record<string, ColorSeed>) {
  const palettes: Record<string, ReturnType<typeof generatePalette>> = {}
  for (const [name, seed] of Object.entries(config)) {
    const raw = generatePalette(seed)
    palettes[name] = assignForegrounds(raw, ink)
  }
  return palettes
}

const themeColors = {
  primary: presets.blue,
  danger: presets.red,
  info: presets.cyan,
  success: presets.green,
  warning: presets.amber,
  neutral: presets.slate,
}

const palettes = buildPalettes(themeColors)

const lightTheme = generateTheme(palettes, 'light')
const darkTheme = generateTheme(palettes, 'dark')

const themeDefaultsCss = `:root {
  --density: 1;
  --radius: 0.625rem;
}
`
const themesCss = themesToCss([lightTheme, darkTheme])
const combinedCss = `${themeDefaultsCss}\n${themesCss}`

const stylesDir = resolve(import.meta.dirname, '..', 'styles')

writeFileSync(resolve(stylesDir, 'example-theme.css'), combinedCss)

console.log('Generated example-theme.css')
