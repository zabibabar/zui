import type { FontWeightName, RadiusStep, TypeScaleStep } from '../primitives/non-color'

export interface ToggleGroupTokens {
  readonly root: {
    readonly padding: number
    readonly radius: RadiusStep
  }
  readonly item: {
    readonly paddingX: number
    readonly paddingY: number
    readonly fontSize: TypeScaleStep
    readonly fontWeight: FontWeightName
    readonly radius: RadiusStep
  }
}

export const defaultToggleGroupTokens: ToggleGroupTokens = {
  root: { padding: 0.5, radius: 'md' },
  item: { paddingX: 2, paddingY: 1.5, fontSize: 'sm', fontWeight: 'medium', radius: 'sm' },
}
