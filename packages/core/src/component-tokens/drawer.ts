import type {
  FontWeightName,
  ShadowStep,
  TrackingStep,
  TypeScaleStep,
} from '../primitives/non-color'

export interface DrawerTokens {
  readonly content: {
    readonly maxWidthRem: number
    readonly padding: number
    readonly gap: number
    readonly shadow: ShadowStep
    readonly animationMs: number
  }
  readonly header: {
    readonly gap: number
  }
  readonly title: {
    readonly fontSize: TypeScaleStep
    readonly fontWeight: FontWeightName
    readonly tracking: TrackingStep
  }
  readonly description: {
    readonly fontSize: TypeScaleStep
  }
}

export const defaultDrawerTokens: DrawerTokens = {
  content: {
    maxWidthRem: 24,
    padding: 6,
    gap: 4,
    shadow: 'xl',
    animationMs: 250,
  },
  header: { gap: 1.5 },
  title: { fontSize: 'lg', fontWeight: 'semibold', tracking: 'tight' },
  description: { fontSize: 'sm' },
}
