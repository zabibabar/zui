import type { ComponentProps } from 'react'
import { cn } from '../../utils/cn'
import { inputVariants } from './input.variants'

export interface InputProps extends ComponentProps<'input'> {}

export function Input({ className, type = 'text', ...props }: InputProps) {
  return <input type={type} className={cn(inputVariants(), className)} {...props} />
}
