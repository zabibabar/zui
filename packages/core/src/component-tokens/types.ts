/**
 * Shared size-variant and named-variant types used across component tokens.
 */

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const BUTTON_SIZES: readonly ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export type CompactSize = 'sm' | 'md' | 'lg'

export const COMPACT_SIZES: readonly CompactSize[] = ['sm', 'md', 'lg'] as const

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline'
  | 'button'

export const TYPOGRAPHY_VARIANTS: readonly TypographyVariant[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'caption',
  'overline',
  'button',
] as const
