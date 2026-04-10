import type { ComponentPropsWithRef } from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '../../utils/cn'
import { labelVariants } from './label.variants'

export function Label({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof LabelPrimitive.Root>) {
  return <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
}
Label.displayName = LabelPrimitive.Root.displayName
