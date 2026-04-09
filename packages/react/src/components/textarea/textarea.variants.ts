import { tv } from 'tailwind-variants'

export const textareaVariants = tv({
  base: [
    'flex min-h-24 w-full rounded-md border border-input bg-background',
    'px-3 py-2',
    'text-sm text-foreground',
    'placeholder:text-muted-foreground',
    'transition-[color,box-shadow,border-color] duration-150',
    'focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
})
