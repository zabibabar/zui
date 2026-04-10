import { tv } from 'tailwind-variants'

export const toggleGroupVariants = tv({
  base: 'inline-flex items-center justify-center gap-0 rounded-toggle-group-root border border-border bg-background p-toggle-group-root',
})

export const toggleGroupItemVariants = tv({
  base: [
    'inline-flex min-w-0 flex-1 items-center justify-center rounded-toggle-group-item px-toggle-group-item-x py-toggle-group-item-y',
    'text-toggle-group-item font-toggle-group-item text-muted-foreground',
    'transition-colors',
    'hover:bg-muted hover:text-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
    'data-[state=on]:bg-muted data-[state=on]:text-foreground',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
})
