import type { RadiusStep, ShadowStep } from '../primitives/non-color'

export interface PopoverTokens {
  readonly width: number
  readonly padding: number
  readonly shadow: ShadowStep
  readonly radius: RadiusStep
}

export const defaultPopoverTokens: PopoverTokens = {
  width: 72,
  padding: 4,
  shadow: 'xl',
  radius: 'md',
}
