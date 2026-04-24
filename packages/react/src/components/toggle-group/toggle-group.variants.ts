import { tv } from 'tailwind-variants'

export const toggleGroupVariants = tv({
  base: 'inline-flex items-center justify-center gap-0 rounded-toggle-group-root border border-border bg-muted/50 p-toggle-group-root shadow-inner',
})

export const toggleGroupItemVariants = tv({
  base: [
    'inline-flex min-w-0 flex-1 cursor-pointer select-none items-center justify-center rounded-toggle-group-item px-toggle-group-item-x py-toggle-group-item-y',
    'text-toggle-group-item font-toggle-group-item text-muted-foreground',
    'transition-[background-color,color,box-shadow]',
    'hover:bg-background/80 hover:text-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
    'data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
})
