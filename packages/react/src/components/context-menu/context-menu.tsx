import type { ComponentPropsWithoutRef } from 'react'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { cn } from '../../utils/cn'
import {
  contextMenuContentVariants,
  contextMenuItemVariants,
  contextMenuLabelVariants,
  contextMenuSeparatorVariants,
  contextMenuShortcutVariants,
} from './context-menu.variants'

export const ContextMenu = ContextMenuPrimitive.Root
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger
export const ContextMenuGroup = ContextMenuPrimitive.Group
export const ContextMenuPortal = ContextMenuPrimitive.Portal
export const ContextMenuSub = ContextMenuPrimitive.Sub

export function ContextMenuContent({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        className={cn(contextMenuContentVariants(), className)}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
}

export function ContextMenuItem({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item>) {
  return (
    <ContextMenuPrimitive.Item className={cn(contextMenuItemVariants(), className)} {...props} />
  )
}

export function ContextMenuLabel({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label>) {
  return (
    <ContextMenuPrimitive.Label className={cn(contextMenuLabelVariants(), className)} {...props} />
  )
}

export function ContextMenuSeparator({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      className={cn(contextMenuSeparatorVariants(), className)}
      {...props}
    />
  )
}

export function ContextMenuShortcut({ className, ...props }: ComponentPropsWithoutRef<'span'>) {
  return <span className={cn(contextMenuShortcutVariants(), className)} {...props} />
}

export function ContextMenuSubTrigger({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger>) {
  return (
    <ContextMenuPrimitive.SubTrigger
      className={cn(contextMenuItemVariants(), 'data-[state=open]:bg-muted', className)}
      {...props}
    />
  )
}

export function ContextMenuSubContent({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.SubContent
        className={cn(contextMenuContentVariants(), className)}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
}
