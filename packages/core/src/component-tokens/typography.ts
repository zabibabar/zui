import type { FontWeightName, TrackingStep, TypeScaleStep } from '../primitives/non-color'
import type { TypographyVariant } from './types'

export interface TypographyVariantTokens {
  readonly fontSize: TypeScaleStep
  readonly fontWeight: FontWeightName
  readonly tracking?: TrackingStep
  /** Larger font size applied above the `sm` breakpoint. */
  readonly responsiveFontSize?: TypeScaleStep
  readonly textTransform?: 'uppercase'
  /** Explicit line-height of 1 (no leading). */
  readonly leadingNone?: true
}

export interface TypographyTokens {
  readonly variants: Readonly<Record<TypographyVariant, TypographyVariantTokens>>
}

export const defaultTypographyTokens: TypographyTokens = {
  variants: {
    h1: { fontSize: '2xl', fontWeight: 'bold', tracking: 'tight', responsiveFontSize: '3xl' },
    h2: { fontSize: 'xl', fontWeight: 'semibold', tracking: 'tight', responsiveFontSize: '2xl' },
    h3: { fontSize: 'lg', fontWeight: 'semibold', tracking: 'tight' },
    h4: { fontSize: 'base', fontWeight: 'semibold', tracking: 'tight' },
    h5: { fontSize: 'sm', fontWeight: 'semibold', tracking: 'tight' },
    h6: { fontSize: 'xs', fontWeight: 'semibold', tracking: 'tight' },
    subtitle1: { fontSize: 'lg', fontWeight: 'normal' },
    subtitle2: { fontSize: 'sm', fontWeight: 'medium' },
    body1: { fontSize: 'base', fontWeight: 'normal' },
    body2: { fontSize: 'sm', fontWeight: 'normal' },
    caption: { fontSize: 'xs', fontWeight: 'normal' },
    overline: {
      fontSize: 'xs',
      fontWeight: 'normal',
      tracking: 'widest',
      textTransform: 'uppercase',
    },
    button: { fontSize: 'sm', fontWeight: 'medium', leadingNone: true },
  },
}
