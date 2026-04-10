import { tv } from 'tailwind-variants'
import { overlaySurfaceBase } from '../../styles/overlay-classes'

export const tooltipContentVariants = tv({
  base: [
    'z-50 overflow-hidden rounded-tooltip px-tooltip-x py-tooltip-y text-tooltip shadow-tooltip',
    ...overlaySurfaceBase,
  ],
})
