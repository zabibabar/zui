import type { RadiusStep } from '../primitives/non-color'

export interface CheckboxTokens {
  readonly size: number
  readonly radius: RadiusStep
}

export const defaultCheckboxTokens: CheckboxTokens = {
  size: 4.5,
  radius: 'sm',
}
