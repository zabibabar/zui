import { tv } from 'tailwind-variants'
import {
  overlayInteractiveItemBase,
  overlayLabelBase,
  overlaySeparatorBase,
  overlaySurfaceBase,
} from '../../styles/overlay-classes'

export const selectTriggerVariants = tv({
  base: [
    'flex min-h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-background',
    'px-3 py-2 text-sm text-foreground',
    'placeholder:text-muted-foreground',
    'transition-[color,box-shadow,border-color] duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30',
    'disabled:cursor-not-allowed disabled:opacity-50',
    '[&_svg]:h-4 [&_svg]:w-4 [&_svg]:text-muted-foreground',
  ],
})

export const selectContentVariants = tv({
  base: ['relative z-50 min-w-[8rem] overflow-hidden shadow-xl', ...overlaySurfaceBase],
})

export const selectViewportVariants = tv({
  base: 'p-1',
})

export const selectItemVariants = tv({
  base: [...overlayInteractiveItemBase, 'w-full py-1.5 pl-8 pr-2'],
})

export const selectLabelVariants = tv({
  base: overlayLabelBase,
})

export const selectSeparatorVariants = tv({
  base: overlaySeparatorBase,
})
