import { tv } from 'tailwind-variants'

export const inputVariants = tv({
  base: [
    'flex w-full min-h-9 rounded-md border border-input',
    'bg-background px-3 py-2',
    'text-sm text-foreground',
    'placeholder:text-muted-foreground',
    'transition-[color,box-shadow] duration-150',
    'focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
})
