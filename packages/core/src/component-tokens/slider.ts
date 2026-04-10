import type { RadiusStep } from '../primitives/non-color'

export interface SliderTokens {
  readonly track: {
    readonly height: number
    readonly radius: RadiusStep
  }
  readonly thumb: {
    readonly size: number
    readonly radius: RadiusStep
  }
}

export const defaultSliderTokens: SliderTokens = {
  track: { height: 2, radius: 'xl' },
  thumb: { size: 5, radius: 'xl' },
}
