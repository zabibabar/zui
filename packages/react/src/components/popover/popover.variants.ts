import { tv } from 'tailwind-variants'
import { overlaySurfaceBase } from '../../styles/overlay-classes'

export const popoverContentVariants = tv({
  base: [
    'z-50 w-popover-w rounded-popover p-popover shadow-popover outline-none',
    ...overlaySurfaceBase,
  ],
})
