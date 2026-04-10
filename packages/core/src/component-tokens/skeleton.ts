import type { RadiusStep } from '../primitives/non-color'

export interface SkeletonTokens {
  readonly radius: RadiusStep
}

export const defaultSkeletonTokens: SkeletonTokens = {
  radius: 'md',
}
