import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

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
 * Copy the canonical tailwind-theme.css into a consumer directory.
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

  const thisDir = fileURLToPath(new URL('.', import.meta.url))
  const source = resolve(thisDir, '..', 'styles', 'tailwind-theme.css')
  const content = readFileSync(source, 'utf-8')

  mkdirSync(options.destDir, { recursive: true })
  writeFileSync(dest, content, 'utf-8')

  return { written: true, path: dest, skippedExisting: false }
}
