import { tv } from 'tailwind-variants'

export const drawerOverlayVariants = tv({
  base: [
    'fixed inset-0 z-50 bg-black/50',
    'data-[state=open]:animate-[zui-dialog-overlay-in_200ms_ease-out_forwards]',
  ],
})

export const drawerContentVariants = tv({
  base: [
    'fixed top-0 z-50 flex h-full w-full max-w-sm flex-col gap-4 border-border bg-popover p-6 shadow-xl',
    'text-popover-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  ],
  variants: {
    side: {
      right: [
        'right-0 border-l',
        'data-[state=open]:animate-[zui-drawer-in-right_250ms_ease-out_forwards]',
      ],
      left: [
        'left-0 border-r',
        'data-[state=open]:animate-[zui-drawer-in-left_250ms_ease-out_forwards]',
      ],
    },
  },
  defaultVariants: {
    side: 'right',
  },
})

export const drawerHeaderVariants = tv({
  base: 'flex flex-col gap-1.5 text-left',
})

export const drawerTitleVariants = tv({
  base: 'text-lg font-semibold leading-none tracking-tight',
})

export const drawerDescriptionVariants = tv({
  base: 'text-sm text-muted-foreground',
})
