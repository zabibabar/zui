import type { RadiusStep, TypeScaleStep } from '../primitives/non-color'

export interface TextareaTokens {
  readonly minHeight: number
  readonly paddingX: number
  readonly paddingY: number
  readonly fontSize: TypeScaleStep
  readonly radius: RadiusStep
  readonly transitionMs: number
}

export const defaultTextareaTokens: TextareaTokens = {
  minHeight: 24,
  paddingX: 3,
  paddingY: 2,
  fontSize: 'sm',
  radius: 'md',
  transitionMs: 150,
}
