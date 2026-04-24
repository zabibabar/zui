import { tv } from 'tailwind-variants'
import { pressableControlBase } from '../../styles/overlay-classes'

export const radioGroupVariants = tv({
  base: 'grid gap-radio-gap',
})

export const radioItemVariants = tv({
  base: [
    'aspect-square size-radio rounded-full border border-input',
    'bg-background text-primary',
    ...pressableControlBase,
    'hover:border-ring/60 hover:bg-muted/40',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'data-[state=checked]:border-primary data-[state=checked]:shadow-sm',
  ],
})

export const radioIndicatorVariants = tv({
  base: 'relative flex items-center justify-center',
})
