import type {
  FontWeightName,
  RadiusStep,
  TrackingStep,
  TypeScaleStep,
} from '../primitives/non-color'

export interface CommandTokens {
  readonly root: {
    readonly radius: RadiusStep
  }
  readonly input: {
    readonly height: number
    readonly paddingX: number
    readonly paddingY: number
    readonly fontSize: TypeScaleStep
  }
  readonly list: {
    readonly maxHeightRem: number
    readonly padding: number
  }
  readonly empty: {
    readonly paddingY: number
    readonly fontSize: TypeScaleStep
  }
  readonly group: {
    readonly headingPaddingX: number
    readonly headingPaddingY: number
    readonly headingFontSize: TypeScaleStep
    readonly headingFontWeight: FontWeightName
  }
  readonly item: {
    readonly paddingX: number
    readonly paddingY: number
    readonly fontSize: TypeScaleStep
    readonly radius: RadiusStep
  }
  readonly shortcut: {
    readonly fontSize: TypeScaleStep
    readonly tracking: TrackingStep
  }
}

export const defaultCommandTokens: CommandTokens = {
  root: { radius: 'md' },
  input: { height: 10, paddingX: 3, paddingY: 2, fontSize: 'sm' },
  list: { maxHeightRem: 18, padding: 1 },
  empty: { paddingY: 6, fontSize: 'sm' },
  group: {
    headingPaddingX: 2,
    headingPaddingY: 1.5,
    headingFontSize: 'xs',
    headingFontWeight: 'medium',
  },
  item: { paddingX: 3, paddingY: 1.5, fontSize: 'sm', radius: 'sm' },
  shortcut: { fontSize: 'xs', tracking: 'widest' },
}
