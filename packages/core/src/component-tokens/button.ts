import type { FontWeightName, RadiusStep, TypeScaleStep } from '../primitives/non-color'
import type { ButtonSize } from './types'

export interface ButtonSizeTokens {
  readonly height: number
  readonly paddingX: number
  readonly fontSize: TypeScaleStep
  readonly radius: RadiusStep
}

export interface ButtonTokens {
  readonly gap: number
  readonly fontWeight: FontWeightName
  readonly transitionMs: number
  readonly sizes: Readonly<Record<ButtonSize, ButtonSizeTokens>>
}

export const defaultButtonTokens: ButtonTokens = {
  gap: 2,
  fontWeight: 'medium',
  transitionMs: 150,
  sizes: {
    xs: { height: 7, paddingX: 2.5, fontSize: 'xs', radius: 'sm' },
    sm: { height: 8, paddingX: 3, fontSize: 'sm', radius: 'sm' },
    md: { height: 9, paddingX: 4, fontSize: 'sm', radius: 'md' },
    lg: { height: 10, paddingX: 5, fontSize: 'base', radius: 'md' },
    xl: { height: 12, paddingX: 6, fontSize: 'base', radius: 'lg' },
  },
}
