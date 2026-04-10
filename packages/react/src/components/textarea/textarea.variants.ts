import { tv } from 'tailwind-variants'

export const textareaVariants = tv({
  base: [
    'flex min-h-textarea w-full rounded-textarea border border-input bg-background',
    'px-textarea-x py-textarea-y',
    'text-textarea text-foreground',
    'placeholder:text-muted-foreground',
    'transition-[color,box-shadow,border-color] duration-150',
    'focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
})
