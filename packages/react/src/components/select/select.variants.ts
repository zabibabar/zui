import { tv } from 'tailwind-variants'
import {
  overlayInteractiveItemBase,
  overlayLabelBase,
  overlaySeparatorBase,
  overlaySurfaceBase,
} from '../../styles/overlay-classes'

export const selectTriggerVariants = tv({
  base: [
    'flex min-h-select-trigger w-full items-center justify-between gap-select-trigger-gap rounded-select-trigger border border-input bg-background',
    'px-select-trigger-x py-select-trigger-y text-select-trigger text-foreground',
    'placeholder:text-muted-foreground',
    'transition-[color,box-shadow,border-color] duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30',
    'disabled:cursor-not-allowed disabled:opacity-50',
    '[&_svg]:size-select-trigger-icon [&_svg]:text-muted-foreground',
  ],
})

export const selectContentVariants = tv({
  base: ['relative z-50 min-w-[8rem] overflow-hidden rounded-md shadow-xl', ...overlaySurfaceBase],
})

export const selectViewportVariants = tv({
  base: 'p-select-viewport',
})

export const selectItemVariants = tv({
  base: [
    ...overlayInteractiveItemBase,
    'w-full rounded-select-item text-select-item py-select-item-y pl-select-item-pl pr-select-item-pr',
  ],
})

export const selectLabelVariants = tv({
  base: [overlayLabelBase, 'px-2 py-1.5 text-xs font-semibold'],
})

export const selectSeparatorVariants = tv({
  base: overlaySeparatorBase,
})
