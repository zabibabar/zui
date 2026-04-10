import type { RadiusStep } from '../primitives/non-color'

export interface ProgressTokens {
  readonly track: {
    readonly height: number
    readonly radius: RadiusStep
  }
  readonly animationMs: number
}

export const defaultProgressTokens: ProgressTokens = {
  track: { height: 2, radius: 'xl' },
  animationMs: 300,
}
