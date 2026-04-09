import { tv } from 'tailwind-variants'
import {
  overlayInteractiveItemBase,
  overlayLabelBase,
  overlaySeparatorBase,
  overlaySurfaceBase,
} from '../../styles/overlay-classes'

export const contextMenuContentVariants = tv({
  base: ['z-50 min-w-[10rem] overflow-hidden p-1 shadow-xl', ...overlaySurfaceBase],
})

export const contextMenuItemVariants = tv({
  base: [...overlayInteractiveItemBase, 'px-2 py-1.5'],
})

export const contextMenuLabelVariants = tv({
  base: overlayLabelBase,
})

export const contextMenuSeparatorVariants = tv({
  base: overlaySeparatorBase,
})

export const contextMenuShortcutVariants = tv({
  base: 'ml-auto text-xs tracking-widest text-muted-foreground',
})
