import type { ComponentPropsWithoutRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '../../utils/cn'
import {
  drawerContentVariants,
  drawerDescriptionVariants,
  drawerHeaderVariants,
  drawerOverlayVariants,
  drawerTitleVariants,
} from './drawer.variants'

export const Drawer = DialogPrimitive.Root
export const DrawerTrigger = DialogPrimitive.Trigger
export const DrawerClose = DialogPrimitive.Close

export function DrawerOverlay({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>) {
  return <DialogPrimitive.Overlay className={cn(drawerOverlayVariants(), className)} {...props} />
}

export interface DrawerContentProps extends ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> {
  side?: 'left' | 'right'
}

export function DrawerContent({
  className,
  side = 'right',
  children,
  ...props
}: DrawerContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DrawerOverlay />
      <DialogPrimitive.Content
        className={cn(drawerContentVariants({ side }), className)}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export function DrawerHeader({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={cn(drawerHeaderVariants(), className)} {...props} />
}

export function DrawerTitle({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title className={cn(drawerTitleVariants(), className)} {...props} />
}

export function DrawerDescription({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn(drawerDescriptionVariants(), className)}
      {...props}
    />
  )
}
