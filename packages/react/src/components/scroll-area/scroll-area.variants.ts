import { tv } from 'tailwind-variants'

export const scrollAreaViewportVariants = tv({
  base: 'h-full w-full rounded-[inherit]',
})

export const scrollAreaScrollbarVariants = tv({
  base: [
    'flex touch-none select-none p-scroll-area-scrollbar transition-colors',
    'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-scroll-area-scrollbar-w',
    'data-[orientation=horizontal]:h-scroll-area-scrollbar-w data-[orientation=horizontal]:flex-col',
  ],
})

export const scrollAreaThumbVariants = tv({
  base: 'relative flex-1 rounded-full bg-border',
})
