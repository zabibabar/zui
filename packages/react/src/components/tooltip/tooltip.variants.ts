import { tv } from 'tailwind-variants'
import { overlaySurfaceBase } from '../../styles/overlay-classes'

export const tooltipContentVariants = tv({
  base: ['z-50 overflow-hidden px-3 py-1.5 text-xs shadow-md', ...overlaySurfaceBase],
})
