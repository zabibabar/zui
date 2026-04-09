import type { ComponentProps, ElementType } from 'react'
import type { VariantProps } from 'tailwind-variants'
import type { TypographyWeight } from './typography.variants'
import { cn } from '../../utils/cn'
import { typographyVariants, typographyWeightClasses } from './typography.variants'

export type TypographyVariants = VariantProps<typeof typographyVariants>

const defaultElements = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
  button: 'span',
} as const

export type TypographyVariant = keyof typeof defaultElements

export interface TypographyProps extends Omit<ComponentProps<'p'>, 'color'>, TypographyVariants {
  as?: ElementType
  variant: TypographyVariant
  weight?: TypographyWeight
}

export function Typography({ as, variant, weight, tone, className, ...props }: TypographyProps) {
  const Comp = (as ?? defaultElements[variant]) as ElementType
  return (
    <Comp
      className={cn(
        typographyVariants({ variant, tone }),
        weight !== undefined && typographyWeightClasses[weight],
        className,
      )}
      {...props}
    />
  )
}
