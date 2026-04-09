import type { ComponentPropsWithoutRef } from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { cn } from '../../utils/cn'
import {
  commandEmptyVariants,
  commandGroupVariants,
  commandInputVariants,
  commandItemVariants,
  commandListVariants,
  commandRootVariants,
  commandSeparatorVariants,
  commandShortcutVariants,
} from './command.variants'

export function Command({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive>) {
  return <CommandPrimitive className={cn(commandRootVariants(), className)} {...props} />
}

export function CommandInput({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive.Input>) {
  return <CommandPrimitive.Input className={cn(commandInputVariants(), className)} {...props} />
}

export function CommandList({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive.List>) {
  return <CommandPrimitive.List className={cn(commandListVariants(), className)} {...props} />
}

export function CommandEmpty({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>) {
  return <CommandPrimitive.Empty className={cn(commandEmptyVariants(), className)} {...props} />
}

export function CommandGroup({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive.Group>) {
  return <CommandPrimitive.Group className={cn(commandGroupVariants(), className)} {...props} />
}

export function CommandItem({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive.Item>) {
  return <CommandPrimitive.Item className={cn(commandItemVariants(), className)} {...props} />
}

export function CommandSeparator({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator className={cn(commandSeparatorVariants(), className)} {...props} />
  )
}

export function CommandShortcut({ className, ...props }: ComponentPropsWithoutRef<'span'>) {
  return <span className={cn(commandShortcutVariants(), className)} {...props} />
}

export { CommandDialog } from 'cmdk'
