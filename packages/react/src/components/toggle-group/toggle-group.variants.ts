import { tv } from 'tailwind-variants'

export const toggleGroupVariants = tv({
  base: 'inline-flex items-center justify-center gap-0 rounded-md border border-border bg-background p-0.5',
})

export const toggleGroupItemVariants = tv({
  base: [
    'inline-flex min-w-0 flex-1 items-center justify-center rounded-sm px-2 py-1.5',
    'text-sm font-medium text-muted-foreground',
    'transition-colors',
    'hover:bg-muted hover:text-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
    'data-[state=on]:bg-muted data-[state=on]:text-foreground',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
})
