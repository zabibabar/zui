import type { ComponentProps } from 'react'
import { cn } from '../../utils/cn'
import { textareaVariants } from './textarea.variants'

export interface TextareaProps extends ComponentProps<'textarea'> {}

export function Textarea({ className, ...props }: TextareaProps) {
  return <textarea className={cn(textareaVariants(), className)} {...props} />
}
