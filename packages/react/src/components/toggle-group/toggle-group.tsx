import type { ComponentPropsWithRef } from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cn } from '../../utils/cn'
import { toggleGroupItemVariants, toggleGroupVariants } from './toggle-group.variants'

export function ToggleGroup({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof ToggleGroupPrimitive.Root>) {
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn(toggleGroupVariants(), className)}
      {...props}
    />
  )
}
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

export function ToggleGroupItem({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(toggleGroupItemVariants(), className)}
      {...props}
    />
  )
}
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName
