import type { RadiusStep } from '../primitives/non-color'

export interface AlertTokens {
  readonly padding: number
  readonly gap: number
  readonly radius: RadiusStep
}

export const defaultAlertTokens: AlertTokens = {
  padding: 4,
  gap: 3,
  radius: 'lg',
}
