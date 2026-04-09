import type { ComponentPropsWithoutRef } from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '../../utils/cn'
import { progressIndicatorVariants, progressRootVariants } from './progress.variants'

export function Progress({
  className,
  value,
  ...props
}: ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root className={cn(progressRootVariants(), className)} {...props}>
      <ProgressPrimitive.Indicator
        className={progressIndicatorVariants()}
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}
