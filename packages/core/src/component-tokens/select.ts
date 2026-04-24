import type { RadiusStep, TypeScaleStep } from '../primitives/non-color'

export interface SelectTokens {
  readonly trigger: {
    readonly minHeight: number
    readonly paddingX: number
    readonly paddingY: number
    readonly gap: number
    readonly fontSize: TypeScaleStep
    readonly radius: RadiusStep
    readonly transitionMs: number
    readonly iconSize: number
  }
  readonly viewport: {
    readonly padding: number
  }
  readonly item: {
    readonly paddingY: number
    readonly paddingLeft: number
    readonly paddingRight: number
    readonly fontSize: TypeScaleStep
    readonly radius: RadiusStep
  }
}

export const defaultSelectTokens: SelectTokens = {
  trigger: {
    minHeight: 9,
    paddingX: 4,
    paddingY: 2,
    gap: 2,
    fontSize: 'sm',
    radius: 'md',
    transitionMs: 150,
    iconSize: 4,
  },
  viewport: { padding: 1 },
  item: { paddingY: 1.5, paddingLeft: 8, paddingRight: 2, fontSize: 'sm', radius: 'sm' },
}
