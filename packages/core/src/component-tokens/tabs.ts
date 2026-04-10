import type { FontWeightName, RadiusStep, TypeScaleStep } from '../primitives/non-color'

export interface TabsTokens {
  readonly list: {
    readonly height: number
    readonly padding: number
    readonly radius: RadiusStep
  }
  readonly trigger: {
    readonly paddingX: number
    readonly paddingY: number
    readonly fontSize: TypeScaleStep
    readonly fontWeight: FontWeightName
    readonly radius: RadiusStep
  }
}

export const defaultTabsTokens: TabsTokens = {
  list: { height: 10, padding: 1, radius: 'md' },
  trigger: {
    paddingX: 3,
    paddingY: 1.5,
    fontSize: 'sm',
    fontWeight: 'medium',
    radius: 'sm',
  },
}
