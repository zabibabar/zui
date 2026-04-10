import type { CompactSize } from './types'

export interface SpinnerSizeTokens {
  readonly size: number
}

export interface SpinnerTokens {
  readonly sizes: Readonly<Record<CompactSize, SpinnerSizeTokens>>
}

export const defaultSpinnerTokens: SpinnerTokens = {
  sizes: {
    sm: { size: 3 },
    md: { size: 4 },
    lg: { size: 6 },
  },
}
