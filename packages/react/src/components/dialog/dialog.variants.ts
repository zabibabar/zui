import { tv } from 'tailwind-variants'
import { overlaySurfaceBase } from '../../styles/overlay-classes'

export const dialogOverlayVariants = tv({
  base: [
    'fixed inset-0 z-50 bg-black/45 backdrop-blur-sm',
    'data-[state=open]:animate-[zui-dialog-overlay-in_200ms_ease-out_forwards]',
  ],
})

export const dialogContentVariants = tv({
  base: [
    'fixed left-1/2 top-1/2 z-50 grid w-full max-w-dialog-content -translate-x-1/2 -translate-y-1/2 gap-dialog-content-gap',
    'rounded-dialog-content p-dialog-content shadow-dialog-content',
    ...overlaySurfaceBase,
    'data-[state=open]:animate-[zui-dialog-content-in_200ms_ease-out_forwards]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
  ],
})

export const dialogHeaderVariants = tv({
  base: 'flex flex-col gap-dialog-header-gap text-left',
})

export const dialogTitleVariants = tv({
  base: 'text-dialog-title font-dialog-title leading-none tracking-dialog-title',
})

export const dialogDescriptionVariants = tv({
  base: 'text-dialog-desc text-muted-foreground',
})
