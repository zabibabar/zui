import { tv } from 'tailwind-variants'
import { pressableControlBase } from '../../styles/overlay-classes'

export const switchRootVariants = tv({
  base: [
    'peer inline-flex shrink-0 items-center rounded-switch-root border border-transparent',
    'h-switch-root w-switch-root-w',
    'bg-input shadow-inner',
    ...pressableControlBase,
    'hover:bg-muted-foreground/30',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'data-[state=checked]:bg-primary data-[state=checked]:shadow-none',
  ],
})

export const switchThumbVariants = tv({
  base: [
    'pointer-events-none block rounded-switch-thumb bg-background shadow-sm ring-0 transition-[transform,box-shadow]',
    'size-switch-thumb',
    'translate-x-switch-thumb-off data-[state=checked]:translate-x-switch-thumb-on',
  ],
})
