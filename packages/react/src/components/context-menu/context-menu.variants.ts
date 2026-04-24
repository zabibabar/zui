import { tv } from 'tailwind-variants'
import {
  overlayInteractiveItemBase,
  overlayLabelBase,
  overlaySeparatorBase,
  overlaySurfaceBase,
} from '../../styles/overlay-classes'

export const contextMenuContentVariants = tv({
  base: [
    'z-50 min-w-context-menu-content overflow-hidden rounded-context-menu-content p-context-menu-content shadow-context-menu-content ring-1 ring-foreground/5',
    ...overlaySurfaceBase,
  ],
})

export const contextMenuItemVariants = tv({
  base: [
    ...overlayInteractiveItemBase,
    'rounded-context-menu-item px-context-menu-item-x py-context-menu-item-y text-context-menu-item',
  ],
})

export const contextMenuLabelVariants = tv({
  base: [
    overlayLabelBase,
    'px-context-menu-label-x py-context-menu-label-y text-context-menu-label font-context-menu-label',
  ],
})

export const contextMenuSeparatorVariants = tv({
  base: overlaySeparatorBase,
})

export const contextMenuShortcutVariants = tv({
  base: 'ml-auto text-context-menu-shortcut tracking-context-menu-shortcut text-muted-foreground',
})
