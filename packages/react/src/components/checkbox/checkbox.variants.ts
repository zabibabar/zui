import { tv } from 'tailwind-variants'
import { pressableControlBase } from '../../styles/overlay-classes'

export const checkboxVariants = tv({
  base: [
    'peer inline-flex size-checkbox shrink-0 items-center justify-center rounded-checkbox',
    'border border-input bg-background text-primary-foreground',
    ...pressableControlBase,
    'hover:border-ring/60 hover:bg-muted/40',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:shadow-sm',
  ],
})

export const checkboxIndicatorVariants = tv({
  base: 'flex items-center justify-center text-current',
})
