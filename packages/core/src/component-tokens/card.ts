import type {
  FontWeightName,
  RadiusStep,
  TrackingStep,
  TypeScaleStep,
} from '../primitives/non-color'

export interface CardTokens {
  readonly radius: RadiusStep
  readonly header: {
    readonly padding: number
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
  readonly content: {
    readonly paddingX: number
    readonly paddingBottom: number
  }
  readonly footer: {
    readonly paddingX: number
    readonly paddingBottom: number
  }
}

export const defaultCardTokens: CardTokens = {
  radius: 'lg',
  header: { padding: 6, gap: 1.5 },
  title: { fontSize: 'lg', fontWeight: 'semibold', tracking: 'tight' },
  description: { fontSize: 'sm' },
  content: { paddingX: 6, paddingBottom: 6 },
  footer: { paddingX: 6, paddingBottom: 6 },
}
