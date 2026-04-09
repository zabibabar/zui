import type { ComponentProps } from 'react'
import type { VariantProps } from 'tailwind-variants'
import { cn } from '../../utils/cn'
import { badgeVariants } from './badge.variants'

export type BadgeVariants = VariantProps<typeof badgeVariants>

export interface BadgeProps extends Omit<ComponentProps<'span'>, 'color'>, BadgeVariants {}

export function Badge({ variant, color, className, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, color }), className)} {...props} />
}
