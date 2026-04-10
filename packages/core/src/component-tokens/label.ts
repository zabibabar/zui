import type { FontWeightName, TypeScaleStep } from '../primitives/non-color'

export interface LabelTokens {
  readonly fontSize: TypeScaleStep
  readonly fontWeight: FontWeightName
}

export const defaultLabelTokens: LabelTokens = {
  fontSize: 'sm',
  fontWeight: 'medium',
}
