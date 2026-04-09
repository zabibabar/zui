import type { ComponentProps } from 'react'
import type { VariantProps } from 'tailwind-variants'
import { cn } from '../../utils/cn'
import { buttonVariants } from './button.variants'

export type ButtonVariants = VariantProps<typeof buttonVariants>

export interface ButtonProps extends Omit<ComponentProps<'button'>, 'color'>, ButtonVariants {}

export function Button({ variant, color, size, className, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, color, size }), className)} {...props} />
}
