import { tv } from 'tailwind-variants'

export const inputVariants = tv({
  base: [
    'flex w-full min-h-input-field rounded-input-field border border-input',
    'bg-background px-input-field-x py-input-field-y',
    'text-input-field text-foreground',
    'placeholder:text-muted-foreground',
    'transition-[color,box-shadow] duration-150',
    'focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
})
