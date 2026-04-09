import { tv } from 'tailwind-variants'
import {
  overlayInteractiveItemBase,
  overlayLabelBase,
  overlaySeparatorBase,
  overlaySurfaceBase,
} from '../../styles/overlay-classes'

export const menubarMenuVariants = tv({
  base: 'flex h-9 items-center gap-1 rounded-md border border-border bg-background p-1 shadow-sm',
})

export const menubarTriggerVariants = tv({
  base: [
    'flex cursor-pointer select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none',
    'text-foreground',
    'focus:bg-muted data-[state=open]:bg-muted',
  ],
})

export const menubarContentVariants = tv({
  base: ['z-50 min-w-[10rem] overflow-hidden p-1 shadow-xl', ...overlaySurfaceBase],
})

export const menubarItemVariants = tv({
  base: [...overlayInteractiveItemBase, 'px-2 py-1.5'],
})

export const menubarLabelVariants = tv({
  base: overlayLabelBase,
})

export const menubarSeparatorVariants = tv({
  base: overlaySeparatorBase,
})

export const menubarShortcutVariants = tv({
  base: 'ml-auto text-xs tracking-widest text-muted-foreground',
})
