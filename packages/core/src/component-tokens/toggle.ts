import type { FontWeightName, RadiusStep, TypeScaleStep } from '../primitives/non-color'
import type { CompactSize } from './types'

export interface ToggleSizeTokens {
  readonly height: number
  readonly minWidth: number
  readonly paddingX: number
  readonly fontSize: TypeScaleStep
}

export interface ToggleTokens {
  readonly gap: number
  readonly fontWeight: FontWeightName
  readonly radius: RadiusStep
  readonly transitionMs: number
  readonly sizes: Readonly<Record<CompactSize, ToggleSizeTokens>>
}

export const defaultToggleTokens: ToggleTokens = {
  gap: 2,
  fontWeight: 'medium',
  radius: 'md',
  transitionMs: 150,
  sizes: {
    sm: { height: 8, minWidth: 8, paddingX: 1.5, fontSize: 'xs' },
    md: { height: 9, minWidth: 9, paddingX: 2, fontSize: 'sm' },
    lg: { height: 10, minWidth: 10, paddingX: 2.5, fontSize: 'sm' },
  },
}
