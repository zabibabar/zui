import { tv } from 'tailwind-variants'

export const switchRootVariants = tv({
  base: [
    'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent',
    'h-6 w-11',
    'bg-input transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:bg-primary',
  ],
})

export const switchThumbVariants = tv({
  base: [
    'pointer-events-none block rounded-full bg-background shadow-sm ring-0 transition-transform',
    'size-5',
    'translate-x-0.5 data-[state=checked]:translate-x-5.5',
  ],
})
