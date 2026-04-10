import type { RadiusStep } from '../primitives/non-color'

export interface SwitchTokens {
  readonly root: {
    readonly height: number
    readonly width: number
    readonly radius: RadiusStep
  }
  readonly thumb: {
    readonly size: number
    readonly radius: RadiusStep
    readonly offsetOff: number
    readonly offsetOn: number
  }
}

export const defaultSwitchTokens: SwitchTokens = {
  root: { height: 6, width: 11, radius: 'xl' },
  thumb: { size: 5, radius: 'xl', offsetOff: 0.5, offsetOn: 5.5 },
}
