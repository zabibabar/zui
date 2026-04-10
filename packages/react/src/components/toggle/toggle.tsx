import type { ComponentPropsWithRef } from 'react'
import type { VariantProps } from 'tailwind-variants'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cn } from '../../utils/cn'
import { toggleVariants } from './toggle.variants'

export type ToggleProps = ComponentPropsWithRef<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>

export function Toggle({ className, size, ref, ...props }: ToggleProps) {
  return (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(toggleVariants({ size }), className)}
      {...props}
    />
  )
}
Toggle.displayName = TogglePrimitive.Root.displayName
