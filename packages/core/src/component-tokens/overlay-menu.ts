import type {
  FontWeightName,
  RadiusStep,
  ShadowStep,
  TrackingStep,
  TypeScaleStep,
} from '../primitives/non-color'

/**
 * Shared token shape used by dropdown-menu, context-menu, and menubar menu content.
 */
export interface OverlayMenuTokens {
  readonly content: {
    readonly minWidthRem: number
    readonly padding: number
    readonly shadow: ShadowStep
    readonly radius: RadiusStep
  }
  readonly item: {
    readonly paddingX: number
    readonly paddingY: number
    readonly fontSize: TypeScaleStep
    readonly radius: RadiusStep
  }
  readonly label: {
    readonly paddingX: number
    readonly paddingY: number
    readonly fontSize: TypeScaleStep
    readonly fontWeight: FontWeightName
  }
  readonly shortcut: {
    readonly fontSize: TypeScaleStep
    readonly tracking: TrackingStep
  }
}

export const defaultOverlayMenuTokens: OverlayMenuTokens = {
  content: { minWidthRem: 10, padding: 1, shadow: 'xl', radius: 'md' },
  item: { paddingX: 2, paddingY: 1.5, fontSize: 'sm', radius: 'sm' },
  label: { paddingX: 2, paddingY: 1.5, fontSize: 'xs', fontWeight: 'semibold' },
  shortcut: { fontSize: 'xs', tracking: 'widest' },
}
