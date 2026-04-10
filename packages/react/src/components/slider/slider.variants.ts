import { tv } from 'tailwind-variants'

export const sliderTrackVariants = tv({
  base: ['relative h-slider-track w-full grow overflow-hidden rounded-slider-track', 'bg-muted'],
})

export const sliderRangeVariants = tv({
  base: 'absolute h-full bg-primary',
})

export const sliderThumbVariants = tv({
  base: [
    'block size-slider-thumb rounded-slider-thumb border-2 border-primary bg-background',
    'shadow-sm transition-[box-shadow] duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
})
