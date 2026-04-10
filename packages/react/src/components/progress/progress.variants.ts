import { tv } from 'tailwind-variants'

export const progressRootVariants = tv({
  base: ['relative h-progress-track w-full overflow-hidden rounded-progress-track', 'bg-muted'],
})

export const progressIndicatorVariants = tv({
  base: 'h-full w-full flex-1 rounded-full bg-primary transition-transform duration-300',
})
