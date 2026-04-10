import type { FontWeightName, RadiusStep, ShadowStep, TypeScaleStep } from '../primitives/non-color'
import type { OverlayMenuTokens } from './overlay-menu'
import { defaultOverlayMenuTokens } from './overlay-menu'

export interface MenubarTokens {
  readonly bar: {
    readonly height: number
    readonly padding: number
    readonly gap: number
    readonly radius: RadiusStep
    readonly shadow: ShadowStep
  }
  readonly trigger: {
    readonly paddingX: number
    readonly paddingY: number
    readonly fontSize: TypeScaleStep
    readonly fontWeight: FontWeightName
    readonly radius: RadiusStep
  }
  readonly menu: OverlayMenuTokens
}

export const defaultMenubarTokens: MenubarTokens = {
  bar: { height: 9, padding: 1, gap: 1, radius: 'md', shadow: 'sm' },
  trigger: {
    paddingX: 3,
    paddingY: 1.5,
    fontSize: 'sm',
    fontWeight: 'medium',
    radius: 'sm',
  },
  menu: defaultOverlayMenuTokens,
}
