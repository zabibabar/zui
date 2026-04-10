import type { FontWeightName, TypeScaleStep } from '../primitives/non-color'

export interface AccordionTokens {
  readonly trigger: {
    readonly paddingY: number
    readonly fontSize: TypeScaleStep
    readonly fontWeight: FontWeightName
    readonly iconSize: number
  }
  readonly content: {
    readonly fontSize: TypeScaleStep
  }
}

export const defaultAccordionTokens: AccordionTokens = {
  trigger: { paddingY: 4, fontSize: 'sm', fontWeight: 'medium', iconSize: 4 },
  content: { fontSize: 'sm' },
}
