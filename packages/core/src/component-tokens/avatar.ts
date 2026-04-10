import type { TypeScaleStep } from '../primitives/non-color'
import type { CompactSize } from './types'

export interface AvatarSizeTokens {
  readonly size: number
  readonly fontSize: TypeScaleStep
}

export interface AvatarTokens {
  readonly sizes: Readonly<Record<CompactSize, AvatarSizeTokens>>
}

export const defaultAvatarTokens: AvatarTokens = {
  sizes: {
    sm: { size: 8, fontSize: 'xs' },
    md: { size: 10, fontSize: 'sm' },
    lg: { size: 12, fontSize: 'base' },
  },
}
