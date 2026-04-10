import type { RadiusStep, ShadowStep, TypeScaleStep } from '../primitives/non-color'

export interface TooltipTokens {
  readonly paddingX: number
  readonly paddingY: number
  readonly fontSize: TypeScaleStep
  readonly shadow: ShadowStep
  readonly radius: RadiusStep
}

export const defaultTooltipTokens: TooltipTokens = {
  paddingX: 3,
  paddingY: 1.5,
  fontSize: 'xs',
  shadow: 'md',
  radius: 'md',
}
