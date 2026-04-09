import { tv } from 'tailwind-variants'
import {
  overlayInteractiveItemBase,
  overlayLabelBase,
  overlaySeparatorBase,
  overlaySurfaceBase,
} from '../../styles/overlay-classes'

export const dropdownMenuContentVariants = tv({
  base: ['z-50 min-w-[10rem] overflow-hidden p-1 shadow-xl', ...overlaySurfaceBase],
})

export const dropdownMenuItemVariants = tv({
  base: [...overlayInteractiveItemBase, 'px-2 py-1.5'],
})

export const dropdownMenuLabelVariants = tv({
  base: overlayLabelBase,
})

export const dropdownMenuSeparatorVariants = tv({
  base: overlaySeparatorBase,
})
