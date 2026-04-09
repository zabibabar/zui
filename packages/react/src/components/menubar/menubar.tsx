import type { ComponentPropsWithoutRef } from 'react'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { cn } from '../../utils/cn'
import {
  menubarContentVariants,
  menubarItemVariants,
  menubarLabelVariants,
  menubarMenuVariants,
  menubarSeparatorVariants,
  menubarShortcutVariants,
  menubarTriggerVariants,
} from './menubar.variants'

export function Menubar({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>) {
  return <MenubarPrimitive.Root className={cn(menubarMenuVariants(), className)} {...props} />
}

export const MenubarMenu = MenubarPrimitive.Menu

export function MenubarTrigger({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>) {
  return <MenubarPrimitive.Trigger className={cn(menubarTriggerVariants(), className)} {...props} />
}

export function MenubarContent({
  className,
  align = 'start',
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(menubarContentVariants(), className)}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
}

export function MenubarItem({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.Item>) {
  return <MenubarPrimitive.Item className={cn(menubarItemVariants(), className)} {...props} />
}

export function MenubarLabel({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.Label>) {
  return <MenubarPrimitive.Label className={cn(menubarLabelVariants(), className)} {...props} />
}

export function MenubarSeparator({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator className={cn(menubarSeparatorVariants(), className)} {...props} />
  )
}

export function MenubarShortcut({ className, ...props }: ComponentPropsWithoutRef<'span'>) {
  return <span className={cn(menubarShortcutVariants(), className)} {...props} />
}

export function MenubarGroup({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group className={cn(className)} {...props} />
}

export function MenubarSub({ ...props }: ComponentPropsWithoutRef<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub {...props} />
}

export function MenubarSubTrigger({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger>) {
  return (
    <MenubarPrimitive.SubTrigger
      className={cn(menubarItemVariants(), 'data-[state=open]:bg-muted', className)}
      {...props}
    />
  )
}

export function MenubarSubContent({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.SubContent className={cn(menubarContentVariants(), className)} {...props} />
    </MenubarPrimitive.Portal>
  )
}

export { menubarMenuVariants } from './menubar.variants'
