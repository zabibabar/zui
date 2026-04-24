import type { RadiusStep, TypeScaleStep } from '../primitives/non-color'

export interface InputTokens {
  readonly minHeight: number
  readonly paddingX: number
  readonly paddingY: number
  readonly fontSize: TypeScaleStep
  readonly radius: RadiusStep
  readonly transitionMs: number
}

export const defaultInputTokens: InputTokens = {
  minHeight: 9,
  paddingX: 4,
  paddingY: 2,
  fontSize: 'sm',
  radius: 'md',
  transitionMs: 150,
}
