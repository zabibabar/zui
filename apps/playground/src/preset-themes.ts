import type { PlaygroundThemePatch, PlaygroundThemeState } from './theme-state'
import { presets } from '@zui/core'
import { defaultPlaygroundThemeState, mergePlaygroundPreset } from './theme-state'

export interface PlaygroundPresetDefinition {
  readonly id: string
  readonly label: string
  /** Applied on top of {@link defaultPlaygroundThemeState}. */
  readonly patch: PlaygroundThemePatch
}

export const DEFAULT_PLAYGROUND_PRESET_ID = 'default'

export const PLAYGROUND_PRESET_DEFINITIONS: PlaygroundPresetDefinition[] = [
  { id: DEFAULT_PLAYGROUND_PRESET_ID, label: 'Default', patch: {} },
  {
    id: 'ocean',
    label: 'Ocean',
    patch: {
      seeds: { primary: presets.cyan, neutral: presets.slate },
    },
  },
  {
    id: 'forest',
    label: 'Forest',
    patch: {
      seeds: { primary: presets.emerald, neutral: presets.zinc },
    },
  },
  {
    id: 'violet',
    label: 'Violet',
    patch: {
      seeds: { primary: presets.violet, neutral: presets.gray },
    },
  },
  {
    id: 'sunset',
    label: 'Sunset',
    patch: {
      seeds: { primary: presets.orange, neutral: presets.gray },
    },
  },
  {
    id: 'ruby',
    label: 'Ruby',
    patch: {
      seeds: { primary: presets.rose, neutral: presets.slate },
    },
  },
]

export function getPlaygroundPresetState(id: string): PlaygroundThemeState {
  const baseline = defaultPlaygroundThemeState()
  const def = PLAYGROUND_PRESET_DEFINITIONS.find((p) => p.id === id)
  if (!def) return baseline
  return mergePlaygroundPreset(baseline, def.patch)
}
