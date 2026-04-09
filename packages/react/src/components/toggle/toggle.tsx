import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import type { VariantProps } from 'tailwind-variants'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { forwardRef } from 'react'
import { cn } from '../../utils/cn'
import { toggleVariants } from './toggle.variants'

export type ToggleProps = ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>

export const Toggle = forwardRef<ElementRef<typeof TogglePrimitive.Root>, ToggleProps>(
  ({ className, size, ...props }, ref) => (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(toggleVariants({ size }), className)}
      {...props}
    />
  ),
)
Toggle.displayName = TogglePrimitive.Root.displayName
