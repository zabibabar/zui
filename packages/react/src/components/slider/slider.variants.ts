import { tv } from 'tailwind-variants'

export const sliderTrackVariants = tv({
  base: ['relative h-2 w-full grow overflow-hidden rounded-full', 'bg-muted'],
})

export const sliderRangeVariants = tv({
  base: 'absolute h-full bg-primary',
})

export const sliderThumbVariants = tv({
  base: [
    'block size-5 rounded-full border-2 border-primary bg-background',
    'shadow-sm transition-[box-shadow] duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
})
