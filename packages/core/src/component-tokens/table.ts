import type { FontWeightName, RadiusStep, TypeScaleStep } from '../primitives/non-color'

export interface TableTokens {
  readonly container: {
    readonly radius: RadiusStep
  }
  readonly head: {
    readonly height: number
    readonly paddingX: number
    readonly fontSize: TypeScaleStep
    readonly fontWeight: FontWeightName
  }
  readonly cell: {
    readonly padding: number
  }
  readonly caption: {
    readonly marginTop: number
    readonly fontSize: TypeScaleStep
  }
}

export const defaultTableTokens: TableTokens = {
  container: { radius: 'md' },
  head: { height: 10, paddingX: 3, fontSize: 'xs', fontWeight: 'semibold' },
  cell: { padding: 3 },
  caption: { marginTop: 2, fontSize: 'xs' },
}
