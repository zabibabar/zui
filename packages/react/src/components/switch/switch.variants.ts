import { tv } from 'tailwind-variants'

export const switchRootVariants = tv({
  base: [
    'peer inline-flex shrink-0 cursor-pointer items-center rounded-switch-root border border-transparent',
    'h-switch-root w-switch-root-w',
    'bg-input transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:bg-primary',
  ],
})

export const switchThumbVariants = tv({
  base: [
    'pointer-events-none block rounded-switch-thumb bg-background shadow-sm ring-0 transition-transform',
    'size-switch-thumb',
    'translate-x-switch-thumb-off data-[state=checked]:translate-x-switch-thumb-on',
  ],
})
