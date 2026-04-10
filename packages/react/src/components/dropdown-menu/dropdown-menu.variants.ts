import { tv } from 'tailwind-variants'
import {
  overlayInteractiveItemBase,
  overlayLabelBase,
  overlaySeparatorBase,
  overlaySurfaceBase,
} from '../../styles/overlay-classes'

export const dropdownMenuContentVariants = tv({
  base: [
    'z-50 min-w-dropdown-menu-content overflow-hidden rounded-dropdown-menu-content p-dropdown-menu-content shadow-dropdown-menu-content',
    ...overlaySurfaceBase,
  ],
})

export const dropdownMenuItemVariants = tv({
  base: [
    ...overlayInteractiveItemBase,
    'rounded-dropdown-menu-item px-dropdown-menu-item-x py-dropdown-menu-item-y text-dropdown-menu-item',
  ],
})

export const dropdownMenuLabelVariants = tv({
  base: [
    overlayLabelBase,
    'px-dropdown-menu-label-x py-dropdown-menu-label-y text-dropdown-menu-label font-dropdown-menu-label',
  ],
})

export const dropdownMenuSeparatorVariants = tv({
  base: overlaySeparatorBase,
})
