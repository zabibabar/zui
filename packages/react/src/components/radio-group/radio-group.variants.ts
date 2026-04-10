import { tv } from 'tailwind-variants'

export const radioGroupVariants = tv({
  base: 'grid gap-radio-gap',
})

export const radioItemVariants = tv({
  base: [
    'aspect-square size-radio rounded-full border border-input',
    'text-primary transition-[border-color,box-shadow,color] duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:border-primary',
  ],
})

export const radioIndicatorVariants = tv({
  base: 'relative flex items-center justify-center',
})
