import { tv } from 'tailwind-variants'

export const checkboxVariants = tv({
  base: [
    'peer inline-flex size-4.5 shrink-0 items-center justify-center rounded-sm',
    'border border-input bg-background text-primary-foreground',
    'transition-[background-color,border-color,color,box-shadow] duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:border-primary data-[state=checked]:bg-primary',
  ],
})

export const checkboxIndicatorVariants = tv({
  base: 'flex items-center justify-center text-current',
})
