import { tv } from 'tailwind-variants'
import { overlaySurfaceBase } from '../../styles/overlay-classes'

export const popoverContentVariants = tv({
  base: ['z-50 w-72 p-4 shadow-xl outline-none', ...overlaySurfaceBase],
})
