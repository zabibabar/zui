import type {
  FontWeightName,
  RadiusStep,
  ShadowStep,
  TrackingStep,
  TypeScaleStep,
} from '../primitives/non-color'

export interface DialogTokens {
  readonly overlay: {
    readonly animationMs: number
  }
  readonly content: {
    readonly maxWidthRem: number
    readonly padding: number
    readonly gap: number
    readonly radius: RadiusStep
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

export const defaultDialogTokens: DialogTokens = {
  overlay: { animationMs: 200 },
  content: {
    maxWidthRem: 32,
    padding: 6,
    gap: 4,
    radius: 'lg',
    shadow: 'xl',
    animationMs: 200,
  },
  header: { gap: 1.5 },
  title: { fontSize: 'lg', fontWeight: 'semibold', tracking: 'tight' },
  description: { fontSize: 'sm' },
}
