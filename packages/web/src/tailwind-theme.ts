import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { generateTailwindThemeCss } from './non-color-css'

export interface WriteTailwindThemeCssOptions {
  destDir: string
  filename?: string
  overwrite?: boolean
}

export interface WriteTailwindThemeCssResult {
  written: boolean
  path: string
  skippedExisting: boolean
}

/**
 * Generate the canonical tailwind-theme.css into a consumer directory.
 *
 * The file content is derived from the structured non-color token data in
 * `@zui/core`, so values stay in sync with the core token definitions.
 *
 * By default the function will NOT overwrite an existing file at the
 * destination path. Pass `overwrite: true` to refresh from the canonical
 * package content.
 */
export function writeTailwindThemeCss(
  options: WriteTailwindThemeCssOptions,
): WriteTailwindThemeCssResult {
  const filename = options.filename ?? 'tailwind-theme.css'
  const dest = resolve(options.destDir, filename)

  if (existsSync(dest) && !options.overwrite) {
    return { written: false, path: dest, skippedExisting: true }
  }

  const content = generateTailwindThemeCss()

  mkdirSync(options.destDir, { recursive: true })
  writeFileSync(dest, content, 'utf-8')

  return { written: true, path: dest, skippedExisting: false }
}
