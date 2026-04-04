import type { InkColors } from '../generator/types'
/**
 * Script to generate example theme CSS files from presets.
 * Run with: npx tsx scripts/generate-example-themes.ts
 */
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { assignForegrounds, generatePalette, parseOklchString } from '../generator'
import { presets } from '../generator/presets'
import { generateTheme } from '../generator/semantic'
import { themeToCss } from '../transforms/css'

const ink: InkColors = {
  dark: parseOklchString('oklch(0.145 0.02 220)'),
  light: parseOklchString('oklch(0.985 0.005 220)'),
}

function buildPalettes(
  config: Record<string, { hue: number; chroma: number }>,
  inkColors: InkColors,
) {
  const palettes: Record<string, ReturnType<typeof generatePalette>> = {}
  for (const [name, seed] of Object.entries(config)) {
    const raw = generatePalette(seed)
    palettes[name] = assignForegrounds(raw, inkColors)
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

const palettes = buildPalettes(themeColors, ink)

const lightTheme = generateTheme(palettes, 'light')
const darkTheme = generateTheme(palettes, 'dark')

const lightCss = themeToCss(lightTheme)
const darkCss = themeToCss(darkTheme)

const stylesDir = resolve(import.meta.dirname, '..', 'styles')

writeFileSync(resolve(stylesDir, 'example-light.css'), lightCss)
writeFileSync(resolve(stylesDir, 'example-dark.css'), darkCss)

console.log('Generated example-light.css and example-dark.css')
