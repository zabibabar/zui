import { tv } from 'tailwind-variants'

export const sliderTrackVariants = tv({
  base: [
    'relative h-slider-track w-full grow overflow-hidden rounded-slider-track',
    'bg-muted shadow-inner',
  ],
})

export const sliderRangeVariants = tv({
  base: 'absolute h-full bg-primary',
})

export const sliderThumbVariants = tv({
  base: [
    'block size-slider-thumb cursor-grab rounded-slider-thumb border-2 border-primary bg-background',
    'shadow-sm transition-[box-shadow,transform,border-color] duration-150',
    'hover:scale-105 hover:shadow-md active:cursor-grabbing',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
})
