import { tv } from 'tailwind-variants'

export const labelVariants = tv({
  base: [
    'text-label font-label leading-none text-foreground',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  ],
})
