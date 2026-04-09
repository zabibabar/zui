import { tv } from 'tailwind-variants'
import { overlaySurfaceBase } from '../../styles/overlay-classes'

export const dialogOverlayVariants = tv({
  base: [
    'fixed inset-0 z-50 bg-black/50',
    'data-[state=open]:animate-[zui-dialog-overlay-in_200ms_ease-out_forwards]',
  ],
})

export const dialogContentVariants = tv({
  base: [
    'fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4',
    'rounded-lg p-6 shadow-xl',
    ...overlaySurfaceBase,
    'data-[state=open]:animate-[zui-dialog-content-in_200ms_ease-out_forwards]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  ],
})

export const dialogHeaderVariants = tv({
  base: 'flex flex-col gap-1.5 text-left',
})

export const dialogTitleVariants = tv({
  base: 'text-lg font-semibold leading-none tracking-tight',
})

export const dialogDescriptionVariants = tv({
  base: 'text-sm text-muted-foreground',
})
