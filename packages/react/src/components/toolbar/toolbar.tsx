import type { ComponentProps } from 'react'
import { cn } from '../../utils/cn'
import { toolbarVariants } from './toolbar.variants'

export function Toolbar({ className, ...props }: ComponentProps<'div'>) {
  return <div role="toolbar" className={cn(toolbarVariants(), className)} {...props} />
}
