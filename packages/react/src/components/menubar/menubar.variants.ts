import { tv } from 'tailwind-variants'
import {
  overlayInteractiveItemBase,
  overlayLabelBase,
  overlaySeparatorBase,
  overlaySurfaceBase,
} from '../../styles/overlay-classes'

export const menubarMenuVariants = tv({
  base: 'flex h-menubar-bar items-center gap-menubar-bar-gap rounded-menubar-bar border border-border bg-background p-menubar-bar-p shadow-menubar-bar',
})

export const menubarTriggerVariants = tv({
  base: [
    'flex cursor-pointer select-none items-center rounded-menubar-trigger px-menubar-trigger-x py-menubar-trigger-y text-menubar-trigger font-menubar-trigger outline-none',
    'text-foreground',
    'focus:bg-muted data-[state=open]:bg-muted',
  ],
})

export const menubarContentVariants = tv({
  base: [
    'z-50 min-w-menubar-menu-content overflow-hidden rounded-menubar-menu-content p-menubar-menu-content shadow-menubar-menu-content',
    ...overlaySurfaceBase,
  ],
})

export const menubarItemVariants = tv({
  base: [
    ...overlayInteractiveItemBase,
    'rounded-menubar-menu-item px-menubar-menu-item-x py-menubar-menu-item-y text-menubar-menu-item',
  ],
})

export const menubarLabelVariants = tv({
  base: [
    overlayLabelBase,
    'px-menubar-menu-label-x py-menubar-menu-label-y text-menubar-menu-label font-menubar-menu-label',
  ],
})

export const menubarSeparatorVariants = tv({
  base: overlaySeparatorBase,
})

export const menubarShortcutVariants = tv({
  base: 'ml-auto text-menubar-menu-shortcut tracking-menubar-menu-shortcut text-muted-foreground',
})
