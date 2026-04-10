import type { FontWeightName, RadiusStep, TypeScaleStep } from '../primitives/non-color'

export interface BadgeTokens {
  readonly paddingX: number
  readonly paddingY: number
  readonly gap: number
  readonly fontSize: TypeScaleStep
  readonly fontWeight: FontWeightName
  readonly radius: RadiusStep
}

export const defaultBadgeTokens: BadgeTokens = {
  paddingX: 2,
  paddingY: 0.5,
  gap: 1,
  fontSize: 'xs',
  fontWeight: 'medium',
  radius: 'md',
}
