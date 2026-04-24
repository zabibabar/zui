import type { FontFamilyName, FontFamilyScale } from '@zui/core'
import { defaultFontFamily } from '@zui/core'

export interface PlaygroundFontOption {
  readonly id: string
  readonly label: string
  readonly stack: string
}

export const DEFAULT_PLAYGROUND_FONTS: FontFamilyScale = defaultFontFamily

export const SANS_FONT_OPTIONS: readonly PlaygroundFontOption[] = [
  { id: 'system', label: 'System Sans', stack: defaultFontFamily.sans },
  { id: 'inter', label: 'Inter', stack: 'Inter, ui-sans-serif, system-ui, sans-serif' },
  { id: 'geist', label: 'Geist Sans', stack: 'Geist, ui-sans-serif, system-ui, sans-serif' },
  { id: 'arial', label: 'Arial', stack: 'Arial, Helvetica, sans-serif' },
  {
    id: 'helvetica-neue',
    label: 'Helvetica Neue',
    stack: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  { id: 'verdana', label: 'Verdana', stack: 'Verdana, Geneva, sans-serif' },
]

export const SERIF_FONT_OPTIONS: readonly PlaygroundFontOption[] = [
  { id: 'system', label: 'System Serif', stack: defaultFontFamily.serif },
  {
    id: 'georgia',
    label: 'Georgia',
    stack: 'Georgia, Cambria, "Times New Roman", Times, serif',
  },
  { id: 'times-new-roman', label: 'Times New Roman', stack: '"Times New Roman", Times, serif' },
  { id: 'garamond', label: 'Garamond', stack: 'Garamond, Baskerville, "Times New Roman", serif' },
  { id: 'baskerville', label: 'Baskerville', stack: 'Baskerville, "Times New Roman", serif' },
  { id: 'merriweather', label: 'Merriweather', stack: 'Merriweather, Georgia, serif' },
]

export const MONO_FONT_OPTIONS: readonly PlaygroundFontOption[] = [
  { id: 'system', label: 'System Mono', stack: defaultFontFamily.mono },
  {
    id: 'jetbrains-mono',
    label: 'JetBrains Mono',
    stack: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  {
    id: 'geist-mono',
    label: 'Geist Mono',
    stack: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  {
    id: 'fira-code',
    label: 'Fira Code',
    stack: '"Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  { id: 'menlo', label: 'Menlo', stack: 'Menlo, Monaco, Consolas, monospace' },
  { id: 'consolas', label: 'Consolas', stack: 'Consolas, "Courier New", monospace' },
]

export function fontOptionsForName(name: FontFamilyName): readonly PlaygroundFontOption[] {
  switch (name) {
    case 'sans':
      return SANS_FONT_OPTIONS
    case 'serif':
      return SERIF_FONT_OPTIONS
    case 'mono':
      return MONO_FONT_OPTIONS
  }
}
